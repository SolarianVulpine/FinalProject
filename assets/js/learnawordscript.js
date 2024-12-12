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
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
});
