const canvas = document.getElementById('drawing_board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

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
    startX = e.clientX - rect.left - window.scrollX;
    startY = e.clientY - rect.top - window.scrollY;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
});

canvas.addEventListener('mouseup', (e) => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);
