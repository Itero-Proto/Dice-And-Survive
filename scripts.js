// scripts.js

// Глобальные переменные состояния
let playerHP = 100;
let goldCount = 0;
let diceRollsCount = 0;
let currentCell = 0;
let inBattleMode = false;
let playerLostBattle = false;

// DOM-элементы
const dice = document.getElementById("dice");
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const player = document.createElement("div");
player.className = "player";
player.textContent = "🧍";
cells[currentCell].appendChild(player);

const healthFill = document.getElementById("health-fill");
const goldCounter = document.getElementById("goldCounter");
const battleModal = document.getElementById("battleModal");
const battleInfo = document.getElementById("battleInfo");
const battleOutcome = document.getElementById("battleOutcome");
const closeBattleBtn = document.getElementById("closeBattleBtn");
const gameOverModal = document.getElementById("gameOverModal");
const restartBtn = document.getElementById("restartBtn");
const winModal = document.getElementById("winModal");
const finalStats = document.getElementById("finalStats");
const winRestartBtn = document.getElementById("winRestartBtn");

// Аудио
const diceSound = document.getElementById("diceSound");
const battleSound = document.getElementById("battleSound");
const potionSound = document.getElementById("potionSound");
const goldSound = document.getElementById("goldSound");
const trapSound = document.getElementById("trapSound");
const winGameSound = document.getElementById("winGameSound");
const winBattleSound = document.getElementById("winBattleSound");
const gameOverSound = document.getElementById("gameOverSound");
const battleLostSound = document.getElementById("battleLostSound");

// Клетки по типу
const healthCells = [], enemyCells = [], trapCells = [], goldCells = [];
const usedHealthCells = new Set();
const usedGoldCells = new Set();

// Начальная инициализация
setTimeout(() => {
  cells[currentCell].scrollIntoView({ behavior: "auto", block: "center" });
}, 100);

// Функции
function updateHealthBar() {
  healthFill.style.width = playerHP + "%";
  if (playerHP <= 0) {
    dice.disabled = true;
    gameOverModal.style.display = "block";
    gameOverSound?.play();
  }
}

function updateGoldCounter(changed = false) {
  goldCounter.textContent = `💰 ${goldCount}`;
  if (changed) {
    goldCounter.classList.add("flash");
    goldSound?.play();
    setTimeout(() => goldCounter.classList.remove("flash"), 400);
  }
}

function movePlayer(steps) {
  let stepCount = 0;
  const interval = setInterval(() => {
    if (stepCount >= steps || currentCell >= cells.length - 1) {
      clearInterval(interval);
      checkCell();
      return;
    }
    currentCell++;
    cells[currentCell].appendChild(player);
    cells[currentCell].scrollIntoView({ behavior: "smooth", block: "center" });
    stepCount++;
  }, 400);
}

function checkCell() {
  // Обработка попадания на клетку (враги, ловушки, золото, зелья)
  console.log("Обработать логику попадания на клетку");
}

function rollDice() {
  if (dice.disabled || playerHP <= 0) return;

  if (inBattleMode) {
    handleBattleRoll();
    return;
  }

  diceSound?.play();
  diceRollsCount++;
  dice.disabled = true;
  dice.classList.add("rolling");

  setTimeout(() => {
    dice.classList.remove("rolling");
    const roll = Math.floor(Math.random() * 6) + 1;
    dice.textContent = `🎲 ${roll}`;
    movePlayer(roll);

    setTimeout(() => {
      dice.disabled = false;
    }, roll * 400 + 800);
  }, 800);
}

dice.addEventListener("click", rollDice);

restartBtn.onclick = () => location.reload();
winRestartBtn.onclick = () => location.reload();
closeBattleBtn.onclick = () => {
  battleModal.style.display = "none";
  dice.style.display = "block";
  closeBattleBtn.style.display = "none";
  if (playerLostBattle && currentCell > 0) {
    currentCell--;
    cells[currentCell].appendChild(player);
  }
};
