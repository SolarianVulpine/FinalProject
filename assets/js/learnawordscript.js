document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("fetch-button");

  button.addEventListener("click", function () {
    fetchWordAndDefinitions();
  });

  async function fetchWordAndDefinitions() {
    let retries = 0;
    const maxRetries = 5;

    while (retries < maxRetries) {
      try {
        const randomWordData = await fetch(
          "https://random-word-api.herokuapp.com/word?number=1"
        );
        const wordData = await randomWordData.json();

        if (!wordData[0]) {
          throw new Error("No word data received");
        }

        const randomWord = wordData[0];
        console.log("Selected word:", randomWord);

        const cacheBuster = `v${new Date().getTime()}`;

        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}?_=${cacheBuster}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log("Data parsed:", data);
        const outputDiv = document.getElementById("output");
        let html = `<h1>${data[0].word}</h1>`;

        const allDefinitions = data[0].meanings;

        allDefinitions.forEach((definition) => {
          html += `<h2>${
            definition.partOfSpeech || "Unknown Part of Speech"
          }</h2>`;
          definition.definitions.forEach((def) => {
            html += `<p>${def.definition}</p>`;
          });
        });

        outputDiv.innerHTML = html;
        console.log("HTML updated");

        return;
      } catch (error) {
        retries++;
        console.error(`Attempt ${retries} failed:`, error.message);

        if (retries >= maxRetries) {
          console.error(`Max retries reached (${maxRetries}). Giving up.`);
          return;
        }

        console.log(`Retrying in 2 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  }
});
