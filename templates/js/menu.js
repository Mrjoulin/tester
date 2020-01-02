function change_window(new_window) {
    create = document.getElementById('create').style;
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

function create() {
}

function show_popup() {
    document.getElementById("popup").style.display = "block";
}

function hide_popup() {
    document.getElementById("popup").style.display = "none";
}

var uploaded_top = 0;

function upload_file() {
    let file_path = document.getElementById('pc-file').value;
    let annexes = document.getElementById('annexes');
    let pictures = ['jpeg', 'jpg', 'png', 'gif', 'tiff', 'tif', 'mp4', 'mov'];
    let audios = ['mp3', ''];
    if (pictures.includes(file_path.split('.')[file_path.split('.').length - 1])) {
        let img = document.createElement('img');
        let but = document.getElementById('annex-button').style;
        item_id = uploaded_top / 18;

        img.src = "../photos/image-icon-96.png";
        img.style = "position: absolute;width: 34px;height: 30px;left: 15%;top:" + (uploaded_top + 2) + "%;"
        img.id = item_id + '-img';
        annexes.appendChild(img);

        let name = document.createElement('label');
        name.textContent = file_path.split("\\")[file_path.split("\\").length - 1];
        name.style = "position: absolute;width: 58%;height: 14%;left: 26%;top: " + uploaded_top + "%;" +
            "background: rgba(78, 143, 139, 0.47);border-radius: 20px;";
        name.id = item_id + '-name';
        annexes.appendChild(name);

        let remove = document.createElement('img');
        remove.src = '../photos/remove.png';
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
        remove.style = "position: absolute;width: 34px;height: 34px;left: 86%;top:" + (uploaded_top + 1) + "%;cursor:pointer;"
        annexes.appendChild(remove);
        uploaded_top += 18;
        if (but.top === "") {
            but.top = (24 + uploaded_top) + '%';
        } else {
            but.top = (parseInt(but.top) + 14) + '%';
        }
    }
}

function find_option(){
    let text = document.getElementById('option').value;
    /* Search in DB*/
    let info = document.getElementById('option-info');
    if (text === '12345678') {
        info.textContent = 'Учитель: Таковата Такая Такововна\nТема: Строение многоклеточных организмов\nПримечания: сложный тест, вам п***ц, если решите хотя бы 5 заданий\nпоставлю,так и быть, 5.'
        /* ограничение по символам 325 */
    } else {
        info.textContent = ''
    }
}
