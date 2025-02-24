debug Core
debug needsPackage("JSON", FileName => "./JSON.m2")

format' = s -> replace("\n", "\\\\n", format s)
--    if 1 < #s and s#0 == "\"" and s#-1 == "\"" then s else format s)

toJSON String      := o -> format'
toJSON Hypertext   := o -> format' @@ html
toJSON DocumentTag := o -> t -> replace(" :: ", "::", format toString t)

html TO2  := x -> (
    tag := getPrimaryTag fixup x#0;
    -- TODO: add this to htmlLiteral?
    name := if match("^ +$", x#1) then #x#1 : "&nbsp;&nbsp;" else x#1;
    if isUndocumented tag or isMissingDoc tag then concatenate(
	html TT name, " (missing documentation)",
	html COMMENT("tag: ", toString tag.Key)) else
    concatenate(html ANCHOR{"title" => htmlLiteral headline tag,
	    --"href"  => toURL htmlFilename tag, name}))
	    "href"  => "#" | toString package tag | "::" | format tag, name }))


pkgname = "SimpleDoc"
pkgname = "Truncations"
pkgname = "Macaulay2Doc"
pkgname = "Saturation"
elapsedTime pkg = loadPackage(pkgname, Reload => true, LoadDocumentation => true)

end--
restart
needs "generate-json.m2"

packages = {"Saturation", "Truncations"}
H = hashTable apply(packages, pkgname -> pkgname => headline pkgname)
elapsedTime ("static/Packages.json") << format'(toJSON H, Indent => 2) << flush << close

L = new HashTable from pkg#"raw documentation";
L = selectValues(L, x -> not x#?PrimaryTag and not x#?"undocumented" and not instance(x.DocumentTag.Key, Array));
--L = selectKeys(L, match_{"basis", "module", "provided", "Macaulay2Doc"});
L = elapsedTime applyPairs(L, (key, rawdoc) -> key => getData((rawtag := rawdoc.DocumentTag).Key, rawtag, rawdoc));
elapsedTime ("static/"|pkgname|".json") << toJSON(L, Indent => 2) << flush << close

(key, tag, rawdoc) = ("annihilator", makeDocumentTag annihilator, Saturation#"raw documentation"#"annihilator");
json(getData(key, tag, rawdoc), Indent => 2)

packages = {"Macaulay2Doc", "Saturation", "Truncations"}
H = hashTable apply(packages, pkgname -> pkgname => headline pkgname)
elapsedTime ("static/Packages.json") << toJSON(H, Indent => 2) << flush << close


elapsedTime L = apply(makeDocumentTag methods resolution, fetchRawDocumentation);
Macaulay2Doc#"raw documentation"#"resolution(Ideal)"

H = select(1, L, x -> true)
fromJSON toJSON(H, Indent => 2)

beginDocumentation()
errorDepth=1
toJSON TOH symbol TEST

format' toJSON { TO2{ res, "res" }, TOH res, TO res }

code(html, Symbol)
toJSON(L#0, Indent => 2)
html L#0#Description
toJSON Ideal

"resolution.json" << toJSON(L, Indent => 2) << flush << close
