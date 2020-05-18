---
layout: page
title: Packages
category: links
order: 3
---

Macaulay2 packages extend its functionality:

{% for item in site.packages -%}
* [{{ item.title }}]({{ site.baseurl }}{{ item.url }}) by {{ item.author }}
{%- endfor %}
