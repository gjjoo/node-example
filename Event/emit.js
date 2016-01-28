/**
 * Event emit
 * emitter.emit(event[, arg1][, arg2][, ...])
 */
// exit 이벤트를 연결합니다.
process.on('exit', function() {
  console.log('안녕히 계세요~');
});

// 이벤트를 강제로 발생시킵니다.
// emit() 메서드를 사용하여 이벤트를 강제로 호출하면 이벤트 핸들러만 실행
process.emit('exit');
process.emit('exit');
process.emit('exit');
process.emit('exit');

// 프로그램 실행 중
console.log('프로그램 실행 중');