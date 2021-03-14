---
layout: page
title: Docs
category: links
order: 2
---

<iframe src="https://faculty.math.illinois.edu/Macaulay2/doc/Macaulay2/share/doc/Macaulay2/Macaulay2Doc/html/"
	frameborder="0" style="width: 100%; height: 90vh;" title="Official Macaulay2 Documentation"></iframe>

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
