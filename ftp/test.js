//github地址：https://github.com/mscdex/node-ftp
// ftp 文件上传助手
var conf = {
    'host': 'test.com',
    'user': 'tongta',
    'password': 'tongta'
};

var Client = require('ftp');
var c = new Client();

var filePath = '/upload_ffc5d2643e8997144aa079eebefa3622_740x390.jpg';
var uploadFileName = 'upload_ffc5d2643e8997144aa079eebefa3622_740x390.jpg';
var uploadDir = 'party/default/';

c.on('ready', function () {
    c.put(filePath, uploadDir + uploadFileName, function (err) {
        if (err) throw err;
        c.end();
    });
});

c.connect(conf);

c.on('error', function (err) {
    console.log(err);
    c.end();
});
