module.exports = function(app) {
  app.get('/healthcheck', function(req, res) {
    res.send(200);
  });

  app.get('/', function(req, res){
    res.render('index', { 
      layout: false
    }); 

    // app.io.sockets.on('connection', function(socket) {
    //   console.log('conectado' + socket);
    //   socket.emit('video started');
    // });

    setTimeout(function() {
      var timer = app.Timer.create("XPTO:video", 20);
      timer.start();
      app.io.sockets.emit('video started');

      timer.on('current time', function(currentTime) {
        console.log(currentTime + " seconds passed");
      });
      timer.on('timer finished', function() {
        app.io.sockets.emit('video ended');
        console.log('video ended');
      });
    }, 10000);
  });
};
