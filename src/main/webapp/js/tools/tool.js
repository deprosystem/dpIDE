var windTooltip;

// біля елемента target показується повідомлення message на 2 секунди в рамці

function tooltipMessage(target, message) {
    let dv = tooltipMessageOver(target, message);
    setTimeout(function(){ document.body.removeChild(dv);},2000);
}

function tooltipMessageOver(target, message) {
    let sW = window.screen.width;
    let tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = message;
    document.body.append(tooltipElem);

    let coords = target.getBoundingClientRect();
    let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
    let right = left + tooltipElem.offsetWidth;
    if (right > sW) {
        left = left + sW - right - 40;
    }
    if (left < 0) left = 0;

    let top = coords.top - tooltipElem.offsetHeight - 5;
    if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
      top = coords.top + target.offsetHeight + 5;
    }

    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';
    return tooltipElem;
}

function tooltipErrorScreen(target, message) {
    let maxW = 550;
    let xy = getCoordsEl(target);
    let x = xy.left + 5;
    let y = xy.top;
    let dv = document.createElement('div');
    if (y > 30) {
        y -= 30;
    } else {
        y += 20;
    }
    let wD = document.documentElement.clientWidth;
    if ((wD - x) < maxW) {
        x = wD - maxW - 20;
    }
    dv.style.cssText = "position:absolute;max-width:" + maxW + "px;padding:5px;white-space:pre-wrap;background:var(--c_yelow_lite);border:1px solid #ffc700;border-radius:8px;left:" + x + "px;top:" + y + "px;z-index:100";
    dv.innerHTML = message;
//    dv.innerHTML = "<pre>" + message + "</pre>";
    document.body.append(dv);
    windTooltip = dv;
    return dv;
}

function tooltipMessageOut(el) {
    if (windTooltip != null) {
        document.body.removeChild(windTooltip);
    }
    windTooltip = null;
}

function tooltipHelpOver(target, message) {
    let maxW = 250;
    let xy = getCoordsEl(target);
    let x = xy.left;
    let y = xy.top;
    let dv = document.createElement('div');
    if (y > 30) {
        y -= 30;
    } else {
        y += 20;
    }
    let wD = document.documentElement.clientWidth;
    if ((wD - x) < maxW) {
        x = wD - maxW - 20;
    }
    dv.style.cssText = "position:absolute;max-width:" + maxW + "px;padding:5px;background:#d5f0ff;border:1px solid #1dace9;border-radius:8px;left:" + x + "px;top:" + y + "px;z-index:100";
    dv.innerHTML = message;
    document.body.append(dv);
    setTimeout(function(){ document.body.removeChild(dv);},2000);
}

function getCoordsEl(elem) { 
    var box = elem.getBoundingClientRect();
//console.log("pageXOffset="+pageXOffset+" CLASS="+elem.className+"<<");
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      height: box.height,
      width: box.width
    };
}
// формує перелік безпосередніх дітей елемента el з className = name
function getChildrenByClassName(el, name) {
    let c = el.children;
    let res = [];
    if (c != null && c.length > 0) {
        let ik = c.length;
        for (i = 0; i < ik; i++) {
            let cp = c[i];
            if (cp.className == name) {
                res.push(cp);
            }
        }
        if (res.length > 0) {
            return res;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

function newDOMelement(st) {
    var container = document.createElement('div')
    container.innerHTML = st;
    return container.firstChild;
}

function charToInt(c) {
    if (c < 58) {
        return c - 48;
    }
    if (c < 71) {
        return c - 55;
    }
    if (c < 103) {
        return c - 87;
    }
    return 0;
}

function checkElement(el) {
    let check = el.src.indexOf("check-sel") == -1;
    if (check) {
        el.src = "img/check-sel_1.png";
    } else {
        el.src = "img/check-act.png";
    }
    return check;
}

function isCheckElement(el) {
    return el.src.indexOf("check-sel") != -1;
}

function closeWind(el) {
    el.parentElement.parentElement.style.display = "none";
}

function createContour() {
    var container = document.createElement('div');
    container.innerHTML = '<div id="contour" class="contourEl" onmousedown="moveElement(event)"><div class="contourRT" onmousedown="resizeContour(event)"></div>\n\
        <div class="contourLT" onmousedown="resizeContour(event)"></div><div class="contourLB" onmousedown="resizeContour(event)"></div>\n\
        <div class="contourRB" onmousedown="resizeContour(event)"></div></div>';
    return container.firstChild;
}

function daysInMonth(m, y) {//m is 0-based, feb = 1
   return 31 - (m ^ 1? m % 7 & 1:  y & 3? 3: y % 25? 2: y & 15? 3: 2);
}



function hslToRgbNum(h1, s1, l1){
    let h = h1 /360;
    let s = s1 / 100;
    let l = l1 /100;
    var r, g, b;
    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    let rr = Math.round(r * 255);
    let gg = Math.round(g * 255);
    let bb = Math.round(b * 255);
    return {r:rr, g:gg, b:bb};
}

function hslToRgb(h1, s1, l1){
    let rgb = hslToRgbNum(h1, s1, l1);
    return {r:rgb.r.toString(16), g:rgb.g.toString(16), b:rgb.b.toString(16)};
}

function hslaToHexa(hsl) {
    let rgb = hslToRgbNum(hsl.h, hsl.s, hsl.l);
    let a_st = "";
    let a = hsl.a;
    if (a < 1) {
        a_st = add0(Math.round(a * 255).toString(16));
    }
    return "#" + add0(rgb.r.toString(16)) + add0(rgb.g.toString(16)) + add0(rgb.b.toString(16)) + a_st;
}

function colorBrightness(r, g, b) {
    let r_f = r / 255;
    let g_f = g / 255;
    let b_f = b / 255;
    let r_c, g_c, b_c;
    if(r_f > 0.03928) {
        r_c = Math.pow((r_f + 0.055) / 1.055, 2.4);
    } else {
        r_c = r_f / 12.92;
    }
    if(g_f > 0.03928) {
        g_c = Math.pow((g_f + 0.055) / 1.055, 2.4);
    } else {
        g_c = g_f / 12.92;
    }
    if(b_f > 0.03928) {
        b_c = Math.pow((b_f + 0.055) / 1.055, 2.4);
    } else {
        b_c = b_f / 12.92;
    }
    let L = 0.2126 * r_c + 0.7152 * g_c + 0.0722 * b_c;
    return L;
}

function contrast(c1, c2) {
    if (c1 > c2) {
        return (c1 + 0.05) / (c2 + 0.05);
    } else {
        return (c2 + 0.05) / (c1 + 0.05);
    }
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {h:h, s:s,l:l};
}

function add0(st) {
    if (st.length == 1) {
        return "0" + st;
    } 
    return st
}
