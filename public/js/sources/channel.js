/* channel is a wrapper around socket.io */

var channel = {
    init: function ( options ) {
        var that = this;
            roomName = options.roomName;

        this.socket = io.connect();

        this.socket.on( 'connect', function () {
            that.socket.emit( 'join', roomName, 'user');
            that._bindPublishers();
            that._bindSubscribers();
        } );
    },

    _bindPublishers: function () {
        this.socket.on( 'chat message', function ( message ) {
            $.publish( 'user-message-received', message );
        });

        this.socket.on('user join', function(data) {
            data.avatar = '/img/avatar01.png';
            $.publish('user-added', data);
        });
        
        this.socket.on( 'user leave', function ( data ) {
            $.publish( 'user-removed', data );
        });

        this.socket.on('next video', function(video) {
            $.publish( 'video-next', video );
        });

        this.socket.on('video added', function(video) {
            $.publish( 'video-added', video );
        });

        this.socket.on('video started', function() {
            $.publish( 'video-started' );
        });

        this.socket.on('play now', function() {
            $.publish( 'play-now' );
        });

        this.socket.on('move forward', function(data) {
            $.publish( 'move-forward', data );
        });
        
        this.socket.on('video ended', function() {
            $.publish( 'video-ended' );
        });
    },

    _bindSubscribers: function () {
        var that = this;

        $.subscribe('user-message-sent', function(event, message) {
            that.socket.emit('chat message', message.userName, message.userMessage);
        });

        $.subscribe('video-sent', function(event, message) {
            that.socket.emit('add video', message);
        });

        $.subscribe('tomato-thrown', function(event, message) {
            that.socket.emit('blame');
        });

        // Not tested
        $.subscribe('user-name-changed', function(event, message) {
            audience.users[that.socket.socket.sessionid].name = message.userName;
        });
    }
};
