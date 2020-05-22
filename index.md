---
layout: default
title: Macaulay2 Documentation
parse: true
---

{::options parse_block_html="true" /}

[*Macaulay2*](https://macaulay2.com/) is a interpreted, dynamically typed programming language intended to support research in [algebraic geometry] and [commutative algebra]. Development of *Macaulay2* has been funded by the National Science Foundation since 1992.

#### A First Example
{:.label}

<div class="container">
<div class="row">
<div class="col-lg-12 col-md-12">
Computing the minimal free resolution of the [Twisted Cubic](docs/example):
</div><div class="col-lg-6 col-md-6">
#### Code:
```
R = QQ[x, y, z, w];
I = monomialCurveIdeal(R, {1, 2, 3})
C = res I
```

#### Getting help:
```
help monomialCurveIdeal
```
</div><div class="col-lg-6 col-md-6">
#### Result:
{% M2 index %}
R = QQ[x, y, z, w];
I = monomialCurveIdeal(R, {1, 2, 3})
C = res I
{% endM2 %}
  </div>
 </div>
</div>

#### Resources
{:.label}

<div class="container">
 <div class="row">
  <div class="col-lg-4 col-md-6 feature">
   <h4>Learn by Reading</h4>
   - What is Macaulay2?
   - Learning resources
   - M2 Handbook
   - Cheat Sheet
  </div>

  <div class="col-lg-4 col-md-6 feature">
   <h4>Learn by Doing</h4>
   - Try M2
   - Download M2
   - Packages
   - IDEs, Editors, and Tools
  </div>

  <div class="col-lg-4 col-md-6 feature">
   <h4>Write a Package</h4>
   - [M2 Style Guide](https://github.com/Macaulay2/M2/wiki/Package-Writing-Style-Guide)
   - Package sample
   - [`packages` directory](packages)
  </div>

  <div class="col-lg-4 col-md-6 feature">
   <h4>Documentation</h4>
   - Language Reference
   - Internal Manual
  </div>

  <div class="col-lg-4 col-md-6 feature">
   <h4>Books and Articles</h4>
   - Computations Book
   - JSAG Articles
   - M2 in arXiv
  </div>

  <div class="col-lg-4 col-md-6 feature">
   <h4>Join the Community</h4>
   - Macaulay2 Workshops
   - Mailing List
   - Github?
  </div>
 </div>
 <br>

 <div class="row">
  <div class="col-12" style="text-align: center">
   <a class="btn btn-sm btn-outline-primary" href="/learning/code-examples/">See Macaulay2 Examples</a>
   <a class="btn btn-sm btn-outline-primary" href="https://faculty.math.illinois.edu/Macaulay2/TryItOut/">Try M2 In Your Browser</a>
  </div>
 </div>
</div>


TODO:
- Editors
  - Emacs
  - Vim
  - Atom
  - vscode
- Report bug
- Contributing
- [Wikis](http://wiki.macaulay2.com/)
- [Projects](https://faculty.math.illinois.edu/Macaulay2/dev/projects/)
- Screenshots
- Getting started
  - <a href="../doc/Macaulay2/share/doc/Macaulay2/BeginningMacaulay2/html/">Beginning Macaulay2</a>, Mathematicians' Introduction to <i>Macaulay2</i>, by David Eisenbud and Michael Stillman
  - <a href="../doc/Macaulay2/share/doc/Macaulay2/Macaulay2Doc/html/_a_spfirst_sp__Macaulay2_spsession.html">a first Macaulay 2 session</a>
  - <a href="../Book/ComputationsBook/chapters/varieties/chapter-wrapper.pdf">Ideals and Varieties</a>, by Bernd Sturmfels
  - <a href="../Book/ComputationsBook/chapters/geometry/chapter-wrapper.pdf">Projective varieties and homological algebra</a>, by David Eisenbud
- Jobs
- <a href="/Macaulay2/Publications/">Publications</a>
  - <a href="http://j-sag.org/">The Journal of Software for Algebra and Geometry</a>
  - <a href="/Macaulay2/Book/">Computations in algebraic geometry with <i>Macaulay 2</i></a>, a book
  - <a href="/Macaulay2/Publications/#papers">Papers</a> referring to <i>Macaulay2</i>
  - <a href="http://www.swmath.org/software/537">Papers</a> referring to <i>Macaulay2</i> indexed by Zentralblatt
  - <a href="/Macaulay2/Citing/">How to cite</a> <i>Macaulay2</i>

- Acknowledgments
  -  <a href="/Macaulay2/Contributors/">Contributors</a>
  -  <a href="/Macaulay2/Libraries/">Software libraries</a>
  -  <a href="/Macaulay2/Funding/">Funding</a>
  -  <a href="http://www.math.columbia.edu/~bayer/Macaulay/">Macaulay</a>, the predecessor of <i>Macaulay2</i>
  -  <a href="http://en.wikipedia.org/wiki/Francis_Sowerby_Macaulay">Francis Macaulay</a>, the mathematician after whom <i>Macaulay2</i> is named
- A random paper referring to <i>Macaulay2</i>: <script type="text/javascript">citation();</script>
- A random <i>Macaulay2</i> documentation node: <script type="text/javascript">documentation();</script>

<!-- See https://hackage.haskell.org/package/AC-Angle-1.0/docs/Data-Angle.html. -->

[algebraic geometry]: http://en.wikipedia.org/wiki/Algebraic_geometry
[commutative algebra]: http://en.wikipedia.org/wiki/Commutative_algebra
