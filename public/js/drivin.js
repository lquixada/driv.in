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
  setTimeout(function() {
    if (playerReady && socket.connected) {
      debugInfo('can join room');
      room.init();
      socket.emit('join', roomName, 'user');
      currentUser = new User( {id: socket.socket.sessionid, name:'user', avatar:'img/avatar01.png'} );
      room.add(currentUser);
      initChat();
      return;
    }
    joinRoom();
  }, 50);
}

function initChat() {
    chat.init( {
        onMessageSent: function ( message ) {
            this.sendMessage( currentUser.name, message );
        },
        onUserNameChanged: function ( userName ) {
            currentUser.name = userName;
        }
    });
}
