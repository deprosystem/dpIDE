//var components = ["ToolBar", "MenuBottom", "Menu", "Map", "Pager", "TabLayout", "Drawer", "Map", "Panel", "Form", "ScrollPanel", "ScrollForm",
//    "SheetBottom", "Spinner", "Tags", "PlusMinus", "Total", "Photo", "ScreenSequence", "Intro"];

var list_cont;
var uxFunction, uiFunction;

var listScreen = [];
var currentScreenView, currentComponentView;
var currentComponent, currentComponentDescr;
var currentChildren = [];
var idScreenNum;
var idComponentNum;
var positionScreen = 0;
var windTypeComponent;

function plusScreen() {
    hideScreen();
    createScreen(true);
}

function createScreen(plus, nameScr, titleScr, typeScr) {
    let scrName = "SCREEN_" + idScreenNum;
    let scrTitle = "";
    let scrType = 0;
    if ( ! plus) {
        scrName = nameScr;
        scrTitle = titleScr;
        if (typeScr == null || typeScr == 1) {
            scrType = 1;
        }
    }
    let scrParam = {scrN: scrName, scrNum: idScreenNum, scrTit: scrTitle, scrT:scrType};
    let crScreen = crScreenForList(scrParam);
    listScreen.push(crScreen);
    let ns = newScreen(crScreen);
    ns.idScreen = idScreenNum;
    ns.addEventListener('click', selScreen, true);
    idScreenNum ++;
    list_screens.append(ns);
    container_scr.scroll_y.resize(container_scr);

    if (plus) {
        currentScreen = crScreen;
        currentChildren = currentScreen.layout.children;
        if (currentScreenView != null) {
            currentScreenView.className = "screen";
        }
        currentScreenView = ns;
        currentScreenView.className = "screen_sel";
        screen_container.scrollTop = screen_container.scrollHeight;
        setScreenView();
    } else {
        ns.className = "screen";
        let nn = ns.getElementsByClassName("name_screen")[0];
        nn.value = nameScr;
        nn = ns.getElementsByClassName("title_screen")[0];
        nn.value = titleScr;
        let tt = ns.getElementsByClassName("type_screen")[0];
        let ttScr = "Fragment";
        if (crScreen.typeScreen == 0) {
            ttScr = "Activity";
        }
        tt.value = ttScr;
//        tt.value = "Fragment";
    }
}

function screenClone() {
    let crScreen = JSON.parse(jsonNoViewParent(currentScreen));
    crScreen.screenName = "SCREEN_" + idScreenNum;
    crScreen.screenId = idScreenNum;
    listScreen.push(crScreen);
    let ns = newScreen(crScreen);
    ns.idScreen = idScreenNum;
    ns.addEventListener('click', selScreen, true);
    idScreenNum ++;
    ns.className = "screen";
    list_screens.append(ns);
}

function crScreenForList(scrP) {
    let crScreen = {screenName: scrP.scrN, screenId: scrP.scrNum, screenComment: "", animate: 0, typeScreen: scrP.scrT, 
        title: scrP.scrTit, titleParam: "", components: [], textErrors: "", levelErrors: 0, navigator:[], initData:[]};
    crScreen.layout =  {type:"RelativeLayout",typeFull:{name:"RelativeLayout",typeBlock:2},parent:null,width:-1,height:-1,gravLayout:{h:4,v:4},
        gravity:{h:4,v:4},itemNav:{},viewId:"root",background:19,children:[]};
    return crScreen;
}

function noScreen(tt) {
    let ik = listScreen.length;
    let uu = tt.toUpperCase();
    for (let i = 0; i < ik; i++) {
        if (uu == listScreen[i].screenName.toUpperCase()) {
            return false;
        }
    }
    return true;
}

function selScreen(event) {
    if (currentScreenView != null && currentScreenView.idScreen == event.currentTarget.idScreen) {
        return;
    }
    offEmulator();
    selScreenView(event.currentTarget);
}

function selScreenName(name) {
    if (currentScreen != null && currentScreen.screenName == name) {
        return;
    }
    
    let ik = listScreen.length;
    let uu = name.toUpperCase();
    let scr = -1;
    for (let i = 0; i < ik; i++) {
        if (uu == listScreen[i].screenName.toUpperCase()) {
            scr = i;
            break;
        }
    }
    let chS = list_screens.children;
    if (scr > -1) {
        offEmulator();
        let sss = chS[scr];
        selScreenView(chS[scr]);
    }
}

function selScreenView(scr, goto) {
    hideScreen();
    currentScreenView = scr;
    setSelectScreen(goto);
}

function hideScreen() {
    if (currentScreenView != null) {
        oneScreenValid(currentScreen, currentScreenView);
        currentScreenView.className = "screen";
        let listC = currentScreenView.getElementsByClassName("list_components");
        if (listC != null && listC.length > 0) {
            listC[0].style.display = "none";
        }
        let tt = currentScreenView.getElementsByClassName("comment");
        if (tt != null) {
            var t = tt[0];
            if (t.style.display == "block") {
                t.style.display = "none";
            }
        }
    }
}

function setSelectScreen(goto) {
    currentScreenView.className = "screen_sel";
    var id = currentScreenView.idScreen;
    var ik = listScreen.length;
    currentScreen = null;
    for (let i = 0; i < ik; i++) {
        let ls = listScreen[i];
        if (id == ls.screenId) {
            currentScreen = ls;
            positionScreen = i;
            break;
        }
    }
    if (currentScreen != null) {
        currentChildren = currentScreen.layout.children;
        clearViewEl(currentChildren);
        let listC = currentScreenView.getElementsByClassName("list_components");
        if (listC != null && listC.length > 0) {
            let listComp = listC[0];
            listComp.style.display = "block";
            let first = listComp.firstElementChild;
            if (first != null) {
                selComponentAll(first);
            }
        }
        setScreenView();
        setScreenComponents();
    }
    if (goto != null) {
        screen_container.scrollTop = goto;
    }
}

function clearViewEl(ch) {
    let ik = ch.length;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            let chi = ch[i];
            chi.viewElement = null;
            if (chi.children != null && chi.children.length > 0) {
                clearViewEl(chi.children);
            }
        }
    }
}

function setScreenView() {
    clearRoot();
    listSaveElements = currentScreen.layout;
    setScreenLayout();
}

function setScreenComponents() {
    let listC = currentScreenView.getElementsByClassName("list_components");
    if (listC != null) {
        let listComp = listC[0];
        listComp.style.display = "block";
        listComp.innerHTML = "";
        let cc = currentScreen.components;
        let ik = cc.length;
        let idComponentNumMax = 0;
        if (ik > 0) {
            let firstView = null;
            let firstComp = null;
            for (let i = 0; i < ik; i++) {
                currentComponentDescr = cc[i];
                let componId = currentComponentDescr.componId;
                if (idComponentNumMax < componId) {
                    idComponentNumMax = componId;
                }
                uxFunction = null;
                try {
                    uxFunction = eval("new ux" + currentComponentDescr.type + "();");
                } catch(e) { }
                if (uxFunction != null) {
                    currentComponentView = newComponent(currentComponentDescr.view.viewId);
                    currentComponentView.addEventListener('click', selComponent, true);
                    currentComponentView.addEventListener('focus', selComponent, true);
                    listComp.append(currentComponentView);
                    currentComponentView.componId = componId;
                    currentComponent = getComponentById(componId);
                    if (currentComponent == null) {
                        currentComponent = tryFindByViewId(currentComponentDescr.view.viewId);
                        if (currentComponent != null) {
                            currentComponent.componId = componId;
                        }
                    }
                    if (i == 0) {
                        currentComponentView.className = "component_sel";
                        firstView = currentComponentView;
                        firstComp = currentComponent;
                    } else {
                        currentComponentView.className = "component";
                    }
                    setValueComponent(currentComponentView, currentComponent, currentComponentDescr);
                }

                container_scr.scroll_y.resize(container_scr);
            }
            if (firstView != null) {
                currentComponentView = firstView;
                currentComponent = firstComp;
                currentComponentDescr = cc[0];
                uxFunction = null;
                try {
                    uxFunction = eval("new ux" + currentComponentDescr.type + "();");
                } catch(e) { }
            }
        }
        idComponentNum = idComponentNumMax + 1;
    }
}

function setListScreen() {
    let jk = listScreen.length;
    let maxIdScreenNum = 0;
    let isError = 0;
    for (var j = 0; j < jk; j++) {
        currentScreen = listScreen[j];
        idScreenNum = currentScreen.screenId;
        if (maxIdScreenNum < idScreenNum) {
            maxIdScreenNum = idScreenNum;
        }
        currentScreenView = newScreen(currentScreen);
        if (currentScreen.levelErrors > isError) {
            isError = currentScreen.levelErrors;
        }
        currentScreenView.idScreen = idScreenNum;
        currentScreenView.className = "screen";
        currentScreenView.addEventListener('click', selScreen, true);
        setSelected("type_screen", currentScreen.typeScreen);
        setSelected("anim_screen", currentScreen.animate);
        list_screens.append(currentScreenView);
    }
    if (listScreen.length == 0) {
        currentScreen = null;
        currentScreenView = null;
        idScreenNum = 0;
        root.innerHTML = "";
    } else {
        currentScreen = listScreen[0];
        currentChildren = currentScreen.layout.children;
        let vv_0 = list_screens.getElementsByClassName("screen");
        if (vv_0 != null) {
            currentScreenView = vv_0[0];
            currentScreenView.className = "screen_sel";
            let listC = currentScreenView.getElementsByClassName("list_components");
            if (listC != null && listC.length > 0) {
                listC[0].style.display = "block";
            }
        }
        idScreenNum = maxIdScreenNum + 1;
        setScreenView();
        setScreenComponents();
        if (isError > 0) {
            setBoxError();
        }
    }
}

function getComponentDescrById(id) {
    let compDescr = currentScreen.components;
    let ik = compDescr.length;
    for (let i = 0; i < ik; i++) {
        let des = compDescr[i];
        if (des.componId == id) {
            return des;
        }
    }
    return null;
}

function setValueComponent(nc, compLayout, comp_descr) {
    let cont = nc.getElementsByClassName("component_param")[0];
    uxFunction.setValue(cont);
}

function setSelected(cl, val) {
    let ss = currentScreenView.getElementsByClassName(cl);
    if (ss != null && ss.length > 0) {
        let el = ss[0];
        el.options[val].selected = true;
    }
}

function newScreen(scr) {
    var container = document.createElement('div')
    let err = "";
    if (scr.levelErrors != null && scr.levelErrors > 0) {
        err = "background-color:" + colorsEroor[scr.levelErrors] + ";";
    }
    container.innerHTML = '<div class="screen_sel">'
        +'<div class="error_screen" style="float:left;width:5px;height:40px;cursor:pointer;' + err + '" onmouseover="errorScrOver(this)" onmouseout="tooltipMessageOut(this)"></div>'
        +'<div style="padding-bottom:15px;height:30px;margin-left:10px">'
            +'<div style="float:left;"><div style="color: #2228;font-size: 10px;margin-left:4px">Name</div>'
            +'<input class="name_screen input_style" onkeyup="return checkNameKey(event)" onkeydown="return validName(event)" style="font-size:12px;color:#110000;font-weight:600" type="text" size="12" value="'+ scr.screenName + '"/>'
            +'</div>'
    
            +'<div style="float:left;margin-left:10px;"><div style="color:#2228;font-size: 10px;margin-left:4px">Type</div>'
            +'<select class="type_screen select_' + browser + '" onchange="changeType(this)" style="width:88px;font-size:12px;color:#110000;"><option>Activity</option><option>Fragment</option></select>'
            +'</div>'
    
            +'<div style="float:left;margin-left:10px"><div style="color:#2228;font-size: 10px;margin-left:4px">Animation</div>'
            +'<select class="anim_screen select_' + browser + '" style="width:50px;font-size:12px;color:#110000;" onchange="changeAnim(this)"><option>No</option><option>L R</option><option>R L</option><option>B T</option><option>T B</option></select>'
            +'</div>'

            +'<div style="float:left;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">Title screen</div>'
            +'<input class="title_screen input_style" onkeyup="return clickUpTitle(event)" value="' + scr.title + '" type="text" size="14"/>'
            +'</div>'
    
            +'<div style="float:left;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">Title parameters</div>'
            +'<input class="title_screen_param input_style" onchange="changeTitleParam(this.value)" value="' + scr.titleParam + '" type="text" size="14"/>'
            +'</div>'
    
            +'<div onclick="navigatorScreen()" style="float:left;margin-left:5px;cursor:pointer"><div style="color:#2228;font-size:10px;">Navigator</div>'
            +'<img width="20" height="20" style="margin-top:3px;margin-left:5px" src="img/navigator.png">'
            +'</div>'
    
            +'<div onclick="initDataScreen()" style="float:left;margin-left:5px;cursor:pointer"><div style="color:#2228;font-size:10px;">Set initial data</div>'
            +'<img width="20" height="20" style="margin-top:3px;margin-left:5px" src="img/init_data.png">'
            +'</div>'
    
            +'<div onclick="viewComment()" style="float:left;margin-left:10px;cursor:pointer"><div style="color:#2228;font-size:10px;">Description</div>'
            +'<img width="20" height="20" style="margin-top:3px;" src="img/roll.png">'
            +'</div>'

            +'<img onclick="plusCompon(this)" style="float:right;cursor:pointer;margin-top:15px;margin-right:10px" width="16" height="16" src="img/add_blue.png">'
        +'</div>'

        +'<textarea class="comment" style="display:none;margin-left:10px;border:1px solid #C5DCFA;box-sizing: border-box;border-radius: 8px;" onchange="changeComment(this.value)" rows="3" cols="108" maxlength="2000">' + scr.screenComment + '</textarea>'
        +'<div class="list_components" style="margin-top:5px;margin-right:8px;margin-left:10px"></div>'
    +'</div>';
    return container.firstChild;
}

function navigatorScreen() {
    if (currentScreen.navigator == null) {
        currentScreen.navigator = [];
    }
    let nnn = new FormNavigator();
    nnn.init(currentScreen.navigator, null, null, true);
//    editDataWind(metaNavigatorScreen, currentScreen.navigator, saveNavigator);
}

function initDataScreen() {
    if (currentScreen.initData == null) {
        currentScreen.initData = [];
    }
    editDataWind(metaInitData, currentScreen.initData, saveinitData);
}

function saveinitData(dat) {

}

function viewComment() {
    var tt = currentScreenView.getElementsByClassName("comment");
    if (tt != null) {
        var t = tt[0];
        if (t.style.display == "none") {
            t.style.display = "block";
        } else {
            t.style.display = "none";
        }
        container_scr.scroll_y.resize(container_scr);
    }
}

function changeComment(v) {
    currentScreen.screenComment = v;
}

function checkNameKey(e) {
    let a = e.currentTarget;
    currentScreen.screenName = a.value;
}

function clickUpTitle(e) {
    let a = e.currentTarget;
    currentScreen.title = a.value;
    setToolTitle(a.value);
}

function setToolTitle(value) {
    let ik = currentChildren.length;
    let count = -1;
    for (let i = 0; i < ik; i++) {
        let ls = currentChildren[i];
        if (ls.type == "ToolBar") {
            count = i;
            break;
        }
    }
    if (count > -1) {
        var tt = currentChildren[count].viewElement.getElementsByClassName("title")[0];
        tt.innerHTML = value;
    }
}

function changeTitleParam(v) {
    currentScreen.titleParam = v;
}

function changeType(el) {
    currentScreen.typeScreen = el.selectedIndex;
}

function changeAnim(el) {
    currentScreen.animate = el.selectedIndex;
}

function plusCompon(el) {
    let parentPlus = el.parentElement;
    let parent = parentPlus.parentElement;
    var el_1 = parent.getElementsByClassName("list_components");
    if (el_1 != undefined) {
        list_cont = el_1[0];
        if (list_cont != null) {
            choiseComponent(el);
        }
    }
}

function cbCloseWind(el) {
    let el_1 = el.closest('.dataWindow');
    el_1.style.display = "none";
    return true;
}

function selComponType(name) {
    if (currentComponentView != null) {
        currentComponentView.className = "component";
    }
    uxFunction = null;
    try {
        uxFunction = eval("new ux" + name + "();");
    } catch(e) { }
    if (uxFunction != null) {
        let viewBaseId = uxFunction.param.viewBaseId;
        if (uxFunction.param.onePerScreen) {
            if (currentScreen.components.length > 0) {
                myAlert("together with the " + viewBaseId + " component, other components cannot be on the screen");
                return;
            }
        } else {
            if (currentScreen.components.length == 1 && currentScreen.components[0].onePerScreen) {
                myAlert("together with the " + currentScreen.components[0].type + " component, other components cannot be on the screen");
                return;
            }
        }
        let viewId = setViewId(viewBaseId);
        currentComponentView = newComponent(viewId);
        currentComponentView.addEventListener('click', selComponent, true);
        currentComponentView.addEventListener('focus', selComponent, true);
        list_cont.append(currentComponentView);
        currentComponentView.className = "component_sel";
        list_screens.scrollTop = list_screens.scrollHeight;
        currentComponentView.componId = idComponentNum;
        uxFunction.addComponent(idComponentNum, viewId);
        idComponentNum ++;
        currentScreen.components.push(currentComponentDescr);
        if (currentComponent != null) {
            currentChildren.push(currentComponent);
        }
        setValueComponent(currentComponentView, currentComponent, currentComponentDescr);
//viewCompon();
        setScreenView();
        container_scr.scroll_y.resize(container_scr);
    }
}

function selComponent(event) {
    let el = event.currentTarget;
    if (currentComponentView != el) {
        selComponentAll(el);
    }
}

function selComponentAll(el) {
    if (currentComponentView != null) {
        currentComponentView.className = "component";
    }
    currentComponentView = el;
    currentComponentView.className = "component_sel";
    let id = currentComponentView.componId;
    currentComponentDescr = getComponentDescrById(id);
    currentComponent = getComponentById(id);
    try {
//        uxFunction = eval("new ux" + currentComponent.type + "();");
        uxFunction = eval("new ux" + currentComponentDescr.type + "();");
    } catch(e) {
        uxFunction = null;
    }
}

// ??????????????????????????????????? служебный
function jsonNoView(el) {
    return JSON.stringify(el, function(key, value) {
            if (key == "viewElement") {
//                return "";
                return null;
            }
            return value;
        });
}
function jsonNoViewParent(el) {
    return JSON.stringify(el, function(key, value) {
            if (key == "viewElement") {
//                return "";
                return null;
            }
            if (key == "parent") {
                return undefined;
            }
            return value;
        });
}
// ??????????????????????????????????? служебный


function newComponent(viewId) {
    let parComp = uxFunction.getParamComp();
    var str = '<div class="component_sel">'
            +'<div class="name_compon" style="float:left">' + parComp.name + '</div>'
            +'<div class="name_compon" style="float:left;margin-left:10px;font-size:10px;margin-top:2px;">(' + viewId + ')</div>'
            +'<div class="special_func" style="float:left;margin-top:3px;margin-left:20px;">' + uxFunction.getSpecialView() + '</div>'
            +'<img onclick="delCmponent(this)" style="float:right;cursor:pointer;margin-top:3px;margin-right:10px" width="18" height="18" src="img/close-o.png">'
            +'<div class="component_param" style="padding: 5px;clear:both">' + uxFunction.getEditParam() + '</div>'
            +'</div>';
    var container = document.createElement('div')
    container.innerHTML = str;
    return container.firstChild;
}

function del_screen(el) {
    let parentDel = el.parentElement;
    let parent = parentDel.parentElement;
    let nn = parent.getElementsByClassName("name_screen");
    let ik = listScreen.length;
    let iEl = -1;
    let nameEl = currentScreen.screenName;
    for (let i = 0; i < ik; i++) {
        if (nameEl == listScreen[i].screenName) {
            iEl = i;
            break;
        }
    }
    listScreen.splice(iEl, 1);
    
    let next = parent.nextElementSibling;
    if (next != null) {
        currentScreenView = next;
        setSelectScreen();
    } else {
        let prev = parent.previousElementSibling;
        if (prev != null) {
            currentScreenView = prev;
            setSelectScreen();
        } else {
            clearRoot();
        }
    }
    parent.parentNode.removeChild(parent);
    container_scr.scroll_y.resize(container_scr);
}

function screenDelete() {
    let parent = currentScreenView;
    let ik = listScreen.length;
    let iEl = -1;
    let nameEl = currentScreen.screenName;
    for (let i = 0; i < ik; i++) {
        if (nameEl == listScreen[i].screenName) {
            iEl = i;
            break;
        }
    }
    listScreen.splice(iEl, 1);
    
    let next = parent.nextElementSibling;
    if (next != null) {
        currentScreenView = next;
        setSelectScreen();
    } else {
        let prev = parent.previousElementSibling;
        if (prev != null) {
            currentScreenView = prev;
            setSelectScreen();
        } else {
            clearRoot();
        }
    }
    parent.parentNode.removeChild(parent);
    container_scr.scroll_y.resize(container_scr);
}

function delCmponent(el) {
    let comp = el.closest(".component_sel");
    let cId = comp.componId;
    let cc = currentScreen.components;
    let ik = cc.length;
    compI = -1;
    for (let i = 0; i < ik; i++) {
        if (cc[i].componId == cId) {
            compI = i;
            break;
        }
    }
    if (compI > -1) {
        compEl = getInfComponentById(cId);
        if (compEl != null) {
            compEl.parent.splice(compEl.ind, 1);
        }
        cc.splice(compI, 1);
        setSelectScreen();
    }
}

function setViewId(id) {
    let cc = currentScreen.components;
    let ik = cc.length;
    let count = -1;
    for (let i = 0; i < ik; i++) {
        let vi = cc[i].view.viewId;
        if (vi != null) {
            if (vi == id) {
                if (count < 0) {
                    count = 0;
                }
                continue;
            }
            let j = vi.lastIndexOf("_");
            let vn;
            if (j > -1) {
                vn = vi.substring(0, j);
            } else {
                vn = vi;
            }
            if (vn == id) {
                let c = 0;
                if (j > -1) {
                    c = vi.substring(j + 1);
                    c = parseInt(c);
                }
                if (count < c) {
                    count = c;
                }
            }
        }
    }
    if (count > -1) {
        return id + "_" + (count + 1);
    } else {
        return id;
    }
}

function errorScrOver(el) {
    let id = el.parentElement.idScreen;
    let scr = getScreenById(id);
    if (scr != null && scr.levelErrors > 0) {
        tooltipErrorScreen(el, scr.textErrors);
    }
}

function getScreenById(id) {
    let ik = listScreen.length;
    let res = null;
    for (let i = 0; i < ik; i++) {
        let ls = listScreen[i];
        if (id == ls.screenId) {
            res = ls;
            break;
        }
    }
    return res;
}
function undo() {
    
}

function restore() {
    
}
