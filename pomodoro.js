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
const todo_list = document.querySelector('.todo-list');
const todo_completed = document.querySelector('.todo-completed');
const todo_list_input = document.querySelector('.todo-list-input');

stop_button.disabled = true;
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
let list;

if (localStorage.getItem('list')) {
    list = JSON.parse(localStorage.getItem('list'));
} else {
    list = [];
    localStorage.setItem('list', JSON.stringify(list));
}

function time_load() {
    if (localStorage.getItem('time_settings')) {
        time_settings = JSON.parse(localStorage.getItem('time_settings'));
    } else {
        time_settings = [25, 5, 15, 4];
        localStorage.setItem('time_settings', JSON.stringify(time_settings));
    }
    time_1 = time_settings[0];
    time_2 = time_settings[1];
    time_3 = time_settings[2];
    time_4 = time_settings[3];

    time = time_1 * 60;
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
    time_sec = 0;
    if (isRunning === true) {
        time_min = Math.floor(time / 60);
        time_sec = time - time_min * 60;
    } else if (parseInt(pomodoro_span.innerHTML) === time_4 & isRest === true) {
        time_min = time_settings[2];
    } else if (isRest === true) {
        time_min = time_settings[1];
    } else {
        time_min = time_settings[0];
    }

    if (time_sec < 10 & time_min < 10) {
        min.innerHTML = `0${time_min}`;
        sec.innerHTML = `0${time_sec}`;
    } else if (time_sec === 0) {
        min.innerHTML = time_min;
        sec.innerHTML = "00";
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
    console.log(`${time_min}:${time_sec}`);
}

function time_color(back, present_time) {
    timer_container.style.background = back;
    time = present_time;
    updateDisplay();
}

function button_opt(inner, title, dis) {
    start_button.innerHTML = inner;
    start_button.title = title;
    stop_button.disabled = dis;
}

start_button.addEventListener('click', function() {
    if (isRunning === false) {
        button_opt("Пауза", "Остановить отсчет", false);
        isRunning = true;
        time = parseInt(min.innerHTML) * 60 + parseInt(sec.innerHTML);
        start_timer = setInterval(() => {
            time--;
            updateDisplay();
            if (time === 0) {
                clearInterval(start_timer);
                button_opt("Старт", "Начать отсчет", true);
                isRunning = false;
                isRest = !isRest;
                if (pomodoro_span.innerHTML === time_4 & isRest === true) {
                    time_color("#2ca71b", time_settings[2]);
                } else if (isRest === true) {
                    time_color("#2ca71b", time_settings[1]);
                } else if (parseInt(pomodoro_span.innerHTML) > time_4) {
                    pomodoro_span.innerHTML = 1;
                    time_color("#b84141", time_settings[0]);
                } else {
                    time_color("#b84141", time_settings[0]);
                    pomodoro_span.innerHTML = parseInt(pomodoro_span.innerHTML) + 1;
                }
                alert("Время вышло!");
            }
        }, 1000);
        stop_button.addEventListener('click', function() {
            button_opt("Старт", "Начать отсчет", true);
            clearInterval(start_timer);
            isRunning = false;
            stop_button.disabled = true;
            updateDisplay();
        });
    } else {
        isRunning = false;
        clearInterval(start_timer);
        button_opt("Продолжить", "Продолжить отсчет", false);
    }
});

pomodoro.addEventListener('click', function() {
    button_opt("Старт", "Начать отсчет", true);
    clearInterval(start_timer);
    isRunning = false;
    isRest = !isRest;
    if (pomodoro_span.innerHTML === time_4 & isRest === true) {
        time_color("#2ca71b", time_settings[2]);
    } else if (isRest === true) {
        time_color("#2ca71b", time_settings[1]);
    } else if (parseInt(pomodoro_span.innerHTML) >= time_4) {
        pomodoro_span.innerHTML = 1;
        time_color("#b84141", time_settings[0]);
    } else {
        time_color("#b84141", time_settings[0]);
        pomodoro_span.innerHTML = parseInt(pomodoro_span.innerHTML) + 1;
    }
});

settings.addEventListener('click', function() {
    if (panel.style.display == "none") {
        panel.style.display = "grid";
        console.log('none')
    } else {
        panel.style.display = "none";
    }
})

function toDoList() {

    todo_list.innerHTML = '';
    todo_completed.innerHTML = '';

    list.forEach(function(item, i) {
        let div = document.createElement("div");
        div.classList.add("todo-item");
        div.innerHTML = `<div class="text">${item.value}</div>
                        <div class="buttons">
                            <button class="btn_todo_complete" title="Выполнено">Выполнено</button>
                            <button class="btn_todo_remove" title="Удалить">Удалить</button>
                        </div>`
    
        const btn_todo_complete = div.querySelector('.btn_todo_complete');
        btn_todo_complete.addEventListener('click', function() {
            item.completed = !item.completed;
            localStorage.setItem('list', JSON.stringify(list));
            toDoList();
        });
    
        const btn_todo_remove = div.querySelector('.btn_todo_remove');
        btn_todo_remove.addEventListener('click', function() {
            list.splice(i, 1);
            localStorage.setItem('list', JSON.stringify(list));
            toDoList();
        });

        if (item.completed) {
            todo_completed.append(div);
        } else {
            todo_list.append(div);
        }
    });
}

function add() {
    if (todo_list_input.value.trim() !== "") {
        let new_todo = {
            value: todo_list_input.value.trim(),
            completed: false,
        };
        list.push(new_todo);
        todo_list_input.value = "";
        localStorage.setItem('list', JSON.stringify(list));
        toDoList();
    }
}

todo_list_input.addEventListener('keyup', function(event) {
    const key = event.key;
    if (key === 'Enter') {add()};
});

toDoList();
time_load();