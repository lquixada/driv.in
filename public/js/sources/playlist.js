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

        this.updateTrackDuration();
        this.bindEvents();
        this.bindSubscribers();
    },

    addTrack: function ( video ) {
        this.ul.append( [
            '<li id="'+video.id+'"><img src="'+video.thumbUrl+'" />'+video.title+'</li>',
        ].join('') );
    },

    bindSubscribers: function () {
        var that = this;

        $.subscribe( 'video-added', function (event, data) {
            that.addTrack( data );
        } );

        $.subscribe( 'video-ended', function (event, data) {
            if(that.ul.find('li').size() < 1){
                that.setCurrentTrack('', '');
            }
        } );

        $.subscribe( 'video-next', function ( event, video ) {
            that.goToNextTrack(video);

            that.a.removeClass('disabled');
        } );
    },

    bindEvents: function () {
        var that = this;

        this.button.click( function () {
            var url = that.input.val();
            
            that.input.val( '' );

            $.publish( 'video-sent', url );
        } );

        this.a.click( function () {
            $( this ).addClass( 'disabled' );
            $.publish( 'tomato-thrown', {} );
        });
    },

    goToNextTrack: function ( video ) {
        this.ul.find( 'li:first' ).remove();

        this.setCurrentTrack( video.title, video.duration );
    },

    setCurrentTrack: function ( title, duration ) {
        this.marquee.text( title );
        this.span.text( duration );
    },
    
    /* Be careful: not tested! May bite you! */
    updateTrackDuration: function () {
        var that = this;

        setInterval(function(){
            var duration = '';
            if(player.element){
                var timeRemain = player.element.getDuration() -
                    player.element.getCurrentTime();

                if(timeRemain > 0){
                    var m = Math.floor(timeRemain / 60);
                    var s = Math.floor(timeRemain % 60);

                    duration = '-' + m + ':' +
                        (s < 10 ? '0' + s : s);
                }
            }

            that.span.text(duration);
        }, 500);
    }
};

