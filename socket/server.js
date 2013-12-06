var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(5885);

app.configure(function(){
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.bodyParser());
}); 

app.get('/', function (req, res) {
	res.writeHeader(200, {"Content-Type": "text/html"});
	res.write("nothing...");
	res.end();
});

io.sockets.on('connection', function (socket) {

  socket.emit('handshake', { message: 'pong' });  

  socket.on('request', function (data) {
    console.log(data);
    socket.emit('response', { result: 'harr' });
  });

});