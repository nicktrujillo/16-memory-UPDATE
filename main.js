// ADD CARDS INTO HTML
document.querySelector(
  "#cardContainer"
).innerHTML = `<div class="cards" data-title="1">?</div>
<div class="cards" data-title="2">!</div>
<div class="cards" data-title="3">%</div>
<div class="cards" data-title="4">#</div>
<div class="cards" data-title="5">@</div>
<div class="cards" data-title="6">&</div>
<div class="cards" data-title="7">$</div>
<div class="cards" data-title="8">¥</div>
<div class="cards" data-title="9">*</div>
<div class="cards" data-title="1">?</div>
<div class="cards" data-title="2">!</div>
<div class="cards" data-title="3">%</div>
<div class="cards" data-title="4">#</div>
<div class="cards" data-title="5">@</div>
<div class="cards" data-title="6">&</div>
<div class="cards" data-title="7">$</div>
<div class="cards" data-title="8">¥</div>
<div class="cards" data-title="9">*</div>`;

// SET GLOBAL VARIABLES
let hasFlipped = false;
let stopClicks = false;
let cardOne;
let cardTwo;
let pairs = 0;

// FLIP THE CARDS OVER ON CLICK
const cards = document.querySelectorAll(".cards");
cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  if (stopClicks) {
    return;
  }
  gsap.to(this, {
    duration: 1,
    rotationY: 360,
    color: "rgb(248, 248, 248)",
  });
  if (!hasFlipped) {
    hasFlipped = true;
    cardOne = this;
    return;
  } else {
    cardTwo = this;
    hasFlipped = false;
    isMatch();
  }
}

// CHECK IF THE CARDS ARE A MATCH OR NOT
function isMatch() {
  if (cardOne.dataset.title === cardTwo.dataset.title) {
    keepShowing();
    pairs = pairs + 1;
    checkIfWon();
    return;
  }
  unflipCards();
  decreaseHealth();
}

// KEEP THE CARDS UP IF THEY ARE A MATCH
function keepShowing() {
  cardOne.removeEventListener("click", flipCard);
  cardTwo.removeEventListener("click", flipCard);
}

// FLIP THE CARDS DOWN IF THEY DO NOT MATCH
function unflipCards() {
  stopClicks = true;
  setTimeout(() => {
    gsap.to(cardOne, { duration: 1, rotationY: 720 });
    gsap.to(cardOne, { duration: 0.5, color: "transparent" });
    gsap.to(cardTwo, { duration: 1, rotationY: 720 });
    gsap.to(cardTwo, { duration: 0.5, color: "transparent" });
    stopClicks = false;
  }, 1500);
}

// DECREASE THE HEALTH BAR FOR INCORRECT GUESS, END GAME IF HEALTH RUNS OUT
function decreaseHealth() {
  let health = document.getElementById("health");
  health.value -= 10;
  if (health.value === 0) {
    setTimeout(() => {
      document.querySelector("#gameScreen").style.display = "none";
      document.querySelector("#loseScreen").style.display = "block";
      document.querySelector("body").style.backgroundColor = "rgb(51, 83, 76)";
    }, 1000);
  }
}

// SHUFFLE THE CARDS EACH TIME THE PAGE LOADS
(function shuffle() {
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

// CHECK IF THE PLAYER HAS WON
function checkIfWon() {
  if (pairs === 9) {
    setTimeout(() => {
      document.querySelector("#gameScreen").style.display = "none";
      document.querySelector("#winScreen").style.display = "block";
      document.querySelector("body").style.backgroundColor = "rgb(51, 83, 76)";
    }, 1000);
  }
}

// DISPLAY THE START SCREEN BEFORE THE GAME BEGINS
window.onload = function startScreen() {
  document.querySelector("#gameScreen").style.display = "none";
  document.querySelector("#loseScreen").style.display = "none";
  document.querySelector("#winScreen").style.display = "none";
  document.querySelector("body").style.backgroundColor = "rgb(51, 83, 76)";
  document.querySelector("#modeButtons").addEventListener("click", (e) => {
    if (e.target.id == "easy") {
      console.log(e.target.id);
      easyTimer();
      return;
    } else if (e.target.id == "hard") {
      hardTimer();
    }
  });
};

// IF THE PLAYER SELECTS EASY MODE
function easyTimer() {
  let fiveMinutes = 60 * 5,
    display = document.querySelector("#timer");
  startTimer(fiveMinutes, display);
  document.querySelector("#startScreen").style.display = "none";
  document.querySelector("#gameScreen").style.display = "block";
  document.querySelector("body").style.backgroundColor = "rgb(230, 211, 187)";
  document.querySelector(
    "#healthContainer"
  ).innerHTML = `<progress id="health" value="200" max="200"></progress>`;
}

// IF THE PLAYER SELECTS HARD MODE
function hardTimer() {
  let fiveMinutes = 60 * 3,
    display = document.querySelector("#timer");
  startTimer(fiveMinutes, display);
  document.querySelector("#startScreen").style.display = "none";
  document.querySelector("#gameScreen").style.display = "block";
  document.querySelector("body").style.backgroundColor = "rgb(230, 211, 187)";
  document.querySelector(
    "#healthContainer"
  ).innerHTML = `<progress id="health" value="100" max="100"></progress>`;
}

// START THE TIMER
function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    // END GAME IF TIME RUNS OUT
    if (--timer < 0) {
      timer = null;
      document.querySelector("#gameScreen").style.display = "none";
      document.querySelector("#loseScreen").style.display = "block";
      document.querySelector("body").style.backgroundColor = "rgb(51, 83, 76)";
    }
  }, 1000);
}

// // MAKE AN ARRAY OF ALL COLORS WITH A DIFFERENT ORDER EACH TIME
// let colors = [
//   "blue",
//   "red",
//   "green",
//   "yellow",
//   "purple",
//   "orange",
//   "pink",
//   "black",
//   "white",
//   "blue",
//   "red",
//   "green",
//   "yellow",
//   "purple",
//   "orange",
//   "pink",
//   "black",
//   "white",
// ];
// let randomColor = colors[Math.floor(Math.random() * colors.length)];
// let colorArray = [];
// while ((stillNeedColors = true)) {
//   if (colorArray.includes(randomColor)) {
//   } else {
//     colorArray.push(randomColor);
//   }
//   if (colorArray.length == colors.length) {
//     stillNeedColors = false;
//   }
//   console.log(colorArray);
// }
