function uxDrawer() {
    this.param = {name: "Drawer", viewBaseId: "drawer",  onlyOne: true};
    
    this.editParam = '<div style="margin-top: 2px;height:42px">'
            +'<div style="float:left;"><div style="color: #2228;font-size: 10px;margin-left:4px">Fragment</div>'
            +'<input class="drawer_fragm input_style" onkeyup="return clickUpDrawer(event)" onkeydown="return validName(event)" style="font-size:12px;color:#110000;font-weight:600" type="text" size="15"/>'
            +'</div>'
            +'<div class="tool_drawer" onclick="checkDrawer(this, 1);" style="float: left;margin-left: 10px;cursor: pointer;margin-top:18px">'
                +'<div style="float: left;">Tool bar under drawer:</div>'
                +'<img style="float: left;margin-left: 5px;" width="16" height="16" src="img/check-act.png">'
            +'</div>'
            +'<div class="menu_drawer" onclick="checkDrawer(this, 2);" style="float: left;margin-left: 10px;cursor: pointer;margin-top:18px">'
                +'<div style="float: left;">Menu bottom under drawer:</div>'
                +'<img style="float: left;margin-left: 5px;" width="16" height="16" src="img/check-act.png">'
            +'</div>'
        +'</div>'
    
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return "";
    }
    
    this.getEditParam = function () {
        return this.editParam;
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:6},
                typeFull: {name: tt, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt, componId: componId, model:{},view:{viewId: viewId}};
    }
    
    this.setValue = function(componParam) {
        let cont = currentComponentView.getElementsByClassName("component_param")[0];
        let fragm = cont.getElementsByClassName("drawer_fragm")[0];
        let descrView = currentComponentDescr.view;
        if (fragm != null && descrView.drawer_fragm != null) {
            fragm.value = descrView.drawer_fragm;
        }
        let tool_dr = cont.getElementsByClassName("tool_drawer")[0];
        let cd;
        if (tool_dr != null) {
//            tool_dr.firstElementChild.checked = descrView.view.toolInDrawer;
//            tool_dr.querySelector("img").checked = descrView.toolInDrawer;
            cd = tool_dr.querySelector("img");
            if (descrView.toolInDrawer) {
                cd.src = "img/check-sel_1.png";
            } else {
                cd.src = "img/check-act.png";
            }
        }
        let menu_dr = cont.getElementsByClassName("menu_drawer")[0];
        if (menu_dr != null) {
//            menu_dr.querySelector("img").checked = descrView.menubInDrawer;
            cd = menu_dr.querySelector("img");
            if (descrView.menubInDrawer) {
                cd.src = "img/check-sel_1.png";
            } else {
                cd.src = "img/check-act.png";
            }
        }
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.qmbjlbu72dsk";
    }
    
    this.isValid = function(comp) {
        let err = {text:"",error:0};
        scrN = comp.view.drawer_fragm.toUpperCase();
        if (isScreenDeclare(scrN) == -1) {
            err.text += txtError(2, tab, "component " + comp.view.viewId + " menu item " + m + " refers to an undescribed screen "  + scrN);
            err.error = 2;
        }
        return err;
    }
}

function clickUpDrawer(e) {
    let a = e.currentTarget;
    currentComponentDescr.view.drawer_fragm = a.value;
}

function checkDrawer(el, num) {
    let cd = el.getElementsByTagName('img')[0];
    if (cd != null) {
        let check = cd.src.indexOf("check-sel") == -1;
        if (num == 1) {
            currentComponentDescr.view.toolInDrawer = check;
        } else {
            currentComponentDescr.view.menubInDrawer = check;
        }
        if (check) {
            cd.src = "img/check-sel.png";
        } else {
            cd.src = "img/check-act.png";
        }
    }
}



