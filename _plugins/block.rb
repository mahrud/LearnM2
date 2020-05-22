# {% M2 [filename] %} is registered as a Liquid tag to run M2Block

# M2 settings
M2tag = "M2"
M2cmd = "M2"
M2dir = "_outputs/"
M2opts = "--silent --print-width 77 --stop --int --no-readline -q --no-randomize"
M2load = "needsPackage(\"LocalRings\", FileName => \"/home/mahrud/Projects/M2/M2/M2/Macaulay2/packages/LocalRings.m2\")"
M2regex = /i+([1-9][0-9]*) : /
DELIMITER = "--DELIMITER"

# Split the output into M2 blocks, and lines.
def parseM2(output)
  flag = false
  blocks = [[]]

  for line in output do
    if line =~ M2regex then
      if flag then
        blocks << []
        flag = false
      end
      blocks.last << []
    end

    if line =~ /#{DELIMITER}$/ then
      line = line.gsub(/#{DELIMITER}$/, "")
      flag = true
    end
    blocks.last.last << line
  end

  return blocks
end

# TODO: use spawn: https://ruby-doc.org/core-1.9.3/Kernel.html#method-i-spawn
# Run an M2 script and return the parsed output
def runM2(addr)
  # read the file
  input = File.read(addr) #.split DELIMITER
  output = ''

  # run them all
  IO.popen("#{M2cmd} #{M2opts} -e '#{M2load}' 2>&1", "r+") do |m2|
    m2.puts input
    m2.puts "exit(0)"
    output = m2.readlines()
    m2.close
  end

  # split the output into lines
  return parseM2(output[1..output.length])[0..-2]
end

# Immediately before rendering each document, separate and run M2 blocks and
# store parsed output in a designated folder.
def applyM2Hook(doc, payload)
  # make some local variables for convenience
  site = doc.site
  source = doc.path.match(/[^\/]*$/)[0].gsub(/.md$/, "")
  liquid_options = site.config["liquid"]

  # clear old input
  input_addr = M2dir + source + ".input"
  open(input_addr, 'w+') do |input_file|
  end

  # create a template object
  input_file = doc.site.liquid_renderer.file(doc.path)
  template = input_file.parse(doc.content)

  # the render method expects this information
  info = { :registers => { :site => site, :page => payload['page'] } }

  # render the content and grab all M2 parts
  doc.data['rendered_content'] = template.render(payload, info)

  # Run them all
  puts "Building M2 blocks in #{source}"
  blocks = runM2(input_addr)

  # store
  output_addr = M2dir + source + ".output"
  open(output_addr, 'w+') do |output_file|
    blocks.each do |block|
      output_file << block.join('')
      output_file << DELIMITER
      output_file << "\n"
    end
    output_file.close
  end

  FileUtils.cp(output_addr, output_addr + ".tmp")
end

# Register the hook on both pages and documents
Jekyll::Hooks.register :documents, :pre_render do |doc, payload|
  if payload["page"]["parse"] then
    applyM2Hook(doc, payload)
  end
end
Jekyll::Hooks.register :pages, :pre_render do |doc, payload|
  if payload["page"]["parse"] then
    applyM2Hook(doc, payload)
  end
end

# Class of Macaulay2 blocks, designated as {% M2 [source] %} ... {% M2 %}
class M2Block < Liquid::Raw
  include Jekyll::Tags # HighlightBlock

  def initialize(tag_name, markup, parse_context)
    @source = markup.split[0]
    @lang = 'macaulay2'
    markup = ''
    super
  end

  # collect
  def parse(tokens)
    puts "Parsing M2 block in #{@source}"
    input_addr = M2dir + @source + ".input"
    super

    open(input_addr, 'a+') do |input_file|
      input_file << @body.strip
      input_file << DELIMITER
      input_file << "\n"
      input_file.close
    end
  end

  def render(context)
    output_addr = M2dir + @source + ".output.tmp"

    if not File.file?(output_addr) then return end
    puts "Rendering M2 block in #{@source}"

    output = ''
    open(output_addr, 'r') do |output_file|
      output = output_file.readlines()
      output_file.close
    end

    # split the output into lines
    blocks = parseM2(output)

    open(output_addr, 'w+') do |output_file|
      blocks[1..blocks.length].each do |block|
        output_file << block.join
        output_file << DELIMITER
        output_file << "\n"
      end
    end

    entries = []
    blocks[0].each do |block|
      entries << block.join.strip
    end

    if blocks.length == 1 then
      File.delete(output_addr)
    end

    # Syntax highlighting
    prefix = context["highlighter_prefix"] || ""
    suffix = context["highlighter_suffix"] || ""

    code = entries.map { |entry| render_rouge(entry) }
    output = code.join("</code></pre><pre><code class=\"language-#{@lang}\">")
    rendered_output = add_code_tag(output)

    prefix + rendered_output + suffix
  end

  def render_rouge(code)
    require "rouge"
    formatter = ::Rouge::Formatters::HTMLLegacy.new(
      :line_numbers => false,
      :wrap         => false,
      :css_class    => "highlight",
      :gutter_class => "gutter",
      :code_class   => "code"
    )
    lexer = ::Rouge::Lexer.find_fancy(@lang, code) || Rouge::Lexers::PlainText
    formatter.format(lexer.lex(code))
  end

  def add_code_tag(code)
    code_attributes = [
      "class=\"language-#{@lang.to_s.tr("+", "-")}\"",
      "data-lang=\"#{@lang}\"",
    ].join(" ")
    "<figure class=\"highlight\"><pre><code #{code_attributes}>"\
    "#{code.chomp}</code></pre></figure>"
  end
end

Liquid::Template.register_tag('M2', M2Block)
