'use strict'

var gClientScreen;
var gCanvas;
var gCtx;

function init() {
    renderKeysWords();
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

function renderCanvas(img, uploaded) {
    var strHtml = `<canvas id="my-meme" onclick="canvasClicked(event)">
    </canvas>`;
    document.querySelector('.canvas-container').innerHTML = strHtml;
    gCanvas = document.getElementById('my-meme');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = document.querySelector('.canvas-container').clientWidth;
    gCanvas.height = document.querySelector('.canvas-container').clientHeight;
    if (uploaded) {
        setImgCanvBg(img, uploaded);
        drawDetails();
    } else {
        setImgCanvBg();
        drawDetails();
    }
}

function canvasClicked(ev) {
    // Find out if clicked on a line
    const clickedLine = gMeme.lines.find(line => {
        return (
            ev.offsetX > line.x &&
            ev.offsetX < line.x + textWidth(line) &&
            ev.offsetY < line.y &&
            ev.offsetY > line.y - line.size * 1.3
        )
    })

    // Open the modal on the clicked coordinates if found a click on a star,
    //       close the modal otherwise
    if (clickedLine) {
        forceFocus(clickedLine);
        updateEditorPerLine(getCurrLine());
    }
}

function openGallery(isMyGallery) {
    if (isMyGallery)
        renderImg(true);
    else
        renderImg(false);
    elFadeOut('.modal-edit');
    elFadeIn('.container-gallery');
}

function openMemeEditor(elImg, uploaded) {
    if (uploaded) {
        setNewImg(0)
        renderCanvas(elImg, uploaded);
    } else {
        setNewImg(elImg.dataset.id)
        renderCanvas();
    }
    elFadeIn('.modal-edit');
    updateEditorPerLine(getCurrLine())
}

function onOpenMemeEditor(elImg, uploaded = false) {
    elFadeOut('.container-gallery');
    openMemeEditor(elImg, uploaded)
}

function renderImg(isMyGallery) {
    if (isMyGallery) {
        let imgs = getMyImgs()
        let galleryImgs = imgs.map(img => {
            return `<div class="meme-img"><img class="card" src="${img.url}" alt="Err" data-id="${img.id}" 
            onclick="onOpenModal('show', this)"/>
            <button class="btn-del btn-del${img.id}" onclick="onDelMeme(this)">X</button>
            </div>`
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
    document.querySelector('.modal-container').classList.toggle('modal-showed');
}

function onOpenModal(data, elImg) {
    toggleModal();
    const elModal = document.querySelector('.modal-container');
    switch (data) {
        case 'about':
            renderAbout(elModal);
            break;
        case 'show':
            renderImgModal(elModal, elImg);
    }
    doTrans();
    toggleMenu();
}

function renderImgModal(elModal, img) {
    elModal.innerHTML = `<div class="flex column align-center">
    <img src="${img.src}" alt="MEMEGEN" />
    <a class="btn-download flex space-around align-center" href="${img.src}" download="MEME-${makeId(4)}">
        <img src="./img/icons/download.png">
        <span data-trans="download"></span>
    </a>
    </div>`
}

function renderAbout(elModal) {
    elModal.innerHTML = `<about class="flex column">
    <img src="img/logo/LOGO.png" alt="MEMEGEN" width="80%"/>
    <p data-trans="about-des1"></p>
    <p data-trans="about-des2"></p>
    </about>`
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderUploadedImg)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderUploadedImg(img) {
    onOpenMemeEditor(img, true)
}

// Keywords
// Render KewsWords
function renderKeysWords() {
    var words = sortKeyWords()
    var tags = document.querySelector('.tags-container')
    tags.innerHTML = ''
    words.forEach(word => {
        tags.innerHTML += `<span style="font-size: ${4+word[1]}px" onclick="onKeyWordClick(this)" data-trans="${word[0]}"></span>`
    })
    doTrans();
}

function onKeyWordClick(elKey) {
    let keyWord = elKey.dataset.trans;
    console.log('keyWord:', keyWord)
    riseKeyword(keyWord)
    renderKeysWords();
}

window.document.oncontextmenu = function () {
    return false;
}