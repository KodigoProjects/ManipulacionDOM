const apiURL = 'https://rickandmortyapi.com/api/character';

// obtengo los personakes
async function traerPersonajes() {
    try {
        const response = await fetch(apiURL);

        (!response.ok) ? console.log('Error al obtener los personajes') : console.log('Personajes obtenidos');
        const data = await response.json();

        Datos(data.results); //AQUI SE LOS PASO A LA FUNCION QUE LOS MUESTRA

    } catch (error) {
        console.error(error);
    }
}

// esto es para mostrarlos en el dom
function Datos(characters) {
    // este es el id del contenedor donde se van a mostrar los personajes
    const contenedor = document.getElementById('characters-container');

    contenedor.innerHTML = ''; // Limpiar el contenedor para meterrle los nuevos personajes

    characters.forEach(character => {

        const Elementos = document.createElement('div');
        Elementos.classList.add('character'); //le agrego una calse a ese div precioso que hice

        //dentro del div agrego las cosas y listo
        Elementos.innerHTML = `
            <img src="${character.image}" alt="${character.name}" />
            <h3>${character.name}</h3>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Location: ${character.location.name}</p>
        `;

        contenedor.appendChild(Elementos);
    });
}

traerPersonajes();
