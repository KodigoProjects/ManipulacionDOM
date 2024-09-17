const apiURL = 'https://rickandmortyapi.com/api/character';
let allCharacters = []; // Variable global para guardar todos los personajes

// Obtengo los personajes
async function traerPersonajes() {
    try {
        const response = await fetch(apiURL);

        (!response.ok) ? console.log('Error al obtener los personajes') : console.log('Personajes obtenidos');
        const data = await response.json();

        allCharacters = data.results; // Guardo los personajes en la variable global
        Datos(allCharacters); // Muestra los personajes

    } catch (error) {
        console.error(error);
    }
}

// Función para mostrar personajes en el DOM
function Datos(characters) {
    const contenedor = document.getElementById('characters-container');
    contenedor.innerHTML = ''; // Limpiar el contenedor

    characters.forEach(character => {
        const Elementos = document.createElement('div');
        Elementos.classList.add('character');

        Elementos.innerHTML = `
            <img src="${character.image}" alt="${character.name}" />
            <h3>${character.name}</h3>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Location: ${character.location.name}</p>
            <button class="btn-hide">Ver más información</button>
        `;

        contenedor.appendChild(Elementos);
        const boton = Elementos.querySelector('.btn-hide');
        boton.addEventListener('click', () => {
            const personaje = character.name;
            const direccion = `https://rickandmorty.fandom.com/wiki/${personaje}`;
            window.open(direccion, '_blank');
        });
    });
    mostrarBtnInfo();
}

// Función para mostrar y ocultar el botón de información
function mostrarBtnInfo() {
    const contenedor = document.querySelectorAll('.character');

    contenedor.forEach(contenedor => {
        const boton = contenedor.querySelector('.btn-hide');

        contenedor.addEventListener('mouseover', () => {
            boton.classList.remove('btn-hide');
            boton.classList.add('btn-show');
        });

        contenedor.addEventListener('mouseout', () => {
            boton.classList.remove('btn-show');
            boton.classList.add('btn-hide');
        });
    });
}

// Filtra los personajes basados en el texto ingresado en el input
function buscarPersonajes() {
    const input = document.getElementById('search-input');
    const filtro = input.value.toLowerCase();
    const personajesFiltrados = allCharacters.filter(character => character.name.toLowerCase().includes(filtro));
    Datos(personajesFiltrados);
}

// Escucha el evento input para búsqueda en tiempo real
document.getElementById('search-input').addEventListener('input', buscarPersonajes);

traerPersonajes();
