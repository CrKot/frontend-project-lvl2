### Hexlet tests and linter status:
[![Actions Status](https://github.com/CrKot/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/CrKot/frontend-project-lvl2/actions)

![Node CI](https://github.com/CrKot/frontend-project-lvl2/workflows/Node%20CI/badge.svg)

[![Maintainability](https://api.codeclimate.com/v1/badges/e9206b26ac394cd848b7/maintainability)](https://codeclimate.com/github/CrKot/frontend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/e9206b26ac394cd848b7/test_coverage)](https://codeclimate.com/github/CrKot/frontend-project-lvl2/test_coverage)

gendiff - сравнение 2 файлов и вывод различий в консоль в 3 различных форматах stylish, plain, json.<br/>
Выбор формата через флаг -f <формат>, по умолчанию stylish.
#### Установка:
``
$ npm install
$ npm link
``
Пример работы программы:
"gendiff <путь к 1 файлу> <путь к 2 файлу>"
``
gendiff __fixtures__/file1.json __fixtures__/file2.json

  {
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
  }
``

## Сравнение двух плоских json вывод в формате по умолчанию stylish
[![asciicast](https://asciinema.org/a/YDm08TYFciPrRUiw8vjfpfMkv.svg)](https://asciinema.org/a/YDm08TYFciPrRUiw8vjfpfMkv)

## Сравнение двух плоских yaml вывод в формате по умолчанию stylish

[![asciicast](https://asciinema.org/a/qrjtbnOLNhdxYqS9uDEUlfcyG.svg)](https://asciinema.org/a/qrjtbnOLNhdxYqS9uDEUlfcyG)

## Сравнение двух составных json вывод в формате по умолчанию stylish

[![asciicast](https://asciinema.org/a/eIeQaKWjHmEtUBbzqPiuVdZsc.svg)](https://asciinema.org/a/eIeQaKWjHmEtUBbzqPiuVdZsc)

## Сравнение двух составных json вывод в формате plain

[![asciicast](https://asciinema.org/a/8GC5XDNa9Yv5M6jQIsRhm4GoN.svg)](https://asciinema.org/a/8GC5XDNa9Yv5M6jQIsRhm4GoN)

## Сравнение двух составных json вывод в формате json

[![asciicast](https://asciinema.org/a/n5B0Qx2OI3gcHgjq9cChwZfRU.svg)](https://asciinema.org/a/n5B0Qx2OI3gcHgjq9cChwZfRU)