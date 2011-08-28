
var playlist = {
    init: function ( options ) {
        var self = this;
        this.section = $( 'section#playlist' );
        this.nowPlaying = this.section.find( 'section#playlist-now' );
        this.ulQueue = this.section.find( 'section#playlist-queue ul' );
        this.input = this.section.find( 'input#video-url' );
        this.button = this.section.find( 'button#video-add' );
        this.tomatoes = this.section.find( 'a.button-tomatoes' );
        this.bindEvents();

        socket.on('next video', function(video) {
            debugInfo('next video ' + video.id);
            self.killItem(video);

            self.tomatoes.removeClass('disabled');
        });

        socket.on('video added', function(video) {
            debugInfo('video added ' + video.id);
            self.addItem(video);
        });


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

            self.nowPlaying.find('.video-duration').text(duration);
        }, 500);

    },

    killItem: function(video){
        this.ulQueue.find('li#' + video.id)
            .fadeOut(300, function() { $(this).remove(); });

        this.nowPlaying.find('marquee.video-name')
            .text(video.title)
        this.nowPlaying.find('span.video-duration')
            .text(video.duration);
    },

    addItem: function(video) {
        this.ulQueue.append( [
            '<li id="' + video.id + '">',
            '  <img src="' + video.thumbUrl + '" />',
              video.title,
            '</li>'
        ].join(''));
    },

    bindEvents: function () {
        var that = this;
        this.button.click(function () {
            debugInfo('add video');
            socket.emit('add video', that.input.val());
            that.input.val('');
        });

        this.tomatoes.click(function(e){
            e.preventDefault();
            if(!$(this).hasClass('disabled')){
                $(this).addClass('disabled');
                socket.emit('blame');
            }
        });
    }
};

