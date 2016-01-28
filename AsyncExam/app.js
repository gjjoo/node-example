
var fs = require('fs');

// function readFile(callback) {
//   console.log('readFile Started!');
//   var content = fs.readFile('READEME.md', 'utf8', function(err, data) {
//     console.log('readed!');
//     callback(data);
//   });
// }

// function writeFile(data) {
//   console.log('writeFile Started!');
//   fs.writeFile('HELLO.md', data, 'utf8', function(err) {
//     console.log('writed!');
//   });
// }

// readFile(function(data) {
//   writeFile(data);
// });

var text = '';
var checkFileFunc = function(callback) {
  fs.stat('./READEME.md', function(err, stats) {
    if (err) {
      callback(err);
    } else {
      callback(null, 'Check Done');
    }
  });
};

var readFileFunc = function(callback) {
  console.log('Starting readFile');
  fs.readFile('./READEME.md', 'utf8', function(err, data) {
    text = data;
    callback(null, 'Read Done');
  });
};

var writeFileFunc = function(callback) {
  console.log('Starting writeFile');
  fs.writeFile('./HELLO.md', text, function(err) {
    callback(null, 'Write Done');
  });
};


var async = require('async');
async.series([checkFileFunc, readFileFunc, writeFileFunc], function(err, results) {
  if (err) {
    console.log(err);
  } else {
    console.log(results);
  }
});