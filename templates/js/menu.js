// Menu window

function change_window(new_window) {
    let create = document.getElementById('create').style;
    let create_button = document.getElementById('create-window-button').style;
    let solve = document.getElementById('solve').style;
    let solve_button = document.getElementById('solve-window-button').style;
    let personal_area = document.getElementById('personal-area').style;
    let personal_area_button = document.getElementById('personal-area-window-button').style;

    if (new_window === 'create') {
        create.display = 'block';
        solve.display = 'none';
        personal_area.display = 'none';
        create_button.background = '#4E8F8B';
        solve_button.background = '#85B7B4';
        personal_area_button.background = '#85B7B4';
    } else {
        if (new_window === 'solve') {
            create.display = 'none';
            solve.display = 'block';
            personal_area.display = 'none';
            create_button.background = '#85B7B4';
            solve_button.background = '#4E8F8B';
            personal_area_button.background = '#85B7B4';
            document.getElementById("option").value = '';
            document.getElementById('teacher-info').textContent = '';
            document.getElementById('theme-info').textContent = '';
            document.getElementById('comment-info').textContent = '';
        } else {
            create.display = 'none';
            solve.display = 'none';
            personal_area.display = 'block';
            create_button.background = '#85B7B4';
            solve_button.background = '#85B7B4';
            personal_area_button.background = '#4E8F8B';
        }
    }
}

function select_subject() {
    let sub = document.getElementById('other-subject');
    if (document.getElementById('subject').value === 'other') {
        sub.style.display = 'block';
    } else {
        sub.style.display = 'none';
    }
}

function find_option(){
    let text = document.getElementById('option').value;
    /* Search in DB*/
    let teacher = document.getElementById('teacher-info'),
        theme = document.getElementById('theme-info'),
        comment = document.getElementById('comment-info');
    if (text === '12345678') {
        teacher.textContent = 'Учитель: Таковата Такая Такововна';
        theme.textContent = 'Тема: Строение многоклеточных организмов и других тупых тварей населяющих нашу землю';
        if (theme.textContent.length > 50) {
            comment.style.top = '45%';
        }
        comment.textContent = 'Примечания: сложный тест, вам п***ц, если решите хотя бы 5 заданий поставлю,так и быть, 5.';
        /* ограничение по символам 325 */
    } else {
        teacher.textContent = '';
        theme.textContent = '';
        comment.textContent = '';
    }
}

function startSolve() {
    let num_option = document.getElementById('option').value;
    // Find option info
    // And append tasks
    window.open('./solve.html','_self');
}

// Create window

function create() {
}

function show_popup(type_popup=null) {
    document.getElementById("popup").style.display = "block";
    if (type_popup === "error") {
        document.getElementById('popup-content').style.display = 'none';
        document.getElementById('error-popup').style.display = 'block';
    } else {
        document.getElementById('popup-content').style.display = 'block';
        document.getElementById('error-popup').style.display = 'none';
    }
}

function hide_popup() {
    document.getElementById("popup").style.display = "none";
}

var uploaded_top = 0;
var uploaded_files = [];

function upload_file() {
    let file_path = document.getElementById('pc-file').value;
    let annexes = document.getElementById('annexes');
    let pictures = ['jpeg', 'jpg', 'png', 'gif', 'tiff', 'tif'];
    let audios = ['mp3', 'm4a', 'flac', 'mp4', 'wav', 'mov'];
    format = file_path.split('.')[file_path.split('.').length - 1]
    if (pictures.includes(format) || audios.includes(format)) {
        let img = document.createElement('img');
        let but = document.getElementById('annex-button').style;
        item_id = uploaded_top / 18;

        if (pictures.includes(format)) {
            img.src = "../src/photos/image-icon-96.png";
        } else {
            img.src = "../src/photos/speaker-icon.png";
        }
        img.style = "position: absolute;width: 34px;height: 30px;left: 15%;top:" + (uploaded_top + 2) + "%;"
        img.id = item_id + '-img';
        annexes.appendChild(img);

        let name = document.createElement('label');
        fileName = file_path.split("\\")[file_path.split("\\").length - 1];
        if (fileName.length > 15) {
            name.textContent = fileName.slice(0,14) + '...';
            name.title = fileName;
        } else {
            name.textContent = fileName
        }
        name.style = "position: absolute;width: 58%;height: 14%;left: 26%;top: " + uploaded_top + "%;" +
            "background: rgba(78, 143, 139, 0.47);border-radius: 20px;";
        name.id = item_id + '-name';
        annexes.appendChild(name);

        let remove = document.createElement('img');
        remove.src = '../src/photos/remove.png';
        remove.id = item_id;
        remove.onclick = function(event) {
            var remove_id = event.target.id;
            var childs = document.getElementById('annexes').children;
            document.getElementById(remove_id).remove();
            document.getElementById(remove_id + '-img').remove();
            document.getElementById(remove_id + '-name').remove();
            for (let i = parseInt(remove_id) + 1; i < (childs.length / 3) + 1; i++) {
                let image = document.getElementById(i + '-img');
                let cur_name = document.getElementById(i + '-name');
                let cur_remove = document.getElementById(i);
                cur_top = 18 * (i - 1);
                image.style.top = (cur_top + 2) + '%';
                cur_name.style.top = cur_top  + '%';
                cur_remove.style.top = (cur_top + 1) + '%';
                image.id = (parseInt(image.id) - 1) + '-img';
                cur_name.id = (parseInt(cur_name.id) - 1) + '-name';
                cur_remove.id = cur_remove.id - 1;
            }
            button = document.getElementById('annex-button').style;
            button.top = (parseInt(button.top) - 14) + '%';
            uploaded_top -= 18;
        };
        remove.style = "position: absolute;width: 34px;height: 34px;left: 86%;top:" + (uploaded_top + 1) + "%;" +
            "cursor:pointer;";
        annexes.appendChild(remove);
        uploaded_top += 18;
        if (but.top === "") {
            but.top = (24 + uploaded_top) + '%';
        } else {
            but.top = (parseInt(but.top) + 14) + '%';
        }
    } else {
        show_popup('error');

    }
}

// Solve window
var tasks = [
    {
        'number': 1,
        'text': 'В 1 сезоне 6 серии сериала "Ведьмак" загадочный человек пытается убедить Геральта присоединиться к охоте на свирепого дракона, задание, заинтересовавшее знакомое лицо. Цири же задается вопросом: кому она на самом деле может доверять?',
        'annexes': ['../src/photos/pc.png', '../src/pictures/Artboard.png', '../src/sounds/Торты_истина.m4a'],
        'answer': '1234'
    },
    {
        'number': 2,
        'text': 'В 2 сезоне 6 серии сериала "Ведьмак" загадочный человек пытается убедить Геральта присоединиться к охоте на свирепого дракона, задание, заинтересовавшее знакомое лицо. Цири же задается вопросом: кому она на самом деле может доверять?',
        'annexes': ['../src/photos/pc.png', '../src/pictures/Artboard.png', '../src/sounds/Торты_ложь.m4a'],
        'answer': '1234'
    },
    {
        'number': 3,
        'text': 'В 2 сезоне 1 серии сериала "Ведьмак" загадочный человек пытается убедить Геральта присоединиться к охоте на свирепого дракона, задание, заинтересовавшее знакомое лицо. Цири же задается вопросом: кому она на самом деле может доверять?',
        'annexes': ['../src/photos/pc.png', '../src/pictures/Artboard.png', '../src/sounds/Торты_истина.m4a'],
        'answer': '1234'
    }
];

var cur_task = 0;
var checkMod = false;

window.onload = nextTask();

function nextTask(){
    let answer = document.getElementById('answer');
    if (!checkMod){
        if (answer !== null && cur_task > 0){
            tasks[cur_task - 1]['user_answer'] = answer.value;
            answer.value = '';
        }
    } else {
        exit = document.getElementById('exit');
        if (exit.hidden !== true){
            exit.hidden = true;
            let back = document.getElementById('next');
            back.textContent = 'Назад';
        } else {
            exit.hidden = false;
            cur_task = tasks.length;
        }
    }
    if (cur_task < tasks.length) {
        info = tasks[cur_task];
    } else {
        cur_task = 0;
        document.getElementById('solve-tasks').hidden = true;
        document.getElementById('tasks-results').style.display = 'block';
        if (!checkMod){
            results();
        }
    }
    let number = document.getElementById('solve-task-number');
    let text = document.getElementById('solve-task-text');
    if (number === null || text === null){
        return
    }
    number.textContent = 'Задание ' + info['number'] + '/' + tasks.length;
    text.textContent = info['text'];
    annexes(info['annexes']);
    cur_task++;
}

function annexes(paths) {
    // get images an sounds
    var sounds = {};

    let annex = document.getElementById('annexes-solve');
    if (annex === null) {
        return
    }
    annex_top = 0;
    for (let i = 0; i < paths.length; i++) {
        let img = document.createElement('img');
        let button = document.createElement('button');
        item_id = annex_top / 18;

        flooder = paths[i].split('/')[paths[i].split('/').length - 2];
        if (flooder === 'photos' || flooder === 'pictures') {
            img.src = paths[i];
            button.textContent = 'Просмотр';
            button.onclick = function (event) {
                image = document.getElementById(event.target.id + '-img');
                popup = document.getElementById('popup');
                popup_content = document.getElementById('popup-content');
                popup_image = document.getElementById('popup-image');
                popup_image.src = image.src;
                if (popup_image.naturalWidth < window.screen.width * 0.9) {
                    popup_content.style.width = popup_image.naturalWidth + 'px';
                } else {
                    popup_content.style.width = '90%';
                    popup_image.style.width = '100%';
                }
                if (popup_image.naturalHeight < window.screen.height * 0.9) {
                    popup_content.style.height = popup_image.height + 'px';
                } else {
                    popup_content.style.height = '90%';
                    popup_image.style.height = '100%';
                }
                popup.style.display = 'block';
            }
        } else {
            img.src = '../src/photos/speaker-icon.png';
            button.textContent = 'Прослушать';
            sounds[item_id] = paths[i];
            button.onclick = function (event) {
                sound_id = event.target.id;
                var audio = new Audio(sounds[sound_id]);
                audio.play();
            }
        }
        img.style = "position: absolute;width: 17%;height: 15%;left: 0;top:" + (annex_top) + "%;"
        button.style = "position: absolute;width: 58%;height: 14%;left: 20%;top: " + annex_top + "%;"
        img.id = item_id + '-img';
        button.id = item_id;

        annex.appendChild(img);
        annex.appendChild(button);
        annex_top += 18;
    }
}


function results() {
    let title = document.getElementById('result-title');
    let number = Math.floor(Math.random() * 1000000).toString();
    while (number.length < 6) number = "0" + number;
    title.textContent += " № " + number;
    let table = document.getElementById('results');
    right_num = 0
    for (let i = 0; i < tasks.length; i++) {
        let newRow = table.insertRow();
        let rawData = ['number', 'user_answer', 'answer'];
        for (let j = 0; j < rawData.length; j++) {
            // Insert a cell in the row at index 0
            let newCell = newRow.insertCell(j);
            // Append a text node to the cell
            let newText = document.createTextNode(tasks[i][rawData[j]]);
            newCell.appendChild(newText);
            if (j > 0) {
                if (tasks[i]['user_answer'] === tasks[i]['answer']) {
                    newCell.style.background = '#587C0D';
                    right_num += 1;
                } else {
                    newCell.style.background = '#A72B2E';
                }
                newCell.style.color = '#FFFFFF';
            }
        }
        let newCell = newRow.insertCell(rawData.length);
        let button = document.createElement('button');
        button.textContent = 'Просмотр';
        button.onclick = function (event) {
            document.getElementById('solve-tasks').hidden = false;
            document.getElementById('tasks-results').style.display = 'none';
            checkMod = true;
            cur_task = event.target.id;
            nextTask();
        };
        button.style = "width: 150%; margin: 5% 0 5% 0;";
        button.id = i;
        newCell.appendChild(button);
    }
    title.textContent += " - " + right_num / 2 + "/" + tasks.length;
}