const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.getElementsByTagName('main')[0]

document.addEventListener('DOMContentLoaded', () => {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(trainers => trainers.forEach(trainer => trainerCards(trainer)))
    
    function trainerCards(trainer){
        let trainerCard = document.createElement('div')
        trainerCard.className = "card"
        trainerCard.dataset.id = trainer.id
        trainerCard.innerHTML =
            `<p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>`
        const ul = document.createElement('ul')
        trainerCard.append(ul)
        main.append(trainerCard)
        trainer.pokemons.forEach(pokemon => listPokemon(pokemon))

    function listPokemon(pokemon){
        let pokemonEntry = document.createElement('li')
        pokemonEntry.innerHTML =
            `${pokemon.nickname} (${pokemon.species}) <button class="release" data-id="${pokemon.id}">Release</button>`
        ul.append(pokemonEntry)
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