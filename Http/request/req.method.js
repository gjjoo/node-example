// 모듈 추출
var http = require('http'),
    fs   = require('fs'),
    url  = require('url');

// 서버를 생성 및 실행
http.createServer(function(req, res) {
  var method = req.method.toLowerCase();
  if (method === 'get') {
    console.log('get');
  } else if (method === 'post') {
    console.log('post');
  }
}).listen(52273, function() {
  console.log('Server running at http://localhost:52273');
});