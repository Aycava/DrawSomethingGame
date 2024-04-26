const countdown = parseInt(localStorage.getItem("time"));
let current_time = countdown;
const timer = document.getElementById("clock");

//ticks the current time down, if we reached 0 we call reset, if we are even with or below 15 the number goes red for dramatic effect.
function tick() {
    timer.innerHTML = current_time.toString();
    current_time--;
     if (current_time < 0) {
         reset();
     }
     else if (current_time <= 15) {
         timer.style.color = 'red';
     }

}
//resets our drawing, resets our countdown, resets our undo collection logs the first state
function reset() {
    current_time = countdown;
    next_drawing();
    canvasStates.length = 0;
    currentState = 0;
    logCanvasState();
}

