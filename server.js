require('nko')('YJfSFoK4/CL4kLGY');

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Go Horse Brazil\n');
}).listen(process.env.NODE_PORT || '8001');
