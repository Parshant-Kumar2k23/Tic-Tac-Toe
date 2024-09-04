let playerText = document.getElementById('player-Text');
let restartBtn = document.getElementById('restartBtn')

// winning block color
let winningBlock = getComputedStyle(document.body).getPropertyValue('--winning-block');

// boxes targeting
let boxes = Array.from(document.getElementsByClassName('box'))
console.log(boxes)

// players
const O_TEXT = "O";
const X_TEXT = "X";

// by default current player X
let currentPlayer = X_TEXT;
// spaces null initially
let spaces = Array(9).fill(null)

// start game function
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}
// box clicked functionality
const boxClicked = (e) => {
    const id = e.target.id;
    if(!spaces[id]){
        spaces[id]= currentPlayer;
        e.target.innerText = currentPlayer;
        // after winning functionality
        if(playerHasWon() !== false){
            playerText.innerText = `${currentPlayer} has Won!!`;
            let winning_blocks = playerHasWon();
            winning_blocks.map(box => boxes[box].style.backgroundColor = winningBlock)
            boxes.forEach(box => box.removeEventListener('click', boxClicked))
            return;
        }
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}

// winning scenarios
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

// player won Function
const playerHasWon = () => {
    for(const chance of winningCombos){
        let [a,b,c] = chance;
        // checking condition of winning
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c]) ){
            return [a,b,c];
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart);

// restart function
function restart(){
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = ''
    });
    playerText.innerText = 'Tic Tac Toe';
    currentPlayer = X_TEXT;
    startGame()
}
// start game function calling
startGame()