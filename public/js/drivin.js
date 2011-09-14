function debugInfo(message) {
    if (console) {
        console.log(message);
    }
}

function onYouTubePlayerReady(playerId) {
    player.init({
        element: $('#diplayer').get(0)
    });
    player.bindEvent("onStateChange", "video.stateChanged");

    playerReady = true;
    debugInfo('youtube socket connected:' + socket.connected);
}

function joinRoom() {
    var timer = setInterval(function() {
        if (playerReady && socket.connected) {
            debugInfo('can join room');
            audience.init();
            socket.emit('join', roomName, 'user');

            chat.init({
                userName: 'user'
            });

            socket.on('chat message', function(message) {
                $.publish('user-message-received', message);
            });

            socket.on('user join', function(data) {
                debugInfo('user join:' + data.id);
                data.avatar = '/img/avatar01.png';
                $.publish('user-added', data);
            });

            socket.on('user leave', function(data) {
                debugInfo('user leave:' + data.id);
                $.publish('user-removed', data);
            });

            socket.on('next video', function(video) {
                debugInfo('next video ' + video.id);
                $.publish( 'video-next', video );
            });

            socket.on('video added', function(video) {
                debugInfo('video added ' + video.id);
                $.publish( 'video-added', video );
            });
            
            socket.on('video ended', function() {
                $.publish( 'video-ended' );
            });

            $.subscribe('user-message-sent', function(event, message) {
                socket.emit('chat message', message.userName, message.userMessage);
            });

            $.subscribe('user-name-changed', function(event, message) {
                audience.users[socket.socket.sessionid].name = message.userName;
            });

            $.subscribe('video-add', function(event, message) {
                socket.emit('add video', message);
            });

            clearInterval(timer);
        }
    },
    100);
}

