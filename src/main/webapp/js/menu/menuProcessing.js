var TYPE_String = 0, TYPE_StringAr = 1, TYPE_Image = 2, TYPE_Int = 3;
var validEmpty = 1, validNumber = 2, validName = 3; validNameEmpty = 4 // validName - a-z,_,0-9   перша - літера
var listEdit;
var listDimens;
var ListStyleSpec;
var activeStyleSpecPos = -1;
var ListStyleCheck;
var activeStyleCheckPos = -1;
var listSaveElements;
var currentProject;
var currentScreen;
var onkeyupJump;
var processingSelectedIMG;
var indListEdit;
var funcSendCreateData;

var isColorChange = false;
var isProjectChange = false;
var isSystemChange = false;
var isStringsChange = false;
var isStylesChange = false;
var isStylesSpecChange = false;
var isStylesCheckChange = false;
var isDrawableChange = false;
var isDimensChange = false;
var isPushChange = false;
var isUX = true;
var isScreenChange = false;
var isLayoutChange = false;
var listNameScreen = [];
var listAppParam, listValueAppParam;
var listProjectForOpen;
var deleteProjectIdVar;
var popupMenuParamProj;
var newProjectForCreate;
var createChangeProgectOper;
var pushNotif;
var multiLingualView;

function openProject() {
    doServer("POST", "project/list", cbListProject, null, null, document.body);
}

function saveProject() {
    offEmulator();
    let st = formJsonProject();
    doServer("POST", "project/save", cbSaveProject, st, null, document.body);
}

function formJsonProject() {
    var par = {};
    par.projectId = currentProject.projectId;
    if (isColorChange) {
        par.colors = JSON.stringify(listColor);
    }
    if (isStylesChange) {
        par.style = JSON.stringify(listStyle);
    }
    if (isStylesSpecChange) {
        par.style_spec = JSON.stringify(ListStyleSpec);
    }
    if (isStylesCheckChange) {
        par.style_check = JSON.stringify(ListStyleCheck);
    }
    if (isDrawableChange) {
        par.drawable = JSON.stringify(listDrawable);
    }
    if (listAppParam != null) {
        par.appParam = JSON.stringify(formAppParam());
    };
    par.push = pushNotif.getJson();
    if (multiLingualView != null) {
        par.languages = JSON.stringify(multiLingualView.Languages);
    }
    par.screens = JSON.stringify(listScreen, function(key, value) {
            if (key == "viewElement") {
                return undefined;
            }
            if (key == "parent") {
                return undefined;
            }
            return value;
        });
    return JSON.stringify(par);
}

function formAppParam() {
    let ik = listAppParam.length;
    let res = [];
    for (i = 0; i < ik; i++) {
        let item = listAppParam[i];
        if (item.value != "" && item.value != item.value_def) {
            res.push({id:item.id,name:item.name,value:item.value,type:item.type});
        }
    }
    return res;
}

function pushProject() {
    pushNotif.edit();
}
/*
function pushServerParam() {
    new PushServer();
}
*/
function multilingualV() {
    if (multiLingualView == null) {
        multiLingualView = new MultiLingual();
    } else {
        multiLingualView.viewLang();
    }
}

function createProject() {
    formCreateProject(1);
}

function changeProject() {
    formCreateProject(0);
}

function formCreateProject(oper) {      //  oper = 1 - create, 0 - chang
    let h;
    let titl;
    let create = [
        {name: "nameProject", title:"* Project name",len:-1,type:"Text",valid:"latin"},
        {name: "namePackage", title:"* Package name",len:-1,type:"Text",valid:"name_var",br:true},
        {name: "comment", title:"Description",type:"Textarea",rows:3,br:true}
    ]
    if (oper == 0) {
        h = 450;
        titl = "Change Project";
        create.push({name: "logo", title:"Logo",type:"Img",br:true});
        newProjectForCreate = {nameProject:currentProject.nameProject,comment:currentProject.comment,logo:currentProject.logo,
            namePackage:currentProject.namePackage};
    } else {
        h = 400;
        titl = "New project";
        newProjectForCreate = {namePackage:"ide.depro"};
    }
    createChangeProgectOper = oper;
    let wind = formWind(300, h, 40, 200, titl, null, null, "Send", sendServCreate, "");
    let windDat = newDOMelement('<div style="position:absolute;left:16px;right:16px"></div>');
    wind.append(windDat);
    wind.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        sendServCreate();
        closeDataWindow(wind);
      }
    });
    new EditForm(create, newProjectForCreate, windDat, null, null, true, 20);
}

function sendServCreate() {
    if (newProjectForCreate.nameProject == null || newProjectForCreate.nameProject.length == 0
    || newProjectForCreate.namePackage == null || newProjectForCreate.namePackage.length == 0) {
        myAlert("You need to fill in the fields with *");
        return true;
    } else {
        sendCreateProject(JSON.stringify(newProjectForCreate), createChangeProgectOper);
    }
}

function sendCreateProject(data, oper) {
    let url;
    if (oper == 0) {
        url = "project/change";
    } else {
        url = "project/create";
    }
    doServer("POST", url, cbCreateProject, data, oper, document.body);
}

function cbCreateProject(res, oper) {
    if (oper != 0) {
        listImage = null;
    }
    currentProject = JSON.parse(res);
    cbCreateProjectDop();
    shutScreen.style.display = "none";
}
function cbCreateProjectDop() {
    dataDescript.innerHTML="";      //    Очистка для работы с данными

    ux_ui_w.style.display = "block";
    plus_screen.style.display = "block";
    corners.style.display = "block";

    listTablesView.innerHTML = "";
    listTables = null;
    showModeUX();
    openMenu();
    project_name_bl.style.display = "block";
    show_data.style.display = "block";
    project_name.innerHTML = currentProject.nameProject;
    listScreen = JSON.parse(currentProject.screens);
    listColor = JSON.parse(currentProject.colors);
    listDimens = JSON.parse(currentProject.dimens);
    if (currentProject.style_spec != null) {
        ListStyleSpec = JSON.parse(currentProject.style_spec);
    } else {
        ListStyleSpec = [{id:0,type:"switch",param:{color_1:12,color_2:3,color_3:0,color_4:6,color_5:0,color_6:3,color_7:7,
                    int_1:0,int_2:0,int_3:14,int_4:30,int_5:24,st_1:"",st_2:"top",st_3:"Off"}}];
        isStylesSpecChange = true;
    }
    activeStyleSpecPos = ListStyleSpec.length - 1;
    if (currentProject.style_check != null) {
        ListStyleCheck = JSON.parse(currentProject.style_check);
    } else {
        ListStyleCheck = [{id:0,type:"check",param:{color_1:12,color_2:12,color_3:1,int_1:0,int_2:0,int_3:14,st_2:"top"}}];
        isStylesCheckChange = true;
    }
    activeStyleCheckPos = ListStyleCheck.length - 1;
    listValueAppParam = JSON.parse(currentProject.appParam);
    if (currentProject.style != null) {
        listStyle = JSON.parse(currentProject.style);
    }
    setListColor();
    listDrawable = JSON.parse(currentProject.drawable);
    setMaxIndexDrawable();
    setLayout();
    list_screens.innerHTML = "";

    if (listScreen.length == 0) {
        let scrParam = {scrN: "Main", scrNum: 0, scrTit:"", scrT:0};
        let crScreen = crScreenForList(scrParam);
        listScreen.push(crScreen);
    }
    setListScreen();
}

function showModeUX() {
    if (show_data_inf.innerHTML != "Data") {
        viewData();         // hide Data panel
    }
    if (ux_ui.innerHTML != "U I") {
        editUX_UI();
    }
    
}

function clearRoot() {
    let cont_1 = createContour();
    root.innerHTML = "";
    forScroll.innerHTML = "";
    root.android = currentScreen.layout;
    root.appendChild(cont_1);
}

function setScreenLayout() {
    var rr = document.getElementById('root');
    var itemNav = rr.android.itemNav;
    rr.android = listSaveElements;
    rr.android.itemNav = itemNav;
    rr.android.parent = document.getElementById('root_g');
    setRoot();
    ACTIVE = null;
    setActive(root);
    setNavigatorRoot();
    setScreenElements(rr, listSaveElements.children);
    layoutParam.style.display = "none";
    if (selectViewElement != null) {
        selectViewElement.style.backgroundColor = '#fff';
    }
}

function modelClick(el) {
    selectNavigatorEl(el);
    el.style.outline = "";
}

function setScreenElements(el, children, tab) {
    if (children == null) return;
    let ik = children.length;
    let myCompon;
    for (let i = 0; i < ik; i++) {
        let newNode = children[i];
        let newEl = createNewEl();
//        let typeEl;
        newEl.android = newNode;
        newNode.viewElement = newEl;
        addNewElement(el, newEl);
        let p = newEl.android;
        try {
            uiFunction = eval("new ui" + p.type + "()");
            uiFunction.setElementUI(p, newEl, el);
        } catch(e) { 
//console.log("setScreenElements catch="+e+"<<");
        }
        viewComponElem(newEl);
        addNavigatorEl(newEl);
        
        navigator_scr.scroll_y.resize(navigator_scr);
        
        if (p.typeUxUi == "ux") {
            
        }
        modelClick(newEl);
        setScreenElements(newEl, newNode.children);
    }
    if (el.android != null && el.android.height == WRAP) {
        el.style.height = maxChildHeight(el) + px;
    }
}

function formAbove(pp, el, st) { // Пошук в el елементів тип яких вказано в st через кому. Результат тип самого високого (по top) елемента
    let child = el.children;
    let ik = child.length;
    let minValue = 5000;
    let minViewId = null;
    for (let i = 0; i < ik; i++) {
        let elC = child[i];
        let p = elC.android;
        if (p != null) {
            if (st.indexOf(p.type) > -1) {
                let rect = elC.getBoundingClientRect();
                if (rect.top < minValue) {
                    minValue = rect.top;
                    minViewId = p.viewId;
                }
            }
        }
    }
    if (minViewId != null) {
        pp.above = minViewId;
    }
}

function formBelow(pp, el, st) { // Пошук в el елементів тип яких вказано в st через кому. Результат тип самого низького (по bottom) елемента
    let child = el.children;
    let ik = child.length;
    let maxValue = 0;
    let maxViewId = null;
    for (let i = 0; i < ik; i++) {
        let elC = child[i];
        let p = elC.android;
        if (p != null) {
            if (st.indexOf(p.type) > -1) {
                let rect = elC.getBoundingClientRect();
                if (rect.bottom > maxValue) {
                    maxValue = rect.bottom;
                    maxViewId = p.viewId;
                }
            }
        }
    }
    if (maxViewId != null) {
        pp.below = maxViewId;
    }
}

function getComponent(id) {
    let ik = currentScreen.components.length;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            let it = currentScreen.components[i];
            if (it.view.viewId == id) {
                return it;
            }
        }
        return null;
    } else {
        return null;
    }
}

function openMenu() {
//    listMenu_UX[0].children[2].domElement.className = 'subMainMenu';
    listMenu_UX[0].children[3].domElement.className = 'subMainMenu';
    listMenu_UX[0].children[4].domElement.className = 'subMainMenu';
    listMenu_UX[0].children[5].domElement.className = 'subMainMenu';
    listMenu_UX[1].children[0].domElement.className = 'subMainMenu';
    listMenu_UX[1].children[1].domElement.className = 'subMainMenu';
//    listMenu_UX[1].children[2].domElement.className = 'subMainMenu';
    listMenu_UX[2].children[0].domElement.className = 'subMainMenu';
    listMenu_UX[2].children[1].domElement.className = 'subMainMenu';
    listMenu_UX[3].children[0].domElement.className = 'subMainMenu';
    listMenu_UX[3].children[1].domElement.className = 'subMainMenu';
    if (listMenu_UX[3].children[2] != null) {
        listMenu_UX[3].children[2].domElement.className = 'subMainMenu';
    }
    if (listMenu_UX[3].children[3] != null) {
        listMenu_UX[3].children[3].domElement.className = 'subMainMenu';
    }
}

function cbSaveProject(res) {
    isColorChange = false;
    isStringsChange = false;
    isDrawableChange = false;
    isDimensChange = false;
//    alert("Project changes saved");
}

function cbListProject(res) {
//console.log("RES="+res);
    setListProject(JSON.parse(res));
}

function setListProject(list) {
    popupMenuParamProj = null;
    listProjectForOpen = list;
    let ik = list.length;
    let strList = "";
    listProjects.style.display = "block";
    listProjectsScr.innerHTML = "";
    let content = document.createElement('div');
    content.className = "content";
    listProjectsScr.appendChild(content);
    for (let i = 0; i < ik; i++) {
        content.appendChild(oneProject(list[i], i));
    }
    let scrollVert = new scrollX(listProjectsScr, "scroll");
    scrollVert.init();
}

function oneProject(p, i) {
    let container = document.createElement('div')
    let ds = "";
    if (p.dateCreate !=0) {
        let dd = new Date(p.dateCreate);
        ds = ("0" + dd.getDate()).slice(-2) + "." + ("0" + (dd.getMonth() + 1)).slice(-2) + "." + dd.getFullYear();
    }
    let stUsers = "";
    if (p.listUsers != null && p.listUsers.length > 0) {
        let jsonUsers = JSON.parse(p.listUsers);
        let ik = jsonUsers.length;
        if (ik > 0) {
            stUsers = '<div style="position:absolute;right:0px;bottom:42px;">';
            for (let i = 0; i < ik; i++) {
                let us = jsonUsers[i];
                stUsers += '<div style="float:right;background-color:' + us.color + ';width: 22px;height: 22px;border-radius: 11px;margin-right:16px;">'
                    +'<div style="margin-top:5px;text-align:center;color:black;font-size:12px;font-weight:bold;">' + us.litera + '</div>'
                +'</div>';
            }
            stUsers += '</div>';
        }
    }
    let urlImgProject = 'visibility:hidden"';
    if (p.image != null && p.image.length > 0 && p.image != 'null') {
        urlImgProject = '" src="' + p.image + '"';
    }

    let imgProject = '<img class="imgProject" width=360 height=160 style="position:absolute;left:0px;top:0px;object-fit:cover;border-radius:4px 4px 0px 0px;' + urlImgProject + '>';
    let st = '<div class="projectView" style="cursor:pointer;" onclick="selectProject(' + p.projectId + ')">'
            +imgProject
            +'<img onclick="projectMenu(event,' + p.projectId + ','+ i + ')" width="20" height="30" style="position:absolute;right:14px;top:14px;cursor:pointer" src="img/more-vertical.png">'
            +'<div style="position:absolute;width:100%;height:78px;bottom:0px;border-radius:0px 0px 4px 4px;border-top:1px solid #1dace9"></div>'
            +'<div class="projectName">' + p.nameProject + '</div>'
            +'<div class="projectDate">' + ds + '</div>'
            + stUsers
        +'</div>'
    container.innerHTML = st;
    return container.firstChild
}

function sendImageProject(id, nameFile, el, title, accept) {
    let windMenu = formWind(350, 300, 40, 250, title);
    windMenu.closest(".dataWindow").style.zIndex = "101";
    if (accept == null) {
        accept = "image/*";
    }
    let inputFile = newElementFromString('<input type="file" accept="' + accept + '" name="imgFile" multiple style="display: none"/>');
    windMenu.appendChild(inputFile);
    let contInp = newElementFromString('<div style="margin-top:20px;margin-left:16px;"></div');
    windMenu.appendChild(contInp);
    let inputFileView = newElementFromString('<input class="input_style" type="text" readonly style="width: 200px;float:left;height:28px"/>');
    contInp.appendChild(inputFileView);
    let buttonFileView = newElementFromString('<div class="button_blue">'
                +'<div style="text-align:center;margin-top:7px;color:#fff">Choose file</div>'+'</div>');
    contInp.appendChild(buttonFileView);
    buttonFileView.addEventListener("click", function(){inputFile.click();}, true);
    inputFile.addEventListener("change", function(){inputFileView.value = inputFile.files[0].name;}, true);
    let footer = createFooter(56);
    windMenu.appendChild(footer);
    let buttonSend = createButtonBlue('Send', 70);
    footer.appendChild(buttonSend);
    let buttonCancel = createButtonWeite('Cancel', 70);
    footer.appendChild(buttonCancel);
    let paramForCB = {wind:windMenu, elImg:el};
    buttonSend.addEventListener("click", function(){
        let formData = new FormData ();
        formData.append ("projectId", id);
        formData.append ("nameFile", nameFile);
        formData.append ("imgFile", inputFile.files [0]);
        doServer("POST", "upload/image", cbImageProject, formData, paramForCB, windMenu);
    }, true);
    buttonCancel.addEventListener("click", function(){closeWindow(buttonCancel);}, true);
}

function cbImageProject(res, par) {
    closeWindow(par.wind);
    doServer("GET", 'images/list', cbGetListImg);
}

function projectMenu(e, id, i) {
    let el = e.target;
    if (el.popup == null) {
        let paramForClick = {elem:el,idProj:id,position:i};
        if (popupMenuParamProj != null) {
            document.body.removeChild(popupMenuParamProj);
        }
        popupMenuParamProj = popupMenu(el, 80, "Edit,Image,Delete", clickMenu, paramForClick);
        el.popup = popupMenuParamProj;
    } else {
        document.body.removeChild(el.popup);
        el.popup = null;
        popupMenuParamProj = null;
    }
    e.stopPropagation();
}

function clickMenu(i, param) {
    popupMenuParamProj = null;
    switch (i) {
        case 0:
            
            break;
        case 1:
            sendImageProject(param.idProj, 'imageProject', param.elem, "Project image");
            break;
        case 2:
            let proj = listProjectForOpen[param.position];
            deleteProjectId(proj);
            break;
    }
}

function deleteProjectId(project) {
    deleteProjectIdVar = project.projectId;
    let dat = {whereServer:project.host,schema:project.resurseInd,projectId:project.projectId,nameProject:project.nameProject};
    if (project.where_server == "Third party API") {
        
    } else {
        let param = JSON.stringify(dat);
        if (project.host == null) {
            doServer("POST", "project/del_only", cbDelProj, param, null, document.body);
        } else {
            doServerAlien("POST", project.host + "db/del_schema", cbDelSchema, param, dat, document.body);
        }
    }
}

function cbDelSchema(res, param) {
    doServer("POST", "project/delete", cbDelProj, JSON.stringify(param));
}

function cbDelProj(res) {
    if (currentProject != null && deleteProjectIdVar == currentProject.projectId) {
        currentProject = null;
    }
    openProject();
}

function selectProject(id) {
    listProjectsScr.innerHTML = "";
    listProjects.style.display = "none";
    doServer("get", "project/getproject?id=" + id, cbGetProject, null, null, document.body);
}

function cbGetProject(res) {
    listTables = null;
    listQuerys = null;
    cbCreateProject(res, 2);
    show_data.style.display = "block";
    shutScreen.style.display = "none";
}

function cbGetTablesNoActiv(res) {
    
}

function setSignChanges() {
    isProjectChange = true;
    listMenu_UX[0].children[3].domElement.className = 'subMainMenu';
}

function setSignChangesNo() {
    isProjectChange = false;
    listMenu_UX[0].children[3].domElement.className = 'subMainMenuNo';
}

function closeProject() {
    
}

function deleteProject() {
    deleteProjectId(currentProject);
}

function uploadImage() {
    sendImageProject(currentProject.projectId, "", null, "Set of icons for the project", "application/zip")
}

function keyupHand(e) {
    if (e.which == 13) {
        onkeyupJump();
    }
}

function closeWindEditForm() {
    windEditForm.style.display = 'none';
}
/*
function sendChange() {
    windEditForm.style.display = "none";
    extraOptions = [];
    extraOptions[0] = {name: "projectId", value: currentProject.projectId, type: TYPE_Int};
    doServer("POST", "project/change", cbChangeProject, dataFromForm());
}
*/
function cbChangeProject(res) {
    
}

function setLayoutChange() {
    isScreenChange = true;
    isLayoutChange = true;
}

function cancelUploadImg() {
    uploadPanel.style.display = "none";
    alert("Files successfully transferred to server");
}

function generateAPK() {
    if (listImage == null) {
        doServer("GET", 'images/list', cbGenerAPK);
    } else {
        generateProjectF(true);
    }
}

function cbGenerAPK(res) {
    if (res == "") {
        listImage = [];
    } else {
        listImage = JSON.parse(res);
    }
    generateProjectF(true);
}

function generateProject() {
    if (listImage == null) {
        doServer("GET", 'images/list', cbGenerProj);
    } else {
        generateProjectF(false);
    }
}

function cbGenerProj(res) {
    if (res == "") {
        listImage = [];
    } else {
        listImage = JSON.parse(res);
    }
    generateProjectF();
}

function generateProjectF(apk) {
    let title;
    let url;
    let mes, attent;
    if (apk != null && apk) {
        title = "Create APK";
        url = "export/apk";
        mes = "APK file generated";
        attent = "APK creation takes 1 - 2 minutes";
    } else {
        title = "Create project";
        url = "export/android";
        mes = "Project generated";
        attent = "";
    }
    let windMenu = formWind(250, 300, 40, 250, title, null, null, null, null, "");
    let infBuild = newDOMelement('<div style="text-align:center; margin-top:20px;">Design check</div>');
    windMenu.append(infBuild);

    if (validDeclare()) {
        windMenu.innerHTML = "";
        let fileCreate = document.createElement("div");
        fileCreate.style.cssText = "text-align:center; margin-top:20px;";
        fileCreate.innerHTML = mes;
        windMenu.appendChild(fileCreate);
        let buttSave = createButtonBlue("Save", 80);
        buttSave.style.position = "relative";
        buttSave.style.marginTop = "25px";
        buttSave.className = "save-apk";
        windMenu.appendChild(buttSave);
        let wind = windMenu.closest(".dataWindow");
        doServer("GET", url + "?projectId=" + currentProject.projectId, cbGenerateProject, null, windMenu, wind, errorAPK, attent);
//        doServer("GET", url + "?projectId=" + currentProject.projectId, cbGenerateProject, null, windMenu, windMenu, errorAPK, attent);
    } else {
        closeDataWindow(windMenu);
//        closeWindow(windMenu);
    }
}

function errorAPK(mes, par) {
    if (par != null) {
        closeDataWindow(par);
    }
}

function validDeclare() {
    let strError = "";
    let ik = listScreen.length;
    let newLevelErrors = 0;
    if (ik == 0) {
        strError += "Нет описаных экранов<br>";
    } else {
        for (let i = 0; i < ik; i++) {
            let ls = listScreen[i];
            oneScreenValid(ls, list_screens.children[i], true);
            if (ls.levelErrors > 0) {
                if (ls.textErrors != "") {
                    strError += "Screen " + ls.screenName + "<br>";
                }
                strError += ls.textErrors;
                if (newLevelErrors < ls.levelErrors) {
                    newLevelErrors = ls.levelErrors;
                }
            }
        }
    }
    ik = listValueAppParam.length;
    if (ik == 0) {
        if (isMap()) {
            strError += "not filled geoApiKey for maps<br>";
            newLevelErrors = 2;
        }
    } else {
        let noKey = true;
        let noStartScr = true;
        let isParameterStartScr = false;
        for (let i = 0; i < ik; i++) {
            let item = listValueAppParam[i];
            let vv = item.value;
            switch (item.name) {
                case "ScreenStart":
                    isParameterStartScr = true;
                    let sk = listScreen.length;
                    let vvUP = vv.toUpperCase();
                    for (let s = 0; s < sk; s++) {
                        if (vvUP == listScreen[s].screenName.toUpperCase()) {
                            noStartScr = false;
                            break;
                        }
                    }
                    break;
                case "geoApiKey":
                    noKey = false;
                    if (vv == null || vv == "") {
                        if (isMap()) {
                            strError += "not filled geoApiKeu for maps";
                        }
                    }
                    break;
            }
        }
        if (noKey) {
            if (isMap()) {
                strError += "not filled geoApiKey for maps<br>";
                newLevelErrors = 2;
            }
        }
        if (noStartScr) {
            if (isParameterStartScr) {
                strError += "No start screen description<br>";
                newLevelErrors = 2;
            } else {
                let sk = listScreen.length;
                let vvUP = "MAIN";
                for (let s = 0; s < sk; s++) {
                    if (vvUP == listScreen[s].screenName.toUpperCase()) {
                        noStartScr = false;
                        break;
                    }
                }
                if (noStartScr) {
                    strError += "No start screen description<br>";
                    newLevelErrors = 2;
                }
            }
        }
    }
    if (strError != "") {
console.log("strError strError");
        var wind = formWind(500, 400, 35, 270, "Error in project");
        wind.style.paddingLeft = "4px";
        wind.innerHTML = strError;
        return false;
    } else {
        return true;
    }
}

function isMap() {
    let isM = false;
    let jk = listScreen.length;
    for (j = 0; j < jk; j++) {
        let components = listScreen[j].components;
        let zk = components.length;
        for (let z = 0; z < zk; z++) {
            if (components[z].type == "Map") {
                isM = true;
                break;
            }
        }
        if (isM) {
            break;
        }
    }
    return isM;
}

function isScreenDeclare(name) {
    let ik = listScreen.length;
    for (let i = 0; i < ik; i++) {
        if (name == listScreen[i].screenName.toUpperCase()) {
            return i;
        }
    }
    return -1;
}

function cbGenerateProject(res, wind) {
    let save = wind.getElementsByClassName("save-apk")[0];
    if (save != null) {
        save.appendChild(newDOMelement('<a href="' + res + 
                '" download="' + currentProject.nameProject + '_debug.apk" style="text-decoration: none;color:#fff0;display:inline-block;width:100%;height:100%;position:absolute;top:0;left:0"> </a>'));
    }
    save.addEventListener("click", function(){closeDataWindow(save);}, true);
}

function setAppParameters() {
    if (listAppParam == null) {
        doServer("GET", "project/getparam", cbAppParameters);
    } else {
        windAppParameters();
    }
}

function cbAppParameters(res) {
    listAppParam = JSON.parse(res);
    let ik = listValueAppParam.length;
    let jk = listAppParam.length;
    let j = 0;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            let itemV = listValueAppParam[i];
            for (; j < jk; j++) {
                let itemB = listAppParam[j];
                if (itemV.id > itemB.id) {
                    continue;
                } else {
                    if (itemV.id == itemB.id) {
                        itemB.value = itemV.value;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
    }
    windAppParameters();
}

function windAppParameters() {
    let wind = formWind(610, 550, 40, 270, "Set application parameters", true);
    let footer = createFooter(50);
    addFooter(wind, footer);
    let tit = '<div style="float:left;clear: both;margin-left:5px;border-bottom:1px solid #1dace9;height:18px;margin-top:3px">'
        +'<div style="float:left;width:220px;">Parameter name</div>'
        +'<div style="float:left;width:170px;margin-left:5px;"">Default value</div>'
        +'<div style="float:left;width:190px;margin-left:5px;"">Value</div>'
        +'</div>';
    wind.innerHTML = tit;
    let ik = listAppParam.length;
    for (i = 0; i < ik; i++) {
        let item = listAppParam[i];
        wind.append(newAppParam(item, i));
    }
    wind.append(endItemAppList());
    let viewP = wind.parentElement;
    viewP.scroll_y.resize(viewP)
    let buttonSend = createButtonBlue('Save', 70);
    buttonSend.addEventListener("click", function(){saveAppParameters();closeWindow(wind);}, true);
    footer.appendChild(buttonSend);
    let buttonCancel = createButtonWeite('Cancel', 70);
    buttonCancel.addEventListener("click", function(event){closeWindow(wind);}, true);
    footer.appendChild(buttonCancel);
}

function endItemAppList() {
    let res = document.createElement('div');
    res.style.cssText = "float:left;clear: both;width:100%;height:14px";
    return res;
}

function saveAppParameters() {
    listValueAppParam = formAppParam();
}

function newAppParam(item, i) {
    var container = document.createElement('div')
    let def = '&nbsp;';
    if (item.value_def.length > 0) {
        def = item.value_def;
    }
    let str = '<div class="app_param_item">'
            +'<div style="float:left;width:220px;margin-top:7px;">' + item.name + '</div>' 
            +'<div style="float:left;width:160px;margin-left:7px;margin-top:5px;">' + def + '</div>'
            +'<input class="input_style" style="float:left;width:190px;margin-left:5px;" type="text" onkeyup="return changeValueParam(event,' + i + ')" onkeyup="return clickUpValueParam(event,' + i + ')" size="20" value=' + item.value + '>'
            +'</div>';
    container.innerHTML = str;
    return container.firstChild;
}

function clickUpValueParam(e, i) {
    let a = e.currentTarget;
    listAppParam[i].value = a.value;
}

function changeValueParam(e, i) {
    let a = e.currentTarget;
    listAppParam[i].value = a.value;
}

function editUI() {
    var st = formJsonProject();
    doServer("POST", "project/save", cbSaveAndEditUI, st);
}

function cbSaveAndEditUI(res) {
    isColorChange = false;
    isStringsChange = false;
    isDrawableChange = false;
    isDimensChange = false;
    localStorage.setItem('resultUI', "");
    window.open("editorUI.html?projectId=" + currentProject.projectId + "&screenId=" + currentScreen.screenId);
}

function saveAll() {
    var par = {};
    par.projectId = currentProject.projectId;
    if (isColorChange) {
        par.colors = JSON.stringify(listColor);
    }
    if (isDrawableChange) {
        par.drawable = JSON.stringify(listDrawable);
    }
    par.screen = JSON.stringify(currentScreen, function(key, value) {
            if (key == "viewElement") {
                return undefined;
            }
            return value;
        });
    localStorage.setItem('resultUI', JSON.stringify(par));
}

function closeListProj() {
    listProjectsScr.innerHTML = "";
    listProjects.style.display = "none";
    if (popupMenuParamProj != null) {
        document.body.removeChild(popupMenuParamProj);
    }
    if(currentProject == null) {
        showModeUX();
        setBlanckToolBar()
    } else {
        shutScreen.style.display = "none";
    }
}

function changeUser() {
    loginPanel.style.display = "flex";
    loginFrame.src="login.html";
}

function closeIDE() {
    window.close();
}

function infUser() {
    consolLogElem(root, "");
}

function consolLogElem(el, tab) {
    let ch = el.children;
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        el1 = ch[i];
        let pp = "";
        let p = el1.android;
        if (p != null) {
            pp = "type="+p.type+"<< viewId="+p.viewId+"<< p.itemNav="+p.itemNav.getElementsByClassName('item-name')[0].innerHTML+"<<";
        }
        let ch1 = el1.children;
        if (ch1 != null && ch1.length > 0) {
            consolLogElem(el1, tab + "   ");
        }
    }
}

function logP() {
    logAndr(currentChildren, "");
}

function logAndr(ch, tab) {
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let chI = ch[i];
        let cch = chI.children;
        if (cch != null && cch.length > 0) {
            logAndr(cch, tab + "   ");
        }
    }
}