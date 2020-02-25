    document.addEventListener("DOMContentLoaded", event => {
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`
    const mainDiv = document.getElementById("trainerList")

    fetch(`${TRAINERS_URL}`)
    .then(resp=> resp.json())
    .then(resp => resp.forEach(addTrainers))

    const addTrainers = trainer => {
        let div = document.createElement("div")
        div.className = "card"
        div.dataset.id = trainer.id
        div.innerHTML = 
        `<p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul data-name="pokemon">${(trainer.pokemons.map(addPokemon)).join("")}
        </ul>`
        mainDiv.append(div)
    }

    const addPokemon = pokemon =>{
        return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    }

    document.addEventListener("click", e => {
        if (e.target.dataset.trainerId) {
            let newPokemon = addPokemonToParty(e.target.dataset.trainerId).then(pokemon => {
                // find trainer
                // += the li string into the ul innerHTML
                addPokemon(pokemon)
            })
            // how to find an element by data-id
            // document.querySelector(`[data-id="${pokemon.trainer_id}"]`)
            console.log(newPokemon)
        } else if (e.target.className === "release"){
            releasePokemon(e.target.dataset.pokemonId)
            e.target.parentNode.remove()
        }
    })
        
    const addPokemonToParty = id => {
        let trainer = {
            "trainer_id": parseInt(id)
          }
        // add return here
          return fetch(`${POKEMONS_URL}`,{
        method: "POST",
        headers: {
            "content-type": 'application/json',
            "accept": "application/json"
        },
        body: JSON.stringify(trainer)
        }).then(resp=>resp.json())
    }

    const releasePokemon = id => {
        return fetch(`${POKEMONS_URL}/${id}`,{
        method: "DELETE",
        })
    }

})