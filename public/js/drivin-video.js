
var video = {
    init: function( options ) {
        socket.on('video started', function() {
            debugInfo('video started');
            player.play();
        });

        socket.on('video ended', function() {
            debugInfo('video ended');
            player.pause();
        });

        socket.on('video added', function(video) {
            debugInfo(video);
        });

        socket.on('next video', function(video) {
            debugInfo('received next video ' + video.id);
            player.loadId(video.id);
        });

        socket.on('move forward', function(videoId, seconds) {
            debugInfo('loading video: ' + videoId);
            player.loadId( videoId, seconds );

            debugInfo('will seek to ' + seconds + ' seconds');
            player.seekTo( seconds );
        });

        socket.on('play now', function() {
            debugInfo('will play now');
            player.play();
        });
    },
    stateChanged: function(newState) {
      if (newState == 5) {
            //Play and pause to force buffer
            player.play();
            player.pause();
      }
      debugInfo('video state:' + newState);
    }
};
