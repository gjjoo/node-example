// 모듈 추출
var fs = require('fs'),
    http = require('http');

// 웹 서버를 생성하고 실행
http.createServer(function(req, res) {
  // HTML 파일을 읽습니다.
  fs.readFile('HTMLPage.html', function(err, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(data);
  });
}).listen(3000, function() {
  console.log('Server running at http://localhost:3000');
});