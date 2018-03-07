# File System(fs)

```js
// 파일의 내용 읽기(비동기)
fs.readFile('message.txt', 'utf8', function (err, data) {
  if (err) throw err;
  console.log(data);
});
// 파일의 내용 읽기(동기)
var text = fs.readFileSync('message.txt', 'utf8');

// 파일의 내용 쓰기(비동기)
fs.writeFile('message.txt', 'Hello Node.js', function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});
// 파일의 내용 쓰기(동기)
fs.writeFileSync('message.txt', 'Hello Node.js');
```