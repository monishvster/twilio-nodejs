var socket = io();
// ask user's name
function askName() {
	var text="";
	let name = prompt("What is your name", "John");
	if(name!=null){
		text = name;
	}
	return text;
}
// emit a new chatMessage event from the client......
function submitfunction() {
  var from = $('#user').val();
  var message = $('#m').val();
  if (message != '') {
    socket.emit('chatMessage', from, message);
  }
  // what language and selector is used below?
  // set the value to an empty string and
  // focus on the message box again
  $('#m').val('').focus();
  return false;
}

// emit a new notifyUser event from the client.........
function notifyTyping() {
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}

// how to react to a chatMessage event.................
socket.on('chatMessage', function (from, msg) {
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});

// how to react to a notifyUser event.................
socket.on('notifyUser', function (user) {
  var me = $('#user').val();
  if (user != me) {
    $('#notifyUser').text(user + ' is typing ...');
  }
  // 10 seconds after typing stops, set the notify text to an empty string
  setTimeout(function () { $('#notifyUser').text(''); }, 10000);;
});

// when does the document.ready() function get executed?
$(document).ready(function () {
  var name = prompt("What is your name", "Monish");
  if(name!=null){
  $('#user').val(name);
  // emit a chatMessage event from the System along with a message 
  socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
  }
});
