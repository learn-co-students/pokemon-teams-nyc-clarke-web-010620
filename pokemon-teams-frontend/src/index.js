const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => trainers.forEach(addTrainer))
    
    function addTrainer(trainer) {
        let main = document.getElementsByTagName('main')[0]
        let div = document.createElement('div')
        div.className = "card"
        div.dataset.id = trainer.id
        
        div.innerHTML = `
        <p>${trainer.name}</p>
        <button class="Add Pokemon" data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul></ul>
        `
    
        let ul = div.getElementsByTagName('ul')[0]
        trainer.pokemons.forEach(pokemon => {
            let li = document.createElement('li')
            
            li.innerHTML = `
            ${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button>
            ` 
    
            ul.append(li)
        })
    
        main.append(div)
    
    }

    document.addEventListener('click', event => {
        if (event.target.className === "Add Pokemon"){
            let ul = event.target.parentElement.getElementsByTagName('ul')[0]
            
            if (ul.childElementCount < 6) {
                fetch(POKEMONS_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"trainer_id": event.target.dataset.trainerId})
                })
                .then(resp => resp.json())
                .then(pokemon => addPokemonToTrainer(pokemon))
            }   else {
                alert('Trainer already has 6 Pokemon')
            }
        }

        if (event.target.className === "release"){
            fetch(POKEMONS_URL+`/${event.target.dataset.pokemonId}`, {
                method: 'DELETE'
            })
            .then(resp => resp.json())
            .then(event.target.parentElement.remove())
        }
        

        function addPokemonToTrainer(pokemon){
            let div = event.target.parentElement
            let ul = div.getElementsByTagName('ul')[0]
            let li = document.createElement('li')
            
            li.innerHTML = `
            ${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button>
            ` 
            
            ul.append(li)
        }
    })
})
