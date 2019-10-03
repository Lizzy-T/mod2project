let all_users = []
let all_hikes = []
let selectedUser = []
let initialView = document.querySelector('input[value=returning]')
initialView.focus()

function displayHikes(hikeArray) {
    const cardContainter = document.querySelector('.card-container')

    hikeArray.forEach(hike => {
        let card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `
            <a href="${hike.link}">${hike.name}</a>
                <i class="fa fa-star fa-2x"></i>
            <img src="${hike.image}">
            <span class="more">
                <p>${hike.summary}</p>
                <ul>
                    <li>Length: &nbsp ${hike.length} miles</li>
                    <li>Location: &nbsp ${hike.location}</li>
                    <li>Diffifculty: &nbsp ${hike.difficulty}</li>
                    <li>Rating: &nbsp  ${hike.rating}</li>
                    <li>Elevation Change: &nbsp  ${hike.highest_point - hike.lowest_point}'</li>
                </ul>
            </span>
            <button class="moreButton">Read About Me </button>
        `
        cardContainter.appendChild(card)
    })
    starFavorite()
    showMoreEventListener()
}

function showMoreEventListener() {
    let buttons = Array.from(document.getElementsByClassName('moreButton'))
    buttons.forEach(button => button.addEventListener("click", showHikeInfo))
}

function showHikeInfo(e) {
    let card= e.target.parentElement
    let info = card.querySelector('.more')
    let button = card.querySelector('.moreButton')

    if (!info.style.display) {
        button.innerText = "Read Less"
        info.style.display = "block"
    } else {
        button.innerText = "Read About Me"
        info.style.display = null
    }
}

function starFavorite() {
    let all_stars = document.querySelectorAll('.card > i')

    all_stars.forEach(star =>{
        star.addEventListener("click", addToFavorites)
    })
}

function addToFavorites(e){
    let hikeName = e.currentTarget.parentElement.firstElementChild.innerText

    currentHikeObj = all_hikes.filter(hike => hike.name === hikeName)

    createFavoritePost(selectedUser, currentHikeObj)
}

function createFavoritePost(user, hike){
    fetch("http://localhost:3000/favorites", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
            user_id: user[0]["id"],
            reihike_id: hike[0]["id"]
        }), // data can be `string` or {object}!
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

function logIn() {
    let  userForm = document.querySelector('#user')
    userForm.addEventListener("change", userOptions)
}

function userOptions (e) {
    let choice = e.target.value

    if (choice == "returning") {
        destroyLogin('div')
        existingUser()
        currentUser()
    } else if (choice == "new-user") {
        destroyLogin('div')
        destroyLogin('section')
        newUser()
    }
}



function newUser() {
    const logIn = document.querySelector('.log-in')
    let createUser =  document.createElement('div')
    createUser.innerHTML =`
    <form class='old-user' method="POST" action="http://localhost:3000/users">
        <label for="username">Sign up here!</label>
        <input id="username" name="username" placeholder="username" type='text'>
        <input type='submit'>
    </form>
    `
    logIn.append(createUser)
}

function existingUser(){
    const logIn = document.querySelector('.log-in')
    let viewUsers = document.createElement('div')

    viewUsers.innerHTML =`
        <label for="username">Select your username!</label>
        <select id="username" name="username" placeholder="username" >
            <option value="">Select</option>
        </select>
    `
    logIn.append(viewUsers)

    let option = document.getElementById('username')

    all_users.forEach(user =>{ 
        let userSelect = document.createElement('option')
        userSelect.value = user.username
        userSelect.innerText = user.username
        option.appendChild(userSelect)
    })
}

function destroyLogin(element){
    let logInOption = document.querySelectorAll(`.log-in > ${element}`)
    logInOption.length > 0 ? logInOption.forEach(option => {option.remove()}) :  "nope"
}

function currentUser() {
    let userSelect = document.querySelector('#username')
    userSelect.addEventListener("change", selectUserName)
}

function displayCurrentUser() {
    const logIn = document.querySelector('.log-in')
    const section = document.createElement('section')
    let userLink = document.createElement('a')
    const currentUser = document.createElement('h3')

    currentUser.innerText = "Current User:"

    userLink.href = `profile.html?id=${selectedUser[0]["id"]}`
    userLink.innerText = `${selectedUser[0]["username"]}`

    section.append(currentUser, userLink)
    logIn.append(section)
}

function selectUserName(e){
    let userName = e.target.value
    selectedUser = all_users.filter(user=> user.username === userName)

    destroyLogin('section')
    displayCurrentUser()
}

function queryEvent (){
    let queryElement = document.querySelector('#query > input')
    queryElement.addEventListener("input", displayCardsByQuery)
}

function displayCardsByQuery(e){
    let difficultyLevels = Array.from(document.querySelectorAll('.difficulty-rating > li'))
    difficultyLevels.forEach(level => level.className = '')
    
    let search = e.target.value
    let filtered = all_hikes.filter(hike => hike.name.toLowerCase().includes(search.toLowerCase()))
    deleteCards()
    displayHikes(filtered)
}

function deleteCards(){
    let allCards = Array.from(document.querySelectorAll('.card-container > .card'))
    allCards.forEach(card => card.remove())
}

function showTrailCardByDifficulty () {
    let difficultyLevels = Array.from(document.querySelectorAll('.difficulty-rating > li'))
    difficultyLevels.forEach(level =>{
        level.addEventListener('click', filterByDifficulty)
    })
}

function filterByDifficulty(e) {
    let difficultyLevels = Array.from(document.querySelectorAll('.difficulty-rating > li'))
    difficultyLevels.forEach(level => level.className = '')
    e.target.className = 'active'
    let colorRating = e.target.innerText.toLowerCase()
    let filteredHikes = all_hikes.filter(hike => hike.difficulty.toLowerCase() == colorRating)
    deleteCards()
    displayHikes(filteredHikes)
}


fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(response => all_users = response)

fetch("http://localhost:3000/reihikes")
    .then(response => response.json())
    .then(response => all_hikes = response)
    .then(displayHikes)
    .then(logIn)
    .then(queryEvent)
    .then(showTrailCardByDifficulty)
