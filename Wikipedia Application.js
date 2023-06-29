let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;

    // divContainer --- resultItem
    let resultitemEl = document.createElement("div");
    resultitemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultitemEl);

    // anchorElement ---result-title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultitemEl.appendChild(resultTitleEl);

    // Title break
    let titleBreakEl = document.createElement("br");
    resultitemEl.appendChild(titleBreakEl);

    // Anchor url
    let urlElement = document.createElement("a");
    urlElement.classList.add("result-url");
    urlElement.href = link;
    urlElement.target = "_blank";
    urlElement.textContent = link;
    resultitemEl.appendChild(urlElement);

    // line break
    let linebreakEl = document.createElement("br");
    resultitemEl.appendChild(linebreakEl);

    // paragraph description --- line description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;
    resultitemEl.appendChild(descriptionEl);
}


function displayResults(search_results) {
    spinnerEl.classList.toggle("d-none")
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            })
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);