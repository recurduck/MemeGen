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
    'animals': {
        en: 'Animals',
        zh: '动物',
        he: 'חיות',
    },
    'funny': {
        en: 'Funnny',
        zh: '滑稽',
        he: 'שמח',
    },
    'movies': {
        en: 'Movies',
        zh: '电影',
        he: 'סרטים',
    },
    'politic': {
        en: 'Politic',
        zh: '政治的',
        he: 'פוליטי',
    },
    'sad': {
        en: 'Sad',
        zh: '伤心',
        he: 'עצוב',
    },
    'upload': {
        en: 'Upload',
        zh: '上载',
        he: 'העלה',
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
    'publish': {
        en: 'Publish',
        zh: '发表',
        he: 'פרסם'
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
    'about-des1': {
        en: 'Welcome to my Meme Generator v1.0 in this Generator you can choose an image from our stock or upload an image by yourself and edit it as a meme.',
        zh: '欢迎我的模因v1.0, 这里你可以选择一张照片从我们的或者自己上传照片，然后将其编辑为模因。',
        he: 'ברוכים הבאים לגנרטור הממים שלי גרסה 1.0, בגנרטור הזה אתה יכול לבחור תמונה מן המאגר או להעלות תמונה בעצמך ולערוך אותה לממי בעצמך. '
    },
    'about-des2': {
        en: 'Inside the editor there will be always a focus on only one line. you can switch the focus by presing on one of them or just press on the change line button. ther is an option to add new lines or delete the focused line. For each line you have a small controller that control the size of the font, alignment, font Family, underline, and the sentence color.',
        zh: '在编辑器内部，总是只关注一行。您可以通过按其中之一来切换焦点，也可以只按更改线按钮。您可以选择添加新行或删除焦点行。对于每一行，您都有一个小型控制器，用于控制字体，对齐方式，字体系列，下划线和句子颜色的大小。',
        he: 'בתוך העורך תמיד יהיה פוקוס רק על אחת מן השורות, ניתן להחליף בין השורות בעזרת לחיצה ישירה על השורות או בעזרת לחיצה על הכפתור הייעודי.  ישנה אפשרות להוסיף ולמחוק שורות. לכל שורה יש לוח שליטה קטן שמאפשר לשלוט על גודל הגופן, יישור, סוג גופן, קו תחתון וצבע.'
    }
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