
function onYouTubePlayerReady() {
    player.init({
        ready: true,
        element: $('#diplayer').get(0)
    });

    logger.log( 'youtube player ready: ' + player.ready );
    logger.log( 'socket connected: ' + socket.connected );
}

var room = {
    name: 'room1',
    join: function () {
        var that = this;

        this.timer = setInterval(function() {
            if (player.ready && socket.connected) {
                logger.log('user joining room.');
                audience.init();
                socket.emit('join', room.name, 'user');

                chat.init({
                    userName: 'user'
                });
                
                /* Publishers */
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
                
                /* Subscribers */
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

                clearInterval(that.timer);
            }
        }, 100 );
    }
};

