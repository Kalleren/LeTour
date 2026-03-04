export function ri(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
export function rf(a, b) { return Math.random() * (b - a) + a; }
export function sh(arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = ri(0, i); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
export function ft(s) { 
    s = Math.floor(Math.abs(s)); 
    var h = Math.floor(s/3600);
    var m = String(Math.floor((s%3600)/60)).padStart(2,"0");
    var sec = String(s%60).padStart(2,"0");
    return h + ":" + m + ":" + sec; 
}
export function ec(e, m) { return (e/m) < 0.25 ? "low" : (e/m) < 0.5 ? "med" : ""; }
export function $(id) { return document.getElementById(id); }
export function R(h) { document.getElementById("game").innerHTML = h; }

export function findInArr(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        if (fn(arr[i])) return arr[i];
    }
    return null;
}

export function findIdx(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        if (fn(arr[i])) return i;
    }
    return -1;
}