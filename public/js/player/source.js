/* player is a wrapper around youtube player's javascript api */

var player = {
    init: function ( options ) {
        this.mute = false;

        this.buffer.init();

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
            that.buffer.stop();
        });

        $.subscribe('play-now', function () {
            that.play();
            that.buffer.stop();
        });

        $.subscribe('video-next', function ( event, video ) {
            that.loadId( video.id );
            that.forceBuffer();
            that.buffer.start();
        });

        $.subscribe('move-forward', function (event, data) {
            player.loadId( data.videoId, data.seconds );
            player.seekTo( data.seconds );
            player.forceBuffer();
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
        this.hide();
    },

    hide: function () {
        this.element.hide();
    },
    
    show: function () {
        this.element.show();
    },

    start: function () {
        var that = this, secs = 10;

        this.show();
        this._setSeconds( secs );

        this.timer = setInterval( function () {
            secs--;
            that._setSeconds( secs );

            if ( secs == 0 ) {
                that.stop();
            }
        }, 1000);
    },

    stop: function () {
        clearInterval( this.timer );
        this.hide();
    },

    _setSeconds: function ( secs ) {
        this.element.html( '<h3>' + secs + '</h3><p>Waiting</p>' );
    }
};
