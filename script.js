const board = document.getElementById('board');
const clickSound = document.getElementById('clickSound');
const bgMusic = document.getElementById('bgMusic');
const winSound = document.getElementById('winSound');
const playerTurnText = document.getElementById('playerTurn');
const winnerText = document.getElementById('winnerText');

let cells = [];
let currentPlayer = 'X';
let playerNames = { X: "Player 1", O: "Player 2" };
let gameActive = true;

function startGame() {
  const p1 = document.getElementById('player1').value.trim();
  const p2 = document.getElementById('player2').value.trim();

  if (!p1 || !p2) {
    alert("Please enter both player names.");
    return;
  }

  playerNames.X = p1;
  playerNames.O = p2;

  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'block';

  bgMusic.play(); // start background music after interaction

  createBoard();
  updateTurnText();
}

function createBoard() {
  board.innerHTML = '';
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleCellClick(e) {
  const cell = e.target;
  if (cell.textContent !== '' || !gameActive) return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase()); // styling X/O colors
  clickSound.play(); // play click sound

  if (checkWin()) {
    endGame(false);
  } else if (cells.every(c => c.textContent !== '')) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnText();
  }
}

function updateTurnText() {
  playerTurnText.textContent = `Turn: ${playerNames[currentPlayer]} (${currentPlayer})`;
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    );
  });
}

function endGame(draw) {
  gameActive = false;
  document.getElementById('gameContainer').style.display = 'none';
  document.getElementById('winScreen').style.display = 'block';

  if (draw) {
    winnerText.textContent = "It's a Draw!";
  } else {
    winnerText.textContent = `${playerNames[currentPlayer]} (${currentPlayer}) Wins!`;
    winSound.play(); // 🔊 play winning sound
  }
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  document.getElementById('winScreen').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'block';
  createBoard();
  updateTurnText();
}

function goBackToHome() {
  document.getElementById('winScreen').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'none';
  document.getElementById('startScreen').style.display = 'block';
  bgMusic.pause();
  bgMusic.currentTime = 0; // reset music when back to home
}
