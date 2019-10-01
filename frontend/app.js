let all_users = []
let all_hikes = []
let selectedUser = []
let initialView = document.querySelector('input[value=returning]')
initialView.focus()

function displayHikes() {
    const cardContainter = document.querySelector('.card-container')

    all_hikes.forEach(hike => {
        let card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `
            <a href="${hike.link}">${hike.name}</a>
                <i class="fa fa-star"></i>
            <img src="${hike.image}">
        `
        cardContainter.appendChild(card)
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

fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(response => all_users = response)

fetch("http://localhost:3000/reihikes")
    .then(response => response.json())
    .then(response => all_hikes = response)
    .then(displayHikes)
    .then(logIn)
    .then(starFavorite)
