/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module retext:soundex
 * @fileoverview Retext implementation of the Soundex algorithm.
 */

'use strict';

/*
 * Dependencies.
 */

var algorithm = require('soundex-code');
var visit = require('unist-util-visit');
var nlcstToString = require('nlcst-to-string');

/**
 * Patch a `phonetics` property on `node` (a word-node).
 * When a `stem` property is available on the node’s data
 * object, a `stemmedPhonetics` is added on the data
 * as well.
 *
 * @param {NLCSTWordNode} node - Node.
 */
function patch(node) {
    var data = node.data || {};
    var value = nlcstToString(node);

    data.phonetics = algorithm(value);

    if ('stem' in data) {
        data.stemmedPhonetics = algorithm(data.stem);
    }

    node.data = data;
}

/**
 * Patch `stem` on each node.
 *
 * @param {NLCSTNode} cst - Syntax tree.
 */
function transformer(cst) {
    visit(cst, 'WordNode', patch);
}

/**
 * Attacher.
 *
 * @return {Function} - `transformer`.
 */
function attacher() {
    return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;
