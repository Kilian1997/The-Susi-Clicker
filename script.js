let counter = 0;

const counterDisplay = document.getElementById("counter");
const jokeDisplay = document.getElementById("joke");
const cookie = document.getElementById("cookie");

const insiderJokes = [
  "Jeder Klick ein Gruß an Marvin.",
  "Legendärer Moment wie bei der Kantine '23.",
  "Kekse schmecken besser mit PowerPoint.",
  "Das erinnert an den Beamer-Fail von Lisa.",
  "Team-Meeting-Level erreicht.",
  "Fast so produktiv wie der Freitagabend-Call.",
  "Wo ist eigentlich Rüdigers Tasse?",
  "Das ist wie damals im Escape Room – nur mit Keksen.",
];

cookie.addEventListener("click", () => {
  counter++;
  counterDisplay.textContent = `Kekse: ${counter}`;

  if (counter % 10 === 0) {
    const joke = insiderJokes[Math.floor(Math.random() * insiderJokes.length)];
    jokeDisplay.textContent = joke;
  }
});
