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
var Retext = require('retext');
var visit = require('retext-visit');
var inspect = require('retext-inspect');
var soundex = require('retext-soundex');

var retext = new Retext()
    .use(inspect)
    .use(visit)
    .use(soundex);

retext.parse('A simple english sentence.', function (err, tree) {
    tree.visit(tree.WORD_NODE, function (node) {
        console.log(node);
    });
    /*
     * WordNode[1] [data={"phonetics":"A000"}]
     * └─ TextNode: 'A'
     * WordNode[1] [data={"phonetics":"S514"}]
     * └─ TextNode: 'simple'
     * WordNode[1] [data={"phonetics":"E5242"}]
     * └─ TextNode: 'english'
     * WordNode[1] [data={"phonetics":"S5352"}]
     * └─ TextNode: 'sentence'
     */
});
```

You can also combine it with a stemmer (such as [retext-porter-stemmer](https://github.com/wooorm/retext-porter-stemmer) or [retext-lancaster-stemmer](https://github.com/wooorm/retext-lancaster-stemmer)).

```js
var Retext = require('retext');
var visit = require('retext-visit');
var inspect = require('retext-inspect');
var soundex = require('retext-soundex');
var stemmer = require('retext-porter-stemmer');

var retext = new Retext()
    .use(inspect)
    .use(visit)
    .use(soundex)
    /* make sure to attach the stemmer after soundex. */
    .use(stemmer);

retext.parse('A detestable paragraph.', function (err, tree) {
    tree.visit(tree.WORD_NODE, function (node) {
        console.log(node);
    });
    /*
     * WordNode[1] [data={"stem":"a","phonetics":"A000","stemmedPhonetics":"A000"}]
     * └─ TextNode: 'A'
     * WordNode[1] [data={"stem":"detest","phonetics":"D32314","stemmedPhonetics":"D323"}]
     * └─ TextNode: 'detestable'
     * WordNode[1] [data={"stem":"paragraph","phonetics":"P6261","stemmedPhonetics":"P6261"}]
     * └─ TextNode: 'paragraph'
     */
});
```

## API

None, the plugin automatically detects the phonetics of each word (using [wooorm/soundex](https://github.com/wooorm/soundex)), and stores the phonetics in `word.data.phonetics`. If a stemmer is used, the stemmed phonetics are stored in `word.data.stemmedPhonetics`.

## Related

- [retext-metaphone](https://github.com/wooorm/retext-metaphone) — The original Metaphone algorithm;
- [retext-double-metaphone](https://github.com/wooorm/retext-double-metaphone) — The Double Metaphone algorithm;

## License

MIT © [Titus Wormer](http://wooorm.com)
