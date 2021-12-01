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

  return { main, restartBtn };
})();

const game = (() => {
  //monster selection and player generation

  let submitBtn = document.querySelector(".submit-choices");
  let monsterMenu = document.querySelector(".monster-choice-overlay");

  submitBtn.addEventListener("click", (e) => {
    const playerOne = playerFactory("Kevin", "x");
    const playerTwo = playerFactory("Ann", "o");

    monsterMenu.style.display = "none";
    gameBoard.restartBtn.style.display = "block";
    e.target.style.display = "none";
  });

  //game logistics
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

  //display elements
  let statusBlock = document.querySelector(".status");
  let player1Block = document.querySelector(".name1");
  let player2Block = document.querySelector(".name2");
  let endOverlay = document.querySelector(".overlay");
  let endMessage = document.querySelector(".message");

  player1Block.textContent = playerOne.name;
  player2Block.textContent = playerTwo.name;

  //check if there is a winner
  function checkWinner() {
    winConditions.forEach((condition) => {
      if (
        gameBoard.main[condition[0]] === this.activePlayer.mark &&
        gameBoard.main[condition[1]] === this.activePlayer.mark &&
        gameBoard.main[condition[2]] === this.activePlayer.mark
      ) {
        this.winnerDecided = true;
        statusBlock.textContent = ``;
        endMessage.textContent = `${this.activePlayer.name} is the winner!`;
        endOverlay.style.display = "block";
      }
    });
  }

  //moves onto the next player
  function nextPlayer() {
    if (this.activePlayer === playerOne) {
      this.activePlayer = playerTwo;
    } else {
      this.activePlayer = playerOne;
    }
    statusBlock.textContent = `It's ${this.activePlayer.name}'s turn!`;
  }

  //this ends the game when there are no more moves
  function declareTie() {
    statusBlock.textContent = "";
    endMessage.textContent = "It's a draw!";
    endOverlay.style.display = "block";
  }

  return {
    nextPlayer,
    remainingMoves,
    activePlayer,
    checkWinner,
    winnerDecided,
    declareTie,
    playerOne,
    playerTwo,
  };
})();
