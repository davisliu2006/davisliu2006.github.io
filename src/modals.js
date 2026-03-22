/**
 * @param {string} selectorBase
 * @param {string} selectorModal
 */
function initModal(selectorBase, selectorModal) {
    let baseElem = document.querySelector(selectorBase);
    let modalElem = document.querySelector(selectorModal);
    let closeBtn = modalElem.querySelector("#close-btn");
    let background = modalElem.querySelector(".modal-background");
    
    let is_active = false;

    baseElem.addEventListener("click", function() {
        if (!is_active) {
            is_active = true;
            modalElem.classList.add("active");
        }
    });
    closeBtn.addEventListener("click", function() {
        if (is_active) {
            is_active = false;
            modalElem.classList.remove("active");
        }
    });
    if (background) {
        background.addEventListener("click", function() {
            if (is_active) {
                is_active = false;
                modalElem.classList.remove("active");
            }
        });
    }
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            is_active = false;
            modalElem.classList.remove("active");
        }
    });
}