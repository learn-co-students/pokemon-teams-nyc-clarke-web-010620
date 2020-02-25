const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.getElementById('trainer-card-area')
document.addEventListener('DOMContentLoaded', () => {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(trainers => trainers.forEach(trainer => trainerCards(trainer)))
    
    function trainerCards(trainer){
        let trainerCard = document.createElement('div')
        trainerCard.innerHTML =
            `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul id='${trainer.id}-pokemon'></ul></div>`
        main.append(trainerCard)
        trainer.pokemons.forEach(pokemon => listPokemon(pokemon))

    function listPokemon(pokemon){
        const cardPokemon = document.getElementById(`${trainer.id}-pokemon`)
        let pokemonEntry = document.createElement('li')
        pokemonEntry.innerHTML =
            `${pokemon.nickname} (${pokemon.species}) <button class="release" data-id="${pokemon.id}">Release</button>`
        cardPokemon.append(pokemonEntry)
    }

    trainerCard.addEventListener('click', (e) => {
        if (e.target.innerText === 'Add Pokemon'){
            if (e.target.nextElementSibling.childElementCount === 6){
                alert('You already have 6 pokemon. Release one first.')
            } else {
                fetch(POKEMONS_URL,{
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                        accept: 'application/json'
                    },
                    body: JSON.stringify({"trainer_id":trainer.id})
                })
                .then(resp => resp.json())
                .then(newPokemon => listPokemon(newPokemon))
            }
        } else if (e.target.innerText === 'Release') {
            fetch(`${POKEMONS_URL}/${e.target.dataset.id}`,{
                method: "DELETE",
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json'
                }
            })
            .then(e.target.parentNode.remove())
        }
    })
    }
})