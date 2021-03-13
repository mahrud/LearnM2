---
layout: page
title: Download
category: links
order: 1
---

#### Binary distributions [![release badge]](https://github.com/Macaulay2/M2/releases/latest)

Depending on your operating system and machine architecture, you may be able to download a prebuilt distribution of _Macaulay2_:

- [Homebrew tap](https://github.com/Macaulay2/homebrew-tap)
```
brew tap Macaulay2/tap
brew install M2
```
- [Ubuntu package via PPA](https://launchpad.net/~macaulay2/+archive/ubuntu/macaulay2)
```
sudo add-apt-repository ppa:macaulay2/macaulay2
sudo apt install macaulay2
```
- [Fedora package](https://src.fedoraproject.org/rpms/Macaulay2)
```
sudo dnf install Macaulay2
```

---

#### Building from source [![nightly badge]](https://github.com/Macaulay2/M2/actions/workflows/test_build.yml)

The primary source code repository for _Macaulay2_ is on [GitHub](https://github.com/Macaulay2/M2).
For introductions to version control see:
- [Git for Macaulay2 Contributors](https://github.com/Macaulay2/M2/wiki/Git-for-Macaulay2-Contributors)
- [Git for Workshop Participants](https://github.com/Macaulay2/M2/wiki/Git-for-Workshop-participants)

See the [install guide] for detailed instructions on how to build _Macaulay2_ from source.
A quick build using CMake and Ninja involves the following steps:
```shell
git clone https://github.com/Macaulay2/M2.git --branch development
cd M2/M2/BUILD/build
cmake -GNinja -S ../.. -B . -DCMAKE_BUILD_TYPE=Release
ninja build-libraries build-programs
ninja install-packages
ninja M2-emacs
```

A list of common issues involving the CMake build is available on the [GitHub Wiki](https://github.com/Macaulay2/M2/wiki/FAQ%3A-CMake-Build-Problems). If you run into a problem not listed there or among the list of issues labeled ["build system"](https://github.com/Macaulay2/M2/labels/build%20system), please open a [new issue](https://github.com/Macaulay2/M2/issues/new) on GitHub.

---

##### Docker
- [Dockerfiles](https://github.com/Macaulay2/M2/blob/master/M2/BUILD/docker/README.md)


[release badge]: https://img.shields.io/github/v/release/Macaulay2/M2?label=stable&style=flat-square
[nightly badge]: https://github.com/Macaulay2/M2/actions/workflows/test_build.yml/badge.svg?branch=master
[install guide]: https://github.com/Macaulay2/M2/blob/master/M2/INSTALL-CMake.md
