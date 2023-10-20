var appToken = "e2RW3RnulqgF1VWilohsOSKwAypO77";
function emModel(model, cb) {
    switch (model.method) {
        case 0:     //  GET
            let par = model.param;
            let stPar = "";
            if (par != null && par.length > 0) {
                let arrPar = par.split();
                let ik = arrPar.length;
                let pk = paramEmulator.length;
                let sep = "";
                for (let i = 0; i < ik; i++) {
                    let nn = arrPar[i];
                    for (let p = 0; p < pk; p++) {
                        let pE = paramEmulator[p];
                        if (nn == pE.name) {
                            stPar += sep + pE.name + "=" + pE.val;
                            sep = "&";
                            break;
                        }
                    }
                }
                if (stPar.length > 0) {
                    stPar = "?" + stPar;
                }
            }
            let url = "https://apps.dp-ide.com/" + model.url + stPar;
            doServerAlien("GET", url, cb);
            break;
        case 3:     //  Test
            cb.cbDoServer(model.test);
//            return JSON.parse(model.test);
            break;
    }
}


