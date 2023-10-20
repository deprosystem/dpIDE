function uxMap() {
    this.param = {name: "Map", viewBaseId: "map", onlyOne: true};
    this.hiddenHandlers = ",Autch,Data,";
    this.editParam = 
            uxSeparatorHorisoltal
            +'<div style="display:inline-block;margin-top:3px;">'
                +'<div style="width:60px;float:left;">'
                    +'<div style="font-size:10px;color:#2228">My marker</div>'
                    +'<img class="my_marker" style="cursor:pointer;border:2px solid #bdf;border-radius:4px;background:#fff" onclick="selectMyMarker(event)" width="24" height="24">'
                +'</div>'
                +'<div style="width:45px;float:left;">'
                    +'<div style="font-size:10px;color:#2228">Markers</div>'
                    +'<img class="marker" style="cursor:pointer;border:2px solid #bdf;border-radius:4px;background:#fff" onclick="selectImgMapMarker(event)" width="24" height="24">'
                +'</div>'
                +'<div style="float:left;">'
                    +'<div style="font-size:10px;color:#2228">Center longitude</div>'
                    +'<input class="long input_style" size="10" maxlength="12" onkeydown="return editFloat(event)" onchange="changeLongitude(this)" type="text"/>'
                +'</div>'
                +'<div style="float:left;margin-left:10px;">'
                    +'<div style="font-size:10px;color:#2228">Center latitude</div>'
                    +'<input class="lat input_style" size="10" maxlength="12" onkeydown="return editFloat(event)" onchange="changeLatitude(this)" type="text"/>'
                +'</div>'
                +'<div style="float:left;margin-left:10px;">'
                    +'<div style="font-size:10px;color:#2228">Zoom</div>'
                    +'<input class="zoom input_style" size="3" maxlength="5" onkeydown="return editFloat(event)" onchange="changeLevelZoom(this)" type="text"/>'
                +'</div>'
                +'<div style="float:left;margin-left:10px;">'
                    +'<div style="font-size:10px;color:#2228">Target button</div>'
                    +'<img class="target_but" onclick="checkTargetBut(this);" style="cursor:pointer;margin-top:5px;margin-left:10px" width="16" height="16" src="img/check-act.png">'
                +'</div>'
                +'<div style="float:left;margin-left:10px;">'
                    +'<div style="font-size:10px;color:#2228">Zoom buttons</div>'
                    +'<img class="zoom_but" onclick="checkZoomBut(this);" style="cursor:pointer;margin-top:5px;margin-left:10px" width="16" height="16" src="img/check-act.png">'
                +'</div>'
            +'</div>';

    this.getParamComp = function () {
        return this.param;
    };
    
    this.getSpecialView = function () {
        return docNavigator;
    };
    
    this.getEditParam = function () {
        return uxModelView("createSheetBottomV", "createSheetBottomH") + this.editParam;
    };
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:11},
                typeFull: {name: tt, typeBlock:0}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type: tt, componId: componId, model:{method:0,data:[[]]},view:{viewId: viewId},navigator:[],param:{}};
    };
    
    this.setValue = function(componParam) {
        setValueModel(componParam);
        let par = currentComponentDescr.param;
        if (par != null) {
            if (par.longitude != null && par.longitude.length > 0) {
                let long = componParam.getElementsByClassName("long")[0];
                if (long != null) {
                    long.value = par.longitude;
                }
            }
            if (par.latitude != null && par.latitude.length > 0) {
                let lat = componParam.getElementsByClassName("lat")[0];
                if (lat != null) {
                    lat.value = par.latitude;
                }
            }
            if (par.levelZoom != null && par.levelZoom.length > 0) {
                let zoom = componParam.getElementsByClassName("zoom")[0];
                if (zoom != null) {
                    zoom.value = par.levelZoom;
                }
            }
            if (par.myMarker != null && par.myMarker.length > 0) {
                let myMark = componParam.getElementsByClassName("my_marker")[0];
                if (myMark != null) {
                    myMark.src = par.myMarker;
                }
            }
            if (par.marker != null && par.marker.length > 0) {
                let Mark = componParam.getElementsByClassName("marker")[0];
                if (Mark != null) {
                    Mark.src = par.marker;
                }
            }
            let elem = componParam.getElementsByClassName("target_but")[0];
            if (elem != null) {
                if (currentComponentDescr.view.targetButton) {
                    elem.src = "img/check-sel_1.png";
                } else {
                    elem.src = "img/check-act.png";
                }
            }
            elem = componParam.getElementsByClassName("zoom_but")[0];
            if (elem != null) {
                if (currentComponentDescr.view.targetButton) {
                    elem.src = "img/check-sel_1.png";
                } else {
                    elem.src = "img/check-act.png";
                }
            }
        }
    };
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.bmszjtnwmyrj";
    };
    
    this.isValid = function(compD) {
        let err = {text:"",error:0};
        
        return err;
    }
}

function selectImgMapMarker(e) {
    selectListImage(e, setImgBackMarker);
}

function setImgBackMarker(i) {
    let nn = listImage[i];
    let img = currentComponentView.getElementsByClassName("marker");
    if (img == null) {
        return;
    }
    let imgBl = img[0];
    imgBl.src = nn;
    currentComponentDescr.param.marker = nn;
    if (currentComponent.viewElement != null) {
        currentComponent.viewElement.appendChild(createMarker(nn));
    }
}

function selectMyMarker(e) {
    selectListImage(e, setImgBackMyMarker);
}

function setImgBackMyMarker(i) {
    let nn = listImage[i];
    let img = currentComponentView.getElementsByClassName("my_marker");
    if (img == null) {
        return;
    }
    let imgBl = img[0];
    imgBl.src = nn;
    currentComponentDescr.param.myMarker = nn;
}

function createMarker(nn) {
    var container = document.createElement('div')
    container.innerHTML = '<img src="' + nn + '" style="top:150px;left:50px;position:absolute" width="30" height="30"></div>'
    return container.firstChild
}

function createSheetBottomH(el) {
    tooltipMessage(el, "Not supported yet");
}

function createSheetBottomV(el) {
    let ik = currentComponentDescr.model.data[0].length;
    if (ik > 0) {
        let child = currentScreen.layout.children;
        let sk = child.length;
        let sheet = null;
        let vId = "mark_" + currentComponent.viewId;
        for (let i = 0; i < sk; i++) {
            let vv = child[i];
            if (vv.viewId == vId) {
                sheet = vv.viewElement;
                currentElement = sheet;
                break;
            }
        }
        if (sheet == null) {
            setActive(root);
            sheet = createSheetBottomForUX(vId);
        }
        viewCompon();
        let sheetPan = currentElement.getElementsByClassName("sheetPanel")[0];
        sheetPan.innerHTML = "";
        sheetPan.android.children.length = 0;
        cleanNavigatorEl(sheetPan);  
        let imgHeight = 220;
        let namePrev = "";
        setActive(sheetPan);
        viewCompon();
/*
        n_selectElement = sheet;
        setActive(n_selectElement);
        currentElement = sheet;
        viewCompon();
        let imgHeight = 220;
        let sheetPan = createSheetPanel();
        let namePrev = "";
        n_selectElement.innerHTML = "";
        cleanNavigatorEl(n_selectElement);
        ACTIVE.android.children.length = 0;
        addNewElement(ACTIVE, sheetPan);
        addNavigatorEl(sheetPan);
        ACTIVE.android.children.push(sheetPan.android);
        setActive(sheetPan);
        viewCompon();
*/

        let imgId = formImgFirst(MATCH, imgHeight, currentComponentDescr.model.data[0]);
        if (imgId > -1) {
            namePrev = currentComponentDescr.model.data[0] [imgId].name;
        }
        let topM = 10;

        for (let i = 0; i < ik; i++) {
            let item = currentComponentDescr.model.data[0][i];
            if (item.notShow) continue;
            if (imgId != i) {
                formElement(item, "", namePrev, topM);
                namePrev = item.name;
            }
        }
        currentElement.android.bottomMarg = 10;
        viewCompon();
        sheetPan.android.height = WRAP;
        currentElement = sheetPan;
        viewCompon();
    } else {
        tooltipMessage(el, "You need to describe the data");
    }
}

function checkZoomBut(el) {
    let check = el.src.indexOf("check-sel") == -1;
    currentComponentDescr.view.zoomButtons = check;
    let elem = currentComponent.viewElement;
    if (check) {
        el.src = "img/check-sel_1.png";
        if (elem != null) {
            elem.appendChild(createMapZoom());
        }
    } else {
        el.src = "img/check-act.png";
        let mt = elem.getElementsByClassName("map_zoom");
        if (mt != null) {
            mt[0].remove();
        }
    }
}

function checkTargetBut(el) {
    let check = el.src.indexOf("check-sel") == -1;
    currentComponentDescr.view.targetButton = check;
    let elem = currentComponent.viewElement;
    if (check) {
        el.src = "img/check-sel_1.png";
        if (elem != null) {
            elem.appendChild(createMapTarget());
        }
    } else {
        el.src = "img/check-act.png";
        let mt = elem.getElementsByClassName("map_target");
        if (mt != null) {
            mt[0].remove();
        }
    }
}

function createMapTarget() {
    var container = document.createElement('div')
    container.innerHTML = '<img class="map_target" src="img/target.png" style="top:10px;right:10px;position:absolute" width="30" height="30"></div>'
    return container.firstChild
}

function createMapZoom() {
    var container = document.createElement('div')
    container.innerHTML = '<img class="map_zoom" src="img/zoom.png" style="bottom:10px;right:10px;position:absolute" width="30" height="60"></div>'
    return container.firstChild
}

function changeLongitude(el) {
    currentComponentDescr.param.longitude = el.value;
}

function changeLatitude(el) {
    currentComponentDescr.param.latitude = el.value;
}

function changeLevelZoom(el) {
    currentComponentDescr.param.levelZoom = el.value;
}