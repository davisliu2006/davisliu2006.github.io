function indexMain() {
    // title animation
    function titleAnim() {
        let title = document.querySelector("#title");
        let text = title.innerHTML;
        title.innerHTML = "";
        const delay_ms = 50;
        let i = 0;
        function typeTitle() {
            if (i < text.length-1) {
                title.innerHTML = text.substring(0, ++i)+"_";
                setTimeout(typeTitle, delay_ms);
            } else {
                title.innerHTML = text.substring(0, ++i);
            }
        }
        typeTitle();
    }
    // titleAnim();

    // nav bar highlighting
    function navUpdate() {
        let sections = [
            document.querySelector("#front-image"),
            document.querySelector("#about"),
            document.querySelector("#projects"),
            document.querySelector("#portfolio")
        ];
        let navBtns = [
            document.querySelector("#top-bar-home"),
            document.querySelector("#top-bar-about"),
            document.querySelector("#top-bar-projects"),
            document.querySelector("#top-bar-portfolio")
        ];
        let flag = false;
        for (let i = sections.length-1; i >= 0; i--) {
            let divScr = sections[i].getBoundingClientRect().top;
            if (divScr <= window.innerHeight*0.5) {
                if (flag) {navBtns[i].style.color = "";}
                else {
                    flag = true;
                    navBtns[i].style.color = "rgb(200, 200, 200, 0.7)";
                }
            } else {
                navBtns[i].style.color = "";
            }
        }
    }
    window.addEventListener("scroll", navUpdate);
    window.addEventListener("load", function() {
        setTimeout(navUpdate, 100);
    });

    function coverAnim() {
        
    }
}
indexMain();