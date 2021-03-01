---
layout: page
title: Packages
category: links
order: 3
---

Macaulay2 packages extend its functionality:

{% for item in site.packages %}{% if item.layout == "package" -%}
* [{{ item.title }}]({{ site.baseurl }}{{ item.url }}): {{ item.excerpt }}
{% endif %}{% endfor %}
