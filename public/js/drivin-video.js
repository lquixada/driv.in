
var video = {
    id: "5NYt1qirBWg",
    init: function( options ) {
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
