(function(global, $, undefined) {

  /**
   * ------------------------------
   * 변수 및 함수 선언
   * ------------------------------
   */
  var chat_id,
      socket          = io.connect(),
      $chat_id        = $('#chat_id'),
      $conn           = $('#conn'),
      $chat_input     = $('#chat_input'),
      $chat_in        = $('#chat_in'),
      $chat_out       = $('#chat_out'),
      $chat_list      = $('#chat_list'),
      $chat_user_list = $('#chat_user_list'),
      $now_user_cnt   = $('#now_user_cnt'),
      $chat_form      = $('#chat_form'),
      $chat_form_no   = $('#chat_form_no'),
      $chat_logs      = $('#chat_logs'),

      // input value 값 초기화
      clearValue = function(e) {
        $(this).val('');
      },
      chatIn = function(e) {
        e.preventDefault();
        var encodedMsg = encodeURIComponent($chat_input.val());
        socket.emit('message', JSON.stringify({
          chat_id: chat_id,
          message: encodedMsg
        }));
        $chat_input.val('');
      },
      chatOut = function(e) {
        // if ( e.target === '' ) {
          e.preventDefault();
        // }
        socket.emit('leave', JSON.stringify({chat_id: chat_id}));
        $chat_id.attr('disabled', false);
        $chat_list.html('');
        $chat_form.slideUp();
        $chat_form_no.slideDown();
        chat_id = '';
      };


  /**
   * ------------------------------
   * 소켓 양방향 통신
   * ------------------------------
   */
  // $(global).unload(function(){
  //   chatOut();
  // });

  // 로그인 성공
  socket.on('chat_join', function(data) {
    data = JSON.parse(data);
    console.log('(client-socket)chat_join: '+data);

    $chat_user_list.empty();
    for (var i=0; i<data.length; i++) {
      var user_id = data[i];
      if (user_id == chat_id) {
        $chat_user_list.append('<li><strong>'+user_id+'(me)</strong></li>');
        $chat_id.attr('disabled', true);
      } else {
        $chat_user_list.append('<li>'+user_id+'</li>');
      }
    }
    $now_user_cnt.html(data.length);
  });

  // 로그인 실패
  socket.on('chat_fail', function(data) {
    data = JSON.parse(data);
    console.log('(client-socket)chat_fail: '+data);

    alert(data+'님은 이미 접속된 ID입니다.');
  });

  // 사용자 나감 처리
  socket.on('someone_leaved', function(data) {
    data = JSON.parse(data);
    console.log('(client-socket)someone_leaved: '+data);

    $chat_user_list.empty();
    for (var i=0; i<data.length; i++) {
      var user_id = data[i];
      if (user_id == chat_id) {
        $chat_user_list.append('<li><strong>'+user_id+'(me)</strong></li>');
      } else {
        $chat_user_list.append('<li>'+user_id+'</li>');
      }
    }
    $now_user_cnt.html(data.length);
  });

  // 채팅
  socket.on('message_go', function(data) {
    console.log('(client-socket)message_go: '+data);

    data = decodeURIComponent(data);
    data = data.replace(/&/g, '&amp;');
    data = data.replace(/\"/g, '&quot;');
    data = data.replace(/\'/g, '&#39;');
    data = data.replace(/</g, '&lt;');
    data = data.replace(/>/g, '&gt;');
    $chat_list.append('<li>'+data+'</li>');
  });

  // 로그
  socket.on('logs', function(data) {
    data = JSON.parse(data);
    console.log('(client-socket)logs: '+data);

    $chat_logs.empty();
    for (var i=0; i<data.length; i++) {
      $chat_logs.append('<li>'+data[i].log+'('+data[i].date+')'+'</li>')
    }
  });

  // init
  socket.on('init', function(data) {
    data = JSON.parse(data);
    console.log('(client-socket)init: '+data);
    $(data).each(function(){
      var msg = this.msg;
          msg = decodeURIComponent(msg);
          msg = msg
                  .replace(/&/g, '&amp;')
                  .replace(/\"/g, '&quot;')
                  .replace(/\'/g, '&#39;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;');
          $chat_list.append('<li>'+this.userid+':'+msg+'('+this.date+')'+'</li>');
    });
  });


  /**
   * ------------------------------
   * 채팅 이벤트 처리
   * ------------------------------
   */
  // 접속하기
  $conn.on('click', function(e) {
    e.preventDefault();
    chat_id = $chat_id.val();
    chatOut();

    if (chat_id === '') {
      alert('ID를 입력해주세요');
    } else {
      socket.emit('chat_conn', JSON.stringify({chat_id: chat_id}));
      $chat_list.html('');
      $chat_form_no.slideUp();
      $chat_form.slideDown();
    }
  });

  $chat_id.on('click', clearValue);    // input 값 초기화
  $chat_input.on('click', clearValue); // input 값 초기화
  $chat_in.on('click', chatIn);        // 입력
  $chat_out.on('click', chatOut);      // 나가기

}(window, window.jQuery));