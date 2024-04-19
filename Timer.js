const countdown = parseInt(localStorage.getItem("time"));
let current_time = countdown;
const timer = document.getElementById("clock");

function start_timer() {
    return setInterval(tick, 1000);
}

function stop_timer(game_clock) {
    clearInterval(game_clock);
}

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

function reset() {
    current_time = countdown;
    next_drawing();
}

