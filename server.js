var express = require('express');
var http = require('http');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var serialport = require('serialport');

app.use(express.static('public'));

if(!process.argv[2]) {
    console.error('Usage: node '+process.argv[1]+' SERIAL_PORT');
    process.exit(1);
}

var serial = new serialport.SerialPort(process.argv[2], {
    parser: serialport.parsers.readline('\r\n')
});

io.on('connect', function(socket) {
    console.log('a user connected');

    socket.on('ledON', function() {
        console.log('ledON');
        serial.write('h');
    });

    socket.on('ledOFF', function() {
        console.log('ledOFF');
        serial.write('l');
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

serial.on('data', function(data) {
    //console.log('data:', data);
    io.emit('data', data);
});


server.listen(8000, function() {
    console.log('listening on *:8000');
});
