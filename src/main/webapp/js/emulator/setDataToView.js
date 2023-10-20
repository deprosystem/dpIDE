function setDataToView(rec, p, cDescr) {
    let id = p.viewId;
    let value;
    if (id != null && id != "") {
        value = rec[id];
        if (value != undefined) {
            if (value == null) {
                value = "";
            }
            switch (p.type) {
                case "TextView":
                    p.emId = p.viewId;
                    p.emVal = p.text;
                    let form = p.componParam.format;
                    if (form != null && form.length > 0) {
                        let offset = new Date().getTimezoneOffset() * 60000;
//                        Date dd = new Date(value + offset);
                        if (typeof value === "number") {
                            p.text = dateFormatV(value + offset, form);
                        } else {
                            p.text = value;
                        }
                    } else {
                        p.text = value;
                    }
                    return;
                case "Gallery":
                    let ik = value.length;
                    value = value.substring(1, ik - 1);
                    if (value != "") {
                        let arrUrl = value.split(",");
                        value = arrUrl[0];
                        value = value.substring(1, value.length - 1);
                    }
                case "ImageView":
                    p.emId = p.viewId;
                    p.emVal = p.src;
                    if (value != "" && value.indexOf("http") != 0) {
                        value = "https://deb-apps.dp-ide.com/" + value;
                    }
                    p.src = value;
                    return;
            }
        }
    }
    let ch = p.children;
    if (ch != null) {
        let ik = ch.length;
        if (ik > 0) {
            for (let i = 0; i < ik; i++)  {
                setDataToView(rec, ch[i], cDescr);
            }
        }
    }
}
/*
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
*/
function restoreView(p) {
    let id = p.viewId;
    if (p.emId != null && p.emId != "") {
        p.viewId = p.emId;
        switch (p.type) {
            case "TextView":
                p.text = p.emVal;
                return;
            case "Gallery":
            case "ImageView":
                p.src = p.emVal;
                return;
        }
        p.emId = undefined;
        p.emVal = undefined;
    }
    let ch = p.children;
    if (ch != null) {
        let ik = ch.length;
        if (ik > 0) {
            for (let i = 0; i < ik; i++)  {
                restoreView(ch[i]);
            }
        }
    }
}


