let strHelp = "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit";
let strHelpUX = "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.3dkem0eqq9cu";
let strHelpUI = "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.pz9ydy7y0yf6";
function helpDoc() {
    let adr;
    if (ux_ui.innerHTML == "U I") {        // UX
        if (uxFunction != null) {
            adr = uxFunction.getHelpLink();
            if (adr == null || adr.length == 0) {
                adr = strHelp;
            }
            window.open(adr);
        } else {
            window.open(strHelpUX);
        }
    } else {
        if (layoutParam.style.display != "none") {
            let type = currentElement.android.type;
            adr = "";
            try {
                uiFunction = eval("new ui" + type + "()");
                adr = uiFunction.getHelpLink();
            } catch(e) { }
            if (adr == null || adr.length == 0) {
                adr = strHelpUI;
            }
            window.open(adr);
        } else {
            window.open(strHelpUI);
        }
    }
}

function helpAll() {
    window.open(strHelp);
}

function helpUX() {
    window.open(strHelpUX);
}

function helpUI() {
    window.open(strHelpUI);
}