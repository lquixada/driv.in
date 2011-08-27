var player;

function playVideo() {
    if (player) {
        player.playVideo();
    }
}

function pauseVideo() {
    if (player) {
        player.pauseVideo();
    }
}

function onYouTubePlayerReady(playerId) {
    player = document.getElementById("diplayer");
    player.cueVideoById("5NYt1qirBWg");
    player.pauseVideo();
}

var chat = {
    init: function () {
        $( 'input#message' ).keydown(function ( event ) {
            if (event.keyCode === 13) {
                var message = $( this ).val();
                
                $( 'section#chat ul' ).append( '<li><strong>Driver 1</strong> '+message+'</li>' ).scrollTop(100000);

                $( this ).val( '' );
            }
        });
    }
};

var playlist = {
    init: function ( options ) {
        
        $( 'button#video-add' ).click(function () {
            var input = $( 'input#video-url' ),
                id,
                url = input.val(),
                matches = url.match(/v=(\w+)/);
            
            if ( matches && matches[1] ) {
                id = matches[1];
                
                $.getJSON( 'http://gdata.youtube.com/feeds/api/videos/'+id+'?alt=json', function ( video ) {
                    var link = video.entry.link[0].href,
                        thumb = video.entry.media$group.media$thumbnail[1].url,
                        title = video.entry.title.$t,
                        ul;
                    
                    ul = $( 'section#playlist-queue ul');
                    ul.append( [
                            '<li>',
                                '<a href="'+link+'">',
                                    '<img src="'+thumb+'" width="60" height="45" />',
                                    title,
                                '</a>',
                            '</li>'
                        ].join(''))
                        .animate( {scrollTop:ul.height()}, 900 );



                    input.val('');
                } );
            }


        });
    }
}

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
}
