const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" pokemonNumberModal = "${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

pokemonList.addEventListener('click', (pokemonClicked) => {
    const clickedPokemonId = pokemonClicked.target.closest('.pokemon').getAttribute('pokemonNumberModal');
    if (clickedPokemonId) {  
      const clickedPokemon = pokeApi.getPokemonModal(clickedPokemonId)
      // console.log(clickedPokemon)
      // const clickedPokemon2 = pokemons.find(pokemon => pokemon.number === clickedPokemonId);
      if (clickedPokemon) {
        // console.log("clickedPokemon")
        openModal(clickedPokemon);
      }
    }
  });
  
  function openModal(pokemonDetails) {
    // Lógica para preencher os detalhes na modal
    const modalDetails = document.getElementById("modalDetails");
    modalDetails.innerHTML = `   
            <div class="pokemon ${pokemonDetails.type}">
            <span class="number">#${pokemonDetails.number}</span>
            <span class="name">${pokemonDetails.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemonDetails.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemonDetails.gif}"
                     alt="${pokemonDetails.name}">
            </div>
            </div>
        
    
  `;

    // Exibe a modal
    const modal = document.getElementById("pokemonModal");
    modal.style.display = "block";

    // Adiciona um evento de clique ao botão de fechar
    const closeModalButton = document.getElementById("closeModal");
    closeModalButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
  