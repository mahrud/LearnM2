---
layout: default
title: Proof
---

# hi.
To start documenting, please see [the manual]({{ site.baseurl }}/manual/).

---

## packages.
{% for item in site.packages %}
* [{{ item.title }}]({{ site.baseurl }}{{ item.url }}) by {{ item.author }}{% endfor %}

## docs.
{% for item in site.docs %}
* [{{ item.title }}]({{ site.baseurl }}{{ item.url }}) by {{ item.author }}{% endfor %}
