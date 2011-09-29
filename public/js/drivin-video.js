
var video = {
    init: function( options ) {
        $.subscribe('video-started', function () {
            logger.log('video started');

            player.bufferLayer.hide();
            clearInterval(player.bufferLayer.currentInterval);
        });

        $.subscribe('video-next', function(event, video) {
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

        $.subscribe('move-forward', function (event, data) {
            logger.log('loading video: ' + data.videoId);
            player.loadId( data.videoId, data.seconds );

            logger.log('will seek to ' + data.seconds + ' seconds');
            player.seekTo( data.seconds );

            player.forceBuffer();
        });

        $.subscribe('play-now', function() {
            logger.log('will play now');

            player.bufferLayer.hide();
            clearInterval(player.bufferLayer.currentInterval);
        });
    },

    stateChanged: function (state) {
      if (state == 5) {
        // player.forceBuffer();
      }
      logger.log( 'video state: ' + state );
    }
};
