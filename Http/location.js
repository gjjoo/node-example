// 모듈 추출
var http = require('http');

// Location 속성을 사용한 페이지 강제 이동
http.createServer(function(req, res) {
  res.writeHead(302, {
    'Location': 'http://github.com/gjjoo'
  });
  res.end();
}).listen(52273, function() {
  console.log('Server Running at http://localhost:52273');
});

// HTTP 404 웹 페이즈를 찾을 수 없습니다.
http.createServer(function(req, res) {
  res.writeHead(404);
  res.end();
}).listen(52274, function() {
  console.log('Server Running at http://localhost:52274');
});