var socket = io();

// socket.on('connect', function() {});
// socket.on('disconnect', function() {});

function magic() {
    socket.emit('magic');
}
