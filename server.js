var express = require('express');
var http = require('http');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var SerialPort = require('serialport').SerialPort;

app.use(express.static('public'));

if(!process.argv[2]) {
    console.error('Usage: node '+process.argv[1]+' SERIAL_PORT');
    process.exit(1);
}

var serial = new SerialPort(process.argv[2]);

io.on('connect', function(socket) {
    console.log('a user connected');

    socket.on('magic', function() {
        serial.write('magic');
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

//serial.on('data', function(data) {});

server.listen(8000, function() {
    console.log('listening on *:8000');
});
