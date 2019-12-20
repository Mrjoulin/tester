
var name_person, email, pass, text, code;

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
    }
}