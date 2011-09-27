
function onYouTubePlayerReady(playerId) {
    player.init({
        element: $('#diplayer').get(0)
    });
    player.bindEvent("onStateChange", "video.stateChanged");

    player.ready = true;
    logger.log('youtube socket connected:' + socket.connected);
}

function joinRoom() {
    var timer = setInterval(function() {
        if (player.ready && socket.connected) {
            logger.log('can join room');
            audience.init();
            socket.emit('join', room.name, 'user');

            chat.init({
                userName: 'user'
            });

            socket.on('chat message', function(message) {
                $.publish('user-message-received', message);
            });

            socket.on('user join', function(data) {
                data.avatar = '/img/avatar01.png';
                $.publish('user-added', data);
            });

            socket.on('user leave', function(data) {
                $.publish('user-removed', data);
            });

            socket.on('next video', function(video) {
                $.publish( 'video-next', video );
            });

            socket.on('video added', function(video) {
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

            $.subscribe('video-sent', function(event, message) {
                socket.emit('add video', message);
            });

            $.subscribe('tomato-thrown', function(event, message) {
                socket.emit('blame');
            });

            clearInterval(timer);
        }
    }, 100 );
}

