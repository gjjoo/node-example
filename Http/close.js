// 서버 생성
var server = require('http').createServer();

// 서버 실행
server.listen(3000, function() {
  console.log('Server Running at http://localhost:3000');
});

// 2초 후 함수를 실행
setInterval(function() {
  // 서버 종료
  server.close(function() {
    console.log('End Server');
  });

}, 2000);