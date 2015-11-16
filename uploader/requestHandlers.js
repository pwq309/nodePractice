//请求处理器

//引入了一个新的Node.js模块，querystring。处理字符串, fs文件上传
var querystring = require("querystring"),
    fs = require("fs"),
    util = require('util'),
    formidable = require('formidable');  //处理图片上传的组件

function start(response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="file" name="upload">'+
        '<button>Upload file</button>'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    console.log('about to parse');
    form.parse(request, function(error, fields, files) {
        console.log('parsing done');
        console.log(files.upload.path + '-------------');
        //给文件重命名
        //若是windows 环境没权限，用以下代码替代注释了的renameSync函数。
        var readStream = fs.createReadStream(files.upload.path)
        var writeStream = fs.createWriteStream("./tmp/test.png");

        util.pump(readStream, writeStream, function() {
            fs.unlinkSync(files.upload.path);
        });
        //fs.renameSync(files.upload.path, './tmp/test.png');

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write('received image: <br/>');
        response.write('<img src="/show" />');
        response.end();
    });
}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile('./tmp/test.png', 'binary', function(error, file) {
        if (error) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write(error + '\n');
            response.end();
        } else {
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.write(file, 'binary');
            response.end();
        }
    })
}

exports.start = start;
exports.upload = upload;
exports.show = show;