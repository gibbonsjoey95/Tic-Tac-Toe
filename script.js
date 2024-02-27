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
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ]

    return { players }
})()

const game = (function () {
    let board = gameBoard.getBoard()
    const winingPlayer = document.querySelector('#winingPlayer')
    const endGameOverlay = document.querySelector('#endGameOverlay')
    
    let activePlayer = player.players[0]

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === player.players[0] ? player.players[1] : player.players[0]
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
            return
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
                winingPlayer.textContent = `${player.players[0].name} is the winner`
                endGameOverlay.classList.remove('hidden')
                endGameOverlay.classList.add('overlay')
                return true
            }

            if(combo.every((el) => el === player.players[1].token)){
                 winingPlayer.textContent = `${player.players[1].name} is the winner`
                 endGameOverlay.classList.remove('hidden')
                 endGameOverlay.classList.add('overlay')
                 return true
        }
       }

       // Check for tie
        if(board[0].every((el) => el !== '') && board[1].every((el) => el !== '') && board[2].every((el) => el !== '')){
            console.log('tie')
            winingPlayer.textContent = "The game ended in a tie! Please play again!"
            endGameOverlay.classList.remove('hidden')
            endGameOverlay.classList.add('overlay')
            return true
        }

       return false

    }


    return {playerChoice, determineIfGameHasWinner, getActivePlayerToken, restartedGameActivePlayer}
})()

const render = () => {
    let board = gameBoard.getBoard()

    const displayedBoard = document.querySelector('#board')
    const startBrn = document.querySelector('#startBtn')
    const restartBtn = document.querySelectorAll('.restart-btn')

    const displayTokens = () => {
        if(displayedBoard.childNodes.length > 0){
            while(displayedBoard.firstChild){
                displayedBoard.removeChild(displayedBoard.firstChild)
            }
        }
        
        board.forEach((arr, rowIndex) => {
            let row = document.createElement('div')
            row.classList.add('row')
            
            arr.forEach((el, colIndex) => {
                let square = document.createElement('div')
                square.classList.add('square')
                square.textContent = ''

                square.addEventListener('click', () => {
                    game.playerChoice([colIndex, rowIndex])

                    square.textContent = game.getActivePlayerToken()
                })

                row.appendChild(square)
            })
            
            displayedBoard.appendChild(row)
        })
    }

    startBrn.addEventListener('click', () => {
         gameBoard.startGame()
         displayTokens()
    })

    restartBtn.forEach((button)  => {
        button.addEventListener('click', () => {
            gameBoard.startGame()
            game.restartedGameActivePlayer()
            displayTokens()
        })
    })


    displayTokens()
}

render()

