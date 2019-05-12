# Mob

【[中文 README](https://github.com/zenghongtu/Mob/blob/master/README.zh-CN.md)】

> Mob(モブ), the protagonist of the [モブサイコ 100](https://www.bilibili.com/bangumi/media/md5058)

[![Current Release](https://img.shields.io/github/release/zenghongtu/Mob.svg?style=flat-square)](https://github.com/zenghongtu/Mob/releases)
![License](https://img.shields.io/github/license/zenghongtu/Mob.svg?style=flat-square)
[![Build Status](https://travis-ci.org/zenghongtu/Mob.svg?branch=master)](https://travis-ci.org/zenghongtu/Mob) [](https://camo.githubusercontent.com/367dc8fdf5ea8444dd116c43c7900d9a1b1e9862/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f7472617a796e2f69656173654d757369632e7376673f7374796c653d666c61742d737175617265)

<img src="https://github.com/zenghongtu/Mob/blob/master/build/icons/128x128.png" />

> Built by [Electron](https://github.com/electron/electron), [Umi](https://github.com/umijs/umi), [Dva](https://github.com/dvajs/dva), [Antd](https://github.com/ant-design/ant-design)

## Preview

![](images/2019-05-12-23-50-45.png)
![](images/2019-05-12-23-50-58.png)
![](images/2019-05-13-00-26-40.png)
![](images/2019-05-13-00-27-08.png)

## Feature

- [x] a music player
- [x] daily listen
- [x] recommend
- [x] rank
- [x] category
- [x] subscribed
- [x] listened
- [x] download track
- [x] search album

## Next features:

- [ ] join [Himalaya podcast](https://www.himalaya.com/) api
- [ ] multi-language
- [ ] custom style
- [ ] keyboard shortcuts settings
- [ ] download history
- [ ] local music
- [ ] play record
- [ ] album review
- [ ] multiple tracks join lists

## Install

[Here](https://github.com/zenghongtu/Mob/releases/latest) to download the last version or below.

### Mac(10.9+)

[Download](https://github.com/zenghongtu/Mob/releases/download/v0.1.2/Mob-0.1.2-mac.dmg) the `.dmg` file, Or use `homebrew`:

```
brew cask install mob
```

### Linux [NO TEST]

[Download](https://github.com/zenghongtu/Mob/releases/download/v0.1.2/Mob-0.1.2-linux-amd64.deb) the `.deb` file for 'Debian / Ubuntu':

```
$ sudo dpkg -i Mob-0.1.2-linux-amd64.deb
```

[Download](https://github.com/zenghongtu/Mob/releases/download/v0.1.2/Mob-0.1.2-linux-x86_64.AppImage) the `.Appimage` file for other distribution:

```
$ chmod u+x Mob-0.1.2-linux-x86_64.AppImage
$ ./Mob-0.1.2-linux-x86_64.AppImage
```

### Windows [NO TEST]

[Download](https://github.com/zenghongtu/Mob/releases/download/v0.1.2/Mob-0.1.2-win.exe)

## Keyboard shortcuts

### Global

| Description  | Keys                                                               |
| ------------ | ------------------------------------------------------------------ |
| pause / play | <kbd>Cmd / Ctrl</kbd> + <kbd>Option / Alt</kbd> + <kbd>S</kbd>     |
| vol+         | <kbd>Cmd / Ctrl</kbd> + <kbd>Option / Alt</kbd> + <kbd>Up</kbd>    |
| vol-         | <kbd>Cmd / Ctrl</kbd> + <kbd>Option / Alt</kbd> + <kbd>Down</kbd>  |
| prev         | <kbd>Cmd / Ctrl</kbd> + <kbd>Option / Alt</kbd> + <kbd>Left</kbd>  |
| next         | <kbd>Cmd / Ctrl</kbd> + <kbd>Option / Alt</kbd> + <kbd>Right</kbd> |

## Development

```
$ yarn install
$ yarn run start:main
$ yarn run start:renderer
```
