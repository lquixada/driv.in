
var player = {
    muted: false,

    init: function ( options ) {
        this.element = options.element || null;
        if (this.element) {
          this.element.setVolume(100);
        }
    },

    toggleMute: function() {
        if (this.mute) {
          this.mute = false;
          if (this.element) { this.element.unMute(); }
        } else {
          this.mute = true;
          if (this.element) { this.element.mute(); }
        }
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
            if (this.mute) {
              this.element.mute();
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
