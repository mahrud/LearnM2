---
---

Handlebars.registerHelper('displayHTML',function(inputData){
    data = new Handlebars.SafeString(inputData);
    return ( data == "undefined" ? "" : data );
});

{% raw %}
var template = Handlebars.compile(`
{{ displayHTML Synopsis }}
{{ displayHTML Description }}
{{ displayHTML SourceCode }}
{{ displayHTML Acknowledgement }}
{{ displayHTML Contributors }}
{{ displayHTML References }}
{{ displayHTML Caveat }}
{{ displayHTML SeeAlso }}
{{ displayHTML Subnodes }}
{{ displayHTML WaysToUse }}`);
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

function updateNavbar(param, pkgname, title) {
    $('#pkgname').html(pkgname);
    $('#pkgname').attr("href", "#"+pkgname);
    $('#headline').html(title);
    $('#headline').attr("href", param);
}

function openNode(param) {
    var regex = /#(.+)::(.+?)(#.*)?$/.exec(param);
    if (regex === null) return openPackage(param);
    var node = decodeURI(regex[2]);
    var pkgname = regex[1];
    // TODO: sanitize this url
    $.getJSON(bucket+pkgname+'.json', function(data) {
	updateSidebar(data, pkgname);
	updateNavbar(param, pkgname, data[node]["Headline"])
	updateTOC('{{ site.url }}{{ site.baseurl }}/packages/', '#'+pkgname+'::'+node, regex[3]);
	$('#content').html(template(data[node]));
	Prism.highlightAll()
	renderKaTeX();
    });
}

function openPackage(param) {
    // TODO: sanitize this url
    var regex = /#(.+?)(#.*)?$/.exec(param);
    var pkgname = regex[1];
    $.getJSON(bucket+pkgname+'.json', function(data) {
	updateSidebar(data, pkgname);
	updateNavbar(param, pkgname, pkgname)
	updateTOC('{{ site.url }}{{ site.baseurl }}/packages/', '#'+pkgname, regex[2]);
	$('#content').html(template(data[pkgname]));
	Prism.highlightAll()
	renderKaTeX();
    });
}

function updatePage(param) {
    if ( window.location.href.match(/#.+::.+$/) ) { openNode(window.location); }
    else if ( window.location.href.match(/#.+$/) ) { openPackage(window.location); }
}

$("a.package").click(function() { openPackage(this) });

$(window).on('hashchange', updatePage);

if ( window.location.hash ) { updatePage(); } else {
    //openPackage("#Truncations");
    //openPackage("#Macaulay2Doc");
    openNode("#Macaulay2Doc::packages provided with Macaulay2");
    $.getJSON(bucket+'Packages.json', function(data) {
        updateSidebar(data, null); });
};
