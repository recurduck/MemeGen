'use strict'

const KEY = 'books';

const IMAGESFILE = 18

var gMemes;
var gImg = _loadImgs()
var gKeyswords = { 'happy': 12, 'funny': 1 };

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Inever eat Falafel',
        size: 50,
        align: 'left',
        color: 'red',
        family: 'Impact',
        underline: false,
        x: 50,
        y: 80,
        // endX: 50 + gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
        // endY: 50 + gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
    },
    {
        txt: 'but I like it!',
        size: 50,
        align: 'left',
        color: 'white',
        family: 'Impact',
        underline: false,
        x: 50,
        y: 420
    }
    ]
}
_createMemes();

function changeFontFamily(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].family = fontFamily;
    drawDetails();
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size++;
    drawDetails();
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size--;
    drawDetails();
}

function updateTxtLine(val) {
    gMeme.lines[gMeme.selectedLineIdx].txt = val;
    drawDetails();
}

function nextLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx === gMeme.lines.length - 1) ? 0 : gMeme.selectedLineIdx + 1
}

function addNewLine() {
    gMeme.lines.push(createNewLine())
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    drawDetails();
}

function removeLine() {
    if (gMeme.lines.length > 1) {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
    } else {
        gMeme.lines[gMeme.selectedLineIdx].txt = '';
        drawDetails();
    }
    drawDetails();
}

function toggleUnderlineText(boolean) {
    gMeme.lines[gMeme.selectedLineIdx].underline = boolean;
    drawDetails();
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
    drawDetails();
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getLinesCount() {
    return gMeme.lines.length;
}

function drawDetails(isEditing = true) {
    if(isEditing) clearCanvas();
    drawText();
}

function setImgCanvBg() {
    gCanvas.style = `background-image: url("img/memes/${gMeme.selectedImgId}.jpg");background-size: ${gCanvas.width}px ${gCanvas.height}px;`
}

function drawText() {
    gMeme.lines.forEach(line => {
        gCtx.fillStyle = line.color;
        gCtx.lineWidth = 1;
        gCtx.strokeStyle = 'black';
        gCtx.font = `${line.size}px ${line.family}`;
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeText(line.txt, line.x, line.y);
        if (line.underline) {
            let space = gMeme.lines[gMeme.selectedLineIdx].size * 0.15;
            drawLine(line.x, line.y + space, line.x + gCtx.measureText(line.txt).width, line.y + space, line.color)
        }
    })
}

function drawLine(x, y, xEnd, yEnd, color = 'black') {
    gCtx.beginPath()
    gCtx.lineWidth = gMeme.lines[gMeme.selectedLineIdx].size / 7;
    gCtx.moveTo(x, y)
    gCtx.lineTo(xEnd, yEnd)
    gCtx.closePath()
    gCtx.strokeStyle = color;
    gCtx.stroke()
    gCtx.lineWidth = 1;

}

function drawRect(x = 50, y = 20) {
    gCtx.beginPath()
    gCtx.lineWidth = 4;
    gCtx.rect(x-15, y-15, gCanvas.width - 100, 120)
    gCtx.fillStyle = 'transparent'
    gCtx.fillRect(x, y, 150, 150)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function convertImageToDownload(elLink) {
    const elImg = new Image()
    elImg.src = `img/memes/${gMeme.selectedImgId}.jpg`;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
        drawDetails(false);
        console.log('first');
    }
    memeValforDownload(elLink)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

// set new img to our meme
function setNewImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function createNewLine() {
    return {
        txt: gMeme.lines[gMeme.selectedLineIdx].txt,
        size: 50,
        align: gMeme.lines[gMeme.selectedLineIdx].align,
        color: gMeme.lines[gMeme.selectedLineIdx].color,
        family: gMeme.lines[gMeme.selectedLineIdx].family,
        underline: gMeme.lines[gMeme.selectedLineIdx].underline,
        x: 50,
        y: gCanvas.height / 2
    }
}
// return My Memes
function getMyImgs() {
    let imgs = []
    for (var i = 1; i <= gMemes.length; i++) {
        let img = {
            id: gMemes[i].selectedImgId,
            url: `img/memes/${i}.jpg`,
            keywords: ['happy', 'funny']
        }
        imgs.push(img);
    }
    return imgs;
}
// return all Imgs
function getImgs() {
    return gImg;
}

function _loadImgs() {
    let imgs = []
    for (var i = 1; i <= IMAGESFILE; i++) {
        let img = {
            id: i,
            url: `img/memes/${i}.jpg`,
            keywords: ['happy', 'funny']
        }
        imgs.push(img);
    }
    return imgs;
}

function memeValforDownload(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
    elLink.download = `MEME-${makeId(4)}`;
}

function _saveMemesToStorage() {
    saveToStorage(KEY, gMemes)
}

function _createMeme(imgId) {
    return {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [{
            txt: 'Example',
            size: 50,
            align: 'left',
            color: 'red',
            family: 'Impact',
            underline: false,
            x: 50,
            y: 80,
        },]
    }
}

function _createMemes() {
    var memes = loadFromStorage(KEY)
    if (!memes || !memes.length) {
        memes = []
        for (var i = 1; i < 4; i++) {
            memes.push(_createMeme(i))
        }
    }
    gMemes = memes;
    _saveMemesToStorage();
}