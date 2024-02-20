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

    const playerChoice = (choice) => {
        let index = gameBoard.board[choice - 1]

        if(index === ''){
            gameBoard.board[choice - 1] = playerTurn
        }

        if(playerTurn === startingPlayer){
            playerTurn = player.player2
        } else {
            playerTurn = player.player1
        }

        return gameBoard.board
    }

    return {playerChoice}
})()

