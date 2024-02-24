const gameBoard = (function () {
    const row = 3
    const column = 3
    const board = []
    const cleanBoard = []

    for(i = 0; i < row; i++){
        board.push([])
        cleanBoard.push([])
        for(j = 0; j < column; j++){
            board[i].push('')
            cleanBoard[i].push('')
        }
    }

    // const board = [['','x','x'],['x','o','o'],['x','o','x']]

    const getBoard = () => board

    return { board, cleanBoard, getBoard }
})();

const player = (function () {
    let playerOneName = 'Player One'
    let playerTwoName = 'Player Two'

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
    let activePlayer = player.players[0]
    let board = gameBoard.board

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === player.players[0] ? player.players[1] : player.players[0]
    }

    const getActivePlayerToken = () => {
        // console.log(activePlayer.token)
        return activePlayer.token === 'X' ? 'O' : 'X'
    }

    const playerChoice = (choice) => {
        let index = gameBoard.board[choice[0]][choice[1]]

        if(index === ''){
            gameBoard.board[choice[0]][choice[1]] = activePlayer.token
            switchPlayerTurn()
        } else if(index !== ''){
            console.log('This spot has already been chosen. Please choose another!')
        }

        determineIfGameHasWinner()
        return gameBoard.board
    }

    const determineIfGameHasWinner = () => {
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
                console.log(`${player.players[0].name} is the winner`) 
                return true
            }

            if(combo.every((el) => el === player.players[1].token)){
                 console.log(`${player.players[1].name} is the winner`)
                 return true
        }
       }

       // Check for tie
        if(board[0].every((el) => el !== '') && board[1].every((el) => el !== '') && board[2].every((el) => el !== '')){
            console.log('tie')
            return true
        }

       return false
    }


    return {playerChoice, determineIfGameHasWinner, getActivePlayerToken}
})()

const render = () => {
    const board = document.querySelector('#board')

    gameBoard.board.forEach((arr, rowIndex) => {
        let row = document.createElement('div')

        arr.forEach((el, colIndex) => {
            let square = document.createElement('div')
            square.classList.add('square')
            square.textContent = ''

            square.addEventListener('click', () => {
                game.playerChoice([colIndex, rowIndex])

                square.textContent = game.getActivePlayerToken()
                console.log('clean', gameBoard.cleanBoard)
            })

            row.appendChild(square)
        })
        
        board.appendChild(row)
    })

}

render()

