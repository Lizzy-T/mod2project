let searchParams = new URLSearchParams(window.location.search)
let query = searchParams.get("id")

const body = document.querySelector('body')

let allHikes = []

fetch(`http://localhost:3000/users/${query}`)
    .then(response => response.json())
    .then(user => {
        allHikes = user.reihikes
        welcomeHeader(user)
        createCard()
    })

function welcomeHeader(user){
    const header = document.querySelector('header')
    header.innerHTML = `
        <h1>${user.username}'s Trails</h1>
    `
    let aside = document.querySelector('aside')
    aside.innerText = `Number of Favorites: ${user.reihikes.length}`
}

function createCard() {
  const profileContainter = document.querySelector('.profile-container')
  allHikes.forEach(hike => {
      console.log(hike)
    let card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
        <a href=${hike.link}>
            <h4>${hike.name}</h4>
        </a>
        <img src="${hike.image}">
        <p>${hike.summary}</p>
        <ul>
            <li>Length: ${hike.length} miles</li>
            <li>Location: ${hike.location}</li>
            <li>Diffifculty: ${hike.difficulty}</li>
            <li>Rating:  ${hike.rating}</li>
        </ul>
    `
    profileContainter.appendChild(card)
    })
}