let loaded = (eventLoaded) => {

    let formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        let nombre = document.getElementById('nombre').value;
        let email = document.getElementById('email').value;
        let mensaje = document.getElementById('mensaje').value;
        let datos = {
            nombre: nombre,
            email: email,
            mensaje: mensaje
        };
        fetch('https://repositorio-remoto-default-rtdb.firebaseio.com/coleccion', {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(respuesta => respuesta.json())
            .then(datos => {
                console.log(datos); // Imprimir la respuesta del
                servidor
            })
            .catch(error => console.error(error));
    });
}

window.addEventListener("DOMContentLoaded", loaded);