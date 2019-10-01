let all_users = []

fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(response => all_users = response)

let all_hikes = []

fetch("http://localhost:3000/reihikes")
    .then(response => response.json())
    .then(response => all_hikes = response)
    .then(displayHikes)
    .then(logIn)
    .then(starFavorite)



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
        destroyLogin()
        existingUser()
        currentUser()
    } else if (choice == "new-user") {
        destroyLogin()
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

function destroyLogin(){
    let logInOption = document.querySelectorAll('.log-in > div')
    logInOption.length > 0 ? logInOption.forEach(option => {option.remove()}) :  "nope"
}

function currentUser() {
    let userSelect = document.querySelector('#username')
    userSelect.addEventListener("change", selectUserName)
}

let selectedUser = []

function selectUserName(e){
    let userName = e.target.value
    selectedUser = all_users.filter(user=> user.username === userName)
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
