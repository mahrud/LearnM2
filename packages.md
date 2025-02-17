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

<div id="toc"></div>

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
  var bucket = 'https://raw.githubusercontent.com/mahrud/LearnM2/refs/heads/learn/static/';
  var bucket = '{{ site.baseurl }}/static/';
  function openNode(param) {
    var regex = /#(.+)::(.+?)(#.*)?$/.exec(param);
    var node = decodeURI(regex[2]);
    var pkgname = regex[1];
    // TODO: sanitize this url
    $.getJSON(bucket+pkgname+'.json', function(data) {
      $('#content').html(template(data[node]));
      anchors.options.base = '{{ site.url }}{{ site.baseurl }}{{ page.url }}#'+pkgname+'::'+node;
      anchors.add();
      var hash = regex[3];
      if (hash) { $('html, body').animate( { scrollTop: $(hash).offset().top }, 500); };
      $('#toc').html(
	`<ul>${anchors.elements.map(
          elt => `<li>${elt.innerText}</li>`
        ).join('')}</ul>`);
    });
  };
  function openPackage(param) {
    // TODO: sanitize this url
    var regex = /#(.+?)(#.*)?$/.exec(param);
    var pkgname = regex[1];
    $.getJSON(bucket+pkgname+'.json', function(data) {
      $('#content').html(
        `<ul>${Object.keys(data).sort().map(
          key => `<li><a href="#${pkgname}::${key}" onclick="openNode(this)"><tt>${pkgname}::${key}<tt></a></li>`
        ).join('')}</ul>`);
      $('#content').append(template(data[pkgname]));
      anchors.options.base = '{{ site.url }}{{ site.baseurl }}{{ page.url }}#'+pkgname;
      anchors.add();
      var hash = regex[2];
      if (hash) { $('html, body').animate( { scrollTop: $(hash).offset().top }, 500); };
      $('#toc').html(
	`<ul>${anchors.elements.map(
          elt => `<li>${elt.innerText}</li>`
        ).join('')}</ul>`);
    });
  };
  $("a.package").click(function () { openPackage(this) });
  function updatePage(param) {
    if ( window.location.href.match(/#.+::.+$/) ) { openNode(window.location); }
    else if ( window.location.href.match(/#.+$/) ) { openPackage(window.location); }
  };
  $(window).on('hashchange', updatePage);
</script>
