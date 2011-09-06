var Room = requireLib('room');

module.exports = function(app) {
    app.io = require('socket.io').listen(app);
    app.io.sockets.on('connection', function(socket) {
        console.log('connected' + socket.id);

        socket.on('disconnect', function () {
            console.log('user disconnected:' + socket.id);

            Room.userLeave(socket, function(u){
                app.io.sockets.emit('user leave', {id: socket.id});
            });
        });

        socket.on('join', function(roomId, userName) {
            socket.userName = userName;

            console.log('join ' + roomId);
            Room.findOrCreate(roomId, function(room){
                room.addUser(socket);

                room.broadcast('user join', {id: socket.id, name: socket.userName});

                socket.on('blame', function() {
                    if(room.playing()){
                        room.blame();
                    }
                });

                socket.on('chat message', function(userName, userMessage) {
                    room.broadcast('chat message', {
                        userId: socket.id,
                        userName: escape(userName),
                        userMessage: escape(userMessage)
                    });
                });
            });
        });
    });
};