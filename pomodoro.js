const start_button = document.querySelector('.start');
const stop_button = document.querySelector('.stop');
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

let isRunning = false;
let isRest = false;
let start_timer;
let time;
let time_settings;
let time_1;
let time_2;
let time_3;
let time_4;
let time_min;
let time_sec;

function time_load() {
    if (localStorage.getItem('time_settings')) {
        time_settings = JSON.parse(localStorage.getItem('time_settings'));
        time_1 = time_settings[0] * 60;
        time_2 = time_settings[1] * 60;
        time_3 = time_settings[2] * 60;
        time_4 = time_settings[3];
    }
    else {
        time_settings = [25, 5, 15, 4];
        localStorage.setItem('time_settings', JSON.stringify(time_settings));
        time_1 = time_settings[0] * 60;
        time_2 = time_settings[1] * 60;
        time_3 = time_settings[2] * 60;
        time_4 = time_settings[3];
    }
    time = time_1;
    updateDisplay();
}

function time_setting() {
    if (var1.value != "" & var1.value != null & var1.value != undefined & var1.value != isNaN & var1.value <= 60) {
        time_1 = Math.floor(parseInt(var1.value));
    }
    if (var2.value != "" & var2.value != null & var2.value != undefined & var2.value != isNaN & var2.value <= 60) {
        time_2 = Math.floor(parseInt(var2.value));
    }
    if (var3.value != "" & var3.value != null & var3.value != undefined & var3.value != isNaN & var3.value <= 60) {
        time_3 = Math.floor(parseInt(var3.value));
    }
    if (var4.value != "" & var4.value != null & var4.value != undefined & var4.value != isNaN & var4.value <= 60) {
        time_4 = Math.floor(parseInt(var4.value));
    }
    time_settings = [time_1, time_2, time_3, time_4];
    localStorage.setItem('time_settings', JSON.stringify(time_settings));
    updateDisplay();
}

function updateDisplay() {
    if (isRunning === true) {
        time_min = Math.floor(time / 60);
    } else if (parseInt(pomodoro_span.innerHTML) === time_4 & isRest === true) {
        time_min = time_settings;
    } else if (isRest === true) {
        time_min = time_settings;
    } else {
        time_min = time_settings;
    }

    if (time_sec == 0) {
        console.log(time_min, time_sec);
        min.innerHTML = time_min;
        sec.innerHTML = "00";
    } else if (time_sec < 10 & time_min < 10) {
        console.log(time_min, time_sec);
        min.innerHTML = `0${time_min}`;
        sec.innerHTML = `0${time_sec}`;
    } else if (time_sec < 10) {
        console.log(time_min, time_sec);
        min.innerHTML = time_min;
        sec.innerHTML = `0${time_sec}`;
    } else if (time_min < 10) {
        console.log(time_min, time_sec);
        min.innerHTML = `0${time_min}`
        sec.innerHTML = time_sec;
    } else {
        console.log(time_min, time_sec);
        min.innerHTML = time_min;
        sec.innerHTML = time_sec;
    }
}

function button_opt(inner, title) {
    start_button.innerHTML = inner;
    start_button.title = title;
}

start_button.addEventListener('click', function() {
    if (!isRunning) {
        button_opt("Пауза", "Остановить отсчет");
        stop_button.disabled = false;
        isRunning = true;
        time = parseInt(min.innerHTML) * 60 + parseInt(sec.innerHTML);
        start_timer = setInterval(() => {
            time--;
            updateDisplay();
            if (time === 0) {
                clearInterval(start_timer);
                button_opt("Старт", "Начать отсчет");
                isRunning = false;
                isRest = !isRest;
                if (isRest === true) {
                    time_back(parseInt(variable_2), "#2ca71b");
                    isRest = false;
                } else {
                    time_back(parseInt(variable_1), "#b84141");
                    isRest = true;
                    pomodoro_span.innerHTML = parseInt(pomodoro_span.innerHTML) + 1;
                }
                alert("Время вышло!");
            }
        }, 1000);
        stop_button.addEventListener('click', function() {
            button_opt("Старт", "Начать отсчет");
            clearInterval(start_timer);
            isRunning = false;
            isRest = !isRest;
            if (isRest === true) {
                time_back(parseInt(variable_2), 0);
            } else if (parseInt(pomodoro_span.innerHTML) === variable_4) {
                time_back(parseInt(variable_3), 0);
            } else {
                time_back(parseInt(variable_1), 0);
            }
            stop_button.disabled = true;
        });
    } else {
        isRunning = false;
        clearInterval(start_timer);
        button_opt("Продолжить", "Продолжить отсчет");
    }
});

pomodoro.addEventListener('click', function() {
    button_opt("Старт", "Начать отсчет");
    clearInterval(start_timer);
    isRunning = false;
    isRest = !isRest;
    stop_button.disabled = true;
    if (isRest === true) {
        pomodoro_span.innerHTML = parseInt(pomodoro_span.innerHTML) + 1;
        isRest = false;
    } else {
        isRest = true;
    }
    if (parseInt(pomodoro_span.innerHTML) === parseInt(variable_4) & isRest === true) {
        time_back(parseInt(variable_3), "#2ca71b");
    } else if (parseInt(pomodoro_span.innerHTML) === parseInt(variable_4) + 1) {
        pomodoro_span.innerHTML = 1;
        time_back(parseInt(variable_1), "#b84141");
    } else if (isRest === true) {
        time_back(parseInt(variable_2), "#2ca71b");
    } else {
        time_back(parseInt(variable_1), "#b84141");
    }
});

// function settingsUpdate() {
//     if (localStorage.getItem('variables')) {
//         variable_1 = JSON.parse(localStorage.getItem('variables'))[0] * 60;
//         variable_2 = JSON.parse(localStorage.getItem('variables'))[1] * 60;
//         variable_3 = JSON.parse(localStorage.getItem('variables'))[2] * 60;
//         variable_4 = JSON.parse(localStorage.getItem('variables'))[3] * 60;
//         if (var1.value != "" & var1.value != null & var1.value != undefined & var1.value != isNaN) {
//             variable_1 = parseInt(var1.value) * 60;
//         } else {
//             variable_1 = 25 * 60;
//         }
//         if (var2.value != "" & var2.value != null & var2.value != undefined & var2.value != isNaN) {
//             variable_2 = parseInt(var2.value) * 60;
//         } else {
//             variable_2 = 5 * 60;
//         }
//         if (var3.value != "" & var3.value != null & var3.value != undefined & var3.value != isNaN) {
//             variable_3 = parseInt(var3.value) * 60;
//         } else {
//             variable_3 = 15 * 60;
//         }
//         if (var4.value != "" & var4.value != null & var4.value != undefined & var4.value != isNaN) {
//             variable_4 = parseInt(var4.value) * 60;
//         } else {
//             variable_4 = 4 * 60;
//         }
//     } else {
//         variable_1 = 25 * 60;
//         variable_2 = 5 * 60;
//         variable_3 = 15 * 60;
//         variable_4 = 4 * 60;
//     }
//     variables = [variable_1, variable_2, variable_3, variable_4];
//     localStorage.setItem('variables', JSON.stringify(variables));
//     time = parseInt(variable_1);
//     updateDisplay();
// };

function updateDisplay() {
    const time_min = Math.floor(time / 60);
    const time_sec = time - time_min * 60;

    if (time_sec == 0) {
        console.log(time_min, time_sec);
        min.innerHTML = time_min;
        sec.innerHTML = "00";
    } else if (time_sec < 10 & time_min < 10) {
        console.log(time_min, time_sec);
        min.innerHTML = `0${time_min}`;
        sec.innerHTML = `0${time_sec}`;
    } else if (time_sec < 10) {
        console.log(time_min, time_sec);
        min.innerHTML = time_min;
        sec.innerHTML = `0${time_sec}`;
    } else if (time_min < 10) {
        console.log(time_min, time_sec);
        min.innerHTML = `0${time_min}`
        sec.innerHTML = time_sec;
    } else {
        console.log(time_min, time_sec);
        min.innerHTML = time_min;
        sec.innerHTML = time_sec;
    }
}

function button_opt(inner, title) {
    start_button.innerHTML = inner;
    start_button.title = title;
}

// function time_back(minutes, back) {
//     if (back != 0) {
//         timer_container.style.background = back;
//     }
//     if ((minutes %= 0) != 0) {
//         const time_min = Math.floor(minutes / 60);
//         const time_sec = minutes - time_min * 60;
//         console.log(time_min, time_sec)
//         if (minutes <= 9 & minutes >= 1) {
//             min.innerHTML = `0${time_min}`;
//             if (time_sec > 9) {
//                 sec.innerHTML = time_sec;
//             } else {
//                 sec.innerHTML = `0${time_sec}`;
//             }
//         } else if (minutes > 10) {
//             min.innerHTML = time_min;
//             if (time_sec > 9) {
//                 sec.innerHTML = time_sec;
//             } else {
//                 sec.innerHTML = `0${time_sec}`;
//             }
//         } else {
//             if (time_sec > 9) {
//                 sec.innerHTML = time_sec;
//             } else {
//                 sec.innerHTML = `0${time_sec}`;
//             }
//         }
//     } else if (minutes <= 9) {
//         min.innerHTML = `0${minutes}`;
//         sec.innerHTML = "00";
//     } else {
//         min.innerHTML = minutes;
//         sec.innerHTML = "00";
//     }
// }

settings.addEventListener('click', function() {
    if (panel.style.display == "none") {
        panel.style.display = "grid";
        console.log('none')
    } else {
        panel.style.display = "none";
    }
})

time_load();