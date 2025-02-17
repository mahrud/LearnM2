---
layout: page
title: Packages
category: links
order: 3
---

Here are a couple of the packages that are distributed with Macaulay2.
{% assign packages = "Saturation, Truncations" | split: ", " %}
{% for item in packages -%}
* [<tt>{{ item }}</tt>](#{{ item }}){: .package }
{% endfor %}

<div id="content"></div>

<script>
  Handlebars.registerHelper('displayHTML',function(inputData){
    return new Handlebars.SafeString(inputData);
  });
  var template = Handlebars.compile(`
    <!--
    <div class="clearfix" id="x-projnav">
      <a href="{{ site.baseurl }}/packages/">Packages:</a>
      {% raw %}
      <tt>{{ page.title }} v{{ page.version }}</tt>
      {% endraw %}
      <span>
        <span class="text-muted">|</span> <a href="#pkg-index">Index</a>
        <span class="text-muted">|</span> <a href="#pkg-files">Files</a>
        <span class="text-muted">|</span> <a href="#pkg-subdirectories">Directories</a>
      </span>
    </div>
    -->

    {% raw %}
    <h4 class="headline">{{ "Headline" }}</h4>
    {{ displayHTML Usage }}
    {{#each Description }}
      {{ displayHTML this }}
    {{/each}}
    {{ displayHTML SeeAlso }}
    {% endraw %}
    `);
  function opendoc(param) {
    var arr = /#(.+)::(.+)/.exec(param);
    var package = arr[1];
    var node = arr[2];
    $.getJSON('https://raw.githubusercontent.com/mahrud/LearnM2/refs/heads/learn/static/'+package+'.json', function(data) {
      var content = template(data[node]);
      $('#content').html(content);
      anchors.add();
    });
  };
  $("a.package").click(function () {
    var package = $(this).text();
    $.getJSON('https://raw.githubusercontent.com/mahrud/LearnM2/refs/heads/learn/static/'+package+'.json', function(data) {
      $('#content').html(
        `<ul>${Object.keys(data).sort().map(
          key => `<li><a href="#${package}::${key}" onclick="opendoc(this)"><tt>${package}::${key}<tt></a></li>`
        ).join('')}</ul>`
      );
    });
  });
</script>
