// request
/**
 * @param {string} file
 * @return {Promise<string>}
 */
async function fetchText(file) {
    return await (await fetch(file)).text();
}

// math
/**
 * @param {number} val
 * @param {number} nearest
 * @returns {number}
 */
function round(val, nearest) {
    return Math.floor(val/nearest+0.5)*nearest;
}
/**
 * @param {number} x
 * @returns {number}
 */
function rad(x) {
    return x*Math.PI/180;
}
/**
 * @param {number} x
 * @returns {number}
 */
function deg(x) {
    return x*180/Math.PI;
}
/**
 * @param {number} x
 * @returns {number}
 */
function sq(x) {
    return x*x;
}
/**
 * @param {number} x
 * @returns {number}
 */
function sgn(x) {
    if (x > 0) {return 1;}
    else if (x < 0) {return -1;}
    else {return 0;}
}

// random
/**
 * 
 * @param {number} lo
 * @param {number} hi
 * @returns {number}
 */
function randInt(lo, hi) {
    return Math.floor(Math.random()*(hi-lo+1)+lo);
}
/**
 * @param {number} lo
 * @param {number} hi
 * @returns {number}
 */
function randDbl(lo, hi) {
    return Math.random()*(hi-lo)+lo;
}

// data
/**
 * @param {number} n
 * @param {any} v
 * @returns any[]
 */
function Arr(n, v = 0) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(v);
    }
    return arr;
}
/**
 * @param {number} sx
 * @param {number} sy
 * @param {any} v
 * @returns any[][]
 */
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

/**
 * @returns {boolean}
 */
function estimateIsPhone() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return window.innerWidth < 600;
    } else {
        return false;
    }
}