function uxTags() {
    this.param = {name: "Tags", viewBaseId: "tags", onlyOne: false};
    this.hiddenHandlers = ",Autch,Data,";
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return docNavigator;
    }
    
    this.getEditParam = function () {
        return uxModelView("", "createViewForTagsH");
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:17},
                typeFull: {name: tt, typeBlock: 10}, gravLayout: {h: 3, v: 2}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:200,bottomMarg:150,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt, componId: componId, model:{method:3,data:[[]]},view:{viewId: viewId},navigator:[]};
    }
    
    this.setValue = function(componParam) {
        setValueModel(componParam);
    }
    
    this.getCreateListener = function () {
        return {vert:"", horiz:"createViewForTagsH"};
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.l581y2ff6mpo";
    }
    
    this.isValid = function(compD) {
        let err = {text:"",error:0};
        
        return err;
    }
    
}

function createViewForTagsH(el) {
    let listV = currentComponent.viewElement;
    if (listV != null) {
        let data = currentComponentDescr.model.data[0];
        listV.innerHTML = "";
        listV.android.children.length = 0;
        
        let item_n = listV.android.itemNav;
        let item_compon = item_n.getElementsByClassName('item-compon')[0];
        item_compon.innerHTML = "";
            
        setActive(listV);
        newOneTag(listV.android);
        listV.android.children.push(currentElement.android);
        let ik = data.length;
        if (ik > 0) {
            let imgHeight = 32;
            n_selectElement = currentElement;
            setActive(n_selectElement);
//            let namePrev = "";
            let toRightOf = "";
            n_selectElement.innerHTML = "";
            cleanNavigatorEl(n_selectElement);
            ACTIVE.android.children.length = 0;
            let margLeft = 0;
            let imgId = formImgFirst(imgHeight, imgHeight, data);
            if (imgId > -1) {
                margLeft = 6;
                toRightOf = data[imgId].name;
            }
            let estimatedHeight = imgHeight + 12;
            for (let i = 0; i < ik; i++) {
                let item = data[i];
                if (item.notShow) continue;
                if (imgId != i) {
                    formElement(item, toRightOf, "", 0, 4);
                    let p = currentElement.android;
                    p.viewElement = currentElement;
                    p.leftMarg = margLeft;
                    toRightOf = item.name;
                    p.gravLayout.v = CENTER;
                    margLeft = 6;
                }
            }

            currentElement = listV;
            showElemChilds(currentElement);
//            viewCompon();
        } else {
            tooltipMessage(el, "You need to describe the data");
        }
    } 
}

function newOneTag(p) {
    let el = p.viewElement;
    setActive(el);
    let newEl = createElementTag();
    newEl.android.viewElement = newEl;
    newEl.android.viewId = "_oneTag";
    addNewElement(ACTIVE, newEl);
    addNavigatorEl(newEl);
    ACTIVE.android.children.push(newEl.android);
    newEl.style.outline = "";
    viewComponElem(newEl);
}

function createElementTag() {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = 'RelativeLayout';
    p.typeFull = {name: 'RelativeLayout', typeBlock: 2};
    p.gravLayout = {h:4,v:4};
    p.gravity = {h:4,v:4};
    p.width = WRAP;
    p.leftPad = 10;
    p.rightPad = 10;
    p.height = 32;
    p.children = [];
    currentElement.android = p;
    return currentElement;
}