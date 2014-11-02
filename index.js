var retextSoundex = require('retext-soundex'),
    porterStemmer = require('retext-porter-stemmer'),
    visit = require('retext-visit'),
    dom = require('retext-dom'),
    Retext = require('retext'),
    retext = new Retext().use(visit).use(retextSoundex).use(porterStemmer).use(dom),
    inputElement = document.getElementsByTagName('textarea')[0],
    outputElement = document.getElementsByTagName('div')[0],
    stemElement = document.getElementsByName('stem')[0],
    style = document.styleSheets[0],
    phonetics = {},
    shouldUseStemmedPhonetics, currentDOMTree;

function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToARGB(i){
    return ((i>>24)&0xFF).toString(16) +
           ((i>>16)&0xFF).toString(16) +
           ((i>>8)&0xFF).toString(16) +
           (i&0xFF).toString(16);
}

function getColourFromString(value) {
    value = intToARGB(hashCode(value)).slice(0, 6);

    while (value.length < 6) {
        value = '0' + value;
    }

    return '#' + value;
}

function addCSSRule(sheet, selector, rules) {
    if(sheet.insertRule) {
        sheet.insertRule(selector + '{' + rules + '}');
    } else {
        sheet.addRule(selector, rules);
    }
}

function onphonetics(phonetic) {
    var colour;

    if (phonetic in phonetics) {
        return;
    }

    colour = getColourFromString(phonetic)
    phonetics[phonetic] = colour;

    addCSSRule(style, '[title="' + phonetic + '"]', 'color:' + colour);
}

function getPhonetics() {
    value = inputElement.value;

    if (currentDOMTree) {
        currentDOMTree.parentNode.removeChild(currentDOMTree);
    }

    retext.parse(value, function (err, tree) {
        if (err) {
            throw err;
        }

        tree.visit(function (node) {
            var phonetic;

            if (!node.DOMTagName || !node.data.phonetics) {
                return;
            }

            phonetic = node.data.phonetics;

            if (shouldUseStemmedPhonetics) {
                phonetic = node.data.stemmedPhonetics;
            }

            onphonetics(phonetic);

            node.toDOMNode().setAttribute('title', phonetic);
        });

        currentDOMTree = tree.toDOMNode();

        outputElement.appendChild(currentDOMTree);
    });
}

function onchange(event) {
    shouldUseStemmedPhonetics = event.target.checked;
    getPhonetics();
}

inputElement.addEventListener('input', getPhonetics);
stemElement.addEventListener('change', onchange);
onchange({'target' : stemElement});
getPhonetics();
