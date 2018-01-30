const io = require('socket.io')();
var crypto = require('crypto');
sockets = [];
messages = [];
var Realm = require('realm');
colors = ["black", "blue", "green", "orange", "sienna", "coral", "purple", "gold", "khaki", "royalblue", "silver", "olive", "orchid"];
const MessageSchema = {
  name: 'Message',
  properties: {
    client: 'string',
    color: 'string',
    data: 'string'
  }
}
var serverInfo = {version: "1.0.0", title: "Test Server", rooms: ['/']};

io.on('connection', (socket) => {
  console.log("new socket with id "+socket.id+" has connected and is ready to recieve messages.");
  var x = crypto.createHash('md4').update(socket.id).digest("hex");
  console.log("socket with id "+socket.id+"has been sent it's anonid which is "+x);
  socket.name = String(x);
  sockets.push(socket);
  var colorChoice = colors[Math.floor(Math.random() * colors.length)];
  
  socket.emit("identification", {id: x, color: colorChoice});
  socket.emit("messagelist", messages);
  socket.emit("message", {client: "Server", color: "red", data: "Welcome!"});
  socket.emit("version", serverInfo.version);
  socket.emit("serverinfo", serverInfo);
  
  socket.on('disconnect', function () {
    sockets.splice(sockets.indexOf(socket), 1);
    console.log('client left');
  });
  socket.on('message', function(message) {
    messages.push(message);
    if (messages.length > 10) {
      messages.shift();
    }
    io.emit("message", message);
    console.log("sent a message");
  });
});

setInterval(function () {
    io.emit("version", serverInfo.version);
}, 60000);

const port = 8000;
io.listen(port);
console.log('listening on port ', port);