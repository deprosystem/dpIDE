var paramEmulator = [];

function emSetNavigator(p, navig, indCompon, indRes) {
    if (navig.indexOf(",0,") > -1) {
        p.viewElement.addEventListener("contextmenu", function(){
            event.preventDefault();event.stopPropagation();
            emNavigator(indCompon, "0", indRes);return false;}, false);
    }
    emSetNavigator_1(p, navig, indCompon, indRes);
}

function emSetNavigator_1(p, navig, indCompon, indRes) {
    let id = p.viewId;
    if (id != null && id != "") {
        if (navig.indexOf("," + id + ",") > -1) {
            p.viewElement.addEventListener("contextmenu", function(){
                event.preventDefault();event.stopPropagation();
                emNavigator(indCompon, id, indRes);return false;}, false);
        }
    }
    let ch = p.children;
    if (ch != null && ch.length > 0) {
        let ik = ch.length;
        if (ik > 0) {
            for (let i = 0; i < ik; i++)  {
                emSetNavigator_1(ch[i], navig, indCompon, indRes);
            }
        }
    }
}

function emNavigator(indCompon, id, indRes) {
    let myCompon = currentScreen.components[indCompon];
    let nav = myCompon.navigator;
    let ik = nav.length;
    let screen;
    for (let i = 0; i < ik; i++) {
        navI = nav[i];
        if (navI.viewId == id) {
            screen = "";
            switch (navI.handler) {
                case "start":
                    screen = navI.param;
                    break;
            }
            if (screen != null) {
                screenEmulator.arrFunc[indCompon].setParameter(indRes);
                selScreenName(screen);
                onEmulator();
                break;
            }
        }
    }
}

function emSetParam(data) {
    let pk = paramEmulator.length;
    for (var key in data) {
        let noPar = true;
        for (let p = 0; p < pk; p++) {
            let par = paramEmulator[p];
            if (par.name == key) {
                data[key] = par.val;
                noPar = false;
                break;
            }
        }
        if (noPar) {
            paramEmulator.push({name:key,val:data[key]});
        }
    }
}