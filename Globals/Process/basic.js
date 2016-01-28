/**
 * ---------------------------------------------
 * Process (https://nodejs.org/api/process.html)
 * ---------------------------------------------
 */

// process 변수
console.log('- process.env:',           process.env);            // 컴퓨터 환경과 관련된 정보
console.log('- process.version:',       process.version);        // Node.js 버전.
console.log('- process.versions:',      process.versions);       // Node.js와 종속된 프로그램 버전
console.log('- process.arch:',          process.arch);           // 아키텍처 정보
console.log('- process.platform:',      process.platform);       // 플랫폼정보

// process 메서드
console.log('- process.memoryUsage():', process.memoryUsage());  // 메모리 사용 정보 객체를 리턴합니다.
console.log('- process.uptime():',      process.uptime());       // 현재 프로그램이 실행된 시간을 리턴합니다.

// porcess 이벤트
// exit: 노드 에플리케이션이 종료되는 이벤트
// beforeExit: 종료 되기 전에 동작하는 이벤트
// uncaughtException: 예외 처리되지 않은 예외 방생 이벤트