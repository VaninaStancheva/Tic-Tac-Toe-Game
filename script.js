(function () {
    const boardElement = document.getElementById('board');
    const restartButton = document.getElementById('restart');
    const cells = document.getElementsByClassName('cell');
    const winningMassage = document.getElementById('winningMessage');
    const winingMassageText = document.getElementById('winningMessageText');
    let cellsArray = ['', '', '', '', '', '', '', '', ''];


    let currentPlayer = 'X';

    (function createBoardCells() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.setAttribute("class", "cell");
            cell.setAttribute("id", `${i}`);
            cell.addEventListener('click', onCellClicked);
            boardElement.appendChild(cell);
        }
    })()


    function onCellClicked(e) {
        if(checkForWinner()) {
            return;
        }
        if (cellsArray[e.currentTarget.id] === '') { // Missing check
            cellsArray[e.currentTarget.id] = currentPlayer;
            e.currentTarget.innerHTML = currentPlayer;
            changePlayer()
        } else {
            alert("This place is already taken! Please, choose another!");
        }
    }

    function changePlayer() {
        if (checkForDraw()) {
            winningMassage.style.display = 'block';
            winingMassageText.innerText = 'It`s a draw!';
        } else if (checkForWinner()) {
            winningMassage.style.display = 'block';
            winingMassageText.innerText = `Player ${currentPlayer} wins!`;
        } else {
            if (currentPlayer === 'X') {
                currentPlayer = 'O';
            } else {
                currentPlayer = 'X';
            }
        }
    }

    restartButton.addEventListener('click', restartGame);

    function restartGame(e) {
        e.preventDefault();
        if (winningMassage.style.display === 'block') {
            winningMassage.style.display = 'none'
        }
        cellsArray = cellsArray.map( el => el = '');
        for (cell of cells) {
            cell.innerHTML = '';
        }
        currentPlayer = 'X';
    }

    function checkForWinner() {
        if (cellsArray[0]) {
            if ((cellsArray[0] === cellsArray[1] && cellsArray[1] === cellsArray[2]) ||
                (cellsArray[0] === cellsArray[3] && cellsArray[3] === cellsArray[6]) ||
                (cellsArray[0] === cellsArray[4] && cellsArray[4] === cellsArray[8])) {
                return true
            }
        }

        if (cellsArray[3]) {
            if ((cellsArray[0] === cellsArray[3] && cellsArray[3] === cellsArray[6]) ||
                (cellsArray[3] === cellsArray[4] && cellsArray[4] === cellsArray[5])) {
                return true
            }
        }

        if (cellsArray[6]) {
            if ((cellsArray[6] === cellsArray[7] && cellsArray[7] === cellsArray[8]) ||
                (cellsArray[0] === cellsArray[3] && cellsArray[3] === cellsArray[6]) ||
                (cellsArray[6] === cellsArray[4] && cellsArray[4] === cellsArray[2])) {
                return true
            }

        }

        if (cellsArray[1]) {
            if (cellsArray[1] === cellsArray[4] && cellsArray[4] === cellsArray[7]) {
                return true
            }
        }

        if (cellsArray[2]) {
            if (cellsArray[2] === cellsArray[5] && cellsArray[5] === cellsArray[8]) {
                return true
            }
        }
    }

// This function could be one liner
    function checkForDraw() { // There is another way to do this
        return cellsArray.every((currentEL) => currentEL);
    }
})()

