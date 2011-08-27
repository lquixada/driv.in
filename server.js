var express = require( 'express' ),
    app = express.createServer();

require('nko')('YJfSFoK4/CL4kLGY');

var http = require('http');

app.listen(process.env.NODE_PORT || 8001);

app.use( express.static( __dirname+'/public', { maxAge: 0 } ) );

app.get('/', function(req, res){
    res.send('Go Horse Brazil\n');
});
