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

// Movie
// ---------------------------------
var movieList = ['아바타','스타워즈','인터스텔라'];
var movieDetail = {
  '아바타': {
    'director': '제임스 카메론'
  },
  '스타워즈': {
    'director': '조지 루카스'
  },
  '인터스텔라': {
    'director': '크리스토퍼 놀란'
  }
};

// 조회
// ------------------------------
app.get('/movies', function(req, res) {
  console.log('GET movies');

  res.render('index', { list: movieList });
  // res.json(movieList);
});
app.get('/movies/:title', function(req, res) {
  console.log('GET movies/title');

  var title = req.params.title;
  var item = movieDetail[title];
  if (item) {
    res.json(item);
  } else {
    res.send(404, 'Wrong movie name');
  }
});

// 추가
// ------------------------------
app.post('/movies', function(req, res) {
  console.log('POST movies');

  var parsed = req.body;
  movieList.push(parsed.title);
  movieDetail[parsed.title] = {
    director: parsed.director
  };

  res.redirect(302, '/movies');
});

// 수정
// ------------------------------
app.put('/movies', function(req, res) {
  console.log('PUT movies');

  var obj = JSON.parse(req.body.movies);
  movieList = [];
  movieDetail = {};
  for (var i=0; i<obj.length; i++) {
    movieList.push(obj[i].title);
    movieDetail[obj[i].title] = {
      director: obj[i].director
    };
  }

  res.redirect('home');
  // res.send({movieList: movieList, movieDetail: movieDetail});
});
app.put('/movies/:title', function(req, res) {
  console.log('PUT movies/title');

  var itemName = req.params.title;
  if (!movieDetail[itemName]) {
    movieList.push(itemName);
  }
  movieDetail[itemName] = { director: req.body.director };

  res.send({movieList: movieList, movieDetail: movieDetail});
});

// 삭제
// ------------------------------
app.delete('/movies', function(req, res) {
  console.log('DELTE movies');

  movieList = [];
  movieDetail = {};

  res.send({movieList: movieList, movieDetail: movieDetail});
});
app.delete('/movies/:title', function(req, res) {
  console.log('DELTE movies/title');

  var itemName = req.params.title;
  var index = movieList.indexOf(itemName);
  if (index != -1) {
    movieList.splice(index, 1);
  }
  delete movieDetail[itemName];

  res.send({movieList: movieList, movieDetail: movieDetail});
});

app.listen(3000);