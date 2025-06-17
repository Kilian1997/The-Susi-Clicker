window.addEventListener("DOMContentLoaded", () => {
  let counter = parseInt(getCookie("counter")) || 0;
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

  const buyDouble   = document.getElementById("buyDouble");
  const buyBrownie  = document.getElementById("buyBrownie");
  const buySound    = document.getElementById("buySound");
  const buyGreenBG  = document.getElementById("buyGreenBG");

  const insiderJokes = [
    "Jeder Klick ein Gruß an Marvin.",
    "Legendärer Moment wie bei der Kantine '23.",
    "Kekse schmecken besser mit PowerPoint.",
    "Das erinnert an den Beamer‑Fail von Lisa.",
    "Team‑Meeting‑Level erreicht.",
    "Fast so produktiv wie der Freitagabend‑Call.",
    "Wo ist eigentlich Rüdigers Tasse?",
    "Das ist wie damals im Escape Room – nur mit Keksen."
  ];

  // Cookie helpers
  function setCookie(name, value) {
    document.cookie = `${name}=${value};path=/;max-age=31536000`;
  }
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
  function deleteCookie(name) {
    document.cookie = `${name}=;path=/;max-age=0`;
  }

  // Initial state setup
  counterDisplay.textContent = `Kekse: ${counter}`;
  if (getCookie("boughtDouble") === "1") {
    multiplier = 2;
    buyDouble.disabled = true;
  }
  if (getCookie("boughtBrownie") === "1") {
    cookieImg.src = "brownie.png";
    buyBrownie.disabled = true;
  }
  if (getCookie("boughtSound") === "1") {
    buySound.disabled = true;
  }
  if (getCookie("boughtGreenBG") === "1") {
    document.body.style.backgroundColor = "#a8d5a2";
    buyGreenBG.disabled = true;
  }

  // Click event
  cookieImg.addEventListener("click", () => {
    bgMusic.play().catch(() => {}); // Only starts if user interacted

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

  // Navigation
  shopBtn.addEventListener("click", () => {
    mainView.style.display = "none";
    shopView.style.display = "block";
  });

  backBtn.addEventListener("click", () => {
    shopView.style.display = "none";
    mainView.style.display = "block";
  });

  // Reset
  resetBtn.addEventListener("click", () => {
    counter = 0;
    multiplier = 1;
    counterDisplay.textContent = `Kekse: 0`;
    jokeDisplay.textContent = "";

    ["counter", "boughtDouble", "boughtBrownie", "boughtSound", "boughtGreenBG"].forEach(deleteCookie);

    cookieImg.src = "cookie.png";
    document.body.style.backgroundColor = "#fdf6e3";

    [buyDouble, buyBrownie, buySound, buyGreenBG].forEach(btn => btn.disabled = false);
  });

  // Shop items
  buyDouble.addEventListener("click", () => {
    multiplier = 2;
    setCookie("boughtDouble", "1");
    buyDouble.disabled = true;
  });

  buyBrownie.addEventListener("click", () => {
    cookieImg.src = "brownie.png";
    setCookie("boughtBrownie", "1");
    buyBrownie.disabled = true;
  });

  buySound.addEventListener("click", () => {
    setCookie("boughtSound", "1");
    buySound.disabled = true;
  });

  buyGreenBG.addEventListener("click", () => {
    document.body.style.backgroundColor = "#a8d5a2";
    setCookie("boughtGreenBG", "1");
    buyGreenBG.disabled = true;
  });
});
