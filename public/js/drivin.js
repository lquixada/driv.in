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
