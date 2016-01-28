/**
 * --------------------------------------------------
 * 모듈 호출
 * --------------------------------------------------
 */
var express  = require('express'),
    app      = express(),
    server   = require('http').createServer(app),
    io       = require('socket.io')(server),
    redis    = require('redis'),
    mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * --------------------------------------------------
 * 환경 설정
 * --------------------------------------------------
 */
// 정적파일 처리
app.use(express.static(__dirname + '/public'));

// MongoDB
mongoose.connect('mongodb://localhost/test', function() {
  console.log('mongodb connected');
});
// 채팅로그 모델
var ChatLogModel = mongoose.model('chatlog', {
  id:   { type: Schema.ObjectId },
  log:  { type: String },
  date: { type: Date, default: Date.now }
});
function saveLog(socket, id, state) {
  var chatLog = new ChatLogModel();
  if (state === 'conn') {
    chatLog.log = id+'님이 접속했습니다.';
  } else {
    chatLog.log = id+'님이 나갔습니다.';
  }
  chatLog.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      ChatLogModel.find({}, function(err, logs) {
        socket.emit('logs', JSON.stringify(logs));
        socket.broadcast.emit('logs', JSON.stringify(logs));
      });
    }
  });
}
// 채팅메시지 모델
var ChatMsgModel = mongoose.model('chatmsg', {
  id:   { type: Schema.ObjectId },
  userid:   { type: String },
  msg:  { type: String },
  date: { type: Date, default: Date.now }
});
function saveMsg(socket, id, msg) {
  console.log('saveMsg: '+id+', '+msg);
  var chatMsg = new ChatMsgModel();
  chatMsg.userid = id;
  chatMsg.msg = msg;
  chatMsg.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('save!');
    }
  });
}

// Redis
var subscriber = redis.createClient(),
    publisher  = redis.createClient();

/**
 * --------------------------------------------------
 * 소켓 통신
 * --------------------------------------------------
 */
var users = [];
// 소켓 연결
io.on('connection', function(socket) {
  console.log('socket connected');

  subscriber.subscribe('chat');
  subscriber.on('message', function(channel, message) {
    console.log('subscriber message');
    socket.emit('message_go', message);
  });

  // 메시지 주고 받기
  socket.on('message', function(raw_msg) {
    console.log('(server-socket)message: '+raw_msg);
    var msg = JSON.parse(raw_msg);
    var chat_msg = msg.chat_id+':'+msg.message;
    saveMsg(socket, msg.chat_id, msg.message);
    publisher.publish('chat', chat_msg);
  });

  // 채팅방 접속 시
  socket.on('chat_conn', function(raw_msg) {
    console.log('(server-socket)chat_conn: '+raw_msg);

    var msg = JSON.parse(raw_msg);
    var index = users.indexOf(msg.chat_id);

    if (index === -1) { // 성공
      users.push(msg.chat_id);
      ChatMsgModel.find({}, function(err, msgs) {
        socket.emit('init', JSON.stringify(msgs));
        socket.emit('chat_join', JSON.stringify(users));
        socket.broadcast.emit('chat_join', JSON.stringify(users));
      });
      saveLog(socket, msg.chat_id, 'conn');
    } else { // 실패
      socket.emit('chat_fail', JSON.stringify(msg.chat_id));
    }
  });

  // 대화방 나갔을 때
  socket.on('leave', function(raw_msg) {
    console.log('(server-socket)leave: '+raw_msg);

    var msg = JSON.parse(raw_msg);
    if (msg.chat_id !== '' || msg.chat_id !== undefined) {
      var index = users.indexOf(msg.chat_id);
      users.splice(index, 1);
      socket.emit('someone_leaved', JSON.stringify(users));
      socket.broadcast.emit('someone_leaved', JSON.stringify(users));
      saveLog(socket, msg.chat_id, 'leave');
    }
  });

  // 소켓 연결 종료 시
  socket.on('disconnect', function(raw_msg) {
    console.log('(server-socket)disconnect: '+raw_msg);
    subscriber.unsubscribe();
  });
});

server.listen(3000);