# Node.js 기본 모듈

node.js의 기본으로 포함되어 있는 모듈을 기본 모듈이라고 하며, 이후 추가 설치를 통해 사용하는 모듈을 확장 모듈이라고 한다.

Module | Stability | Synopsis
------ | --------- | --------
Assertion Testing | <span style="color:blue">3</span>   | 유닛 테스트를 위한 단언문을 제공
Buffer            | <span style="color:orange">2</span> | 바이너리 데이터의 옥텟 스트림(octet streams)을 다루는 모듈
C/C++ Addons      |                                     | C 및 C++ 라이브러리에 에드온 제공
Child Processes   | <span style="color:orange">2</span> | 자식 프로세스 생성과 관련된 함수 제공
Cluster           | <span style="color:orange">2</span> | 여러 노드 프로세스를 실행하는 클러스터 기능을 제공
Console           | <span style="color:orange">2</span> | 출력에 대한 함수 제공
Crypto            | <span style="color:orange">2</span> | 암호화에 대한 함수 제공
Debugger          | <span style="color:orange">2</span> | 중단점을 활용하여 간단한 공정 및 검사 기능을 제공
DNS               | <span style="color:orange">2</span> | 도메인 네임 서버를 다루는 함수 제공
~~Domain~~        | <span style="color:red">0</span>    | This module is pending deprecation.
Errors            |                                     | 자바스크립트 오류와 시스템 오류
Events            | <span style="color:orange">2</span> | 이벤트 관련 함수 제공
File System       | <span style="color:orange">2</span> | 파일을 다루는 함수 제공
Globals           |                                     | 전역 객체
HTTP              | <span style="color:orange">2</span> | HTTP 서버 및 클라이언트 기능 제공
HTTPS             | <span style="color:orange">2</span> | HTTPS 서버 및 클라이언트 기능 제공
Modules           | <span style="color:blue">3</span>   | Node.js의 모듈 로딩 시스템
Net               | <span style="color:orange">2</span> | 비동기 네트워크 통신 기능 제공
OS                | <span style="color:orange">2</span> | 운영체제에 대한 정보를 가지고 있는 함수 제공
Path              | <span style="color:orange">2</span> | 파일 경로를 다루는 함수 제공
Process           |                                     | 프로세스에 대한 정보를 담고 있는 전역 객체
Punycode          | <span style="color:orange">2</span> | [퍼니코드](https://github.com/bestiejs/punycode.js)
Query Strings     | <span style="color:orange">2</span> | URL의 쿼리 문자열을 다루는 함수 제공
Readline          | <span style="color:orange">2</span> | 스트림에서 라인 단위로 읽는 기능을 제공
REPL              | <span style="color:orange">2</span> | REPL(Read-Eval-Print-Loop)은 대화형 자바스크립트를 실행하고 결과를 볼 수 있는 방법을 제공
Stream            | <span style="color:orange">2</span> | 스트림을 다루기 위한 추상 인터페이스
String Decoder    | <span style="color:orange">2</span> | 버퍼를 디코딩
Timers            | <span style="color:blue">3</span>   | 자바스크립트의 시간 관련 함수를 담고 있는 전역 객체
TLS/SSL           | <span style="color:orange">2</span> | 공개키, 개인키 기반인 TLS/SSL에 대한 함수 제공
TTY               | <span style="color:orange">2</span> | 터미널이나 콘솔 관련 기능을 제공
UDP/Datagram      | <span style="color:orange">2</span> | UDP의 데이터그램 소켓(Datagram Sockets) 통신 기능 제공
URL               | <span style="color:orange">2</span> | URL을 다루는 함수 제공
Utilities         | <span style="color:orange">2</span> | 타입 검사, 포메팅 등의 유틸리티 함수 제공
V8                | <span style="color:orange">2</span> | Node.js V8엔진의 버전에 대한 특정 이벤트와 인터페이스 제공
VM                | <span style="color:orange">2</span> | 자바스크립트 실행 기능 제공
ZLIB              | <span style="color:orange">2</span> | zlib 압축, 해제 함수 제공