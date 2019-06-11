const express = require('express'); // web server application
const http = require('http');				// http basics
const app = express();							// instantiate express server
const server = http.Server(app);		// connects http library to server
const serverPort = 8000;

const io = require('socket.io')(server);	// connect websocket library to server

const SerialPort = require('serialport');	// serial library
const Readline = require('@serialport/parser-readline')

// use express to create the simple webapp
app.use(express.static('public'));		// find pages in public directory

// check to make sure that the user calls the serial port for the arduino when
// running the server
if(!process.argv[2]) {
    console.error('Usage: node '+process.argv[1]+' SERIAL_PORT');
    process.exit(1);
}

// start the serial port connection and read on newlines
const port = new SerialPort(process.argv[2]);
const parser = port.pipe(new Readline({
    delimiter: '\r\n'
}));

// this is the websocket event handler and say if someone connects
// as long as someone is connected, listen for messages
io.on('connect', function(socket) {
    console.log('a user connected');

    // if you get the 'ledON' msg, send an 'H' to the arduino
    socket.on('ledON', function() {
        console.log('ledON');
        port.write('H');
    });

    // if you get the 'ledOFF' msg, send an 'H' to the arduino
    socket.on('ledOFF', function() {
        console.log('ledOFF');
        port.write('L');
    });

    // if you get the 'disconnect' message, say the user disconnected
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

// this is the serial port event handler.
// read the serial data coming from arduino - you must use 'data' as the first argument
// and send it off to the client using a socket message
parser.on('data', function(data) {
    console.log('data:', data);
    io.emit('server-msg', data);
});

// start the server and say what port it is on
server.listen(serverPort, function() {
    console.log('listening on *:%s', serverPort);
});
