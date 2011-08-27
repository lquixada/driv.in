
var video = {
    id: "5NYt1qirBWg",
    init: function( options ) {
        var socket = io.connect();
        socket.on('video started', function() {
            console.log('video started');
            player.play();
        });

        socket.on('video ended', function() {
            console.log('video ended');
            player.pause();
        });
    },
    stateChanged: function(newState) {
      console.log(newState);
    }
};
