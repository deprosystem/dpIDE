function uxTotal() {
    this.param = {name: "Total", viewBaseId: "total", onlyOne: false};

    this.contWind;

    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return "";
    }
    
    this.getEditParam = function () {
        return "";
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:23},
                typeFull: {name: tt, typeBlock: 2}, gravLayout: {h: 3, v: BOTTOM}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:MATCH,height:40,leftMarg:20,rightMarg:20,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt, componId: componId,view:{viewId: viewId,tabLayout:"",selectedField:"",plusId:""}};
                    // в tabLayout viewId списка по которому считается сумма, в selectedField - строка с перечнем полей, по которым подводятся итоги
                    // в plusId - id элемента PlusMinus
    }
    
    this.setValue = function(componParam) {
        componParam.style.height = "40px";
        let el = elUX("Assign a List");
        let selList = newDOMelement('<select class = "select_' + browser + '">');
        selList.addEventListener('focus', () => {this.focusSel(selList)}, true);
        selList.addEventListener('change', () => {this.changeSel(selList)}, true);
        selList.innerHTML = newOptionsTypeUX("List", currentComponentDescr.view.tabLayout);
        el.append(selList);
        componParam.append(el);

        el = elUX("Assign component PlusMinus", 10);
        let selPlus = newDOMelement('<select class = "select_' + browser + '">');
        selPlus.addEventListener('focus', () => {this.focusSelPlus(selPlus)}, true);
        selPlus.addEventListener('change', () => {this.changeSelPlus(selPlus)}, true);
        selPlus.innerHTML = newOptionsTypeUX("PlusMinus", currentComponentDescr.view.plusId);
        el.append(selPlus);
        componParam.append(el);
        let datCont = newDOMelement('<div class="data_descr" style="float:left;margin-left:10px;"><div style="float:left;width:1px;height:26px;margin-top:13px;background-color:var(--c_separator)"></div></div>');
        let imgEd = newDOMelement('<img width="20" height="20" src="img/edit_meta.png" style="margin-top:16px;float:left;margin-left:10px;cursor:pointer;" data-tooltip="Data Description">');
//        let imgForm = newDOMelement('<img width="16" height="16" src="img/form_protot_hor.png" style="margin-top:18px;margin-left:10px;float:left;cursor:pointer;">');
        imgEd.addEventListener('click', () => {this.chooseDat()}, false);
//        imgForm.addEventListener('click', () => {this.formViewTotal()}, false);
        datCont.append(imgEd);
//        datCont.append(imgForm);
        componParam.append(datCont);
    }
    
    this.focusSel = function(el) {
        el.innerHTML = newOptionsTypeUX("List", currentComponentDescr.view.tabLayout);
    }
    
    this.changeSel = function(el) {
        currentComponentDescr.view.tabLayout = el.options[el.selectedIndex].value;
    }
    
    this.focusSelPlus = function(el) {
        el.innerHTML = newOptionsTypeUX("PlusMinus", currentComponentDescr.view.plusId);
    }
    
    this.changeSelPlus = function(el) {
        currentComponentDescr.view.plusId = el.options[el.selectedIndex].value;
    }
    
    this.getCreateListener = function () {
        return {vert:"", horiz:""};
    }
    
    this.chooseDat = function () {
        let viewId = currentComponentDescr.view.tabLayout;
        let listField;
        if (viewId == null || viewId.length == 0) {
            myAlert("No list specified");
        } else {
            let compList = getComponentByViewId(viewId);
            if (compList == null) {
                myAlert("No list specified");
            } else {
                listField = compList.model.data[0];
                if (listField == null || listField.length == 0) {
                    myAlert("Data in the list is not described " + viewId);
                } else {
                    this.contWind = formWind(300, 400, 40, 350, "List of fields", true, null, "Save", this, "");
                    let ik = listField.length;
                    let selF = currentComponentDescr.view.selectedField.split(",");
                    for (let i = 0; i < ik; i++) {
                        let itemV = this.oneField(i, listField[i], selF);
                        this.contWind.append(itemV);
                    }
                }
            }
        }
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.pid6y1q4zo3z";
    }
    
    this.isValid = function(compD, screen) {
//console.log("uxTotal isValid");
        let tab = "&ensp;";
        let err = {text:"",error:0};
        let listId = compD.view.tabLayout;
        let viewId = compD.view.viewId;
        if (listId == null || listId.length == 0) {
            err.text += txtError(2, tab, "component " + viewId + " no list specified 1");
            err.error = 2;
        } else {
            let compList = getComponentByViewId(listId, screen);
//console.log("isValid compList="+compList);
            if (compList == null) {
                err.text += txtError(2, tab, "component " + viewId + " no list specified 2");
                err.error = 2;
            } else {
                let listField = compList.model.data[0];
                if (listField == null || listField.length == 0) {
                    err.text += txtError(2, tab, "component " + viewId + " Data in the list is not described in " + compList.view.viewId);
                    err.error = 2;
                } 
            }
        }
        if (compD.view.selectedField == null || compD.view.selectedField == "") {
            err.text += txtError(2, tab, "component " + viewId + " No fields for totals");
            err.error = 2;
        }
//console.log("uxTotal isValid ----------------");
        return err;
    }
    
    this.oneField = function(i, item, selF) {
        let nn = item.name;
        let res = newDOMelement('<div style="height:24px;width:100%;display:flex;align-items:center;font-size:14px;"></div>');
        let name = newDOMelement('<div class="name" style="width:120px;margin-left:3px;">' + nn + '</div>');
        let type = newDOMelement('<div style="width:80px;margin-left:5px;">' + item.type + '</div>');
        let selField = newDOMelement('<img class="sel_img" style="width:18px;cursor:pointer;height:18px;" src="img/check-act.png">');
        selField.addEventListener('click', () => {this.selectFieldTot(selField)}, false);
        let jk = selF.length;
        for (let j = 0; j < jk; j++) {
            if (nn == selF[j]) {
                checkElement(selField);
                break;
            }
        }
        res.append(name);
        res.append(type);
        res.append(selField);
        return res;
    }
    
    this.selectFieldTot = function(el) {
        checkElement(el);
    }
    
    this.cbWind = function() {
        let ch = this.contWind.children;
        let ik = ch.length;
        let res = "";
        let sep = "";
        for (let i = 0; i < ik; i++) {
            let item = ch[i];
            if (isCheckElement(item.querySelector(".sel_img"))) {
                res += sep + item.querySelector(".name").innerHTML;
                sep = ",";
            }
        }
        currentComponentDescr.view.selectedField = res;
        if (res.length == 0) {
            myAlert("No fields selected for totals");
        } else {
            this.formViewTotal(res);
        }
    }
    
    this.formViewTotal = function(dat) {
        let datL = dat.split(",");
        let viewEl = currentComponent.viewElement;
        if (viewEl != null) {
            viewEl.innerHTML = "";
            viewEl.android.children.length = 0;   // очистить элементы в андроид
            viewEl.android.height = WRAP;
            let item_n = viewEl.android.itemNav;    // очистить иерархию
            let item_compon = item_n.getElementsByClassName('item-compon')[0];
            item_compon.innerHTML = "";
            setActive(viewEl);
            ik = datL.length;
            let rightN = "";
            for (let i = 0; i < ik; i++) {
                let nam = datL[i];
                currentElement = createNewEl();
                p = {type:"TextView",typeUxUi:"ui",width:WRAP,height:WRAP,typeFull:{name: 'TextView', typeBlock: 0},gravLayout:{h:4,v:4},gravity:{h:4,v:4},
                    text:nam,viewId:nam,textSize:14,letterSpac:'0.0',textColor:12,rightMarg:12,componParam:{typeValidTV:"no"}};
                if (rightN == "") {
                    p.gravLayout.h = 2;
                } else {
                    p.toLeftOf = rightN;
                }
                rightN = nam;
                currentElement.android = p;
                let typeEl = createDivText();
                currentElement.appendChild(typeEl);
                addNewElement(ACTIVE, currentElement);
                addNavigatorEl(currentElement);
                ACTIVE.android.children.push(currentElement.android);
                currentElement.android.viewElement = currentElement;
            }
            viewEl.android.height = WRAP;
            showElemChilds(viewEl);
        } else {
            myAlert("You have removed the item corresponding to the component");
        }
    }
}

