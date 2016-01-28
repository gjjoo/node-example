
/**
 * 변수 선언
 */
var http = require('http'),
    fs = require('fs'),
    querystring = require('querystring');

var list = [];
var server = http.createServer(function(req, res) {

  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

  if (req.url === '/' && req.method === 'GET') {
    var str = '<html><body><h2>새 영화 입력</h2><form action="/upload" method="post"><input type="text" name="title" placeholder="영화 제목"><input type="text" name="director" placeholder="감독"><input type="submit" value="Upload"></form></body></html>';
    res.write(str);
  } else if (req.url === '/upload' && req.method === 'POST') {

    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var query = querystring.parse(body);
      list.push({title:query.title, director:query.director});

      var str = '<html>';
      str += '<h1>Favorite Movie</h1>'
      str += '<ul>'
      for (var i=0; i<list.length; i++) {
        str += '<li>'+list[i].title+'('+list[i].director+')'+'</li>';
      }
      str += '</ul>'
      str += '<h2>새 영화 입력</h2><form action="/upload" method="post"><input type="text" name="title" placeholder="영화 제목"><input type="text" name="director" placeholder="감독"><input type="submit" value="Upload"></form>';
      res.write(str);
    });

  }
});
server.listen(3000);