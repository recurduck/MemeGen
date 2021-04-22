'use strict'

var gLanguages = { 1: 'en', 2: 'zh', 3: 'he' }
var gTrans = {
    'gallery': {
        en: 'Gallery',
        zh: '画廊',
        he: 'גלריה'
    },
    'my-memes': {
        en: 'My MEME',
        zh: '我的模因',
        he: 'ממים שלי',
    },
    'language': {
        en: '🌐中文',
        zh: 'עברית🌐',
        he: '🌐English',
    },
    'about': {
        en: 'About',
        zh: '关于',
        he: 'אודות'
    },
    'search': {
        en: 'Search',
        zh: '搜索',
        he: 'חפש',
    },
    'happy': {
        en: 'Happy',
        zh: '快乐',
        he: 'שמח',
    },
    'more': {
        en: 'More',
        zh: '更多的',
        he: 'עוד',
    },
    'save': {
        en: 'Save',
        zh: '保存',
        he: 'שמור',
    },
    'share': {
        en: 'Share',
        zh: '分享',
        he: 'שתף',
    },
    'download': {
        en: 'Download',
        zh: '下载',
        he: 'הורד'
    },
    'close': {
        en: 'Close',
        zh: '关',
        he: 'סגור'
    },
}

var gLangKey = 1
var gCurrLang = gLanguages[gLangKey];

function nextLanguage() {
    if(gLangKey === 3) gLangKey = 1;
    else gLangKey++;
    gCurrLang = gCurrLang = gLanguages[gLangKey];
    doTrans()
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang]
    // if not found - use english
    if (!txt) txt = keyTrans['en']
    
    return txt;
}

function doTrans() {
    switch (gLanguages[gLangKey]) {
        case 'en': 
            document.body.classList = 'en'
            break;
        case 'zh': 
            document.body.classList = 'zh'
            break;
        case 'he': 
            document.body.classList = 'he'
    }
    var els = document.querySelectorAll('[data-trans]')

    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)

        if (el.nodeName === 'INPUT') {
            // el.placeholder = txt
            // THE SAME!!
            el.setAttribute('placeholder', txt)
        } else {
            el.innerText = txt
        }
    })
}

function setLang(lang) {
    gCurrLang = gLanguages[lang];
}

function formatNumOlder(num) {
    return num.toLocaleString('en')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}