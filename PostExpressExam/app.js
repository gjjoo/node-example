/**
 * 환경설정 & 모듈 호출
 */
var express      = require('express'),
    app          = express(),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser');

// 정적파일 처리
app.use('/static', express.static(__dirname + '/public'));

// 바디파서 사용(for parsing application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// 쿠키 분석 용 미들웨어
app.use(cookieParser());

// Jade 템플릿 사용
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
app.post('/', function(req, res) {
  console.log(req.body);
});

app.listen(3000);