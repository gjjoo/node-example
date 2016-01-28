/**
 * util 모듈을 사용하지 않은 customEvent
 */
console.log('\u001b[33m', '========== CustomEvent First ==========', '\u001b[0m');

// EventEmitter 객체 생성
var custom = new process.EventEmitter();

// 이벤트를 연결
custom.on('tick', function() {
  console.log('이벤트를 실행합니다.');
});

// 이벤트를 강제로 발생시킵니다.
custom.emit('tick');


/**
 * util 모듈을 사용한 customEvent
 */
console.log('\u001b[33m', '========== CustomEvent Second ==========', '\u001b[0m');

var events       = require('events'),
    util         = require('util'),
    EventEmitter = events.EventEmitter,
    Person       = function(){};

// Prototype을 이용한 상속
// Person.prototype = new event.EventEmitter();
util.inherits(Person, EventEmitter);

var p = new Person();
p.on('howAreYou', function() {
    console.log('Fine, Thank you and you?')
});

// 이벤트 핸들러가 정의된 이벤트
var ret1 = p.emit('howAreYou');
console.log('handled event result : ', ret1);
// 이벤트 핸들러가 없는 이벤트
var ret2 = p.emit('hello');
console.log('unhandled event result : ', ret2);