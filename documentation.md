---
layout: page
title: Docs
category: links
order: 2
---

*Macaulay2* includes core algorithms for computing Gröbner bases and graded or multi-graded free resolutions of modules over quotient rings of graded or multi-graded polynomial rings with a monomial ordering. The core algorithms are accessible through a versatile high level interpreted user language with a powerful debugger supporting the creation of new classes of mathematical objects and the installation of methods for computing specifically with them.

*Macaulay2* can compute Betti numbers, Ext, cohomology of coherent sheaves on projective varieties, primary decomposition of ideals, integral closure of rings, and  more.

{% for item in site.docs -%}
* [{{ item.title }}]({{ site.baseurl }}{{ item.url }})
{% endfor %}
