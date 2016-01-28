// 모듈 추출
var http = require('http'),
    fs   = require('fs'),
    jade = require('jade');

http.createServer(function(req, res) {
  // JadePage.jade 파일을 읽습니다.
  fs.readFile('JadePage.jade', 'utf8', function(err, data) {
    // Jade 모듈을 사용
    var fn = jade.compile(data);

    // 출력
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(fn({
      name: 'gjjo',
      description: 'Hello Jade With Node.js!'
    }));
  });
}).listen(52273, function() {
  console.log('Server running at http://localhost:52273');
});