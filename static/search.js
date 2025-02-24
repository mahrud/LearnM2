var searchBox = $("input#x-search-query");
var urlParams = new URLSearchParams(window.location.search);

function doSearch() {
  var query = searchBox.val();
  if (query == "") updatePage();
  var result = fuse.search(query);
  updateSearch(result);
  //var regex = new RegExp("<mark>(.*)</mark>", "gim");
  //var content = document.getElementById("main").innerHTML;
  //document.getElementById("main").innerHTML = content.replace(regex, "$1");
  //doHighlight();
}

// Highlight search Query
// function doHighlight() {
//   var query = searchBox.val();
//   // regex matches at beginning of line, end of line or word boundary
//   var regex = new RegExp(
//     "(?:^|\\b)(.{0,5})(" + query + ")(.{0,5})(?:$|\\b)",
//     "gim",
//   );
//   var content = document.getElementById("main").innerHTML;
//   document.getElementById("main").innerHTML = content.replace(
//     regex,
//     "$1<mark>$2</mark>$3",
//   );
// }

$(document).ready(function () {
  if (urlParams.has("q")) {
    searchBox.val(urlParams.get("q"));
    doSearch();
  }
  searchBox.on("keyup", doSearch);
});
