var socket = io();
var song = document.getElementById('song1');

//socket.on('connect', function() {});
// socket.on('disconnect', function() {});

function ledON() {
    socket.emit('ledON');
}

function ledOFF() {
    socket.emit('ledOFF');
}

function playSong1() {
    socket.emit('playSong1');
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

song1.autoplay = true;
song1.load();
