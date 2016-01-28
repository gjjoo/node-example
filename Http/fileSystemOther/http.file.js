// 모듈 추출
var fs = require('fs'),
    http = require('http');

// 52273 포트에 서버를 생성하고 실행
http.createServer(function(req, res) {
  // 이미지 파일 읽기
  fs.readFile('iu.jpg', function(err, data) {
    res.writeHead(200, {
      'Content-Type': 'image/jpeg'
    });
    res.end(data);
  });
}).listen(52273, function() {
  console.log('Server runngin at http://localhost:52273');
});

// 52274 포트에 서버를 생성하고 실행
http.createServer(function(req, res) {
  // 음악 파일 읽기
  fs.readFile('We The Kings -Say You Like Me.mp3', function(err, data) {
    res.writeHead(200, {
      'Content-Type': 'audio/mp3'
    });
    res.end(data);
  });
}).listen(52274, function() {
  console.log('Server runngin at http://localhost:52274');
});