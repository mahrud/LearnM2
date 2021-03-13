---
layout: default
title: Macaulay2 Documentation
parse: true
---

{::options parse_block_html="true" /}

[_Macaulay2_](https://macaulay2.com/) is an interpreted, dynamically typed programming language intended to support research in [algebraic geometry] and [commutative algebra] using open sourced software.

[algebraic geometry]: http://en.wikipedia.org/wiki/Algebraic_geometry
[commutative algebra]: http://en.wikipedia.org/wiki/Commutative_algebra

---

#### A First Example
{:.label}

<div class="row">
 <div class="col-lg-12 col-md-12">
  Here is an example of how to compute the minimal free resolution of the [Twisted Cubic](docs/example):
 </div><div class="col-md-6">
#### Code:
```
R = QQ[x, y, z, w]; -- defines a ring
I = monomialCurveIdeal(R, {1, 2, 3})
C = res I -- computes the resolution
```
<br />

#### Getting help:
```
-- quick usage information
? monomialCurveIdeal
```
```
-- details and examples
help monomialCurveIdeal
```
```
-- documentation on the web
viewHelp monomialCurveIdeal
```

 </div>
 <div class="col-md-6">
#### Result:
{% M2 index %}
R = QQ[x, y, z, w];
I = monomialCurveIdeal(R, {1, 2, 3})
C = res I
{% endM2 %}
 </div>
</div>

<div class="row">
 <div class="col-12" style="text-align: center">
  <a class="btn btn-sm btn-outline-primary" href="download">Download Macaulay2</a>
  <a class="btn btn-sm btn-outline-primary" href="http://www.unimelb-macaulay2.cloud.edu.au">Try M2 in a Browser</a>
 </div>
</div>

---

<div class="row justify-content-around">
 <div class="col-auto feature">
  <h4>Learn by Reading</h4>
  - [Beginning Macaulay2](BeginningMacaulay2) <!-- TODO: [a first Macaulay2 session](a first Macaulay2 session)? -->
  - [Computations Book](book)
  - [Cheat Sheet](cheatsheat)
 </div>

 <div class="col-auto feature">
  <h4>Learn by Doing</h4>
  - [Project Ideas](https://faculty.math.illinois.edu/Macaulay2/dev/projects/)
  - [Editors and Workflows](examples)
 </div>

 <div class="col-auto feature">
  <h4>Write a Package</h4>
  - [M2 Style Guide](https://github.com/Macaulay2/M2/wiki/Package-Writing-Style-Guide)
  - [Package directory](packages)
 </div>

 <div class="col-auto feature">
  <h4>Documentation</h4>
  - [Language Reference](reference)
  - [Internal Notes](https://github.com/Macaulay2/M2/wiki/Internals%3A-Meeting-Notes)
  - [Source Code](https://github.com/Macaulay2/M2)
 </div>

 <div class="col-auto feature">
  <h4>M2 in Research</h4>
  - [Books and Articles](https://faculty.math.illinois.edu/Macaulay2/Publications)
  - [Citing Macaulay2](citing)
  - [JSAG](http://j-sag.org/)
 </div>

 <div class="col-auto feature">
  <h4>Join the Community</h4>
  - [Workshops]({{ site.baseurl }}/workshops)
  - [Slack Workspace](https://m2internals.slack.com/)
  - [Google Groups](http://groups.google.com/group/macaulay2)
 </div>
</div>

---

<div class="row justify-content-around align-items-center">
 <div class="col-2 feature">
  <a href="https://www.gnu.org/software/emacs/">
<img style="height: 100%; width: 100%; object-fit: contain" src="https://www.gnu.org/software/emacs/images/emacs.png"/>
  </a>
 </div>

 <div class="col feature">
  The recommended IDE for using _Macaulay2_ in research is [Emacs](https://www.gnu.org/software/emacs/)
  (here is a [cheat sheet](https://www.gnu.org/software/emacs/refcards/pdf/refcard.pdf)).
  Community plugins for Vim, Atom, VSCode, and Sublime are also available.
 </div>
</div>

<!-- TODO: Screenshots -->

---

<div class="row justify-content-around align-items-center">
 <div class="col feature">
  Development of _Macaulay2_ has been funded by the National Science Foundation since 1992.
  We also acknowledge our [contributors](contributors),
  [software libraries](libraries) used in _Macaulay2_, as well as
  [Macaulay](http://www.math.columbia.edu/~bayer/Macaulay/), the predecessor of _Macaulay2_.

  The namesake of _Macaulay2_ is [Francis Macaulay FRS](http://en.wikipedia.org/wiki/Francis_Sowerby_Macaulay).
 </div>

 <div class="col-2 feature">
  <a href="https://www.nsf.gov/">
   <img style="height: 100%; width: 100%; object-fit: contain" src="https://www.nsf.gov/images/logos/NSF_4-Color_bitmap_Logo_thumb.jpg"/>
  </a>
 </div>
</div>

<!--
---

<div class="row justify-content-around align-items-center">
 <div class="col feature">
 - A random paper referring to _Macaulay2_: <script type="text/javascript">citation();</script>
 - A random _Macaulay2_ package: <script type="text/javascript">documentation();</script>
 </div>
</div>

---

<div class="row justify-content-around align-items-center">
 <div class="col feature">
 </div>
</div>

-->
