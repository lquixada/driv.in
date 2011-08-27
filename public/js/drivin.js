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
                    alert(2)
                    var link = video.entry.link[0].href,
                        thumb = video.entry.media$group.media$thumbnail[1].url,
                        title = video.entry.title['$t'];

                    $( 'ul#playlist-queue').append( [
                        '<li>',
                            '<a href="'+link+'">',
                                '<img src="'+thumb+'" width="80" height="60" />',
                                title,
                            '</a>',
                        '</li>'
                    ].join(''));

                    input.val('');
                } );
            }


        });
    }
}
