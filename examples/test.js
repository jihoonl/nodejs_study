#!/usr/bin/env node

// Node.js client relays rosbridge message

var ROS = require('./ros_bundle').ROS;
var ros = new ROS();

ros.connect('ws://localhost:9090');

var io = require('socket.io-client');
var socket = io.connect('localhost',{port:9091});

socket.on('connect',function() { 
  console.log('socket connected');
});

for (var i=0;i<10;i++)
  socket.emit('hello', {user:'me',msg:'whazzzup?'});

