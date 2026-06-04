const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Le dice a Node.js que use la carpeta 'public' para servir la página web
app.use(express.static(__dirname + '/public'));

// Evento: Cuando un usuario se conecta a la página
io.on('connection', (socket) => {
    console.log('¡Alguien se conectó al servidor del chat!');

    // Evento: Cuando el servidor recibe un mensaje de algún cliente
    socket.on('mensaje_al_servidor', (data) => {
        // Broadcast: Reenvía el mensaje a TODOS los usuarios conectados
        io.emit('mensaje_al_cliente', data);
    });

    // Evento: Cuando alguien cierra la pestaña o se desconecta
    socket.on('disconnect', () => {
        console.log('Un usuario abandonó el chat.');
    });
});

// Arrancar el servidor en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});