// Define Values
const boxElements = document.querySelectorAll('.box');
const gameELement = document.querySelector('#board');
const announcer = document.querySelector('.winning-text');
const announcer2 = document.querySelector('.announce-text');
const winSpecifier = document.querySelector('.specifier');
const restartButton = document.getElementById('reset');
let X_CLASS = 'cross';
let O_CLASS = 'circle';
let currentPlayer = X_CLASS;
/* board index
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/
let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//Start Game
startGame();


function startGame() {
    announcer.classList.add('hide');
    boxElements.forEach(box => {
        box.classList.remove(X_CLASS);
        box.classList.remove(O_CLASS);
        gameELement.classList.remove(X_CLASS);
        gameELement.classList.remove(O_CLASS);
        gameELement.classList.add(currentPlayer);
        box.innerHTML = '';
        box.addEventListener('click', click, { once: true });
    })
}


//Click function 
function click(event) {
    const box = event.target;
    placemark(box, currentPlayer);
    placePlayer(box, currentPlayer);
    checkWin(currentPlayer);
    currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
}

//add class
const placemark = (box, currentPlayer) => {
    box.classList.add(currentPlayer);
}

//add current player
const placePlayer = (box, currentPlayer) => {
    if (currentPlayer === X_CLASS) {
        box.innerHTML = 'X';
    }
    else {
        box.innerHTML = 'O';
    }
}

//change Turn
const playerTurn =(currentPlayer) => {
    gameELement.classList.remove(X_CLASS);
    gameELement.classList.remove(O_CLASS);
    if (currentPlayer === X_CLASS){
        gameELement.classList.add(X_CLASS);
    } else {
        gameELement.classList.add(O_CLASS);
    }
}

// Check for Win
const checkWin = (currentPlayer) => {
    if (gameWon(currentPlayer)) {
        endgame(false);
    }
    else if (isDraw()) {
        endgame(true)
    } 
    else {
        currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
        playerTurn(currentPlayer);
        console.log(currentPlayer);
    }
}
function gameWon(currentPlayer) {
    return winningConditions.some(combination => {
        return combination.every(index => {
            return boxElements[index].classList.contains(currentPlayer);
        });
    });
}
function endgame(draw) {
    if (draw){
        announcer2.innerHTML = 'Draw!'
        announcer.classList.remove('hide');
    }
    else {
        currentPlayer === X_CLASS ? announcer2.innerHTML = 'Player X wins' : announcer2.innerHTML = 'Player O Wins';
        announcer.classList.remove('hide');
    }
}
function isDraw() {
    return[...boxElements].every(box => {
        return box.classList.contains(X_CLASS)|| box.classList.contains(O_CLASS);
    })
}

//New Game Button
restartButton.addEventListener('click', startGame);

//reload function
function reload() {
    window.location.reload();
}