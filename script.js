const gameBoard = (function () {
    let board = [['o','',''],['o','',''],['','','']]

    const getBoard = () => board

    return { board, getBoard }
})();

console.log(gameBoard.getBoard())

const player = (function () {
    let playerOneName = 'Player One'
    let playerTwoName = 'Player Two'

    const players = [
        {
            name: playerOneName,
            token: 'x'
        },
        {
            name: playerTwoName,
            token: 'o'
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

    const playerChoice = (choice) => {
        let index = gameBoard.board[choice[0]][choice[1]]

        if(index === ''){
            gameBoard.board[choice[0]][choice[1]] = activePlayer.token
            switchPlayerTurn()
        } else if(index !== ''){
            console.log('This spot has already been chosen. Please choose another!')
        }

        determineIfGameHasWinner()
        return gameBoard.getBoard()
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

        winningCombos.forEach((combo) => {
            if(combo.every((el) => el === player.players[0].token)) console.log(`${player.players[0].name} is the winner`)

            if(combo.every((el) => el === player.players[1].token)) console.log(`${player.players[1].name} is the winner`)
       })

    }


    return {playerChoice, determineIfGameHasWinner}
})()


