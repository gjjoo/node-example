# async

```js
// 배열을 사용한 예
async.series([
  function(callback){
  // 비동기 동작
  callback(null, 'one');
  },
  function(callback){
  // 비동기 동작
  callback(null, 'two');
  }
],
// 최종 결과 처리용 콜백
function(err, results){
  // 결과는: ['one', 'two']
});

// 배열 대신 객체를 사용한 예
async.series({
    one: function(callback){
        setTimeout(function(){
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function(){
            callback(null, 2);
        }, 100);
    }
},
function(err, results) {
    // 결과는: {one: 1, two: 2} 
});
```