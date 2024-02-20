const gameBoard = (function () {
    let board = ['', '', '', '', '', '', '', '', '']

    // let board = [['','',''],['','',''],['','','']]

    return { board }
})();

const player = (function () {
    let player1 = 'x'
    let player2 = 'o'

    return {player1, player2}
})()

const game = (function () {
    const startingPlayer = player.player1
    let playerTurn = player.player1

    let winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    const changePlayersTurn = () => {
        if(playerTurn === startingPlayer){
            playerTurn = player.player2
        } else {
            playerTurn = player.player1
        }
    }

    const playerChoice = (choice) => {
        let index = gameBoard.board[choice]

        if(index === ''){
            gameBoard.board[choice] = playerTurn
            changePlayersTurn()
        } else if(index !== ''){
            console.log('This spot has already been chosen. Please choose another!')
        }

        determineIfGameHasWinner()
        return gameBoard.board
    }

    const determineIfGameHasWinner = () => {
        // if(gameBoard.board[0] === 'x' && gameBoard.board[1] === 'x' && gameBoard.board[2] === 'x'){
        //     console.log(`${player.player1} is the winner!`)
        // }
        winningCombos.forEach((combo) => {
            let values = combo.map(index => gameBoard.board[index])
            
            if(values.every((el) => el === player.player1)){
                console.log(`${player.player1} is the winner`)
            }

            if(values.every((el) => el === player.player2)){
                console.log(`${player.player2} is the winner`)
            }
        })
        
    }

    return {playerChoice, determineIfGameHasWinner}
})()

