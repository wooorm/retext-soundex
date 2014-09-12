'use strict';

var soundex, stemmer, visit, content, Retext, assert,
    tree, stemmedTree, otherWords, otherPhonetics, stemmedOtherPhonetics;

soundex = require('..');
Retext = require('retext');
visit = require('retext-visit');
stemmer = require('retext-porter-stemmer');
content = require('retext-content');
assert = require('assert');

tree = new Retext()
    .use(visit)
    .use(soundex)
    .use(content)
    .parse('A simple, english, sentence');

stemmedTree = new Retext()
    .use(visit)
    .use(soundex)
    .use(content)
    .use(stemmer)
    .parse(tree.toString());

otherWords = ['A', 'detestable', 'vile', 'paragraph'];
otherPhonetics = ['A000', 'D32314', 'V400', 'P6261'];
stemmedOtherPhonetics = ['A000', 'D323', 'V400', 'P6261'];

describe('soundex()', function () {
    it('should be of type `function`', function () {
        assert(typeof soundex === 'function');
    });

    it('should process each `WordNode`', function () {
        tree.visitType(tree.WORD_NODE, function (wordNode) {
            assert('phonetics' in wordNode.data);
        });
    });

    it('should set each phonetics attribute to `null` when a WordNode (no ' +
        'longer?) has a value', function () {
            tree.visitType(tree.WORD_NODE, function (wordNode) {
                wordNode.removeContent();
                assert(wordNode.data.phonetics === null);
            });
        }
    );

    it('should automatically reprocess `WordNode`s when their values change',
        function () {
            var iterator = -1;
            tree.visitType(tree.WORD_NODE, function (wordNode) {
                wordNode.replaceContent(otherWords[++iterator]);
                assert(wordNode.data.phonetics === otherPhonetics[iterator]);
            });
        }
    );
});

describe('soundex() with a stemmer', function () {
    it('should process stem in each `WordNode` if available', function () {
        stemmedTree.visitType(stemmedTree.WORD_NODE, function (wordNode) {
            assert('stemmedPhonetics' in wordNode.data);
        });
    });

    it('should set each stemmedPhonetics attribute to `null` when a ' +
        'WordNode (no longer?) has a value', function () {
            stemmedTree.visitType(stemmedTree.WORD_NODE, function (wordNode) {
                wordNode.removeContent();
                assert(wordNode.data.stemmedPhonetics === null);
            });
        }
    );

    it('should automatically reprocess `WordNode`s stemmed phonetics when ' +
        'their values change', function () {
            var iterator = -1;
            stemmedTree.visitType(stemmedTree.WORD_NODE, function (wordNode) {
                wordNode.replaceContent(otherWords[++iterator]);
                assert(
                    wordNode.data.stemmedPhonetics ===
                    stemmedOtherPhonetics[iterator]
                );
            });
        }
    );
});
