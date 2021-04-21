'use strict'

var gCanvas;
var gCtx;

function init() {
    renderImg();
}

function onMakeLinkReady(elLink) {
    convertImageToDownload(elLink)
}

function onChangeColor(color) {
    changeColor(color)
    document.querySelector('.brush').style = `fill: ${color}`; 
}

function onUnderlineText() {
    if(getCurrLine().underline) {
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

function onRemoveLine() {
    if(getLinesCount() === 1) {
        document.querySelector('.btn-del-line').disabled = true
        document.querySelector('.btn-del-line').classList.add('btn-disabled')
        document.querySelector('.text-input').value = '';
    }
    removeLine()
}

function onAddLine() {
    if(getLinesCount() === 1) {
        document.querySelector('.btn-del-line').disabled = false
        document.querySelector('.btn-del-line').classList.remove('btn-disabled')
    }
    addNewLine();
}

function onNextLine() {
    nextLine()
    document.querySelector('.text-input').value = getCurrLine().txt;
}

function onUpdateTxtLine(val) {
    updateTxtLine(val);
}

function renderCanvas() {
    console.log('canvas rendered')
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
    if(isMyGallery)
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

}

function onOpenMemeEditor(elImg) {
    elFadeOut('.container-gallery');
    openMemeEditor(elImg)
}

function renderImg(isMyGallery) {
    if(isMyGallery) {
        let imgs = getMyImgs()
        let galleryImgs = imgs.map(img => {
            return `<img class="card" src="img/memes/${img.id}.jpg" data-id="${img.id}" alt="Err" onclick="onOpenMemeEditor(this)"/>`
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

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    // const elLangDown = document.querySelector('.journal-dropdown')
    // elLangDown.style.display = 'none'
  }
  
function toggleModal() {
    document.body.classList.toggle('open-modal');
}  

window.document.oncontextmenu = function(){ 
return false;
} 