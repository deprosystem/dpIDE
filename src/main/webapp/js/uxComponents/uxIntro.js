function uxIntro() {
    this.param = {name: "Intro", viewBaseId: "intro", onlyOne: true};
    
    let meta = [
        {name: "plusId", title:"Indicator",len:80,type:"SelectId"},
        {name: "minusId", title:"Skip",len:80,type:"SelectId"},
        {name: "tabLayout", title:"Continue",len:80,type:"SelectId"},
        {name: "param", title:"Proceed",len:80,type:"SelectId"}
    ];
    
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return "";
    }
    
    this.getEditParam = function () {
        return uxModelView("createViewForIntroV", "");
    }
    
    this.getCreateListener = function () {
        return {vert:"createViewForIntroV", horiz:""};
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        let typeView = {type:"RelativeLayout",typeFull:{name:"RelativeLayout",typeBlock:2},viewId:"_T_0",typeUxUi: "ui",gravLayout:{h:4,v:4},gravity:{h:4,v:4},width: -1,height:10,children:[]};
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:25}, // componParam:{type:3 для ComponTextView
                typeFull: {name: tt, typeBlock: 0}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}},
            width:-1,height:-1,itemNav:{},viewElement: null,children:[typeView]};
        currentComponentDescr = {type:tt, componId: componId, model:{method:0,data:[[]],progr:"standard"},view:{viewId: viewId},navigator:[]};
    }
    
    this.setValue = function(componParam) {
        let vv = newDOMelement('<div style="clear:both;height:40px;border-top:1px solid #1dace9;margin-top:5px"></div>');
        componParam.append(vv);
        let dd = new EditForm(meta, currentComponentDescr.view, vv, null, null, true);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.e9kc8h8cxusc";
    }
    
    this.isValid = function(compD) {
        let err = {text:"",error:0};
        
        return err;
    }
}

function createViewForIntroV(el, ind) {
    let num;
    let p = el.parentElement.parentElement;
    if (ind != null) {
        num = 0;
    } else {
        num = getNumDataTYpe(p);
//        num = getNumDataTYpe(p) + 1;
    }
    let data = currentComponentDescr.model.data[num];
    if (data.length == 0) {
        data = currentComponentDescr.model.data[0];
    }
    let listV = currentComponent.viewElement;
    if (listV != null) {
        let ik = data.length;
        if (ik > 0) {
            let listView = listV.children[num];
            listView.innerHTML = "";        // Очистить в прототипе экрана
            listView.android.children.length = 0;   // очистить элементы в андроид
            listView.android.height = WRAP;
            let item_n = listView.android.itemNav;
            let item_compon = item_n.getElementsByClassName('item-compon')[0];
            item_compon.innerHTML = "";
            let namePrev = "";
            let imgHeight = 240;
            setActive(listView);
            let imgId = formImgFirst(MATCH, imgHeight, data);
            if (imgId > -1) {
                namePrev = data[imgId].name;
            }
            let topM = 10;
            let estimatedHeight = imgHeight + 12;
            
            for (let i = 0; i < ik; i++) {
                let item = data[i];
                if (item.notShow) continue;
                if (imgId != i) {
                    formElement(item, "", namePrev, topM);
                    currentElement.android.viewElement = currentElement;
                    namePrev = item.name;
                    estimatedHeight += 22;
                }
            }

            let Divider = formDivider();
            let pp = Divider.android;
            pp.viewElement = Divider;
            if (namePrev != "") {
                pp.below = namePrev;
            }
            pp.gravLayout.v = NONE;
            pp.topMarg = 12;

            showElemChilds(listV);
        } else {
            tooltipMessage(el, "You need to describe the data");
        }
    }
}

