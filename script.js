const gameBoard = (function () {
    // let board = ['', '', '', '', '', '', '', '', '']

    let board = [['x','x',''],['','',''],['','','']]

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

    // let winningCombos = [
    //     [0,1,2],
    //     [3,4,5],
    //     [6,7,8],
    //     [0,3,6],
    //     [1,4,7],
    //     [2,5,8],
    //     [0,4,8],
    //     [2,4,6]
    // ]

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

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === player.players[0] ? player.players[1] : player.players[0]
    }

    // const playerChoice = (choice) => {
    //     let index = gameBoard.board[choice]

        // if(index === ''){
        //     gameBoard.board[choice] = activePlayer.token
        //     switchPlayerTurn()
        // } else if(index !== ''){
        //     console.log('This spot has already been chosen. Please choose another!')
        // }

    //     determineIfGameHasWinner()
    //     return gameBoard.board
    // }

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

    // const determineIfGameHasWinner = () => {

    //     winningCombos.forEach((combo) => {
    //         let values = combo.map(index => gameBoard.board[index])
            
    //         if(values.every((el) => el === player.players[0].token)){
    //             console.log(`${player.players[0]} is the winner`)
    //         }

    //         if(values.every((el) => el === player.players[1].token)){
    //             console.log(`${player.players[1]} is the winner`)
    //         }
    //     })
        
    // }

    const determineIfGameHasWinner = () => {
        // winningCombos.forEach((combo) => {
        //     //the line below this is the broken line
        //     let values = combo.map(index => gameBoard.board[index])

        //     console.log('v', values)

        //     if(values.every((el) => el === player.players[0].token)){
        //         console.log(`${player.players[0]} is the winner`)
        //     }

        //     if(values.every((el) => el === player.players[1].token)){
        //         console.log(`${player.players[1]} is the winner`)
        //     }
        // })

        console.log(winningCombos[0])
    }


    return {playerChoice, determineIfGameHasWinner}
})()

// console.log(game.playerChoice([0,0])

