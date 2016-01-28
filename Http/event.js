/**
 * request       : 클라이언트가 요청할 떄 발생하는 이벤트
 * connection    : 클라이언트가 접속할 때 발생하는 이벤트
 * close         : 서버가 종료될 때 발생하는 이벤트
 * checkContinue : 클라이언트가 지속적인 연결을 하고 있을 때 발생하는 이벤트
 * upgrade       : 클라이언트가 HTTP 업그레이드를 요청할 때 발생하는 이벤트
 * chientError   : 클라이언트에서 오류가 발생할 때 발생하는 이벤트
 */
// 모듈 추출
var http = require('http');

// Server 객체 생성
var server = http.createServer();

// Server 객체에 이벤트 연결
server.on('request', function() {
  console.log('Request On');
});

server.on('connection', function() {
  console.log('Connection On');
});

server.on('close', function() {
  console.log('Close On');
});

// listen() 메서드 실행
server.listen(3000);