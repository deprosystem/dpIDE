function uxEditGallery() {
    this.param = {name: "EditGallery", viewBaseId: "editGallery", onlyOne: false};
    
    let meta= [
        {name: "tabLayout", title:"Gallery element",len:80,type:"SelectId",tags:"Gallery"},
        {name: "selectedField", title:"Text to select the source of images",len:150,type:"Text"},
        {name: "plusId", title:"Add",len:80,type:"SelectId"},
        {name: "minusId", title:"Delete",len:80,type:"SelectId"},
        {name: "title", title:"Move forward",len:80,type:"SelectId"}
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
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = null;
        currentComponentDescr = {type:tt, componId: componId,view:{viewId: viewId,title:"",tabLayout:"",selectedField:""}};
                    // title элемент по которому начинает работать фото, в tabLayout список viewId куда заносится изображение, 
                    // в selectedField - строка текст которой будет показан в меню выбора источника, в param имя параметра куда будет занесен путь к фото.
    }
    
    this.setValue = function(componParam) {
        componParam.style.height = "40px";
        currentComponentDescr.view.innerHTML = "";
        let dd = new EditForm(meta, currentComponentDescr.view, componParam, null, null, true);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.prapa9spupld";
    }
    
    this.isValid = function(compD) {
        let tab = "&ensp;";
        let err = {text:"",error:0};
        let vv = compD.view;
        if (vv.tabLayout == null || vv.tabLayout.length == 0 || vv.plusId == null || vv.plusId.length == 0
                || vv.minusId == null || vv.minusId.length == 0 || vv.title == null || vv.title.length == 0) {
            err.text += txtError(2, tab, "component " + compD.view.viewId + " Not all parameters are set");
            err.error = 2;
        }
        return err;
    }
}