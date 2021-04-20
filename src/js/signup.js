var need_code;

function send_need_code() {
    need_code = Math.floor(Math.random()* 9000) + 1000;
    /* send email */
}

function next(){
    console.log("I'm here");
    name_person = document.getElementById('name');
    email = document.getElementById('email');
    pass = document.getElementById('password');
    text = document.getElementById('email-text');
    code = document.getElementById('code');
    if (code.style.display === '') {
        console.log(name_person.value);
        console.log(email.value);
        email.style = 'display: none';
        name_person.style = 'display: none';
        pass.style = 'display: none';
        text.textContent += email.value;
        text.style = 'display: block';
        code.style = 'display: block';
        /* Sending email and check num of emails what was send in that email */
        send_need_code();
        console.log(need_code);
    } else {
        if (parseInt(code.value, 10) === need_code) {
            console.log(true)
            document.location.href = "./menu.html";
        } else {
            error_code = document.getElementById('error-code');
            error_code.style = 'display: block';
        }
    }
}