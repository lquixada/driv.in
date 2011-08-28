
var video = {
    init: function( options ) {
        socket.on('video started', function() {
            player.play();
        });

        socket.on('video ended', function() {
            player.pause();
        });
    },
    stateChanged: function(newState) {
      //nothing
    }
};
