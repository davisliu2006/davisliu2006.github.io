function initViewPosAnim(selector, anim, start, end) {
    let elem = document.querySelector(selector);
    elem.style["animation-name"] = anim;
    elem.style["animation-duration"] = "1s";
    elem.style["animation-play-state"] = "paused";
    elem.style["animation-iteration-count"] = "1";
    elem.style["animation-fill-mode"] = "both";

    window.addEventListener("scroll", function() {
        let boundingRect = elem.getBoundingClientRect();
        let pos = boundingRect.top/window.innerHeight;
        elem.style["animation-delay"] = (pos-start)/(start-end)+"s";
    });
}

function initAnimInView(selector, anim, start, duration) {
    let elem = document.querySelector(selector);
    elem.style["animation-name"] = anim;
    elem.style["animation-duration"] = duration+"s";
    elem.style["animation-play-state"] = "paused";
    elem.style["animation-iteration-count"] = "1";
    elem.style["animation-fill-mode"] = "both";

    window.addEventListener("scroll", function() {
        let boundingRect = elem.getBoundingClientRect();
        let pos = boundingRect.top/window.innerHeight;
        if (pos <= start) {
            elem.style["animation-play-state"] = "running";
        }
    });
}