function emPanel() {
    this.data;
    this.cComp;
    this.parentEm;
    this.cDescr;
    
    this.setData = function (cDescr, cComp, emParent) {
        this.parentEm = emParent;
        this.cComp = cComp;
        this.cDescr = cDescr;
        emModel(cDescr.model, this);
    }
    
    this.cbDoServer = function(res) {
//console.log("RES="+res);
        this.data = JSON.parse(res);
        if (this.data != null && this.data.length > 0) {
            setDataToView(this.data[0], this.cComp, this.cDescr);
        }
        this.parentEm.emEndProcessing();
    }
    
    this.noEmulator = function() {
        restoreView(this.cComp);
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
            emSetNavigator(this.cComp, stNav, indCompon, 0);
        }
    }
    
    this.setParameter = function(indRes) {
        emSetParam(this.data[0]);
    }
}


