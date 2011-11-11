function debugInfo(message) {
    if (console) {
        console.log(message);
    }
} 

function onYouTubePlayerReady(playerId) {
    player.init( { element: $( '#diplayer' ).get( 0 ) });
    player.bindEvent("onStateChange", "video.stateChanged");

    playerReady = true;
    debugInfo('youtube socket connected:' + socket.connected);
}

function joinRoom() {
  var timer = setInterval(function() {
    if (playerReady && socket.connected) {
      debugInfo('can join room');
      audience.init();
      socket.emit('join', roomName, 'user');
      currentUser = new User( {id: socket.socket.sessionid, name:'user', avatar:'img/avatar01.png'} );
      audience.add(currentUser);

      chat.init({
        userName: currentUser.name
      });
      
      socket.on('chat message', function(message) {
          $.publish( 'user-message-received', message );
          audience.users[message.userId].speak(message.userName, message.userMessage);
      });

      $.subscribe( 'user-message-sent', function (event, message) {
          socket.emit('chat message', message.userName, message.userMessage);
      });
      
      $.subscribe( 'user-name-changed', function (event, message) {
          currentUser.name = message.userName;
      });
      
      clearInterval( timer );
    }
  }, 100);
}

