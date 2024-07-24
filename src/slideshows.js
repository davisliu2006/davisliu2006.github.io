function initSlideshow(selector) {
    let slide = document.querySelector(selector);
    let lbtn = slide.querySelector("#lbtn");
    let rbtn = slide.querySelector("#rbtn");
    let pgCount = slide.querySelector(".page-counter");
    let frame = slide.querySelector(".slideshow-frame");
    let inner = slide.querySelector(".slideshow-inner");
    let imgs = slide.querySelectorAll("img");
    console.log(inner);
    console.log(imgs.length);

    let indx = 0;

    function setup() {
        let width = imgs[indx].clientWidth;
        let pos = [0];
        for (let i = 1; i < imgs.length; i++) {
            pos[i] = pos[i-1]+imgs[i-1].clientWidth;
        }

        frame.style.width = width+"px";
        inner.style.transform = "translateX("+(-pos[indx])+"px)";
        pgCount.innerHTML = (indx+1)+"/"+imgs.length;
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
        pgCount.innerHTML = (indx+1)+"/"+imgs.length;
    }
                            
    lbtn.onclick = function() {
        if (indx > 0) {indx--;}
        update();
    }
    rbtn.onclick = function() {
        if (indx < imgs.length-1) {indx++;}
        update();
    }
    window.addEventListener("load", function(event) {
        setup();
    });
}