let resultsContainer = document.getElementById("searchResults");
let inputValEl = document.getElementById("searchInput");
let spinner = document.getElementById("spinner");

function createAndAppendResults(result) {
  let { link, description, title } = result;
  let container = document.createElement("div");
  container.classList.add("p-2", "result-item");
  resultsContainer.appendChild(container);
  console.log("Hi");
  let heading = document.createElement("a");
  heading.href = link;
  heading.textContent = title;
  heading.classList.add("result-title");
  container.appendChild(heading);

  let breakEl = document.createElement("br");
  container.appendChild(breakEl);

  let linkEl = document.createElement("a");
  linkEl.href = link;
  linkEl.target = "_blank";
  linkEl.textContent = link;
  linkEl.classList.add("result-url");
  container.appendChild(linkEl);

  let breakEtl = document.createElement("br");
  container.appendChild(breakEtl);

  let desc = document.createElement("p");
  desc.textContent = description;
  desc.classList.add("link-description");
  container.appendChild(desc);

  let hrLine = document.createElement("hr");
  container.appendChild(hrLine);
}

function displayResults(search_results) {
  for (let result of search_results) {
    createAndAppendResults(result);
  }
}

function sendRequest() {
  if (event.key === "Enter") {
    resultsContainer.textContent = "";
    let inputVal = inputValEl.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + inputVal;
    let options = {
      method: "GET",
    };
    spinner.classList.remove("d-none");
    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        spinner.classList.add("d-none");
        let { search_results } = data;
        displayResults(search_results);
      });
  }
}

inputValEl.addEventListener("keydown", sendRequest);
