var downMouseElem, overMouseElem, noMoveEl;
var parentDownMouseElem;
function setNavigatorRoot() {
    navigatorEl.innerHTML = '';
    var item = createItemEl(root);
    navigatorEl.appendChild(item);
}

function addNavigatorEl(el) {
    var item = createItemEl(el);
    var parent = el.android.parent;
    var navParent = parent.android.itemNav;
    var pm = navParent.getElementsByClassName('plus-minus')[0];
    if (pm.innerHTML == '&nbsp;') {
        pm.innerHTML = '\u2BC6';
        pm.style.cursor = 'pointer';
    }
    var ic = navParent.getElementsByClassName('item-compon')[0];
    if (ic.style.display == 'none') {
        ic.style.display = 'block';
    }
    var iName = item.getElementsByClassName('item-name')[0];
    if (selectViewElement != null) {
        selectViewElement.style.backgroundColor = '#fff';
    }
    selectViewElement = iName;
    iName.style.backgroundColor = '#ffe0e0';
    ic.appendChild(item);
}

function cleanNavigatorEl(el) {
    var item = el.android.itemNav;
    var pm = item.getElementsByClassName('plus-minus')[0];
    pm.innerHTML = '&nbsp;';
    var ic = item.getElementsByClassName('item-compon')[0];
    ic.style.display = 'none';
    ic.innerHTML = "";
    var iName = item.getElementsByClassName('item-name')[0];
    if (selectViewElement != null) {
        selectViewElement.style.backgroundColor = '#fff';
    }
    selectViewElement = iName;
    iName.style.backgroundColor = '#ffe0e0';
//    ic.appendChild(item);
}

function setNavigator0() {
    navigatorEl.innerHTML = '';
    setNavigator(root_g, navigatorEl);
}

function setNavigator(el, cont) {
    var res = 0;
    var child = el.childNodes;
    var ik = child.length;
    if (ik > 0) {
        for (var i = 0; i < ik; i++) {
            var childI = child[i];
            if (childI.android !=  undefined) {
                res ++;
                var item = createItem();
                var pm = item.getElementsByClassName('plus-minus')[0];
                var item_name = item.getElementsByClassName('item-name')[0];
                if (childI.android.viewId != null) {
                    item_name.innerHTML = childI.android.viewId + ': ' + childI.android.type;
                } else {
                    item_name.innerHTML = childI.android.type;
                }
                item_name.elementLink = childI;
                item_name.style.cursor = 'pointer';
                item_name.oncontextmenu = n_contMenuStart;
                var cc = setNavigator(childI, item.getElementsByClassName('item-compon')[0]);
                if (cc > 0) {
                    pm.innerHTML = '\u2BC8';
//                    pm.innerHTML = '+';
                    pm.style.cursor = 'pointer';
                } else {
                    pm.innerHTML = '&nbsp;';
                }
                cont.appendChild(item);
            }
        }
    }
    return res;
}

function selectNavigatorEl(el) {
    var item = el.android.itemNav;
    var item_name = item.getElementsByClassName('item-name')[0];
    if (selectViewElement != null) {
        selectViewElement.style.backgroundColor = '#fff';
    }
    selectViewElement = item_name;
    item_name.style.backgroundColor = '#ffe0e0';
}

function createItemEl(el) {
    var item = createItem();
    var pm = item.getElementsByClassName('plus-minus')[0];
    var item_name = item.getElementsByClassName('item-name')[0];
    var p = el.android;
    if (p.viewId != null && p.viewId.length > 0) {
        item_name.innerHTML = p.viewId + ': ' + p.type;
    } else {
        item_name.innerHTML = p.type;
    }
    item_name.elementLink = el;
    item_name.style.cursor = 'pointer';
    item_name.oncontextmenu = n_contMenuStart;
    pm.innerHTML = '&nbsp;';
    p.itemNav = item;
    return item;
}

function createItem() {
    var container = document.createElement('div');
    container.innerHTML = '<div style="display:block;clear:both;">\n\
                <div class="plus-minus" onclick="openItem(this)" style="float:left; color:#aaa; font-size:13px; width: 12px;margin-top:-2px;"></div>\n\
                <div class="item-name" onmousedown="downNavigEl(this)" onclick="selectElement(this)" onmouseover="overNavigEl(this)" onmouseout="outNavigEl(this)"></div>\n\
                <div class="item-compon" style="margin-left: 7px; display: none;"></div>\n\
            </div>';
    return container.firstChild;
}

function selectElement(el) {
    if (selectViewElement != null) {
        selectViewElement.style.backgroundColor = '#fff';
    }
    selectViewElement = el;
    el.style.backgroundColor = '#ffe0e0';
    hideContourEl();
    currentElement = el.elementLink;
    setParamCompon();
    setPickElement(currentElement);
}

function openItem(el) {
    var par = el.parentNode;
    var item = par.getElementsByClassName("item-compon")[0];
    if (item.style.display == 'none') {
        el.innerHTML = '\u2BC6';
        item.style.display = 'block';
    } else {
        el.innerHTML = '\u2BC8';
        item.style.display = 'none';
    }
}

function downNavigEl(el) {
    downMouseElem = el;
    let pp = downMouseElem.elementLink.android;
    if (pp != null && pp.componParam != null && pp.componParam.nomove) {
        noMoveEl = true;
    } else {
        noMoveEl = false;
    }
    parentDownMouseElem = el.parentElement;
    overMouseElem = null;
    document.onmouseup = upNavigEl;
}

function upNavigEl(e) {
    if (overMouseElem != null && downMouseElem != null && ! noMoveEl) {
        let uiEl = downMouseElem.elementLink;
        overMouseElem.style.backgroundColor = "";
        overMouseElem.style.borderBottom = "";
        let parentUiEl = uiEl.android.parent;
        let pp = overMouseElem.elementLink.android;
        if (pp.parent != null) {
            pp = pp.parent.android;
        } else {
            pp = null;
        }
        if (pp != null && pp.componParam != null && pp.componParam.nodrop) {
            overMouseElem = null;
            downMouseElem = null;
            return;
        }
        uiElTarg = e.target.elementLink;
        let targ = e.target.parentElement;
        if (e.shiftKey) {
            if (uiElTarg.android != null && uiElTarg.android.typeFull.typeBlock != 0) {
                let listEl = targ.getElementsByClassName("item-compon")[0];
                uiElTarg.append(uiEl);
                uiEl.android.parent = uiElTarg;
                pMovingShift(uiEl, uiElTarg);
                listEl.appendChild(downMouseElem.parentElement);
                let pm = targ.getElementsByClassName("plus-minus")[0];
                if (pm != null && pm.innerHTML == '&nbsp;') {
                    pm.innerHTML = "+";
                    pm.style.cursor = 'pointer';
                }
            }
        } else {
            pMoving(uiEl, uiElTarg);
            uiElTarg.after(uiEl);
            uiEl.android.parent = uiElTarg.parentElement;
            targ.after(downMouseElem.parentElement);
        }
        if (parentUiEl != uiEl.android.parent) {
            let p = uiEl.android;
            p.topMarg = "";
            p.leftMarg = "";
            currentElement = uiEl;
            setParamCompon();
            viewComponElem(uiEl);
        }
    }
    overMouseElem = null;
    downMouseElem = null;
}

function pMovingShift(what, whereTo) {
    ch = currentScreen.layout.children;
    let whatP = searchElP(ch, what);
    let whereToP = searchElP(ch, whereTo);
    if (whatP != null && whereToP != null) {
        if (whereToP.p.children == null) {
            whereToP.p.children = [];
        }
        whereToP.p.children.push(whatP.p);
        whatP.ch.splice(whatP.i, 1);
    } else {
        console.log("pMoving whatP OR whereToP = NULL");
    }
}

function pMoving(what, whereTo) {
    ch = currentScreen.layout.children;
    let whatP = searchElP(ch, what);
    let whereToP = searchElP(ch, whereTo);
    if (whatP != null && whereToP != null) {
        if (whereToP.p.children == null) {
            whereToP.p.children = [];
        }
        let iDel = whereToP.i + 1;
        let ik = whereToP.ch;
        if (ik == iDel) {
            whereToP.ch.push(whatP.p);
        } else {
            whereToP.ch.splice(iDel, 0, whatP.p);
        }
        whatP.ch.splice(whatP.i, 1);
    } else {
        console.log("pMoving whatP OR whereToP = NULL");
    }
}

function searchElP(ch, el) {
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let p = ch[i];
        if (p.viewElement == el) {
            return {"ch":ch, "i":i, "p":p};
        } else {
            let pCH = p.children;
            if (pCH != null && pCH.length > 0) {
                let pp = searchElP(pCH, el);
                if (pp != null) {
                    return pp;
                }
            }
        }
    }
    return null;
}

function overNavigEl(el) {
    if (noMoveEl) return;
    if (downMouseElem != null && el != downMouseElem && ( ! isChildNavigEl(el) ) ) {
        overMouseElem = el;
        el.style.backgroundColor = "#def";
        el.style.borderBottom = "1px solid black";
    }
}

function outNavigEl(el) {
    if (noMoveEl) return;
    if (downMouseElem != null && el != downMouseElem) {
        overMouseElem = null;
        el.style.backgroundColor = "";
        el.style.borderBottom = "";
    }
}

function isChildNavigEl(el) {
    let el1 = el;
    while (el1 != navigatorEl) {
        el1 = el1.parentElement;
        if (el1 == parentDownMouseElem) {
            return true;
        }
    }
    return false;
}
