window.addEventListener("DOMContentLoaded", (eventLoaded => {
    console.log("DOM cargado");
    let formulario = document.getElementById('subscriptionForm');
    if (!formulario) {
        console.error("Formulario no encontrado");
        return;
    }
}))

let loaded = (eventLoaded) => {

    let formulario = document.getElementById('subscriptionForm');
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();



        let name = document.getElementById('first_name').value;
        let lastName = document.getElementById('last_name').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let birth_date = document.getElementById('birth_date').value;
        let country = document.getElementById('country').value;
        let tipoSub = document.querySelector('input[name="subscription_plan"]:checked').value;


        let datos = {
            nombre: name,
            apellido: lastName,
            mail: email,
            telefono: phone,
            fechaNacimiento: birth_date,
            ciudad: country,
            [tipoSub]: true 
        };


        fetch('https://repositorio-remoto-default-rtdb.firebaseio.com/coleccion.json', {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(respuesta => respuesta.json())
            .then(datos => {
                alert("¡Tu respuesta ha sido guardada!")
                loadVotes();
                console.log(datos);
            })
            .catch(error => console.error(error));
    });
}

let loadVotes = async () => {
    const url = "https://repositorio-remoto-default-rtdb.firebaseio.com/coleccion.json";

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(`Error al cargar datos: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        console.log(datos); // Mostrar los datos en la consola (puedes cambiar esta parte según tu necesidad)

        // Contadores para cada tipo de suscripción
        let countBasic = 0;
        let countStandard = 0;
        let countPremium = 0;

        // Contar las suscripciones en los datos recibidos
        for (let key in datos) {
            let vote = datos[key];
            if (vote['basic']) countBasic++;
            if (vote['standard']) countStandard++;
            if (vote['premium']) countPremium++;
        }

        // Actualizar la tabla en el DOM con los datos contados
        let tablebody = document.getElementById('tablebody');
        tablebody.innerHTML = '';

        let templateBasic = `<tr>
                                <td>Basic</td>
                                <td>${countBasic}</td>
                            </tr>`;
        let templateStandard = `<tr>
                                <td>Standard</td>
                                <td>${countStandard}</td>
                            </tr>`;
        let templatePremium = `<tr>
                                <td>Premium</td>
                                <td>${countPremium}</td>
                            </tr>`;

        tablebody.innerHTML = templateBasic + templateStandard + templatePremium;

    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
};


window.addEventListener("DOMContentLoaded", loaded);

