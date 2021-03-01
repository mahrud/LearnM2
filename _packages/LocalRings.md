---
layout: package
excerpt: the package headline
title: LocalRings
---
{% raw %}
# LocalRings -- Localizing polynomial rings at a prime ideal

## Description
The basic definition of localization of polynomial rings at prime ideals along with various elementary operations are defined in m2/localring.m2, which in turn depends on a raw local ring type defined in e/localrings.hpp. This package extends the following methods to such local rings: syz, resolution, length, trim, mingens, minimalPresentation, symbol//, inducedMap, symbol:, saturate, annihilate.

Note: Methods isSubset and symbol== are fixed in m2/modules2.m2 and reduce is fixed in m2/matrix.m2. Many other methods that only rely on the methods above, such as map, modulo, subquotient, kernel, cokernel, image, homology, Hom, Ext, Tor, etc. work for local rings automatically.

If you need specific methods that do not work, please inform Mahrud Sayrafi.

```M2
i1 : R = ZZ/32003[a..d];
```
{:.examples}
Rational quartic curve in P^3:

```M2
i2 : I = monomialCurveIdeal(R,{1,3,4})

                        3      2     2    2    3    2
o2 = ideal (b*c - a*d, c  - b*d , a*c  - b d, b  - a c)

o2 : Ideal of R

i3 : C = res I

      1      4      4      1
o3 = R  <-- R  <-- R  <-- R  <-- 0
                                  
     0      1      2      3      4

o3 : ChainComplex

i4 : M = ideal"a,b,c,d"; "maximal ideal at the origin";

o4 : Ideal of R

i6 : P = ideal"a,b,c"; "prime ideal";

o6 : Ideal of R

i8 : RM = localRing(R, M);

i9 : D = C ** RM;

i10 : E = pruneComplex D

        1       4       4       1
o10 = RM  <-- RM  <-- RM  <-- RM
                               
      0       1       2       3

o10 : ChainComplex
```
{:.examples}
That is to say, the rational quartic curve is not locally Cohen-Macaulay at the origin. Therefore the curve is not Cohen-Macaulay

```M2
i11 : RP = localRing(R, P);

i12 : D' = C ** RP;

i13 : E' = pruneComplex D'

        1       2       1
o13 = RP  <-- RP  <-- RP
                       
      0       1       2

o13 : ChainComplex
```
{:.examples}
However, the curve is Cohen-Macaulay at the prime ideal P (and in fact any other prime ideal)

## Caveat
Currently limited to localization at prime ideals rather than any multiplicatively closed set. Quotients of local rings are not implemented yet. Moreover, certain functions (such as symbol%, radical, minimalPrimes, leadingCoefficient) are ambiguous or not yet defined.

## See also

- <a title="Pruning chain complexes over polynomial and local rings" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/index.html">PruneComplex</a> -- Pruning chain complexes over polynomial and local rings

## Authors

- [Mahrud Sayrafi](http://ocf.berkeley.edu/~mahrud/) <[mahrud@berkeley.edu](mailto:mahrud@berkeley.edu)>
- [Mike Stillman](http://www.math.cornell.edu/~mike/) <[mike@math.cornell.edu](mailto:mike@math.cornell.edu)>
- [David Eisenbud](http://www.msri.org/~de/) <[de@msri.org](mailto:de@msri.org)>

## Version
This documentation describes version **2.0** of LocalRings.

## Source code
The source code from which this documentation is derived is in the file [LocalRings.m2](share/Macaulay2/LocalRings.m2). The auxiliary files accompanying it are in the directory [LocalRings/](share/Macaulay2/LocalRings/).

## Exports

- Types
  - <tt>LocalRing</tt> (missing documentation<!-- tag: LocalRing -->)
- Functions and commands
  - <a title="Computes the Hilbert-Samuel Function of Modules over Local Rings" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_hilbert__Samuel__Function.html">hilbertSamuelFunction</a> -- Computes the Hilbert-Samuel Function of Modules over Local Rings
  - <a title="Lifts various objects over R_P to R." href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_lift__Up.html">liftUp</a> -- Lifts various objects over R_P to R.
  - <a title="find the splitting of the target of a map" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_local__Complement.html">localComplement</a> -- find the splitting of the target of a map
  - <a title="finds a minimal set of generators" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_local__Mingens.html">localMingens</a> -- finds a minimal set of generators
  - <a title="find the pre-image (pullback) of image of a map over a local ring" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_local__Modulo.html">localModulo</a> -- find the pre-image (pullback) of image of a map over a local ring
  - <a title="find a minimal presentation" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_local__Prune.html">localPrune</a> -- find a minimal presentation
  - <a title="find a resolution over a local ring" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_local__Resolution.html">localResolution</a> -- find a resolution over a local ring
  - `"localRing"`
  - <a title="find syzygies" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_localsyz.html">localsyz</a> -- find syzygies
  - <a title="set the maximal ideal for local ring methods" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_set__Max__Ideal.html">setMaxIdeal</a> -- set the maximal ideal for local ring methods
- Methods
  - `"hilbertSamuelFunction(Ideal,Module,ZZ)"` -- see <a title="Computes the Hilbert-Samuel Function of Modules over Local Rings" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_hilbert__Samuel__Function.html">hilbertSamuelFunction</a> -- Computes the Hilbert-Samuel Function of Modules over Local Rings
  - `"hilbertSamuelFunction(Ideal,Module,ZZ,ZZ)"` -- see <a title="Computes the Hilbert-Samuel Function of Modules over Local Rings" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_hilbert__Samuel__Function.html">hilbertSamuelFunction</a> -- Computes the Hilbert-Samuel Function of Modules over Local Rings
  - `"hilbertSamuelFunction(Module,ZZ)"` -- see <a title="Computes the Hilbert-Samuel Function of Modules over Local Rings" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_hilbert__Samuel__Function.html">hilbertSamuelFunction</a> -- Computes the Hilbert-Samuel Function of Modules over Local Rings
  - `"hilbertSamuelFunction(Module,ZZ,ZZ)"` -- see <a title="Computes the Hilbert-Samuel Function of Modules over Local Rings" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_hilbert__Samuel__Function.html">hilbertSamuelFunction</a> -- Computes the Hilbert-Samuel Function of Modules over Local Rings
  - `"liftUp(Ideal,Ring)"` -- see <a title="Lifts various objects over R_P to R." href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_lift__Up.html">liftUp</a> -- Lifts various objects over R_P to R.
  - `"liftUp(Matrix,Ring)"` -- see <a title="Lifts various objects over R_P to R." href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_lift__Up.html">liftUp</a> -- Lifts various objects over R_P to R.
  - `"liftUp(Module,Ring)"` -- see <a title="Lifts various objects over R_P to R." href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_lift__Up.html">liftUp</a> -- Lifts various objects over R_P to R.
  - `"liftUp(MutableMatrix,Ring)"` -- see <a title="Lifts various objects over R_P to R." href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_lift__Up.html">liftUp</a> -- Lifts various objects over R_P to R.
  - `"liftUp(Thing)"` -- see <a title="Lifts various objects over R_P to R." href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_lift__Up.html">liftUp</a> -- Lifts various objects over R_P to R.
  - `"localComplement(Matrix)"` -- see <a title="find the splitting of the target of a map" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_local__Complement.html">localComplement</a> -- find the splitting of the target of a map
  - `"localMingens(Matrix)"` -- see <a title="finds a minimal set of generators" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_local__Mingens.html">localMingens</a> -- finds a minimal set of generators
  - `"localModulo(Matrix,Matrix)"` -- see <a title="find the pre-image (pullback) of image of a map over a local ring" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_local__Modulo.html">localModulo</a> -- find the pre-image (pullback) of image of a map over a local ring
  - `"localPrune(Module)"` -- see <a title="find a minimal presentation" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_local__Prune.html">localPrune</a> -- find a minimal presentation
  - `"localResolution(Ideal)"` -- see <a title="find a resolution over a local ring" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_local__Resolution.html">localResolution</a> -- find a resolution over a local ring
  - `"localResolution(Module)"` -- see <a title="find a resolution over a local ring" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_local__Resolution.html">localResolution</a> -- find a resolution over a local ring
  - `"localRing(Ring,Ideal)"`
  - `"localsyz(Matrix)"` -- see <a title="find syzygies" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_localsyz.html">localsyz</a> -- find syzygies
  - `"setMaxIdeal(Ideal)"` -- see <a title="set the maximal ideal for local ring methods" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/_set__Max__Ideal.html">setMaxIdeal</a> -- set the maximal ideal for local ring methods
- Symbols
  - <tt>maxIdeal</tt> (missing documentation<!-- tag: maxIdeal -->)
  - <tt>MaximalIdeal</tt> (missing documentation<!-- tag: MaximalIdeal -->)
  - <tt>presentationComplex</tt> (missing documentation<!-- tag: presentationComplex -->)
  - <tt>residueMap</tt> (missing documentation<!-- tag: residueMap -->)
{:.exports}

## For the programmer
The object <a title="Localizing polynomial rings at a prime ideal" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/index.html">LocalRings</a> is a <a title="the class of all packages" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/Macaulay2Doc/html/___Package.html">package</a>
.
{:.waystouse}
{% endraw %}