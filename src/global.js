// formating
function format(str, varArr, spChar = '%') {
    let i = 0;
    let temp = "";
    for (let j in str) {
        let c = str[j];
        if (c == spChar) {temp += varArr[i++];}
        else {temp += c;}
    }
    return temp;
}

// request
async function fetchText(file) {
    return await (await fetch(file)).text();
}

// math
function round(val, nearest) {
    return Math.floor(val/nearest+0.5)*nearest;
}
function rad(x) {
    return x*Math.PI/180;
}
function deg(x) {
    return x*180/Math.PI;
}
function sq(x) {
    return x*x;
}
function sgn(x) {
    if (x > 0) {return 1;}
    else if (x < 0) {return -1;}
    else {return 0;}
}

// random
function randInt(lo, hi) {
    return Math.floor(Math.random()*(hi-lo+1)+lo);
}
function randDbl(lo, hi) {
    return Math.random()*(hi-lo)+lo;
}

// data
function Arr(n, v = 0) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(v);
    }
    return arr;
}
function Arr2d(sx, sy, v = 0) {
    let arr = [];
    for (let x = 0; x < sx; x++) {
        let line = [];
        for (let y = 0; y < sy; y++) {
            line.push(v);
        }
        arr.push(line);
    }
    return arr;
}