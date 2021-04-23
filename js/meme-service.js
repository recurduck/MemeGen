'use strict'

const KEY = 'memes';

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
        x: 25,
        y: 80,
        // endX: 50 + gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
        // endY: 50 + gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
        isOnFocus: true,
        isDragging: false
    },
    {
        txt: 'but I like it!',
        size: 50,
        align: 'left',
        color: 'white',
        family: 'Impact',
        underline: false,
        x: 25,
        y: 450,
        isOnFocus: false,
        isDragging: false
    }
    ]
}
_createMemes();

function changeFontFamily(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].family = fontFamily;
    drawDetails();
}

function alignLeft() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'left';
    gMeme.lines[gMeme.selectedLineIdx].x = gCanvas.width * 5 / 100
    drawDetails();
}
function alignCenter() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'center';
    gMeme.lines[gMeme.selectedLineIdx].x = gCanvas.width * 50 / 100
    drawDetails();
}
function alignRight() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'right';
    gMeme.lines[gMeme.selectedLineIdx].x = gCanvas.width * 95 / 100
    drawDetails();
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size++;
    drawDetails();
}

function decreaseFont() {
    if (gMeme.lines[gMeme.selectedLineIdx].size > 0) {
        gMeme.lines[gMeme.selectedLineIdx].size--;
        drawDetails();
    }
}

function updateTxtLine(val) {
    gMeme.lines[gMeme.selectedLineIdx].txt = val;
    drawDetails();
}

function nextLine() {
    gMeme.lines[gMeme.selectedLineIdx].isOnFocus = false
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx === gMeme.lines.length - 1) ? 0 : gMeme.selectedLineIdx + 1
    gMeme.lines[gMeme.selectedLineIdx].isOnFocus = true
    drawDetails();
}

function forceFocus(forcedLine) {
    let newFocusedLineIdx = gMeme.lines.findIndex(line => line === forcedLine)
    gMeme.lines[gMeme.selectedLineIdx].isOnFocus = false
    console.log('newFocusedLine:', newFocusedLineIdx)
    gMeme.selectedLineIdx = newFocusedLineIdx
    forcedLine.isOnFocus = true
    drawDetails();
}

function addNewLine() {
    gMeme.lines.push(createNewLine())
    gMeme.lines[gMeme.selectedLineIdx].isOnFocus = false
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    gMeme.lines[gMeme.selectedLineIdx].isOnFocus = true
    drawDetails();
}

function removeLine() {
    if (gMeme.lines.length > 1) {
        gMeme.lines[gMeme.selectedLineIdx].isOnFocus = false
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
        gMeme.lines[gMeme.selectedLineIdx].isOnFocus = true
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
    if (isEditing) clearCanvas();
    drawText(isEditing);
}

function setImgCanvBg() {
    gCanvas.style = `background-image: url("img/memes/${gMeme.selectedImgId}.jpg");background-size: ${gCanvas.width}px ${gCanvas.height}px;`
}

function drawText(isEditing = true) {
    gMeme.lines.forEach(line => {
        gCtx.textAlign = line.align;
        gCtx.fillStyle = line.color;
        gCtx.lineWidth = 1;
        gCtx.strokeStyle = 'black';
        gCtx.font = `${line.size}px ${line.family}`;
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeText(line.txt, line.x, line.y);
        if (line.underline) {
            let space = gMeme.lines[gMeme.selectedLineIdx].size * 0.15;
            switch (gCtx.textAlign) {
                case 'left':
                    drawLine(line.x, line.y + space, line.x + gCtx.measureText(line.txt).width, line.y + space, line.color);
                    break;
                case 'center':
                    drawLine(line.x - gCtx.measureText(line.txt).width / 2, line.y + space, line.x + gCtx.measureText(line.txt).width / 2, line.y + space, line.color);
                    break;
                case 'right':
                    drawLine(line.x, line.y + space, line.x - gCtx.measureText(line.txt).width, line.y + space, line.color);
            }
        }
        if (line.isOnFocus && isEditing) {
            drawRect(line.y);
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

function drawRect(y, x = 15) {
    gCtx.beginPath()
    gCtx.lineWidth = 4;
    gCtx.rect(x, y - gMeme.lines[gMeme.selectedLineIdx].size, gCanvas.width - 20, gMeme.lines[gMeme.selectedLineIdx].size * 1.3)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function saveMeme() {
    let imgData = gCanvas.toDataURL()
    var gMemesIdArr = getIds(gMemes)
    gMemes.push({ id: generateId(gMemesIdArr), url: imgData })
    _saveMemesToStorage()
}

function finalizeMeme() {
    const elImg = new Image()
    elImg.src = `img/memes/${gMeme.selectedImgId}.jpg`;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
        drawDetails(false);
    }
}

function convertImageToDownload(elLink) {
    finalizeMeme();
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
        y: gCanvas.height / 2,
        isOnFocus: false,
        isDragging: false
    }
}
// return My Memes
function getMyImgs() {
    return gMemes;
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

function getTextWidth(line) {
    return gCtx.measureText(line.txt).width;
}

function getMemeIndexByID(memeId) {
    return gMemes.findIndex(meme => meme.id === memeId)
}

function deleteMeme(memeId) {
    let memeIdx = getMemeIndexByID(memeId);
    console.log('memeIdx:', memeIdx)
    if (memeIdx > -1) {
        gMemes.splice(memeIdx, 1)
        _saveMemesToStorage();
    }
}

function _saveMemesToStorage() {
    saveToStorage(KEY, gMemes)
}

function _createMemes() {
    var memes = loadFromStorage(KEY)
    if (!memes || !memes.length) {
        memes = gMemeExamples;
    }
    gMemes = memes;
    _saveMemesToStorage();
}

// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)
        document.querySelector('body').style = 'cursor: auto';
    }
    let inputVal = elForm.querySelector('input').value
    doUploadImg(elForm, onSuccess, inputVal);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    console.log('doUploadImg -> formData', formData)
    document.querySelector('body').style = 'cursor: progress';
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}




