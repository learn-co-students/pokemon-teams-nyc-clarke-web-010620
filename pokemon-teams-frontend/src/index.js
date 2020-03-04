const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", 
    fetchAndRenderTrainerData(),
    buttonListener()
)

function fetchAndRenderTrainerData(){
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
        json.forEach(trainer => renderTrainer(trainer))
    })
}

function renderTrainer(trainer) {
    const main = document.getElementsByTagName('main')[0]
    const div = document.createElement('div')
    div.className = "card"
    div.dataset.id = trainer.id
    div.innerHTML = `
    <p>${trainer.name}</p>
    <button class="add-pokemon-button" data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul></ul>
    `
    main.append(div)
    trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

function renderPokemon(pokemon){
    const li = document.createElement('li')
    li.innerHTML = `
    ${pokemon.nickname} (${pokemon.species})
    <button class="release" data-pokemon-id=${pokemon.id}>Release</button>
    `
    const trainerDiv = document.querySelector(`[data-id='${pokemon.trainer_id}']`)
    const ul = trainerDiv.getElementsByTagName('ul')[0]
    ul.append(li)
}

function buttonListener(){
    document.addEventListener("click", function(event){
        if (event.target.className === "add-pokemon-button") {
            addPokemon(event.target)
        }
        if (event.target.className === "release") {
            releasePokemon(event.target)

        }
    })
}

function addPokemon(button){
    const trainerDiv = button.parentNode
    const ul = trainerDiv.getElementsByTagName('ul')[0]
    const pokemonCount = ul.childElementCount
    if (pokemonCount >= 6) {
        alert("You can have a maximum of 6 Pokemon")
    }
    else
    newPokemon(trainerDiv)
}

function newPokemon(trainerDiv) {
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            trainer_id: `${trainerDiv.dataset.id}`
        })
    })
    .then(resp => resp.json())
    .then(json => renderPokemon(json))
}

function releasePokemon(button) {
    const pokemonId = button.dataset.pokemonId
    return fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": 'application/json'
        }
    })
.then(resp => resp.json())
.then(button.parentNode.innerHTML = "")
}