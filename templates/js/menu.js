function change_window(new_window) {
    create = document.getElementById('create').style
    create_button = document.getElementById('create-window-button').style
    solve = document.getElementById('solve').style
    solve_button = document.getElementById('solve-window-button').style
    personal_area = document.getElementById('personal-area').style
    personal_area_button = document.getElementById('personal-area-window-button').style

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
    subject = document.getElementById('other-subject');
    if (document.getElementById('subject').value == 'other') {
        subject.style.display = 'block';
    } else {
        subject.style.display = 'none';
    }
}

function create() {
}


function find_option(){
    text = document.getElementById('option').value
    /* Search in DB*/
    info = document.getElementById('option-info')
    if (text === '12345678') {
        info.textContent = 'Учитель: Таковата Такая Такововна\nТема: Строение многоклеточных организмов\nПримечания: сложный тест, вам п***ц, если решите хотя бы 5 заданий\nпоставлю,так и быть, 5.'
        /* ограничение по символам 325 */
    } else {
        info.textContent = ''
    }
}
