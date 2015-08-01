'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var retext = require('retext');
var nlcstToString = require('nlcst-to-string');
var visit = require('unist-util-visit');
var soundex = require('./');

/*
 * Methods.
 */

var equal = assert.equal;
var dequal = assert.deepEqual;

/*
 * Fixtures.
 */

var sentence = 'A simple, English, sentence';
var phonetics = ['A000', 'S514', 'E524', 'S535'];

/**
 * Example stemmer, which expects the tree to equal `otherWord`.
 */
function stemmer() {
    return function (cst) {
        visit(cst, 'WordNode', function (node) {
            node.data = {
                'stem': nlcstToString(node)
            };
        });
    };
}

/*
 * Tests.
 */

describe('soundex()', function () {
    var processor = retext.use(soundex);

    it('should be of type `function`', function () {
        equal(typeof soundex, 'function');
    });

    processor.process(sentence, function (e, file) {
        var cst = file.namespace('retext').cst;

        it('should not throw', function (done) {
            done(e);
        });

        it('should process each `WordNode`', function () {
            var index = -1;

            visit(cst, 'WordNode', function (node) {
                assert('phonetics' in node.data);
                dequal(node.data.phonetics, phonetics[++index]);
            });
        });
    });
});

describe('soundex() with a stemmer', function () {
    var processor = retext.use(stemmer).use(soundex);

    processor.process(sentence, function (e, file) {
        var cst = file.namespace('retext').cst;

        it('should not throw', function (done) {
            done(e);
        });

        it('should process `stem` in each `WordNode`', function () {
            visit(cst, 'WordNode', function (node) {
                dequal(node.data.stemmedPhonetics, node.data.phonetics);
            });
        });
    });
});
