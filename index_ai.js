const board = document.getElementById('board');
const resultDisplay = document.getElementById('result');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function createCell(index) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = index;
  cell.addEventListener('click', () => cellClick(index));
  board.appendChild(cell);
}

function initializeBoard() {
  for (let i = 0; i < 9; i++) {
    createCell(i);
  }
}

function cellClick(index) {
  if (!gameActive || gameBoard[index] !== '') return;

  gameBoard[index] = currentPlayer;
  updateBoard();
  checkWinner();

  if (gameActive && currentPlayer === 'X') {
    currentPlayer = 'O';
    // AI's turn
    setTimeout(() => {
      makeComputerMove();
      currentPlayer = 'X';
      updateBoard();
      checkWinner();
    }, 500);
  }
}

function makeComputerMove() {
  // Simple AI: Check for an empty spot and place 'O'
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === '') {
      gameBoard[i] = 'O';
      return;
    }
  }
}

function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = gameBoard[index];
  });
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
    
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          resultDisplay.textContent = `${currentPlayer} won!`;
          gameActive = false;
          return;
        }
      }
    
      if (!gameBoard.includes('')) {
        resultDisplay.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
      }
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  resultDisplay.textContent = '';
  updateBoard();
}

initializeBoard();
