let loaded = (eventLoaded) => {

    window.alert("landing page loaded");
    console.log(eventLoaded);
    debugger;
    let myform = document.getElementById('idform');
    myform.addEventListener('submit', (eventSubmit) => {

        eventSubmit.preventDefault()
        let nombre = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let mensaje = document.getElementById('message').value;

        if (nombre.length == 0) {
            alert("Nombre requerido")
            nombre.focus()
            return;
        }

        if (email.length == 0) {
            alert("Nombre requerido")
            email.focus()
            return;
        }

        if (mensaje.length == 0) {
            alert("Nombre requerido")
            mensaje.focus()
            return;
        }
    })
}

window.addEventListener("DOMContentLoaded", loaded);