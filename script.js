const gameBoard = (function () {
    const startGameOverlay = document.querySelector('#startGameOverlay')
    const endGameOverlay = document.querySelector('#endGameOverlay')

    const row = 3
    const column = 3
    const board = []

    for(i = 0; i < row; i++){
        board.push([])
        for(j = 0; j < column; j++){
            board[i].push('')
        }
    }

    const getBoard = () => board

    const startGame = () => {
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++){
                board[i][j] = ''
            }
        }

        player.players[0].name = document.querySelector('#player1').value
        player.players[1].name = document.querySelector('#player2').value

        startGameOverlay.style.display = 'none'
        endGameOverlay.classList.add('hidden')
        endGameOverlay.classList.remove('overlay')
    }

    return { getBoard, startGame}
})();

const player = (function () {
    let playerOneName = 'Player1'
    let playerTwoName = 'Player2'

    const players = [
        {
            name: playerOneName,
            token: 'X',
            score: 0
        },
        {
            name: playerTwoName,
            token: 'O',
            score: 0
        }
    ]

    return { players }
})()

const game = (function () {
    let board = gameBoard.getBoard()
    const winingPlayer = document.querySelector('#winingPlayer')
    const endGameOverlay = document.querySelector('#endGameOverlay')
    const player1Score = document.querySelector('#firstPlayerScore')
    const player2Score = document.querySelector('#secondPlayerScore')
    
    let activePlayer = player.players[0]

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === player.players[0] ? player.players[1] : player.players[0]

        console.log(2, activePlayer)
        return activePlayer.token
    }

    const getActivePlayerToken = () => {
        return activePlayer.token === 'X' ? 'O' : 'X'
    }

    const restartedGameActivePlayer = () => {
        return activePlayer = player.players[0]
    }

    const playerChoice = (choice) => {
        let index = board[choice[0]][choice[1]]

        if(index === ''){
            board[choice[0]][choice[1]] = activePlayer.token
            switchPlayerTurn()
        } else if(index !== ''){
            console.log('This spot has already been chosen. Please choose another!')
            alert('This spot has already been chosen. Please choose another!')
            return true
        }

        determineIfGameHasWinner()
        return gameBoard.board
    }
    
    const determineIfGameHasWinner = () => {
        console.log(board)
        let winningCombos = [
            // rows
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            //columns
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            //diagonals
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]] 
        ]

        // Check for win
       for(let combo of winningCombos){
            if(combo.every((el) => el === player.players[0].token)){
                displayWinner(player.players[0])
                return true
            }

            if(combo.every((el) => el === player.players[1].token)){
                displayWinner(player.players[1])
                return true
        }
       }

       // Check for tie
        if(isBoardFull()){
            displayTie()
        }

       return false

    }

    const displayWinner = (winningPlayer) => {
        const playerName = winningPlayer.name ? winningPlayer.name : (winningPlayer === player.players[0] ? "Player 1" : "Player 2")
        winingPlayer.textContent = `${playerName} is the winner`
        updateScores(winningPlayer)
        showEndGameOverlay()
    }

    const displayTie = () => {
        winingPlayer.textContent = "The game ended in a tie! Please play agein!"
        showEndGameOverlay()
    }

    const updateScores = (winner) => {
       winner.score++                 
       player1Score.textContent = `${player.players[0].name || 'Player 1'}- ${player.players[0].score}`
       player2Score.textContent = `${player.players[1].name || 'Player 2'}- ${player.players[1].score}`
    }

    const showEndGameOverlay = () => {
        endGameOverlay.classList.remove('hidden')
        endGameOverlay.classList.add('overlay')
    }

    const isBoardFull = () => {
        return board.every((row) => row.every((cell) => cell !== ''))
    }


    return {playerChoice, determineIfGameHasWinner, getActivePlayerToken, restartedGameActivePlayer}
})()

const renderBoard = () => {

    const displayTokens = () => { 
        const boardElement = document.querySelector('#board')
        const boardData = gameBoard.getBoard()

        boardElement.innerHTML = ''

        boardData.forEach((row, rowIndex) => {
            const rowElement = document.createElement('div')
            rowElement.classList.add('row')

            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div')
                cellElement.classList.add('square')


                if(colIndex === 0) cellElement.classList.add('top')
                if(rowIndex === 2) cellElement.classList.add('right')
                if(colIndex === 2) cellElement.classList.add('bottom')
                if(rowIndex === 0) cellElement.classList.add('left')

                cellElement.addEventListener('click', () => {
                    handleCellClick(cellElement, [colIndex, rowIndex])
                })
                rowElement.appendChild(cellElement)
            })
            boardElement.appendChild(rowElement)
    })}

    const handleCellClick = (cellElement, position) => {
        if(cellElement.textContent === ''){
            game.playerChoice(position)

            const activePlayerToken = game.getActivePlayerToken()
            cellElement.textContent = activePlayerToken

            activePlayerToken === 'X' ? cellElement.classList.add('blue') : cellElement.classList.add('red')
        }

    }

    const handleStartButtonClick = () => {
        gameBoard.startGame()
        displayTokens()
    }

    const handleRestartButtonClick = () => {
        gameBoard.startGame()
        game.restartedGameActivePlayer()
        displayTokens()
    }

    const bindEventListeners = () => {
        const startBtn = document.querySelector('#startBtn')
        const restartBtn = document.querySelectorAll('.restart-btn')

        startBtn.addEventListener('click', handleStartButtonClick)

        restartBtn.forEach((button) => {
            button.addEventListener('click', handleRestartButtonClick)
        })
    }

    const render = () => {
        displayTokens()
        bindEventListeners()
    }

    render()
}

renderBoard()

