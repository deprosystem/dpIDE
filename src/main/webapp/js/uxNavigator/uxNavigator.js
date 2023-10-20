var docNavigator = '<div onclick="navigatorCompon()" style="float:left;cursor:pointer;margin-left:20px;">'
        +'<div style="float:left;color:#2228;font-size:10px">Navigator</div>'
        +'<img style="float:left;margin-left:5px;" width="14" height="14" src="img/navigator.png">'
    +'</div>';
    
var hiddenAfterHandlers = ",Autch,Data,";

function navigatorCompon() {
    if (currentComponentDescr.navigator == null) {
        currentComponentDescr.navigator = [];
    }
    let nnn = new FormNavigator();
    nnn.init(currentComponentDescr.navigator, currentComponentDescr);
}

function saveNavigator(dat) {
    let ik = dat.length;
    for (let i = 0; i < ik; i++) {
        let item = dat[i];
        if (item.handler == "start") {
            let scr = item.param;
            if (scr != null && scr != "") {
                if (noScreen(scr)) {
                    createScreen(false, scr, "", currentScreen.typeScreen);
                }
            }
        }
        if (item.after != null && item.after.length > 0) {
            saveNavigator(item.after);
        }
    }
}

function isValidNavigator(listNav, compD, isScreen) {
    myScreen = compD.screenName.toUpperCase();
    let strRes = "";
    let sep = "";
    let ik = listNav.length;
    for (let i = 0; i < ik; i++) {
        let item = listNav[i];
        switch (item.handler) {
            case "start":
                let scr = item.param;
                if (scr != null && scr != "") {
                    if (myScreen != null && scr.toUpperCase() == myScreen) {
                        strRes += sep + "Calls itself " + scr;
                        sep = ", ";
                    } else {
                        if (noScreen(scr)) {
                            strRes += sep + "no screen " + scr;
                            sep = ", ";
                        }
                    }
                } else {
                    strRes += sep + "screen for viewId " + item.viewId + " is not described";
                    sep = ", ";
                }
                break;
            case "backOk":
            case "back":
                if (item.viewId == 0) {
                    strRes += sep + "handler back (backOk) must have viewId";
                    sep = ", ";
                }
                break
            case "actual":
                if (item.id == null || item.id == 0) {
                    strRes += sep + 'handler actual must have "Component to be updated"';
                    sep = ", ";
                }
                break
            case "send":
            case "sign up":
            case "edit profile":
                if (item.viewId == 0) {
                    strRes += sep + "handler send (sign up, edit profile) must have viewId";
                    sep = ", ";
                } else {
                    if (isScreen && (item.param_1 == null || item.param_1.length == 0)) {
                        strRes += sep + "handler send (sign up, edit profile) must have 'Element with data'";
                        sep = ", ";
                    }
                }
                break;
        }
    }
    return strRes;
}
/*
function inScrollForm(id, child, isForm) {
    let ik = childEl.length;
    for (let i = 0; i <ik; i++) {
        let item = childEl[i];
        let form = item.type.indexOf("Form") > -1;
        if (isForm && id == item.viewId) {
            return true;
        }
        let ch = item.children;
        if (ch != null && ch.length > 0) {
            if ( inScrollForm(id, ch, isForm || form)) {
                return true;
            }
        }
    }
    return false;
}
*/
