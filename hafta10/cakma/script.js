const buttonEl = document.getElementById("roll-button");
const diceEl = document.getElementById("dice");
const rollHistoryEl = document.getElementById("roll-history");
const scoreEl = document.getElementById("score-board");

let historyList = [];
let score = 0;

function rollDice() {
  const rollResult = Math.floor(Math.random() * 6) + 1;
  updateScore(rollResult);
  const diceFace = getDiceFace(rollResult);
  diceEl.innerHTML = diceFace;
  historyList.push(rollResult);
  updateRollHistory();
}

function updateScore(result) {
    if (result === 6) score += 76;
    else if (result === 5) score += 42;
    else if (result === 4) score += 19;
    else if (result === 3) score += 7;
    else if (result === 2) score -= 23;
    else if (result === 1) score -= 48;
    scoreEl.innerText = "Toplam Puan: " + score;
}

function updateRollHistory() {
  rollHistoryEl.innerHTML = "";
  for (let i = historyList.length - 1; i >= 0; i--) {
    const listItem = document.createElement("li");
    const result = historyList[i];
    let pointText = "";
    let colorClass = "plus"; 
    if (result === 6) {
        pointText = "+76";
    } else if (result === 5) {
        pointText = "+42";
    } else if (result === 4) {
        pointText = "+19";
    } else if (result === 3) {
        pointText = "+7";
    } else if (result === 2) {
        pointText = "-23";
        colorClass = "minus";
    } else if (result === 1) {
        pointText = "-48";
        colorClass = "minus";
    }   
    listItem.innerHTML = `
        Kutu ${i + 1}: 
        <div style="display:flex; align-items:center; gap:10px;">
            <strong class="${colorClass}">${pointText}</strong>
            <span>${getDiceFace(result)}</span>
        </div>
    `;
    rollHistoryEl.appendChild(listItem);
  }
}

function getDiceFace(rollResult) {
  switch (rollResult) {
    case 1: return "☠️";
    case 2: return "🗡️";
    case 3: return "📜";
    case 4: return "🛡️";
    case 5: return "💰";
    case 6: return "💎";
    default: return "";
  }
}

buttonEl.addEventListener("click", () => {
  diceEl.classList.add("roll-animation");
  setTimeout(() => {
    diceEl.classList.remove("roll-animation");
    rollDice();
  }, 1000);
});