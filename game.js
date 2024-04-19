let currentDrawing = 0;
const numberOfDrawings = parseInt(localStorage.getItem('drawing_number'));
let game_clock = setInterval(tick, 1000);
//using this method for persistence, I want the drawings to still exist if the session is reset
let final_drawings = new Array(numberOfDrawings);
function start_drawing() {
    game_clock = setInterval(tick, 1000);
    currentDrawing = 0;
    next_drawing();
}

function next_drawing() {

    if  (currentDrawing !== 0) {
        save_drawing(currentDrawing);
    }

    currentDrawing++;

    if (currentDrawing > numberOfDrawings) {
        done_drawing();
    }

    if (!load_drawing(currentDrawing)) {
        console.log('no drawing, making new one' + currentDrawing);
        final_drawings.push('drawing' + currentDrawing);
    }


}

function done_drawing() {
    clearInterval(game_clock);
    currentDrawing = 0;
    window.location.href = "RepeatPage.html";
}

function load_drawing(d_index) {
    const curURL = localStorage.getItem('drawing' + d_index);

    if (curURL) {
        const img = new Image();
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };

        img.src = curURL;
        return true;
    } else {
        console.error('Can\'t load drawing');
        return false;
    }

}

function save_drawing() {
    const picURL = canvas.toDataURL('image/png');
    localStorage.setItem('drawing' + currentDrawing, picURL);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

