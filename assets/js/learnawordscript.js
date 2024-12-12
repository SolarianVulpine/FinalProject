document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("fetch-button");

  button.addEventListener("click", function () {
    fetch("https://random-word-api.herokuapp.com/word?number=1")
      .then((response) => response.json())
      .then((wordData) => {
        const randomWord = wordData[0];
        console.log("Selected word:", randomWord);

        const cacheBuster = `v${new Date().getTime()}`;

        return fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}?_=${cacheBuster}`
        );
      })
      .then((response) => {
        console.log("Response received");
        return response.json();
      })
      .then((data) => {
        console.log("Data parsed:", data);
        const outputDiv = document.getElementById("output");
        const word = data[0].word;
        let html = `<h1>${word}</h1>`;

        const nounMeanings = data[0].meanings.filter(
          (meaning) => meaning.partOfSpeech === "noun"
        );

        nounMeanings.forEach((meaning) => {
          html += `<h2>${meaning.partOfSpeech}</h2>`;
          meaning.definitions.forEach((def) => {
            html += `<p>${def.definition}</p>`;
          });
        });

        if (nounMeanings.length === 0) {
          html += `<p>No noun definitions found.</p>`;
        }

        outputDiv.innerHTML = html;
        console.log("HTML updated");
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
});
