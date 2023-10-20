function uxPanel() {
    this.param = {name: "Panel", viewBaseId: "panel", onlyOne: false};
    this.hiddenHandlers = ",Autch,Data,";
    let devider = '<div style="height:1px;background-color:#1dace9;margin-top:5px"></div><div class="comp_view_param" style="height:42px;">\n\
        <div class="no_data" style="float: left;"><div class="text_style_ui">View if no data</div></div></div>';
    
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return docNavigator;
    }
    
    this.getEditParam = function () {
        return uxModelView("createViewForPanelV", "createViewForPanelH") + devider;
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:7},
                typeFull: {name: tt, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt, componId: componId, model:{method:0,data:[[]]},view:{viewId: viewId,no_data:""},navigator:[]};
    }
    
    this.getCreateListener = function () {
        return {vert:"createViewForPanelV", horiz:"createViewForPanelH"};
    }
    
    this.setValue = function(componParam) {
        setValueModel(componParam);
        setValueViewPan(componParam);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.nvu24dbuzxym";
    }
    
    this.isValid = function(compD) {
        let err = {text:"",error:0};
        
        return err;
    }
}

function setValueViewPan(componParam) {
    let view = currentComponentDescr.view;
    let no_data = componParam.getElementsByClassName("no_data")[0];
    if (view.no_data == null) {
        view.no_data = "";
    }
    let st = formListIdElem(currentChildren);
    let sel = formSelectForEditData(" " + st, view.no_data);
    currentComponentDescr.view.no_data = sel.options[sel.selectedIndex].value;
    sel.className = "select_" + browser;
    sel.style.cssText = "width:80px;font-size:12px;color:#110000;";
    sel.addEventListener("change", function(){changeNoDataPan(sel)}, true);
    no_data.appendChild(sel);    
}

function createViewForPanelV(el) {
    let listV = currentComponent.viewElement;
    if (currentComponent.type.indexOf("Scroll") > -1) {
        listV = listV.querySelector(".infoItem");
    }
    let isSpinner = false;
    if (listV != null) {
        let ik = currentComponentDescr.model.data[0].length;
        if (ik > 0) {
            let imgHeight = 240;
            n_selectElement = listV;
            setActive(n_selectElement);
            let namePrev = "";
            n_selectElement.innerHTML = "";
            cleanNavigatorEl(n_selectElement);
            ACTIVE.android.children.length = 0;
            let imgId = formImgFirst(MATCH, imgHeight, currentComponentDescr.model.data[0]);
            if (imgId > -1) {
                namePrev = currentComponentDescr.model.data[0][imgId].name;
            }
            let topM = 10;
            let estimatedHeight = imgHeight + 12;
            for (let i = 0; i < ik; i++) {
                let item = currentComponentDescr.model.data[0][i];
                if (item.notShow) continue;
                if (item.edit != null && item.edit == "spinner") {
                    isSpinner = true;
                }
                if (imgId != i) {
                    formElement(item, "", namePrev, topM);
                    namePrev = item.name;
                    if (item.type == "Gallery") {
                        estimatedHeight += 242;
                    } else {
                        estimatedHeight += 22;
                    }
                }
            }
            if (currentComponent.type.indexOf("Form") > -1) {
                let button = formButton("Send");
                p = button.android;
                if (namePrev != "") {
                    p.below = namePrev;
                }
                p.topMarg = 40;
            }
            listV.android.height = MATCH;
            if (isSpinner) {
                setScreenView();
            } else {
                showElemChilds(listV);
            }
        } else {
            tooltipMessage(el, "You need to describe the data");
        }
    } 
}

function createViewForPanelH(el) {
    let listV = currentComponent.viewElement;
    if (listV != null) {
        let ik = currentComponentDescr.model.data[0].length;
        if (ik > 0) {
            let listVHeight = 128;
            n_selectElement = listV;
            setActive(n_selectElement);
            n_selectElement.innerHTML = "";
            cleanNavigatorEl(n_selectElement);
            ACTIVE.android.children.length = 0;
            let height = 120;
            let toRightOf = "";
            let imgId = formImgFirst(height, height, currentComponentDescr.model.data[0], 4, 12);
            if (imgId > -1) {
                toRightOf = currentComponentDescr.model.data[0][imgId].name;
            }
            let topM = 16;
            let estimatedHeight = topM;
            let namePrev = "";
            for (let i = 0; i < ik; i++) {
                let item = currentComponentDescr.model.data[0][i];
                if (item.notShow) continue;
                if (imgId != i) {
                    formElement(item, toRightOf, namePrev, topM);
                    currentElement.android.viewElement = currentElement;
                    namePrev = item.name;
                    topM = 10;
                    estimatedHeight += 22;
                }
            }
            if (listVHeight < estimatedHeight) {
                listVHeight = estimatedHeight;
            }

            listV.android.height = listVHeight;
//            currentElement = listV;
            showElemChilds(listV);
//            viewCompon();
        } else {
            tooltipMessage(el, "You need to describe the data");
        }
    } 
}

function changeNoDataPan(el) {
    currentComponentDescr.view.no_data = el.options[el.selectedIndex].value;
}

