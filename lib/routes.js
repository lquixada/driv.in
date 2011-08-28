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
    createRoomIfNotExist(name);

    res.redirect('/' + name);
  });

  app.get('/:id', function(req, res) {
    var room = app.rooms[req.params.id];
    if (!room) { return res.send(404); }

    res.render('room', { layout: false, room: req.params.id });
  });

  // TODO: move to new file
  app.io.sockets.on('connection', function(socket) {
    console.log('connected' + socket);

    socket.on('join', function(roomId) {
      console.log(roomId);
      var room = createRoomIfNotExist(roomId);
      room.addUser(socket);

      socket.on('add video', function(url) {
          YouTube.onGetInfo(url, function(media){
              room.addMedia(media);
          });
      });
    });
  });
};

var createRoomIfNotExist = function(name){
    if(!app.rooms[name])
        app.rooms[name] = new app.Room(name, app.redisClient);

    return app.rooms[name];
}

var randomString = function (len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }

    return randomString;
}
