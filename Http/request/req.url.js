/**
 * request 객체
 * method       클라이언트 요청 방식을 나타냅니다.
 * url          클라이언트가 요청한 URL을 나타냅니다.
 * headers      요청 메시지 헤더를 나타냅니다.
 * trailers     요청 메시지 트레일러를 나타냅니다.
 * httpVersion  HTTP 프로토콜 버전을 나타냅니다.
 */
// 모듈 추출
var http = require('http'),
    fs   = require('fs'),
    url  = require('url');

// 서버를 생성 및 실행
http.createServer(function(req, res) {
  // 변수 선언
  var pathname = url.parse(req.url).pathname;

  // 페이지를 구분
  if (pathname === '/') {
    // index.html 파일 읽기
    fs.readFile('index.html', function(err, data) {
      // 응답
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(data);
    });
  } else if (pathname === '/otherPage') {
    // otherPage.html 파일 읽기
    fs.readFile('otherPage.html', function(err, data) {
      // 응답
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(data);
    });
  }
}).listen(52273, function() {
  console.log('Server running at http://localhost:52273');
});