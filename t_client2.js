#!/usr/bin/env node

var io = require('socket.io-client');
var WebSocket = require('ws');
var name = 'turtle2';
var type = 'robot';

var ROS = require('./ros_bundle').ROS;
var ros = new ROS();
ros.connect('ws://localhost:9091');
    
ros.on('connection',function() {
  var socket = io.connect('http://localhost:8081');
  socket.emit('information',{type:type,name:name});
  
  socket.on('connect', function() {
    socket.on('info',function(msg) {
      console.log(msg);
    });

    socket.on(name,function(msg) {
      if (ros.socket.readyState !== WebSocket.OPEN) {
        ros.once('connection', function() {
          ros.socket.send(msg);
        });
      }
      else {
        ros.socket.send(msg);
      }
//    console.log(msg);
    });

    socket.on('disconnect',function() {
      console.log('disconnected');
    });
  });
});

ros.on('error',function(err) {
    console.log('Rosbridge is not up yet');
    console.log(err);
  });
