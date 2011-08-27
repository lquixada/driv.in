
function onYouTubePlayerReady(playerId) {
    player.init( { element: $( '#diplayer' ).get( 0 ) });
    player.bindEvent("onStateChange", "video.stateChanged");
    player.loadId( video.id );

    //Play and pause to force buffer
    player.play();
    player.pause();

    video.readyToPlay();
}






