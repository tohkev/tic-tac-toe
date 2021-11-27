const playerFactory = (name, mark) => {
  return { name, mark };
};

const gameBoard = (() => {
  let main = [];
  for (let i = 0; i < 9; i++) {
    main.push(" ");
  }
  let squareElements = document.querySelectorAll(".square");
  let restartBtn = document.querySelector(".restart");

  squareElements.forEach((square, index) => {
    //allows players to click on square
    square.addEventListener("click", () => {
      if (square.classList.contains("free")) {
        square.classList.remove("free");
        square.classList.add(game.activePlayer.mark);
        //registers the gameBoard onto the main array
        main[index] = game.activePlayer.mark;
        game.remainingMoves--;
        game.checkWinner();
        //moves onto next player's turn
        if (game.winnerDecided === false) {
          if (game.remainingMoves > 0) {
            game.nextPlayer();
          } else if (game.remainingMoves === 0) {
            game.declareTie();
          }
        }
      }
    });
  });

  restartBtn.addEventListener("click", () => {
    window.location.reload(true);
  });

  return { main };
})();

const game = (() => {
  const playerOne = playerFactory("Kevin", "o");
  const playerTwo = playerFactory("Ann", "x");

  let activePlayer = playerOne;
  let winnerDecided = false;
  let remainingMoves = 9;
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let statusBlock = document.querySelector(".status");
  let playerOneBlock = document.querySelector(".name1");
  let playerTwoBlock = document.querySelector(".name2");

  function checkWinner() {
    winConditions.forEach((condition) => {
      if (
        gameBoard.main[condition[0]] === this.activePlayer.mark &&
        gameBoard.main[condition[1]] === this.activePlayer.mark &&
        gameBoard.main[condition[2]] === this.activePlayer.mark
      ) {
        this.winnerDecided = true;
        statusBlock.textContent = `${this.activePlayer.name} is the winner!`;
      }
    });
  }

  function nextPlayer() {
    if (this.activePlayer === playerOne) {
      this.activePlayer = playerTwo;
    } else {
      this.activePlayer = playerOne;
    }
  }

  function declareTie() {
    statusBlock.textContent = "It's a draw!";
  }

  return {
    nextPlayer,
    remainingMoves,
    activePlayer,
    checkWinner,
    winnerDecided,
    declareTie,
  };
})();
