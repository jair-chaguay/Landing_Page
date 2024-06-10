window.addEventListener("DOMContentLoaded",(eventLoaded=>{
    console.log("DOM cargado");
    let formulario = document.getElementById('formulario');
    if(!formulario){
        console.error("Formulario no encontrado");
        return;
    }    
}))

let loaded = (eventLoaded) => {

    let formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        let name = document.getElementById('nombre').value;
        let mail = document.getElementById('email').value;
        let message = document.getElementById('mensaje').value;
        
        let datos = {
            nombre: name,
            email: mail,
            mensaje: message
        };
        fetch('https://landing-bfe0c-default-rtdb.firebaseio.com/collection.json', {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(respuesta => respuesta.json())
            .then(datos => {
                console.log(datos); 
            })
            .catch(error => console.error(error));
    });
}

async function obtenerDatos(){
    let url= "https://landing-bfe0c-default-rtdb.firebaseio.com/collection.json";
    let respuesta =await fetch(url);

    if(!respuesta.ok){
        console.error("Error: ", respuesta.status);
        return;
    }

    let datos=  await respuesta.json();
    console.log(datos);
}

window.addEventListener("DOMContentLoaded", loaded);

