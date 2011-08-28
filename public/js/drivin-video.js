
var video = {
    init: function( options ) {
        socket.on('video started', function() {
            player.play();
        });

        socket.on('video ended', function() {
            player.pause();
        });

        socket.on('video added', function(video) {
            debugInfo(video);
        });

        socket.on('next video', function(videoId) {
            debugInfo('received next video');
            player.loadId( videoId );

            //Play and pause to force buffer
            player.play();
            player.pause();
        });

        socket.on('move forward', function(videoId, seconds) {
            debugInfo('loading video: ' + videoId);
            player.loadId( videoId, seconds );

            debugInfo('will seek to ' + seconds + ' seconds');
            player.seekTo( seconds );

            player.play();
            player.pause();
        });

        socket.on('play now', function() {
            debugInfo('will play now');
            player.play();
        });
    },
    stateChanged: function(newState) {
      //nothing
    }
};
