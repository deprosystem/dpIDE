
let uxModel1 = '<div class="model_view" style="height:40px;">'
        +'<div style="float:left;"><div style="color:#2228;font-size: 10px;margin-left:4px">Method</div>'
        +'<select class="model_method type_screen select_';

let uxModel2 = '" onchange="changeMethod(this)" style="width:120px;"><option>GET</option><option>POST</option><option>FILTER</option><option>TEST</option>'
            +'<option>JSON</option><option>PARAMETERS</option>'
            +'<option>GLOBAL</option><option>ARGUMENTS</option><option>PROFILE</option><option>FIELD</option><option>GET_DB</option>'
            +'<option>POST_DB</option><option>INSERT_DB</option><option>DEL_DB</option><option>UPDATE_DB</option><option>NULL</option></select>'
        +'</div>'
        +'<div class="param_method" style="float:left;margin-left:10px;"></div>';
/*
let uxModel1 = '<div class="model_view" style="height:40px;">'
        +'<div style="float:left;"><div style="color:#2228;font-size: 10px;margin-left:4px">Data source</div>'
        +'<select class="model_method type_screen select_';

let uxModel2 = '" onchange="changeMethod(this)" style="width:120px;"><option>Database IDE</option><option>API</option><option>Local database</option>' 
            +'<option>API</option><option>TEST</option>'
            +'<option>JSON</option><option>PARAMETERS</option>'
            +'<option>GLOBAL</option><option>ARGUMENTS</option><option>PROFILE</option><option>FIELD</option><option>NULL</option></select>'
        +'</div>'
        +'<div class="param_method" style="float:left;margin-left:10px;"></div>';
*/
let pmUrl = '<div style="display:inline-block;"><div style="color:#2228;font-size:10px;margin-left:4px">URL</div>'
            +'<input class="url input_style" onkeyup="return clickUpURL(event)" style="color:#000a" type="text" size="20" value=""/>'
            +'</div>';
let pmJson = '<div style="display:inline-block;"><div style="color:#2228;font-size:10px;margin-left:4px">Text JSON</div>'
            +'<input class="url input_style" onkeyup="return clickUpURL(event)" style="color:#000a" type="text" size="60" value=""/>'
            +'</div>';
let pmParamUrl = '<div style="display:inline-block;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">URL Parameters</div>'
            +'<input class="param input_style" onchange="changeUrlParam(this.value)" style="color:#000a" type="text" size="15" value=""/>'
            +'</div>';
let pmParameters = '<div style="display:inline-block;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">Parameters</div>'
            +'<input class="param input_style" onchange="changeUrlParam(this.value)" style="color:#000a" type="text" size="15" value=""/>'
            +'</div>';
let pmProgr = '<div class="progr_mod" style="display:inline-block;margin-left:10px;">\n\
                <div class="text_style_ui">Progress</div>\n\
            </div>';
    
let pmTest = '<img onclick="formTestData(this)" width="18" height="18" style="margin-left:10px;margin-top:17px;cursor:pointer;margin-right:5px;" src="img/pen.png">';

function uxModelView(listenerV, listenerH, addType) {
    des = dataDescr(listenerV, listenerH, addType);
//  currentProject.whereServer
    return uxModel1 + browser + uxModel2 + des + '</div><div class="severalDataTypes" style="height:40px;margin-top:5px;display:none;"></div>';
}

function dataDescr(v, h, addType) {
    let vv = "", hh = "", addT = "";
    let styleVV = "clear:both;";
    if (h != null && h.length > 0) {
        hh = '<img onclick="' + h + '(this, 0)" width="16" height="16" src="img/form_protot_hor.png" style="margin-top:4px;margin-left:10px;float:left;clear:both;cursor:pointer;">';
        styleVV = "";
    }
    if (v != null && v.length > 0) {
        vv = '<img onclick="' + v + '(this, 0)" width="16" height="16" src="img/form_protot_vert.png" style="' + styleVV + 'margin-top:4px;float:left;margin-left:10px;cursor:pointer;">';
    }
    if (addType != null && addType) {
        addT = '<div style="float:left;margin-left:5px">'
            +'<div style="font-size:10px;color:#2228;">Add data type</div>'
            +'<img onclick="addDataType();" style="margin-top:6px;margin-left:5px;float:left;clear:both;cursor:pointer;" width="16" height="16" src="img/add_blue.png">'
        +'</div>'
    }
    return '<div class="data_descr" style="float:left;margin-left:10px;">'
        +'<div style="float:left;width:1px;height:26px;margin-top:13px;background-color:var(--c_separator)"></div>'
        +'<img onclick="editDataModel(this, 0)" width="20" height="20" src="img/edit_meta.png" style="margin-top:16px;float:left;margin-left:10px;cursor:pointer;" onmouseover="tooltipHelpOver(this,' + "'Data Description'" + ')">'
        +'<div style="float:left;">'
            +'<div style="color: #2228;font-size: 10px;float:left;">Create View</div>'
            +hh
            +vv
        +'</div>'

        + addT
    +'</div>';
}

function dataDescrAdd(v, h) {
    let vv = "", hh = "";
    let styleVV = "clear:both;";
    if (h != null && h.length > 0) {
        hh = '<img onclick="' + h + '(this)" width="16" height="16" src="img/form_protot_hor.png" style="margin-top:4px;margin-left:10px;float:left;clear:both;cursor:pointer;">';
        styleVV = "";
    }
    if (v != null && v.length > 0) {
        vv = '<img onclick="' + v + '(this)" width="16" height="16" src="img/form_protot_vert.png" style="' + styleVV + 'margin-top:4px;float:left;margin-left:10px;cursor:pointer;">';
    }
    return '<div style="float:left;margin-left:5px;">'
        +'<div style="float:left;width:1px;height:26px;margin-top:13px;background-color:var(--c_separator)"></div>'
        +'<img onclick="editDataModel(this)" width="20" height="20" src="img/edit_meta.png" style="margin-top:16px;float:left;margin-left:10px;cursor:pointer;" onmouseover="tooltipHelpOver(this,' + "'Data Description'" + ')">'
        +'<div style="float:left;">'
            +'<div style="color: #2228;font-size: 10px;float:left;">Create View</div>'
            +hh
            +vv
        +'</div>'

        +'<div style="float:left;margin-left:5px">'
            +'<div style="font-size:10px;color:#2228;">Delete</div>'
            +'<img onclick="delDataType(this);" style="margin-top:6px;margin-left:5px;float:left;clear:both;cursor:pointer;" width="16" height="16" src="img/close-o.png">'
        +'</div>'
    +'</div>';
}

function setValueModel(componParam) {
    let met = componParam.getElementsByClassName("model_method");
    let model = currentComponentDescr.model;
    let descrMet = model.method;
    hostDescr = currentProject.whereServer;
    if (met != null) {
        if (descrMet != null) {
            met = met[0];
            met[descrMet].selected = true;
            changeMethod(met);
        }
    }
    if (model.url != null && model.url.length > 0) {
        let url = componParam.getElementsByClassName("url")[0];
        if (url != null) {
            url.value = model.url;
        }
    }
    if (model.param != null && model.param.length > 0) {
        let param = componParam.getElementsByClassName("param")[0];
        if (param != null) {
            param.value = model.param;
        }
    }
    let ik = model.data.length;
    if (ik > 1) {
        for (let i = 1; i < ik; i++)  {
            addDataType(false);
        }
    }
}

function changeMethod(el) {
    currentComponentDescr.model.method = el.selectedIndex;
    let el_1 = el.parentElement;
    let el_2 = el_1.parentElement.getElementsByClassName("param_method");
    if (el_2 != null) {
        let pm = el_2[0];
        switch (el.options[el.selectedIndex].value) {
            case "POST":
            case "FILTER":
            case "GET":
                pm.innerHTML = "";
                if (hostDescr == "Third party API") {
                    pm.innerHTML = pmUrl + pmParamUrl + pmProgr;
                    setValueGetPost();
                } else {
                    let dd = new EditForm(metaGET, currentComponentDescr.model, pm, null, null, true);
                }
                break;
            case "TEST":
                pm.innerHTML = pmTest;
                break;
            case "PARAMETERS":
                pm.innerHTML = pmParamUrl;
                break;
            case "GLOBAL":
                pm.innerHTML = pmParameters;
                break;
            case "JSON":
                pm.innerHTML = pmJson;
                break;
            default:
                pm.innerHTML = "";
        }
    }
}

function isValidModel(mod, tab, viewId) {
    let err = {text:"",error:0};
    if (mod.method < 2) {
        let pr = mod.progr;
        if (pr != null && pr.length > 0) {
            if (pr != "standard" && pr != "no") {
                let p = getCompByViewId(layout.children, pr);
                if (p == null) {
                    err.text += txtError(2, tab, "component " + viewId + " error in progress " + pr);
                    err.error = 2;
                }
            }
        }
        if (mod.url == null || mod.url == "") {
            if (hostDescr == "Third party API") {
                err.text += txtError(2, tab, "component " + viewId + " URL not specified");
            } else {
                err.text += txtError(2, tab, "component " + viewId + " Request not formed");
            }
            err.error = 2;
        }
    }
    if (mod.method == 6 && (mod.param == null || mod.param == "") ) {
            err.text += txtError(2, tab, "component " + viewId + " parameters not specified");
            err.error = 2;
    }
    return err;
}

function editDataModel(el, ind) {
    let mvP = el.closest(".component_param");
    let mv = mvP.querySelector(".model_view");
    let sel = mv.querySelector(".model_method");
    let selectMethodInModel = sel.options[sel.selectedIndex].value;
    let num;
    let p = el.parentElement;
    if (ind != null) {
        num = 0;
    } else {
        num = getNumDataTYpe(p) + 1;
    }
    switch (selectMethodInModel) {
        case "TEST":
            editDataWind(metaModel, currentComponentDescr.model.data[0], cbSaveDataModel);
            break;
        case "NULL":
            if (currentComponentDescr.type.indexOf("Form") > -1) {
                new FieldsFromSource(currentComponentDescr.model, num, true, new ChoiceTableFields());
            }
            break;
        default:
            if (hostDescr == "Third party API") {
                editDataWind(metaModel, currentComponentDescr.model.data[num], cbSaveDataModel);
            } else {
                let tt = currentComponentDescr.type;
                let ed = currentComponentDescr.type.indexOf("Form") > -1;
                let wSource;
                if (ed) {
                    wSource = new ChoiceTableFields();
                } else {
                    wSource = new ChoiceQueryFields();
                }
                new FieldsFromSource(currentComponentDescr.model, num, ed, wSource);
            }
            break;
    }
/*
    if (selectMethodInModel == "TEST") {
        editDataWind(metaModel, currentComponentDescr.model.data[0], cbSaveDataModel);
    } else if (hostDescr == "Third party API") {
            editDataWind(metaModel, currentComponentDescr.model.data[num], cbSaveDataModel);
        } else {
//            editQueryWind();
//            setModelParam();
            let tt = currentComponentDescr.type;
//            let isFormForQuery = tt == "Form" || tt == "ScrollForm";
            new FieldsFromSource(currentComponentDescr.model, num, currentComponentDescr.type.indexOf("Form") > -1);
        }
*/
}

function setModelParam() {
    hostDomain = currentProject.host;
    if (listQuerys == null) {
        doServerAlien("GET", hostDomain + 'query/list', cbModGetQuerys, null, null, document.body);
    } else {
        modListQuerys();
    }
}

function cbModGetQuerys(res) {
//console.log("RES="+res);
    listQuerys = JSON.parse(res);
    modListQuerys();
}

function modListQuerys() {
    listQuerys.sort(function(a, b){
        let nameA=a.name_query.toLowerCase(), nameB=b.name_query.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    let wind = formWind(300, 400, 40, 250, "Choose a request", true, null, null, null, "");
//    let ww = wind.closest(".wind");
//    ww.style.left = "5px";
    let ik = listQuerys.length;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            modOneQueryView(listQuerys[i], wind, i);
        }
        let scr = wind.closest('.viewport');
        scr.scroll_y.resize();
    }
}

function modOneQueryView(item, el, i) {
    let img = "";
    switch (item.type_query) {
        case "SELECT":
            img = "select-tab";
            break;
        case "DELETE":
            img = "del-tab";
            break;
        case "INSERT":
            img = "add-tab";
            break;
        case "UPDATE":
            img = "edit-tab";
            break;
    }
    let descr = item.descr_query;
    if (descr == null) {
        descr = "";
    }
    let oneDiv = '<div onclick="modEditQuery(this,' + i + ')" style="float:left;width:100%;height:36px;cursor:pointer;border-bottom:1px solid #aaf;clear:both;position:relative">'
                    +'<img src="img/' + img + '.png" style="width:24px;height:24px;position:absolute;top:3px;left:3px;">'
                    +'<div class="name_t" style="font-size:14px;color:#000;position:absolute;top:1px;left:30px">' + item.name_query + '</div>'
                    +'<div class="descr_t" style="font-size:10px;color:#555;position:absolute;top:17px;left:30px;right:0;height:14px;overflow:hidden">' + descr + '</div>'
                +'</div>';
    let cont = newDOMelement(oneDiv);
    el.appendChild(cont);
}

function modEditQuery(el, ind) {
//    closeWindow(el);
    let wind = el.closest(".wind");
    let wd = el.closest(".dataWindow");
    wind.style.bottom = "51px";
    wind.innerHTML = "";
    wd.style.width = "440px";
    let item = listQuerys[ind];
    setTitleWind(wind, "Specify fields for view from query " + item.name_query);
    currentComponentDescr.model.url = "query/" + currentProject.resurseInd + "/" + item.id_query;
    let hTitle = 24, wFields = 220, hTitle1 = hTitle + 1;
    
    let titleSt = '<div style="height:' + hTitle + 'px;border-bottom:1px solid #1dace9;font-size:14px;position:relative">'
            +'<div style="width:' + wFields + 'px;text-align:center;margin-top:3px;float:left;">Fields view</div>'
            +'<div style="height:100%;width:1px;background-color:#1dace9;float:left"></div>'
            +'<div style="text-align:center;margin-top:3px;float:left;width:' + (wFields - 1) + 'px">Fields query</div>'
            +'</div>';
    let controll = createFooter(50);
    addFooter(wind, controll);
    let buttonSave = createButtonBlue('Save', 70);
    controll.append(buttonSave);
    let buttonCancel = createButtonWeite('Cancel', 70);
    buttonCancel.addEventListener("click", function(){closeWindow(wind);}, true);
    controll.append(buttonCancel);
    wd.append(controll);
    let title = newDOMelement(titleSt);
    wind.append(title);
    let selFieldAll = newDOMelement('<img style="width:14px;height:14px;position:absolute;right:7px;top:3px;cursor:pointer" src="img/check-act.png">');
    selFieldAll.addEventListener("click", () => {modSelAllFieldInQu(selFieldAll);}, true);
    title.append(selFieldAll);
    let fView = newDOMelement('<div class="fView" style="position:absolute;top:' + hTitle1 + 'px;left:0;bottom:0;width:' + wFields 
            + 'px;border-right:1px solid #1dace9"></div>');
    let fQuery = newDOMelement('<div class="fQuery" style="position:absolute;top:' + hTitle1 + 'px;right:0;bottom:0;left:' + (wFields - 1) 
            + 'px;"></div>');
    wind.append(fView);
    wind.append(fQuery);
    buttonSave.addEventListener("click", function(){modSaveQuery(fView);closeWindow(wind);}, true);
    let fViewPort = formViewScrolY(fView);
    let fieldsView = fViewPort.querySelector(".viewData");
    let fQueryPort = formViewScrolY(fQuery);
    let fieldsQuery = fQueryPort.querySelector(".viewData");
    let fildsQu = JSON.parse(item.fields_result);
    let ik = fildsQu.length;
    for (let i = 0; i < ik; i++) {
        let it = fildsQu[i];
        let cont = newDOMelement('<div class="cont_f" style="float:left;width:100%;position:relative;height:24px;border-bottom:1px solid #aaf;clear:both"></div>');
        let name = newDOMelement('<div style="margin-top:2px;float:left;margin-left:4px;font-size:14px">' + it.name + ' </div>');
        cont.idField = it.id_field;
        cont.name_field = it.name;
        cont.type_field = it.type;
        cont.title_field = it.title;
        cont.append(name);
        fieldsQuery.append(cont);
        let rect = cont.getBoundingClientRect();
        let rect_1 = name.getBoundingClientRect();
        let descr = newDOMelement('<div style="font-size:10px;color:#555;margin-top:7px;height:11px;width:' + (rect.width - rect_1.width - 20) 
                + 'px;float:left;margin-left:5px;overflow:hidden">' + it.title);
        cont.appendChild(descr);
        let selField = newDOMelement('<img style="width:14px;cursor:pointer;height:14px;position:absolute;right:2px;top:4px;" src="img/check-act.png">');
        cont.appendChild(selField);
        selField.addEventListener("click", () => {modSelFieldInQu(selField, fieldsView, selFieldAll);}, true);
    }
}

function modSelFieldInQu(el, fQuery, selFieldAll) {
    if (checkElement(el)) {
        modAddFieldsInQuery(el, fQuery);
    } else {
        modDelFieldsInQuery(el, fQuery);
    }
    modSetViewAllImg(el, selFieldAll);
}

function modAddFieldsInQuery(el, fQuery) {
    let cont = el.closest('.cont_f');
//    let idF = cont.idField;
    modOneFieldView(cont, fQuery);
    let ss = fQuery.closest(".viewport");
    ss.scroll_y.resize();
}

function modOneFieldView(item, fQuery) {
//    let tt = currentComponentDescr.type;
//    let isFormForQuery = tt == "Form" || tt == "ScrollForm";
    let cont = newDOMelement('<div class="field" style="float:left;width:100%;position:relative;height:24px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
    cont.idField = item.idField;
    cont.name_field = item.name_field;
    cont.type_field = item.type_field;
    cont.title_field = item.title_field;
    let name = newDOMelement('<div class="name" style="font-size:14px;color:#000;margin-top:2px;float:left;margin-left:3px">' + item.name_field + '</div>');
    cont.appendChild(name);
    fQuery.appendChild(cont);
    let rect = cont.getBoundingClientRect();
    let rect_1 = name.getBoundingClientRect();
    let descr = newDOMelement('<div style="font-size:10px;color:#555;margin-top:6px;height:11px;width:' + (rect.width - rect_1.width - 20) 
            + 'px;float:left;margin-left:5px;overflow:hidden">' + item.title_field);
/*    
    if (isFormForQuery) {
        let selField = newDOMelement('<img style="width:14px;cursor:pointer;height:14px;float:right;margin-right:2px;margin-top:3px;" src="img/check-sel_1.png">');
        selField.addEventListener("click", function(){checkElement(selField)}, false);
        cont.append(selField);
    }
*/
    cont.appendChild(descr);
}

function modDelFieldsInQuery(el, fQuery) {
    let cont = el.closest('.cont_f');
    let idF = cont.idField;
    let fieldsView = fQuery.children;
    let ik = fieldsView.length;
    for (let i = 0; i < ik; i++) {
        let vv = fieldsView[i];
        if (idF == vv.idField) {
            vv.remove();
            let ss = fQuery.closest(".viewport");
            ss.scroll_y.resize();
            break;
        }
    }
}

function modSaveQuery(el) {
    let elW = el.closest(".dataWindow");
    let elF = elW.querySelector(".fView");
    let elV = elF.querySelector(".viewData");
    let fieldsQQ = elV.children;
    ik = fieldsQQ.length;
    let data = [];
    for (let i = 0; i < ik; i++) {
        let item = fieldsQQ[i];
        if (item.type_field.indexOf("erial") == -1) {
//            let itemData = {name:item.name_field,type:item.type_field,title:item.title};
            let imgCheck = item.querySelector("IMG");
            let ed = false;
            if (imgCheck != null && imgCheck.src.indexOf("check-sel") > -1) {
                ed = true;
            }
            let itemData = {name:item.name_field,type:item.type_field,edit:ed};
            data.push(itemData);
        }
    }
    currentComponentDescr.model.data[0] = data;
}

function modSetViewAllImg(el, sel) {
    let cont = el.closest(".viewData");
    let child = cont.children;
    let ik = child.length;
    let cPl = 0, cMin = 0;
    for (let i = 0; i < ik; i++) {
        let itemEl = child[i];
        let sel = itemEl.getElementsByTagName("img")[0];
        if (sel.src.indexOf("check-sel") > -1) {
            cPl++;
        } else {
            cMin++;
        }
    }
/*
    let tabBlock = el.closest(".table_view");
    let viewData = tabBlock.getElementsByClassName("tab_title")[0];
    let sel = viewData.getElementsByTagName("img")[0];
*/
    if (cMin == 0) {
        sel.src = "img/check-sel_1.png";
    } else {
        if (cPl == 0) {
            sel.src = "img/check-act.png";
        } else {
            sel.src = "img/check-sel-blur.png";
        }
    }
}

function getNumDataTYpe(el) {
    let dataT = currentComponentView.getElementsByClassName("severalDataTypes")[0];
    let ch = dataT.children;
    let ik = ch.length;
    let num = 0;
    for (let i = 0; i < ik; i++) {
        if (ch[i] == el) {
            num = i;
            break;
        }
    }
    return num;
}

function cbSaveDataModel() {
    
}

function setValueQuery() {
    let cont = currentComponentView.getElementsByClassName("component_param")[0];
    let mod = currentComponentDescr.model;
    let progr = cont.getElementsByClassName("progr_mod")[0];
    if (mod.progr == null) {
        mod.progr = "standard";
    }
    let st = formListIdElem(currentChildren);
    let sel = formSelectForEditData("standard,no" + st, mod.progr);
    currentComponentDescr.model.progr = sel.options[sel.selectedIndex].value;
    sel.className = "select_" + browser;
    sel.style.cssText = "width:80px;font-size:12px;color:#110000;";
    sel.addEventListener("change", function(){changeProgress(sel);}, true);
    progr.appendChild(sel);
}

function setValueGetPost() {
    let cont = currentComponentView.getElementsByClassName("component_param")[0];
    let mod = currentComponentDescr.model;
    if (mod.url != null && mod.url.length > 0) {
        let url = cont.getElementsByClassName("url")[0];
        if (url != null) {
            url.value = mod.url;
        }
    }
    if (mod.param != null && mod.param.length > 0) {
        let param = cont.getElementsByClassName("param")[0];
        if (param != null) {
            param.value = mod.param;
        }
    }
    let progr = cont.getElementsByClassName("progr_mod")[0];
    if (mod.progr == null) {
        mod.progr = "standard";
    }
    let st = formListIdElem(currentChildren);
    let sel = formSelectForEditData("standard,no" + st, mod.progr);
    currentComponentDescr.model.progr = sel.options[sel.selectedIndex].value;
    sel.className = "select_" + browser;
    sel.style.cssText = "width:80px;font-size:12px;color:#110000;";
    sel.addEventListener("change", function(){changeProgress(sel);}, true);
    progr.appendChild(sel);
}

function changeProgress(el) {
    currentComponentDescr.model.progr = el.options[el.selectedIndex].value;
}

function clickUpURL(e) {
    let a = e.currentTarget;
    currentComponentDescr.model.url = a.value;
}

function changeUrlParam(v) {
    currentComponentDescr.model.param = v;
}

function formTestData(el) {
    let dat = currentComponentDescr.model.data[0];
    if (dat == null || dat.length == 0) {
        tooltipMessage(el, "You need to describe the data");
    } else {
        if (currentComponentDescr.model.test == null) {
            currentComponentDescr.model.test = "[]";
        }
        let md = {titleForm:"Entering test data", description:formMetaDataModel(dat)};
        let test = JSON.parse(currentComponentDescr.model.test);
        editDataWind(md, test, cbSaveTestDat);
//        editDataWind(md, currentComponentDescr.model.test, cbSaveTestDat);
    }
}

function cbSaveTestDat(dat) {
//    currentComponentDescr.model.test = JSON.stringify(currentComponentDescr.model.test);
    currentComponentDescr.model.test = JSON.stringify(dat);
}

function addDataType(addData) {
    let selVar = '<div style="float:left;"><div style="color: #2228;font-size: 10px;margin-left:4px">Field with type</div>'
            +'<select onchange="changeModelFieldT(this)" class="select_';
    let selVar2 = '" onfocus="formListVar(this)" ></select>'
        +'</div>';
    let listeners = null;
    try {
        uxFunction = eval("new ux" + currentComponent.type + "();");
        listeners = uxFunction.getCreateListener();
    } catch(e) { }
    if (listeners != null) {
        let dataT = currentComponentView.getElementsByClassName("severalDataTypes")[0];
        dataT.style.display = "block";
/*
        try {
            uxFunction = eval("new ux" + currentComponent.type + "();");
            uxFunction.showField(true);
        } catch(e) { }
*/
        let el = newDOMelement(dataDescrAdd(listeners.vert, listeners.horiz));
        let ik = dataT.children.length;
        if (ik == 0) {
            let sepVar = newDOMelement(selVar + browser + selVar2);
            dataT.append(sepVar);
        }
        if (ik < 5) {
            dataT.append(el);
            if (addData == null) {
                currentComponentDescr.model.data.push([]);
                addTypeView(currentComponent);
            }
        }
    }
}

function changeModelFieldT(el) {
    currentComponentDescr.model.fieldType = el.options[el.selectedIndex].value;
}

function formListVar(el) {
    let data = currentComponentDescr.model.data[0];
    let ik = data.length;
    if (ik > 0) {
        el.innerHTML = "";
        let opt = document.createElement ('option');
        opt.value = opt.text =  '';
        el.options.add (opt);
        let mSel = currentComponentDescr.model.fieldType;
        if (mSel == null) {
            mSel = "";
        }
        for (let i = 0; i < ik; i++) {
            opt = document.createElement ('option');
            let selN = data[i].name;
            opt.value = opt.text = selN;
            if (selN == mSel) {
                opt.selected = selN;
            }
            el.options.add (opt);
        }
    }
}

function delDataType(el) {
    let bl = el.parentElement.parentElement;
    let ch = bl.parentElement.children;
    let ik = ch.length;
    let num = -1;
    for (let i = 0; i < ik; i++) {
        if (ch[i] == bl) {
            num = i;
            break;
        }
    }
    if (num > -1) {
        num++;
        currentComponentDescr.model.data.splice(num, 1);
        let chP = currentComponent.children
        let selEl = null;
        if (num < chP.length) {
            selEl = chP[num];
            n_selectElement = selEl.viewElement;
            n_clDelete();
        }
        ik = chP.length;
        if (ik > 1) {
            for (let i = 1; i < ik; i++) {
                let item = chP[i];
                item.viewId = "__sw_" + i;
                if (i > 0) {
                    item.below = "__sw_" + (i - 1);
                }
            }
            showElemChilds(currentComponent.viewElement);
        }
    }
    bl.remove();
    let dataT = currentComponentView.getElementsByClassName("severalDataTypes")[0];
    if (dataT.children.length == 1) {
        dataT.style.display = "none";
    }
}

function addTypeView(p) {
    let el = p.viewElement;
    setActive(el);
    let ik = p.children.length;
    currentElement = createNewEl();
    if (currentComponent.type == "List") {
        currentElement.android = {type:"SwipeLayout",typeFull:{name:"SwipeLayout",typeBlock:2},viewId:"__sw_" + ik,below:"__sw_" + (ik - 1),typeUxUi: "ui",componParam:{type:13,nodel:true,noact:true,nomove:true,nodrop:true},gravLayout:{h:4,v:4},gravity:{h:4,v:4},width: -1,height:10,children:[]};
    } else {
        currentElement.android = {type:'RelativeLayout',typeUxUi:"ui",viewId:"T_" + ik,below:"T_" + (ik - 1),typeFull:{name: 'RelativeLayout', typeBlock: 2},gravLayout:{h:4,v:4},gravity:{h:4,v:4},width:-1,height:10,children:[]};
    }
    let listView = currentElement;
    listView.android.viewElement = listView;
/*
    let listView = createListView();
    let ik = p.children.length;
    listView.android.viewElement = listView;
    if (currentComponent.type == "List") {
        listView.android.viewId = "__sw_" + ik;
        listView.android.below = "__sw__" + (ik - 1);
    } else {
        listView.android.viewId = "T_" + ik;
        listView.android.below = "T_" + (ik - 1);
    }
*/
    addNewElement(ACTIVE, listView);
    addNavigatorEl(listView);
    ACTIVE.android.children.push(listView.android);
    listView.style.outline = "";
    if (currentComponent.type == "List") {
        setActive(listView);
        let newEl = createNewEl();
        newEl.android = {type:"RelativeLayout",typeFull:{name:"RelativeLayout",typeBlock:2},viewId:"T_0",typeUxUi: "ui",componParam:{nomove:true},gravLayout:{h:4,v:4},gravity:{h:4,v:4},width: -1,height:-1,children:[]};
        newEl.android.viewElement = newEl;
        addNewElement(ACTIVE, newEl);
        addNavigatorEl(newEl);
        ACTIVE.android.children.push(newEl.android);
        newEl.style.outline = "";
// swileL
        newEl = createNewEl();
        newEl.android = {type:"Swipe",typeFull:{name:"Swipe",typeBlock:2},viewId:"sw_l",typeUxUi: "ui",componParam:{type:13,nodel:true,nomove:true},gravLayout:{h:4,v:4},gravity:{h:4,v:4},width: 0,height:-1,children:[]};
        newEl.android.viewElement = newEl;
        addNewElement(ACTIVE, newEl);
        addNavigatorEl(newEl);
        ACTIVE.android.children.push(newEl.android);
        newEl.style.outline = "";
// swileR
        newEl = createNewEl();
        newEl.android = {type:"Swipe",typeFull:{name:"Swipe",typeBlock:2},viewId:"sw_r",typeUxUi: "ui",componParam:{type:13,nodel:true,nomove:true},gravLayout:{h:2,v:4},gravity:{h:4,v:4},width: 0,height:-1,children:[]};
        newEl.android.viewElement = newEl;
        addNewElement(ACTIVE, newEl);
        addNavigatorEl(newEl);
        ACTIVE.android.children.push(newEl.android);
        newEl.style.outline = "";
    }
    viewComponElem(listView);
}
