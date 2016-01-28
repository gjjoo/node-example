/**
 * Event remove
 * emitter.removeListener(event, listener)  해당 이벤트에 등록된 개별 리스너 삭제
 * emitter.removeAllListeners([event])      해당 이벤트에 등록된 모든 리스너 제거
 */
// 변수를 선언합니다.
var onUncaughtException = function(err) {
  console.log('예외가 발생했군 ^_^ 이번에만 봐주겠도다 ^_^');

  // 이벤트를 제거
  process.removeListener('uncaughtException', onUncaughtException);
};

// 이벤트를 연결합니다.
process.on('uncaughtException', onUncaughtException);

// 한번만 연결하는 이벤트
// process.once('uncaughtException', onUncaughtException);

// 2초마다 함수를 실행합니다.
setInterval(function() {
  throw new Error('^_^');
}, 2000);