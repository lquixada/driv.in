var logger = {
    init: function () {
       var that = this;

       $.subscribe('user-added', function (event, data) {
           that.log('user joined: ' + JSON.stringify( data ) );
       });

       $.subscribe('user-removed', function (event, data) {
           that.log('user leave: ' + JSON.stringify( data ) );
       });

       $.subscribe('video-next', function (event, data) {
           that.log('next video: ' + JSON.stringify( data ) );
       });

       $.subscribe('video-added', function (event, data) {
           that.log('video added: ' + JSON.stringify( data ) );
       });
       
       $.subscribe('video-ended', function () {
           that.log('video ended.');
       });
    },

    log: function ( message ) {
        if ( console ) {
            console.log( message );
        }
    }
};
