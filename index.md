---
layout: default
title: Macaulay2 Documentation
---

### Packages
{% for item in site.packages %}
* [{{ item.title }}]({{ site.baseurl }}{{ item.url }}) by {{ item.author }}{% endfor %}

### Index
{% for item in site.docs %}
* [{{ item.title }}]({{ site.baseurl }}{{ item.url }}) by {{ item.author }}{% endfor %}
