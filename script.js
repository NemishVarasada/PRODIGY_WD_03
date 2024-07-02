const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restartButton');


let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

function startGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  gameStatus.textContent = "Player X's turn";
  currentPlayer = 'X';
}

function handleClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (board[index] === '') {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWin()) {
      gameStatus.textContent = `Player ${currentPlayer} Wins!`;
      endGame();
    } else if (isDraw()) {
      gameStatus.textContent = "It's a Draw!";
      endGame();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

function isDraw() {
  return board.every(cell => cell !== '');
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

restartButton.addEventListener('click', startGame);
