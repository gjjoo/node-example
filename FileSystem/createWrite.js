var fs = require('fs');

// 아웃풋 스트림
var outStream = fs.createWriteStream('./Resources/output.txt');

outStream.once('open', function(fd) {
  outStream.write("My first row!!!\n");
  outStream.write("My second row!!!\n");
  outStream.end();
});
