---
layout: doc
title: The Twisted Cubic
author: Mahrud Sayrafi
---

Let's first define the coordinate ring of \( \P^3 \), where the twisted cubic lies:
{% M2 example %}
kk = ZZ/32003;
R = kk[x,y,z,w]; -- this is a ring
{% endM2 %}

## FIXME
## monomialCurveIdeal
{:.label}

This methods yields the twisted cubic as the ideal of a projective curve given parametrically by the map:
\\[
\begin{aligned}
k[x,y,z] &\to k[t] \cr
x &\mapsto t^3 \cr
y &\mapsto t^2 \cr
z &\mapsto t.
 \end{aligned}
 \\]

{% M2 example %}
monomialCurveIdeal(R, {1,2,3})
{% endM2 %}


## Determinantal Ideal
{:.label}

This method defines the twisted cubic as a determinantal ideal of $2\times 2$ minors, that is:
\\[
I = I_2 \begin{pmatrix}
x & y & z \cr
y & z & w
\end{pmatrix}\\]

{% M2 example %}
minors(2, matrix {{R_0, R_1, R_2},{R_1,R_2,R_3}})
{% endM2 %}


## Veronese Embedding
{:.label}

This method defines the twisted cubic as the kernel of the Veronese embedding of degree three on the projective line.
That is:

## FIXME

{% M2 example %}
kernel map(kk[s,t], R, {s^3, s^2*t, s*t^2, t^3})
{% endM2 %}
