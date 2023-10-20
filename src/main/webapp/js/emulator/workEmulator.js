function emalator() {
    let emCountComponents;
    let emComponentsProcessed;
    let isSetEmulator;
    let emFunction;
    let cComp;
    let cDescr;
    this.arrFunc = [];
    let divProgr;
    
    this.setEmulator = function() {
        isSetEmulator = false;
        emComponentsProcessed = 0;
        let cc = currentScreen.components;
        let ik = cc.length;
        emCountComponents = ik + 1;
        divProgr = null;
        if (ik > 0) {
            divProgr = windProgr(document.body, "");
            document.body.append(divProgr);
            for (let i = 0; i < ik; i++) {
                cDescr = cc[i];
                emFunction = null;
                try {
                    emFunction = eval("new em" + cDescr.type + "();");
                } catch(e) { 
//                    console.log("ERROR="+e); 
                }
                if (emFunction != null) {
                    let id = cDescr.componId;
                    cComp = getComponentById(id);
                    emFunction.setData(cDescr, cComp, this);
                }
                this.arrFunc.push(emFunction);
            }
            isSetEmulator = true;
            this.emEndProcessing();
        }
    }

    this.emEndProcessing = function() {
        emComponentsProcessed ++;
        if (isSetEmulator && emComponentsProcessed == emCountComponents) {
            setScreenView();
            let ik = this.arrFunc.length;
            for (let i = 0; i < ik; i++) {
                if (this.arrFunc[i].setNavigator != null) {
                    this.arrFunc[i].setNavigator(i);
                }
            }
        }
        if (divProgr != null) {
            document.body.removeChild(divProgr);
            divProgr = null;
        }
    }

    this.noEmulatorComponents = function() {
        let cc = currentScreen.components;
        let ik = cc.length;
        let cDescr;
        if (ik > 0) {
            for (let i = 0; i < ik; i++) {
                cDescr = cc[i];
                emFunction = this.arrFunc[i];
                if (emFunction != null) {
                    let id = cDescr.componId;
//                    cComp = getComponentById(id);
//                    emFunction.noEmulator(cComp);
                    emFunction.noEmulator();
                }
            }
        }
        setScreenView();
    }
}
