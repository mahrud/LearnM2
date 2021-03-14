// Based on a script by Kathie Decora : katydecorah.com/code/lunr-and-jekyll/

// Create the lunr index for the search
var index = elasticlunr(function () {
    this.addField('title')
    this.addField('author')
    this.addField('layout')
    this.addField('content')
    this.setRef('id')
});

// Add to this index the proper metadata from the Jekyll content

index.addDoc({
    title: "The Twisted Cubic",
    author: "Mahrud Sayrafi",
    layout: "doc",
    content: "Let’s first define the coordinate ring of $ \\P^3 $, where the twisted cubic lies:\n\n\n  i1 : kk = ZZ/32003;\n  i2 : R = kk[w, x, y, z]; -- this is a ring\n\n\nParametric Curve\n\nThis methods yields the twisted cubic as the ideal of a projective curve given parametrically by the map:\n\\[\n\\begin{aligned}\n  k[x,y,z] &amp;\\to k[t] \\cr\n  x &amp;\\mapsto t^3 \\cr\n  y &amp;\\mapsto t^2 \\cr\n  z &amp;\\mapsto t.\n\\end{aligned}\n\\]\n\n\n  i3 : monomialCurveIdeal(R, {1, 2, 3})\n\n             2                    2\no3 = ideal (y  - x*z, x*y - w*z, x  - w*y)\n\no3 : Ideal of R\n\n\nDeterminantal Ideal\n\nThis method defines the twisted cubic as a determinantal ideal of $2\\times 2$ minors, that is:\n\\[ I = I_2\n  \\begin{pmatrix}\n    x &amp; y &amp; z \\cr\n    y &amp; z &amp; w\n  \\end{pmatrix}\n\\]\n\n\n  i4 : minors(2, matrix {{x, y, z}, {y, z, w}})\n\n               2                          2\no4 = ideal (- y  + x*z, w*x - y*z, w*y - z )\n\no4 : Ideal of R\n\n\nVeronese Embedding\n\nThis method defines the twisted cubic as the kernel of the Veronese embedding of degree three on the projective line.\nThat is:\n\n\n  i5 : kernel map(kk[s,t], R, {s^3, s^2*t, s*t^2, t^3})\n\n             2                    2\no5 = ideal (y  - x*z, x*y - w*z, x  - w*y)\n\no5 : Ideal of R\n\n\nResolution and Betti Table\n\nA minimal free resolution of the ideal defining the twisted cubic:\n\\[ 0 \\gets \\mathcal O_C \\gets \\mathcal O_{\\P^3} \\gets 3\\mathcal O_{\\P^3}(-2) \\gets 2\\mathcal O_{\\P^3}(-3) \\gets 0 \\]\n\n\n  i6 : res oo\n\n      1      3      2\no6 = R  &lt;-- R  &lt;-- R  &lt;-- 0\n                           \n     0      1      2      3\n\no6 : ChainComplex\n  i7 : betti oo\n\n            0 1 2\no7 = total: 1 3 2\n         0: 1 . .\n         1: . 3 2\n\no7 : BettiTally\n\n\n",
    id: 0
});
console.log( jQuery.type(index) );

// Builds reference data (maybe not necessary for us, to check)
var store = [{
    "title": "The Twisted Cubic",
    "author": "Mahrud Sayrafi",
    "layout": "doc",
    "link": "/docs/example/",
}
	     ]

// Query
var searchDiv = $("input#x-search-query");
var resultDiv = $("#results");
var searchParams = new URLSearchParams(window.location.search)
if (searchParams.has('q')) {
    searchDiv.value = searchParams.get('q');
}

function doSearch() {
    var query = searchDiv.val();
    if (query.length <= 3) {
	resultDiv.empty();
	return;
    }

    // The search is then launched on the index built with Lunr
    var result = index.search(query);
    resultDiv.empty();
    if (result.length == 0) {
	resultDiv.append('<p class="">No results found.</p>');
    } else if (result.length == 1) {
	resultDiv.append('<p class="">Found '+result.length+' result</p>');
    } else {
	resultDiv.append('<p class="">Found '+result.length+' results</p>');
    }
    // Loop through, match, and add results
    for (var item in result) {
	var ref = result[item].ref;
	var searchitem = '<div class="result"><p><a href="/LearnM2'+store[ref].link+'?q='+query+'">'+store[ref].title+'</a></p></div>';
	resultDiv.append(searchitem);
    }

    var regex = new RegExp("<mark>(.*)</mark>", "gim");
    var content = document.getElementById("main").innerHTML;
    document.getElementById("main").innerHTML = content.replace(regex, "$1");
    doHighlight();
}

// Highlight search Query
function doHighlight() {
    var query = searchDiv.val();
    // regex matches at beginning of line, end of line or word boundary
    var regex = new RegExp("(?:^|\\b)(.{0,5})(" + query + ")(.{0,5})(?:$|\\b)", "gim");
    var content = document.getElementById("main").innerHTML;
    document.getElementById("main").innerHTML = content.replace(regex, "$1<mark>$2</mark>$3");
}

$(document).ready(function() {
    if (searchParams.has('q')) {
	searchDiv.val(searchParams.get('q'));
	doSearch();
    }
    searchDiv.on('keyup', doSearch);
});
