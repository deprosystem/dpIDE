
//    Разные виджеты для ввода параметров UI елемента Color, number, ...

function editColorParam(title, color, classN, cb) {
    let colorHTML = '<div onclick="setPickerEditColorParam(this)" style="cursor: pointer; margin-top: 5px;float: left;">'
            +'<div class="text_style_ui"></div> '
            +'<div class="colorEditParam" style="width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>';
    let stTit = "Color";
    if (title != null) {
        stTit = title;
    }
    let el = newDOMelement(colorHTML);
    el.getElementsByClassName("text_style_ui")[0].innerHTML = stTit;
    let elColor = el.getElementsByClassName("colorEditParam")[0];
    elColor.className += " " + classN;
    elColor.style.backgroundColor = color;
    el.callBackColor = cb;
    el.colorParam = elColor;
    return el;
}

function showTitle(title) {
    let html_1 = '<div style="margin-top: 5px;float: left;clear:both;color: #8199A5">';
    let html_2 = '</div>';
    let html_3 = '<div style="float: left;clear:both;"></div>';
    contentAttributes.appendChild(newDOMelement(html_1 + title + html_2));
    contentAttributes.appendChild(newDOMelement(html_3));
}

function breakLine() {
    contentAttributes.appendChild(newDOMelement('<div style="float: left;clear:both;"></div>'));
}

function showLine() {
    contentAttributes.appendChild(newDOMelement('<div style="float: left;clear:both;height:1px;border-bottom:1px solid #1DACEf;width:100%;margin-top:5px"></div>'));
    contentAttributes.appendChild(newDOMelement('<div style="float: left;clear:both;"></div>'));
}

function editColor(title, varName, viewEl, cb) {
    let colorHTML = '<div style="margin-top: 5px;float: left;margin-right:10px;"><div class="text_style_ui">';
    let colorHTML1 = '</div></div>';
    
    let colorHTML3 = '<div onclick="setPickerEditColor(this)" style="cursor: pointer; width: 30px; height: 30px; float: left; \n\
        border: 1px solid #bbd4ef;border-radius:5px;background-color:';
    let colorHTML4 = '"></div>';
    let colInd = currentElement.android.componParam[varName];
    let elAll = newDOMelement(colorHTML + title + colorHTML1);
    let el = newDOMelement(colorHTML3 + findColorByIndex(colInd) + colorHTML4);
    el.varName = varName;
    el.viewEl = viewEl;
    el.cb = cb;
    elAll.appendChild(el);
    contentAttributes.appendChild(elAll);
}

function setPickerEditColor(el) {
    openPickerColor(el.style.backgroundColor, cbEditColor, el);
}

function cbEditColor(id, color) {
    let varName = clientElement.varName;
    let viewEl = clientElement.viewEl;
    currentElement.android.componParam[varName] = id;
    clientElement.style.background = color;
    windSelectColor.style.display = 'none';
    if (clientElement.cb != null) {
        clientElement.cb(id, color);
    }
    if (viewEl != null && viewEl) {
        viewCompon();
    }
}

function setPickerEditColorParam(el) {
    let elColor = el.getElementsByClassName("colorEditParam")[0];
    openPickerColor(elColor.style.backgroundColor, el.callBackColor);
}

function editNumberParam(title, w, h, min, max, cb, stepN) {
    let num = '<div style="float: left;"><div class="text_style_ui"></div></div>';
    let stTit = "??";
    if (title != null) {
        stTit = title;
    }
    let el = newDOMelement(num);
    el.getElementsByClassName("text_style_ui")[0].innerHTML = stTit;
    
    let nn = createNumber(w, h, min, max, cb, stepN);
    nn.style.float = "left";
    nn.style.clear = "both";
    el.appendChild(nn);
    return el;
}

function setNumberParamValue(el, v) {
    setValueNumber(el, v);
}

function editTextParam(title, w, val, cb) {
    let stHTML = '<div style="float:left;"><div style="color: #2228;font-size: 10px;margin-left:4px">';
    let stHTML_1 = '</div><input class="txt_inp input_style" style="width:'; 
    let stHTML_2 = 'px" onkeyup="return ';
    let stHTML_3 = '(this)" value="';
    let stHTML_4 = '" type="text"/></div>';
    let vv = val;
    if (val == null) {
        vv = "";
    }
    return newDOMelement(stHTML + title + stHTML_1 + w + stHTML_2 + cb + stHTML_3 + vv + stHTML_4);
}

function editCheck(title, varName, viewEl, cb) {
    val = currentElement.android.componParam[varName];
    valCh = "check-act";
    if (val != null && val) {
        valCh = "check-sel_1";
    }
    
    let changFirst = '<div style="float:left;margin-top:5px;margin-right:10px">'
                +'<div style="font-size:10px;color:#2228">' + title + '</div></div>';
    let html_1 = '<img class="_check" onclick="checkEditCheck(this);" style="cursor:pointer;margin-top:5px;margin-left:14px" width="16" height="16" src="img/' + valCh + '.png">';
    let elAll = newDOMelement(changFirst);
    let elImg = newDOMelement(html_1);
    elImg.varName = varName;
    elImg.viewEl = viewEl;
    elImg.cb = cb;
    elAll.appendChild(elImg);
    contentAttributes.appendChild(elAll);
}

function checkEditCheck(el) {
    let val = checkEditCheckbox(el);
    let varName = el.varName;
    let viewEl = el.viewEl;
    cb = el.cb;
    currentElement.android.componParam[varName] = val;
    if (cb != null) {
        cb(val);
    }
    if (viewEl != null && viewEl) {
        viewCompon();
    }
}

function editCheckbox(title, val, cb) {
    valCh = "check-act";
    if (val != null && val) {
        valCh = "check-sel_1";
    }
    let changFirst = '<div style="float:left;">'
                +'<div style="font-size:10px;color:#2228">' + title + '</div>'
                +'<img class="_check" onclick="' + cb + '(checkEditCheckbox(this));" style="cursor:pointer;margin-top:5px;margin-left:14px" width="16" height="16" src="img/' 
                + valCh + '.png">'
            +'</div>';
    return newDOMelement(changFirst);
}

function checkEditCheckbox(el) {
    let check = el.src.indexOf("check-sel") == -1;
    if (check) {
        el.src = "img/check-sel_1.png";
    } else {
        el.src = "img/check-act.png";
    }    
    return check;
}

function editImage(title, value, cb) {
    if (value == null) {
        value = "";
    }
    let stHtml = '<div style="float:left;"><div style="font-size:10px;color:#2228">' 
    let stHtml_1 = '</div><img onclick="setImgListSel(this,';
    let stHtml_2 = ')" class="imageV" style="border:2px solid #bdf;border-radius:4px;cursor:pointer" width="24" height="24" src="';
    let stHtml_3 = '"></div>';
    return newDOMelement(stHtml + title + stHtml_1 + cb + stHtml_2 + value + stHtml_3);
}

function editImageNoBorder(title, value, cb) {
    if (value == null) {
        value = "";
    }
    let stHtml = '<div style="float:left;"><div style="font-size:10px;color:#2228">' 
    let stHtml_1 = '</div><img onclick="';
    let stHtml_2 = '()" class="imageV" style="margin-left:7px;margin-top:2ps;cursor:pointer" width="24" height="24" src="';
    let stHtml_3 = '"></div>';
    return newDOMelement(stHtml + title + stHtml_1 + cb + stHtml_2 + value + stHtml_3);
}

function setImgListSel(el, cb) {
    selectListImageEl(el, cb);
}

function editId(title, varName, viewEl, el, w, cb) {
    let divRes = document.createElement('div');
    divRes.style.cssText = "float: left;margin-right:10px;margin-top:5px";
    let tit = document.createElement('div');
    tit.className = "text_style_ui";
    tit.innerHTML = title;
    divRes.appendChild(tit);
    let st = formListIdElem(el);
    let val = currentElement.android.componParam[el.varName];
    let sel = formSelectForEditData(" " + st, val);
    sel.className = "select_" + browser;
    sel.style.cssText = "width:" + w + "px;font-size:12px;color:#110000;";
    sel.varName = varName;
    sel.viewEl = viewEl;
    sel.cb = cb;
    sel.addEventListener("change", function(){changeEditId(sel)}, true);
    divRes.appendChild(sel);
    contentAttributes.appendChild(divRes);
}

function changeEditId(el) {
    let val = el.options[el.selectedIndex].value;
    currentElement.android.componParam[el.varName] = val;
    if (el.cb != null) {
        el.cb(val);
    }
    if (el.viewEl != null && el.viewEl) {
        viewCompon();
    }
}


