// 모듈 추출
var http = require('http'),
    fs   = require('fs'),
    url  = require('url');

// 모듈 사용
http.createServer(function(req, res) {

  var method = req.method.toLowerCase();
  if (method === 'get') {
    fs.readFile('htmlPage.html', function(err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (method === 'post') {
    req.on('data', function(data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>' + data + '</h1>');
    });
  }

}).listen(52273, function() {
  console.log('Server running at http://localhost:52273');
});