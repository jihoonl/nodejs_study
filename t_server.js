#!/usr/bin/env node

var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

io.set('log level',1);

var clients = {};
var concertlist_update_name = 'concertlist_update';

clients['robot'] = {};
clients['interface'] = {};
server.listen(8081);

io.sockets.on('connection', function (socket) {
  socket.emit('info', { info:'you are connected' });
  socket.on('information', function (data) {
    console.log(data.type,data.name,'has joined');
    clients[data.type][data.name] = socket;

    socket.on('publish',function(msg) {
      clients['robot'][msg.name].emit(msg.name,msg.data);
      });

//      console.log(clients['robot']);
    informAllInterfaces();


    socket.on('disconnect', function() {
      console.log(data.type,data.name,'has left');
      delete clients[data.type][data.name];
      informAllInterfaces();

    });
  });
});

function informAllInterfaces()
{
  var list = Object.keys(clients['robot']);
  for(var n in clients['interface'])
  {
    var socket = clients['interface'][n];
    socket.emit(concertlist_update_name,{list:list});
  }
}
