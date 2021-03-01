---
layout: package
excerpt: the package headline
title: VirtualResolutions
---
{% raw %}
# VirtualResolutions -- a package for computing virtual resolutions

## Description
While graded minimal free resolutions are useful for studying quasicoherent sheaves over projective space, when working over a product of projective spaces or, more generally, over smooth projective toric varieties, graded minimal free resolutions over the Cox ring seem too restricted by algebraic structure that is in some sense unimportant geometrically. By allowing a limited amount of homology, virtual resolutions offer a more flexible alternative for studying toric subvarieties when compared to minimal graded free resolutions.

Introduced by Berkesch, Erman, and Smith in _Virtual resolutions for a product of projective spaces_ (see [BES20, [arXiv:1703.07631](https://arxiv.org/abs/1703.07631)]) if $X$ is a smooth toric variety, $S$ is the Cox ring of $X$ graded by the Picard group of $X$, and $B\subset S$ is the irrelevant ideal of $X$, then a virtual resolution of a graded $S$-module $M$ is a complex of graded free $S$-modules, which sheafifies to a resolution of the associated sheaf of $M$.

This package provides tools for constructing and studying virtual resolutions for products of projective spaces. In particular, it implements a number of the methods for constructing virtual resolutions for products of projective spaces as introduced by Berkesch, Erman, and Smith. This package also contains methods for constructing curves in $\PP^1\times\PP^2$, as these are a natural source for interesting virtual resolutions.

As a running example, consider three points $([1:1],[1:4])$, $([1:2],[1:5])$, and $([1:3],[1:6])$ in $\PP^1 \times \PP^1$.

```M2
i1 : X = toricProjectiveSpace(1)**toricProjectiveSpace(1);

i2 : S = ring X;

i3 : B = ideal X;

o3 : Ideal of S

i4 : J = saturate(intersect(
         ideal(x_1 - x_0, x_3 - 4*x_2),
         ideal(x_1 - 2*x_0, x_3 - 5*x_2),
         ideal(x_1 - 3*x_0, x_3 - 6*x_2)), B);

o4 : Ideal of S

i5 : minres = res J;

i6 : multigraded betti minres

        0             1               2         3
o6 = 0: 1             .               .         .
     2: .            ab               .         .
     3: . a3+a2b+ab2+b3               .         .
     4: .             . 2a3b+2a2b2+2ab3         .
     5: .             .               . a3b2+a2b3

o6 : MultigradedBettiTally
```
{:.examples}
As described in Algorithm 3.4 of Berkesch, Erman, and Smith's paper, one may construct a virtual resolution of a module from its graded minimal free resolution and an element of the multigraded Castelnuovo-Mumford regularity of the module. (See Maclagan and Smith's paper _Multigraded Castelnuovo-Mumford Regularity_ (see [MS04, [arXiv:math/0305214](https://arxiv.org/abs/math/0305214)]) for the definition of multigraded regularity.) Building on the <a title="Computation of parts of the Tate resolution on products" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/TateOnProducts/html/index.html">TateOnProducts</a> package, this package contains a function allowing one to compute the minimal elements of the multigraded Castelnuovo-Mumford regularity of a $B$-saturated module.

Continuing the example from above, we see that $(2,0)$ is an element of the multigraded regularity of $S/J$. From this we can compute a virtual resolution of $S/J$.

```M2
i7 : multigradedRegularity(X, J)

o7 = {{0, 2}, {1, 1}, {2, 0}}

o7 : List

i8 : vres = virtualOfPair(J, {{3,1}})

      1      3      2
o8 = S  <-- S  <-- S  <-- 0
                           
     0      1      2      3

o8 : ChainComplex

i9 : multigraded betti vres

        0      1    2
o9 = 0: 1      .    .
     2: .     ab    .
     3: . a3+a2b    .
     4: .      . 2a3b

o9 : MultigradedBettiTally
```
{:.examples}
Notice that this virtual resolution of $S/J$ is much shorter and thinner than the graded minimal free resolution of $S/J$. This is a common theme: virtual resolutions tend to be much shorter and less wide than graded minimal free resolutions over the Cox ring, but they still preserve geometric information about $S/J$.

In addition to the functions highlighted above, the `VirtualResolutions` package contains a number of other tools for constructing and studying virtual resolutions. In particular, there are functions to construct virtual resolutions for zero dimensionsal subschemes, to check whether a complex is a virtual resolution, and to construct curves in $\PP^1\times\PP^2$.

## Contributors
The following people have generously contributed code or worked on this package.

- [Daniel Erman](http://www.math.wisc.edu/~derman/)
- [Gregory G. Smith](https://mast.queensu.ca/~ggsmith/)
- [Lauren Cranton Heller](https://math.berkeley.edu/~lch/)

## References

- [BES20]: Berkesch, Erman, and Smith, Virtual resolutions for a product of projective spaces (see [arXiv:1703.07631](https://arxiv.org/abs/1703.07631)).
- [MS04]: Maclagan and Smith, Multigraded Castelnuovo-Mumford Regularity (see [arXiv:math/0305214](https://arxiv.org/abs/math/0305214)).

## Authors

- [Ayah Almousa](http://pi.math.cornell.edu/~aalmousa ) <[aka66@cornell.edu](mailto:aka66@cornell.edu)>
- [Christine Berkesch](http://math.umn.edu/~cberkesc/) <[cberkesc@umn.edu](mailto:cberkesc@umn.edu)>
- [Juliette Bruce](https://juliettebruce.github.io) <[jebruce2@wisc.edu](mailto:jebruce2@wisc.edu)>
- [David Eisenbud](http://www.msri.org/~de/) <[de@msri.org](mailto:de@msri.org)>
- [Michael Loper](http://math.umn.edu/~loper012/) <[loper012@umn.edu](mailto:loper012@umn.edu)>
- [Mahrud Sayrafi](http://math.umn.edu/~mahrud/) <[mahrud@umn.edu](mailto:mahrud@umn.edu)>

## Certification !["a gold star"](common/share/Macaulay2/Style/GoldStar.png)
Version **1.2** of this package was accepted for publication in [volume 10](https://msp.org/jsag/2020/10-1/) of [The Journal of Software for Algebra and Geometry](http://j-sag.org/) on 19 May 2020, in the article [The virtual resolutions package for Macaulay2](https://msp.org/jsag/2020/10-1/p06.xhtml). That version can be obtained from [the journal](https://msp.org/jsag/2020/10-1/jsag-v10-n1-x06-VirtualResolutions.zip) or from [the _Macaulay2_ source code repository
](http://github.com/Macaulay2/M2/blob/28038a52dcc3b0ad7adfd2562a9cd6b6414a6636/M2/Macaulay2/packages/VirtualResolutions.m2).

## Version
This documentation describes version **1.3** of VirtualResolutions.

## Source code
The source code from which this documentation is derived is in the file [VirtualResolutions.m2](share/Macaulay2/VirtualResolutions.m2). The auxiliary files accompanying it are in the directory [VirtualResolutions/](share/Macaulay2/VirtualResolutions/).

## Exports

- Functions and commands
  - <a title="creates the ideal of a curve in P^1xP^2 from the ideal of a curve in P^3" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_curve__From__P3to__P1__P2.html">curveFromP3toP1P2</a> -- creates the ideal of a curve in P^1xP^2 from the ideal of a curve in P^3
  - <a title="creates a list of subsets of the minimal generators that generate a given ideal up to saturation" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_ideal__Sheaf__Gens.html">idealSheafGens</a> -- creates a list of subsets of the minimal generators that generate a given ideal up to saturation
  - <a title="checks whether a chain complex is a virtual resolution" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_is__Virtual.html">isVirtual</a> -- checks whether a chain complex is a virtual resolution
  - <a title="computes the minimal elements of the multigraded regularity of a module over a multigraded ring" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_multigraded__Regularity.html">multigradedRegularity</a> -- computes the minimal elements of the multigraded regularity of a module over a multigraded ring
  - <a title="creates the ideal of a random curve in P^1xP^2" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_random__Curve__P1__P2.html">randomCurveP1P2</a> -- creates the ideal of a random curve in P^1xP^2
  - <a title="creates the ideal of a random monomial curve of degree (d,e) in P^1xP^2" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_random__Monomial__Curve.html">randomMonomialCurve</a> -- creates the ideal of a random monomial curve of degree (d,e) in P^1xP^2
  - <a title="creates the ideal of a random rational curve of degree (d,e) in P^1xP^2" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_random__Rational__Curve.html">randomRationalCurve</a> -- creates the ideal of a random rational curve of degree (d,e) in P^1xP^2
  - <a title="returns a virtual resolution of a zero-dimensional scheme" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_resolve__Via__Fat__Point.html">resolveViaFatPoint</a> -- returns a virtual resolution of a zero-dimensional scheme
  - <a title="creates a virtual resolution from a free resolution by keeping only summands of specified degrees" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_virtual__Of__Pair.html">virtualOfPair</a> -- creates a virtual resolution from a free resolution by keeping only summands of specified degrees
- Methods
  - `"curveFromP3toP1P2(Ideal)"` -- see <a title="creates the ideal of a curve in P^1xP^2 from the ideal of a curve in P^3" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_curve__From__P3to__P1__P2.html">curveFromP3toP1P2</a> -- creates the ideal of a curve in P^1xP^2 from the ideal of a curve in P^3
  - `"idealSheafGens(ZZ,Ideal,Ideal)"` -- see <a title="creates a list of subsets of the minimal generators that generate a given ideal up to saturation" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_ideal__Sheaf__Gens.html">idealSheafGens</a> -- creates a list of subsets of the minimal generators that generate a given ideal up to saturation
  - `"idealSheafGens(ZZ,Ideal,NormalToricVariety)"` -- see <a title="creates a list of subsets of the minimal generators that generate a given ideal up to saturation" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_ideal__Sheaf__Gens.html">idealSheafGens</a> -- creates a list of subsets of the minimal generators that generate a given ideal up to saturation
  - `"isVirtual(Ideal,ChainComplex)"` -- see <a title="checks whether a chain complex is a virtual resolution" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_is__Virtual.html">isVirtual</a> -- checks whether a chain complex is a virtual resolution
  - `"isVirtual(NormalToricVariety,ChainComplex)"` -- see <a title="checks whether a chain complex is a virtual resolution" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_is__Virtual.html">isVirtual</a> -- checks whether a chain complex is a virtual resolution
  - `"multigradedRegularity(NormalToricVariety,Ideal)"` -- see <a title="computes the minimal elements of the multigraded regularity of a module over a multigraded ring" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_multigraded__Regularity.html">multigradedRegularity</a> -- computes the minimal elements of the multigraded regularity of a module over a multigraded ring
  - `"multigradedRegularity(NormalToricVariety,Module)"` -- see <a title="computes the minimal elements of the multigraded regularity of a module over a multigraded ring" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_multigraded__Regularity.html">multigradedRegularity</a> -- computes the minimal elements of the multigraded regularity of a module over a multigraded ring
  - `"multigradedRegularity(Ring,Ideal)"` -- see <a title="computes the minimal elements of the multigraded regularity of a module over a multigraded ring" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_multigraded__Regularity.html">multigradedRegularity</a> -- computes the minimal elements of the multigraded regularity of a module over a multigraded ring
  - `"multigradedRegularity(Ring,Module)"` -- see <a title="computes the minimal elements of the multigraded regularity of a module over a multigraded ring" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_multigraded__Regularity.html">multigradedRegularity</a> -- computes the minimal elements of the multigraded regularity of a module over a multigraded ring
  - `"randomCurveP1P2(ZZ,ZZ)"` -- see <a title="creates the ideal of a random curve in P^1xP^2" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_random__Curve__P1__P2.html">randomCurveP1P2</a> -- creates the ideal of a random curve in P^1xP^2
  - `"randomCurveP1P2(ZZ,ZZ,Ring)"` -- see <a title="creates the ideal of a random curve in P^1xP^2" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_random__Curve__P1__P2.html">randomCurveP1P2</a> -- creates the ideal of a random curve in P^1xP^2
  - `"randomMonomialCurve(ZZ,ZZ)"` -- see <a title="creates the ideal of a random monomial curve of degree (d,e) in P^1xP^2" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_random__Monomial__Curve.html">randomMonomialCurve</a> -- creates the ideal of a random monomial curve of degree (d,e) in P^1xP^2
  - `"randomMonomialCurve(ZZ,ZZ,Ring)"` -- see <a title="creates the ideal of a random monomial curve of degree (d,e) in P^1xP^2" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_random__Monomial__Curve.html">randomMonomialCurve</a> -- creates the ideal of a random monomial curve of degree (d,e) in P^1xP^2
  - `"randomRationalCurve(ZZ,ZZ)"` -- see <a title="creates the ideal of a random rational curve of degree (d,e) in P^1xP^2" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_random__Rational__Curve.html">randomRationalCurve</a> -- creates the ideal of a random rational curve of degree (d,e) in P^1xP^2
  - `"randomRationalCurve(ZZ,ZZ,Ring)"` -- see <a title="creates the ideal of a random rational curve of degree (d,e) in P^1xP^2" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_random__Rational__Curve.html">randomRationalCurve</a> -- creates the ideal of a random rational curve of degree (d,e) in P^1xP^2
  - `"resolveViaFatPoint(Ideal,Ideal,List)"` -- see <a title="returns a virtual resolution of a zero-dimensional scheme" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_resolve__Via__Fat__Point.html">resolveViaFatPoint</a> -- returns a virtual resolution of a zero-dimensional scheme
  - `"virtualOfPair(ChainComplex,List)"` -- see <a title="creates a virtual resolution from a free resolution by keeping only summands of specified degrees" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_virtual__Of__Pair.html">virtualOfPair</a> -- creates a virtual resolution from a free resolution by keeping only summands of specified degrees
  - `"virtualOfPair(Ideal,List)"` -- see <a title="creates a virtual resolution from a free resolution by keeping only summands of specified degrees" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_virtual__Of__Pair.html">virtualOfPair</a> -- creates a virtual resolution from a free resolution by keeping only summands of specified degrees
  - `"virtualOfPair(Module,List)"` -- see <a title="creates a virtual resolution from a free resolution by keeping only summands of specified degrees" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_virtual__Of__Pair.html">virtualOfPair</a> -- creates a virtual resolution from a free resolution by keeping only summands of specified degrees
- Symbols
  - <a title="limit number of attempts for randomCurveP1P2" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/___Attempt.html">Attempt</a> -- limit number of attempts for randomCurveP1P2
  - <a title="combines generators of same degree into a general linear combination" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/___General__Elements.html">GeneralElements</a> -- combines generators of same degree into a general linear combination
  - `"LowerLimit"` -- see <a title="computes the minimal elements of the multigraded regularity of a module over a multigraded ring" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_multigraded__Regularity.html">multigradedRegularity</a> -- computes the minimal elements of the multigraded regularity of a module over a multigraded ring
  - `"UpperLimit"` -- see <a title="computes the minimal elements of the multigraded regularity of a module over a multigraded ring" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/_multigraded__Regularity.html">multigradedRegularity</a> -- computes the minimal elements of the multigraded regularity of a module over a multigraded ring
  - <a title="Determines if curve is disjoint from base loci" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/___Preserve__Degree.html">PreserveDegree</a> -- Determines if curve is disjoint from base loci
{:.exports}

## For the programmer
The object <a title="a package for computing virtual resolutions" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/VirtualResolutions/html/index.html">VirtualResolutions</a> is a <a title="the class of all packages" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/Macaulay2Doc/html/___Package.html">package</a>
.
{:.waystouse}
{% endraw %}