const rockButton = document.getElementById('rock')
const paperButton = document.getElementById('paper')
const scissorsButton = document.getElementById('scissors')
const resetButton = document.getElementById('resetBtn')
const form = document.querySelector('.form')
const loginName = document.getElementById('name')
const loginPass = document.getElementById('password')
const loginUsername = document.getElementById('username')
const loginEmail = document.getElementById('email')
const loginButton = document.querySelector('.submitButton')
const loginRemember = document.getElementById('remember')
const error_message = document.getElementById('error-message')
const rock = 'rock'
const paper = 'paper'
const scissors = 'scissors'
let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
    };

results ()

function pickComputerMove () {
    // const randomNumber = Math.random()
    // let computerMove = ''
    
    // if(randomNumber >= 0 && randomNumber < 1 / 3) {
    //     computerMove = 'rock'
    // } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    //     computerMove = 'paper'
    // } else if (randomNumber >= 2 /  3 && randomNumber < 1) {
    //     computerMove = 'scissors'
    // }
    // return computerMove

    const moves = ['rock', 'scissors', 'paper']
    return moves[Math.floor(Math.random() * moves.length)]
}

function playGame (playerMove) {
    let result = ''
    let computer = pickComputerMove()
    const choice = document.querySelector('.choice')
    const resultArea = document.querySelector('.result')
    
    if (playerMove === 'rock') {
        if(computer === 'rock') {
            result = 'Tie.'
            score.ties++
        } else if(computer === 'paper') {
            result = 'You lose.'  
            score.losses++
        } else if(computer === 'scissors') {
            result = 'You win.'
            score.wins++
        } 
    }
    else if (playerMove === 'paper') {
        if(computer === 'rock') {
            result = 'You win.'
            score.wins++
        } else if(computer === 'paper') {
            result = 'Tie.'
            score.ties++
        } else if(computer === 'scissors') {
            result = 'You lose.'
            score.losses++
        } 
    } else if (playerMove === 'scissors') {
        if(computer === 'rock') {
            result = 'You lose.'
            score.losses++
        } else if(computer === 'paper') {
            result = 'You win.'
            score.wins++
        } else if(computer === 'scissors') {
            result = 'Tie.'
            score.ties++
        } 
    }  
    localStorage.setItem('score', JSON.stringify(score))
     results ()
    resultArea.innerHTML = `${result}` 
    choice.innerHTML =` You <img src="images/${playerMove}-emoji.png" class="move-icon"/>
            <img src="images/${computer}-emoji.png" class="move-icon"/>
        Computer`
}

function results () {
    const scoreArea = document.querySelector('.score')
    const choice = document.querySelector('.choice')
    const resultArea = document.querySelector('.result')
    
    scoreArea.innerHTML = `Score: Wins:${score.wins}, losses: ${score.losses}, Ties:${score.ties}`
  

    if(scoreArea.innerHTML === '') {
        choice.innerHTML = ''
        resultArea.innerHTML = '' 
    }
}
rockButton.addEventListener('click', ()=> {
    playGame(rock)
})

paperButton.addEventListener('click', ()=> {
    playGame(paper)
})

scissorsButton.addEventListener('click', ()=> {
    playGame(scissors)
})

resetButton.addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
   
    localStorage.removeItem('score')
    document.querySelector('.choice').innerHTML = ''
    document.querySelector('.result').innerHTML = ''
    results ()
})

form.addEventListener('submit', (event) => {
    event.preventDefault()

    
    
    let errors = []

    if(loginName) {
        errors = getSignupFormErrors(loginName.value, loginPass.value, )
    }
    else {
        errors = getLoginFormErrors(loginPass.value)
    }

    if(errors.length > 0) {
        event.preventDefault()
        error_message.innerText = errors.join(". ")
    }
    console.log(errors)
})

function getLoginFormErrors(loginName, loginPass) {
    let errors = []

    if(!loginName || loginName.trim() === '') {
        errors.push('Username is required')
        loginName.parentElement.classList.add('incorrect')
    }

    if(!loginPass || loginPass.trim() === '') {
        errors.push('Password is required')
        loginPass.parentElement.classList.add('incorrect')
    }

    if(loginPass.length < 8){
        errors.push('Password must have at least 8 characters')
        loginPass.parentElement.classList.add('incorrect')
    }

    return errors;
}

function getSignupFormErrors(loginName, loginPass) {
    let errors = []
    if(!loginName || loginName.trim() === '') {
        errors.push('Username is required')
        loginName.parentElement.classList.add('incorrect')
    }

    if(!loginPass || loginPass.trim() === '') {
        errors.push('Password is required')
        loginPass.parentElement.classList.add('incorrect')
    }

    if(loginPass.length < 8){
        errors.push('Password must have at least 8 characters')
        loginPass.parentElement.classList.add('incorrect')
    }

    return errors;
}
const allInputs = [loginName, loginPass].filter(input => input != null)
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect')
            error_message.innerText = ''
        }
    })
})

