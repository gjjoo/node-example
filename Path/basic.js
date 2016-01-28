
var pathUtil = require('path');

// 경로 다듬기
console.log('\u001b[33m', '========== 경로다듬기 ==========', '\u001b[0m');

var normalizePath = pathUtil.normalize('/user/tmp/../local///bin/');
console.log('- normalize: ', normalizePath);

var pathStr = '/foo/bar/baz/asdf/index.html';
console.log('- dirname: ', pathUtil.dirname(pathStr));
console.log('- basename: ', pathUtil.basename(pathStr));
console.log('- extname: ', pathUtil.extname(pathStr));

// Parse
console.log('\u001b[33m', '========== Parse ==========', '\u001b[0m');

var parsed = pathUtil.parse(__filename);
console.log('- parsed: ', parsed);
console.log('- parsed.name: ', parsed.name);
console.log('- parsed.ext: ', parsed.ext);

// 경로 덧붙이기
console.log('\u001b[33m', '========== 경로 덧붙이기 ==========', '\u001b[0m');

var joined = pathUtil.join('/tp/login/', 'game');
console.log('- join: ', joined);

var pathStr2 = __dirname + pathUtil.sep + 'image.png';
console.log('- path making: ', pathStr2);

// 경로 만들기
console.log('\u001b[33m', '========== 경로 만들기 ==========', '\u001b[0m');

var path = pathUtil.format({
  root: '/',
  dir: '/home/user/dir',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
});
console.log('- formatted: ', path);
