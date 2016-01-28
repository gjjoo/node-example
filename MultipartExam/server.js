
var http = require('http'),
    formidable = require('formidable'),
    fs = require('fs');

var list = [];
var server = http.createServer(function(req, res) {
  console.log(req.url);

  if (req.url === '/' && req.method === 'GET') {

    var str = '<html><body><h1>Favorite Paint</h1><ul>';
    for (var i=0; i<list.length; i++) {
      str += '<li><img src="'+list[i].file+'" width="100" height="100">'+list[i].title+'</li>'
    }
    str += '</ul>';
    str += '<form action="/upload" method="POST" enctype="multipart/form-data">';
    str += '작품 이름: <input type="text" name="title"><br>';
    str += '<input type="file" name="file" multiple="multiple"><br>';
    str += '<input type="submit" value="upload">';
    str += '</form>';

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(str);

  } else if (req.url === '/upload' && req.method === 'POST') {

    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.keepExtension = true;
    form.uploadDir = './upload';
    form.parse(req, function(err, fileds, files) {
      console.log('---------- fileds ----------');
      console.log(fileds);
      console.log('---------- files ----------');
      console.log(files);

      list.push({'title':fileds.title, 'file':files.file.path});

      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    });

  } else {

    var path = __dirname + req.url;
    fs.exists(path, function(exist) {
      if (exist) {
        res.writeHead(200, {'Content-Type': 'image/*'});
        fs.createReadStream(path).pipe(res);
      }
    });
  }

});
server.listen(3000);