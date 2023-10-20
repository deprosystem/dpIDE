function selectBlock(titl, val, cb, min, max, step) {
    let divRes = document.createElement('div');
    divRes.className = "inputBlock";
    let tit = document.createElement('div');
    tit.className = "text_style_ui";
    tit.innerHTML = titl;
    divRes.appendChild(tit);
    let divSelList = document.createElement('div');
    divSelList.cssText = "float: left;margin-top:3px";
    divSelList.className = "divSelList";
    divSelList.innerHTML = newSelList(val, cb);
    divRes.appendChild(divSelList);
    let numb = createNumber(50, 24, min, max, "changeSelectBlockNumb(this);" + cb, step);
    numb.style.float = "left";
    numb.className = "numb";
    numb.style.marginLeft = "8px";
    divSelList.appendChild(numb);
    return divRes;
}

function selectListID(titl, w, el, val, cb, type) {
    let divRes = document.createElement('div');
    divRes.style.cssText = "float: left;margin-left:10px;";
    let tit = document.createElement('div');
    tit.className = "text_style_ui";
    tit.innerHTML = titl;
    divRes.appendChild(tit);
    let st;
    if (type != null && type != "") {
        st = formListIdElemIsType(el, type);
    } else {
        st = formListIdElem(el);
    }
    let sel = formSelectForEditData(" " + st, val);
    sel.className = "select_" + browser;
    sel.style.cssText = "width:" + w + "px;font-size:12px;color:#110000;";
    sel.addEventListener("change", function(){cb(sel)}, true);
    divRes.appendChild(sel);

    return divRes;
}

function selectBlockHoriz(titl, w, val, cb, min, max, step) {
    let divRes = document.createElement('div');
    divRes.className = "inputBlockH";
    let tit = document.createElement('div');
    tit.style.cssText = "float:left;margin-top:5px;width:" + w + "px; float: left;text-align: right";
//    tit.className = "text_style_ui";
    tit.innerHTML = titl;
    divRes.appendChild(tit);
    let divSelList = document.createElement('div');
    divSelList.style.float = "left";
    divSelList.className = "divSelList";
    divSelList.innerHTML = newSelListHoriz(val, cb);
    divRes.appendChild(divSelList);
    let numb = createNumber(50, 24, min, max, "changeSelectBlockNumb(this);" + cb, step);
    numb.style.float = "left";
    numb.className = "numb";
    numb.style.marginLeft = "8px";
    divSelList.appendChild(numb);
    divSelList.appendChild(newDOMelement('<img width="10" height="10" onclick="clearSelectValue(this);' 
            + cb + '(this);" style="margin-left: 7px;margin-top:7px;cursor: pointer;" src="img/del_red.png">'));
    return divRes;
}

function newSelListHoriz(val, cb) {
    let arrVal = val.split(",");
    let ik = arrVal.length;
    let st = "";
    for (let i = 0; i < ik; i++) {
        let vv = arrVal[i];
        st += '<div onclick="clearSelectValue(this);' + cb + '(this);" class="el_marg_pad">' + vv + '</div>';
    }
    return st;
}

function newSelList(val, cb) {
    let arrVal = val.split(",");
    let ik = arrVal.length;
    let st = "";
    for (let i = 0; i < ik; i++) {
        let vv = arrVal[i];
        st += '<div onclick="clearSelectValue(this);' + cb + '(' + vv + ');" class="el_marg_pad">' + vv + '</div>';
    }
    return st;
}

function clearSelectValue(el) {
    clearSelectList(el);
    let par = el.parentElement;
    let numb = par.getElementsByTagName("input")[0];
    if (numb != null) {
//        numb.value = el.innerHTML;
        let cc = el.style.backgroundColor;
        if (cc == null || cc == "") {
            numb.value = "";
        } else {
            numb.value = el.innerHTML;
        }
    }
}

function clearSelectValueIMG(el) {
    clearSelectList(el);
    let par = el.parentElement;
    let numb = par.getElementsByTagName("input")[0];
    if (numb != null) {
        numb.value = "";
    }
}

function clearSelectList(el) {
    let par = el.parentElement;
    let ch = par.children;
    let ik = ch.length - 1;
    let val = el.innerHTML;
//console.log("clearSelectList parent="+par.className+"<< IK="+ik+"<< VAL="+val+"<<");
    for (let i = 0; i < ik; i++) {
        let item = ch[i];
        if (item.innerHTML == val) {
            let cc = item.style.backgroundColor;
            if (cc == null || cc == "") {
                item.style.backgroundColor = fonSel;
            } else {
                item.style.backgroundColor = "";
            }
        } else {
            item.style.backgroundColor = "";
        }
    }
}

function changeSelectBlockNumb(el) {
    clearSelectList(el.parentElement);
}

function setValueSelectBlock(el, val) {
    if (val == null || val == "") return;
    let divSelList = el.querySelector(".divSelList");
    if (divSelList == null && el.className == "divSelList") {
        divSelList = el;
    }
    let ch = divSelList.getElementsByClassName("el_marg_pad");
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let item = ch[i];
        if (item.innerHTML == val) {
            item.style.backgroundColor = fonSel;
        } else {
            item.style.backgroundColor = "";
        }
    }
    let numb = divSelList.getElementsByClassName("numb")[0];
    setValueNumber(numb, val);
}

function dropDownList (title, list, w, cb, valSelect) {
    let st_1 = '<div style="float:left;margin-left:10px"><div style="font-size:10px;color:#2228">';
    let st_2 = '</div><select style="width:';
    let st_2a = 'px" class="select_';
    let st_3 = '" onchange="';
    let st_3a = '(this)">';
    let st_4 = '</select></div>'
    let options = "";
    let arrList = list.split(",");
    let ik = arrList.length;
    if (ik > 0) {
        let vs = valSelect;
        if (vs == null || vs.length == 0) {
            vs = arrList[0];
        }
        for (let i = 0; i < ik; i++) {
            let opt = arrList[i];
            let sel = "";
            if (vs == opt) {
                sel = " selected"; 
            }
            options += '<option' + sel + '>' + opt + '</option>';
        }
    }
    return newDOMelement(st_1 + title + st_2 + w + st_2a + browser + st_3 + cb + st_3a + options + st_4);
}

