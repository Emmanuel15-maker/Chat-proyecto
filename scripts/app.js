// 1. Conectar automáticamente al servidor de WebSockets
const socket = io();

// Si lo van a subir a la nube (Render), sustituyan la línea de arriba por su enlace:
// const socket = io('https://chat-de-emma.onrender.com');

// 2. Pedir el nombre del alumno al cargar la página
let nombreUsuario = "";
while (!nombreUsuario.trim()) {
    nombreUsuario = prompt("Introduce tu nombre para entrar al chat:");
}

// 3. Capturar los elementos del HTML
const pantallaMensajes = document.getElementById('pantalla-mensajes');
const inputMensaje = document.getElementById('input-mensaje');
const btnEnviar = document.getElementById('btn-enviar');

// 4. Función para capturar el texto y mandarlo al servidor
function enviarMensaje() {
    const texto = inputMensaje.value.trim();
    
    if (texto !== "") {
        // Enviar un objeto JSON con los datos por el WebSocket
        socket.emit('mensaje_al_servidor', {
            usuario: nombreUsuario,
            mensaje: texto
        });
        
        inputMensaje.value = ""; // Limpiar la caja de texto
        inputMensaje.focus();    // Dejar el cursor listo para escribir otra vez
    }
}

// Escuchar el clic del botón Enviar
btnEnviar.addEventListener('click', enviarMensaje);

// Escuchar si el usuario presiona la tecla 'Enter' en el teclado
inputMensaje.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        enviarMensaje();
    }
});

// 5. Escuchar los mensajes que retransmite el Servidor
socket.on('mensaje_al_cliente', (data) => {
    // Crear la burbuja de texto vacía
    const nuevaBurbuja = document.createElement('div');
    nuevaBurbuja.classList.add('burbuja');
    
    // LA MAGIA: Si el nombre del que escribió el mensaje es IGUAL a tu nombre de usuario...
    if (data.usuario === nombreUsuario) {
        nuevaBurbuja.classList.add('enviado');  // Se va a la derecha y verde claro
        nuevaBurbuja.innerHTML = `${data.mensaje}`;
    } else {
        nuevaBurbuja.classList.add('recibido');  // Se va a la izquierda y blanco
        nuevaBurbuja.innerHTML = `<strong>${data.usuario}</strong> ${data.mensaje}`;
    }
    
    // Agregar la burbuja a la pantalla del chat
    pantallaMensajes.appendChild(nuevaBurbuja);
    
    // Auto-scroll: Desplazar la pantalla automáticamente hacia abajo
    pantallaMensajes.scrollTop = pantallaMensajes.scrollHeight;
});
