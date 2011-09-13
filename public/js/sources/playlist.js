var playlist = {
    init: function () {
        var that = this;

        this.section = $( 'section#playlist' );
        this.marquee = this.section.find( 'marquee.video-title' );
        this.span = this.section.find( 'span.video-duration' );
        this.ul = this.section.find( 'ul' );
        this.button = this.section.find( 'button#video-add' );
        this.input = this.section.find( 'input#video-url' );
        this.a = this.section.find( 'a.button-tomatoes' );

        this.bindEvents();

        $.subscribe( 'video-added', function (event, data) {
            that.addTrack( data );
        } )
    },

    addTrack: function ( video ) {
        this.ul.append( [
            '<li id="'+video.id+'"><img src="'+video.thumbUrl+'" />'+video.title+'</li>',
        ].join('') );
    },

    bindEvents: function () {
        var that = this;

        this.button.click( function () {
            var url = that.input.val();
            
            that.input.val( '' );

            $.publish( 'video-added', url );
        } );

        this.a.click( function () {
            $( this ).addClass( 'disabled' );
            $.publish( 'tomato-thrown', {} );
        })
    },

    goToNextTrack: function ( video ) {
        $( 'section#playlist-queue ul li:first' ).remove();

        this.setCurrentTrack( video.title, video.duration );
    },

    setCurrentTrack: function ( title, duration ) {
       $( 'marquee.video-title' ).html( title );
       $( 'span.video-duration' ).html( duration );
    }
};

