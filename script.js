// script.js
let counter = 0;
let multiplier = 1;

const counterDisplay = document.getElementById("counter");
const jokeDisplay    = document.getElementById("joke");
const cookieImg      = document.getElementById("cookie");
const clickSound     = document.getElementById("clickSound");
const bgMusic        = document.getElementById("bgMusic");

const mainView = document.getElementById("main");
const shopView = document.getElementById("shop");

const shopBtn   = document.getElementById("shopBtn");
const backBtn   = document.getElementById("backBtn");
const resetBtn  = document.getElementById("resetBtn");

const insiderJokes = [
  "Jeder Klick ein Gruß an Marvin.",
  "Legendärer Moment wie bei der Kantine '23.",
  "Kekse schmecken besser mit PowerPoint.",
  "Das erinnert an den Beamer‑Fail von Lisa.",
  "Team‑Meeting‑Level erreicht.",
  "Fast so produktiv wie der Freitagabend‑Call.",
  "Wo ist eigentlich Rüdigers Tasse?",
  "Das ist wie damals im Escape Room – nur mit Keksen.",
];

// cookie helpers
function setCookie(name, value) {
  document.cookie = `${name}=${value};path=/;max-age=${60*60*24*365}`;
}
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}
function deleteCookie(name) {
  document.cookie = `${name}=;path=/;max-age=0`;
}

// initialize from cookies
function loadState() {
  const c = parseInt(getCookie("counter")) || 0;
  counter = c;
  counterDisplay.textContent = `Kekse: ${counter}`;

  if (getCookie("boughtDouble") === "1") {
    multiplier = 2;
    disableButton(buyDouble);
  }
  if (getCookie("boughtBrownie") === "1") {
    cookieImg.src = "brownie.png";
    disableButton(buyBrownie);
  }
  if (getCookie("boughtSound") === "1") {
    disableButton(buySound);
  }
  if (getCookie("boughtGreenBG") === "1") {
    document.body.style.backgroundColor = "#a8d5a2";
    disableButton(buyGreenBG);
  }
}
  
// click handler
cookieImg.addEventListener("click", () => {
  counter += multiplier;
  counterDisplay.textContent = `Kekse: ${counter}`;
  setCookie("counter", counter);

  if (getCookie("boughtSound") === "1") {
    clickSound.currentTime = 0;
    clickSound.play();
  }

  if (counter % 10 === 0) {
    const joke = insiderJokes[Math.floor(Math.random() * insiderJokes.length)];
    jokeDisplay.textContent = joke;
  }
});

// shop navigation
shopBtn.addEventListener("click", () => {
  mainView.style.display = "none";
  shopView.style.display = "block";
});
backBtn.addEventListener("click", () => {
  shopView.style.display = "none";
  mainView.style.display = "block";
});

// reset
resetBtn.addEventListener("click", () => {
  counter = 0;
  multiplier = 1;
  counterDisplay.textContent = `Kekse: 0`;
  jokeDisplay.textContent = "";
  // clear all cookies
  ["counter","boughtDouble","boughtBrownie","boughtSound","boughtGreenBG"].forEach(deleteCookie);
  // revert UI
  cookieImg.src = "cookie.png";
  document.body.style.backgroundColor = "#fdf6e3";
  [buyDouble, buyBrownie, buySound, buyGreenBG].forEach(btn => btn.disabled = false);
});

// shop purchases
function disableButton(btn) { btn.disabled = true; }
shopView.querySelectorAll("button").forEach(btn => {
  if (btn.id.startsWith("buy")) {
    btn.addEventListener("click", () => {
      switch (btn.id) {
        case "buyDouble":
          multiplier = 2;
          setCookie("boughtDouble","1");
          break;
        case "buyBrownie":
          cookieImg.src = "brownie.png";
          setCookie("boughtBrownie","1");
          break;
        case "buySound":
          setCookie("boughtSound","1");
          break;
        case "buyGreenBG":
          document.body.style.backgroundColor = "#a8d5a2";
          setCookie("boughtGreenBG","1");
          break;
      }
      disableButton(btn);
    });
  }
});

// load initial state
window.addEventListener("DOMContentLoaded", loadState);
