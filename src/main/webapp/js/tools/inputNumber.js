function createNumber(w, h, min, max, cb, stepN) {
    let step = 1;
    let fraction = 0;
    if (stepN != null) {
        step = stepN;
        let st = String(step);
        let ll = st.indexOf(".");
        if (ll > -1) {
            fraction = st.length - st.indexOf(".") - 1;
        }
    }
    let minP = -999999999;
    if (min != null) {
        minP = min;
    }
    let maxP = 999999999;
    if (max != null) {
        maxP = max;
    }
    let butt = '<div style="width:13px;height:100%;cursor:pointer;position:absolute;right:0">\n\
            <div onclick="numberUp(this,' + minP + ',' + maxP + ',' + step + ',' + fraction + ')" style="width:10px;height:50%"></div>\n\
            <div onclick="numberDn(this,' + minP + ',' + maxP + ',' + step + ',' + fraction + ')" style="width:10px;height:50%"></div>\n\
        </div>';
    let margT = h - 20;
    let cssMargT = "";
    if (margT > 0) {
        margT = margT / 2 + 1;
        cssMargT = "margin-top:" + margT + "px;";
    }
    let divN = document.createElement("div");
    divN.style.cssText = "width:" + w + "px;height:" + h + "px;position:relative;border: 1px solid #bbd4ef;border-radius:5px;background-color:white;";
    let img = document.createElement("img");
    img.src = "img/chevron_d_u.png";
    img.style.cssText = "position:absolute;height:20px;right:2px;" + cssMargT;
    let cbInp = "";
    if (cb != null && cb != "") {
        cbInp = ' oninput="' + cb + '(this)" ';
    }
    let inp = newDOMelement('<input size="1"' + cbInp + 'onkeydown="return validNumber(event)" style="left:2px;border:0;outline: none;border-radius:5px;position:absolute;height:' + (h - 3) + 'px;width:' + (w - 14) + 'px">');
    divN.appendChild(inp);
    divN.appendChild(img);
    divN.appendChild(newDOMelement(butt));
    return divN;
}

function editNumber(title, w, cb) {
    let div = newDOMelement('<div style="margin-top: 3px;float: left;margin-left:10px;width:' + w + 'px;"></div>');
    let tit = newDOMelement('<div class="text_style_ui">' + title + '</div>');
    let cbInp = "";
    if (cb != null && cb != "") {
        cbInp = ' oninput="' + cb + '(this)" ';
    }
    let inp = newDOMelement('<input size="1"' + cbInp + 'onkeydown="return validNumber(event)" style="float:left;border:1px solid #bbd4ef;outline: none;border-radius:5px;height:24px;width:100%">');
    div.append(tit);
    div.append(inp);
    return div;
}

function setValueNumber(el, val) {
    let inp = el.getElementsByTagName("input")[0];
    inp.value = val;
}

function numberUp(el, min, max, step, fraction) {
    let par = el.parentElement.parentElement;
    let inp = par.getElementsByTagName("input")[0];
    let vv = inp.value;
    if (vv == null || vv == "") {
        if (min > -999999999) {
            vv = min;
        } else {
            vv = 0;
        }
        inp.value = vv;
    } else {
        if (vv.indexOf(".") > -1) {
            vv = parseFloat(vv);
        } else {
            vv = parseInt(vv);
        }
    }
    if (vv < max) {
        let res = vv + step;
        inp.value = res.toFixed(fraction);
        if (inp.oninput != null) {
            inp.oninput(inp);
        }
    }
}

function numberDn(el, min, max, step, fraction) {
    let par = el.parentElement.parentElement;
    let inp = par.getElementsByTagName("input")[0];
    let vv = inp.value;
    if (vv == null || vv == "") {
        if (min > -999999999) {
            vv = min;
        } else {
            vv = 0;
        }
        inp.value = vv;
    }  else {
        if (vv.indexOf(".") > -1) {
            vv = parseFloat(vv);
        } else {
            vv = parseInt(vv);
        }
    }
    if (vv > min) {
        let res = vv - step;
        inp.value = res.toFixed(fraction);
        if (inp.oninput != null) {
            inp.oninput(inp);
        }
    }
}