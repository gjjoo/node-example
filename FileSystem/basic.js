/**
 * ---------------------------------------------
 * File System (https://nodejs.org/api/fs.html)
 * ---------------------------------------------
 */
// 모듈 추출
var fs = require('fs');

// 모듈 사용
// 파일 읽기(동기)
var file1 = './Resources/textfile.txt';
try {
  // 파일 유무 검사 후 읽기
  var stats = fs.statSync(file1);
  if (stats.isFile()) {
    var text = fs.readFileSync(file1, 'utf8');
    console.log('- readFIleSync:', text);
  }

} catch (e) {
  console.log(e);
}

// 파일 읽기(비동기)
fs.stat(file1, function(err, stats) {
  if (err) {
    console.log(err);
  }

  if (stats.isFile()) {
    fs.readFile(file1, 'utf8', function(err, data) {
      if (err) {
        console.log(err);
      }
      console.log('- readFile:', data);
    });
  }
});


var data = 'Hello Nodejs!';

// 파일 쓰기(비동기)
var file2 = './Resources/writeFile.txt';
fs.writeFile(file2, data, 'utf8', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('- writeFile:', 'Write file async complete!');
  }
});

// 파일 쓰기(동기)
var file3 = './Resources/writeFileSync.txt';
try {
  fs.writeFileSync(file3, data, 'utf8');
  console.log('- writeFileSync:', 'Write file sync complete!');
} catch (e) {
  console.log(e);
}

/*
// 디렉토리 내 내용 읽기
fs.readdir(path, caalback)
fs.readdirSync(path)

// 디렉토리 생성/삭제
fs.mkdir(path[, mode], callback)
fs.mkdirSync(path[, mode])
fs.rmdir(path, callback)
fs.rmdirSync(path)

// 파일 삭제
fs.unlink(path, callback)
fs.unlinkSync(path)
 */