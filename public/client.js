var socket = io();

// send out LedOn message over socket
function ledON() {
    socket.emit('ledON');
}

// send out ledOFF message over socket
function ledOFF() {
    socket.emit('ledOFF');
}

// read the data from the message that the server sent and change the
// background of the webpage based on the data in the message
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
