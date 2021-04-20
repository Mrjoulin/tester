const express = require('express'),
    app = new express(),
    port = 8080;
    fs = require("fs"),
    path = require("path"),
    bodyParser = require("body-parser");

app.use( bodyParser.json({limit: '50mb', extended: true}) );       // to support JSON-encoded bodies

app.get('/', function(request, response){
    console.log('GET request from ' + request.ip.toString().split(':')[3]);
    let path_to_file = path.join(__dirname, 'index.html');
    console.log('Get on '+ request.url + '; Go to ' + path_to_file);
    response.sendFile(path_to_file);
});

app.get('/login', function(request, response){
    console.log('GET request from ' + request.ip.toString().split(':')[3]);
    let path_to_file = path.join(__dirname, 'src/templates/login.html');
    console.log('Get on '+ request.url + '; Go to ' + path_to_file);
    response.sendFile(path_to_file);
});

app.get('/signup', function(request, response){
    console.log('GET request from ' + request.ip.toString().split(':')[3]);
    let path_to_file = path.join(__dirname, 'src/templates/signup.html');
    console.log('Get on '+ request.url + '; Go to ' + path_to_file);
    response.sendFile(path_to_file);
});

app.get('/menu', function(request, response){
    console.log('GET request from ' + request.ip.toString().split(':')[3]);
    let path_to_file = path.join(__dirname, 'src/templates/menu.html');
    console.log('Get on '+ request.url + '; Go to ' + path_to_file);
    response.sendFile(path_to_file);
});

app.get('/solve', function(request, response){
    console.log('GET request from ' + request.ip.toString().split(':')[3]);
    let path_to_file = path.join(__dirname, 'src/templates/solve.html');
    console.log('Get on '+ request.url + '; Go to ' + path_to_file);
    response.sendFile(path_to_file);
});

app.get('/create', function(request, response){
    console.log('GET request from ' + request.ip.toString().split(':')[3]);
    let path_to_file = path.join(__dirname, 'src/templates/create.html');
    console.log('Get on '+ request.url + '; Go to ' + path_to_file);
    response.sendFile(path_to_file);
});

app.get(/src/, function(request, response){
    let path_to_file = path.join(__dirname, request.url);
    try {
        if (fs.existsSync(path_to_file)) {
            response.sendFile(path_to_file);
        } else {
            response.send('<h1 style="text-align: center;">Cannot find file <i>' + path_to_file +  '</i> :(</h1>')
        }
    }catch (e) {
        console.log(e);
    }
});


app.post(/write_data/, function (request, response) {
    const data_type = request.url.split('/')[2],
        data_path = "src/data/",
        info_directory = "info/",
        images_directory = "pictures/";

    console.log('Get post on ' + data_type);

    if (data_type === 'start_create_option'){
        let number, file_name = '';
        while (file_name === ''){
            number = Math.floor(Math.random() * 1000000).toString();
            while (number.length < 6) number = "0" + number;
            file_name = data_path + info_directory + 'option_' + number + '.json';
            try {
                if (fs.existsSync(file_name)) {
                    file_name = '';
                }
            }catch (e) {
                console.log(e);
            }
        }

        data = {
            'teacher': null,
            'subject': request.body.subject,
            'theme': request.body.theme,
            'comment': request.body.comment,
            'tasks': []
        };
        fs.writeFileSync(file_name, JSON.stringify(data));
        console.log("Option № " + number + " created.");
        response.send(number);

        return "OK";
    }
    if (data_type === 'append_task'){
        file_name = data_path + info_directory + 'option_'+ request.body.option + '.json';
        let content = JSON.parse(fs.readFileSync(file_name, 'utf8'));
        task_number = request.body.data.number;
        in_tasks = false;
        for (let i = 0; i < content["tasks"].length; i++) {
            if (content["tasks"][i]["number"] === task_number) {
                in_tasks = true;
                content["tasks"][i] = request.body.data;
                break;
            }
        }
        if (!in_tasks) {
            content["tasks"].push(request.body.data);
        }

        fs.writeFileSync(file_name, JSON.stringify(content));
        console.log('Task written');

        return "OK";
    }

    if (data_type === 'save_file'){
        base64Data = request.body.data.split(',')[1];
        typeFile = request.body.data.split('/')[1].split(';')[0];
        file_name = data_path + images_directory + "file_" + Math.round(Math.random() * 1000000) + "." + typeFile;

        fs.writeFileSync(file_name, base64Data, "base64");
        response.send(
            {
                "file_name": file_name
            });

        return "OK"
    }

});

app.post(/get_data/, function (request, response) {
    data_type = request.url.split('/')[2];
    local_path = "src/data/info/";
    console.log('Get post on ' + data_type);
});

console.log('Start app on 0.0.0.0:' + port);
app.listen(port);
