---
layout: package
excerpt: the package headline
title: PruneComplex
---
{% raw %}
# PruneComplex -- Pruning chain complexes over polynomial and local rings

## Description
This package includes various methods for pruning chain complexes over polynomial and local rings. In particular, in the local or graded case the output is guaranteed to be a minimal free resolution.

Algorithms in this package are also implemented using C++ in e/mutablecomplex.hpp for speed.

```M2
i1 : R = ZZ/32003[vars(0..17)];

i2 : m1 = genericMatrix(R,a,3,3)

o2 = | a d g |
     | b e h |
     | c f i |

             3       3
o2 : Matrix R  <--- R

i3 : m2 = genericMatrix(R,j,3,3)

o3 = | j m p |
     | k n q |
     | l o r |

             3       3
o3 : Matrix R  <--- R

i4 : I = ideal(m1*m2-m2*m1)

o4 = ideal (d*k + g*l - b*m - c*p, b*j - a*k + e*k + h*l - b*n - c*q, c*j +
     ------------------------------------------------------------------------
     f*k - a*l + i*l - b*o - c*r, - d*j + a*m - e*m + d*n + g*o - f*p, - d*k
     ------------------------------------------------------------------------
     + b*m + h*o - f*q, - d*l + c*m + f*n - e*o + i*o - f*r, - g*j - h*m +
     ------------------------------------------------------------------------
     a*p - i*p + d*q + g*r, - g*k - h*n + b*p + e*q - i*q + h*r, - g*l - h*o
     ------------------------------------------------------------------------
     + c*p + f*q)

o4 : Ideal of R
```
{:.examples}
Here we produce an intentionally nonminimal resolution:

```M2
i5 : C = res(I, FastNonminimal=>true)

      1      26      108      208      221      132      41      5
o5 = R  <-- R   <-- R    <-- R    <-- R    <-- R    <-- R   <-- R  <-- 0
                                                                        
     0      1       2        3        4        5        6       7      8

o5 : ChainComplex
```
{:.examples}
Now we prune the resolution above to get a minimal resolution:

```M2
i6 : D = pruneComplex(C, UnitTest => isScalar)

      1      8      33      60      61      32      5
o6 = R  <-- R  <-- R   <-- R   <-- R   <-- R   <-- R
                                                    
     0      1      2       3       4       5       6

o6 : ChainComplex

i7 : isCommutative D.cache.pruningMap

o7 = true

i8 : betti D == betti res I

o8 = true
```
{:.examples}

## Caveat
Only supports localization at prime ideals.

## See also

- <a title="Localizing polynomial rings at a prime ideal" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/LocalRings/html/index.html">LocalRings</a> -- Localizing polynomial rings at a prime ideal

## Authors

- [Mahrud Sayrafi](http://ocf.berkeley.edu/~mahrud/) <[mahrud@berkeley.edu](mailto:mahrud@berkeley.edu)>
- [Mike Stillman](http://www.math.cornell.edu/~mike/) <[mike@math.cornell.edu](mailto:mike@math.cornell.edu)>

## Version
This documentation describes version **1.0** of PruneComplex.

## Source code
The source code from which this documentation is derived is in the file [PruneComplex.m2](share/Macaulay2/PruneComplex.m2). The auxiliary files accompanying it are in the directory [PruneComplex/](share/Macaulay2/PruneComplex/).

## Exports

- Functions and commands
  - <a title="check whether a ring element is a scalar" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_is__Scalar.html">isScalar</a> -- check whether a ring element is a scalar
  - <a title="Prunes a chain complex or list of mutable matrices" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_prune__Complex.html">pruneComplex</a> -- Prunes a chain complex or list of mutable matrices
  - <a title="Prunes a single differential in a chain complex or list of mutable matrices" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_prune__Diff.html">pruneDiff</a> -- Prunes a single differential in a chain complex or list of mutable matrices
  - <a title="Prunes a unit of a differential in a list of mutable matrices" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_prune__Unit.html">pruneUnit</a> -- Prunes a unit of a differential in a list of mutable matrices
  - <a title="Converts a list of mutable matrices into a ChainComplex." href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_to__Chain__Complex.html">toChainComplex</a> -- Converts a list of mutable matrices into a ChainComplex.
  - <a title="Converts a chain complex into a list of mutable matrices." href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_to__Mutable__Complex.html">toMutableComplex</a> -- Converts a chain complex into a list of mutable matrices.
- Methods
  - `"isScalar(RingElement)"` -- see <a title="check whether a ring element is a scalar" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_is__Scalar.html">isScalar</a> -- check whether a ring element is a scalar
  - `"pruneComplex(ChainComplex)"` -- see <a title="Prunes a chain complex or list of mutable matrices" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_prune__Complex.html">pruneComplex</a> -- Prunes a chain complex or list of mutable matrices
  - `"pruneComplex(ChainComplex,ZZ)"` -- see <a title="Prunes a chain complex or list of mutable matrices" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_prune__Complex.html">pruneComplex</a> -- Prunes a chain complex or list of mutable matrices
  - `"pruneComplex(List)"` -- see <a title="Prunes a chain complex or list of mutable matrices" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_prune__Complex.html">pruneComplex</a> -- Prunes a chain complex or list of mutable matrices
  - `"pruneComplex(List,ZZ)"` -- see <a title="Prunes a chain complex or list of mutable matrices" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_prune__Complex.html">pruneComplex</a> -- Prunes a chain complex or list of mutable matrices
  - `"pruneDiff(ChainComplex,ZZ)"` -- see <a title="Prunes a single differential in a chain complex or list of mutable matrices" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_prune__Diff.html">pruneDiff</a> -- Prunes a single differential in a chain complex or list of mutable matrices
  - `"pruneDiff(ChainComplex,ZZ,List)"` -- see <a title="Prunes a single differential in a chain complex or list of mutable matrices" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_prune__Diff.html">pruneDiff</a> -- Prunes a single differential in a chain complex or list of mutable matrices
  - `"pruneDiff(List,ZZ)"` -- see <a title="Prunes a single differential in a chain complex or list of mutable matrices" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_prune__Diff.html">pruneDiff</a> -- Prunes a single differential in a chain complex or list of mutable matrices
  - `"pruneDiff(List,ZZ,List)"` -- see <a title="Prunes a single differential in a chain complex or list of mutable matrices" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_prune__Diff.html">pruneDiff</a> -- Prunes a single differential in a chain complex or list of mutable matrices
  - `"pruneUnit(List,ZZ,Sequence,List)"` -- see <a title="Prunes a unit of a differential in a list of mutable matrices" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_prune__Unit.html">pruneUnit</a> -- Prunes a unit of a differential in a list of mutable matrices
  - `"toChainComplex(List)"` -- see <a title="Converts a list of mutable matrices into a ChainComplex." href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_to__Chain__Complex.html">toChainComplex</a> -- Converts a list of mutable matrices into a ChainComplex.
  - `"toChainComplex(List,Module)"` -- see <a title="Converts a list of mutable matrices into a ChainComplex." href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_to__Chain__Complex.html">toChainComplex</a> -- Converts a list of mutable matrices into a ChainComplex.
  - `"toMutableComplex(ChainComplex)"` -- see <a title="Converts a chain complex into a list of mutable matrices." href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/_to__Mutable__Complex.html">toMutableComplex</a> -- Converts a chain complex into a list of mutable matrices.
- Symbols
  - <a title="Determines the direction with which the matrices in the complex is pruned" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/___Direction.html">Direction</a> -- Determines the direction with which the matrices in the complex is pruned
  - <a title="Whether to compute a morphism of complexes" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/___Pruning__Map.html">PruningMap</a> -- Whether to compute a morphism of complexes
  - <a title="Limit which units are to be pruned" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/___Unit__Test.html">UnitTest</a> -- Limit which units are to be pruned
{:.exports}

## For the programmer
The object <a title="Pruning chain complexes over polynomial and local rings" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/PruneComplex/html/index.html">PruneComplex</a> is a <a title="the class of all packages" href="/home/mahrud/Projects/M2/M2/M2/BUILD/build/usr-dist/common/share/doc/Macaulay2/Macaulay2Doc/html/___Package.html">package</a>
.
{:.waystouse}
{% endraw %}