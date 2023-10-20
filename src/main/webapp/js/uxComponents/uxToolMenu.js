function uxToolMenu() {
    this.param = {name: "ToolMenu", viewBaseId: "tool_menu", onlyOne: true};
    this.hiddenHandlers = "";
    let meta = [
        {name: "selectedType", title:"img back",type:"ImgChess"},
        {name: "minusId", title:"Activity with toolbar",type:"Select",len:80},
        {name: "zoomButtons", title:"Clear",type:"Check"},
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
        currentComponent = null;
        currentComponentDescr = {type: tt, componId: componId, model:{menuList:{list:[]}},view:{viewId: viewId, title:"", titleParam: ""},navigator:[]};
    }
    
    this.setValue = function(cont) {
        cont.style.height = "45px";
        let st = "";
        let sep = "";
        let firstScr = "";
        let ik = listScreen.length;
        for (let i = 0; i < ik; i++) {
            let itemSct = listScreen[i];
            if (itemSct.typeScreen == 0) {      // Activity
                let comp = itemSct.components;
                let jk = comp.length;
                for (let j = 0; j < jk; j++) {
                    if (comp[j].type == "ToolBar") {
                        st += sep + itemSct.screenName;
                        sep = ",";
                        if (firstScr.length == 0) {
                            firstScr = itemSct.screenName;
                        }
                        break;
                    }
                    
                }
            }
        }
        if (firstScr.length == 0) {
            dialogError("Error", "No activity with ToolBar");
        }
        let cdv = currentComponentDescr.view;
        if (cdv.minusId == null || cdv.minusId.length == 0) {
            cdv.minusId = firstScr;
        }
        meta[1].value = st;
        new EditForm(meta, cdv, cont, null, this, true);
        
    }
    
    this.cbEdit = function(name) {
        let cdv = currentComponentDescr.view;
        let listMenuFr = currentComponentDescr.model.menuList;
        let listMenuAct = getListMenuAct(cdv.minusId);
        if (listMenuAct == null) {
            dialogError("Error", "Head ToolBar not found ");
            return;
        }
        let listActMenu = [];
        let listSelfMenu = [];
        let ik = listMenuFr.list.length;
        for (let i = 0; i < ik; i++) {
            let item = listMenuFr.list[i];
            if (item.id_field < 0) {
                listActMenu.push(item);
            } else {
                listSelfMenu.push(item);
            }
        }
        let isChangeAct = false;
        ik = listActMenu.length;
        if (ik != listMenuAct.length) {
            isChangeAct = true;
        } else {
            for (let i = 0; i < ik; i++) {
                if (listActMenu[i].id_field != -listMenuAct[i].id_field) {
                    isChangeAct = true;
                    break;
                }
            }
        }
        
        switch(name) {
//      ВСе ситуации описаны в документе "Структура данных" в разделе "Все ситуации при формировании меню для uxToolMenu"
            case "menu":
                if (cdv.zoomButtons) {      //  Clear   7 - 12
                    if (listSelfMenu.length == 0) {     //  7 - 19
                        listMenuFr.list = [];
                    } else {                            //   10 - 12
                        listMenuFr.list = JSON.parse(JSON.stringify(listSelfMenu));
                    }
                } else {                    // 1 - 6
                    if (listSelfMenu.length == 0) {     //   1 - 3
                        if (listMenuAct.length == 0) {      // 1
                            listMenuFr.list = [];
                        } else {                        //  2 - 3
                            listMenuFr.list = JSON.parse(JSON.stringify(listMenuAct));
                            ik = listMenuFr.list.length;
                            for (let i = 0; i < ik; i++) {
                                let item = listMenuFr.list[i];
                                item.id_field = - item.id_field;
                                item.system = ",visib,";
                            }
                        }
                    } else {                // 4 - 6
                        if (listMenuAct.length == 0) {          // 4
                            listMenuFr.list = JSON.parse(JSON.stringify(listSelfMenu));
                        } else {
                            if (isChangeAct) {                  // 6
                                listMenuFr.list = JSON.parse(JSON.stringify(listMenuAct));
                                ik = listMenuFr.list.length;
                                for (let i = 0; i < ik; i++) {
                                    let item = listMenuFr.list[i];
                                    item.id_field = - item.id_field;
                                    item.system = ",visib,";
                                }
                                listMenuFr.list.concat(JSON.parse(JSON.stringify(listSelfMenu)));
                            }           // else 5   все без изменений
                        }
                    }
                }
                editDataWind(metaToolMenu, listMenuFr.list, this, null, null, 350, null, null, "", true);
                break;
            case "minusId":         //  Activity with toolbar
                
                break;
            case "navigat":
                this.formNavigatorTool();
                break;
        }
    }
/*
    this.editMenu_Tool = function() {
        if (currentComponentDescr.model.menuList == null) {
            currentComponentDescr.model.menuList = {list:[]};
        }
        
        editDataWind(metaTool, currentComponentDescr.model.menuList.list, this, null, null, 350, null, null, "", true);
    }
*/
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
            if (tt == null) {
                tt = "";
            }
            menuTitle += sep + tt;
            sep = ",";
        }
        let nnn = new FormNavigator();
        if (currentComponentDescr.navigator == null) {
            currentComponentDescr.navigator = [];
        }
        nnn.init(currentComponentDescr.navigator, currentComponentDescr, null, null, menuTitle, this);
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
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.6xdkumb6f530";
    }
    
    this.isValid = function(compD) {
        let err = {text:"",error:0};
        
        return err;
    }
}

function getListMenuAct(nameAct) {
    let ik = listScreen.length;
    for (let i = 0; i < ik; i++) {
        let itemSct = listScreen[i];
        if (itemSct.typeScreen == 0 && nameAct == itemSct.screenName) {      // Activity
            let comp = itemSct.components;
            let jk = comp.length;
            for (let j = 0; j < jk; j++) {
                let cJ = comp[j];
                if (cJ.type == "ToolBar") {
                    if (cJ.model.menuList.list == null) {
                        cJ.model.menuList.list = [];
                    }
                    return cJ.model.menuList.list;
                }
            }
        }
    }
    return null;
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