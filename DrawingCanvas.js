//creates canvas and toolbar elements
const canvas = document.getElementById('drawing_board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');
let canvasStates = [];
let currentState;
let currentTool;

//function in case of resize to ensure canvas dimentions are secured
function resizeCanvas() {
    const container = document.getElementById('container');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

//values for painting logic
let lineWidth = 5;
let isPainting = false;
let startX;
let startY;
//event listener for clear button, clears canvas
toolbar.addEventListener('click', l => {
    if (l.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});
//manages changes in the stroke and linewidth toolbar functions
toolbar.addEventListener('change', l => {
    if (l.target.id === 'stroke') {
        ctx.strokeStyle = l.target.value;
    }

    if (l.target.id === 'lineWidth') {
        lineWidth = l.target.value;
    }
});
//draws lines while isPainting is true, sets the width and ends of the line
const draw = (l) => {
    if(!isPainting) {
        return;
    }
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    //gets position of canvas in viewport to adjust mouse coords
    const rect = canvas.getBoundingClientRect();
    //calculate mouse position relative to canvas
    const mouseX= l.clientX - rect.left;
    const mouseY= l.clientY - rect.top;
    //draws line to new mouse position
    ctx.lineTo(mouseX, mouseY);
    //draws path on canvas
    ctx.stroke();
}
//event listener to detect when user presses mouse down over canvas, sets isPainting bool true
canvas.addEventListener('mousedown', (l) => {
    isPainting = true;
    const rect = canvas.getBoundingClientRect();
    startX = l.clientX - rect.left;
    startY = l.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
});
//detects when user stops pressing mouse down and stops painting, this is also when the drawing action is logged
canvas.addEventListener('mouseup', (l) => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
    logCanvasState();
});
//logs our canvas for the purposes of our undo redo functions
function logCanvasState() {
    if (currentState !== canvasStates.length - 1) {
        canvasStates.splice(currentState + 1);
    }
    canvasStates.push(canvas.toDataURL());
    currentState = canvasStates.length - 1;
}
//returns to previous saved canvas before most recent action.
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
//undos the previous undo
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
//fills canvas with background color
function fillCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    logCanvasState();

}
//switches to eraser tool, which is really just a pen the same color as our background
function switchEraser() {
    currentTool = 'eraser';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;
}
//changes to pen tool
function switchPen() {
    currentTool = 'pen';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 10;
}
//event listeners to initiate functions when buttons are clicked
document.getElementById('undo').addEventListener('click', undo);

document.getElementById('redo').addEventListener('click', redo);

document.getElementById('pen').addEventListener('click', switchPen);

document.getElementById('eraser').addEventListener('click', switchEraser);
//draws when mouse is moving over the canvas and the user has inputted some action that set isPainting to true
canvas.addEventListener('mousemove', draw);
