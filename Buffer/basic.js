/**
 * Buffer
 * 자바스크립트는 유니코드 문자열을 다루는 기능을 제공하지만, 바이너리 데이터를 다루는 기능을 제공하지는 않는다.
 * Node.js는 버퍼(buffer)를 이용해서 TCP나 파일의 바이너리 데이터를 다룬다.
 * 버퍼가 다루는 데이터는 octet stream 형태이고 octet은 8비트를 의미한다.
 */
// 문자열 버퍼
console.log('\u001b[33m', '========== 문자열 버퍼 ==========', '\u001b[0m');
var str = 'Hello';
var strBuf = new Buffer(str);

console.log('- buffer: ', strBuf);
console.log('- decode: ', strBuf.toString());

// 버퍼 덧붙이기
console.log('\u001b[33m', '========== 버퍼 덧붙이기 ==========', '\u001b[0m');
var strBuf2 = new Buffer('NodeJS');
var strBuf3 = Buffer.concat([strBuf, strBuf2]);

console.log('- Buffoer Concat: ', strBuf3);
console.log('- Concat buffer decode: ', strBuf3.toString());
console.log('- Concat buffer length: ', strBuf3.length);

// 숫자형 버퍼
console.log('\u001b[33m', '========== Buffer from Int Array ==========', '\u001b[0m');
var arrayBuf = new Buffer([1, 2, 3]);
console.log('- buffer: ', arrayBuf);
console.log('- Int Buffer length: ' + arrayBuf.length);

var intVal = arrayBuf.readUInt8(2);
console.log('- Int Array Buffer. readInt(2):',intVal);

// 고정크기 버퍼
console.log('\u001b[33m', '========== 고정 크기 버퍼 샘플 ==========', '\u001b[0m');
var buf2 = new Buffer(10);
console.log('- Buffer length: ',buf2.length);

var longStr = 'long long string data';
console.log('- String length: ', longStr.length);
buf2.write(longStr);
console.log('- Buffer write: ', buf2.toString());

// Int Read/Write
console.log('\u001b[33m', '========== Int Read/Write Sample ==========', '\u001b[0m');
var buf3 = new Buffer(10);
buf3.writeIntLE(40, 0);
buf3.writeIntLE(80, 1);

var v1 = buf3.readIntLE(0, 1);
var v2 = buf3.readIntLE(1, 1);
console.log('- v1: ',v1);
console.log('- v2: ',v2);