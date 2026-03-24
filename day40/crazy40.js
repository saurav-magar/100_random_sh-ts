const symbols = ["🍎","🍌","🍇","🍉","🍓","🍍","🥝","🍒"];
let cards = [...symbols, ...symbols];

let flippedCards = [];
let moves = 0;

const board = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");

// Shuffle cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create board
function createBoard() {
  board.innerHTML = "";
  shuffle(cards);

  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.innerText = "";

    card.addEventListener("click", flipCard);

    board.appendChild(card);
  });
}

// Flip card
function flipCard() {
  if (this.classList.contains("flipped") || flippedCards.length === 2) return;

  this.classList.add("flipped");
  this.innerText = this.dataset.symbol;

  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.innerText = moves;
    checkMatch();
  }
}

// Check match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    flippedCards = [];
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "";
      card2.innerText = "";
      flippedCards = [];
    }, 800);
  }
}

// Restart game
function restartGame() {
  moves = 0;
  movesDisplay.innerText = moves;
  flippedCards = [];
  createBoard();
}

// Init
createBoard();