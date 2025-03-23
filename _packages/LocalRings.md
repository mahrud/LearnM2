---
layout: package
title: LocalRings
description: Localizing polynomial rings at a prime ideal
author: Mahrud Sayrafi
---

## Description

The basic definition of localization of polynomial rings at prime ideals along with various elementary operations are defined in m2/localring.m2, which in turn depends on a raw local ring type defined in e/localrings.hpp. This package extends the following methods to such local rings: syz, resolution, length, trim, mingens, minimalPresentation, symbol//, inducedMap, symbol:, saturate, annihilate.

Note: Methods isSubset and symbol== are fixed in m2/modules2.m2 and reduce is fixed in m2/matrix.m2. Many other methods that only rely on the methods above, such as map, modulo, subquotient, kernel, cokernel, image, homology, Hom, Ext, Tor, etc. work for local rings automatically.

If you need specific methods that do not work, please inform Mahrud Sayrafi.

{% M2 LocalRings %}
R = ZZ/32003[a..d];
{% endM2 %}

Rational quartic curve in $$\P^3$$:

{% M2 LocalRings %}
I = monomialCurveIdeal(R,{1,3,4})
C = res I
M = ideal"a,b,c,d"; "maximal ideal at the origin";
P = ideal"a,b,c"; "prime ideal";
RM = localRing(R, M);
D = C ** RM;
E = pruneComplex D
{% endM2 %}

That is to say, the rational quartic curve is not locally Cohen-Macaulay at the origin Therefore the curve is not Cohen-Macaulay

{% M2 LocalRings %}
RP = localRing(R, P);
D' = C ** RP;
E' = pruneComplex D'
{% endM2 %}

However, the curve is Cohen-Macaulay at the prime ideal P (and in fact any other prime ideal)

## Caveat
Currently limited to localization at prime ideals rather than any multiplicatively closed set. Quotients of local rings are not implemented yet. Moreover, certain functions (such as symbol%, radical, minimalPrimes, leadingCoefficient) are ambiguous or not yet defined.

## See also
- [PruneComplex](../../PruneComplex/html/index.html "Pruning chain complexes over polynomial and local rings") -- Pruning chain complexes over polynomial and local rings

## Authors
- [Mahrud Sayrafi](http://ocf.berkeley.edu/~mahrud/) <[mahrud@berkeley.edu](mailto:mahrud@berkeley.edu)>
- [Mike Stillman](http://www.math.cornell.edu/~mike/) <[mike@math.cornell.edu](mailto:mike@math.cornell.edu)>
- [David Eisenbud](http://www.msri.org/~de/) <[de@msri.org](mailto:de@msri.org)>

## Version
This documentation describes version <b>2.0</b> of LocalRings.

## Source code
The source code from which this documentation is derived is in the file [LocalRings.m2](../../../../Macaulay2/LocalRings.m2).  The auxiliary files accompanying it are in the directory [LocalRings/](../../../../Macaulay2/LocalRings/).

## Exports
- Functions and commands
  - [`hilbertSamuelFunction`](_hilbert__Samuel__Function.html "Computes the Hilbert-Samuel Function of Modules over Local Rings") -- Computes the Hilbert-Samuel Function of Modules over Local Rings
  - [`liftUp`](_lift__Up.html "Lifts various objects over R_P to R.") -- Lifts various objects over R_P to R.
  - `localComplement` (missing documentation<!-- tag: localComplement -->)
  - `localMingens` (missing documentation<!-- tag: localMingens -->)
  - `localModulo` (missing documentation<!-- tag: localModulo -->)
  - `localPrune` (missing documentation<!-- tag: localPrune -->)
  - `localResolution` (missing documentation<!-- tag: localResolution -->)
  - `localsyz` (missing documentation<!-- tag: localsyz -->)
  - `setMaxIdeal` (missing documentation<!-- tag: setMaxIdeal -->)
- Symbols
  - `maxIdeal` (missing documentation<!-- tag: maxIdeal -->)
  - `presentationComplex` (missing documentation<!-- tag: presentationComplex -->)
  - `residueMap` (missing documentation<!-- tag: residueMap -->)
{:.exports}
