function uxTabLayout() {
    this.param = {name: "TabLayout", viewBaseId: "tab_layout", onlyOne: false};

    this.specialView = '<div onclick="createDataTab()" style="display: inline-block; vertical-align: top; cursor:pointer;margin-left: 20px">Formation of data</div>';;
    this.editParam = '';
            
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return this.specialView;
    }
    
    this.getEditParam = function () {
        return this.editParam;
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:5},
                typeFull: {name: tt, typeBlock: 0}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
                tabLayout:{indColor:3, textColor:3,textSelect:4,indHeight:2},
            width:-1,height:56,background:0,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt, componId: componId, model:{menuList:{list:[]}},view:{viewId: viewId}};
    }
    
    this.setValue = function(componParam) {

    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.ca2u9o7gq86q";
    }
    
    this.isValid = function(comp) {
        let tab = "&ensp;";
        let err = {text:"",error:0};
        let men = comp.model.menuList.list;
        let mk = men.length;
        if (mk == 0) {
            err.text += txtError(2, tab, "component " + comp.view.viewId + " has no menu description");
            err.error = 2;
        } else {
            for (let m = 0; m < mk; m++) {
                let scrTit = men[m].title;
                if (scrTit == null || scrTit.length == 0) {
                    err.text += txtError(2, tab, "component " + comp.view.viewId + " menu item " + m + " has no name");
                    err.error = 2;
                }
                let scrItem = men[m].screen;
                if (scrItem == null || scrItem.length == 0) {
                    err.text += txtError(2, tab, "component " + comp.view.viewId + " menu item " + m + " has no screen link");
                    err.error = 2;
                } else {
                    scrN = scrItem.toUpperCase();
                    if (isScreenDeclare(scrN) == -1) {
                        err.text += txtError(2, tab, "component " + comp.view.viewId + " menu item " + m + " refers to an undescribed screen "  + scrN);
                        err.error = 2;
                    }
                }
            }
        }
        return err;
    }
}

function createDataTab() {
    editDataWind(metaPager, currentComponentDescr.model.menuList.list, callbackSaveDataTab);
}

function callbackSaveDataTab() {
    if (currentComponent.viewElement != null) {
        let mB = currentComponent.viewElement.getElementsByClassName("tab_layout")[0];
        let dat = currentComponentDescr.model.menuList.list;
        showTabLayout(dat, mB, currentComponent.tabLayout);
        let ik = dat.length;
// формування відповідних екранів і пейджера
        for (let i = 0; i < ik; i++) {
            let item = dat[i];
            let scr = item.screen;
            if (noScreen(scr)) {
                createScreen(false, scr, "");
            }
        }
        let comp = currentScreen.components;
        let ck = comp.length;
        let noPager = true;
        for (let c = 0; c < ck; c++) {
            if (comp[c].type == "Pager") {
                noPager = false;
                break;
            }
        }
        if (noPager) {
            let id = currentComponent.viewId;
            list_cont = currentScreenView.getElementsByClassName("list_components")[0];
            selComponType("Pager");
            currentComponentDescr.view.tabLayout = id;
            let selTab = currentComponentView.getElementsByClassName("select_tab")[0];
            if (selTab != null) {
                let sel = selTab.getElementsByTagName("select")[0];
                if (sel != null) {
                    sel.value = id;
                }
            }
        }
    }
}