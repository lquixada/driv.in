
var video = {
    init: function( options ) {
        socket.on('video started', function() {
            debugInfo('video started');
            player.play();

            player.bufferLayer.hide();
            clearInterval(player.bufferLayer.currentInterval);
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

            //Play and pause to force buffer
            player.play();
            player.pause();

            // TODO: move bufferLayer to a better player
            var c = 10;
            player.bufferLayer.currentInterval = setInterval(function(){
                c -= 1;
                if(c > 0){
                    player.bufferLayer.html("<h3>" + c + "</h3><p>Aguarde</p>");
                    player.bufferLayer.show();
                } else {
                    player.bufferLayer.hide();
                    clearInterval(player.bufferLayer.currentInterval);
                }
            }, 1000);
        });

        socket.on('move forward', function(videoId, seconds) {
            debugInfo('loading video: ' + videoId);
            player.loadId( videoId, seconds );

            debugInfo('will seek to ' + seconds + ' seconds');
            player.seekTo( seconds );

            //Play and pause to force buffer
            player.play();
            player.pause();
        });

        socket.on('play now', function() {
            debugInfo('will play now');
            player.play();

            player.bufferLayer.hide();
            clearInterval(player.bufferLayer.currentInterval);
        });
    },
    stateChanged: function(newState) {
      if (newState == 5) {
            //Play and pause to force buffer
            // player.play();
            // player.pause();
      }
      debugInfo('video state:' + newState);
    }
};
