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

function initAnimInView(selector, anim, start, duration, anchor=0, delay=0, revert=false) {
    let elem = document.querySelector(selector);
    elem.style["animation-name"] = anim;
    elem.style["animation-duration"] = duration+"s";
    elem.style["animation-play-state"] = "paused";
    elem.style["animation-delay"] = delay+"s";
    elem.style["animation-iteration-count"] = "1";
    elem.style["animation-fill-mode"] = "both";

    window.addEventListener("scroll", function() {
        let boundingRect = elem.getBoundingClientRect();
        let pos = (boundingRect.top*(1-anchor)+boundingRect.bottom*anchor)/window.innerHeight;
        if (pos <= start) {
            elem.style["animation-name"] = anim;
            elem.style["animation-play-state"] = "running";
        } else if (revert) {
            elem.style["animation-name"] = "none";
            elem.style["animation-play-state"] = "paused";
            elem.style["animation-delay"] = delay+"s";
        }
    });
}