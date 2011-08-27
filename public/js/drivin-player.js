
var player = {
    init: function ( options ) {
        this.element = options.element || null;
    },

    bindEvent: function ( event, callback ) {
        if (this.element) {
            this.element.addEventListener( event, callback );
        }
    },

    loadId: function ( id ) {
        if (this.element) {
            this.element.cueVideoById( id );
        }
    },

    play: function () {
        if (this.element) {
            this.element.playVideo();
        }
    },

    pause: function () {
        if (this.element) {
            this.element.pauseVideo();
        }
    }
};
