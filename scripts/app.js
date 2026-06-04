
const socket = io();

let nombreUsuario = "";
while (!nombreUsuario.trim()) {
    nombreUsuario = prompt("Introduce tu nombre para entrar al chat:");
}


const pantallaMensajes = document.getElementById('pantalla-mensajes');
const inputMensaje = document.getElementById('input-mensaje');
const btnEnviar = document.getElementById('btn-enviar');


function enviarMensaje() {
    const texto = inputMensaje.value.trim();
    
    if (texto !== "") {
        
        socket.emit('mensaje_al_servidor', {
            usuario: nombreUsuario,
            mensaje: texto
        });
        
        inputMensaje.value = ""; 
        inputMensaje.focus();  
    }
}

btnEnviar.addEventListener('click', enviarMensaje);


inputMensaje.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        enviarMensaje();
    }
});


socket.on('mensaje_al_cliente', (data) => {
    
    const nuevaBurbuja = document.createElement('div');
    nuevaBurbuja.classList.add('burbuja');
    
    if (data.usuario === nombreUsuario) {
        nuevaBurbuja.classList.add('enviado'); 
        nuevaBurbuja.innerHTML = `${data.mensaje}`;
    } else {
        nuevaBurbuja.classList.add('recibido'); 
        nuevaBurbuja.innerHTML = `<strong>${data.usuario}</strong> ${data.mensaje}`;
    }
    
    
    pantallaMensajes.appendChild(nuevaBurbuja);
    
    
    pantallaMensajes.scrollTop = pantallaMensajes.scrollHeight;
});
