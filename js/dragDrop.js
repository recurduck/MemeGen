var gCircle
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function editorInit() {
    gCircle = getCurrLine()
    addListeners()
    // renderCanvas()
}

function createCircle() {
    return {
        pos: { x: gCanvas.width / 2, y: gCanvas.height / 2 },
        size: 60,
        color: 'blue',
        isDragging: false
    }
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}


function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isCirlceClicked(pos)) return
    gCircle.isDragging = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    if (gCircle.isDragging) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y

        gCircle.pos.x += dx
        gCircle.pos.y += dy

        gStartPos = pos
        renderCanvas()
    }
}

function onUp() {
    gCircle.isDragging = false
    document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function isCirlceClicked(clickedPos) {
    const  pos  = gCircle
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gCircle.size
}

function drawArc(x, y, size = 60, color = 'blue') {
    gCtx.beginPath()
    gCtx.lineWidth = '6'
    gCtx.arc(x, y, size, 0, 2 * Math.PI)
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
    gCtx.fillStyle = color
    gCtx.fill()

}

// function renderCanvas() {
//     gCtx.save()
//     gCtx.fillStyle = "#ede5ff"
//     gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
//     gCtx.restore()
//     if (gCircle) renderCircle()
// }

function renderCircle() {
    const { pos, color, size } = gCircle
    drawArc(pos.x, pos.y, size, color)
}