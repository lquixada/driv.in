
var video = {
    id: "5NYt1qirBWg",
    seconds: 0,
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
