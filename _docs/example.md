---
layout: doc
title: Example
description: The Twisted Cubic Curve
author: Mahrud Sayrafi
---

# The Twisted Cubic

{% M2 example %}
kk = ZZ/32003
R = kk[x,y,z,w] -- this is a ring
I = monomialCurveIdeal(R, {1,2,3})
I == minors(2, matrix {{R_0, R_1, R_2},{R_1,R_2,R_3}})
I == kernel map(kk[s,t], R, {s^3, s^2*t, s*t^2, t^3})
{% endM2 %}

# F-Purity

Checking that some ideals are F-pure:

{% M2 example %}
p = 5;
S = ZZ/p[x,y,z];
f = x^2+y^3+z^5+(x*y*z)^3
m = ideal(x^p,y^p,z^p)
f^(p-1) % m == 0
{% endM2 %}

Can also check using `TestIdeals` package:

{% M2 example %}
needsPackage "TestIdeals"
isFPure (S/f)
{% endM2 %}
