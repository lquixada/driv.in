//Just beacuse nodeko needs this
if (process.env.NODE_ENV == 'production') {
  require('nko')('YJfSFoK4/CL4kLGY', function(err, res) {
    if (err) throw err;
    res.on('data', function(d) { console.log(d.toString()); });
  });
}

var express = require('express');
var app = express.createServer();
var routes = require('./lib/routes');

app.configure(function() {
  app.use(app.router);
  app.set('views', __dirname + '/views');
  app.register('.html', require('ejs'));
  app.set('view engine', 'html');
  app.use(express.static(__dirname + '/public', { maxAge: 0 }));
});

app.io = require('socket.io').listen(app);
app.Timer = require('./lib/timer');

routes(app);

app.listen(process.env.NODE_PORT || 8001);
