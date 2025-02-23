---
---

Handlebars.registerHelper('displayHTML',function(inputData){
    return new Handlebars.SafeString(inputData);
});

{% raw %}
var template = Handlebars.compile(`
<!--{{ "Headline" }}-->
{{ displayHTML Usage }}
{{#each Description }}
  {{ displayHTML this }}
{{/each}}
{{ displayHTML SeeAlso }}`);
{% endraw %}

var bucket = 'https://raw.githubusercontent.com/mahrud/LearnM2/refs/heads/learn/static/';
var bucket = '{{ site.baseurl }}/static/';

function updateSearch(data) {
    $('.toc-list').html(
	data.slice(0, 5).map(elt => `
        <li class="toc-item">
          <a class="toc-link" href="#${elt.item}">${elt.item}</a>
        </li>`).join(''));
}

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
}

var index = new Set([]);
const fuse = new Fuse([], { ignoreLocation: true, threshold: 0.2 });
function updateSidebar(data, pkgname) {
    var prefix = pkgname ? pkgname + '::' : '';
    if (!index.has(prefix + pkgname))
	Object.keys(data).forEach(key => {
            var fkey = prefix + key;
            if (!index.has(fkey)) {
		index.add(fkey);
		fuse.add(fkey);
            };
	});
    $('.index-list').html(
	Object.keys(data).sort().map(key => `
        <li class="index-item">
          <a href="#${prefix}${key}" onclick="openNode(this)"><tt>${key}</tt></a>
        </li>`).join(''))
}

function openNode(param) {
    var regex = /#(.+)::(.+?)(#.*)?$/.exec(param);
    if (regex === null) return openPackage(param);
    var node = decodeURI(regex[2]);
    var pkgname = regex[1];
    // TODO: sanitize this url
    $.getJSON(bucket+pkgname+'.json', function(data) {
	updateSidebar(data, pkgname);
	$('#pkgname').html(pkgname);
	$('#pkgname').attr("href", "#"+pkgname);
	$('#headline').html(data[node]["Headline"]);
	$('#headline').attr("href", param);
	$('#content').html(template(data[node]));
	updateTOC('{{ site.url }}{{ site.baseurl }}/packages/', '#'+pkgname+'::'+node, regex[3]);
    });
}

function openPackage(param) {
    // TODO: sanitize this url
    var regex = /#(.+?)(#.*)?$/.exec(param);
    var pkgname = regex[1];
    $.getJSON(bucket+pkgname+'.json', function(data) {
	updateSidebar(data, pkgname);
	$('#pkgname').html(pkgname);
	$('#pkgname').attr("href", "#"+pkgname);
	$('#headline').html(pkgname);
	$('#headline').attr("href", param);
	$('#content').html(template(data[pkgname]));
	updateTOC('{{ site.url }}{{ site.baseurl }}/packages/', '#'+pkgname, regex[2]);
    });
}

function updatePage(param) {
    if ( window.location.href.match(/#.+::.+$/) ) { openNode(window.location); }
    else if ( window.location.href.match(/#.+$/) ) { openPackage(window.location); }
}

$("a.package").click(function () { openPackage(this) });

$(window).on('hashchange', updatePage);

if ( window.location.hash ) { updatePage(); } else {
    $.getJSON(bucket+'Packages.json', function(data) {
	updateSidebar(data, null); });
};
