/**
 * ---------------------------------------------
 * Console (https://nodejs.org/api/console.html)
 * ---------------------------------------------
 */
// console
console.log('로그를 출력합니다.');
console.log('로그를 출력합니다.');
console.dir('로그를 출력합니다.');
console.info('로그를 출력합니다.');
console.warn('로그를 출력합니다.');
console.error('로그를 출력합니다.');

// time() 메서드와 timeENd() 메서드
// 프로그램 실행 시간 측정
console.time('alpha');
var output = 1;
for (var i=0; i<=10000; i++) {
  output += i;
}
console.log('Result:', output);
console.timeEnd('alpha');

// console.log() 메서드의 특수 문자
console.log('숫자: %d + %d = %d', 273, 52, 273 + 52);
console.log('문자열: %s', 'Hello World~!!!', '특수 기호와 상관 없음');
console.log('JSON: %j', { name: '주근깨' });


// 출력 글자에 색 적용하기
console.log('\u001b[4m');                       // 밑줄
console.log('\u001b[7m');                       // 채우기 및 이미지
console.log('\u001b[38m', 'Hello World ... !'); // red
console.log('\u001b[0m');                       // 색 초기화
console.log('\u001b[31m', 'Hello World ... !'); // red
console.log('\u001b[32m', 'Hello World ... !'); // green
console.log('\u001b[33m', 'Hello World ... !'); // yellow
console.log('\u001b[34m', 'Hello World ... !'); // blue
console.log('\u001b[35m', 'Hello World ... !'); // pink
console.log('\u001b[36m', 'Hello World ... !'); // skyblue
console.log('\u001b[1m');                       // 색을 밝게
console.log('\u001b[31m', 'Hello World ... !'); // light red
console.log('\u001b[32m', 'Hello World ... !'); // light green
console.log('\u001b[33m', 'Hello World ... !'); // light yellow
console.log('\u001b[34m', 'Hello World ... !'); // light blue
console.log('\u001b[35m', 'Hello World ... !'); // light pink
console.log('\u001b[36m', 'Hello World ... !'); // light skyblue
console.log('\u001b[0m');                       // 색 초기화