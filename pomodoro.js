let time = 0;
let start_timer = null;
let isRunning = false;
let isRest = false;
let koin = 0;

const start_button = document.querySelector('.start');
const stop_button = document.querySelector('.stop');
stop_button.disabled = true;
const pomodoro_span = document.querySelector('.pomodoro-span');
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');
const timer_container = document.querySelector('.timer-container');
const pomodoro = document.querySelector('.pomodoro');
const settings = document.querySelector('.settings');
const panel = document.querySelector('.panel');

function updateDisplay() {
    const time_min = Math.floor(time / 60);
    const time_sec = time - time_min * 60;

    if (time_sec == 0) {
        min.innerHTML = time_min;
        sec.innerHTML = "00";
    } else if (time_sec < 10 & time_min < 10) {
        min.innerHTML = `0${time_min}`;
        sec.innerHTML = `0${time_sec}`;
    } else if (time_sec < 10) {
        min.innerHTML = time_min;
        sec.innerHTML = `0${time_sec}`;
    } else if (time_min < 10) {
        min.innerHTML = `0${time_min}`
        sec.innerHTML = time_sec;
    } else {
        min.innerHTML = time_min;
        sec.innerHTML = time_sec;
    }
}

function button_opt(inner, title) {
    start_button.innerHTML = inner;
    start_button.title = title;
}

pomodoro.addEventListener('click', function() {
    button_opt("Старт", "Начать отсчет");
    clearInterval(start_timer);
    isRunning = false;
    isRest = !isRest;
    stop_button.disabled = true;
    if (koin === 1) {
        pomodoro_span.innerHTML = parseInt(pomodoro_span.innerHTML) + 1;
        koin--
    } else {
        koin++
    }
    if (parseInt(pomodoro_span.innerHTML) === 4 & koin === 1) {
        time_back(15, "#2ca71b");
    } else if (parseInt(pomodoro_span.innerHTML) === 5) {
        pomodoro_span.innerHTML = 1;
        time_back(25, "#b84141");
    } else if (isRest === true) {
        time_back(5, "#2ca71b");
    } else {
        time_back(25, "#b84141");
    }
});

start_button.addEventListener('click', function() {
    if (!isRunning) {
        button_opt("Пауза", "Остановить отсчет");
        stop_button.disabled = false;
        isRunning = !isRunning;
        time = parseInt(min.innerHTML) * 60 + parseInt(sec.innerHTML);
        start_timer = setInterval(() => {
            time--;
            updateDisplay();
            if (time === 0) {
                clearInterval(start_timer);
                button_opt("Старт", "Начать отсчет");
                isRunning = false;
                if (koin === 1) {
                    isRest = false;
                    pomodoro_span.innerHTML = parseInt(pomodoro_span.innerHTML) + 1;
                    koin--
                } else {
                    koin++
                }
                if (koin === 1) {
                    time_back(5, "#2ca71b");
                } else {
                    time_back(25, "#b84141");
                }
                alert("Время вышло!");
            }
        }, 1000);
        stop_button.addEventListener('click', function() {
            button_opt("Старт", "Начать отсчет");
            clearInterval(start_timer);
            isRunning = false;
            if (koin === 0) {
                time_back(25, 0);
            } else if (parseInt(pomodoro_span.innerHTML) === 4) {
                time_back(15, 0);
            } else {
                time_back(5, 0);
            }
            stop_button.disabled = true;
        });
    } else {
        isRunning = false;
        clearInterval(start_timer);
        button_opt("Продолжить", "Продолжить отсчет");
    }
});

function time_back(minutes, back) {
    if (back != 0) {
        timer_container.style.background = back;
    }
    if (minutes === 5) {
        min.innerHTML = `0${minutes}`;
    } else {
        min.innerHTML = minutes;
    }
    sec.innerHTML = "00";
}

settings.addEventListener('click', function() {
    panel.style.display
})