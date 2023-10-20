
function uxSheetBottom() {
    this.param = {name: "SheetBottom", viewBaseId: "sheet_b", onlyOne: false};
    this.hiddenHandlers = ",Autch,Data,";
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return docNavigator;
    }
    
    this.getEditParam = function () {
        return uxModelView("createViewForSheetV", "");
    }
    
    this.getCreateListener = function () {
        return {vert:"createViewForSheetV", horiz:""};
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId: viewId, typeUxUi: "ux", componParam:{type:12, bool_1:false,bool_2:false,color_1:17},
                typeFull: {name: tt, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt, componId: componId, model:{method:0,data:[[]]},view:{viewId: viewId},navigator:[]};
    }
    
    this.setValue = function(componParam) {
        setValueModel(componParam);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.nvu24dbuzxym";
    }
    
    this.isValid = function(compD) {
        let err = {text:"",error:0};
        
        return err;
    }
}

function createViewForSheetV(el) {
    let listV = currentComponent.viewElement;
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

            listV.android.height = estimatedHeight + 10;
            currentElement = listV;
            viewCompon();
        } else {
            tooltipMessage(el, "You need to describe the data");
        }
    } 
}

function createSheetBottomForUX(id) {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = "SheetBottom";
    p.typeFull = {name: 'SheetBottom', typeBlock: 0};
    p.gravLayout = {h:4,v:4};
    p.gravity = {h:4,v:4};
    currentElement.android = p;
    p.width = -1;
    p.height = -1;
    p.topMarg = 0;
    p.leftMarg = 0;
    p.hideParam = 63; // 111111
    p.viewId = id;
    p.children = [];
    p.viewElement = currentElement;
    if (p.componParam == null) {
        p.componParam = {type:12, bool_1:false,bool_2:false,color_1:17};
    }
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    
    let pan = document.createElement('div');
    pan.className = "sheetPanel";
    pan.android = {typeUxUi: "ui",type:"RelativeLayout",typeFull:{name: 'RelativeLayout', typeBlock: 2},width:-1,height:250,background:19,
        gravLayout:{v:BOTTOM,h:NONE}, children: [], viewElement:pan};
    addNewElement(currentElement, pan);
    addNavigatorEl(pan);
    p.children.push(pan.android);
        
        
    return currentElement;
}


