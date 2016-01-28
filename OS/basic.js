/**
 * ---------------------------------------------
 * OS (https://nodejs.org/api/os.html)
 * ---------------------------------------------
 */
// 모듈을 추출합니다.
var os = require('os');

// 모듈을 사용합니다.
console.log('- hostname:', os.hostname());  // 운영체제 호스트 이름을 리턴합니다.
console.log('- type:', os.type());          // 운영체제 이름을 리턴합니다.
console.log('- platform:', os.platform());  // 운영체제 플랫폼을 리턴합니다.
console.log('- arch:', os.arch());          // 운영체제 아키텍처를 리턴합니다.
console.log('- release:', os.release());    // 운영체제 버전을 리턴합니다.
console.log('- uptime:', os.uptime());      // 운영체제가 실행된 시간을 리턴합니다.
console.log('- loadavg:', os.loadavg());    // 로드 에버리지 정보를 담은 배열을 리턴합니다.
console.log('- totalmen:', os.totalmem());  // 시스템 총 메모리를 리턴합니다.
console.log('- freemen:', os.freemem());    // 시스템에서 사용 가능한 메모리를 리턴합니다.
console.log('- cpus:', os.cpus());          // CPU 정보를 담은 객체를 리턴합니다.
console.log('- networkInterfaces:', os.networkInterfaces());  // 네트워크 인터페이스 정보를 담은 배열을 리턴합니다.