/**
 * Events(https://nodejs.org/api/events.html)
 * Event add
 * emitter.addListener(event, listener) 리스너 등록(Alias for emitter.on(event, listener).)
 * emitter.on(event, listener)          리스너 등록
 * emitter.once(event, listener)        한 번만 동작하는 리스
 */
// 이벤트를 연결합니다.
process.on('exit', function() {
  console.log('안녕히 가거라 ^-^');
});

process.once('beforeExit', function(error) {
  console.log('가지마~ 가지마~ 가지마~~');
});

// 이벤트를 연결합니다.
process.addListener('uncaughtException', function(error) {
  console.log('예외가 발생했군 ^-^ 봐주겠도다 ^-^');
});

// 2초 간격으로 예외를 발생시킵니다.
var id = setInterval(function() {
  // 예외를 강제로 발생시킵니다.
  error.error.error();
}, 2000);