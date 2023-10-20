function uxToolBar() {
    this.param = {name: "ToolBar", viewBaseId: "tool_bar", onlyOne: true};
    this.hiddenHandlers = "";

    let meta = [
        {name: "selectedType", title:"Img back",type:"ImgChess"},
        {name: "selectedField", title:"Hamburger",type:"ImgChess"},
//        {name: "amountSelected", title:"Logo",type:"ImgChess"},
        {name: "selectedValue", title:"Overflow menu icon",type:"ImgChess"},
        {name: "zoomButtons", title:"Show overflow menu item icon",type:"Check"},
        {name: "menu", title:"Formation of menu",type:"Click",img:"img/menu_hh.png"},
        {name: "navigat", title:"Navigator",type:"Click",img:"img/navigator.png"}
    ];
    
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
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:0}, 
                typeFull: {name: tt, typeBlock: 0}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:56,topMarg:"",leftMarg:"",itemNav:{},textColor:19,textSize:20,background:0, viewElement: null,children:[]};
        currentComponentDescr = {type: tt, componId: componId, model:{menuList:{list:[]}},view:{viewId: viewId, title:"", titleParam: ""},navigator:[]};
    }
    
    this.setValue = function(cont) {
        cont.style.height = "45px";
        new EditForm(meta, currentComponentDescr.view, cont, null, this, true);
    }
    
    this.cbEdit = function(name) {
        switch(name) {
            case "menu":
                this.editMenu_Tool();
                break;
            case "navigat":
                this.formNavigatorTool();
                break;
            case "selectedType":
                if (currentComponent.viewElement != null) {
                    var tt = currentComponent.viewElement.getElementsByClassName("img_back")[0];
                    tt.src = currentComponentDescr.view.selectedType;
                }
                break;
        }
    }
    
    this.cbNavigator = function() {
        let nav = currentComponentDescr.navigator;
        let mm = currentComponentDescr.model.menuList.list;
        let ik = nav.length;
        let mk = mm.length;
        let itemM;
        for (let i = 0; i < ik; i++) {
            let item = nav[i];
            let tit = item.viewId;
            let noIs = false;
            for (let m = 0; m < mk; m++) {
                itemM = mm[m];
                if (tit == itemM.title) {
                    item.id_field = itemM.id_field;
                    noIs = false;
                    break;
                }
            }
            if (noIs) {
                item.id_field = -1;
            }
        }
    }
    
    this.editMenu_Tool = function() {
        if (currentComponentDescr.model.menuList == null) {
            currentComponentDescr.model.menuList = {list:[]};
        }
        editDataWind(metaTool, currentComponentDescr.model.menuList.list, this, null, null, null, null, null, "", true);
    }
    
    this.obrSaveEdit = function(dat) {
        console.log(JSON.stringify(dat));
    }
    
    this.formNavigatorTool = function() {
        let menuTitle = "";
        let mm = currentComponentDescr.model.menuList.list;
        let ik = mm.length;
        let sep = "";
        for (let i = 0; i < ik; i++) {
            let tt = mm[i].title;
            if (tt != null && tt.length != 0) {
                menuTitle += sep + tt;
                sep = ",";
            }
        }
        let nnn = new FormNavigator();
        if (currentComponentDescr.navigator == null) {
            currentComponentDescr.navigator = [];
        }
        nnn.init(currentComponentDescr.navigator, currentComponentDescr, null, null, menuTitle, this);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.6xdkumb6f530";
    }
    
    this.isValid = function(compD) {
        let tab = "&ensp;";
        let err = {text:"",error:0};
        let nav = compD.navigator;
        let mm = currentComponentDescr.model.menuList.list;
        let ik = nav.length;
        let mk = mm.length;
        let itemM;
        for (let m = 0; m < mk; m++) {
            itemM = mm[m].isNav = false;
        }
        for (let i = 0; i < ik; i++) {
            let item = nav[i];
            let tit = item.viewId;
            let noIs = true;
            for (let m = 0; m < mk; m++) {
                itemM = mm[m];
                if (tit == itemM.title) {
                    item.id_field = itemM.id_field;
                    itemM.isNav = true;
                    noIs = false;
                    break;
                }
            }
            if (noIs) {
                item.id_field = -1;
                if (err.error < 1) {
                    err.error = 1;
                }
                err.text += txtError(1, tab, "component " + viewId + " error: No menu item with title " + tit);
            }
        }
        for (let m = 0; m < mk; m++) {
            itemM = mm[i];
            if ( ! itemM.isNav) {
                if (err.error < 1) {
                    err.error = 1;
                }
                err.text += txtError(1, tab, "component " + viewId + " error: No handler for " + itemM.title);
            }
        }
        return err;
    }
}
/*
function selectImgBackTB(e) {
    selectListImage(e, setImgBackTB);
}

function setImgBackTB(i) {
    let nn = listImage[i];
    let img = currentComponentView.getElementsByClassName("img_back");
    if (img == null) {
        return;
    }
    let imgBl = img[0];
    imgBl.src = nn;
    currentComponentDescr.view.selectedType = nn;
    if (currentComponent.viewElement != null) {
        var tt = currentComponent.viewElement.getElementsByClassName("img_back")[0];
        tt.src = nn;
    }
}

function selectImgHamburgTB(e) {
    selectListImage(e, setImgHamburgTB);
}

function setImgHamburgTB(i) {
    var nn = listImage[i];
    let img = currentComponentView.getElementsByClassName("img_hamburger");
    if (img == null) {
        return;
    }
    let imgBl = img[0];
    imgBl.src = nn;
    currentComponentDescr.view.selectedField = nn;
}

function selectImgLogoTB(e) {
    selectListImage(e, setImgLogoTB);
}

function setImgLogoTB(i) {
    var nn = listImage[i];
    let img = currentComponentView.getElementsByClassName("img_logo");
    if (img == null) {
        return;
    }
    let imgBl = img[0];
    imgBl.src = nn;
    currentComponentDescr.view.amountSelected = nn;
}

function selectImgAdditionalTB(e) {
    selectListImage(e, setImgAdditionaTB);
}

function setImgAdditionaTB(i) {
    var nn = listImage[i];
    let img = currentComponentView.getElementsByClassName("img_additional");
    if (img == null) {
        return;
    }
    let imgBl = img[0];
    imgBl.src = nn;
    currentComponentDescr.view.selectedValue = nn;
}
*/

