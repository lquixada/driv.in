process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
    // if(Node.env === 'production') {
    //     process.exit(1);
    // }
});

require('./support');

var express = require('express');
var   redis = require('redis');

console.log('Loading ' + Node.env + ' configuration');
Node.config = require('./environments/' + Node.env);

console.log('Creating server and general configuration');
global.app = express.createServer();
app.configure(Node.env, function(){
    app.set('view engine', 'html');
    app.set('views', rootPath('views'));

    app.register('.html', require('ejs'));

    app.use(express.logger());
    app.use(express.errorHandler({ showStack: true,
                                   dumpExceptions: true }));

    app.use(express.bodyParser());
    app.use(express.favicon(rootPath('public/favicon.ico')));
    app.use(express.static(rootPath('public'), { maxAge: 0 }));

    app.use(app.router);
});

app.redisClient = redis.createClient(Node.config.redis.port,
                                     Node.config.redis.host);

console.log('Loading routes');
require('./routes')(app);
require('./events')(app);

console.log('Starting server');
app.listen(process.env.NODE_PORT ||  Node.config.server.port);

