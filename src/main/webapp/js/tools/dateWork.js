function dateServer(val, format) {
    let offset = new Date().getTimezoneOffset() * 60000;
    return dateFormatV(val + offset, format);
}
function dateFormatV(val, format) {
    let inp = newDOMelement('<input type="date"/>');
    inp.valueAsNumber = val;
    let ar = inp.value.split("-");
    let d = ar[2];
    let m = ar[1];
    let y = ar[0];
    let stDat = format;
    if (format.indexOf("yyyy") > -1) {
        stDat = stDat.replace("yyyy", y);
    } else {
        if (format.indexOf("yy") > -1) {
            let y2 = y.substring(2, 4);
            stDat = stDat.replace("yy", y2);
        }
    }
    if (format.indexOf("dd") > -1) {
        stDat = stDat.replace("dd", d);
    } else {
        if (format.indexOf("d") > -1) {
            let d1 = d;
            if (d1.indexOf("0") == 0) {
                d1 = d1.replace("0","");
            }
            stDat = stDat.replace("d", d1);
        }
    }
    if (format.indexOf("MM") > -1) {
        stDat = stDat.replace("MM", m);
    } else {
        if (format.indexOf("M") > -1) {
            let m1 = m;
            if (m1.indexOf("0") == 0) {
                m1 = m1.replace("0","");
            }
            stDat = stDat.replace("M", m1);
        }
    }
    return stDat;
//    return dd.toString(format);
}


