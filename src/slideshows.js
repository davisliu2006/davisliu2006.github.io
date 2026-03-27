/**
 * @param {string} selector
 * @param {boolean} wrap
 */
function initSlideshow(selector, wrap = true) {
    let slide = querySelectorNonNull(document, selector);
    _initSlideshow(slide, wrap);
}

/**
 * @param {string} selector
 * @param {boolean} wrap
 */
function initSlideshows(selector, wrap = true) {
    let slides = document.querySelectorAll(selector);
    for (let slide of slides) {
        _initSlideshow(slide, wrap);
    }
}

/**
 * @param {Element} slide
 * @param {boolean} wrap
 */
function _initSlideshow(slide, wrap = true) {
    /**
     * @param {boolean} isRight
     * @returns {Element}
     */
    function btnTemplate(isRight) {
        let btn = document.createElement("div");
        btn.id = isRight? "rbtn" : "lbtn";
        btn.classList.add("page-btn");
        btn.innerHTML = `<i class=\"fa-solid fa-arrow-${isRight? "right" : "left"}\"></i>`;
        return btn;
    }
    /**
     * @returns {Element}
     */
    function pgCountTemplate() {
        let div = document.createElement("div");
        div.classList.add("page-counter");
        return div;
    }

    let lbtn = slide.querySelector("#lbtn");
    let rbtn = slide.querySelector("#rbtn");
    let pgCount = slide.querySelector(".page-counter");
    let frame = querySelectorNonNull(slide, ".slideshow-frame");
    let inner = querySelectorNonNull(frame, ".slideshow-inner");
    let imgs = slide.querySelectorAll("img");
    console.log(inner);
    console.log(imgs.length);
    frame.style.width = "0px";

    if (!lbtn) {
        lbtn = btnTemplate(false);
        slide.append(lbtn);
    }
    if (!rbtn) {
        rbtn = btnTemplate(true);
        slide.append(rbtn);
    }
    if(!pgCount) {
        pgCount = pgCountTemplate();
        slide.append(pgCount);
    }

    let indx = (wrap? 1 : 0);

    function setup() {
        if (wrap) {
            let firstClone = imgs[0].cloneNode(true);
            let lastClone = imgs[imgs.length-1].cloneNode(true);
            inner.append(firstClone);
            inner.prepend(lastClone);
            imgs = slide.querySelectorAll("img");
        }

        let width = imgs[indx].clientWidth;
        let pos = [0];
        for (let i = 1; i < imgs.length; i++) {
            pos[i] = pos[i-1]+imgs[i-1].clientWidth;
        }

        frame.style.width = width+"px";
        inner.style.transform = "translateX("+(-pos[indx])+"px)";
        if (wrap) {
            pgCount.innerHTML = (indx)+"/"+(imgs.length-2);
        } else {
            pgCount.innerHTML = (indx+1)+"/"+imgs.length;
        }
    }
    function update() {
        let width = imgs[indx].clientWidth;
        let pos = [0];
        for (let i = 1; i < imgs.length; i++) {
            pos[i] = pos[i-1]+imgs[i-1].clientWidth;
        }

        frame.style.transition = "width 0.5s"
        inner.style.transition = "transform 0.5s"
        frame.style.width = width+"px";
        inner.style.transform = "translateX("+(-pos[indx])+"px)";
        if (wrap) {
            pgCount.innerHTML = (indx)+"/"+(imgs.length-2);
        } else {
            pgCount.innerHTML = (indx+1)+"/"+imgs.length;
        }
    }
    function updateImmediate() {
        let width = imgs[indx].clientWidth;
        let pos = [0];
        for (let i = 1; i < imgs.length; i++) {
            pos[i] = pos[i-1]+imgs[i-1].clientWidth;
        }

        frame.style.transition = ""
        inner.style.transition = ""
        frame.style.width = width+"px";
        inner.style.transform = "translateX("+(-pos[indx])+"px)";
        if (wrap) {
            pgCount.innerHTML = (indx)+"/"+(imgs.length-2);
        } else {
            pgCount.innerHTML = (indx+1)+"/"+imgs.length;
        }
    }
                            
    lbtn.onclick = function() {
        if (wrap) {
            if (indx > 1) {indx--;}
            else {
                indx = imgs.length-1;
                updateImmediate();
                indx--;
            }
        } else {
            if (indx > 0) {indx--;}
        }
        update();
    }
    rbtn.onclick = function() {
        if (wrap) {
            if (indx < imgs.length-2) {indx++;}
            else {
                indx = 0;
                updateImmediate();
                indx++;
            }
        } else {
            if (indx < imgs.length-1) {indx++;}
        }
        update();
    }
    window.addEventListener("load", function(event) {
        setup();
    });
}