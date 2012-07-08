
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , app = require('./init').app
  , socket = require('socket.io');

var server = http.createServer(app);

var io = socket.listen(server);
io.set('log level', 1);

var users = {};

io.sockets.on('connection', function (socket) {

  socket.emit('connected ok', {msg : socket.id});

  socket.on('set nick', function (data) {
    var previousNick = users[socket.id] || socket.id;
    users[socket.id] = data;
    var changeMsg = {msg : 'user ' + previousNick + ' is now "' + data + '"', previousNick: previousNick};

    socket.broadcast.emit("nick changed", changeMsg);
  });

  socket.on('data_from_client', function (data) {
    console.log(data.fromClient);
  });

  socket.on('mousemoving', function(data){
    socket.broadcast.emit("display other mouse", data);    
  })

  socket.on('disconnect', function () {
    io.sockets.emit('user disconnected');
  });
});

server.listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});

