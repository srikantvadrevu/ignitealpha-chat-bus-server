const express = require('express');
const socket = require('socket.io');

let fs = require('fs');
let expApp = express();

let options = {
  key: fs.readFileSync('server_key.pem'),
  cert: fs.readFileSync('server_cert.pem')
};

let app = require('https').createServer(options,expApp).listen(8000);
let io = socket.listen(app);

expApp.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('socket connection successful', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
