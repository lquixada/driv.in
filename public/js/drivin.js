
function onYouTubePlayerReady(playerId) {
    player.init( { element: $( 'diplayer' ).get( 0 ) });
    player.addEvent("onStateChange", "video.stateChanged");
    player.loadId( video.id );

    //Play and pause to force buffer
    player.play();
    player.pause();

    video.readyToPlay();
}


var chat = {
    init: function ( options ) {
        this.section = $( 'section#chat' );
        this.ul = this.section.find( 'ul' );
        this.input = this.section.find( 'input#message' );

        this.user = options.user;

        this.bindEvents();
    },

    addMessage: function ( message ) {
        this.ul.append( '<li><strong>'+this.user.name+'</strong> '+message+'</li>' ).scrollTop(100000);
    },

    clearInput: function () {
        this.input.val( '' );
    },

    bindEvents: function () {
        var that = this;
        
        this.input.keydown(function ( event ) {
            
            if (event.keyCode === 13) {
                var message = that.input.val();
                
                that.user.send( message );
                that.addMessage( message );
                that.clearInput();
                
            }
        });
    }
};


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
            var videoId,
                value = that.input.val(),
                matches = value.match(/v=(\w+)/),
                url;
            
            if ( matches && matches[1] ) {
                videoId = matches[1];
                url = 'http://gdata.youtube.com/feeds/api/videos/'+videoId+'?alt=json';
                
                $.getJSON( url, $.proxy( that, 'addItem' ) );
            }

        });
    }
};


var video = {
    id: "5NYt1qirBWg",
    init: function( options ) {
        var socket = io.connect();
        socket.on('video started', function() {
            console.log('video started');
            playVideo();
        });

        socket.on('video ended', function() {
            console.log('video ended');
            pauseVideo();
        });
    },
    stateChanged: function(newState) {
      console.log(newState);
    }
};


var User = function ( options ) {
    this.name = options.name || 'Driver';
    this.avatar = options.avatar || 'img/driver03.png';
};

User.prototype.send = function ( message ) {
    console.log( this.name+' says: ' + message );
};
