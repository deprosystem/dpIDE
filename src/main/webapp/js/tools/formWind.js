var currentWind;
var delta_x_wind, delta_y_wind;
var h_footerWind = 50;

function formWind(w, h, t, l, tit, scroll, cbClose, footName, footListener, colorFon, noCancel) {
//     cbClose может быть как строкой с названием функции так и функцией
    let panelFon;
    if (colorFon != null) {
        let backGr = "";
        if (colorFon.length > 0) {
            backGr = "background-color:" + colorFon + ";";
        }
        panelFon = newDOMelement('<div class="qwert" style="width:100%;height:100%;' + backGr + 'position:absolute;z-index:1;"></div>');
        document.body.append(panelFon);
    }
    let ww = document.createElement('div');
    ww.className = "dataWindow";
    ww.style.width = w + 'px';
    ww.style.height = h + 'px';
    ww.style.boxShadow = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
    if (l < 0) {
        ww.style.right = -l + 'px';
    } else {
        ww.style.left = l + 'px';
    }
    ww.style.top = t + 'px';
    if (colorFon != null) {
        ww.panelFon = panelFon;
        panelFon.addEventListener('click', () => {
            event.stopPropagation();
            shake(ww);
        });
    }
    if (tit != null && tit.length > 0) {
        let titleW = createTitle(tit, cbClose);
        ww.appendChild(titleW);
    }
    let bott = 0;
    if (footName != null && footListener != null) {
        let controll = createFooter(h_footerWind);
        bott = h_footerWind;
//        bott = h_footerWind + 1;
        ww.appendChild(controll);
        let buttonOk = createButtonBlue(footName);
        if (footListener.cbWind != null) {
            buttonOk.addEventListener("click", function(){closeDataWindow(ww, footListener.cbWind());}, false);
        } else {
            buttonOk.addEventListener("click", function(){closeDataWindow(ww, footListener());}, false);
        }
        controll.appendChild(buttonOk);
        if ( ! noCancel) {
            let buttonCancel = createButtonWeite('Cancel', 70);
            buttonCancel.addEventListener("click", function(event){closeDataWindow(ww);}, true);
            controll.appendChild(buttonCancel);
        }
    }
    let contW = document.createElement('div');
    contW.style.cssText = "position:absolute;right:0px;bottom:" + bott + "px;left:0px;top:48px;";
    contW.className = "wind";
    ww.appendChild(contW);
    document.body.append(ww);
    if (scroll) {
        let scrollQu = formViewScrolY(contW);
        return scrollQu.getElementsByClassName("viewData")[0];
    };
    return contW;
}

function formPopUp(el, w, h, title) {
    let xy = getCoordsEl(el);
    let x = parseInt(xy.left + 5);
    let y = parseInt(xy.top + xy.height + 2);
    let dv = document.createElement('div');
    dv.className = "windPopUp";
    dv.style.boxShadow = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
    let wD = document.documentElement.clientWidth;
    if ((wD - x) < w) {
        x = wD - w - 20;
    }
    let hD = document.documentElement.clientHeight;
    if ((hD - y) < h) {
        y = y - h - 20; 
    }
    let panelFon = newDOMelement('<div style="width:100%;height:100%;position:absolute;z-index:20;"></div>');
    document.body.append(panelFon);
    dv.style.cssText = "z-index: 20; position: absolute;background:#ffffff; border: 1px solid #1dace9;width:" + w + "px;height:" + h + "px;left:" + x + "px;top:" + y + "px;box-shadow: 0px 30px 100px rgba(0, 0, 0, 0.1);border-radius: 5px;";
    dv.panelFon = panelFon;
    panelFon.addEventListener('click', () => {
        event.stopPropagation();
        dv.panelFon.remove();
        dv.remove();
    });
    if (title != null && title.length > 0) {
        let tit = newDOMelement('<div style="height:24px;position: absolute;left: 0;top: 0; right: 0;background-color: #f4ffff;border-radius:0px 4px 4px 0px;"><div style="text-align:center;margin-top:3px">' + title + '</div></div>');
        dv.append(tit);
    }
    document.body.append(dv);
    return dv;
}

function formPopUpAbs(w, h, x, y) {
    let dv = document.createElement('div');
    dv.className = "windPopUp";
    let panelFon = newDOMelement('<div style="width:100%;height:100%;position:absolute;z-index:20;"></div>');
    document.body.append(panelFon);
    dv.style.cssText = "z-index: 20; position: absolute;background:#ffffff; border: 1px solid #1dace9;width:" + w + "px;height:" + h + "px;left:" + x + "px;top:" + y + "px;box-shadow: 0px 30px 100px rgba(0, 0, 0, 0.1);border-radius: 5px;";
    dv.panelFon = panelFon;
    panelFon.addEventListener('click', () => {
        event.stopPropagation();
        dv.panelFon.remove();
        dv.remove();
    });
    document.body.append(dv);
    return dv;
}

function closePopUp(el) {
    let dv = el.closest('.windPopUp');
    dv.panelFon.remove();
    dv.remove();
}

function addFooter(wind, footer) {
    if (wind.className == "content") {
        let viewP = wind.parentElement;
        let ww = viewP.parentElement;
        ww.appendChild(footer);
        let h = footer.getBoundingClientRect().height;
        viewP.style.bottom = h + "px";
        viewP.scroll_y.resize(viewP);
    } else {
        wind.appendChild(footer);
    }
}

function resizeScrol(w) {
    let vp = w.parentElement;
    let scr = vp.scroll_y;
    if (scr != null) {
        scr.resize(vp);
    }
}

function formWindCenter(w, h, tit) {
    let ww = document.createElement('div');
    ww.className = "dataWindow";
    let w2 = w / 2;
    let h2 = h / 2;
    let st = 'width:' + w + 'px;height:' + h+ 'px;left:50%;top:50%;margin-top:-' + h2 + 'px;margin-left:-' + w2 + 'px;';
    ww.style.cssText = st;
    let titleW = createTitle(tit);
    ww.appendChild(titleW);
    let contW = document.createElement('div');
    contW.style.cssText = "position:absolute;right:0px;bottom:0px;left:0px;top:56px;";
    ww.appendChild(contW);
    document.body.append(ww);
    return contW;
}

function setTitleWind(el, tit) {
    let ww = el.closest(".dataWindow");
    let tt = ww.querySelector(".titleWindName");
    tt.innerHTML = tit;
}

function setHelp(el, url) {
    let ww = el.closest(".dataWindow");
    let tt = ww.querySelector(".titleWind");
    let quest = newDOMelement('<img src="img/question_blue.png" style="position:absolute;width:12px;height:12px;right:30px;top:16px;cursor:pointer">');
    quest.addEventListener('click', () => {window.open(url);});
    tt.append(quest);
}

function createTitle(tit, cbClose) {
    let str;
    let strClick = "";
    if (cbClose != null) {
        if (typeof cbClose == "string") {
            let cb = "false";
            if (cbClose.length > 0) {
                cb = cbClose + "(this)";
                strClick = "onclick='closeDataWindow(this, " + cb + ")'";
            } else {
                strClick = "onclick='closeDataWindow(this)'";
            }
        }
    } else {
        strClick = "onclick='closeDataWindow(this)'";
    }

    str = "<div class='titleWind' onmousedown='moveWind(event)'>"
                +"<div style='float:left;height:100%;display:flex;flex-direction:row;align-items:center'><div class='titleWindName'>" + tit + "</div></div>"
                +"<div class='contImg' style='float:right;height:100%;display:flex;flex-direction:row;align-items:center'></div>"
            +"</div>";
    let titView = newDOMelement(str);
    let imgClose = newDOMelement("<IMG SRC='img/x_blue.png' class='titleWindClose' " + strClick + ">");
    let contImg = titView.querySelector(".contImg");
    contImg.append(imgClose);
    if (cbClose != null && typeof cbClose != "string") {
        if (cbClose.cbCloseWind != null) {
            imgClose.addEventListener('click', () => {closeDataWindow(imgClose, cbClose.cbCloseWind(imgClose))});
        } else {
            imgClose.addEventListener('click', () => {closeDataWindow(imgClose, cbClose(imgClose))});
        }
    }
    return titView;
}

function closeDataWindow(el, no) {
    if ( ! no ) {
        let el_1 = el.closest('.dataWindow');
        if (el_1.panelFon != null) {
            el_1.panelFon.remove();
        }
        el_1.remove();
    }
}

function closeWindow(el) {
    let el1 = parentWind(el);
    el1.parentNode.removeChild(el1);
}

function parentWind(el) {
    let el1 = el;
    while (el1.className != "dataWindow") {
        el1 = el1.parentElement;
        if (el1 == null) {
            return null;
        }
    }
    return el1;
}

function newElementFromString(st) {
    let container = document.createElement('div')
    container.innerHTML = st;
    return container.firstChild;
}

function addButton(txt) {
    let
}

function createButtonBlue(tit, w) {
    var container = document.createElement('div')
    if (w != null) {
        container.innerHTML = '<div style="cursor:pointer;width:' + w + 'px;height:30px;background:#1DACE9;border-radius:4px;margin-left:15px;margin-top:10px;float:left;">'
                +'<div style="text-align: center;margin-top:7px;color:#fff">'+ tit + '</div></div>';
    } else {
        container.innerHTML = '<div style="cursor:pointer;height:30px;background:#1DACE9;border-radius:4px;margin-left:15px;margin-top:10px;float:left;padding-left:7px;padding-right:7px">'
                +'<div style="text-align: center;margin-top:7px;color:#fff">'+ tit + '</div></div>';
    }
    return container.firstChild;
}

function createButtonWeite(tit, w) {
    var container = document.createElement('div')
    container.innerHTML = '<div style="cursor:pointer;width:' + w + 'px;border:1px solid #1DACE9;height:28px;border-radius:4px;margin-left:10px;margin-top:10px;float:left;">'
            +'<div style="text-align: center;margin-top:7px;color:#1DACE9">'+ tit + '</div></div>';
    return container.firstChild;
}

function createFooter(h) {
    let container = document.createElement('div');
    container.style.cssText = "height:" + h + "px;bottom:0px;right:0px;left:0px;position:absolute;border-top:1px solid #C5DCFA;";
    container.className = "footer_wind";
    return container;
}

function moveWind(event) {
    var x = event.pageX;
    var y = event.pageY;
    currentWind = event.currentTarget.parentNode;
    var x_block = currentWind.offsetLeft;
    var y_block = currentWind.offsetTop;

    delta_x_wind = x_block - x;
    delta_y_wind = y_block - y;
    document.onmousemove = dragWind;
    document.onmouseup = clearMoveWind;
}

function dragWind(event) {
    var x = event.pageX;
    var y = event.pageY;

    var new_x = delta_x_wind + x;
    var new_y = delta_y_wind + y;
    currentWind.style.top = new_y + "px";
    currentWind.style.left = new_x + "px";
}

function clearMoveWind(e) {
    document.onmousemove = null;
}

//  ViewScrol заносится в wraperScroll
function formViewScrolY(wraperScroll, hide) {
    let viewport = document.createElement('div');
    viewport.className = "viewport";
    viewport.style.top = "0px";
    wraperScroll.appendChild(viewport);

    let content = document.createElement('div');
    content.className = "content";
   content.style.bottom = "0px";
    viewport.appendChild(content);
    let viewDataY = document.createElement('div');
    viewDataY.className = "viewData";
    viewDataY.style.cssText = "margin-right:15px; margin-bottom:10px;-webkit-user-select: none; user-select: none;overflow:hidden";
    content.appendChild(viewDataY);

    let scrollY = new ScrollY(viewport, true);
    let hhh = hide;
    if (hhh == null) {
        hhh = true;
    }
    scrollY.setScrollHide(hhh);
    scrollY.init();
    return viewport;
}

