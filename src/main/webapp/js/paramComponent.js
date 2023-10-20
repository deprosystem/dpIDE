var MATCH = -1, WRAP = -2;
var paramCompon;
var selectGravityL;
var listImg;
var fonSel = "#deeaff";
var fonNo = "#0000";
var componentMatchingElem = null;

function setParamCompon() {
    layoutParam.style.display = 'block';
    paramCompon = currentElement.android;
    el_type.innerHTML = paramCompon.type;
    setVisibility(paramCompon.visibility == null || paramCompon.visibility);

    if (paramCompon.viewId != undefined) {
        el_id_input.value = paramCompon.viewId;
    } else {
        el_id_input.value = '';
    }
//    el_id_input.onkeydown = keydown_el_id;
    el_id_input.addEventListener('keydown', function(event){keydown_el_id(event)}, false);
    el_id_input.onkeyup = keyUp_el_id;
    el_id_input.onblur = blur_el_id;
    el_id_input.onfocus = focus_el_id;
    
    if (paramCompon.alias == null) {
        alias_input.value = "";
    } else {
        alias_input.value = paramCompon.alias;
    }
    alias_input.addEventListener('keydown', function(event){keydown_el_id(event)}, false);
    alias_input.onkeyup = keyUp_alias;
    
    if (paramCompon.gravLayout != null) {
        if (paramCompon.gravLayout.h != null) {
            var child_h = gravLayoutH.children;
            for (var i = 0; i < 3; i++) {
                if (i == paramCompon.gravLayout.h) {
                    child_h[i].style.backgroundColor = fonSel;
                } else {
                    child_h[i].style.backgroundColor = '';
                }
            }
        }
        if (paramCompon.gravLayout.v != null) {
            var child_h = document.getElementById("gravLayoutV").children;
            for (var i = 0; i < 3; i++) {
                if (i == paramCompon.gravLayout.v) {
                    child_h[i].style.backgroundColor = fonSel;
                } else {
                    child_h[i].style.backgroundColor = '';
                }
            }
        }
    }

    if (paramCompon.gravity != null) {
        if (paramCompon.gravity.h != null) {
            var child_h = document.getElementById("gravityH").children;
            for (var i = 0; i < 3; i++) {
                if (i == paramCompon.gravity.h) {
                    child_h[i].style.backgroundColor = fonSel;
                } else {
                    child_h[i].style.backgroundColor = '';
                }
            }
        }
        if (paramCompon.gravity.v != null) {
            var child_h = document.getElementById("gravityV").children;
            for (var i = 0; i < 3; i++) {
                if (i == paramCompon.gravity.v) {
                    child_h[i].style.backgroundColor = fonSel;
                } else {
                    child_h[i].style.backgroundColor = '';
                }
            }
        }
    }
    if (paramCompon.visibility == null || paramCompon.visibility) {
        visibility.checked = true;
    } else {
        visibility.checked = false;
    }
    
    formListViewId(belowParam, 'Below');
    formListViewId(aboveParam, 'Above');
    formListViewId(toRightOfParam, 'ToRightOf');
    formListViewId(toLeftOfParam, 'ToLeftOf');

    el_w_match.onclick = click_el_w_match;
    el_w_wrap.onclick = click_el_w_wrap;
    el_w_input.onkeydown = keydown_el_w_input;
    el_w_input.value = '';
    el_w_match.style.backgroundColor = '#fff';
    el_w_wrap.style.backgroundColor = '#fff';
    if (paramCompon.width == MATCH) {
        el_w_match.style.backgroundColor = fonSel;
    } else if (paramCompon.width == WRAP) {
        el_w_wrap.style.backgroundColor = fonSel;
    } else {
        el_w_input.value = paramCompon.width;
    }
    
    el_h_match.onclick = click_el_h_match;
    el_h_wrap.onclick = click_el_h_wrap;
    el_h_input.onkeydown = keydown_el_h_input;
    el_h_input.value = '';
    el_h_match.style.backgroundColor = '#fff';
    el_h_wrap.style.backgroundColor = '#fff';
    if (paramCompon.height == MATCH) {
        el_h_match.style.backgroundColor = fonSel;
    } else if (paramCompon.height == WRAP) {
        el_h_wrap.style.backgroundColor = fonSel;
    } else {
        el_h_input.value = paramCompon.height;
    }
    
    let margPadParam = "8,10,12,14,16,18,20,24,28,32,40";
    if (root == currentElement) {
        margParam.style.display = 'none';
    } else {
        margParam.style.display = 'block';
        margParam.innerHTML = "";
        let  setMargH = "setMarginHoriz";
        margParam.appendChild(newDOMelement('<div class="text_style_ui">Margin</div>'));
        let selMarg = selectBlockHoriz(" :", 10, margPadParam, setMargH, 0, 300);
        setValueSelectBlock(selMarg, paramCompon.margin);
        margParam.appendChild(selMarg);
        selMarg = selectBlockHoriz("L:", 10, margPadParam, setMargH, 0, 300);
        setValueSelectBlock(selMarg, paramCompon.leftMarg);
        margParam.appendChild(selMarg);
        selMarg = selectBlockHoriz("T:", 10, margPadParam, setMargH, 0, 300);
        setValueSelectBlock(selMarg, paramCompon.topMarg);
        margParam.appendChild(selMarg);
        selMarg = selectBlockHoriz("R:", 10, margPadParam, setMargH, 0, 300);
        setValueSelectBlock(selMarg, paramCompon.rightMarg);
        margParam.appendChild(selMarg);
        selMarg = selectBlockHoriz("B:", 10, margPadParam, setMargH, 0, 300);
        setValueSelectBlock(selMarg, paramCompon.bottomMarg);
        margParam.appendChild(selMarg);
        margParam.appendChild(newDOMelement('<div id="hideMarg" style="width: 100%;height: 100%;background-color: #fffa;position: absolute;display: none"></div>'));
    }

    padParam.innerHTML = "";
    padParam.appendChild(newDOMelement('<div class="text_style_ui">Padding</div>'));
    let selPad = selectBlockHoriz(" :", 10, margPadParam, "setPadHoriz", 0, 300);
    setValueSelectBlock(selPad, paramCompon.padding);
    padParam.appendChild(selPad);
    selPad = selectBlockHoriz("L:", 10, margPadParam, "setPadHoriz", 0, 300);
    setValueSelectBlock(selPad, paramCompon.leftPad);
    padParam.appendChild(selPad);
    selPad = selectBlockHoriz("T:", 10, margPadParam, "setPadHoriz", 0, 300);
    setValueSelectBlock(selPad, paramCompon.topPad);
    padParam.appendChild(selPad);
    selPad = selectBlockHoriz("R:", 10, margPadParam, "setPadHoriz", 0, 300);
    setValueSelectBlock(selPad, paramCompon.rightPad);
    padParam.appendChild(selPad);
    selPad = selectBlockHoriz("B:", 10, margPadParam, "setPadHoriz", 0, 300);
    setValueSelectBlock(selPad, paramCompon.bottomPad);
    padParam.appendChild(selPad);
    padParam.appendChild(newDOMelement('<div id="hidePad" style="width: 100%;height: 100%;background-color: #fffa;position: absolute;display: none"></div>'));

    bg_img.src = "";
    if (paramCompon.background == null) {
        bg_color.style.backgroundColor = '#ffffff';
    } else {
        if (paramCompon.background == 100000) {
            bg_img.src = paramCompon.src;
        } else {
            bg_color.style.backgroundColor = findColorByIndex(paramCompon.background);
            bg_img.src = "";
        }
    }

    setContent();
    scrLayoutAttr.scroll_y.resize(scrLayoutAttr);
    hideSize.style.display = "none";
    hideGrav.style.display = "none";
    hideBackgr.style.display = "none";
    hideBALR.style.display = "none";
    if(typeof hideMarg !== 'undefined'){
        hideMarg.style.display = "none";
    }
    hidePad.style.display = "none";
    if (paramCompon.hideParam != null || paramCompon.hideParam > 0) {
        let hid = paramCompon.hideParam;
        if ((hid & 1) > 0) {
            hideSize.style.display = "block";
        }
        if ((hid & 2) > 0) {
            hideGrav.style.display = "block";
        }
        if ((hid & 4) > 0) {
            hideBackgr.style.display = "block";
        }
        if ((hid & 8) > 0) {
            hideBALR.style.display = "block";
        }
        if ((hid & 16) > 0) {
            hideMarg.style.display = "block";
        }
        if ((hid & 32) > 0) {
            hidePad.style.display = "block";
        }
    }
}

function setContent() {
    try {
        uiFunction = eval("new ui" + paramCompon.type + "();");
        uiFunction.setContent(paramCompon);
    } catch(e) { 
        contentAttributes.innerHTML = "";
    }
}

function keydown_el_id(event) {
    let k = event.key;
    if (k == "ArrowRight" || k == "ArrowLeft" || k == "Tab" 
        || k == "Home" || k == "End" || k == "Backspace" || k == "Delete" || k == 'Shift') {
        return true;
    }
    let targ = event.target;
    if ( ! ((k >= "a" && k <= "z") || (k >= "A" && k <= "Z") || k == "_" || (k >= "0" && k <= "9")))  {
        event.preventDefault();
        tooltipMessage(targ, "English letters only, _ and numbers");
    } else {
        if (targ.value.length == 0) { 
            if (k >= "0" && k <= "9") {
                event.preventDefault();
                tooltipMessage(targ, "The first character cannot be a digit");
            }
        } else {
            if (targ.selectionStart == 0 && k >= "0" && k <= "9") {
                event.preventDefault();
                tooltipMessage(targ, "The first character cannot be a digit");
            }
        }
    }
}

function keyUp_el_id(e) {
    paramCompon.viewId = el_id_input.value;
    var item_name = paramCompon.itemNav.getElementsByClassName('item-name')[0];
    if (paramCompon.viewId != null && paramCompon.viewId != '') {
        item_name.innerHTML = paramCompon.viewId + ': ' + paramCompon.type;
    } else {
        item_name.innerHTML = paramCompon.type;
    }
}

function keyUp_alias(e) {
    paramCompon.alias = alias_input.value;
}

function focus_el_id(e) {
    componentMatchingElem = null;
    let oldViewId = el_id_input.value;
    if (oldViewId == null || oldViewId.length == 0) return;
    let comps = currentScreen.components;
    let ik = comps.length;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            item = comps[i];
            if (oldViewId == item.view.viewId) {
                componentMatchingElem = item;
                break;
            }
        }
    }
}

function blur_el_id(e) {
    if (componentMatchingElem != null) {
        let id = el_id_input.value;
        if (id == null || id == "") {
            tooltipMessage(el_id_input, "Component cannot have an empty id");
            el_id_input.value = componentMatchingElem.view.viewId;
            paramCompon.viewId = el_id_input.value;
            var item_name = paramCompon.itemNav.getElementsByClassName('item-name')[0];
            if (paramCompon.viewId != null && paramCompon.viewId != '') {
                item_name.innerHTML = paramCompon.viewId + ': ' + paramCompon.type;
            } else {
                item_name.innerHTML = paramCompon.type;
            }
        } else {
            componentMatchingElem.view.viewId = id;
            componentMatchingElem = null;
        }
    }
}

function click_el_w_match() {
    el_w_wrap.style.backgroundColor = '';
    el_w_match.style.backgroundColor = fonSel;
    paramCompon.width = MATCH;
    el_w_input.value = '';
    viewCompon();
}

function click_el_w_wrap() {
    el_w_wrap.style.backgroundColor = fonSel;
    el_w_match.style.backgroundColor = '';
    paramCompon.width = WRAP;
    el_w_input.value = '';
    viewCompon();
}

function keydown_el_w_input(e) {
    if (e.keyCode == 13) {
        el_w_wrap.style.backgroundColor = '';
        el_w_match.style.backgroundColor = '';
        paramCompon.width = parseInt(el_w_input.value);
        viewCompon();
    }
}

function click_el_h_match() {
    el_h_wrap.style.backgroundColor = '';
    el_h_match.style.backgroundColor = fonSel;
    el_h_input.value = '';
    paramCompon.height = MATCH;
    viewCompon();
}

function click_el_h_wrap() {
    el_h_wrap.style.backgroundColor = fonSel;
    el_h_match.style.backgroundColor = '';
    el_h_input.value = '';
    paramCompon.height = WRAP;
    viewCompon();
}

function keydown_el_h_input(e) {
    if (e.keyCode == 13) {
        el_h_wrap.style.backgroundColor = '';
        el_h_match.style.backgroundColor = '';
        paramCompon.height = parseInt(el_h_input.value);
        viewCompon();
    }
}

function clickGravityL(el) {
    if (selectGravityL != null) {
        selectGravityL.style.backgroundColor = '#0000';
    }
    selectGravityL = el;
    el.style.backgroundColor = '#f00';
    var cc = el.innerHTML;
    var c = Math.trunc(cc / 3);
    var r = cc % 3;
    var p = currentElement.android;
    p.gravLayout.h = r;
    p.gravLayout.v = c;
    viewCompon();
}

function gravLayoutHorisontal(el, val) {
    var child = el.parentNode.children;
    for (var i = 0; i < 3; i++) {
        child[i].style.backgroundColor = '';
    }
    var p = currentElement.android;
    if (p.gravLayout.h == val) {
        p.gravLayout.h = NONE;
    } else {
        p.gravLayout.h = val;
        el.style.backgroundColor = fonSel;
    }
/*
    p.toRightOf = "";
    p.toLeftOf = "";
*/
    viewCompon();
}

function gravLayoutVertical(el, val) {
    var child = el.parentNode.children;
    for (var i = 0; i < 3; i++) {
        child[i].style.backgroundColor = '';
    }
    var p = currentElement.android;
    if (p.gravLayout.v == val) {
        p.gravLayout.v = NONE;
    } else {
        p.gravLayout.v = val;
        el.style.backgroundColor = fonSel;
    }
    viewCompon();
}

function gravHorisontal(el, val) {
    var child = el.parentNode.children;
    for (var i = 0; i < 3; i++) {
        child[i].style.backgroundColor = '';
    }
    var p = currentElement.android;
    if (p.gravity.h == val) {
        p.gravity.h = NONE;
    } else {
        p.gravity.h = val;
        el.style.backgroundColor = fonSel;
    }
    viewCompon();
}

function gravVertical(el, val) {
    var child = el.parentNode.children;
    for (var i = 0; i < 3; i++) {
        child[i].style.backgroundColor = '';
    }
    var p = currentElement.android;
    if (p.gravity.v == val) {
        p.gravity.v = NONE;
    } else {
        p.gravity.v = val;
        el.style.backgroundColor = fonSel;
    }
    viewCompon();
}

function closepopUp() {
    popUp.style.display = 'none';
}

function setMarginHoriz(el) {
    let p = currentElement.android;
    let value;
    let par;
    if (el.tagName == "INPUT") {
        value = el.value;
        par = el.parentElement.parentElement.parentElement;
    } else {
        if (el.tagName == "DIV") {
            value = el.innerHTML;
        } else {
            value = "";
        }
        par = el.parentElement.parentElement;
    }
    let type = par.firstElementChild.innerHTML;
    switch (type) {
        case 'L:':
            p.leftMarg = value;
            break;
        case 'T:':
            p.topMarg = value;
            break;
        case 'R:':
            p.rightMarg = value;
            break;
        case 'B:':
            p.bottomMarg = value;
            break;
        case ' :':
            p.margin = value;
            break;
    }
    viewCompon();
}

function setPadHoriz(el) {
    let p = currentElement.android;
    let value = "";
    let par;
    if (el.tagName == "INPUT") {
        value = el.value;
        par = el.parentElement.parentElement.parentElement;
    } else {
        if (el.tagName == "DIV") {
            let cc = el.style.backgroundColor;
            if (cc == null || cc == "") {
                value = "";
            } else {
                value = el.innerHTML;
            }
        } else {
            value = "";
        }
        par = el.parentElement.parentElement;
    }
    let type = par.firstElementChild.innerHTML;

    switch (type) {
        case 'L:':
            p.leftPad = value;
            break;
        case 'T:':
            p.topPad = value;
            break;
        case 'R:':
            p.rightPad = value;
            break;
        case 'B:':
            p.bottomPad = value;
            break;
        case ' :':
            p.padding = value;
            break;
    }
    showElemChilds(currentElement);
//    viewCompon();
}

function backgroundClear(el) {
    var p = currentElement.android;
    p.background = null;
    p.drawable = null;
    p.src = null;
    bg_color.style.backgroundColor = "";
    bg_img.src = "";
    viewCompon();
}

function setToolTextSize(el) {
    var p = currentElement.android;
    textSizeClear(el, true);
    el.style.backgroundColor = fonSel;
    var value = el.innerHTML;
    textSize.value = value;
    p.textSize = parseInt(value);
    viewCompon();
}

function setEditTextSize(el) {
    var p = currentElement.android;
    textSizeClear(el, true);
    el.style.backgroundColor = fonSel;
    var value = el.innerHTML;
    editTextSize.value = value;
    p.textSize = parseInt(value);
    viewCompon();
}

function changeToolTextSize(el) {
    var p = currentElement.android;
    textSizeClear(el, false);
    var value = el.value;
    p.textSize = value;
    viewCompon();
}

function textSizeClear(el, lastClear) {
    var childEl = el.parentNode.firstElementChild.nextElementSibling;
    var last = el.parentNode.lastElementChild;
    while (childEl != last) {
        childEl.style.backgroundColor = '';
        childEl = childEl.nextElementSibling;
    }
    if (lastClear) {
        last.value = '';
    }
}

function changeScaleType(el) {
    currentElement.android.scaleType = el.selectedIndex;
    viewCompon();
}

function setAbove() {
    let st = selectAbove.options[selectAbove.selectedIndex].value
    let p = currentElement.android;
    p.above = st;
    if (st.trim() != "") {
        if (p.gravLayout.v == 3) {
            p.gravLayout.v = 4;
        }
    }
    viewCompon();
}

function setBelow() {
    let st = selectBelow.options[selectBelow.selectedIndex].value;
    let p = currentElement.android;
    p.below = st;
    if (st.trim() != "") {
        if (p.gravLayout.v == 3) {
            p.gravLayout.v = 4;
        }
    }
    viewCompon();
}

function setToRightOf(el) {
    let st = el.options[el.selectedIndex].value;
    let p = currentElement.android;
    p.toRightOf = st;
    if (st.trim() != "") {
        if (p.gravLayout.h == 3) {
            p.gravLayout.h = 4;
        }
    }
    viewCompon();
}

function setToLeftOf(el) {
    let st = el.options[el.selectedIndex].value;
    let p = currentElement.android;
    p.toLeftOf = st;
    if (st.trim() != "") {
        if (p.gravLayout.h == 3) {
            p.gravLayout.h = 4;
        }
    }
    viewCompon();
}

function clickVisibility(el) {
    let check = visibility.src.indexOf("check-sel") == -1;
    currentElement.android.visibility = check;
    setVisibility(check);
}
/*
function checkVisibility(el) {
console.log("checkVisibility");
    let check = visibility.src.indexOf("check-sel") == -1;
    currentElement.android.visibility = check;
    setVisibility(check);
}
*/
function setVisibility(check) {
    if (check) {
        visibility.src = "img/check-sel.png";
        let vv = "block";
        if (currentElement.oldDisplay != null && currentElement.oldDisplay != "none") {
            vv = currentElement.oldDisplay;
        }
        currentElement.style.display = vv;
//        showElemChilds(currentElement);
    } else {
        visibility.src = "img/check-act.png";
        currentElement.oldDisplay = currentElement.style.display;
        currentElement.style.display = "none";
    }
    showElemChilds(currentElement.android.parent);
}

function setImgBG(e) {
    selectListImage(e, cbImgBG);
}

function cbImgBG(i) {
    let nn = listImage[i];
    bg_img.src = nn;
    let p = currentElement.android;
    p.background = 100000;
    p.src = nn;
    viewCompon();
}