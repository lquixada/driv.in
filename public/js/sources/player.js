/* player is a wrapper around youtube player's javascript api */

var player = {
    init: function ( options ) {
        this.mute = false;

        this.bufferLayer = $('#buffer-overlay');
        this.bufferLayer.hide();

        this.element = options.element;
        this.element.setVolume(100);
        
        this.bindEvent( 'onStateChange', 'video.stateChanged' );
        this._bindSubscribers();
    },

    bindEvent: function ( event, callback ) {
        this.element.addEventListener( event, callback );
    },

    _bindSubscribers: function () {
        var that = this;

        $.subscribe('video-ended', function() {
            that.pause();
        });

        $.subscribe('video-started', function () {
            that.play();
        });

        $.subscribe('play-now', function () {
            that.play();
        });

        $.subscribe('video-next', function ( event, video ) {
            that.loadId( video.id );
            that.forceBuffer();
        });
    },

    forceBuffer: function () {
        //Play and pause to force buffer
        this.play();
        this.pause();
    },

    loadId: function ( id, secs ) {
        if (secs > 0) {
            this.element.cueVideoById( id, secs );
        } else {
            this.element.cueVideoById( id );
        }

        if (this.mute) {
            this.element.mute();
        }
    },

    pause: function () {
        this.element.pauseVideo();
    },
    
    play: function () {
        this.element.playVideo();
    },

    seekTo: function ( seconds ) {
        this.element.seekTo( seconds, true );
    },

    toggleMute: function () {
        if (this.mute) {
            this.mute = false;
            this.element.unMute();
        } else {
            this.mute = true;
            this.element.mute();
        }
    }
};

player.buffer = {
    init: function () {
        this.element = $( '#buffer-overlay' );
    },

    hide: function () {
        this.element.hide();
    },
    
    show: function () {
        this.element.show();
    }
};
