const buttons = document.querySelectorAll(".button");
const centerCircle = document.querySelector(".center-circle");
const startBtn = document.querySelector(".start-btn");
const roundDisplay = document.querySelector("#round");

const colors = [buttons[0], buttons[1], buttons[2], buttons[3]];

let isGameover = false;
let sequence = [];
let userSequence = [];
let round = 0;

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

startBtn.addEventListener("click", startGame);

function startGame() {
  sequence = [];
  userSequence = [];
  round = 0;
  isGameover = false;
  nextRound();
}

function nextRound() {
  userSequence = [];
  round++;
  roundDisplay.textContent = round;
  sequence.push(getRandomButton());
  playSequence(sequence);
}

async function playSequence(sequence) {
  buttons.forEach((button) => (button.style.pointerEvents = "none"));

  for (const button of sequence) {
    button.classList.add("active");
    await new Promise((resolve) => setTimeout(resolve, 500));
    button.classList.remove("active");
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  buttons.forEach((button) => (button.style.pointerEvents = "auto"));
}

function getRandomButton() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function handleButtonClick(event) {
  if (isGameover) return;

  const clickedButton = event.target;
  clickedButton.classList.add("active");
  setTimeout(() => clickedButton.classList.remove("active"), 250);

  userSequence.push(clickedButton);

  if (
    userSequence[userSequence.length - 1] !== sequence[userSequence.length - 1]
  ) {
    isGameover = true;
    roundDisplay.textContent = round;
    alert(`Game Over! You reached round ${round}`);
    return;
  }

  if (userSequence.length === sequence.length) {
    setTimeout(nextRound, 1000);
  }
}
