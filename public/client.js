var socket = io();

// socket.on('connect', function() {});
// socket.on('disconnect', function() {});

function ledON() {
    socket.emit('ledON');
}

function ledOFF() {
    socket.emit('ledOFF');
}

socket.on('data', function(data) {
    switch(data) {
        case 'light':
            document.body.style.backgroundColor = 'white';
            break;
        case 'shade':
            document.body.style.backgroundColor = 'black';
            break;
    }
});
