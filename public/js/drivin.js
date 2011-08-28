
function onYouTubePlayerReady(playerId) {
    player.init( { element: $( '#diplayer' ).get( 0 ) });
    player.bindEvent("onStateChange", "video.stateChanged");

    if (console) { console.log('youtube socket connected:' + socket.connected); }
    if (socket.connected) {
      socket.emit('join', room);
    } else {
      if (console) { console.log('not connected yet'); }
    }
}
