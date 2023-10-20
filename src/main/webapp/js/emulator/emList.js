function emList() {
    this.cComp;
    this.baseP;
    this.cDescr;
    this.parentEm;
    this.data;

    this.setData = function (cDescr, cComp, emParent) {
        this.parentEm = emParent;
        this.cComp = cComp;
        this.cDescr = cDescr;
        emModel(cDescr.model, this);
    }
    
    this.noEmulator = function() {
        this.restore(this.cComp);
    }
    
    this.cbDoServer = function(res) {
        this.data = JSON.parse(res);
        if (this.data != null && this.data.length > 0) {
            this.setEmulator(this.data);
        }
        this.parentEm.emEndProcessing();
    }
    
    this.setEmulator = function(data) {
        let ch = this.cComp.children;
        let maxType = ch.length;
        this.baseP = [];
        for (let i = 0; i < maxType; i++) {
            let el = ch[i];
            this.baseP.push(jsonNoViewParent(el));
        }
        ch.length = 0;
        let fieldType = this.cDescr.model.fieldType;
        if (fieldType == null) {
            fieldType = "";
        }
        let ik = data.length;
        if (ik > 10) {
            ik = 10;
        }
        let id_new = "";
        for (let i = 0; i < ik; i++) {
            let indType = 0
            let dat = data[i];
            if (fieldType != "") {
                indType = dat[fieldType];
            }
            if (indType >= maxType) {
                indType = 0;
            }
            el = JSON.parse(this.baseP[indType]);
            setDataToView(dat, el.children[0], this.cDescr);
            el.viewId = el.viewId + "_" + i;
            if (id_new != "") {
                el.below = id_new;
            }
            id_new = el.viewId;
            ch.push(el);
        }
    }
    
    this.restore = function(p) {
        let ch = p.children;
        let ik = this.baseP.length;
        let newArrP = [];
        let id_i;
        let el;
        let jk = ch.length;
        for (let i = 0; i < ik; i++) {
            id_i = "__sw_" + i;
            let notEl = true;
            for (let j = 0; j < jk; j++) {
                el = ch[j];
                if (el.viewId.indexOf(id_i) == 0) {
                    el.viewId = id_i;
                    newArrP.push(el);
                    notEl = false;
                    break;
                }
            }
            if (notEl) {
                newArrP.push(JSON.parse(this.baseP[i]));
            }
        }
        ik = newArrP.length;
        id_i = "";
        p.children.length = 0;
        for (let i = 0; i < ik; i++) {
            el = newArrP[i];
            el.below = id_i;
            id_i = el.viewId;
            restoreView(el);
            ch.push(el);
        }
    }

    this.setNavigator = function(indCompon) {
        let nav = this.cDescr.navigator;
        if (nav != null && nav.length > 0) {
            let ik = nav.length;
            let stNav = ",";
            for (let i = 0; i < ik; i++) {
                let vId = nav[i].viewId;
                if (stNav.indexOf("," + vId + ",") == -1) {
                    stNav += vId + ",";
                }
            }
            let ch = this.cComp.children
            ik = ch.length;
            for (let i = 0; i < ik; i++) {
                emSetNavigator(ch[i], stNav, indCompon, i);
            }
        }
    }
    
    this.setParameter = function(indRes) {
        emSetParam(this.data[indRes]);
    }
}


