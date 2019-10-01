let searchParams = new URLSearchParams(window.location.search)
let query = searchParams.get("id")

const body = document.body

fetch(`http://localhost:3000/users/${query}`)
    .then(response => response.json())
    .then(createCard)

function createCard(user) {
  debugger
  const profileContainter = document.querySelector('.profile-container')
    let card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
        <a href="${hike.link}">${hike.name}</a>
        <i class="fa fa-star"></i>
        <img src="${hike.image}">
    `
    cardContainter.appendChild(card)
}