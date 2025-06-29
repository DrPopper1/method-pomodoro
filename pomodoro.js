let time = 0;
let start_timer = null;

function updateDisplay() {
    const min = document.querySelector(".min");
    const sec = document.querySelector(".sec");

    const time_min = Math.floor(time / 60);
    const time_sec = time - time_min * 60;

    if (time_sec == 0) {
        min.innerHTML = time_min;
        sec.innerHTML = "00";
    } else if (time_sec < 10) {
        min.innerHTML = time_min;
        sec.innerHTML = `0${time_sec}`;
    } else {
        min.innerHTML = time_min;
        sec.innerHTML = time_sec;
    }
}

function timer() {
    const start_button = document.querySelector(".start");
    start_button.addEventListener('click', function() {
        const min = document.querySelector(".min");
        const sec = document.querySelector(".sec");
        time = parseInt(min.innerHTML) * 60 + parseInt(sec.innerHTML);
        start_button.innerHTML = "Пауза";
        start_timer = setInterval(() => {
            time--;
            if (time <= 0) {
                clearInterval(start_timer);
                alert("Время вышло!");
            }
            updateDisplay();
        }, 1000);
    });

    // const stop_button = document.querySelector(".stop");
    // const pomodoro_span = document.querySelector("pomodoro-span");
}

timer();