
var video = {
    init: function( options ) {
        socket.on('video started', function() {
            logger.log('video started');
            player.play();

            player.bufferLayer.hide();
            clearInterval(player.bufferLayer.currentInterval);
        });

        socket.on('video ended', function() {
            player.pause();
        });

        socket.on('next video', function(video) {
            player.loadId(video.id);
            player.forceBuffer();

            // TODO: move bufferLayer to a better player
            var c = 10;
            player.bufferLayer.currentInterval = setInterval(function(){
                c -= 1; 
                if(c > 0){
                    player.bufferLayer.html("<h3>" + c + "</h3><p>Waiting</p>");
                    player.bufferLayer.show();
                } else {
                    player.bufferLayer.hide();
                    clearInterval(player.bufferLayer.currentInterval);
                }
            }, 1000);
        });

        socket.on('move forward', function(videoId, seconds) {
            logger.log('loading video: ' + videoId);
            player.loadId( videoId, seconds );

            logger.log('will seek to ' + seconds + ' seconds');
            player.seekTo( seconds );

            player.forceBuffer();
        });

        socket.on('play now', function() {
            logger.log('will play now');
            player.play();

            player.bufferLayer.hide();
            clearInterval(player.bufferLayer.currentInterval);
        });
    },
    stateChanged: function(newState) {
      if (newState == 5) {
        // player.forceBuffer();
      }
      logger.log('video state:' + newState);
    }
};
