console.log("Let's write some JavaScript")

let value = Math.random()
let userHasClicked = false;
let selectionLocked = false;
let userChoice = null;
let computerChoice = null;
const originalInputHTML = document.querySelector(".cardContainerInput").innerHTML;
const originalUserHTML = document.querySelector(".cardContainerUser").innerHTML;
let userScore = 0;
let computerScore = 0;

async function input() {
    let Input // To get the input from the system 
    console.log(value)

    if (value < 0.33) {
        Input = document.querySelector(".card1").innerHTML;
        computerChoice = "stone";
    } else if (value < 0.66) {
        Input = document.querySelector(".card2").innerHTML;
        computerChoice = "paper";
    } else {
        Input = document.querySelector(".card3").innerHTML;
        computerChoice = "scissor";
    }

    document.querySelector(".cardContainerInput").innerHTML = Input;

}

//To get the input from the user
async function user() {
   document.querySelectorAll(".card4, .card5, .card6").forEach(e => {
    e.addEventListener("click", () => {
        if (selectionLocked) return;
        userHasClicked = true;

        // Get text from clicked card (e.g., "Stone")
        userChoice = e.querySelector(".text").innerText.toLowerCase();
        document.querySelector(".cardContainerUser").innerHTML = e.innerHTML;
    });
});

}

function getWinner(user, comp) {
    if (user === comp) return "draw";

    if (
        (user === "stone" && comp === "scissor") ||
        (user === "paper" && comp === "stone") ||
        (user === "scissor" && comp === "paper")
    ) {
        return "user";
    }

    return "computer";
}

function showResultOverlay(winner) {
  const overlay = document.createElement("div");
  overlay.className = "result-overlay";

  const topPanel = document.createElement("div");
  topPanel.className = "result-top";
  const bottomPanel = document.createElement("div");
  bottomPanel.className = "result-bottom";

  const resultText = document.createElement("div");
  resultText.className = "result-text";

  // Set colors and message based on winner
  if (winner === "user") {
    topPanel.style.backgroundColor = "rgba(0, 128, 0, 0.8)";      // green
    bottomPanel.style.backgroundColor = "rgba(0, 100, 0, 0.8)";
    resultText.innerText = "You Win!";
  } else if (winner === "computer") {
    topPanel.style.backgroundColor = "rgba(128, 0, 0, 0.8)";      // red
    bottomPanel.style.backgroundColor = "rgba(100, 0, 0, 0.8)";
    resultText.innerText = "Computer Wins!";
  } else {
    topPanel.style.backgroundColor = "rgba(80, 80, 80, 0.8)";     // grey
    bottomPanel.style.backgroundColor = "rgba(50, 50, 50, 0.8)";
    resultText.innerText = "It's a Draw!";
  }

  const playAgainBtn = document.createElement("button");
playAgainBtn.className = "play-again-btn";
playAgainBtn.innerText = "Play Again";

playAgainBtn.addEventListener("click", () => {
  // Remove overlay
  document.body.removeChild(overlay);

  // Reset containers
  document.querySelector(".cardContainerInput").innerHTML = originalInputHTML;
  document.querySelector(".cardContainerUser").innerHTML = originalUserHTML;

  // Reset values
  userChoice = null;
  computerChoice = null;
  userHasClicked = false;
  selectionLocked = false;
  value = Math.random(); // New random value for input()

  // Re-attach click listeners (since innerHTML reset them)
  user();

  // Restart game
  main();
});

document.getElementById("scoreBoard").innerHTML = `
  <p>User: ${userScore} | Computer: ${computerScore}</p>
`;


  overlay.appendChild(topPanel);
  overlay.appendChild(bottomPanel);
  overlay.appendChild(resultText);
  overlay.appendChild(playAgainBtn);
  document.body.appendChild(overlay);
}

//The game's main logic
function main() {
    userHasClicked = false;
    selectionLocked = false;

    const countdownEl = document.getElementById("countdown");
    let timeLeft = 3;

    function updateCountdown() {
        if (timeLeft === 0) {
            countdownEl.innerText = "GO!";
        }
        else {
            countdownEl.innerText = timeLeft;
        }

        countdownEl.style.animation = "none"; // reset animation
        countdownEl.offsetHeight; // force reflow
        countdownEl.style.animation = "pop 1s ease-in-out"; // restart animation

        if (timeLeft === 0) {
            setTimeout(() => {
                countdownEl.style.display = "none";

                input(); // Computer picks
                selectionLocked = true;

                if (!userHasClicked) {
    const overlay = document.createElement("div");
overlay.className = "result-overlay";

const topPanel = document.createElement("div");
topPanel.className = "result-top";
topPanel.style.backgroundColor = "rgba(80, 80, 80, 0.8)";

const bottomPanel = document.createElement("div");
bottomPanel.className = "result-bottom";
bottomPanel.style.backgroundColor = "rgba(50, 50, 50, 0.8)";

const resultText = document.createElement("div");
resultText.className = "result-text";
resultText.innerText = "You didn’t choose anything!";

const playAgainBtn = document.createElement("button");
playAgainBtn.className = "play-again-btn";
playAgainBtn.innerText = "Play Again";

playAgainBtn.addEventListener("click", () => {
  document.body.removeChild(overlay);
  document.querySelector(".cardContainerInput").innerHTML = originalInputHTML;
  document.querySelector(".cardContainerUser").innerHTML = originalUserHTML;

  userChoice = null;
  computerChoice = null;
  userHasClicked = false;
  selectionLocked = false;
  value = Math.random();

  user();
  main();
});

overlay.appendChild(topPanel);
overlay.appendChild(bottomPanel);
overlay.appendChild(resultText);
overlay.appendChild(playAgainBtn);
document.body.appendChild(overlay);
} else {
    const winner = getWinner(userChoice, computerChoice);
    showResultOverlay(winner)
    if (winner === "user") {
    userScore++;
} else if (winner === "computer") {
    computerScore++;
} else {
    // draw gives both 1 point
    userScore++;
    computerScore++;
}


// Update DOM
document.getElementById("scoreBoard").innerHTML = `
  <p>User: ${userScore} | Computer: ${computerScore}</p>
`;


}
            }, 3000); // Give "GO!" a moment to show
            return;
        }

        timeLeft--;
        setTimeout(updateCountdown, 1000);
    }

    countdownEl.style.display = "block";
    updateCountdown(); // Start the first tick
}


user()
main()