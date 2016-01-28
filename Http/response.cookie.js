// 모듈을 추출
var http = require('http');

// 서버를 생성하고 실행
http.createServer(function(req, res) {
  // 변수를 선언
  var date = new Date();
  date.setDate(date.getDate() + 7);

  // 쿠키를 입력
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Set-Cookie': [
      'breakfast = toast;Expires = ' + date.toUTCString(),
      'dinner = chicken;Expires = ' + date.toUTCString()
    ]
  });

  // 쿠키 출력
  res.end('<h1>'+req.headers.cookie+'</h1>');
}).listen(52273, function() {
  console.log('Server running at http://localhost:52273');
});