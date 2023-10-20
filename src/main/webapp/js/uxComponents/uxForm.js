function uxForm() {
    this.param = {name: "Form", viewBaseId: "form", onlyOne: false};
    
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return docNavigator;
    }
    
    this.getEditParam = function () {
        return uxModelView("createViewForPanelV", "");
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:7},
                typeFull: {name: tt, typeBlock: 10}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:-1,itemNav:{},viewElement: null,children:[]};
        currentComponentDescr = {type:tt, componId: componId, model:{method:0,data:[[]]},view:{viewId: viewId},navigator:[]};
    }
    
    this.setValue = function(componParam) {
        setValueModel(componParam);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.ftyd9r3lv2g8";
    }
    
    this.isValid = function(compD) {
        let tab = "&ensp;";
        let err = {text:"",error:0};
        let nav = compD.navigator;
        if (nav != null && nav.length > 0) {
            let erNav = isValidNavigator(nav, compD);
            if (erNav != "") {
                err.text += txtError(2, tab, "component " + compD.view.viewId + " error in Navigator " + erNav);
                err.error = 2;
            }
        }
        return err;
    }
}

