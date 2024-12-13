const rockButton = document.getElementById('rock');
const paperButton = document.getElementById('paper');
const scissorsButton = document.getElementById('scissors');
const resetButton = document.getElementById('resetBtn');
const logout = document.getElementById('logout');
const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';
let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0,
};

results ();

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

    const moves = ['rock', 'scissors', 'paper'];
    return moves[Math.floor(Math.random() * moves.length)];
}

function playGame (playerMove) {
    let result = '';
    let computer = pickComputerMove();
    const choice = document.querySelector('.choice');
    const resultArea = document.querySelector('.result');
    
    if (playerMove === 'rock') {
        if(computer === 'rock') {
            result = 'Tie.';
            score.ties++;
        } else if(computer === 'paper') {
            result = 'You lose.' ; 
            score.losses++;
        } else if(computer === 'scissors') {
            result = 'You win.';
            score.wins++;
        } 
    }
    else if (playerMove === 'paper') {
        if(computer === 'rock') {
            result = 'You win.';
            score.wins++;
        } else if(computer === 'paper') {
            result = 'Tie.';
            score.ties++;
        } else if(computer === 'scissors') {
            result = 'You lose.';
            score.losses++;
        } 
    } else if (playerMove === 'scissors') {
        if(computer === 'rock') {
            result = 'You lose.';
            score.losses++;
        } else if(computer === 'paper') {
            result = 'You win.';
            score.wins++;
        } else if(computer === 'scissors') {
            result = 'Tie.';
            score.ties++;
        } 
    }  
    localStorage.setItem('score', JSON.stringify(score));
    
    results ();
    
    resultArea.innerHTML = `${result}`;
    
    choice.innerHTML =` You <img src="images/${playerMove}-emoji.png" class="move-icon"/>
            <img src="images/${computer}-emoji.png" class="move-icon"/>
        Computer`;
}

function results () {
    const scoreArea = document.querySelector('.score');
    const choice = document.querySelector('.choice');
    const resultArea = document.querySelector('.result');
    
    scoreArea.innerHTML = `Score: Wins:${score.wins}, losses: ${score.losses}, Ties:${score.ties}`;
  

    if(scoreArea.innerHTML === '') {
        choice.innerHTML = '';
        resultArea.innerHTML = '';
    }
}
rockButton.addEventListener('click', ()=> {
    playGame(rock);
})

paperButton.addEventListener('click', ()=> {
    playGame(paper);
})

scissorsButton.addEventListener('click', ()=> {
    playGame(scissors);
})

resetButton.addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
   
    localStorage.removeItem('score');
    document.querySelector('.choice').innerHTML = '';
    document.querySelector('.result').innerHTML = '';
    results ();
})

logout.addEventListener('click', ()=>{
    const userConfirm = confirm("You will disconnect. Are you sure?");
    if(userConfirm){
        window.location.href = "login.html";
    }
})