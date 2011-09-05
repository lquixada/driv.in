process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
    // if(Node.env === 'production') {
    //     process.exit(1);
    // }
});

require('./support');
requireLib('javascriptSupport');

console.log('Loading ' + Node.env + ' configuration');
Node.config = require('./environments/' + Node.env);

