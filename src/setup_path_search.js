async function setupPathSearch() {
    let response = await fetch("/components/path-search.html");
    let text = await response.text();
    let pathSearch = querySelectorNonNull(document, "#path-search");
    pathSearch.innerHTML = text;
    
    let path = document.querySelector("#top-bar-path");
    if (!path) {
        console.log("Failed to setup path-search"); return;
    }
    let searchModal = querySelectorNonNull(pathSearch, ".search-modal");
    let searchBar = querySelectorNonNull(searchModal, ".text-entry");
    let searchSuggestions = querySelectorNonNull(searchModal, ".search-suggestions");
    let searchForm = querySelectorNonNull(searchModal, "form");

    path.style = "cursor: pointer;";
    _initModal(path, searchModal);

    let pageMap = {
        "~/home": "/index.html",
        "~/home/about": "/index.html#about",
        "~/home/projects": "/index.html#projects",
        "~/home/portfolio": "/index.html#portfolio",
        "~/contact": "/contact.html",
        "~/about/cp": "/about/competitive-programming.html",
        "~/about/web-design": "/about/web-design.html",
        "~/error/page-DNE": "/404.html",
        "~/segfault": "/segfault.html",
    }

    /** @type {string[]} */
    let suggestions = [];
    /** @type {Element[]} */
    let suggestionElems = [];
    let selectedIdx = 0;
    
    /**
     * @param {InputEvent | null} event 
     */
    function update(event) {
        /**
         * @param {string} str
         * @return {string[]}
         */
        function splitAlphanum(str) {
            return str.split(/[^a-z0-9]+/i).filter(part => part.length > 0);
        };

        /**
         * @param {string[]} arr
         * @param {string} match
         * @return {number}
         */
        function minIndexOf(arr, match) {
            let val = Number.MAX_SAFE_INTEGER;
            for (let str of arr) {
                let idx = str.indexOf(match);
                if (idx != -1 && idx < val) {val = idx;}
            }
            return val;
        }

        /** @type {string} */
        let query = event? event.target.value : "";
        query = query.trim().toLowerCase();
        searchSuggestions.innerHTML = "";
        suggestions = [];
        suggestionElems = [];
        
        for (let [key, val] of Object.entries(pageMap)) {
            if (key.toLowerCase().includes(query)
            || val.toLowerCase().replace(/\.html/, "").includes(query)) {
                suggestions.push(key);
            }
        }
        if (query.length > 0) {
            suggestions.sort((a, b) => {
                let aIdx = a.indexOf(query);
                let bIdx = b.indexOf(query);
                if (aIdx != -1 && bIdx == -1) {return -1;}
                else if (aIdx == -1 && bIdx != -1) {return 1;}
                else {
                    let aSubIdx = minIndexOf(splitAlphanum(a), query);
                    let bSubIdx = minIndexOf(splitAlphanum(b), query);
                    return aSubIdx - bSubIdx;
                }
            });
        }
        suggestions = suggestions.slice(0, 5);
        if (suggestions.length == 0) {
            searchSuggestions.innerHTML = "No pages found";
        } else {
            for (let suggestion of suggestions) {
                let suggestionElem = document.createElement("a");
                suggestionElem.classList.add("search-suggestion");
                suggestionElem.href = pageMap[suggestion];
                suggestionElem.innerHTML = suggestion;
                searchSuggestions.appendChild(suggestionElem);
                suggestionElems.push(suggestionElem);
            }
        }
        if (suggestionElems.length > 0) {
            if (selectedIdx >= suggestionElems.length) {
                selectedIdx = suggestionElems.length-1;
            }
            suggestionElems[selectedIdx].classList.add("active");
        }
    }

    searchBar.addEventListener("input", function(event) {
        update(event);
    });
    update(null);

    searchBar.addEventListener("keydown", function(event) {
        if (event.key === "ArrowDown") {
            if (suggestionElems.length > 0 && selectedIdx < suggestionElems.length-1) {
                suggestionElems[selectedIdx].classList.remove("active");
                selectedIdx++;
                suggestionElems[selectedIdx].classList.add("active");
            }
        } else if (event.key === "ArrowUp") {
            if (suggestionElems.length > 0 && selectedIdx > 0) {
                suggestionElems[selectedIdx].classList.remove("active");
                selectedIdx--;
                suggestionElems[selectedIdx].classList.add("active");
            }
        }
    });

    searchForm.onsubmit = function(event) {
        event.preventDefault();
        if (suggestions.length > 0 && selectedIdx < suggestions.length) {
            window.location.href = pageMap[suggestions[selectedIdx]];
        }
    };
}
window.addEventListener("load", setupPathSearch);