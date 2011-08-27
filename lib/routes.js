module.exports = function(app) {
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
    
    res.render('index', { layout: false, room: req.params.id }); 
  });


  //TODO:mover
  app.io.sockets.on('connection', function(socket) {
    console.log('connected' + socket);

    socket.on('join', function(roomId) {
      console.log(roomId);
      var room = app.rooms[roomId];
      room.addUser(socket);

      socket.on('add video', function(url) {
        room.addMedia(url, function(err) {
          console.log(err);
          if (!room.timer) {
            setTimeout(function() {
              room.timer = app.Timer.create(room.videoChannel, 20);
              room.timer.start();
   
              room.broadcast('video started');
         
              room.timer.on('current time', function(currentTime) {
                console.log(currentTime + " seconds passed");
              });
              room.timer.on('timer finished', function() {
                room.broadcast('video ended');
                console.log('video ended');
              });
            }, 10000);
          }
        });
      });

    });

  });


};


