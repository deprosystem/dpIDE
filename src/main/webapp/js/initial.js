function initialView(AuthResult) {
    debagStatus = window.location.hostname.startsWith("deb-") || window.location.hostname.indexOf("localhost") != -1;
    eventFocusBlur();
    listTables = null;
    var ar = JSON.parse(AuthResult);
    AuthToken = ar.token;
    let prof = ar.profile;
    setCookie("auth_token", AuthToken);
    setCookie("user", prof.userName);
    setCookie("user_id", prof.userId);
    if (prof.userName != undefined && prof.userName.length > 0) {
        info_user.innerHTML = prof.userName.substring(0, 1).toUpperCase();
    }
    window.onbeforeunload = function(e) {
        if (isSystemChange || isLayoutChange) {
            e.returnValue = 'Do you really want to close?';
            return 'Do you really want to close?';
        } else {
            return null;
        }
    };
    loginPanel.style.display = "none";
    formMenuEl_UX();
    if (debagStatus) {
        statusDebagView.style.display = "block";
    }
    setLayoutDiv();
    let ins = new insertHtml();
    currentProject = ar.project;
    
    pushNotif = new PushNotifications();
    
    ins.get('m_bmPEbody', 'layout/layoutParam.html', m_bmStart); // запускает cbCreateProjectDop
    if (currentProject == null) {
        if (ar.listProject != null && ar.listProject.length > 0) {
            listMenu_UX[0].children[1].domElement.className = 'subMainMenu';
            setListProject(ar.listProject);
        } else {
            setBlanckToolBar();
        }
    }
    if (listImage == null && currentProject != null) {
        doServer("GET", 'images/list', cbGetImageList);
    }
}

function cbGetImageList(res) {
    if (res == "") {
        listImage = [];
    } else {
        listImage = JSON.parse(res);
    }
}

function setBlanckToolBar() {
    shutScreen.style.display = "block";
    shutScreen.innerHTML = '<div style="font-size:34px;margin-top:50px;margin-left:50px;">You have no projects</div>'
        +'<div onclick="createInitProject(this);" style="font-size:16px;margin-top:10px;margin-left:50px;cursor:pointer">Create a new project</div>'
//        +'<div style="font-size:16px;margin-top:10px;margin-left:50px;">To create a new project, select the projects item -> create from the menu</div>'
        +'<a style="font-size:16px;margin-top:10px;margin-left:50px;float:left;" href="https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ">Documentation</a>';
    project_name_bl.style.display = "none";
    corners.style.display = "none";
    plus_screen.style.display = "none";
    ux_ui_w.style.display = "none";
    show_data.style.display = "none";
    type_insert.style.display = "none";
    active.style.display = "none";
}

function createInitProject(el) {
    
    shutScreen.style.display = "none";
    createProject();
}
    
function eventFocusBlur() {
    localStorage.setItem('resultUI', "");
    window.onfocus = inFocus;
}

function inFocus() {
    let res = localStorage.getItem('resultUI');
    if (res != null && res != "") {
        var scr = JSON.parse(res);
        listScreen[positionScreen] = scr;
        currentScreen = scr;
        if (currentScreen != null) {
            currentChildren = currentScreen.layout.children;
            setScreenView();
        }
    }
}


function m_bmStart(el) {
    var chB=m_bmPEbody.children;
    var chH=m_bmPEhead.children;
    if (!el) el = chH[0];
    for(var i = 0; i < chH.length; i++) {
        if (el === chH[i]) {
            chH[i].style.background = '#c1e1fc';
            chB[i].style.display = 'block';
        } else {
            chH[i].style.background = '#eeeeee';
            chB[i].style.display = 'none';
        }
    }
    if (currentProject != null) {
        listMenu_UX[0].children[1].domElement.className = 'subMainMenu';
        cbCreateProjectDop();
    }
}