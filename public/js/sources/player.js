var player = {
    init: function ( options ) {
        this.mute = false;

        this.bufferLayer = $('#buffer-overlay');
        this.bufferLayer.hide();

        this.element = options.element;
        this.element.setVolume(100);
    },

    bindEvent: function ( event, callback ) {
        this.element.addEventListener( event, callback );
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
        debugInfo('player element:' + this.element+ 'will play');
        this.element.playVideo();
    },

    seekTo: function ( seconds ) {
        this.element.seekTo( seconds, true );
    },

    toggleMute: function () {
        if (this.mute) {
            this.mute = false;
            this.element.unmute();
        } else {
            this.mute = true;
            this.element.mute();
        }
    }
}
