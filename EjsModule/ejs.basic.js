// 모듈 추출
var http = require('http'),
    fs   = require('fs'),
    ejs = require('ejs');

// 서버를 생성하고 실행
http.createServer(function(req, res) {
  // EJSPage.ejs 파일을 읽습니다.
  fs.readFile('EJSPage.ejs', 'utf8', function(err, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(ejs.render(data, {
      name: 'gjjoo',
      description: 'Hello EJS With Node.js!'
    }));
  });
}).listen(52273, function() {
  console.log('Server running at http://localhost:52273');
});
