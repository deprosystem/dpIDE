var listMenu_UX = [];
var stringExportRes;

listMenu_UX[0] = {nameM : 'Projects', dependProject : true};
listMenu_UX[0].children = new Array(
        {nameI : 'Create', func : createProject}, 
        {nameI : 'Open project', func : openProject},
        {nameI : 'Take from templates', func : fromTemplates},
        {nameI : 'Edit project', func : changeProject, dependProject : true},
        {nameI : 'Save project', func : saveProject, dependProject : true},
        {nameI : 'Place in templates', func : inTemplates, dependProject : true},
        {nameI : 'Close project', func : closeProject, dependProject : true},
        {nameI : 'Delete project', func : deleteProject, dependProject : true});
listMenu_UX[1] = {nameM : 'Properties ', children : [
        {nameI : 'Push notifications', func : pushProject, dependProject : true},
//        {nameI : 'Push notifications on the server', func : pushServerParam, dependProject : true},
        {nameI : 'Multi-language support', func : multilingualV, dependProject : true}
    ]};
listMenu_UX[2] = {nameM : 'Screens '};
listMenu_UX[2].children = new Array(
        {nameI : 'Clone', func : screenClone, dependProject : true},
        {nameI : 'Delete', func : screenDelete, dependProject : true});
listMenu_UX[3] = {nameM : 'Android'};
listMenu_UX[3].children = new Array(
        {nameI : 'Set application parameters', func : setAppParameters, dependProject : true},
//        {nameI : 'Upload image', func : uploadImage, dependProject : true},
        {nameI : 'Generate APK file', func : generateAPK, dependProject : true},
//        {nameI : 'Generate android project', func : generateProject, dependProject : true}
                );
listMenu_UX[4] = {nameM : 'Edit'};
listMenu_UX[4].children = new Array(
        {nameI : 'Copy', func : all, dependProject : true, dependScreen : true},
        {nameI : 'Undo', func : all, dependProject : true, dependScreen : true});
listMenu_UX[5] = {nameM : 'Tutorial'};
listMenu_UX[5].children = new Array(
        {nameI : 'All', func : helpAll},
        {nameI : 'UX', func : helpUX},
        {nameI : 'UI', func : helpUI});
listMenu_UX[6] = {nameM : 'Exit'};
listMenu_UX[6].children = new Array(
        {nameI : 'Change user', func : changeUser},
        {nameI : 'Close', func : closeIDE});
        
function formMenuEl_UX() {
    if (debagStatus) {
        listMenu_UX[3].children.push({nameI : 'Generate android project', func : generateProject, dependProject : true});
    }
    var ik = listMenu_UX.length;
    var menuUL = newUl();
    menuMain.innerHTML = "";
    menuMain.appendChild(menuUL);
    for (var i = 0; i < ik; i++) {
        var menuI = listMenu_UX[i];
        var menuLi = newLi();
        menuUL.appendChild(menuLi);
        var elM = newElM(menuI.nameM);
        menuI.domElement = elM;
        menuLi.appendChild(elM);
        var menuUlSub = newUl();
        menuLi.appendChild(menuUlSub);
        var jk = listMenu_UX[i].children.length;
        for (var j = 0; j < jk; j++) {
            var menuIJ = menuI.children[j];
            var menuSubPunkt;
            if (menuIJ.dependProject && projectId == 0 || menuIJ.dependScreen && screenId == 0 || menuIJ.dependDebag) {
                menuSubPunkt = newSub(menuIJ.nameI, "subMainMenuNo");
            } else {
                menuSubPunkt = newSub(menuIJ.nameI, "subMainMenu");
            }
            menuIJ.domElement = menuSubPunkt.firstChild;
            menuUlSub.appendChild(menuSubPunkt);
        }
    }

//    listMenu_UX[0].children[2].domElement.className = 'subMainMenuNo';
//    listMenu_UX[0].children[5].domElement.className = 'subMainMenuNo';
}

function newElM(name) {
    var container = document.createElement('div')
    container.innerHTML = '<div class="mainMenu">' + name + '</div>'
    return container.firstChild
}

function newSub(name, classPunkt) {
    var container = document.createElement('div')
    container.innerHTML = '<li><div class="' + classPunkt + '" onclick="punct(this)">' + name + '</div></li>';
    return container.firstChild
}

function newUl() {
    var container = document.createElement('div')
    container.innerHTML = '<ul></ul>';
    return container.firstChild
}

function newLi() {
    var container = document.createElement('div')
    container.innerHTML = '<li></li>';
    return container.firstChild
}

function hintShow() {
    if (menuMain.style.display == 'none') {
        hintMenuMain.style.display = 'block';
    }
}

function hintHide() {
    hintMenuMain.style.display = 'none';
}

function punct(el) {
    mainMenuShow();
    var txt = el.innerHTML;
    var ik = listMenu_UX.length;
    var func = null;
    for (var i = 0; i < ik; i++) {
        var jk = listMenu_UX[i].children.length;
        if (jk > 0) {
            for (var j = 0; j < jk; j++) {
                if (txt == listMenu_UX[i].children[j].nameI && listMenu_UX[i].children[j].domElement.className == 'subMainMenu') {
                    func = listMenu_UX[i].children[j].func;
                    break;
                }
            }
        }
        if (func != null) break;
    }
    if (func != null) {
        func();
    }
}

function all() {
    alert('ALL');
}

function changeDevice(v) {
    var i = parseInt(v);
    screenW = sizeDeviceArray[i][0];
    screenH = sizeDeviceArray[i][1];
    setRoot();
}

function scaleMinus() {
    if (currentScale > 50) {
        currentScale -= 10;
        scaleValue.innerHTML = currentScale + '%';
        SCALE = currentScale / 100;
        MEASURE = DENSITY * SCALE;
        setDp();
        setScreenView();
//        setRoot();
//        changeRoot()
        content_src.scroll_y.resize(content_src);
    }
}

function scalePlus() {
    if (currentScale < 200) {
        currentScale += 10;
        scaleValue.innerHTML = currentScale + '%';
        SCALE = currentScale / 100;
        MEASURE = DENSITY * SCALE;
        setDp();
        setScreenView();
//        setRoot();
//        changeRoot()
        content_src.scroll_y.resize(content_src);
    }
}

function menuhide(el) {
    var currentmenu = el.getElementsByClassName("navbody")[0];
    currentmenu.style.visibility = 'hidden';
}

function menushow(el) {
    var currentmenu = el.getElementsByClassName("navbody")[0];
    currentmenu.style.visibility = 'visible';
}

function mainMenuShow() {
    if (hamburger1.className == "hamburger1") {
        hamburger1.className = 'hamburger1_open';
        hamburger2.style.display = 'none';
        hamburger3.className = 'hamburger3_open';
        menuMain.style.display = "block";
        if (listProjects.style.display != "none") {
            listProjects.style.display = "none";
        }
    } else {
        hamburger1.className = 'hamburger1';
        hamburger2.style.display = 'inline-block';
        hamburger3.className = 'hamburger3';
        menuMain.style.display = "none";
    }
}