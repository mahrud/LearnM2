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

function updateSearch(results) {
    $('.outline-list').html(
	results.slice(0, 5).map(elt => `
        <li class="outline-item">
          <a class="outline-link" href="#${elt.item}">${elt.item}</a>
        </li>`).join(''));
}

function updateOutline(base, prefix, hash) {
    anchors.options.base = base + prefix;
    anchors.elements = [];
    anchors.add().remove('.index-heading, .outline-heading');
    if (hash) {
	$('html, body').animate(
            { scrollTop: $(hash).offset().top }, 500);
    };
    $('.outline-list').html(
	anchors.elements.map(elt => `
        <li class="outline-item">
          <a class="outline-link" href="${prefix}#${elt.id}">${elt.innerText}</a>
        </li>`).join(''));
}

var database = new Set([]);
const fuse = new Fuse([], { ignoreLocation: true, threshold: 0.2 });
function updateFuse(index, prefix) {
    if (!database.has(prefix + pkgname))
	Object.keys(index).forEach(key => {
            var fkey = prefix + key;
            if (!database.has(fkey)) {
		database.add(fkey);
		fuse.add(fkey);
            };
	});
}

function makeSubmenu(toc, prefix, current) {
    var open = false;
    var menu = Object.entries(toc).map(function([key, subtoc]) {
	open = open || key == current;
	var n = Object.keys(subtoc).length;
	var style = key == current ? `background-color: yellow` : "";
	if (Object.keys(subtoc).length == 0) return `
        <li class="index-item">
          <a style="${style}" href="#${prefix}${key}" onclick="openNode(this)"><tt>${key}</tt></a>
        </li>`;
	var [submenu, subopen] = makeSubmenu(subtoc, prefix, current);
	var openattr = (subopen || key == current) ? "open" : "";
	open = open || subopen;
	return `
        <li class="index-item toggle">
          <details ${openattr}>
            <summary><a style="${style}" href="#${prefix}${key}" onclick="openNode(this)"><tt>${key}</tt></a></summary>
            <ol>${submenu}
            </ol>
          </details>
        </li>`;
    }).join('');
    return [menu, open];
}

function updateSidebar(data, pkgname, current) {
    var prefix = pkgname ? pkgname + '::' : '';
    updateFuse(data["index"], prefix);
    $('.index-list').html(
	makeSubmenu(data["toc"], prefix, current)[0]);
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
	updateSidebar(data, pkgname, node);
	updateNavbar(param, pkgname, data["nodes"][node]["Headline"])
	$('#content').html(template(data["nodes"][node]));
	$('html, body').scrollTop(0);
	updateOutline('{{ site.url }}{{ site.baseurl }}/packages/', '#'+pkgname+'::'+node, regex[3]);
	Prism.highlightAll()
	renderKaTeX();
    });
}

function openPackage(param) {
    // TODO: sanitize this url
    var regex = /#(.+?)(#.*)?$/.exec(param);
    var pkgname = regex[1];
    $.getJSON(bucket+pkgname+'.json', function(data) {
	updateSidebar(data, pkgname, pkgname);
	updateNavbar(param, pkgname, pkgname)
	$('#content').html(template(data["nodes"][pkgname]));
	updateOutline('{{ site.url }}{{ site.baseurl }}/packages/', '#'+pkgname, regex[2]);
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
    //openNode("#Macaulay2Doc::packages provided with Macaulay2");
    $.getJSON(bucket+'Packages.json', function(data) {
        updateSidebar(data, null, "Macaulay2Doc"); });
};
