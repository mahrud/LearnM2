---
layout: entry
title: Packages
category: links
order: 3
---

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

  var bucket = 'https://raw.githubusercontent.com/mahrud/LearnM2/refs/heads/learn/static/';
  var bucket = '{{ site.baseurl }}/static/';

  function updateTOC(base, prefix, hash) {
    anchors.options.base = base + prefix;
    anchors.elements = [];
    anchors.add().remove('.index-heading, .toc-heading');
    if (hash) {
      $('html, body').animate(
        { scrollTop: $(hash).offset().top }, 500);
    };
    $('.toc-list').html(
      anchors.elements.map(elt => `
        <li class="toc-item">
          <a class="toc-link" href="${prefix}#${elt.id}">${elt.innerText}</a>
        </li>`).join(''));
  };

  function updateSidebar(data, prefix) {
    $('.index-list').html(
      Object.keys(data).sort().map(key => `
        <li class="index-item">
          <a href="${prefix}${key}" onclick="openNode(this)"><tt>${key}</tt></a>
        </li>`).join(''))
  };

  function openNode(param) {
    var regex = /#(.+)::(.+?)(#.*)?$/.exec(param);
    var node = decodeURI(regex[2]);
    var pkgname = regex[1];
    // TODO: sanitize this url
    $.getJSON(bucket+pkgname+'.json', function(data) {
      updateSidebar(data, '#'+pkgname+'::');
      $('#content').html(template(data[node]));
      updateTOC('{{ site.url }}{{ site.baseurl }}{{ page.url }}', '#'+pkgname+'::'+node, regex[3]);
    });
  };

  function openPackage(param) {
    // TODO: sanitize this url
    var regex = /#(.+?)(#.*)?$/.exec(param);
    var pkgname = regex[1];
    $.getJSON(bucket+pkgname+'.json', function(data) {
      updateSidebar(data, '#'+pkgname+'::');
      $('#content').append(template(data[pkgname]));
      updateTOC('{{ site.url }}{{ site.baseurl }}{{ page.url }}', '#'+pkgname, regex[2]);
    });
  };

  function updatePage(param) {
    if ( window.location.href.match(/#.+::.+$/) ) { openNode(window.location); }
    else if ( window.location.href.match(/#.+$/) ) { openPackage(window.location); }
  };

  $("a.package").click(function () { openPackage(this) });
  $(window).on('hashchange', updatePage);
  if ( window.location.hash ) { updatePage(); } else {
    $.getJSON(bucket+'Packages.json', function(data) {
      updateSidebar(data, '#'); });
  };
</script>
