var uxElem = "List,Drawer,Map,Menu,MenuBottom,Pager,Panel,ScrollPanel,SheetBottom,TabLayout,ToolBar";

function createSelectTagFromString(list, num, on) {
    ll = list.split(",");
    return createSelectTag(ll, num, on);
}

function createSelectTag(ll, num, on) {
    let ik = ll.length;
    let st = '<select id="select' + on + '" onchange="set' + on + '(this)">';
    for (let i = 0; i < ik; i++) {
        let sel = "";
        if (num == i) {
            sel = "selected";
        }
        st += '<option ' + sel + '>' + ll[i] + '</option>'
    }
    st += '</select>';
    return st;
}

function createSelectTagValue(ll, value, on) {
    let ik = ll.length;
    let st = '<select id="select' + on + '" onchange="set' + on + '(this)">';
    for (let i = 0; i < ik; i++) {
        let sel = "";
        if (value == ll[i]) {
            sel = "selected";
        }
        st += '<option ' + sel + '>' + ll[i] + '</option>'
    }
    st += '</select>';
    return st;
}

function createSelect(ll, num, on) {
    var container = document.createElement('div');
    container.innerHTML = createSelectTag(ll, num, on);
    return container.firstChild;
}

function editSelect(title, w, list, value, on) {
    let elAll = newDOMelement('<div style="margin-top: 5px;float: left;"><div class="text_style_ui" style="margin-left:4px">' + title + '</div></div>');
    let ll = list.split(",");
    let sel = newDOMelement(editCreateSelect(ll, value, on));
    sel.style.width = w + "px";
    elAll.appendChild(sel);
    return elAll;
}

function editCreateSelect(ll, value, on) {
    let ik = ll.length;
    let onCh = '"';
    if (on != null && on.length > 0) {
        onCh = '" onchange="' + on + '(this)"';
    }
    let st = '<select class = "select_' + browser + onCh + '>';
    for (let i = 0; i < ik; i++) {
        let sel = "";
        if (value == ll[i]) {
            sel = "selected";
        }
        st += '<option ' + sel + '>' + ll[i] + '</option>'
    }
    st += '</select>';
    return st;
}

function createSelectValue(ll, value, on) {
    var container = document.createElement('div')
    container.innerHTML = createSelectTagValue(ll, value, on);
    return container.firstChild;
}


//  Для below, abowe, ToRightOf, ToLeftOf
function formListViewId(el, name) {     //  Для below, abowe, ToRightOf, ToLeftOf
    let pPar = currentElement.parentElement;
    if (pPar == null) {
        return;
    }
    let listEl = pPar.children;
    if (listEl != null && listEl.length > 0) {
        let ik = listEl.length;
        let arrViewId = [];
        arrViewId.push("");
        let myId = currentElement.android.viewId;
        if (myId == null) {
            myId = "";
        }
        for (let i = 0; i < ik; i++) {
            let p = listEl[i].android;
            if (p != null && p.viewId != null && p.viewId.length > 0) {
                if (p.viewId != myId) {
                    arrViewId.push(p.viewId);
                }
            }
        }
        el.innerHTML = "";
        if (arrViewId.length > 1) {
            let nn = name[0].toLowerCase() + name.slice(1);
            let vv = currentElement.android[nn];
            if (vv == null) {
                vv = "";
            }
            if (vv == "") {
                vv = " ";
            }
            let sel = createSelectValue(arrViewId, vv, name);
            sel.style.cssText = "width:100px;font-size:12px;color:#110000;";
            sel.className = 'select_' + browser;
            el.appendChild(sel);
        }
    }
}

function formSelectTagType(type, on) {
    let listEl = currentElement.parentElement.children;
    if (listEl != null && listEl.length > 0) {
        let ik = listEl.length;
        let arrViewId = [];
        arrViewId.push("");
        for (let i = 0; i < ik; i++) {
            let p = listEl[i].android;
            if (p != null && p.type == type) {
                arrViewId.push(p.viewId);
            }
        }
        ik = arrViewId.length;
        if (ik > 1) {
            let p = currentElement.android;
            let oldValue = null;
            if (p.componParam == null) {
                p.componParam = {};
            } else {
                oldValue = p.componParam.bindEl;
            }
            
            let st = '<select class="select_'+ browser + ' onchange="' + on + '(this)">';
            for (let i = 0; i < ik; i++) {
                let sel = "";
                if (oldValue == arrViewId[i]) {
                    sel = "selected";
                }
                st += '<option ' + sel + '>' + arrViewId[i] + '</option>'
            }
            st += '</select>';
            return st;
        }
    }
    return "";
}

function formSelectForElem(type, onchange, initValue) {
    if (currentChildren != null) {
        let ik = currentChildren.length;
        let arr = [""];
        let initNum = -1;
        for (let i = 0; i < ik; i++) {
            let item = currentChildren[i];
            if (item.type == type) {
                arr.push(item.viewId);
                if (item.viewId == initValue) {
                    initNum = i;
                }
            }
        }
        return formSelectTagForType(arr, initNum, onchange);
    }
    return "";
}

function formSelectTagForType(ll, num, onchange) {
    let ik = ll.length;
    let st = '<select class="select_'+ browser + '" onchange="' + onchange + '(this)">';
    for (let i = 0; i < ik; i++) {
        let sel = "";
        if (num == i) {
            sel = "selected";
        }
        st += '<option ' + sel + '>' + ll[i] + '</option>'
    }
    st += '</select>';
    return st;
}

function formSelectForEditData(stOption, valueSel) {
    let container = document.createElement('div');
    let ll = stOption.split(",");
    let ik = ll.length;
    let st = '<select>';
    for (let i = 0; i < ik; i++) {
        let sel = "";
        if (valueSel == ll[i]) {
            sel = "selected";
        }
        st += '<option ' + sel + '>' + ll[i] + '</option>'
    }
    st += '</select>';
    container.innerHTML = st;
    return container.firstChild;
}

function selectTable(val) {
    let st = "";
    let sep = "";
    if (listTables != null) {
        let ik = listTables.length;
        for (let i = 0; i < ik; i++) {
            st += sep + listTables[i].name_table;
            sep = ",";
        }
    }
    return formSelectForEditData(st, val);
}

function formSelectViewId(valueSel, type) {
    let st = formListIdElem(currentChildren, type);
    return formSelectForEditData(" " + st, valueSel);
}

function formSelectFields(vv) {
    let dat = currentComponentDescr.model.data[0];
    st = "";
    let ik = dat.length;
    for (let i = 0; i < ik; i++) {
        let item = dat[i];
        st += "," + item.name;
    }
    return formSelectForEditData(" " + st, vv);
}

function formListIdElem(childEl, type) {
    let st = "";
    let ik = childEl.length;
    for (let i = 0; i <ik; i++) {
        let item = childEl[i];
//        if (item.type == type || type == null) {
        if (type == null || type.indexOf(item.type) > -1) {
            let vi = item.viewId;
            if (vi != null && vi != "") {
                st += "," + vi;
            }
        }
        let ch = item.children;
        if (ch != null && ch.length > 0) {
            st += formListIdElem(ch, type);
        }
    }
    return st;
}

function formListIdTags(childEl, type) {
    let st = "";
    let ik = childEl.length;
    for (let i = 0; i <ik; i++) {
        let item = childEl[i];
        if (type == null || type.indexOf("," + item.type + ",") > -1) {
            let vi = item.viewId;
            if (vi != null && vi != "") {
                st += "," + vi;
            }
        }
        let ch = item.children;
        if (ch != null && ch.length > 0) {
            st += formListIdTags(ch, type);
        }
    }
    return st;
}

function formIdTagsNoUXGroup(childEl, type) {
    let st = "";
    let ik = childEl.length;
    for (let i = 0; i <ik; i++) {
        let item = childEl[i];
        if (type == null || type.indexOf("," + item.type + ",") > -1) {
            let vi = item.viewId;
            if (vi != null && vi != "") {
                st += "," + vi;
            }
        }
        let ch = item.children;
        if (ch != null && ch.length > 0 && "Spinner,List".indexOf(item.type) == -1) {
            st += formIdTagsNoUXGroup(ch, type);
        }
    }
    return st;
}


function choiceViewById(childEl, id) {
    if (id == null) return null;
    let ik = childEl.length;
    for (let i = 0; i <ik; i++) {
        let item = childEl[i];
        if (id == item.viewId) {
            return item;
        }
        let ch = item.children;
        if (ch != null && ch.length > 0) {
            let itEl = choiceViewById(ch, id);
            if (itEl != null) return itEl;
        }
    }
    return null;
}

function formListIdElemIsType(childEl, type) {
    let st = "";
    let ik = childEl.length;
    for (let i = 0; i <ik; i++) {
        let item = childEl[i];
        let vi = item.viewId;
        if (vi != null && vi != "" && item.type == type) {
            st += "," + vi;
        }
        let ch = item.children;
        if (ch != null && ch.length > 0) {
            st += formListIdElemIsType(ch, type);
        }
    }
    return st;
}

function formSelectViewIdHandl(valueSel, addItem) {
    let st = formListIdElemHandl(currentChildren);
    let dop = "0";
    if (addItem != null && addItem.length > 0) {
        dop = "0," + addItem;
    }
    return formSelectForEditData(dop + st, valueSel);
}

function formListIdElemHandl(childEl) {
    let st = "";
    let ik = childEl.length;
    for (let i = 0; i <ik; i++) {
        let item = childEl[i];
        let vi = item.viewId;
        if (vi != null && vi != "" && uxElem.indexOf(item.type) == -1) {
            st += "," + vi;
        }
        let ch = item.children;
        if (ch != null && ch.length > 0) {
            st += formListIdElemHandl(ch);
        }
    }
    return st;
}

function formSelectIdHandlTags(valueSel, tags) {
    let st = formListIdHandlTags(currentChildren, tags);
    return formSelectForEditData(st, valueSel);
}

function formListIdHandlTags(childEl, tags) {
    let st = "";
    let ik = childEl.length;
    for (let i = 0; i <ik; i++) {
        let item = childEl[i];
        let vi = item.viewId;
        if (vi != null && vi != "") {
            if (tags != null && tags.length > 0) { 
                if (tags == item.type) {
                    st += "," + vi;
                }
            } else {
                st += "," + vi;
            }
        }
        let ch = item.children;
        if (ch != null && ch.length > 0) {
            st += formListIdHandlTags(ch, tags);
        }
    }
    return st;
}

function formSelectIdHandlUx(valueSel) {
    let st = formListIdHandlUX(currentChildren);
    return formSelectForEditData(st, valueSel);
}

function formListIdHandlUX(childEl) {
    let st = "";
    let ik = childEl.length;
    for (let i = 0; i <ik; i++) {
        let item = childEl[i];
        let vi = item.viewId;
        if (vi != null && vi != "" && item.typeUxUi == "ux") {
            st += "," + vi;
        }
        let ch = item.children;
        if (ch != null && ch.length > 0) {
            st += formListIdHandlUX(ch);
        }
    }
    return st;
}

function formSelectStrValue(stOption, valueSel) {
    
}

