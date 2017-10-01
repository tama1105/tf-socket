const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  if (req.url=='/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
  }
  if (req.url=='/src/index.js') {
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.end(fs.readFileSync(__dirname + '/src/index.js', 'utf-8'));
  }
});
const io = require('socket.io').listen(server);
io.on("connection", (socket) => {

})
server.listen(3000);
