fetch("http://localhost:3000/users")
    .then(response => response.json())

let all_hikes = []

fetch("http://localhost:3000/reihikes")
    .then(response => response.json())
    .then(response => all_hikes = response)
    .then(displayHikes)

fetch("http://localhost:3000/favorites")
    .then(response => response.json())


function displayHikes() {
    console.log(all_hikes)
    const cardContainter = document.querySelector('.card-container')
    all_hikes.forEach(hike => {
        let card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `
            <h3>${hike.name}</h3>
        `
        cardContainter.appendChild(card)
    })
}