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


var playlist = {
    init: function ( options ) {
        
        $( 'button#video-add' ).click(function () {
            var input = $( 'input#video-url' ),
                id, url = input.val(),
                matches = url.match(/v=(\w+)/);
            
            if ( matches && matches[1] ) {
                id = matches[1];
                $.getJSON( 'http://gdata.youtube.com/feeds/api/videos/'+id+'?alt=json', function ( video ) {
                    $( 'ul#playlist-queue').append( '<li>'+video.entry.title['$t']+'</li>' );
                    input.val('');
                } );
            }


        });
    }
}
