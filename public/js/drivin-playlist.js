
var playlist = {
    init: function ( options ) {
        var self = this;
        this.section    = $('section#playlist');
        this.form       = this.section.find('form');
        this.nowPlaying = this.section.find('section#playlist-now');
        this.ulQueue    = this.section.find('section#playlist-queue ul');
        this.tomatoes   = this.section.find('a.button-tomatoes');

        this.bindEvents();

        socket.on('next video', function(video) {
            debugInfo('next video ' + video.id);
            self.goNextTrack(video);

            self.tomatoes.removeClass('disabled');
        });

        socket.on('video added', function(video) {
            debugInfo('video added ' + video.id);
            self.addItem(video);
        });


        socket.on('video ended', function() {
            if(self.ulQueue.find('li').size() < 1){
                self.updateCurrentTrack('', '');
            }
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


    updateCurrentTrack: function(title, duration){
        this.nowPlaying.find('marquee.video-name')
            .text(title)
        this.nowPlaying.find('span.video-duration')
            .text(duration);
    },

    goNextTrack: function(video){
        this.ulQueue.find('li#' + video.id)
            .fadeOut(300, function() { $(this).remove(); });

        this.updateCurrentTrack(video.title, video.duration);
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
        this.form.submit(function(e){
            e.preventDefault();
            var self  = $(this);
            var input = self.find('input[type=text]');
            if(!$.trim(input.val())){
                return false;
            }

            var submit = self.find('input[type=submit]');
            submit.attr('disabled', 'disabled');

            $.post(self.attr('action'), self.serialize(), {
                success: function(){
                    submit.attr('disabled', '');
                    input.val('');
                }
            });
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

