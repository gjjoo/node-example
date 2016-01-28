
/**
 * url
 */
var url = require('url');
var urlStr = 'http://idols.com/q?group=EXID&name=하니&since=';
var parsed = url.parse(urlStr, true);
console.log(parsed)

/**
 * querystring
 */
var querystring = require('querystring');
var str = parsed.search;
var parsed2 = querystring.parse(str);
console.log(parsed2);

var str2 = 'group=걸스데이&member=혜리&member=유라&member=민아';
var parsed3 = querystring.parse(str2);
console.log(parsed3);
var members = parsed3.member;
for (var i=0; i<members.length; i++) {
  console.log(members[i]);
}


var path = './images/iu.jpg';
var fs = require('fs');
fs = require('fs');


var http = require('http');
var server = http.createServer(function(req, res) {

  /*
  console.log('version:' + req.httpVersion);
  console.log('method:' + req.method);
  console.log('url:' + req.url);
  console.log('----------headers----------');
  console.log(req.headers);
  */
  if (req.url === '/image') {
    fs.readFile(path, function(err, data) {
      if (err) {
        res.statusCode = 404;
        res.end('Can not find Resource');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/jpg');
        res.end(data);
      }
    });
  } else if (req.url === '/google') {
    res.writeHead(302, {'Location': 'http://google.com'})    ;
    res.end();
  } else {
    var body = '<html>';
    body += '<body>';
    body += '<h1>Hello Node.js</h1>';
    body += '</body>';
    body += '</html>';
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('content-Length', body.length);
    res.write(body);
    res.end();
  }

  /*
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Content-Length': body.length
  });
  */

});
server.listen(3000);