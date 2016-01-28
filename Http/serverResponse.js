/**
 * response.writeHead(statusCode[, statusMessage][, headers]) : 응답 헤더를 작성합니다.
 * response.end([data][, encoding][, callback])               : 응답 본문을 작성합니다.
 */

// 웹 서버를 생성하고 실행합니다.
require('http').createServer(function(req, res) {
  // 응답합니다.
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end('<h1>Hello Node!</h1>');
}).listen(3000, function() {
  console.log('Server Running~');
});