# M2 settings
M2tag = "M2"
M2cmd = "M2"
M2dir = "_outputs/"
M2opts = "--silent --print-width 77 --stop --int --no-readline -q --no-randomize"
M2load = "needsPackage(\"LocalRings\", FileName => \"/home/mahrud/Projects/M2/M2/M2/Macaulay2/packages/LocalRings.m2\")"
M2regex = /i+([1-9][0-9]*) : /
DELIMITER = "--DELIMITER"

# HTML
DIV = "<div class=\"examples\">\n  <pre><code class=\"language-m2\">"
MID = "  </code></pre>\n  <pre><code class=\"language-m2\">"
POS = "  </code></pre>\n</div>"

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
Jekyll::Hooks.register :documents, :pre_render do |doc, payload|
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

# Class of Macaulay2 block body, the stuff inside {% M2 [source] %} ... {% M2 %}
class M2BlockBody < Liquid::BlockBody
  def parse(tokenizer, parse_context)
    while token = tokenizer.shift
      if token =~ /\A\{\%\s*end#{M2tag}\s*(.*?)\%\}\z/om
        return yield "end#{M2tag}", $1
      end
      @nodelist << token
      @blank &&= !!(token =~ WhitespaceOrNothing)
    end

    yield nil, nil
  end
end

# Class of Macaulay2 blocks, designated as {% M2 [source] %} ... {% M2 %}
class M2Block < Liquid::Block
  def initialize(tag_name, args, options)
    @source = args.split[0]
    super
  end

  # collect
  def parse(tokens)
    puts "Parsing M2 block in #{@source}"
    input_addr = M2dir + @source + ".input"

    @body = M2BlockBody.new
    while parse_body(@body, tokens)
    end

    open(input_addr, 'a+') do |input_file|
      input_file << nodelist.join.strip
      input_file << DELIMITER
      input_file << "\n"
      input_file.close
    end
  end

  def render(context)
    output_addr = M2dir + @source + ".output.tmp"

    if File.file?(output_addr) then
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

      "#{DIV}#{entries.join(MID)}#{POS}"
    end
  end
end

Liquid::Template.register_tag('M2', M2Block)
