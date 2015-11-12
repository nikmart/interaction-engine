var socket = io();

//socket.on('connect', function() {});
// socket.on('disconnect', function() {});

function ledON() {
    socket.emit('ledON');
}

function ledOFF() {
    socket.emit('ledOFF');
}

socket.on('data', function(data) {
    console.log('data:', data);
    switch(data) {
        case 'light':
            document.body.style.backgroundColor = 'white';
            console.log('white')
            break;
        case 'shade':
            document.body.style.backgroundColor = 'black';
            console.log('black');
            break;
    }
});
