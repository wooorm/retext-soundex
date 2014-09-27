'use strict';

/**
 * Dependencies.
 */

var phonetics;

phonetics = require('soundex-code');

/**
 * Define `soundex`.
 */

function soundex() {}

/**
 * Change handler
 *
 * @this {WordNode}
 */

function onchange() {
    var data,
        value;

    data = this.data;
    value = this.toString();

    data.phonetics = value ? phonetics(value, Infinity) : null;

    if ('stem' in data) {
        data.stemmedPhonetics = value ? phonetics(data.stem, Infinity) : null;
    }
}

/**
 * Define `attach`.
 *
 * @param {Retext} retext
 */

function attach(retext) {
    var WordNode;

    WordNode = retext.TextOM.WordNode;

    WordNode.on('changetextinside', onchange);
    WordNode.on('removeinside', onchange);
    WordNode.on('insertinside', onchange);
}

/**
 * Expose `attach`.
 */

soundex.attach = attach;

/**
 * Expose `soundex`.
 */

module.exports = soundex;
