var express = require('express');
var http = require('http');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var serialport = require('serialport');

// use express to create the simple webapp
app.use(express.static('public'));

// check to make sure that the user calls the serial port for the arduino when
// running the server
if(!process.argv[2]) {
    console.error('Usage: node '+process.argv[1]+' SERIAL_PORT');
    process.exit(1);
}

// start the seriaal port connection and read on newlines
var serial = new serialport.SerialPort(process.argv[2], {
    parser: serialport.parsers.readline('\r\n')
});

// start the socket connection and say if someone connects
io.on('connect', function(socket) {
    console.log('a user connected');

    // if you get the 'ledON' msg, send an 'h' to the arduino
    socket.on('ledON', function() {
        console.log('ledON');
        serial.write('h');
    });

    // if you get the 'ledOFF' msg, send an 'l' to the arduino
    socket.on('ledOFF', function() {
        console.log('ledOFF');
        serial.write('l');
    });

    // if you get the 'disconnet' message, say the user disconnected
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

// read the serial data coming back from the arduino
// and send it off to the client using a socket msg
serial.on('data', function(data) {
    console.log('data:', data);
    io.emit('data', data);
});

// start the server and say waht port it is on
server.listen(8000, function() {
    console.log('listening on *:8000');
});
