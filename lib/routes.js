module.exports = function(app) {
  app.get('/', function(req, res) {
      res.render('index', { layout: false, rooms: app.rooms });
  });

  app.get('/healthcheck', function(req, res) {
    res.send(200);
  });

  app.post('/rooms', function(req, res) {
    var name = req.body.name;
    app.rooms[name] = new app.Room(name, app.redisClient);
    res.redirect('/' + name);
  });

  app.get('/:id', function(req, res) {
    var room = app.rooms[req.params.id];
    if (!room) { return res.send(404); }

    res.render('room', { layout: false, room: req.params.id });
  });

  app.io.sockets.on('connection', function(socket) {
    console.log('connected' + socket);

    socket.on('join', function(roomId) {
      console.log(roomId);
      var room = app.rooms[roomId];
      room.addUser(socket);

      socket.on('add video', function(url) {
        var media = {url: url, name: 'name', thumb: 'thumb'};
        room.addMedia(media, function(err) {
          console.log(err);
        });
      });

    });

  });


};


