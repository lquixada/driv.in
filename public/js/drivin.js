function debugInfo(message) {
    if (console) {
        console.log(message);
    }
} 

function onYouTubePlayerReady(playerId) {
    player.init( { element: $( '#diplayer' ).get( 0 ) });
    player.bindEvent("onStateChange", "video.stateChanged");

    debugInfo('youtube socket connected:' + socket.connected);
    if (socket.connected) {
      socket.emit('join', room);
    } else {
      debugInfo('not connected yet');
    }
}
