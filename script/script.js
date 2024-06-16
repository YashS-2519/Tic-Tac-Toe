const cellArray = document.querySelectorAll('.cell');
const button = document.querySelector('#start');

const winPattern = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

let occupiedCells = [];

let playerA = [];
let playerB = [];
let currentPlayer = playerA;

let alreadyPlay = 0;

function isCellEmpty(cell) {
    return !occupiedCells.includes(cell);
}

function isWin(player) {

    let winStreak = 0;
    player.sort();

    for (const key in winPattern) {
        winPattern[key].forEach( (elem) => {

            if (player.includes(elem))
                winStreak++;
        })

        if (winStreak === 3)
            return true;

        winStreak = 0;
    }

    return false;
}

function insertValue(currentPlayer, cellValue, cell) {
    currentPlayer.push(cellValue);
    occupiedCells.push(cellValue);
    if (currentPlayer === playerA) {
        cell.querySelector('h6').style.color = "#d32525";
    }
    else{
        cell.querySelector('h6').style.color = "green";
    }
}

function gameover(currentPlayer, draw) {
    if (!draw) {
        document.querySelector('.modal').style.display = 'flex';
        document.querySelector('p').innerHTML = `Player ${currentPlayer === playerA ? 'A' : 'B'} wins!`;
        document.querySelector('button').innerHTML = `Play again`;
        alreadyPlay++;
    }
    else{
        document.querySelector('.modal').style.display = 'flex';
        document.querySelector('p').innerHTML = `It's a draw!`;
        document.querySelector('button').innerHTML = `Play again`;
        alreadyPlay++;
    }
}

function gamestart() {
    cellArray.forEach( (cell) => {
        cell.addEventListener('click', () => {

            let cellValue = parseInt(cell.getAttribute('value'))
            if (isCellEmpty(cellValue)) {
                insertValue(currentPlayer, cellValue, cell)
                document.querySelector(`#${cell.id} h6`).innerHTML = currentPlayer === playerA ? 'X' : 'O';
                if (isWin(currentPlayer)){
                    gameover(currentPlayer, false)
                    return 0;
                }
                currentPlayer = currentPlayer === playerA ? playerB : playerA;
                document.querySelector('h5').innerHTML = `Player ${currentPlayer === playerA ? 'A' : 'B'}'s turn`;

            }

            if (occupiedCells.length == 9 && !isWin(currentPlayer)) {
                gameover(0, 1);
            }
            console.log("playerA: " + playerA + " playerB: "+ playerB + "Occupied Cells" + occupiedCells.length);
    
        })
    })
}

button.addEventListener('click', () =>{
    if (alreadyPlay != 0) {
        occupiedCells = [];
        playerA = [];
        playerB = [];
        currentPlayer = playerA;
        cellArray.forEach(cell => {
            cell.querySelector('h6').innerHTML = '';
            cell.querySelector('h6').style.color = '';
        });
    }
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('h5').innerHTML = `Player ${currentPlayer === playerA ? 'A' : 'B'}'s turn`;
    gamestart();
})

if (window.innerWidth < 800 || window.innerHeight > window.innerWidth) {
    document.querySelector('.box').innerHTML = `<p>This website is currently not available for your device, For better experiece please open it on any landscape screen system(laptops, computers etc.)</p>`;
}