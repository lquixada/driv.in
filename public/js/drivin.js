/*
var socket = io.connect('http://localhost');

socket.on('video play', function () {
    playVideo();
});

socket.on('video pause', function () {
    pauseVideo();
});

function emitPlay() {
    socket.emit('video play');
}

function emitPause() {
    socket.emit('video pause');
}
*/
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
