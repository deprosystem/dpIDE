function uxScreenSequence() {
    this.param = {name: "ScreenSequence", viewBaseId: "screenSequence", onlyOne: true, onePerScreen:true };
    
    let meta = [
        {name: "plusId", title:"Intro",len:100,type:"Text",valid:"latin"},
        {name: "minusId", title:"Auth",len:80,type:"Text",valid:"latin"},
        {name: "tabLayout", title:"Main",len:80,type:"Text",valid:"latin"}
    ]
            
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return "";
    }
    
    this.getEditParam = function () {
        return "";
    }
    
    this.getCreateListener = function () {
        return {vert:"", horiz:""};
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = null;
        currentComponentDescr = {type:tt, componId: componId, onePerScreen:true, model:{},view:{viewId: viewId}};
    }
    
    this.setValue = function(componParam) {
        componParam.innerHTML = "";
        componParam.style.height = "40px";
//console.log("setValue currentComponentDescr.view.tabLayout="+currentComponentDescr.view.tabLayout+"<<");
        let dd = new EditForm(meta, currentComponentDescr.view, componParam, null, null, true);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.tss7a97r675w";
    }
    
    this.isValid = function(comp, compV, general) {
        let tab = "&ensp;";
        let err = {text:"",error:0};
//        let dat = currentComponentDescr.view;
        let dat = comp.view;
//console.log("isValid dat.tabLayout="+dat.tabLayout+"<< dat.minusId="+dat.minusId+"<< comp.view.tabLayout="+comp.view.tabLayout+"<<");
        if (dat.tabLayout == null || dat.tabLayout.length == 0) {
            err.text += txtError(2, tab, "component " + comp.view.viewId + " Main activity not set");
            err.error = 2;
        }
        if ((dat.minusId == null || dat.minusId.length == 0) 
                && (dat.plusId == null || dat.plusId.length == 0)) {
            if (err.error == 0) {
                err.text += txtError(1, tab, "component " + comp.view.viewId + " This screen without setting Intro and Auth is inappropriate to use");
                err.error = 1;
            }
        }
//console.log("general="+general+" dat.minusId="+dat.minusId+"<< dat.plusId="+dat.plusId+"<< NO minus="+noScreen(dat.minusId)+" NO plus="+noScreen(dat.plusId));
        if (general) {
            if (dat.minusId != null && dat.minusId.length > 0 && noScreen(dat.minusId)) {
                err.text += txtError(2, tab, "component " + comp.view.viewId + " No screen " + dat.minusId);
                err.error = 2;
            }
            if (dat.plusId != null && dat.plusId.length > 0 && noScreen(dat.plusId)) {
//console.log("+++++++++++");
                err.text += txtError(2, tab, "component " + comp.view.viewId + " No screen " + dat.plusId);
                err.error = 2;
            }
        } else {
            if (err.error < 2) {
                if (noScreen(dat.tabLayout)) {
                    createScreen(false, dat.tabLayout, "", 0);
                }
                if (dat.minusId != null && dat.minusId.length > 0 && noScreen(dat.minusId)) {
                    createScreen(false, dat.minusId, "", 0);
                }
                if (dat.plusId != null && dat.plusId.length > 0 && noScreen(dat.plusId)) {
                    createScreen(false, dat.plusId, "", 0);
                }
            }
        }
        return err;
    }
}

