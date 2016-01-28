
// 서버 생성
// ---------------------------------
var http = require('http');
var server = http.createServer(function(req, res) {
  var method = req.method.toLowerCase();
  console.log(method);
  if (method === 'get') { // 조회
    handleGetRequest(req, res);
  } else if (method === 'post') { // 추가
    handlePostRequest(req, res);
  } else if (method === 'put') { // 수정
    handlePutRequest(req, res);
  } else if (method === 'delete') { // 삭제
    handleDeleteRequest(req, res);
  } else {
    res.statusCode = 404;
    res.end('Wrong method');
  }
});
server.listen(3000);

// 샘플 데이터 생성
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
var urlencode = require('urlencode');
function handleGetRequest(req, res) {
  var url = req.url;
  if (url === '/movies') {
    console.log(movieList);
    res.writeHead(200, {'Content-Type': 'application/json;  charset=utf-8'});
    res.end(JSON.stringify(movieList));
  } else {
    var itemName = url.split('/')[2];
    itemName = urlencode.decode(itemName);
    var item = movieDetail[itemName];
    if (item) {
      res.writeHead(200, {'Content-Type': 'application/json;  charset=utf-8'});
      res.end(JSON.stringify(item));
    } else {
      res.statusCode = 404;
      res.end('Wrong movie name');
    }
  }
}

// 추가
// ------------------------------
var querystring = require('querystring');
function handlePostRequest(req, res) {
  var url = req.url;
  if (url === '/movies') {
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      // 쿼리스트링 값을 JSON으로 바꾼 후 리스트와 상세정보에 넣는다
      var parsed = querystring.parse(body);
      movieList.push(parsed.title);
      movieDetail[parsed.title] = {
        director: parsed.director
      };

      res.statusCode = 302;
      res.setHeader('Location', '/movies');
      res.end();
    });
  }
}

// 수정
// ------------------------------
function handlePutRequest(req, res) {
   var url = req.url;
   if (url === '/movies') {
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var parsed = querystring.parse(body);
      var obj = JSON.parse(parsed.movies);

      // 데이터를 모두 지운 후,
      // [{"title": "마션", "director": "주근깨"}, {"title": "인터스텔라", "director": "쭈"}]
      // 가져온 JSON 데이터로 수정한다.
      movieList = [];
      movieDetail = {};
      for (var i=0; i<obj.length; i++) {
        movieList.push(obj[i].title);
        movieDetail[obj[i].title] = {
          director: obj[i].director
        };
      }

      res.writeHead(200, {'Content-Type': 'application/json;  charset=utf-8'});
      res.end(JSON.stringify({movieList: movieList, movieDetail: movieDetail}));
    })
  } else {
    // url을 자른 후
    var itemName = url.split('/')[2];
    itemName = urlencode.decode(itemName);

    var body = '';
    var parsed = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      // 위에서 가져온 데이터를 JSON 데이터로 가공 후,
      // url에서 가져온 영화이름의 감독 키값에 값을 변경
      parsed = querystring.parse(body);
      if (!movieDetail[itemName]) {
        movieList.push(itemName);
      }
      movieDetail[itemName] = { director: parsed.director };

      res.writeHead(200, {'Content-Type': 'application/json;  charset=utf-8'});
      res.end(JSON.stringify({movieList: movieList, movieDetail: movieDetail}));
    });
  }
}

// 삭제
// ------------------------------
function handleDeleteRequest(req, res) {
  var url = req.url;
  console.log(url);
  if (url === '/movies') {
    movieList = [];
    movieDetial = {};
    res.writeHead(200, {'Content-Type': 'application/json;  charset=utf-8'});
    res.end(JSON.stringify(movieList));
  } else {
    // "movies/아바타"에서 영화제목 URL 값을 추출
    var itemName = url.split('/')[2];
    itemName = urlencode.decode(itemName);
    var item = movieDetail[itemName];

    if (item) {
      // 영화제목을 찾아서 배열에서 삭제
      var index = movieList.indexOf(itemName);
      if (index != -1) {
        movieList.splice(index, 1);
      }

      // 해당 영화제목을 상세정보에서 삭제
      delete movieDetail[itemName];

      res.writeHead(200, {'Content-Type': 'application/json;  charset=utf-8'});
      res.end(JSON.stringify({movieList: movieList, movieDetail: movieDetail}));
    } else {
      res.statusCode = 404;
      res.end('Wrong movie name');
    }
  }
}