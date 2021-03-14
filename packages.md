---
layout: page
title: Packages
category: links
order: 3
---

<iframe src="http://www2.macaulay2.com/Macaulay2/doc/Macaulay2/share/doc/Macaulay2/Macaulay2Doc/html/_packages_spprovided_spwith_sp__Macaulay2.html"
	frameborder="0" style="width: 100%; height: 90vh;" title="Official Macaulay2 Documentation"></iframe>

{% comment %}
Here is a list of the packages that are distributed with Macaulay2.
The ones that have been refereed are marked with a star.

<div class="package">
{% M2D %}
importFrom_Core { "markdown", "TO", "TT", "IMG", "HREF" };
X = help "packages provided with Macaulay2";
markdown TO := x -> markdown HREF{format first x, TT format first x};
<< replace("common/share/Macaulay2/Style", "../static", markdown drop(X#1, 1))
{% endM2D %}
</div>
{% endcomment %}
