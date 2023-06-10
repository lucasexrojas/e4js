// Obtener elementos del DOM
const pokemonForm = document.getElementById("form"); // Formulario
const pokemonContainer = document.getElementById("container"); // Contenedor del Pokémon
const pokemonNumberInput = document.getElementById("input-number"); // input número del Pokémon
const searchButton = document.querySelector(".btn"); // Botón de búsqueda

// Función para obtener los datos de un Pokémon de la API
const getPokemon = async (pokemonNumber) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
};

// Reestructurar los datos del Pokémon traidos de la API
const destructuringPokemon = (pokemon) => {
    return {
        name: pokemon.name.toUpperCase(), // Nombre en mayúscula
        types: pokemon.types, // Tipos
        image: pokemon.sprites.other.home.front_default, // Imagen del Pokémon
        height: pokemon.height / 10, // Altura dividida
        weight: pokemon.weight / 10, // Peso dividido
    };
};

// Generar el <p> de los tipos de un Pokémon
const typePokemon = (types) => {
    return types
        .map((tipo) => {
            return `<p class="${tipo.type.name} type">${tipo.type.name}</p>`;
        })
        .join("");
};

// Generar el HTML del Pokémon
const templatePokemon = (pokemon) => {
    if (!pokemon) {
        // Si no se encuentra un Pokémon válido...
        pokemonContainer.innerHTML = "No se encontró un Pokémon válido.";
        return;
    }

    const { name, image, types, height, weight } = destructuringPokemon(pokemon);

    const pokemonHTML = `
    <div class="info">
        <h2>${name}</h2>
        ${typePokemon(types)}
        <p class="weight">Peso: ${weight} kg</p>
        <p class="height">Altura: ${height} m</p>
    </div>
    <img class="img" src="${image}" alt="${name}">
    `;

    pokemonContainer.innerHTML = pokemonHTML;
    pokemonContainer.classList.add("card");
};

// Renderiza un Pokémon según su número
const renderPokemon = async (pokemonNumber) => {
    try {
        const pokemon = await getPokemon(pokemonNumber);
        templatePokemon(pokemon);
    } catch (error) {
        console.error(error);
    }
};

// Manejar el envío del formulario
const submitHandler = (e) => {
    e.preventDefault();
    const pokemonNumber = pokemonNumberInput.value;
    if (!pokemonNumber) {
        // Si no se ingresa un número...
        pokemonContainer.innerHTML = "Por favor, ingresa un número para buscar el Pokémon.";
        return;
    }
    renderPokemon(pokemonNumber);
    pokemonForm.reset();
};

const init = () => {
    pokemonForm.addEventListener("submit", submitHandler); // Agregar evento al envío del formulario
    searchButton.addEventListener("click", async () => renderPokemon(pokemonNumberInput.value)); // Agregar evento al clic del botón de búsqueda
};


init();
