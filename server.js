if (process.env.NODE_ENV == 'production') {
  require('nko')('YJfSFoK4/CL4kLGY', function(err, res) {
    if (err) throw err;
    res.on('data', function(d) { console.log(d.toString()); });
  });
}

var express = require( 'express' ),
    app = express.createServer();

app.use(express.static(__dirname + '/public', { maxAge: 0 }));

app.io = require('socket.io').listen(app);

app.get('/', function(req, res){
    res.send('Go Horse Brazil\n');
});

app.listen(process.env.NODE_PORT || 8001);
