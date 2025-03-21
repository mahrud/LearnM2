---
layout: entry
title: Learn
category: links
order: 2
---

<div id="content"></div>

<script src="{{ site.url }}{{ site.baseurl }}/static/packages.js"></script>
<script>
if ( window.location.hash ) { updatePage(); } else {
    openPackage("#Macaulay2Doc");
};
</script>

{% comment %}
{% for item in site.docs -%}
* [{{ item.title }}]({{ site.baseurl }}{{ item.url }})
{% endfor %}

<div class="package">
{% M2D %}
debug Core
X = help "Macaulay2";
markdown TO := x -> markdown HREF{format first x, TT format first x};
markdown TO2 := x -> markdown HREF{format first x, last x};
markdown TOH := x -> markdown HREF{format first x, format first x};
markdown MENU := x -> concatenate apply(x, markdown)
<< replace("common/share/Macaulay2/Style", "../static", markdown X#4)
{% endM2D %}
</div>
{% endcomment %}
