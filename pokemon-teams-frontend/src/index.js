const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// div with a class 'card' under 
document.addEventListener('DOMContentLoaded', function(){
    const main = document.getElementsByTagName('main')[0]
    const pokeArray = []

    fetch(TRAINERS_URL) // fetch all trainers 
    .then(resp => resp.json())
    .then(trainers => trainers.forEach(listTrainer))


    function listTrainer(trainer) {
        let div = document.createElement('div')
        div.className = 'card'
        div.dataset.id = trainer.id 
        div.innerHTML = `
            <p>${trainer.name}</p>
            <button class='add-poke' data-trainer-id=${trainer.id}>Add Pokemon</button>
            <ul> ${(listPoke(trainer.pokemons))}</ul>
        `
        
        main.appendChild(div)

    }// listTrainer func 

    function listPoke(pokes){
        let pokesList = ''
        pokes.forEach(poke => {
           pokesList +=  `<li <p>${poke.nickname}</p> <button class="release">Release</button></li>`
        })
        return pokesList 
    }// listPoke

    // function usersArray(users){
    //     let usersHTML = ""
    //     users.forEach(user => {
    //         usersHTML += `<li>${user.username}</li>`
    //     })
    //     return usersHTML
    // }


    document.addEventListener('click', function(event){
        if (event.target.className === 'add-poke') {
            // debugger
            data = {trainer_id: parseInt(event.target.dataset.trainerId)}
            fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                accepts: 'application/json',
                'content-type': 'application/json'
            },
            
            body: JSON.stringify(data)
            }).then(resp => resp.json())
            .then(resp => addPoke(resp))
            // debugger

            function addPoke(poke) {
                let ul = event.target.parentNode.querySelector('ul')
                ul.innerHTML += `
                    <li <p>${poke.nickname}</p> <button class="release">Release</button></li>
                `
                
                
            }

        }
        else if (event.target.className === 'release') {
            let trainerId = parseInt(event.target.parentNode.parentNode.dataset.id)
            debugger
            let pokeId = parseInt(event.target.dataset.id)

            fetch(`${POKEMONS_URL}/${pokeId}`, {
                method: 'DELETE'
            }

            )
        
        }
    })// Event Listner for click

})// DomContentLoaded


// POST /pokemons

// Required Headers:
// {
//   'Content-Type': 'application/json'
// }

// Required Body:
// {
//   "trainer_id": 1
// }

// #=> Example Response
// {
//   "id":147,
//   "nickname":"Gunnar",
//   "species":"Weepinbell",
//   "trainer_id":1

