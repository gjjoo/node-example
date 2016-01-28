/**
 * 환경설정 & 모듈 호출
 */
var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    cookieParser   = require('cookie-parser'),
    methodOverride = require('method-override');


// 정적파일 처리
app.use('/static', express.static(__dirname + '/public'));

// 바디파서 사용(for parsing application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// 쿠키 분석 용 미들웨어
app.use(cookieParser());

// Jade 템플릿 사용
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// 메서드 오버라이드
app.use(methodOverride('_method'));

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

  res.render('movies', { title: 'Movie List', list: movieList });
});
app.get('/movies/:title', function(req, res) {
  console.log('GET movies/title');

  var title = req.params.title;
  var item = movieDetail[title];
  if (item) {
    res.render('movie', {
      title: title,
      director: item.director,
      actor: item.actor||''
    });
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
    director: parsed.director,
    actor: parsed.actor
  };

  res.redirect(301, '/movies');
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
      director: obj[i].director,
      actor: obj[i].actor
    };
  }

  // res.send({movieList: movieList, movieDetail: movieDetail});
  res.redirect(301, '/movies');
});

app.put('/movies/:title', function(req, res) {
  console.log('PUT movies/title');

  var itemName = req.params.title;
  if (!movieDetail[itemName]) {
    movieList.push(itemName);
  }
  movieDetail[itemName] = {
    director: req.body.director,
    actor: req.body.actor
  };

  // res.send({movieList: movieList, movieDetail: movieDetail});
  res.redirect(301, '/movies');
});

// 삭제
// ------------------------------
app.delete('/movies', function(req, res) {
  console.log('DELTE movies');

  movieList = [];
  movieDetail = {};

  // res.send({movieList: movieList, movieDetail: movieDetail});
  res.redirect(301, '/movies');
});
app.delete('/movies/:title', function(req, res) {
  console.log('DELTE movies/title');

  var itemName = req.params.title;
  var index = movieList.indexOf(itemName);
  if (index != -1) {
    movieList.splice(index, 1);
  }
  delete movieDetail[itemName];

  // res.send({movieList: movieList, movieDetail: movieDetail});
  res.redirect(301, '/movies');
});

app.listen(3000);