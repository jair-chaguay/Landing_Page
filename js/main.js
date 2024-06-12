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
        let movie =document.getElementById('peli').value;
        let message = document.getElementById('mensaje').value;

        let datos = {
            nombre: name,
            email: mail,
            pelicula: movie,
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
                alert("¡Tu respuesta ha sido guardada!")
                obtenerDatos();
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
    let votesMap = new Map();
    for(let key in datos){
        let votes =datos[key];
        let favPeli = votes['movie'];
        let conteo =votesMap.has(favPeli)?votesMap.get(favPeli)+1:1; 
        votesMap.set(favPeli, conteo);
    }
    total= 0;
    tbody.innerHTML=''
    console.log(votesMap);

    for(let key in votesMap.keys()){
       
        
        tbody.innerHTML += template;
        total += votesMap.get(key);
    }
}

window.addEventListener("DOMContentLoaded", loaded);

