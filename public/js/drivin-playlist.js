
var playlist = {
    init: function ( options ) {
        this.section = $( 'section#playlist' );
        this.ulQueue = this.section.find( 'section#playlist-queue ul' );
        this.input = this.section.find( 'input#video-url' ); 
        this.button = this.section.find( 'button#video-add' );

        this.bindEvents();
    },
    
    addItem: function ( data ) {
        var video = {
            link: data.entry.link[0].href,
            thumb: data.entry.media$group.media$thumbnail[1].url,
            title: data.entry.title.$t
        };

        this.ulQueue.append( [
                '<li>',
                    '<a href="'+video.link+'">',
                        '<img src="'+video.thumb+'" width="60" height="45" />',
                        video.title,
                    '</a>',
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
          console.log('add video');
          socket.emit('add video', 'asdasdas');

            // var videoId,
            //     value = that.input.val(),
            //     matches = value.match(/v=(\w+)/),
            //     url;
            
            // if ( matches && matches[1] ) {
            //     videoId = matches[1];
            //     url = 'http://gdata.youtube.com/feeds/api/videos/'+videoId+'?alt=json';
                
            //     $.getJSON( url, $.proxy( that, 'addItem' ) );
            // }

        });
    }
};

