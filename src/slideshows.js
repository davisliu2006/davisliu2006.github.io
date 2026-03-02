/**
 * @param {string} selector
 * @param {boolean} wrap
 */
function initSlideshow(selector, wrap = true) {
    let slide = document.querySelector(selector);
    let lbtn = slide.querySelector("#lbtn");
    let rbtn = slide.querySelector("#rbtn");
    let pgCount = slide.querySelector(".page-counter");
    let frame = slide.querySelector(".slideshow-frame");
    let inner = slide.querySelector(".slideshow-inner");
    let imgs = slide.querySelectorAll("img");
    console.log(inner);
    console.log(imgs.length);
    frame.style.width = "0px";

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