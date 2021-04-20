var option = 0,
    cur_task = 0,
    checkMod = false,
    uploaded_top = 0,
    tasks = [],
    uploaded_files = [];

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
    let options = {
            '123456': {
                'info': {
                    'subject': 'Биология',
                    'teacher': 'Таковата Такая Такововна',
                    'theme': 'Строение многоклеточных организмов и других тупых тварей населяющих нашу землю',
                    'comment': 'Сложный тест, вам п***ц, если решите хотя бы 5 заданий поставлю,так и быть, 5.'
                },
                'tasks': []
            }
        };

    let text = document.getElementById('option').value;
    /* Search in DB*/
    let subject = document.getElementById('subject-info'),
        teacher = document.getElementById('teacher-info'),
        theme = document.getElementById('theme-info'),
        comment = document.getElementById('comment-info');

    if (text in options) {
        let info = options[text]['info'];
        subject.textContent = 'Предмет: ' + info['subject'];
        teacher.textContent = 'Учитель: ' + info['teacher'];
        theme.textContent = 'Тема: ' + info['theme'];
        if (theme.textContent.length > 50) {
            comment.style.top = '60%';
        }
        comment.textContent = 'Примечания: ' + info['comment'];
        /* ограничение по символам 325 */
    } else {
        subject.textContent = '';
        teacher.textContent = '';
        theme.textContent = '';
        comment.textContent = '';
    }
}

function startSolve() {
    let num_option = document.getElementById('option').value;
    // Find option info
    // And append tasks
    window.open('/solve','_self');
}

function startCreate() {
    console.log('Test');
    let subject = document.getElementById('subject'),
        sub_subject = document.getElementById('other-subject'),
        theme = document.getElementById('theme'),
        comment = document.getElementById('comment');

    if (theme.value === ''){
        theme.classList.add('error-input');
        return
    } else {
        theme.classList.remove('error-input');
    }

    let return_subject = subject.value;

    if (return_subject === 'other'){
        if (sub_subject.value === "") {
            sub_subject.classList.add('error-input');
            return
        }
        return_subject = sub_subject.value;
    }
    console.log('Write option');
    let promise = fetch('/write_data/start_create_option', {
        body: JSON.stringify({
            'subject': return_subject,
            'theme': theme.value,
            'comment': comment.value
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST'
    }).then(response => response.json());
    console.log('Get promise:' + promise);
    promise.then(
            result => {
                console.log('Get number option: ' + result);
                document.cookie = 'option_number=' + result;
                },
            error => {
                throw error;
            }
        );
    // Write number
    window.open('/create','_self');
}

// Create window

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function delete_cookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function loadAsArrayBuffer(file_path, theFile) {
    var reader = new FileReader();

    reader.onload = function(loadedEvent) {
        // var arrayBuffer =  loadedEvent.target.result;
        // var dataView = new DataView(arrayBuffer, 0, arrayBuffer.byteLength);
        dataView = loadedEvent.target.result;
        let promise = fetch('/write_data/save_file', {
            body: JSON.stringify({
                'data': dataView
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
        }).then(response => response.json());

        let new_file_path = '';
        promise.then(
            result => {
                new_file_path = result["file_name"];
                console.log("Get path to file: " + new_file_path);
                appendFile(file_path, new_file_path);
            },
            error => {
                throw error;
            }
        );
    };

    reader.readAsDataURL(theFile);
}

function preview() {
    let text = document.getElementById('task-text');

    let post = {
        'number': cur_task.toString(),
        'text': text.value,
        'annexes': uploaded_files,
    };

    document.cookie = 'preview_task=' + encodeURIComponent(JSON.stringify(post));

    window.open('/solve', '_self');
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

function upload_file(event) {
    let preview_task = getCookie('preview_task'),
        file_path = event.target.value,
        image = event.target.files[0];
    if (!preview_task) {
        loadAsArrayBuffer(file_path, image);
    } else {
        files_paths = JSON.parse(preview_task)["annexes"];
        for (let i = 0; i < files_paths.length; i++) {
            appendFile(files_paths[i]["name"], files_paths[i]["url"]);
        }
        delete_cookie("preview_task");
    }
}
function appendFile(file_path, image_data){
    let annexes = document.getElementById('annexes');
    let pictures = ['jpeg', 'jpg', 'png', 'gif', 'tiff', 'tif'];
    let audios = ['mp3', 'm4a', 'flac', 'mp4', 'wav', 'mov'];
    format = file_path.split('.')[file_path.split('.').length - 1];
    if (pictures.includes(format) || audios.includes(format)) {
        let img = document.createElement('img');
        let but = document.getElementById('annex-button').style;
        fileName = file_path.split("\\")[file_path.split("\\").length - 1];
        item_id = uploaded_top / 18;

        if (pictures.includes(format)) {
            img.src = "src/data/photos/image-icon-96.png";
            // Add file
            uploaded_files.push(
                {
                    'type': 'picture',
                    "name": fileName,
                    'url': image_data
                }
            );
        } else {
            img.src = "src/data/photos/speaker-icon.png";
            // Add file
            uploaded_files.push(
                {
                    'type': 'sound',
                    "name": fileName,
                    'url': image_data
                }
            );
        }
        img.style = "position: absolute;width: 34px;height: 30px;left: 15%;top:" + (uploaded_top + 2) + "%;"
        img.id = item_id + '-img';
        annexes.appendChild(img);

        let name = document.createElement('label');
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
        remove.src = 'src/data/photos/remove.png';
        remove.title = 'Удалить';
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
            uploaded_files.splice(remove_id, 1);
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

function nextCreateTask() {
    let text = document.getElementById('task-text'),
        answer = document.getElementById('answer'),
        annexes = document.getElementById('annexes'),
        task_num = document.getElementById('task-number'),
        annex_but = document.getElementById('annex-button');

    if (text.value === "") {
        text.classList.add('error-input');
        return;
    } else {
        text.classList.remove('error-input');
    }

    if (answer.value === "") {
        answer.classList.add('error-input');
        return;
    } else {
       answer.classList.remove('error-input');
    }

    if (cur_task === 0){
        cur_task ++
    }

    let post = {
        'number': cur_task.toString(),
        'text': text.value,
        'annexes': uploaded_files,
        'answer': answer.value
    };

    let promise = fetch('/write_data/append_task', {
            body: JSON.stringify({
                "option": getCookie('option_number'),
                "data": post
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
        }).then(response => response.json());

    promise.then(
        error => {
            throw error;
        }
    );

    if (cur_task - 1 in tasks){
        tasks[cur_task - 1] = post;
        let table  = document.getElementById('created-tasks');
        while (table.rows.length > 1){
            table.deleteRow(1)
        }
        stopCreate();
        return;
    } else {
        tasks.push(post);
    }

    uploaded_files = [];
    uploaded_top = 0;
    annex_but.style.top = '26%';
    cur_task += 1;
    text.value = '';
    answer.value = '';
    annexes.textContent = '';
    task_num.textContent = task_num.textContent.match(/[а-яА-Я№ ]+/g)[0] + cur_task
}

function stopCreate() {
    let title = document.getElementById('result-title'),
        number_option = getCookie('option-number');

    if (!title.textContent.includes(number_option)) {
        title.textContent += number_option;
    }

    let create_task_window = document.getElementById('create-task'),
        preview_window = document.getElementById('preview-created-tasks');

    create_task_window.style.display = 'none';
    preview_window.style.display = 'block';

    let table = document.getElementById('created-tasks');
    for (let i = 0; i < tasks.length; i++) {
        let newRow = table.insertRow();
        let rawData = ['number', 'text', 'answer'];
        for (let j = 0; j < rawData.length; j++) {
            // Insert a cell in the row at index 0
            let newCell = newRow.insertCell(j);
            // Append a text node to the cell
            let newText = document.createTextNode(tasks[i][rawData[j]].slice(0, 12));
            newCell.appendChild(newText);
        }

        let newCell = newRow.insertCell(rawData.length);

        for (let j = 0; j < tasks[i]['annexes'].length; j++) {
            let img = document.createElement('img');
            if (tasks[i]['annexes'][j]["type"] === 'picture') {
                img.src = "src/data/photos/image-icon-96.png";
                img.style = "width: 32px; height: 35 px;";
            } else {
                img.src = "src/data/photos/speaker-icon.png";
                img.style = "width: 34px; height: 30 px;";
            }
            img.title = tasks[i]['annexes'][j]["name"];
            newCell.appendChild(img);
        }

        newCell = newRow.insertCell(rawData.length + 1);
        let button = document.createElement('button');
        button.textContent = 'Изменить';
        button.onclick = function (event) {
            create_task_window.style.display = 'block';
            preview_window.style.display = 'none';
            cur_task = parseInt(event.target.id) + 1;

            let text = document.getElementById('task-text'),
                answer = document.getElementById('answer'),
                annexes = document.getElementById('annexes'),
                task_num = document.getElementById('task-number'),
                cancel_but = document.getElementById('stop_create'),
                next_but = document.getElementById('next'),
                back_but = document.getElementById('back'),
                annex_but = document.getElementById('annex-button');
            text.value = tasks[cur_task - 1]['text'];
            answer.value = tasks[cur_task - 1]['answer'];
            cancel_but.hidden = true;
            back_but.hidden = true;
            next_but.textContent = 'Сохранить';

            uploaded_top = 0;
            annex_but.style.top = '26%';
            uploaded_files = [];
            annexes.textContent = '';
            for (let j = 0; j < tasks[cur_task - 1]['annexes'].length; j++) {
                appendFile(tasks[cur_task - 1]['annexes'][j]['name'], tasks[cur_task - 1]['annexes'][j]['url'])
            }
            task_num.textContent = task_num.textContent.replace(tasks.length + 1, cur_task)
        };
        button.style = "width: 150%; margin: 5% 0 5% 0;";
        button.id = i;
        newCell.appendChild(button);
    }
    /*let save = document.getElementById('save-all-tasks'),
        cancel = document.getElementById('cancel-save');
    save.style.top = "85%";
    cancel.style.top = "85%";*/
}


// Solve window
/*
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
*/

function nextSolveTask(){
    let answer = document.getElementById('answer'),
        preview_task = getCookie('preview_task'),
        number = document.getElementById('solve-task-number'),
        text = document.getElementById('solve-task-text');

    if (preview_task){
        info = JSON.parse(preview_task);
        cur_task = 0;
    }
    if (!checkMod && !preview_task){
        if (answer !== null && cur_task > 0){
            tasks[cur_task - 1]['user_answer'] = answer.value;
            answer.value = '';
        }
    } else {
        let back = document.getElementById('next');
        if (back.textContent === 'Далее') {
            back.textContent = 'Назад';
        } else {
            cur_task = tasks.length;
            back.textContent = 'Далее';
        }
    }

    if (cur_task < tasks.length) {
        if (!preview_task) {
            info = tasks[cur_task];
        }
    } else {
        cur_task = 0;
        if (!preview_task){
            document.getElementById('solve-tasks').hidden = true;
            document.getElementById('tasks-results').style.display = 'block';
            results();
        } else {
            window.history.back();
            // window.open('/create', '_self')
        }
    }

    if (!preview_task){
        number.textContent = 'Задание ' + info['number'] + '/' + tasks.length
    } else {
        number.textContent = "Предпросмотр задания";
    }

    text.textContent = info['text'];
    annexes(info['annexes']);
    cur_task++;
}

function annexes(files) {
    // get images an sounds
    var sounds = {};

    let annex = document.getElementById('annexes-solve');
    if (annex === null) {
        return
    }
    annex_top = 0;
    for (let i = 0; i < files.length; i++) {
        let img = document.createElement('img');
        let button = document.createElement('button');
        item_id = annex_top / 18;

        type = files[i]["type"];

        if (type === 'photos' || type === 'picture') {
            img.setAttribute("src", files[i]['url']);
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
            if (type === "sound") {
                img.src = 'src/data/photos/speaker-icon.png';
                button.textContent = 'Прослушать';
                sounds[item_id] = files[i]["url"];
                console.log(files[i]["url"]);
                button.onclick = function (event) {
                    sound_id = event.target.id;
                    var audio = new Audio(sounds[sound_id]);
                    audio.play();
                }
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
            nextSolveTask();
        };
        button.style = "width: 150%; margin: 5% 0 5% 0;";
        button.id = i;
        newCell.appendChild(button);
    }
    title.textContent += " - " + right_num / 2 + "/" + tasks.length;
}