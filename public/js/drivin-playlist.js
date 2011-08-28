
var playlist = {
    init: function ( options ) {
        var self = this;
        this.section = $( 'section#playlist' );
        this.nowPlaying = this.section.find( 'section#playlist-now' );
        this.ulQueue = this.section.find( 'section#playlist-queue ul' );
        this.input = this.section.find( 'input#video-url' );
        this.button = this.section.find( 'button#video-add' );

        this.bindEvents();

        socket.on('next video', function() {
            debugInfo('video ended');
        });

        socket.on('video added', function(video) {
            debugInfo('video added ' + video.id);
            self.addItem(video);
        });
    },

    addItem: function (video) {
        this.ulQueue.append( [
            '<li>',
            '  <a href="'  + video.link     + '">',
            '  <img src="' + video.thumbUrl + '" width="60" height="45" />',
              video.title,
            '  </a>',
            '</li>'
        ].join(''))
            .animate( {
                scrollTop: this.ulQueue.height()
            }, 900 );

        this.clearInput();
    },

    clearInput: function () {
        this.input.val( '' );
    },

    bindEvents: function () {
        var that = this;
        this.button.click(function () {
          debugInfo('add video');
          socket.emit('add video', that.input.val());
        });
    }
};

