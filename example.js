var Retext = require('retext'),
    visit = require('retext-visit'),
    soundex = require('./');

var root = new Retext()
    .use(visit)
    .use(soundex)
    .parse('A simple English sentence.');

root.visitType(root.WORD_NODE, function (node) {
    console.log(node.toString(), node.data.phonetics);
});
