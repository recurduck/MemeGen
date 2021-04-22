'use strict'

var gClientScreen;
var gCanvas;
var gCtx;

function init() {
    doTrans();
    renderImg();
}

function onMakeLinkReady(elLink) {
    convertImageToDownload(elLink)
}

function onSaveMeme() {
    finalizeMeme()
    saveMeme()
}

function onChangeColor(color) {
    changeColor(color)
    document.querySelector('.brush').style = `fill: ${color}`;
}

function onUnderlineText() {
    if (getCurrLine().underline) {
        toggleUnderlineText(false)
        document.querySelector('.btn-underline').classList.remove('btn-clicked')
    } else {
        toggleUnderlineText(true)
        document.querySelector('.btn-underline').classList.add('btn-clicked')
    }
}

function onChangeFontFamily() {
    var font = document.querySelector('.fontfamily-select option:checked').value
    changeFontFamily(font)
}

function onIncreaseFont() {
    increaseFont()
}

function onDecreaseFont() {
    decreaseFont()
}

function onAlignLeft(elBtn) {
    if (!elBtn.classList.contains('btn-clicked')) {
        alignLeft()
        updateEditorPerLine(getCurrLine())

    }
}
function onAlignCenter(elBtn) {
    if (!elBtn.classList.contains('btn-clicked')) {
        alignCenter()
        updateEditorPerLine(getCurrLine())

    }
}
function onAlignRight(elBtn) {
    if (!elBtn.classList.contains('btn-clicked')) {
        alignRight()
        updateEditorPerLine(getCurrLine())

    }
}

function onRemoveLine() {
    if (getLinesCount() === 1) {
        document.querySelector('.btn-del-line').disabled = true
        document.querySelector('.btn-del-line').classList.add('btn-disabled')
        document.querySelector('.text-input').value = '';
    }
    removeLine()
    updateEditorPerLine(getCurrLine())
}

function onAddLine() {
    if (getLinesCount() === 1) {
        document.querySelector('.btn-del-line').disabled = false
        document.querySelector('.btn-del-line').classList.remove('btn-disabled')
    }
    addNewLine();
    updateEditorPerLine(getCurrLine())
}

function onNextLine() {
    nextLine()
    var currLine = getCurrLine()
    updateEditorPerLine(currLine)
}

function onUpdateTxtLine(val) {
    updateTxtLine(val);
}

function updateEditorPerLine(line) {
    document.querySelector('.text-input').value = line.txt;
    switch (line.align) {
        case 'left':
            document.querySelector('.txt-align-left').classList.add('btn-clicked');
            document.querySelector('.txt-align-center').classList.remove('btn-clicked')
            document.querySelector('.txt-align-right').classList.remove('btn-clicked')
            break;
        case 'center':
            document.querySelector('.txt-align-center').classList.add('btn-clicked')
            document.querySelector('.txt-align-left').classList.remove('btn-clicked');
            document.querySelector('.txt-align-right').classList.remove('btn-clicked')
            break
        case 'right':
            document.querySelector('.txt-align-right').classList.add('btn-clicked')
            document.querySelector('.txt-align-center').classList.remove('btn-clicked')
            document.querySelector('.txt-align-left').classList.remove('btn-clicked');
    }
    document.querySelector('.fontfamily-select').value = line.family;
    if (line.underline) document.querySelector('.btn-underline').classList.add('btn-clicked')
    else document.querySelector('.btn-underline').classList.remove('btn-clicked')
    document.querySelector('.brush').style = `fill: ${line.color}`;
}

function renderCanvas() {
    var strHtml = `<canvas id="my-meme" onclick="">
    </canvas>`;
    document.querySelector('.canvas-container').innerHTML = strHtml;
    gCanvas = document.getElementById('my-meme');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = document.querySelector('.canvas-container').clientWidth;
    gCanvas.height = document.querySelector('.canvas-container').clientHeight;
    setImgCanvBg();
    drawDetails();
}

function openGallery(isMyGallery) {
    if (isMyGallery)
        renderImg(true);
    else
        renderImg(false);
    elFadeOut('.modal-edit');
    elFadeIn('.container-gallery');
}

function openMemeEditor(elImg) {
    setNewImg(elImg.dataset.id)
    renderCanvas(elImg.dataset.id);
    elFadeIn('.modal-edit');
    updateEditorPerLine(getCurrLine())
}

function onOpenMemeEditor(elImg) {
    elFadeOut('.container-gallery');
    openMemeEditor(elImg)
}

function renderImg(isMyGallery) {
    if (isMyGallery) {
        let imgs = getMyImgs()
        let galleryImgs = imgs.map(img => {
            return `<div class="meme-img"><img class="card" src="${img.url}" alt="Err" data-id="${img.id}" onclick="onOpenNewTab(${img.id})"/><button class="btn-del" onclick="onDelMeme(this)">X</button></div>`
        })
        document.querySelector('.gallery').innerHTML = galleryImgs.join('');
    } else {
        let imgs = getImgs()
        let galleryImgs = imgs.map(img => {
            return `<img class="card" src="img/memes/${img.id}.jpg" data-id="${img.id}" alt="Err" onclick="onOpenMemeEditor(this)"/>`
        })
        document.querySelector('.gallery').innerHTML = galleryImgs.join('');
    }
}

function onDelMeme(elDel) {
    let imgId = +elDel.parentElement.firstElementChild.dataset.id
    deleteMeme(imgId);
    renderImg(true);
}

function onOpenNewTab(imgId) {
    var memes = getMyImgs()
    let url = memes.find(meme => meme.id === imgId).url;
    var image = new Image();
    image.src = url;

    var w = window.open("");
    w.document.write(image.outerHTML);
    window.open(url);
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function toggleModal() {
    document.body.classList.toggle('open-modal');
}

window.document.oncontextmenu = function () {
    return false;
}