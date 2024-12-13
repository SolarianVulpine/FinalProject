document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("fetch-button");
  const recentWords = [];
  const maxRecentWords = 10;
  let clickCount = 0;

  button.addEventListener("click", function () {
    showLoading();
    clickCount++;
    updateClickCounter();
    fetchWordAndDefinitions();
  });

  async function fetchWordAndDefinitions(word = null) {
    let retries = 0;
    const maxRetries = 5;

    while (retries < maxRetries) {
      try {
        const randomWord = word || (await getRandomWord());
        console.log("Selected word:", randomWord);

        const cacheBuster = `v${new Date().getTime()}`;
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}?_=${cacheBuster}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayWordDefinition(data[0]);
        updateRecentWords(randomWord);

        hideLoading();
        return;
      } catch (error) {
        retries++;
        console.error(`Attempt ${retries} failed:`, error.message);

        if (retries >= maxRetries) {
          console.error(`Max retries reached (${maxRetries}). Giving up.`);
          hideLoading();
          return;
        }

        console.log(`Retrying in 2 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  }

  async function getRandomWord() {
    const randomWordData = await fetch(
      "https://random-word-api.herokuapp.com/word?number=1"
    );
    const wordData = await randomWordData.json();

    if (!wordData[0]) {
      throw new Error("No word data received");
    }

    return wordData[0];
  }

  function displayWordDefinition(data) {
    const outputDiv = document.getElementById("output");
    let html = `<h1>${data.word}</h1>`;

    const allDefinitions = data.meanings;

    allDefinitions.forEach((definition) => {
      html += `<h2>${definition.partOfSpeech || "Unknown Part of Speech"}</h2>`;
      definition.definitions.forEach((def) => {
        html += `<p>${def.definition}</p>`;
      });
    });

    outputDiv.innerHTML = html;
    console.log("HTML updated");
  }

  function updateRecentWords(word) {
    if (recentWords.length >= maxRecentWords) {
      recentWords.shift();
    }
    recentWords.push(word);

    const recentWordsDiv = document.getElementById("recent-words");
    recentWordsDiv.innerHTML = "";

    recentWords.forEach((recentWord) => {
      const wordElement = document.createElement("span");
      wordElement.textContent = recentWord;
      wordElement.style.cursor = "pointer";
      wordElement.style.marginRight = "10px";
      wordElement.addEventListener("click", () =>
        fetchWordAndDefinitions(recentWord)
      );

      recentWordsDiv.appendChild(wordElement);
    });
  }

  function updateClickCounter() {
    const clickCounterDiv = document.getElementById("click-counter");
    clickCounterDiv.textContent = `Button has been pressed ${clickCount} times`;
  }

  function showLoading() {
    document.getElementById("loading-indicator").style.display = "block";
  }

  function hideLoading() {
    document.getElementById("loading-indicator").style.display = "none";
  }
});
