/**
 * @param {string} selectorBase
 * @param {string} selectorModal
 */
function initModal(selectorBase, selectorModal) {
    let baseElem = querySelectorNonNull(document, selectorBase);
    let modalElem = querySelectorNonNull(document, selectorModal);
    _initModal(baseElem, modalElem);
}

/**
 * @param {Element} baseElem
 * @param {Element} modalElem
 */
function _initModal(baseElem, modalElem) {
    let closeBtn = querySelectorNonNull(modalElem, "#close-btn");
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