/**
 * HTTP(https://nodejs.org/api/http.html)
 * Server 객체의 메서드
 * server.listen(port[, hostname][, backlog][, callback]) : 서버를 실행합니다.
 * server.close([callback])                               : 서버를 종료합니다.
 */

// 모듈을 추출
var http = require('http');

// 웹 서버를 생성
var server = http.createServer();

// 웹 서버를 실행
server.listen(3000);