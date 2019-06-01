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
    title: "LocalRings",
    author: "Mahrud Sayrafi",
    layout: "package",
    content: "The basic definition of localization of polynomial rings at prime ideals along with various elementary operations are defined in m2/localring.m2, which in turn depends on a raw local ring type defined in e/localrings.hpp. This package extends the following methods to such local rings: syz, resolution, length, trim, mingens, minimalPresentation, symbol//, inducedMap, symbol:, saturate, annihilate.\n\nNote: Methods isSubset and symbol== are fixed in m2/modules2.m2 and reduce is fixed in m2/matrix.m2. Many other methods that only rely on the methods above, such as map, modulo, subquotient, kernel, cokernel, image, homology, Hom, Ext, Tor, etc. work for local rings automatically.\n\nIf you need specific methods that do not work, please inform Mahrud Sayrafi.\n\n\n  i1 : R = ZZ/32003[a..d];  \n\n\nRational quartic curve in :\n\n\n  i2 : I = monomialCurveIdeal(R,{1,3,4})\n\n                        3      2     2    2    3    2\no2 = ideal (b*c - a*d, c  - b*d , a*c  - b d, b  - a c)\n\no2 : Ideal of R  \n  i3 : C = res I\n\n      1      4      4      1\no3 = R  &lt;-- R  &lt;-- R  &lt;-- R  &lt;-- 0\n                                  \n     0      1      2      3      4\n\no3 : ChainComplex  \n  i4 : M = ideal\"a,b,c,d\"; \"maximal ideal at the origin\";\n\no4 : Ideal of R  \n  i6 : P = ideal\"a,b,c\"; \"prime ideal\";\n\no6 : Ideal of R  \n  i8 : RM = localRing(R, M);  \n  i9 : D = C ** RM;  \n  i10 : E = pruneComplex D\n\n                                         1                                        4                                        4                                        1\no10 = (localRing (R, ideal (a, b, c, d)))  &lt;-- (localRing (R, ideal (a, b, c, d)))  &lt;-- (localRing (R, ideal (a, b, c, d)))  &lt;-- (localRing (R, ideal (a, b, c, d)))\n                                                                                                                                  \n      0                                        1                                        2                                        3\n\no10 : ChainComplex  \n\n\nThat is to say, the rational quartic curve is not locally Cohen-Macaulay at the origin Therefore the curve is not Cohen-Macaulay\n\n\n  i11 : RP = localRing(R, P);  \n  i12 : D' = C ** RP;  \n  i13 : E' = pruneComplex D'\n\n                                      1                                     2                                     1\no13 = (localRing (R, ideal (a, b, c)))  &lt;-- (localRing (R, ideal (a, b, c)))  &lt;-- (localRing (R, ideal (a, b, c)))\n                                                                                   \n      0                                     1                                     2\n\no13 : ChainComplex  \n\n\nHowever, the curve is Cohen-Macaulay at the prime ideal P (and in fact any other prime ideal)\n\n",
    id: 0
});
index.addDoc({
    title: "Example",
    author: "Mahrud Sayrafi",
    layout: "doc",
    content: "The Twisted Cubic\n\n\n  i1 : kk = ZZ/32003\n\no1 = kk\n\no1 : QuotientRing  \n  i2 : R = kk[x,y,z,w] -- this is a ring\n\no2 = R\n\no2 : PolynomialRing  \n  i3 : I = monomialCurveIdeal(R, {1,2,3})\n\n             2                    2\no3 = ideal (z  - y*w, y*z - x*w, y  - x*z)\n\no3 : Ideal of R  \n  i4 : I == minors(2, matrix {{R_0, R_1, R_2},{R_1,R_2,R_3}})\n\no4 = true  \n  i5 : I == kernel map(kk[s,t], R, {s^3, s^2*t, s*t^2, t^3})\n\no5 = true  \n\n\nF-Purity\n\nChecking that some ideals are F-pure:\n\n\n  i6 : p = 5;  \n  i7 : S = ZZ/p[x,y,z];  \n  i8 : f = x^2+y^3+z^5+(x*y*z)^3\n\n      3 3 3    5    3    2\no8 = x y z  + z  + y  + x\n\no8 : S  \n  i9 : m = ideal(x^p,y^p,z^p)\n\n             5   5   5\no9 = ideal (x , y , z )\n\no9 : Ideal of S  \n  i10 : f^(p-1) % m == 0\n\no10 = true  \n\n\nCan also check using TestIdeals package:\n\n\n  i11 : needsPackage \"TestIdeals\"\n\no11 = TestIdeals\n\no11 : Package  \n  i12 : isFPure (S/f)\n\no12 = false  \n\n",
    id: 1
});
console.log( jQuery.type(index) );

// Builds reference data (maybe not necessary for us, to check)
var store = [{
    "title": "LocalRings",
    "author": "Mahrud Sayrafi",
    "layout": "package",
    "link": "/packages/LocalRings/",
}
	     ,{
    "title": "Example",
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
	var searchitem = '<div class="result"><p><a href="/m2doc'+store[ref].link+'?q='+query+'">'+store[ref].title+'</a></p></div>';
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
