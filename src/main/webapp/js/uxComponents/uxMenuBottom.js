function uxMenuBottom() {
    this.param = {name: "MenuBottom", viewBaseId: "menu_b",  onlyOne: true};
    this.hiddenHandlers = ",Autch,Data,";
    this.specialView = '<div onclick="editMenu_b()" style="display: inline-block;float:left; vertical-align: top; cursor:pointer;margin-left: 20px">Formation of menu</div>';
            
    this.getParamComp = function () {
        return this.param;
    };
    
    this.getSpecialView = function () {
        return this.specialView + docNavigator;
    };
    
    this.getEditParam = function () {
        return "";
    };
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:1},
                typeFull: {name: tt, typeBlock: 0}, gravLayout: {h: 3, v: 2}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}},
                colorSet: {textColor:3,textSelect:4,badgeColor:4,enabledColor:6,toAnimate:true,changeColor:true,background:"",location:"top"},
            width:-1,height:56,topMarg:"",leftMarg:"",itemNav:{},background:0, viewElement: null,children:[]};
        currentComponentDescr = {type:tt, componId: componId, model:{menuList:{list:[]}},view:{viewId: viewId}, navigator:[]};
    };
    
    this.setValue = function(componParam) {
    };
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.sh9l77syqm0d";
    };
    
    this.isValid = function(comp) {
        let tab = "&ensp;";
        let err = {text:"",error:0};
        let men = comp.model.menuList.list;
        let nav = comp.navigator;
        let navL = (nav == null || nav.length == 0);
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
                let scrIcon = men[m].icon;
                if (scrIcon == null || scrIcon.length == 0) {
                    err.text += txtError(2, tab, "component " + comp.view.viewId + " menu item " + m + " has no image");
                    err.error = 2;
                } else {
                    let ii = scrIcon.lastIndexOf("/");
                    let namIc = path.substring(ii + 1);
                    namIc = namIc.substring(0, nam.indexOf('.'));
                    let ik = listImage.length;
                    if (noIconInList(namIc)) {
                        err.text += txtError(2, tab, "component " + comp.view.viewId + " menu item " + m + " no such image exists " + namIc);
                        err.error = 2;
                    }
                }
                let scrItem = men[m].screen;
                if (scrItem == null || scrItem.length == 0) {
                    if (navL) {
                        err.text += txtError(2, tab, "component " + comp.view.viewId + " menu item " + m + " has no screen link");
                        err.error = 2;
                    } else {
                        if (noHandler(nav, m)) {
                            err.text += txtError(2, tab, "component " + comp.view.viewId + " menu item " + m + " has no screen link");
                            err.error = 2;
                        }
                    }
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

function noIconInList(scrIcon) {
    if (listImage == null) {
        listImage = [];
    }
    for (let i = 0; i < ik; i++) {
        let path = listImage[i];
        let ii = path.lastIndexOf("/");
        let nam = path.substring(ii + 1);
        nam = nam.substring(0, nam.indexOf('.'));
        if (nam == scrIcon) {
            return false;
        }
    }
    return true;
}

function noHandler(nav, m) {
    let ik = nav.length;
    for (let i = 0; i < ik; i++) {
        if (nav[i].viewId == m) {
            return false;
        }
    }
    return true;
}

function editMenu_b() {
    if (currentComponentDescr.model.menuList == null) {
        currentComponentDescr.model.menuList = {list:[]};
    }
    editDataWind(metaMenu, currentComponentDescr.model.menuList.list, cbSaveMenuB);
}

function cbSaveMenuB() {
    if (currentComponent.viewElement != null) {
        let mB = currentComponent.viewElement.getElementsByClassName("menu_b")[0];
        let colorSet = currentComponent.colorSet;
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
        showMenuB(dat, mB, colorSet);
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

function showMenuB(menu, mB, colorSet) {
    let rect = mB.getBoundingClientRect();
    let ww = rect.right - rect.left - 1;
    selectItemInMenuB = null;
    if (ww == -1) {
        let par = mB.parentElement;
        let p = par.android;
        if (p.width == MATCH) {
            rect = p.parent.getBoundingClientRect()
            ww = rect.right - rect.left - 1;
            let LL = parseInt(p.leftMarg) * MEASURE;
            let RR = parseInt(p.rightMarg) * MEASURE;
            if ( ! isNaN(LL)) {
                ww = ww - LL;
            }
            if ( ! isNaN(RR)) {
                ww = ww - RR;
            }
        }
    }
    
    mB.innerHTML = "";
    let ik = menu.length;
    let colorM;
    let wwOne = ww / ik;
    for (let i = 0; i < ik; i++) {
        let mm = menu[i];
        if (mm.start) {
            colorM = colorSet.textSelect;
        } else {
            colorM = colorSet.textColor;
        }
        let color = findColorByIndex(colorM);
        let newItem;
        switch (colorSet.location) {
            case 'top':
                newItem = newItemAndr(mm, color, wwOne);
                break;
            case 'left':
                newItem = newItemAndrLeft(mm, color, wwOne);
                break;
            default:
                newItem = newItemAndr(mm, color, wwOne);
                break;
        }
        let canv = newItem.getElementsByClassName('canvas_item')[0];
        if (mm.icon != null && mm.icon != "") {
            let rgb;
            if (colorSet.changeColor) {
                rgb = colorStrToRGB(color);
            } else {
                rgb = null;
            }
            changeImgColor(canv, mm.icon, rgb);
        } else {
            canv.style.display = 'none';
        }
        if (mm.start) {
            selectItemInMenuB = newItem;
            if (colorSet.background != null) {
                if (colorSet.background == 1999) {         // new Drawable
                    setDrawableEl(newItem, tempDrawable);
                } else {
                    if (colorSet.background != "") {
                        setDrawableEl(newItem, JSON.parse(findDrawableByIndex(colorSet.background)));
                    }
                }
            }
        }
        mB.append(newItem);
    }
}

function newItemAndr(item, colorId, wwOne) {
    let container = document.createElement('div')
    let str = '<div class="item_buttons" style="position:relative;width:' + wwOne + 'px;height:100%;float:left">'
            +'<div style="width:100%;height:100%; text-align:center;position:absolute;padding-top:' + dp_4 + 'px">'
                +'<canvas class="canvas_item" width="' + dp_24 + '" height="' + dp_24 + '">No canvas</canvas>'
                +'<div style="font-size:' + dp_12 + 'px;color:' + colorId + '">' + item.title + '</div>'
            +'</div>'
        +'</div>';
    container.innerHTML = str;
    return container.firstChild;
}

function newItemAndrLeft(item, colorId, wwOne) {
    let container = document.createElement('div')
    let str = '<div class="item_buttons" style="position:relative;width:' + wwOne + 'px;height:100%;float:left">'
            +'<div style="position:absolute;top:0;left:0;right:0;bottom:0;display: flex;align-items: center;justify-content: center">'
                +'<div>'
                    +'<canvas style="float:left;margin-right:5px;" class="canvas_item" width="' + dp_24 + '" height="' + dp_24 + '">No</canvas>'
                    +'<div style="float:left;margin-top:4px;font-size:' + dp_12 + 'px;color:' + colorId + '">' + item.title + '</div>'
                +'</div>'
            +'</div>'
        +'</div>';
    container.innerHTML = str;
    return container.firstChild;
}