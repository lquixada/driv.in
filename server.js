process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
  process.exit(1);
});

var express = require('express');
var app = express.createServer();
var routes = require('./lib/routes');
var redis  = require('redis');

app.configure(function() {
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(app.router);
  app.set('views', __dirname + '/views');
  app.register('.html', require('ejs'));
  app.set('view engine', 'html');
  app.use(express.static(__dirname + '/public', { maxAge: 0 }));
  app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
});

var RoomsHelper = require('./lib/roomsHelper.js');
app = RoomsHelper.all(app);

app.redisClient = redis.createClient( 6379, 'localhost');
app.io = require('socket.io').listen(app);
app.io.configure('production', function(){
  app.io.set('log level', 1);
});
 
app.Timer = require('./lib/timer');
app.Room = require('./lib/room');
app.rooms = {
    'NodeKo2011': new app.Room('NodeKo2011', app.redisClient)
};

routes(app);

app.use(function(req, res, next){
  res.render('404', { layout:false, status: 404, url: req.url });
});

app.use(function(err, req, res, next){
  res.render('500', {
      layout: false
    , status: err.status || 500
    , error: err
  });
});

app.get('/404', function(req, res, next){
  next();
});

app.get('/500', function(req, res, next){
  next(new Error('error'));
});

app.listen(process.env.NODE_PORT || 8001);
