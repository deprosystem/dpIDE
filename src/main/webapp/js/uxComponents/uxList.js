function uxList() {
    this.param = {name: "List", viewBaseId: "list", onlyOne: false};
    this.hiddenHandlers = ",Autch,backOk,send,update,";
    this.editParam = '<div style="height:1px;background-color:#1dace9;margin-top:5px"></div>\n\
        <div class="comp_view_param" style="height:42px;">\n\
            <div class="span_count" style="float: left;">\n\
                <div class="text_style_ui">Span count</div>\n\
            </div>\n\
            <div style="float:left;margin-left:10px;"><div style="color:#2228;font-size: 10px;margin-left:4px">Orientation</div>\n\
                <select class="orient type_screen select_' + browser + '" onchange="changeOrientList(this)" style="width:88px;font-size:12px;color:#110000;"><option>vertical</option><option>horizontal</option></select>\n\
            </div>\n\
            <div class="no_data" style="float: left;margin-left:10px;">\n\
                <div class="text_style_ui">View if no data</div>\n\
            </div>';
        let selVar = '<div class="sel_field" style="float:left;margin-left:10px;display:none"><div style="color: #2228;font-size: 10px;margin-left:4px">Field</div>'
            +'<select class="selection_field select_';
        let selVar2 = '" style="width:140px;" onfocus="formListVarSel(this)" onchange="changeSelectionField(this)"></select></div>';
        let selType = '<div class="sel_type" style="float:left;margin-left:10px"><div style="color:#2228;font-size: 10px;margin-left:4px">Selection type</div>'
        +'<select class="selection_type select_';
        let selType2 = '" onchange="changeSelectionType(this)" style="width:80px;"><option>None</option><option>Single</option><option>Multiple</option>'
            +'<option>Param</option><option>Value</option><option>Locale</option></select></div>';
        let selValue = '<div class="selection_value" style="float:left;margin-left:10px;display:none"><div style="color: #2228;font-size: 10px;margin-left:4px">Value</div>'
            +'<input class="sel_value input_style" onchange="changeSelValue(this.value)" type="text" size="14"/>'
            +'</div>';
    let optionsIcon = '<div onclick="optionsIconClick(this)" style="float:left;cursor:pointer;margin-left:20px;">'
            +'<div style="float:left;color:#2228;font-size:10px">Options</div>'
            +'<img style="float:left;margin-left:5px;" width="14" height="14" src="img/options.png">'
        +'</div>';
    let cascadingPar = "";
    let options = '<div class="container_options" style="height:42px;margin-top:5px;padding-top:5px;display:none;border-top:1px solid #1dace9"></div>';

    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        let stSrc = "check-act";
        if (currentComponentDescr != null) {
            let valNoAct = currentComponentDescr.view.targetButton;
            if (valNoAct)  {
                stSrc = "check-sel_1";
            }
        }
        let noActiveL = '<div style="float:left;cursor:pointer;margin-left:20px;">'
            +'<div style="float:left;color:#2228;font-size:10px">Do not activate at startup</div>'
            +'<img onclick="noActiveListClick(this)" style="float:left;margin-left:5px;" width="14" height="14" src="img/' + stSrc + '.png">'
        +'</div>';
        return docNavigator + optionsIcon + noActiveL;
    }
    
    this.getEditParam = function () {
        return uxModelView("createViewForListV", "createViewForListH", true) + this.editParam 
                + selType + browser + selType2 + selVar + browser + selVar2 + selValue + '</div>' + options;
    }
    
    this.getCreateListener = function () {
        return {vert:"createViewForListV", horiz:"createViewForListH"};
    }
    
    this.showField = function(v) {
        let fwt = currentComponentView.getElementsByClassName("field_with_type")[0];
        if (v) {
            fwt.style.display = "block";
        } else {
            fwt.style.display = "none";
        }
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
//        let typeView = {type:"RelativeLayout",typeFull:{name:"RelativeLayout",typeBlock:2},viewId:"T_0",typeUxUi: "ui",gravLayout:{h:4,v:4},gravity:{h:4,v:4},width: -1,height:10,children:[]};
        let typeView = {type:"SwipeLayout",typeFull:{name:"SwipeLayout",typeBlock:2},viewId:"__sw_0",typeUxUi: "ui",componParam:{type:26,nodel:true,noact:true,nomove:true,nodrop:true},gravLayout:{h:4,v:4},gravity:{h:4,v:4},width: -1,height:10,children:[
                {type:"RelativeLayout",typeFull:{name:"RelativeLayout",typeBlock:2},viewId:"T_0",typeUxUi: "ui",componParam:{nomove:true},gravLayout:{h:4,v:4},gravity:{h:4,v:4},width: -1,height:-1,children:[]},
                {type:"Swipe",typeFull:{name:"Swipe",typeBlock:2},viewId:"sw_l",typeUxUi: "ui",componParam:{type:7,nodel:true,nomove:true},gravLayout:{h:4,v:4},gravity:{h:4,v:4},width: 0,height:-1,children:[]},
                {type:"Swipe",typeFull:{name:"Swipe",typeBlock:2},viewId:"sw_r",typeUxUi: "ui",componParam:{type:7,nodel:true,nomove:true},gravLayout:{h:2,v:4},gravity:{h:4,v:4},width: 0,height:-1,children:[]}
        ]};
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:2,noact:true,nodrop:true},
                typeFull: {name: tt, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:-1,itemNav:{},viewElement: null,children:[typeView]};
        currentComponentDescr = {type:tt, componId: componId, model:{method:0,data:[[]],progr:"standard"},view:{viewId: viewId,spanC:1,orient:"vertical",no_data:""},
            options:{isCascade:false,nextId:"",enterId:"",nameGlob:"",listVar:"",first:false},navigator:[]};
    }
    
    this.setValue = function(componParam) {
        setValueListPanel(componParam);
    }
    
    this.getHelpLink = function() {
//        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.wr0jqzoad5ky";
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.4ysfqsv8dxu6";
    }
    
    this.isValid = function(compD, screen) {
        let layout = screen.layout
        let tab = "&ensp;";
        let err = {text:"",error:0};
        let viewId = compD.view.viewId;
//        let mod = compD.model;
        let errMod = isValidModel(compD.model, tab, viewId);
        if (errMod.error > err.error) {
            err.error = errMod.error;
            err.text += errMod.text;
        }
        let no_d = compD.view.no_data;
        if (no_d != null && no_d.length > 0) {
            let p = getCompByViewId(layout.children, no_d);
            if (p == null) {
                err.text += txtError(2, tab, "component " + viewId + " error view no data ");
                err.error = 2;
            }
        }
        if (compD.view.selectedType != null) {
            switch (compD.view.selectedType) {
                case "Value":
                    if (compD.view.selectedField == null || compD.view.view.selectedValue == null) {
                        err.text += txtError(2, tab, "component " + viewId + " error: there is no property Field or Value for the selected = Param.");
                        err.error = 2;
                    }
                    break; 
                case "Param":
                    if (compD.view.selectedField == null) {
                        err.text += txtError(2, tab, "component " + viewId + " error: there is no property Field for the selected = Param.");
                        err.error = 2;
                    }
                    break; 
                    }
        }

        if (compD.options != null && compD.options.isCascade != null && compD.options.isCascade) {
            if (compD.options.enterId == null || compD.options.nameGlob == null || compD.options.listVar == null ||
                    compD.options.enterId == "" || compD.options.nameGlob == "" || compD.options.listVar == "") {
                err.text += txtError(2, tab, "component " + compD.type + " error: Options are incomplete.");
                err.error = 2;
            }
        }
        
        let nav = compD.navigator;
        if (nav != null && nav.length > 0) {
            let erNav = isValidNavigator(nav, compD);
            if (erNav != "") {
                err.text += txtError(2, tab, "component " + viewId + " error in Navigator " + erNav);
                err.error = 2;
            }
        }
        return err;
    }
}

function setValueListPanel(componParam) {
    setValueModel(componParam);
    setValueView(componParam);
}

function setValueView(componParam) {
    let view = currentComponentDescr.view;
    let aa = editNumberParam("Amount", 40, 28, 1, 500, "amountSelected");
    aa.className = "sel_amount";
    aa.style.marginLeft = "10px";
    aa.style.display = "none";
    if (view.amountSelected != null) {
        setNumberParamValue(aa, view.amountSelected);
    }
    let cp = componParam.getElementsByClassName("comp_view_param")[0];
    cp.appendChild(aa);
    
    if (view.selectedType != null) {
        let sel_t = componParam.getElementsByClassName("selection_type")[0];
        sel_t.value = view.selectedType;
        changeSelType(view.selectedType);
    }
    
    if (view.selectedField != null) {
        let sel_f = componParam.getElementsByClassName("selection_field")[0];
        sel_f.value = view.selectedField;
    }
    
    if (view.selectedValue != null) {
        let sel_v = componParam.getElementsByClassName("sel_value")[0];
        sel_v.value = view.selectedValue;
    }
    
    let span = componParam.getElementsByClassName("span_count")[0];
    
    if (view.spanC == null) {
        view.spanC = 1;
    }
    let nn = createNumber(40, 24, 1, 3, "changeSpan");
    setNumberInputId(nn, "spanCount");
    span.appendChild(nn);
    spanCount.value = view.spanC;
    
    let orient = componParam.getElementsByClassName("orient")[0];
    if (view.orient == null) {
        view.orient = "vertical";
    }
    orient.value = view.orient;
    let no_data = componParam.getElementsByClassName("no_data")[0];
    if (view.no_data == null) {
        view.no_data = "";
    }
    let st = formListIdElem(currentChildren);
    let sel = formSelectForEditData(" " + st, view.no_data);
    currentComponentDescr.view.no_data = sel.options[sel.selectedIndex].value;
    sel.className = "select_" + browser;
    sel.style.cssText = "width:80px;font-size:12px;color:#110000;";
    sel.addEventListener("change", function(){changeNoData(sel)}, true);
    no_data.appendChild(sel);
    
    let changOpt = '<div style="float:left;">'
                +'<div style="font-size:10px;color:#2228">Cascading param</div>'
                +'<img class="check_cascade" onclick="checkCascadeParam(this);" style="cursor:pointer;margin-top:5px;margin-left:14px" width="16" height="16" src="img/check-act.png">'
            +'</div>'
    let changFirst = '<div style="float:left;">'
                +'<div style="font-size:10px;color:#2228">First</div>'
                +'<img class="check_cascade_f" onclick="checkCascadeFirst(this);" style="cursor:pointer;margin-top:5px;margin-left:14px" width="16" height="16" src="img/check-act.png">'
            +'</div>'
    let opt = componParam.getElementsByClassName("container_options")[0];
    opt.appendChild(newDOMelement(changOpt));
    let allParamCascade = newDOMelement('<div class="allParamCascade" style="height:100%;float:left;display:none"></div>')
    opt.appendChild(allParamCascade);
    
    if (currentComponentDescr.options == null) {
        currentComponentDescr.options = {isCascade:false,nextId:"",enterId:"",nameGlob:"",listVar:"",first:false};
    }

    let selNext = selectListID("next Id", 100, currentComponent.children, currentComponentDescr.options.nextId, setNextId)
    allParamCascade.appendChild(selNext);
    let selEnter = selectListID("enter Id", 100, currentComponent.children, currentComponentDescr.options.enterId, setEnterId)
    allParamCascade.appendChild(selEnter);
    
    let nameGlob = editTextParam("Global variable name", 100, currentComponentDescr.options.nameGlob, "changeNameGlobVar");
    allParamCascade.appendChild(nameGlob);
    let listVar = editTextParam("Variable list ", 200, currentComponentDescr.options.listVar, "changeListGlobVar");
    allParamCascade.appendChild(listVar);
    let ff = newDOMelement(changFirst);
    let chFF = ff.getElementsByClassName("check_cascade_f")[0];
    if (currentComponentDescr.options.first) {
        chFF.src = "img/check-sel_1.png";
    } else {
        chFF.src = "img/check-act.png";
    }
    allParamCascade.appendChild(ff);
    let mm = opt.getElementsByClassName("check_cascade")[0];
    showCascadeParam(currentComponentDescr.options.isCascade, mm, allParamCascade);
/*
    let visib = editTextParam("Visibility manager", 150, view.visibility, "changeVisibilityList");
    cp.appendChild(visib);
*/
    let vm = editImageNoBorder("Visibility manager", "img/eye.png", "visiManager");
    vm.style.marginLeft = "10px";
    cp.append(vm);
}

function visiManager() {
    if (currentComponentDescr.visiManager == null) {
        currentComponentDescr.visiManager = [];
    }
    editDataWind(metaVisiManager, currentComponentDescr.visiManager, cbSaveVisiManager);
}

function cbSaveVisiManager() {
    
}

function changeNoData(el) {
    currentComponentDescr.view.no_data = el.options[el.selectedIndex].value;
}

function changeSpan(el) {
    currentComponentDescr.view.spanC = el.value;
    currentComponent.spanC = el.value;
    showElemChilds(currentComponent.viewElement);
    
}

function changeOrientList(el) {
    currentComponentDescr.view.orients = el.options[el.selectedIndex].value;
}

function createViewForListH(el, ind) {
    let num;
    let p = el.parentElement.parentElement;
    if (ind != null) {
        num = 0;
    } else {
        num = getNumDataTYpe(p);
    }
    let data = currentComponentDescr.model.data[num];
    if (data.length == 0) {
        data = currentComponentDescr.model.data[0];
    }
    let listV = currentComponent.viewElement;
    if (listV != null) {
        let ik = data.length;
        if (ik > 0) {
            let listSwipe = listV.children[num];
            let swipeChild = listSwipe.children;
            let sk = swipeChild.length;
            let listView = null;
            for (let s = 0; s < sk; s++) {
                let item = swipeChild[s];
                if (item.android.type == "RelativeLayout") {
                    listView = item;
                }
                break;
            }
            if (listView == null) return;

            listView.innerHTML = "";        // Очистить в прототипе экрана
            listView.android.children.length = 0;   // очистить элементы в андроид
//            listView.android.height = WRAP;
            let item_n = listView.android.itemNav;
            let item_compon = item_n.getElementsByClassName('item-compon')[0];
            item_compon.innerHTML = "";
            let height = 128;
            let toRightOf = "";

            setActive(listView);
            let imgId = formImgFirst(120, 120, data, "4", "12");
            if (imgId > -1) {
                toRightOf = data[imgId].name;
            }
            let topM = 16;
            let estimatedHeight = topM;
            let namePrev = "";
            for (let i = 0; i < ik; i++) {
                let item = data[i];
                if (item.notShow) continue;
                if (imgId != i && item.type.indexOf("serial") == -1) {
                    formElement(item, toRightOf, namePrev, topM);
                    currentElement.android.viewElement = currentElement;
                    namePrev = item.name;
                    topM = 10;
                    estimatedHeight += 22;
                }
            }
            let Divider = formDivider();
            if (height < estimatedHeight) {
                height = estimatedHeight;
            }
            Divider.android.viewElement = Divider;
            listSwipe.android.height = height;
            listView.android.height = height;
            showElemChilds(listV);
        } else {
            tooltipMessage(el, "You need to describe the data");
        }
    }
}

function createViewForListV(el, ind) {
    let num;
    let p = el.parentElement.parentElement;
    if (ind != null) {
        num = 0;
    } else {
        num = getNumDataTYpe(p);
    }
    let data = currentComponentDescr.model.data[num];
    if (data.length == 0) {
        data = currentComponentDescr.model.data[0];
    }
    let listV = currentComponent.viewElement;
    if (listV != null) {
        let ik = data.length;
        if (ik > 0) {
            let listSwipe = listV.children[num];
            let swipeChild = listSwipe.children;
            let sk = swipeChild.length;
            let listView = null;
            for (let s = 0; s < sk; s++) {
                let item = swipeChild[s];
//console.log("VVVV SSS="+s+" TTT="+item.android.type+"<< VVV="+item.android.viewId+"<<");
                if (item.android.type == "RelativeLayout") {
                    listView = item;
                }
                break;
            }
            if (listView == null) return;
//            let listView = listV.children[num];
            listView.innerHTML = "";        // Очистить в прототипе экрана
            listView.android.children.length = 0;   // очистить элементы в андроид
            listView.android.height = WRAP;
            listSwipe.android.height = WRAP;
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
                if (imgId != i && item.type.indexOf("serial") == -1) {
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

function createListView() {
    currentElement = createNewEl();
/*
    p = {typeUxUi: "ui"};
    p.type = 'RelativeLayout';
    p.typeFull = {name: 'RelativeLayout', typeBlock: 2};
    p.gravLayout = {h:4,v:4};
    p.gravity = {h:4,v:4};
    p.width = -1;
    p.height = 10;
    p.children = [];
    currentElement.android = p;
*/
    currentElement.android = {type:"SwipeLayout",typeFull:{name:"SwipeLayout",typeBlock:2},viewId:"__sw_0",typeUxUi: "ui",componParam:{type:13,nodel:true,noact:true,nomove:true,nodrop:true},gravLayout:{h:4,v:4},gravity:{h:4,v:4},width: -1,height:10,children:[]};
    return currentElement;
}

function formListVarSel(el) {
    let data = currentComponentDescr.model.data[0];
    let ik = data.length;
    if (ik > 0) {
        el.innerHTML = "";
        let opt = document.createElement ('option');
        opt.value = opt.text =  '';
        el.options.add (opt);
        for (let i = 0; i < ik; i++) {
            opt = document.createElement ('option');
            let selN = data[i].name;
            opt.value = opt.text = selN;
/*
            if (selN == mSel) {
                opt.selected = selN;
            }
*/
            el.options.add (opt);
        }
        let mSel = currentComponentDescr.view.selectedField;
        if (mSel != null) {
            el.value = mSel;
        }
    }
}

function changeSelectionType(el) {
    let type = el.options[el.selectedIndex].value;
    currentComponentDescr.view.selectedType = type;
    changeSelType(type);
}

function changeSelectionField(el) {
    currentComponentDescr.view.selectedField = el.options[el.selectedIndex].value;
}

function changeSelType(type) {
    let mm = currentComponentView.getElementsByClassName("sel_field")[0];
    let aa = currentComponentView.getElementsByClassName("sel_amount")[0];
    let sv = currentComponentView.getElementsByClassName("selection_value")[0];
    
    switch (type) {
        case "Multiple":
            mm.style.display = "none";
            sv.style.display = "none";
            aa.style.display = "block";
            break;
        case "Value":
        case "Param":
            mm.style.display = "block";
            sv.style.display = "block";
            aa.style.display = "none";
            break;    
        default:
            mm.style.display = "none";
            sv.style.display = "none";
            aa.style.display = "none";
            break;
    }
}

function changeSelValue(v) {
    currentComponentDescr.view.selectedValue = v;
}

function amountSelected(el) {
    currentComponentDescr.view.amountSelected = el.value;
}

function optionsIconClick() {
    let mm = currentComponentView.getElementsByClassName("container_options")[0];
    if (mm.style.display == "none") {
        mm.style.display = "block";
    } else {
        mm.style.display = "none";
    }
    container_scr.scroll_y.resize(container_scr);
}

function checkCascadeParam(el) {
    let mm = currentComponentView.getElementsByClassName("check_cascade")[0];
    if (currentComponentDescr.options == null) {
        currentComponentDescr.options = {isCascade:false,nextId:"",enterId:"",nameGlob:"",listVar:"",first:false};
    }
    let check = mm.src.indexOf("check-sel") == -1;
    currentComponentDescr.options.isCascade = check;
    let pc = currentComponentView.getElementsByClassName("allParamCascade")[0];
    showCascadeParam(check, mm, pc);
}

function checkCascadeFirst(el) {
    let mm = currentComponentView.getElementsByClassName("check_cascade_f")[0];
    if (currentComponentDescr.options == null) {
        currentComponentDescr.options = {isCascade:false,nextId:"",enterId:"",nameGlob:"",listVar:"",first:false};
    }
    let check = mm.src.indexOf("check-sel") == -1;
    currentComponentDescr.options.first = check;
    if (check) {
        mm.src = "img/check-sel_1.png";
    } else {
        mm.src = "img/check-act.png";
    }
}

function showCascadeParam(check, mm, pc) {
    if (check) {
        mm.src = "img/check-sel_1.png";
        pc.style.display = "block";
    } else {
        mm.src = "img/check-act.png";
        pc.style.display = "none";
    }
}

function setNextId(el) {
    currentComponentDescr.options.nextId = el.options[el.selectedIndex].value;
}

function setEnterId(el) {
    currentComponentDescr.options.enterId = el.options[el.selectedIndex].value;
}

function changeNameGlobVar(el) {
    currentComponentDescr.options.nameGlob = el.value;
}

function changeListGlobVar(el) {
    currentComponentDescr.options.listVar = el.value;
}

function noActiveListClick(el) {
    let chec = checkEditCheckbox(el);
    currentComponentDescr.view.targetButton = chec;
}

