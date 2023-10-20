function myComponentDescr(id) {      //      currentComponentDescr
    let ik = currentScreen.components.length;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            let it = currentScreen.components[i];
            if (it.componId == id) {
                return it;
            }
        }
        return null;
    } else {
        return null;
    }
}

function getComponentById(id) {     //      currentComponent
    return getCompById(currentChildren, id);
}

function getCompById(ch, id) {
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let chi = ch[i];
        if (chi.componId == id) {
            return chi;
        } else {
            if (chi.children != null && chi.children.length > 0) {
                let res = getCompById(chi.children, id);
                if (res != null) {
                    return res;
                }
            }
        }
    }
    return null;
}

function getComponentByViewId(id, screen) {
//console.log("getComponentByViewId ID="+id+"<<");
    let ch;
    if (screen != null) {
        ch = screen.components
    } else {
        ch = currentScreen.components;
    }
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let chi = ch[i];
//console.log("       III=" + i + " ID="+chi.view.viewId+"<<");
        if (chi.view.viewId == id) {
//console.log("       III=" + i + " !!!!!! +++++");
            return chi;
        }
    }
    return null;
}

function tryFindByViewId(vId) {
    return getCompByViewId(currentChildren, vId);
}

function getCompByViewId(ch, id) {
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let chi = ch[i];
        if (chi.viewId == id) {
            return chi;
        } else {
            if (chi.children != null && chi.children.length > 0) {
                let res = getCompByViewId(chi.children, id);
                if (res != null) {
                    return res;
                }
            }
        }
    }
    return null;
}

function getInfComponentById(id) {     //      currentComponent
    return getInfCompById(currentChildren, id);
}

function getInfCompById(ch, id) {
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let chi = ch[i];
        if (chi.componId == id) {
            return {parent:ch,ind:i,el:chi};
        } else {
            if (chi.children != null && chi.children.length > 0) {
                let res = getInfCompById(chi.children, id);
                if (res != null) {
                    return res;
                }
            }
        }
    }
    return null;
}

function checkValidityLinks(ch, tab) {
    let ik = ch.length;
    let res = "";
    let letErr = 0;
    for (let i = 0; i < ik; i++) {
        let chi = ch[i];
        let vId = chi.viewId;
        if (vId == null) {
            vId = "";
        } else {
            vId += ":";
        }
        if (chi.type == "Ratings") {
            if (chi.componParam.srcFilled == null || chi.componParam.srcFilled == "" ||
                    chi.componParam.srcContour == null || chi.componParam.srcContour == "") {
                res += txtError(2, tab, vId + chi.type + " Item rating no images set");
                letErr = 2;
            }
        }
        if (chi.below != null && chi.below != "") {
            if ( ! isValidLink(ch, chi.below)) {
                chi.below = "";
                res += txtError(1, tab, vId + chi.type + " below." + chi.below + " no resource");
                if (letErr < 1) {
                    letErr = 1;
                }
            }
        }
        if (chi.above != null && chi.above != "") {
            if ( ! isValidLink(ch, chi.above)) {
                chi.above = "";
                res += txtError(1, tab, vId + chi.type + " above." + chi.below + " no resource");
                if (letErr < 1) {
                    letErr = 1;
                }
            }
        }
        if (chi.toRightOf != null && chi.toRightOf != "") {
            if ( ! isValidLink(ch, chi.toRightOf)) {
                chi.toRightOf = "";
                res += txtError(1, tab, vId + chi.type + " toRightOf." + chi.toRightOf + " no resource");
                if (letErr < 1) {
                    letErr = 1;
                }
            }
        }
        if (chi.toLeftOf != null && chi.toLeftOf != "") {
            if ( ! isValidLink(ch, chi.toLeftOf)) {
                chi.toLeftOf = "";
                res += txtError(1, tab, vId + chi.type + " toLeftOf." + chi.toLeftOf + " no resource");
                if (letErr < 1) {
                    letErr = 1;
                }
            }
        }
        chN = chi.children;
        if (chN != null && chN.length > 0) {
            let tt = tab;
            if (chN.length > 1) {
                tt += "&ensp;";
            }
            let resEr_1 = checkValidityLinks(chN, tt);
            if (resEr_1.lev > 0) {
                res += txtError(1, tab, resEr_1.txt);
                if (letErr < resEr_1.lev) {
                    letErr = resEr_1.lev;
                }
            }
        }
    }
    let resErr = {lev:letErr,txt:res};
    return resErr;
}

function checkValidityUI(ch, tab) {
    let ik = ch.length;
    let res = "";
    for (let i = 0; i < ik; i++) {
        let chi = ch[i];
        let vId = chi.viewId;
        if (vId == null) {
            vId = "";
        } else {
            vId += ":";
        }
        if (chi.type == "Ratings") {
            if (chi.componParam.srcFilled == null || chi.componParam.srcFilled == "" ||
                    chi.componParam.srcContour == null || chi.componParam.srcContour == "") {
                res += tab + vId + chi.type + " Item rating no images set <br>";
            }
        }

        chN = chi.children;
        if (chN != null && chN.length > 0) {
            let tt = tab;
            if (chN.length > 1) {
                tt += "&ensp;";
            }
            res += checkValidityLinks(chN, tt);
        }
    }
    return res;
}

function isValidLink(ch, id) {
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        if (ch[i].viewId == id) {
            return true;
        }
    }
    return false;
}

function getCompByType(ch, id) {
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let chi = ch[i];
        if (chi.type == id) {
            return chi;
        } else {
            if (chi.children != null && chi.children.length > 0) {
                let res = getCompByViewId(chi.children, id);
                if (res != null) {
                    return res;
                }
            }
        }
    }
    return null;
}

