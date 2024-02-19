const gameBoard = (function () {
    let gameBoard = new Array(9)

    const logBoard = () => {
        console.log(gameBoard)
    }

    return logBoard
})();

gameBoard()