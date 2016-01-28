// 모듈 추출
var http = require('http');

// 모듈 사용
http.createServer(function(req, res) {
  // 쿠키를 추출하고 분해합니다.
  var cookie = req.headers.cookie;
  cookie = cookie.split(';').map(function(el) {
    var el = el.split('=');
    return {
      key: el[0],
      value: el[1]
    };
  });

  // 쿠키 생성
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Set-Cookie': ['name = gjjoo', 'region = seoul']
  });

  // GET 요청
  res.end('<h1>' + JSON.stringify(cookie) + '</h1>');

}).listen(52273, function() {
  console.log('Server Running at http://localhost:52273');
});