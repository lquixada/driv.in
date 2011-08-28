
var player = {
    init: function ( options ) {
        this.element = options.element || null;
    },

    bindEvent: function ( event, callback ) {
        if (this.element) {
            this.element.addEventListener( event, callback );
        }
    },

    loadId: function ( id, seconds ) {
        if (this.element) {
            if ( seconds > 0 ) {
              this.element.cueVideoById( id, seconds ); 
            } else {
              this.element.cueVideoById( id );
            }
        }
    },

    play: function () {
        debugInfo("player element:" + this.element);
        if (this.element) {
            debugInfo("will play");
            this.element.playVideo();
        }
    },

    pause: function () {
        if (this.element) {
            this.element.pauseVideo();
        }
    },

    seekTo: function(seconds) {
        if (this.element) {
            this.element.seekTo(seconds, true);
        }
    }
};
