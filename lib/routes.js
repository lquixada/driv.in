var YouTube = require('./youtube');

module.exports = function(app) {
  app.get('/', function(req, res) {
      res.render('index', { layout: false, rooms: app.rooms,
                            newRoom: randomString(7) });
  });

  app.get('/healthcheck', function(req, res) {
    res.send(200);
  });

  app.post('/rooms', function(req, res) {
    var name = req.body.name;
    createRoomIfNotExist(app, name);

    res.redirect('/' + name);
  });

  app.get('/:id', function(req, res) {
    var room = app.rooms[req.params.id];
    if (!room) { return res.send(404); }

    room.playlist(function(playlist){
      res.render('room', { layout: false, room: room, playlist: playlist });
    });
  });

  // TODO: move to new file
  app.io.sockets.on('connection', function(socket) {
    console.log('connected' + socket.id);
    
    socket.on('disconnect', function () {
      console.log('user disconnected:' + socket.id);
      app.io.sockets.emit('user leave', {id: socket.id});
    });

    socket.on('join', function(roomId) {
      console.log('join ' + roomId);
      var room = createRoomIfNotExist(app, roomId);

      room.users.forEach(function(user) {
        socket.emit('user join', {id: user.id, name: 'fulaninho'});
      });

      room.addUser(socket);

      room.broadcast('user join', {id: socket.id, name: 'fulaninho'});

      if (room.playing()) {
         console.log('playing. need to move forward');
         room.moveUserForward(socket);
      }

      socket.on('add video', function(url) {
          YouTube.onGetInfo(url, function(media){
              room.addMedia(media);
          });
      });

      socket.on('blame', function() {
          if(room.playing()){
              room.blame();
          }
      });

      socket.on('chat message', function(userName, userMessage) {
        room.broadcast('chat message', {userId: socket.id, userName: userName, userMessage: userMessage});
      });
    });
  });
};

var createRoomIfNotExist = function(app, name){
    if(!app.rooms[name]){
        console.log('creating room: ' + name);
        app.rooms[name] = new app.Room(name, app.redisClient);
    }
    return app.rooms[name];
};

var randomString = function (len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }

    return randomString;
}
