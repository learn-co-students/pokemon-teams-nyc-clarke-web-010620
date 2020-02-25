window.addEventListener('DOMContentLoaded', (event) => {
    
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


let card = document.getElementsByTagName("main")[0]

fetch(TRAINERS_URL)
  .then((response) => {
    return response.json();
  })
  .then((trainers) => {
    trainers.forEach(trainer => {
        let eachTrainer = document.createElement("div")
        eachTrainer.className = "card"
        eachTrainer.dataset.id = `${trainer.id}`

        eachTrainer.innerHTML = 
        `<p>${trainer.name}</p>
        <button class= "add-pokemon" data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul id= "pokemon-list"></ul>`
// each pokemon for each 
      let ul =  eachTrainer.querySelector("#pokemon-list")
      trainer.pokemons.forEach(pokemon =>{
          let eachPokemon = document.createElement("li")
          eachPokemon.innerHTML = `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
          `
          ul.append(eachPokemon)
      })
  card.append(eachTrainer)

    })
  });




let releaseBtn = document.getElementsByClassName("release")
document.addEventListener("click", function(event){
    if (event.target.className === "release"){
        fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, {
            method: "DELETE"
            
        })
        .then(response => response.json())
        .then(event.target.parentNode.remove())
        
    }
    
        

    if (event.target.className === "add-pokemon") {
        const data = {"trainer_id": `${event.target.dataset.trainerId}` }
        fetch(POKEMONS_URL, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
            
        })
        .then(response => response.json())
        .then(pokemon =>{ 
        let id = event.target.dataset.trainerId
        let card = document.querySelector(`[data-id='${id}']`);
        let ul =  card.querySelector("#pokemon-list")    
        let newPokemon = document.createElement("li")
        console.log(pokemon)
        newPokemon.innerHTML = `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
        ul.append(newPokemon)

        })
            

        
    }
    
})




});//dom

// {/* <li>${trainer.pokemons[0].nickname} <button class="release" data-pokemon-id="${trainer.pokemons.id}">Release</button></li>
//     <li>${trainer.pokemons.nickname} <button class="release" data-pokemon-id="${trainer.pokemons.id}">Release</button></li>
//     <li>${trainer.pokemons[0].nickname} <button class="release" data-pokemon-id="${trainer.pokemons.id}">Release</button></li>
//     <li>${trainer.pokemons.nickname} <button class="release" data-pokemon-id="${trainer.pokemons.id}">Release</button></li>
//     <li>${trainer.pokemons.nickname} <button class="release" data-pokemon-id="${trainer.pokemons.id}">Release</button></li>
//     <li>${trainer.pokemons.nickname} <button class="release" data-pokemon-id="${trainer.pokemons.id}">Release</button></li>
//     <li>${trainer.pokemons.nickname} <button class="release" data-pokemon-id="${trainer.pokemons.id}">Release</button></li>
 
//     <li>${trainer.pokemons.nickname} <button class="release" data-pokemon-id="${trainer.pokemons.id}">Release</button></li>
//     <li>${trainer.pokemons.nickname} <button class="release" data-pokemon-id="${trainer.pokemons.id}">Release</button></li>
//   */}