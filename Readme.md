# retext-soundex [![Build Status](https://img.shields.io/travis/wooorm/retext-soundex.svg?style=flat)](https://travis-ci.org/wooorm/retext-soundex) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-soundex.svg?style=flat)](https://coveralls.io/r/wooorm/retext-soundex?branch=master)

**[Retext](https://github.com/wooorm/retext "Retext")** implementation of the [Soundex](http://en.wikipedia.org/wiki/Soundex) algorithm.

## Installation

npm:
```sh
$ npm install retext-soundex
```

Component:
```sh
$ component install wooorm/retext-soundex
```

Bower:
```sh
$ bower install retext-soundex
```

## Usage

```js
var Retext = require('retext'),
    visit = require('retext-visit'),
    soundex = require('retext-soundex'),
    retext;

retext = new Retext()
    .use(visit)
    .use(soundex);

retext.parse('A simple english sentence.', function (err, tree) {
    tree.visitType(tree.WORD_NODE, function (node) {
        console.log(node.toString(), node.data.phonetics);
    });
    /**
     * 'A', 'A000'
     * 'simple', 'S514'
     * 'english', 'E5242'
     * 'sentence', 'S5352'
     */
});
```

You can also combine it with a stemmer (such as [retext-porter-stemmer](https://github.com/wooorm/retext-porter-stemmer) or [retext-lancaster-stemmer](https://github.com/wooorm/retext-lancaster-stemmer)).

```js
var Retext = require('retext'),
    visit = require('retext-visit'),
    soundex = require('retext-soundex'),
    stemmer = require('retext-porter-stemmer'),
    retext;

retext = new Retext()
    .use(visit)
    .use(soundex)
    .use(stemmer);

retext.parse('A detestable paragraph', function (err, tree) {
    tree.visitType(tree.WORD_NODE, function (node) {
        console.log(node.toString(), node.data.phonetics, node.data.stemmedPhonetics);
    });
    /**
     * 'A', 'A000', 'A000'
     * 'detestable', 'D32314', 'D323'
     * 'paragraph', 'P6261', 'P6261'
     */
});
```

## API

None, the plugin automatically detects the phonetics of each word (using [wooorm/soundex](https://github.com/wooorm/soundex)) when it’s created or changed, and stores the phonetics in `wordNode.data.phonetics`.

## Related

- [retext-metaphone](https://github.com/wooorm/retext-metaphone) — The original Metaphone algorithm;
- [retext-double-metaphone](https://github.com/wooorm/retext-double-metaphone) — The Double Metaphone algorithm;

## License

MIT © Titus Wormer
