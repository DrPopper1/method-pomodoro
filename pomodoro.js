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

const var1 = document.querySelector('#var1');
const var2 = document.querySelector('#var2');
const var3 = document.querySelector('#var3');
const var4 = document.querySelector('#var4');

let variable_1 = 25;
let variable_2 = 5;
let variable_3 = 15;
let variable_4 = 4;
settingsUpdate();

variable_1 = JSON.parse(localStorage.getItem('variables'))[0];
variable_2 = JSON.parse(localStorage.getItem('variables'))[1];
variable_3 = JSON.parse(localStorage.getItem('variables'))[2];
variable_4 = JSON.parse(localStorage.getItem('variables'))[3];
time = variable_1;

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
    if (parseInt(pomodoro_span.innerHTML) === variable_4 & koin === 1) {
        time_back(variable_3, "#2ca71b");
    } else if (parseInt(pomodoro_span.innerHTML) === variable_4 + 1) {
        pomodoro_span.innerHTML = 1;
        time_back(variable_1, "#b84141");
    } else if (isRest === true) {
        time_back(variable_2, "#2ca71b");
    } else {
        time_back(variable_1, "#b84141");
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
                    time_back(variable_2, "#2ca71b");
                } else {
                    time_back(variable_1, "#b84141");
                }
                alert("Время вышло!");
            }
        }, 1000);
        stop_button.addEventListener('click', function() {
            button_opt("Старт", "Начать отсчет");
            clearInterval(start_timer);
            isRunning = false;
            if (koin === 0) {
                time_back(variable_1, 0);
            } else if (parseInt(pomodoro_span.innerHTML) === variable_4) {
                time_back(variable_3, 0);
            } else {
                time_back(variable_2, 0);
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
    if (minutes <= 9) {
        min.innerHTML = `0${minutes}`;
    } else {
        min.innerHTML = minutes;
    }
    sec.innerHTML = "00";
}

settings.addEventListener('click', function() {
    if (panel.style.display == "none") {
        panel.style.display = "grid";
        console.log('none')
    } else {
        panel.style.display = "none";
    }
})

function settingsUpdate() {
    const var1 = document.querySelector('#var1');
    const var2 = document.querySelector('#var2');
    const var3 = document.querySelector('#var3');
    const var4 = document.querySelector('#var4');
    if (var1.value != "" & var1.value != null & var1.value != undefined & var1.value != isNaN) {
        variable_1 = var1.value;
    }
    if (var2.value != "" & var2.value != null & var2.value != undefined & var2.value != isNaN) {
        variable_2 = var2.value;
    }
    if (var3.value != "" & var3.value != null & var3.value != undefined & var3.value != isNaN) {
        variable_3 = var3.value;
    }
    if (var4.value != "" & var4.value != null & var4.value != undefined & var4.value != isNaN) {
        variable_4 = var4.value;
    }
    variables = [variable_1, variable_2, variable_3, variable_4];
    localStorage.setItem('variables', JSON.stringify(variables));
    updateDisplay();
}