async function loadGlobal() {
    let response = await fetch("global.html");
    let text = await response.text();
    let global = document.getElementById("global");
    global.innerHTML = text;
}
loadGlobal();