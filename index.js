const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(8000, function () {
  console.log('listening for requests on port number 8000');
});

app.use(express.static('public'));

const io = socket(server);
io.on('connection', (socket) => {
    console.log('socket connection successful', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
