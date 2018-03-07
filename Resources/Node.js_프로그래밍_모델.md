# Node.js 프로그래밍 모델

## 비동기 모델(Asynchronous model)
> 동기 모델이 함수 호출과 같은 작업이 있을 때, 해당 작업이 끝나기를 기다려야 하는 것과 달리 비동기 모델은 함수 호출 후 즉시 반환되고, 이후 함수의 작업 결과를 이벤트 혹은 콜백을 통해 전달받는다.

```js
// 동기(Sync)
var fs = require('fs');
var content = fs.readFileSync('readme.txt', 'utf8');
console.log(content);
console.log('Reading file...');
```

```sh
# 동기식 결과
$ node file-read-sync.js
Hello Node.js!
Reading files...
```

```js
// 비동기(Async)
var fs = require('fs');
fs.readFile('readme.txt', 'utf8', function(err, content) {
  if (err) {
    return console.err(err);
  }
  console.log(content);
});
console.log('Reading file...');
```

```sh
# 비동기식 결과
$ node file-read-async.js
Reading files...
Hello Node.js!
```

## 콜백(Callbacks)
> 콜백함수는 다른 함수로 전달되는 파라미터처럼 호출될 함수를 알려주어, 다른 프로그램 또는 다른 모듈에서 특정 함수를 호출 하게 하는 방법이다.

```js
var fs = require('fs');
var fcontent;
fnction readingfile(callback) {
  fs.readFile('readme.txt', 'utf8', function(err, content) {
    fcontent = content;
    if (err) {
      return console.err(err.stack);
    }
    callback(content);
  });
}

function mycontent() {
  console.log(fcontent);
}
readingfile(mycontent);
console.log('Reading files...');
```

node.js는 비동기 플랫폼에 기반하여 콜백을 사용한다. 이 방법을 통해 데이터베이스에 전달한 쿼리가 끝날때까지 기다릴 피룡가 없으며, 파일 작업이 끝날 때 까지 기다릴 필요도 없어지게 된다.