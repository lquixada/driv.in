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
}

var chat = {
    init: function () {
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
