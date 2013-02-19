#!/usr/bin/env node

var port = 8081;
var io = require('socket.io').listen(port);

console.log("Listen to port : " + port);
io.sockets.on('connection', function(socket) {
    console.log(socket);
    socket.on('turtle1',function(msg) {
      console.log(msg);
      });
});

