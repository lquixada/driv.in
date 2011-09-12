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

                console.log( data );

                // To be refactored
                data.avatar = '/img/avatar01.png';
                $.publish('user-added', data);
            });

            socket.on('user leave', function(data) {
                debugInfo('user leave:' + data.id);
                $.publish('user-removed', data);
            });

            $.subscribe('user-message-sent', function(event, message) {
                socket.emit('chat message', message.userName, message.userMessage);
            });

            $.subscribe('user-name-changed', function(event, message) {
                audience.users[socket.socket.sessionid].name = message.userName;
            });

            clearInterval(timer);
        }
    },
    100);
}

