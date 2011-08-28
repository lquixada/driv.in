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
  
    // if (socket.connected) {
    //   socket.emit('join', room);
    // } else {
    //   debugInfo('not connected yet');
    // }
}

function joinRoom() {
  setTimeout(function() {
    if (playerReady && socket.connected) {
      debugInfo('can join room');
      socket.emit('join', room);
      return;
    }
    joinRoom();
  }, 50);
}
