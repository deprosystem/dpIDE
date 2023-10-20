function jsColorToIntAndroid (col) {
    let color;
    let ik = col.length;
    let c_1, c_2, c_3, c_4;
    if (ik == 4) {
        c_1 = col.substring(1, 2);
        c_2 = col.substring(2, 3);
        c_3 = col.substring(3);
        color = "ff" + c_1 + c_1 + c_2 + c_2 + c_3 + c_3;
    } else if (ik == 5) {
        c_1 = col.substring(1, 2);
        c_2 = col.substring(2, 3);
        c_3 = col.substring(3, 4);
        c_4 = col.substring(4);
        color = c_4 + c_4 + c_1 + c_1 + c_2 + c_2 + c_3 + c_3;
    } else if (ik == 7) {
        c_1 = col.substring(1, 3);
        c_2 = col.substring(3, 5);
        c_3 = col.substring(5);
        color = "ff" + c_1 + c_2 + c_3;
    } else {
        c_1 = col.substring(1, 3);
        c_2 = col.substring(3, 5);
        c_3 = col.substring(5, 7);
        c_4 = col.substring(7);
        color = c_4 + c_1 + c_2 + c_3;
    }
//console.log("Color="+color+"<<");
    return color;
}

function colorStrToRGB(st) {
    let res = {};
    let r1 = charToInt(st.charCodeAt(1));
    let r2 = charToInt(st.charCodeAt(2));
    res.r = r1 * 16 + r2;
    
    let g1 = charToInt(st.charCodeAt(3));
    let g2 = charToInt(st.charCodeAt(4));
    res.g = g1 * 16 + g2;
    
    let b1 = charToInt(st.charCodeAt(5));
    let b2 = charToInt(st.charCodeAt(6));
    res.b = b1 * 16 + b2;
    
    if (st.length > 7) {
        let a1 = charToInt(st.charCodeAt(7));
        let a2 = charToInt(st.charCodeAt(8));
        res.a = a1 * 16 + a2;
    }
    return res;
}




