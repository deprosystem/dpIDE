function uxMenu() {
    this.param = {name: "Menu", viewBaseId: "menu",  onlyOne: true};
    this.specialView = '<div onclick="editMenu()" style="display: inline-block; vertical-align: top; cursor:pointer;margin-left: 20px">formation of menu</div>';

    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return this.specialView;
    }
    
    this.getEditParam = function () {
        return "";
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:20, colorNorm:0, colorSel:1, colorEnab:7, colorBadge:3, colorDivider:7},
                typeFull: {name: tt, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt, componId: componId, model:{menuList:{colorNormId:0,colorSelId:1,colorEnabl:6,list:[]}},view:{viewId: viewId}};
    }
    
    this.setValue = function(componParam) {
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.rwjpw4atvd33";
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

function editMenu() {
    if (currentComponentDescr.model.menuList == null) {
        currentComponentDescr.model.menuList = {list:[]};
    }
    editDataWind(metaMenu, currentComponentDescr.model.menuList.list, cbSaveMenu);
}
/*
function cbSaveMenu() {
    if (currentComponent.viewElement != null) {
        showMenu(currentComponent.viewElement, currentComponentDescr.model.menuList, currentComponent);
    }
}
*/
function cbSaveMenu() {
    if (currentComponent.viewElement != null) {
        let dat = currentComponentDescr.model.menuList.list;
        let ik = dat.length;
        let noSelect = true;
        for (let i = 0; i < ik; i++) {
            let item = dat[i];
            if (item.start && noSelect) {
                noSelect = false;
            } else {
                item.start = false;
            }
        }
        if (noSelect) {
            dat[0].start = true;
        }
        showMenu(currentComponent.viewElement, currentComponentDescr.model.menuList, currentComponent);
//        showMenuB(dat, mB, colorSet);
        for (let i = 0; i < ik; i++) {
            let item = dat[i];
            let scr = item.screen;
            if (scr != null && scr != "") {
                if (noScreen(scr)) {
                    createScreen(false, scr, item.title);
                }
            }
        }
    }
}

function showMenu(menuV, ml, p) {
    if (menuV != null) {
        let list = ml.list;
        if (p.componParam == null) {
            p.componParam = {colorNorm:0, colorSel:1, colorEnab:7, colorBadge:3, colorDivider:7};
        }
        let cN = findColorByIndex(p.componParam.colorNorm);
        let cS = findColorByIndex(p.componParam.colorSel);
        let cE = findColorByIndex(p.componParam.colorEnab);
        let cB = findColorByIndex(p.componParam.colorBadge);
        let cD = findColorByIndex(p.componParam.colorDivider);
        let ik = list.length;
        if (ik > 0) {
            let str = "";
            for (let i = 0; i < ik; i++) {
                let item = list[i];
                let cc = cN;
                if (item.start) {
                    cc = cS;
                }
                str += '<div style="float:left;clear: both;height:' + (44 * MEASURE) + 'px;">'
                        +'<img style="margin-left:10px;vertical-align:middle;margin-top:5px" width="' + 18 + '" height="' + 18 + '" src="' + item.icon + '">'
                        +'<div style="vertical-align:middle;margin-left:10px;display:inline-block;margin-top:5px;font-size:' + dp_14 + 'px;color:' 
                        + cc + '">' + item.title + '</div>'
                        +'</div>';
                if (item.divider) {
                    str += '<div style="float:left;clear: both;height:1px;width:100%;position:relative;"><div style="position:absolute;left:10px;right:10px;height:1px;background-color:' + cD + '"></div></div>';
                }
            }
            menuV.innerHTML = str;
        }
    }
}
