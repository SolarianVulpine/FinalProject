document.addEventListener("DOMContentLoaded", () => {
  const jokeContainer = document.querySelector(".extra-content p");
  const nextButton = document.createElement("button");
  const prevButton = document.createElement("button");
  const pauseButton = document.createElement("button");
  const jokeHistory = [];
  let currentIndex = -1;
  let autoUpdate = true;
  let interval;

  nextButton.innerHTML = "&#9654;";
  prevButton.innerHTML = "&#9664;";
  pauseButton.innerHTML = "&#10074;&#10074;";
  nextButton.classList.add("joke-button");
  prevButton.classList.add("joke-button");
  pauseButton.classList.add("joke-button");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.appendChild(prevButton);
  buttonContainer.appendChild(pauseButton);
  buttonContainer.appendChild(nextButton);
  jokeContainer.parentElement.appendChild(buttonContainer);

  async function fetchJoke() {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    const data = await response.json();
    return data.joke;
  }

  async function displayJoke(joke = null) {
    jokeContainer.classList.add("swipe-out");
    setTimeout(async () => {
      if (joke === null) {
        joke = await fetchJoke();
      }
      jokeContainer.textContent = joke;
      jokeContainer.classList.remove("swipe-out");
      jokeContainer.classList.add("swipe-in");
      jokeHistory.push(joke);
      currentIndex++;
    }, 300);
  }

  function showPreviousJoke() {
    if (currentIndex > 0) {
      currentIndex--;
      jokeContainer.classList.add("swipe-out");
      setTimeout(() => {
        jokeContainer.textContent = jokeHistory[currentIndex];
        jokeContainer.classList.remove("swipe-out");
        jokeContainer.classList.add("swipe-in");
      }, 300);
    }
  }

  function showNextJoke() {
    if (currentIndex < jokeHistory.length - 1) {
      currentIndex++;
      jokeContainer.classList.add("swipe-out");
      setTimeout(() => {
        jokeContainer.textContent = jokeHistory[currentIndex];
        jokeContainer.classList.remove("swipe-out");
        jokeContainer.classList.add("swipe-in");
      }, 300);
    } else {
      displayJoke();
    }
  }

  function togglePause() {
    autoUpdate = !autoUpdate;
    if (autoUpdate) {
      pauseButton.innerHTML = "&#10074;&#10074;";
      startAutoUpdate();
    } else {
      pauseButton.innerHTML = "&#9658;";
      clearInterval(interval);
    }
  }

  function startAutoUpdate() {
    interval = setInterval(displayJoke, 13000);
  }

  nextButton.addEventListener("click", showNextJoke);
  prevButton.addEventListener("click", showPreviousJoke);
  pauseButton.addEventListener("click", togglePause);

  displayJoke();
  startAutoUpdate();
});
