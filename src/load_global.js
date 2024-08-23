async function loadGlobal() {
    let response = await fetch("global.html");
    let text = await response.text();
    let global = document.getElementById("global");
    global.innerHTML = text;

    // nav bar highlight
    let navInfo = document.querySelector("._info #nav-info");
    if (navInfo) {
        let navBtn = document.getElementById(navInfo.innerHTML);
        navBtn.classList.add("active");
    }

    // top bar path
    let path = document.querySelector("#top-bar-path");
    let pathInfo = document.querySelector("._info #path-info");
    if (pathInfo) {
        path.innerHTML = pathInfo.innerHTML;
    } else {
        path.innerHTML = "~/";
    }
}
loadGlobal();