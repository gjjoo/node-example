# 스트림
스트림 모듈은 스트림을 다루는 모든 객체의 추상 인터페이스이다. 스트림은 Readable Stream과 Writable Stream이 있다.

### 다음은 Readable Stream에 예약된 이벤트와 멤버함수, 멤버변수이다.
- data 이벤트: 스트림에 새로운 데이터가 들어왔을 때 발생하고, 기본적으로 Buffer 클래스를 사용하지만 setEncoding()이 사용되었다면 문자열을 사용한다. 콜백함수는 function(data){} 이다.
- end 이벤트: 스트림이 EOF나 FIN을 받았을 때 발생한다. end 이벤트가 발생하면 더 이상 data 이벤트가 발생하지 않음을 의미하지만, 스트림이 쓰기도 가능하다면 쓰기는 여전히 가능하다. 콜백 함수는 function(){} 이다.
- error 이벤트: 데이터를 받는 동안 에러가 있을 때 발생한다. 콜백 함수는 function(exception){} 이다.
- close 이벤트: 사용하는 파일 디스크립터가 닫혔을 때 발생한다. 모든 스트림이 이 이벤트를 사용하지는 않는다. 예를 들어 HTTP 요청은 종료 시점을 알 수 없으므로 close를 발생시키지 않는다.
- stream.readable: 스트림이 읽을 수 있는 상태인지 알려준다. 기본적으로 true 이지만, error 이벤트가 발생하거나 end 이벤트가 발생하면 false로 바뀐다.
- stream.setEncoding(encoding): data 이벤트가 Buffer 대신 문자열을 사용하게 만든다. encoding은 utf8, ascii, base64를 사용할 수 있다.
- stream.pause(): 들어오는 data 이벤트를 멈춘다.
- stream.resume(): pause() 로 멈춘 data 이벤트를 다시 받기 시작한다.
- stream.destroy(): 사용하는 파일 디스크립터를 닫는다. destroy()를 사용하면 스트림은 더 이상 어떤 이벤트도 발생시키지 않는다.
- stream.pipe(destination, [option]): 스트림에서 읽어 들인 내용을 destination에 지정된 쓰기 스트림에 연결한다. pipe 함수는 destination 스트림을 돌려주고 destination 스트림에서 end() 이벤트가 호출되어 쓸 수 없는 상태가 되면 소스 스트림에서도 end() 이벤트가 발생한다. option에 { end: false }를 전달하면 destination 스트림을 열린 상태로 유지한다.

### 다음은 Writable Stream에 예약된 이벤트와 멤버함수, 멤버변수 이다.
- drain 이벤트: write() 메소드가 false를 돌려준 후 스트림이 다시 쓸 수 있는 상태가 되었음을 알리기 위한 이벤트로 콜백 함수는 function(){} 이다.
- error 이벤트: 스트림에서 에러가 생기면 발생하는 이벤트이다. 콜백 함수는 function(exception){} 이다.
- close 이벤트: 사용하는 파일 디스크립터가 닫히면 발생한다. 콜백 함수는 function(){} 이다.
- pipe 이벤트: Readable Stream의 pipe 함수로 스트림이 전달 되었을 때 발생한다.
- stream.writable: 스트림이 쓰기 가능한 상태인지 나타낸다. 기본 값은 true 이지만 error 이벤트가 발생하거나 end(), destroy()가 호출되면 false로 변경된다.
- stream.write(string, encoding='utf8', [fd]): string 문자열을 encoding으로 인코딩해 스트림에 쓴다. 문자열이 커널 버퍼로 플러시되면 true를 리턴하고, 커널 버퍼가 꽉 찼으면 false를 리턴한다. 커널 버퍼가 다시 비워 졌을 때 drain 이벤트가 발생한다. 옵션 파라미터인 fd는 파일 디스크립터를 의미한다. 문자열 대신 버퍼를 쓰려면 stream.write(buffer)를 사용한다.
- stream.emd(): EOF나 FIN 으로 스트림을 종료한다. 큐에 추가된 데이터가 있으면 종료하기 전에 모두 내보낸다. end()는 종료하면서 데이터를 쓰기 위한 end(string, encoding)과 end(buffer)도 사용할 수 있다.
- stream.destroy(): 사용중인 파일 디스크립터를 닫는다. destroy()를 사용하면 스트림은 더 이상 이벤트를 발생시키지 않으며, 큐에 쌓인 데이터도 보내지 않는다.
- stream.destroySoon(): 큐에 쌓인 데이터를 모두 소비한 후 파일 디스크립터를 닫는다.
