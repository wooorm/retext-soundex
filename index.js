'use strict';

exports = module.exports = function () {};

var soundexCode = require('soundex-code');

function soundex(value) {
    return soundexCode(value, Infinity);
}

function onchange() {
    var data = this.data,
        value = this.toString();

    data.phonetics = value ? soundex(value) : null;

    if ('stem' in data) {
        data.stemmedPhonetics = value ? soundex(data.stem) : null;
    }
}

function attach(retext) {
    retext.parser.TextOM.WordNode.on('changetextinside', onchange);
    retext.parser.TextOM.WordNode.on('removeinside', onchange);
    retext.parser.TextOM.WordNode.on('insertinside', onchange);
}

exports.attach = attach;
