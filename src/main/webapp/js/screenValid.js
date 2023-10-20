var colorsEroor = ["#0000","#ffc700","#f00"];
var heightScreen = 70;
/*
function screenValid() {
    
}
*/
function oneScreenValid(scrD, scrV, generalCheck) {
    let newErrors = "";
    let newLevelErrors = 0;
    if (scrD.screenName == "") { 
        newErrors += txtError(2, "", "Screen number has no title");
        newLevelErrors = 2;
    }
    let arrComp = scrD.components;
    let ik = arrComp.length;
    for (let i = 0; i < ik; i++) {
        let compD = arrComp[i];
        try {
            uxFunction = eval("new ux" + compD.type + "();");
            let errComp = uxFunction.isValid(compD, scrD, generalCheck);
            if (errComp.text != "") {
                newErrors += errComp.text;
                if (newLevelErrors < errComp.error) {
                    newLevelErrors = errComp.error;
                }
            }
        } catch(e) { }
    }
    
    let nav = scrD.navigator;
    if (nav != null && nav.length > 0) {
        let erNav = isValidNavigator(nav, scrD, true);
        if (erNav != "") {
            newErrors += txtError(2, "&ensp;", "Error in Navigator " + erNav);
            newLevelErrors = 2;
        }
    }

    let noRes = checkValidityLinks(scrD.layout.children, "&ensp;");
    if (noRes.txt != "") {
        newErrors += txtError(1, "", noRes.txt);
        if (newLevelErrors < noRes.lev) {
            newLevelErrors = noRes.lev;
        }
    }

//    let scrV = list_screens.children[ii];
    let divErr = scrV.getElementsByClassName("error_screen")[0];
    divErr.style.backgroundColor = colorsEroor[newLevelErrors];

    if (scrD.levelErrors != newLevelErrors) {
//        let divErr = currentScreenView.getElementsByClassName("error_screen")[0];
//        divErr.style.backgroundColor = colorsEroor[newLevelErrors];
        scrD.levelErrors = newLevelErrors;
        setBoxError();
    }
    scrD.textErrors = newErrors;
}

function txtError(levEr, tab, st) {
    return '<span class="colorErrorL' + levEr + '">' + tab + st + '</span><br>';
}

function setBoxError() {
    box_error.innerHTML = "";
    let rectBox = box_error.getBoundingClientRect();
    let h_box = rectBox.bottom - rectBox.top;
    let ik = listScreen.length;
    let h_screen = h_box / ik;
    if (h_screen > heightScreen) {
        h_screen = heightScreen;
    }
    maxError = 0;
    for (let i = 0; i < ik; i++) {
        let scr = listScreen[i];
        if (scr.levelErrors > 0) {
            if (scr.levelErrors > maxError) {
                maxError = scr.levelErrors;
            }
            let marker = newMarker(scr.screenId, scr.levelErrors, i * h_screen);
            box_error.appendChild(marker);
        }
    }
    if (maxError > 0) {
        inf_error.style.backgroundColor = colorsEroor[maxError];
    } else {
        inf_error.style.backgroundColor = "#0f0";
    }
}

function newMarker(id, err, top_mark) {
    let container = document.createElement('div')
    container.innerHTML = '<div onclick="clickMarker(' + "'" + id + "'" + ')" style="position: absolute; width:100%;height:4px;top:' + top_mark + 'px;cursor:pointer;background-Color:' + colorsEroor[err] + '"></div>';
    return container.firstChild
}

function clickMarker(id) {
    let list = list_screens.children;
    let ik = list.length;
    for (let i = 0; i < ik; i++) {
        let scrV = list[i];
        if (scrV.idScreen == id) {
            selScreenView(scrV, i * heightScreen);
        }
    }
}
