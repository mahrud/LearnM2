debug Core
debug needsPackage "JSON"

format' = method(Options => options toJSON)
format' Thing := o -> x -> format'(jsonEncoder o, x)
format'(JSONEncoder, Thing)     := o -> (e, x) -> x
format'(JSONEncoder, String)    := o -> (e, s) -> replace("\n", "\\\\n",
    if 1 < #s and s#0 == "\"" and s#-1 == "\"" then s else format s)
format'(JSONEncoder, Array)     := o -> (e, L) -> (
    if #L == 0 then "[]" else concatenate(
	"[", demarkValues(e, () -> apply(L,
		x -> format'(e, x))), "]"))
format'(JSONEncoder, HashTable) := o -> (e, H) -> (
    if #H == 0 then "{}" else concatenate(
	"{", demarkValues(e, () -> (if e.Sort then sort else identity) apply(keys H,
		k -> concatenate(
		    format'(e, toString k),
		    e.NameSeparator,
		    format'(e, H#k)))), "}"))

-- tracking indentations
indentLevel := -1
pushIndentLevel :=  n     -> (indentLevel = indentLevel + n; n)
popIndentLevel  := (n, s) -> (indentLevel = indentLevel - n; s)

scan(methods hypertext, (h,t) -> toJSON(JSONEncoder, t) := o -> (e, x) -> html hypertext t)
toJSON(JSONEncoder, Hypertext) := o -> (e, x) -> (
    T := class x;
    qname := T.qname;
    attr := "";
    cont := if T.?Options then (
	(op, ct) := override(options T, toSequence x);
	scanPairs(op, (key, val) -> (
		if val =!= null
		then attr = " " | key | "=" | format toString val | attr));
	sequence ct) else x;
    pushIndentLevel 1;
    (head, prefix, suffix, tail) := (
	if instance(x, HypertextContainer) then (concatenate(indentLevel:"  "), newline, concatenate(indentLevel:"  "), newline) else
	if instance(x, HypertextParagraph)
	or instance(x, HypertextVoid)      then (concatenate(indentLevel:"  "), "", "", newline) else ("","","",""));
    popIndentLevel(1, if instance(x, HypertextVoid)
	then concatenate(head, "<", qname, attr, ">", tail)
	else concatenate(head, "<", qname, attr, ">", prefix,
	    apply(cont, toJSON_e), suffix, "</", qname, ">", tail)))

--toJSON(JSONEncoder, Package)   := o -> (e, x) -> html x
--toJSON(JSONEncoder, Thing)     := o -> (e, x) -> html x
--toJSON(JSONEncoder, Type)      := o -> (e, x) -> html x
toJSON(JSONEncoder, Symbol)    := o -> (e, x) -> if x === nil then "null" else toString x
toJSON(JSONEncoder, String)    := o -> (e, x) -> x
toJSON(JSONEncoder, TEX)       := o -> (e, x) -> concatenate apply(x, html1) -- TODO: retire this
toJSON(JSONEncoder, LATER)     := o -> (e, x) -> toJSON(e, x#0())
toJSON(JSONEncoder, ScriptedFunctor) := o -> (e, x) -> html x

toJSON(JSONEncoder, TO)   := o -> (e, x) -> toJSON(e, TO2{tag := x#0, format tag | if x#?1 then x#1 else ""})
toJSON(JSONEncoder, TOH)  := o -> (e, x) -> toJSON(e, SPAN nonnull { new TO from toList x, commentize headline x#0 })
toJSON(JSONEncoder, TO2)  := o -> (e, x) -> (
    tag := getPrimaryTag fixup x#0;
    -- TODO: add this to htmlLiteral?
    name := if match("^ +$", x#1) then #x#1 : "&nbsp;&nbsp;" else x#1;
    html ANCHOR {
	"title" => htmlLiteral headline tag,
	"href"  => "#" | toString package tag | "::" | format tag, name })

toJSON(JSONEncoder, VisibleList) := o -> (e, L) -> new Array from apply(L, x -> toJSON(e, x))
toJSON(JSONEncoder, HashTable)   := o -> (e, H) -> applyPairs(H, (k, v) -> (toJSON(e, k), toJSON(e, v)))

--elapsedTime L = apply(makeDocumentTag methods resolution, fetchRawDocumentation);
--Macaulay2Doc#"raw documentation"#"resolution(Ideal)"

end
restart
needs "generate-json.m2"

pkgname = "Saturation"
pkgname = "Truncations"
pkgname = "Macaulay2Doc"
elapsedTime pkg = loadPackage(pkgname, Reload => true, LoadDocumentation => true)

L = new HashTable from pkg#"raw documentation";
L = selectKeys(L, k -> match("basis", k) or match("module", k) or match("comodule", k));
L = selectValues(L, x -> not x#?PrimaryTag and not x#?"undocumented");
elapsedTime ("static/"|pkgname|".json") << format'(toJSON L, Indent => 2) << flush << close

format'(toJSON L#"annihilator", Indent => 2)

format' toJSON { TO2{ res, "res" }, TOH res, TO res }

-- {Headline, linenum, Inputs, filename, SeeAlso, Description, Options, DocumentTag, Key, Usage, Outputs}

code(html, Symbol)
toJSON(L#0, Indent => 2)
html L#0#Description
toJSON Ideal

"resolution.json" << toJSON(L, Indent => 2) << flush << close
