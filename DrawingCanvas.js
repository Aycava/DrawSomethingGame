const canvas = document.getElementById('drawing_board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');
let canvasStates = [];
let currentState;
let currentTool;

function resizeCanvas() {
    const container = document.getElementById('container');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if (e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if (e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    const rect = canvas.getBoundingClientRect();
    const mouseX= e.clientX - rect.left;
    const mouseY= e.clientY - rect.top;
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
});

canvas.addEventListener('mouseup', (e) => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
    logCanvasState();
});

function logCanvasState() {
    if (currentState !== canvasStates.length - 1) {
        canvasStates.splice(currentState + 1);
    }
    canvasStates.push(canvas.toDataURL());
    currentState = canvasStates.length - 1;
}

function undo() {
    if (currentState > 0) {
        currentState--;
        const img = new Image();
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = canvasStates[currentState];
    }
}

function redo() {
    if (currentState < canvasStates.length - 1) {
        currentState++;
        const img = new Image();
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
        img.src = canvasStates[currentState];
    }
}

function fillCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    logCanvasState();

}

function switchEraser() {
    currentTool = 'eraser';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;
}

function switchPen() {
    currentTool = 'pen';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 10;
}
