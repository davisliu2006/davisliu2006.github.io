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
        let path = document.querySelector("#top-bar-path");
        let pathDesc = [
            "~/home",
            "~/home/about",
            "~/home/projects",
            "~/home/portfolio"
        ];
        let flag = false;
        for (let i = sections.length-1; i >= 0; i--) {
            let divScr = sections[i].getBoundingClientRect().top;
            if (divScr <= window.innerHeight*0.5) {
                if (flag) {navBtns[i].classList.remove("active");}
                else {
                    flag = true;
                    navBtns[i].classList.add("active");
                    path.innerHTML = pathDesc[i];
                }
            } else {
                navBtns[i].classList.remove("active");
            }
        }
    }
    window.addEventListener("scroll", navUpdate);
    window.addEventListener("load", function() {
        setTimeout(navUpdate, 100);
    });

    // front image animation
    function canvasAnimation() {
        let canvas = document.querySelector("#front-image-canvas");
        let ctx = canvas.getContext("2d");
        let CX = canvas.clientWidth;
        let CY = canvas.clientHeight;
        const NODE_R = 10;
        const N_NODE = 30;
        const N_EDGE = 50;
        canvas.width = CX;
        canvas.height = CY;

        window.addEventListener("resize", function() {
            CX = canvas.clientWidth;
            CY = canvas.clientHeight;
            canvas.width = CX;
            canvas.height = CY;
        })

        class Node {
            x = randInt(0, CX);
            y = randInt(0, CY);
            r = NODE_R;
            vx = randDbl(-1, 1);
            vy = randDbl(-1, 1);
        }
        class Edge {
            u = 0; v = 0;
            constructor(u1, v1) {
                this.u = u1; this.v = v1;
            }
        }
        let graph = Arr(N_NODE, null);
        let nAttatch = Arr(N_NODE, 0);
        let edges = Arr(N_EDGE, null);
        let edgeLen = Arr(N_EDGE, 0);
        
        for (let i = 0; i < N_NODE; i++) {
            graph[i] = new Node();
        }
        for (let i = 0; i < N_EDGE; i++) {
            let ui = randInt(0, N_NODE-1);
            let u = graph[ui];
            let prob = [0];
            for (let vi = 0; vi < N_NODE; vi++) {
                if (ui == vi) {continue;}
                let dist = Math.sqrt(sq(u.x-graph[vi].x)+sq(u.y-graph[vi].y));
                prob.push(1/(dist)/sq(nAttatch[vi]+1)+prob[prob.length-1]);
            }
            let rand = randDbl(0, prob[prob.length-1]);
            for (let vi = N_NODE-1; vi >= 0; vi--) {
                if (ui == vi) {continue;}
                if (rand >= prob[vi - (vi > ui? 1 : 0)]) {
                    edges[i] = new Edge(ui, vi);
                    nAttatch[ui]++; nAttatch[vi]++;
                    break;
                }
            }
            // edges[i] = new Edge(randInt(0, N_NODE-1), randInt(0, N_NODE-2));
            // edges[i].v += (edges[i].v == edges[i].u);
            // let u = graph[edges[i].u];
            let v = graph[edges[i].v];
            let dx = v.x-u.x;
            let dy = v.y-u.y;
            let dist = Math.sqrt(sq(dx)+sq(dy));
            edgeLen[i] = dist;
        }
        
        function draw() {
            ctx.lineWidth = 1;
            let grad = ctx.createRadialGradient(CX*0.35,CY*0.4,0, CX*0.35,CY*0.4,CY);
            grad.addColorStop(0, "rgb(170, 200, 250, 0)");
            grad.addColorStop(1, "rgb(170, 200, 250, 0.3)");
            ctx.strokeStyle = "rgb(170, 200, 250, 0.3)";
            ctx.strokeStyle = grad;
            for (let i = 0; i < N_NODE; i++) {
                let nd = graph[i];
                ctx.beginPath();
                ctx.arc(nd.x, nd.y, NODE_R, 0, Math.PI*2);
                ctx.stroke();
                nd.x += nd.vx;
                nd.y += nd.vy;
                for (let j = 0; j < N_NODE; j++) {
                    if (i == j) {continue;}
                    let nd2 = graph[j];
                    let dx = nd2.x-nd.x;
                    let dy = nd2.y-nd.y;
                    let dist = Math.sqrt(sq(dx)+sq(dy));
                    // if (dist <= NODE_R*2) { // bounce
                    //     nd.vx -= dx/dist/dist;
                    //     nd.vy -= dy/dist/dist;
                    // }
                }
                if (nd.y < CY*-0 && nd.vy < 0) {nd.vy *= -1;} // edge bounce
                else if (nd.y >= CY*1 && nd.vy > 0) {nd.vy *= -1;}
                if (nd.x < CX*-0 && nd.vx < 0) {nd.vx *= -1;}
                else if (nd.x >= CX*1 && nd.vx > 0) {nd.vx *= -1;}
            }
            // grad.addColorStop(0, "rgb(170, 200, 250, 0)");
            // grad.addColorStop(1, "rgb(170, 200, 250, 0.3)");
            // ctx.strokeStyle = "rgb(170, 200, 250, 0.3)";
            // ctx.strokeStyle = grad;
            for (let i = 0; i < N_EDGE; i++) {
                let edge = edges[i];
                let u = graph[edge.u];
                let v = graph[edge.v];
                ctx.beginPath();
                ctx.moveTo(u.x, u.y);
                ctx.lineTo(v.x, v.y);
                ctx.stroke();
                const TENSION = 0.0001; // tension
                const DIST = edgeLen[i];
                let dx = v.x-u.x;
                let dy = v.y-u.y;
                let dist = Math.sqrt(sq(dx)+sq(dy));
                u.vx += dx/dist*(dist-DIST)*TENSION;
                u.vy += dy/dist*(dist-DIST)*TENSION;
                v.vx -= dx/dist*(dist-DIST)*TENSION;
                v.vy -= dy/dist*(dist-DIST)*TENSION;
            }
        }
        function drawLoop() {
            ctx.clearRect(0, 0, 100000, 100000);
            draw();
            setTimeout(drawLoop, 10);
        }
        drawLoop();
    }
    canvasAnimation();
}
indexMain();