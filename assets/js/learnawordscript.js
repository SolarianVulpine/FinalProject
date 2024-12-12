document.addEventListener("DOMContentLoaded", function () {
  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/truth")
    .then((response) => response.json())
    .then((data) => {
      const outputDiv = document.getElementById("output");
      const word = data[0].word;
      let html = `<h1>${word}</h1>`;

      data[0].meanings.forEach((meaning) => {
        html += `<h2>${meaning.partOfSpeech}</h2>`;
        meaning.definitions.forEach((def) => {
          html += `<p>${def.definition}</p>`;
        });
      });

      outputDiv.innerHTML = html;
    })
    .catch((error) => console.error("Error fetching data:", error));
});
