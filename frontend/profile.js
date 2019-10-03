let searchParams = new URLSearchParams(window.location.search)
let query = searchParams.get("id")

const body = document.querySelector('body')

let allHikes = []
let currentUser = ""
let favorites = []
let numberFav = ''

fetch(`http://localhost:3000/users/${query}`)
    .then(response => response.json())
    .then(user => {
        allHikes = user.hikes
        currentUser = user.user 
        favorites = user.favorites
        numberFav = allHikes.length
        welcomeHeader(user)
        createCard()
        deletionEvent()
    })

function welcomeHeader(){
    const header = document.querySelector('header')
    header.innerHTML = `
        <h1>${currentUser.username}'s Trails</h1>
    `
    let aside = document.querySelector('aside')
    aside.innerText = `Number of Favorites: ${numberFav}`
}

function createCard() {
  const profileContainter = document.querySelector('.profile-container')
  allHikes.forEach(hike => {
    let card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
        <a href=${hike.link}>
            <h4>${hike.name}</h4>
        </a>
        <i class="fa fa-trash"> &nbsp Remove Hike From Favorites</i>
        <img src="${hike.image}">
        <p>${hike.summary}</p>
        <ul>
            <li>Length: &nbsp ${hike.length} miles</li>
            <li>Location: &nbsp ${hike.location}</li>
            <li>Diffifculty: &nbsp ${hike.difficulty}</li>
            <li>Rating: &nbsp  ${hike.rating}</li>
        </ul>
    `
    profileContainter.appendChild(card)
    })
}

function deletionEvent() {
    let all_buttons = document.querySelectorAll('.card > i')

    all_buttons.forEach(button => {
        button.addEventListener("click", destroyFavorite)
    })
}

function destroyFavorite(e) {
    let hikeName = e.currentTarget.parentElement.firstElementChild.innerText

    currentHikeId = allHikes.filter(hike => hike.name === hikeName)[0]["id"]

    deleteRequest(favoriteFinder(currentUser["id"], currentHikeId))
    e.target.parentElement.remove()

    numberFav = numberFav - 1
    let aside = document.querySelector('aside')
    aside.innerText = `Number of Favorites: ${numberFav}`
}

function favoriteFinder(userId, hikeId) {
    return favorites.filter(favorite => favorite["user_id"] === userId && favorite["reihike_id"] === hikeId)[0]["id"]
}

function deleteRequest(favorite_id) {
    fetch(`http://localhost:3000/favorites/${favorite_id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
    })
}