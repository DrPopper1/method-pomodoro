let time = 0;
let start_timer = null;
let isRunning = false;
let isRest = false;

const start_button = document.querySelector('.start');
const stop_button = document.querySelector('.stop');
const pomodoro_span = document.querySelector('.pomodoro-span');
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');
const timer_container = document.querySelector('.timer-container');

function updateDisplay() {

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

function button_title() {
    start_button.innerHTML = "Старт";
    start_button.title = "Начать отсчет";
}

function timer() {
    stop_button.disabled = true;
    start_button.addEventListener('click', function() {
        if (!isRunning) {
            isRunning = true;
            time = parseInt(min.innerHTML) * 60 + parseInt(sec.innerHTML);
            start_button.innerHTML = "Пауза";
            start_button.title = "Остановить отсчет";
            start_timer = setInterval(() => {
                time--;
                updateDisplay();
                if (time <= 0) {
                    clearInterval(start_timer);
                    isRunning = false;
                    button_title();
                    min.innerHTML = "5";
                    sec.innerHTML = "00";
                    isRest = true;
                    timer_container.style.background = "#2ca71b";
                    pomodoro_span.innerHTML = parseInt(pomodoro_span.innerHTML) + 1;
                    alert("Время вышло!");
                }
            }, 1000);
            stop_button.disabled = false;
            stop_button.addEventListener('click', function() {
                clearInterval(start_timer);
                isRunning = false;
                button_title();
                if (!isRest) {
                    min.innerHTML = "25";
                } else {
                    min.innerHTML = "5";
                }
                sec.innerHTML = "00";
                stop_button.disabled = true;
            });
        } else {
            isRunning = false;
            clearInterval(start_timer);
            start_button.innerHTML = "Продолжить";
            start_button.title = "Продолжить отсчет";
        }
    });
}

timer();