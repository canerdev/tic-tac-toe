const statusDisplay = document.querySelector('.game-status')
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""]

const winningMessage = () => `Player ${currentPlayer} has won!`
const drawMessage = () => `Game ended in a draw!`
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`

statusDisplay.innerHTML = currentPlayerTurn()

function CellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function PlayerChange() {
    currentPlayer = currentPlayer === "X" ? "0" : "X" 
    statusDisplay.innerHTML = currentPlayerTurn()   
}

const winningConditions = [ // according to the data cell index numbers
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function ResultValidation() {
    let roundWon = false
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i] // we got a condition and checked whether everything is correct  
        let a = gameState[winCondition[0]]
        let b = gameState[winCondition[1]]
        let c = gameState[winCondition[2]]
        if(a === '' || b === '' || c === '') {
            continue
        } 
        if(a === b && b === c) {
            roundWon = true
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage()
        gameActive = false
        return
    }
   
    let roundDraw = !gameState.includes("")
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage()
        gameActive = false
        return
    }

    // if ther are still moves to be played
    PlayerChange()
}
function CellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')) // getAttribute returns a string 
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return
    }
    CellPlayed(clickedCell, clickedCellIndex)
    ResultValidation()
}
function RestartGame() {
    gameActive = true
    currentPlayer = "X"
    gameState = ["", "", "", "", "", "", "", "", ""]
    statusDisplay.innerHTML = currentPlayerTurn() // ????
    document.querySelectorAll('.cell')
        .forEach(cell => {
            cell.innerHTML = ''
        });
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', CellClick))
document.querySelector('.game-restart').addEventListener('click', RestartGame)
