/**
 * --------------------------------------------------
 * 모듈 호출
 * --------------------------------------------------
 */
var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    cookieParser   = require('cookie-parser'),
    methodOverride = require('method-override'),
    mysql          = require('mysql'),
    MongoClient    = require('mongodb').MongoClient,
    ObjectID       = require('mongodb').ObjectID;

/**
 * --------------------------------------------------
 * 환경 설정
 * --------------------------------------------------
 */
// MySQL 연결
var connection = mysql.createConnection({
  host: 'localhost',
  port: '3307',
  user: 'root',
  password: '1111',
  database: 'moviest'
});
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// MongoDB 연결
var mongodb;
MongoClient.connect('mongodb://localhost:27017/moviest', function(err, db) {
  if (err) {
    console.log('err connecting: '+err);
    return;
  }

  console.log('mongodb connected');
  mongodb = db;
});

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


/**
 * --------------------------------------------------
 * 영화정보 CRUD
 * --------------------------------------------------
 */
// 메인 페이지 조회
app.get('/movies', function(req, res) {
  console.log('GET movies');

  var select = 'select movie_id, title, director, year from movie;';
  connection.query(select, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      res.render('movies', { title: 'Movies', movies: results });
    }
  });
});

// 추가 페이지 조회
app.get('/movies/add', function(req, res) {
  res.render('add', { title: 'Add Movie' });
});

// 수정 페이지 조회
app.get('/movies/update/:id', function(req, res) {
  var select = 'select * from movie where movie_id = ?';
  connection.query(select, [req.params.id], function(err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results);

      var movieObj = {};
      if (results.length > 0) {
        movieObj = {
          movie_id: results[0].movie_id,
          title: results[0].title,
          director: results[0].director,
          year: results[0].year,
          comments: [],
          synopsis: ''
        };
      }
      var movie = mongodb.collection('movie');
      movie.find({
        movie_id: Number(results[0].movie_id)
      }).toArray(function(err, docs) {
        console.log(docs);
        if (docs.length > 0) {
          movieObj.synopsis = docs[0].synopsis;
        }

        res.render('update', { title: 'Update Movie', movie: movieObj });
      });

    }
  });
});

// 영화정보 상세
app.get('/movies/:id', function(req, res) {
  var select = 'select * from movie where movie_id = ?';
  connection.query(select, [req.params.id], function(err, results) {
    if (err) {
      console.log(err);
    } else {
      var movieObj = {};
      if (results.length > 0) {
        movieObj = {
          movie_id: results[0].movie_id,
          title: results[0].title,
          director: results[0].director,
          year: results[0].year,
          comments: [],
          synopsis: ''
        };
      }
      var movie = mongodb.collection('movie');
      movie.find({
        movie_id: Number(results[0].movie_id)
      }).toArray(function(err, docs) {
        if (docs.length > 0) {
          movieObj.synopsis = docs[0].synopsis;
        }

        var comments = mongodb.collection('comments');
        comments.find({
          movie_id: Number(results[0].movie_id)
        }).toArray(function(err, docs) {

          for (var i=0; i<docs.length; i++) {
            movieObj.comments.push({
              _id: docs[i]._id,
              comment: docs[i].comment
            });
          }
          res.render('movie', { title: 'Movies Detail', movie: movieObj });
        });

      });

    }
  });
});

// 영화정보 추가
app.post('/movies/add', function(req, res) {
  var insert = 'insert into movie(title, director, year) values(?, ?, ?);';
  connection.query(insert,
    [req.body.title, req.body.director, Number(req.body.year)],
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);

        var movie = mongodb.collection('movie');
        movie.insert({
          movie_id: result.insertId,
          synopsis: req.body.synopsis
        }, function(err, results) {
          if (err) {
            console.log(err);
          } else {
            res.redirect(301, '/movies');
          }
        });

      }
    });
});

// 영화정보 수정
app.put('/movies/update', function(req, res) {
  var update = 'update movie set title=?, director=?, year=? where movie_id=? ';
  connection.query(update,
    [req.body.title, req.body.director, Number(req.body.year), Number(req.body.movie_id)],
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);

        var movie = mongodb.collection('movie');

        movie.update({
          movie_id: Number(req.body.movie_id)
        },{
          movie_id: Number(req.body.movie_id),
          synopsis: req.body.synopsis
        }, function(err, results) {

          if (err) {
            console.log(err);
          } else {
            res.redirect(301, '/movies/'+req.body.movie_id);
          }

        });

      }
    });
});

// 영화정보 삭제
app.delete('/movies/delete', function(req, res) {
  var deleteQuery = 'delete from movie where movie_id=?';
  connection.query(deleteQuery,
    [Number(req.body.movie_id)],
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);

        var movie = mongodb.collection('movie');
        movie.remove({
          movie_id: Number(req.body.movie_id)
        }, function(err, results) {
          if (err) {
            console.log(err);
          }
        });

        var comments = mongodb.collection('comments');
        comments.remove({
          movie_id: Number(req.body.movie_id)
        }, function(err, results) {
          if (err) {
            console.log(err);
          }
        });

        res.redirect(301, '/movies');

      }
    });
});

// 댓글 추가
app.post('/movies/comment', function(req, res) {
  var comments = mongodb.collection('comments');
  comments.insert({
    movie_id: Number(req.body.movie_id),
    comment: req.body.comment
  }, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/movies/'+req.body.movie_id);
    }
  });
});

// 댓글 삭제
app.delete('/movies/comment', function(req, res) {
  var comments = mongodb.collection('comments');

  // ObjectId.createFromHexString(req.body._id) 도 가능하다.
  comments.remove({
    movie_id: Number(req.body.movie_id),
    _id: new ObjectID(req.body._id)
  }, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/movies/'+req.body.movie_id);
    }
  });
});


app.listen(3000);