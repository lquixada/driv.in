var YouTube = require('./youtube');
var escape  = require('sanitizer').escape;

module.exports = function(app) {
    app.get('/', function(req, res) {
        var c = 0, rooms = {};
        for(var roomName in app.rooms){
            if(app.rooms.hasOwnProperty(roomName)){
                if(c > 3){
                    break;
                }

                rooms[roomName] = app.rooms[roomName];
                c++;
            }
        }

        res.render('index', { layout: false, rooms: rooms,
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
    if (!room) { return res.render('404', { layout:false, status: 404, url: req.url }); }

    room.playlist(function(playlist){
      res.render('room', { layout: false, room: room, playlist: playlist });
    });
  });

  // TODO: move to new file
  app.io.sockets.on('connection', function(socket) {
    console.log('connected' + socket.id);

    socket.on('disconnect', function () {
      console.log('user disconnected:' + socket.id);

      for(roomId in app.rooms){
        if(app.rooms.hasOwnProperty(roomId)){
          app.rooms[roomId].removeUser(socket);
        }
      }

      app.io.sockets.emit('user leave', {id: socket.id});
    });

    socket.on('join', function(roomId, userName) {
      socket.userName = userName;

      console.log('join ' + roomId);
      var room = createRoomIfNotExist(app, roomId);

      room.users.forEach(function(user) {
        socket.emit('user join', {id: user.id, name: user.name});
      });

      room.addUser(socket);

      room.broadcast('user join', {id: socket.id, name: socket.userName});

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
        room.broadcast('chat message', {
                 userId: socket.id,
               userName: escape(userName),
            userMessage: escape(userMessage)
        });
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
