# retext-soundex [![Build Status](https://img.shields.io/travis/wooorm/retext-soundex.svg)](https://travis-ci.org/wooorm/retext-soundex) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/retext-soundex.svg)](https://codecov.io/github/wooorm/retext-soundex)

[**Retext**](https://github.com/wooorm/retext) implementation of the
[Soundex](http://en.wikipedia.org/wiki/Soundex) algorithm.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install retext-soundex
```

**retext-soundex** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](retext-soundex.js) and
[compressed](retext-soundex.min.js).

## Usage

```javascript
var retext = require('retext');
var inspect = require('unist-util-inspect');
var soundex = require('retext-soundex');

retext().use(soundex).use(function () {
    return function (cst) {
        console.log(inspect(cst));
    };
}).process('A simple English sentence.');
```

Yields:

```text
RootNode[1]
└─ ParagraphNode[1]
   └─ SentenceNode[8]
      ├─ WordNode[1] [data={"phonetics":"A000"}]
      │  └─ TextNode: 'A'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"phonetics":"S514"}]
      │  └─ TextNode: 'simple'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"phonetics":"E524"}]
      │  └─ TextNode: 'English'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"phonetics":"S535"}]
      │  └─ TextNode: 'sentence'
      └─ PunctuationNode: '.'
```

You can also combine it with a stemmer (such as [retext-porter-stemmer](https://github.com/wooorm/retext-porter-stemmer)
or [retext-lancaster-stemmer](https://github.com/wooorm/retext-lancaster-stemmer)).

```javascript
var retext = require('retext');
var inspect = require('unist-util-inspect');
var soundex = require('retext-soundex');
var stemmer = require('retext-porter-stemmer');

retext().use(stemmer).use(soundex).use(function () {
    return function (cst) {
        console.log(inspect(cst));
    };
}).process('A detestable paragraph.');
```

Yields:

```text
RootNode[1]
└─ ParagraphNode[1]
   └─ SentenceNode[6]
      ├─ WordNode[1] [data={"stem":"a","phonetics":"A000","stemmedPhonetics":"A000"}]
      │  └─ TextNode: 'A'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"stem":"detest","phonetics":"D323","stemmedPhonetics":"D323"}]
      │  └─ TextNode: 'detestable'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"stem":"paragraph","phonetics":"P626","stemmedPhonetics":"P6261"}]
      │  └─ TextNode: 'paragraph'
      └─ PunctuationNode: '.'
```

## API

None, **retext-soundex** automatically detects the phonetics of each
[`WordNode`](https://github.com/wooorm/nlcst#wordnode) (using [**wooorm/soundex-code**](https://github.com/wooorm/soundex-code)),
and stores the phonetics in `node.data.phonetics`. If a stemmer is used,
the stemmed phonetics are stored in `node.data.stemmedPhonetics`.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
