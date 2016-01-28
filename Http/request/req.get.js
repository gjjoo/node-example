// 모듈 추출
var http = require('http'),
    url  = require('url');

// 모듈 사용
http.createServer(function(req, res) {
  // 요청 매게 변수 추출
  var query = url.parse(req.url, true).query;

  // GET 요청 매개 변수 출력
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end('<h1>'+JSON.stringify(query)+'</h1>');
}).listen(52273, function() {
  console.log('Server running at http://localhost:52273');
});