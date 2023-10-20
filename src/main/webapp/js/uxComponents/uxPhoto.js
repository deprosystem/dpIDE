function uxPhoto() {
    let meta = [
        {name: "title", title:"Camera shutter",len:150,type:"SelectId"},
        {name: "tabLayout", title:"Where to show photos",len:150,type:"MultiCheck",source:"UI",tags:"ImageView",src:"img/edit_meta.png"},
        {name: "selectedField", title:"Text to select the source of images",len:150,type:"Text"},
        {name: "param", title:"Parameter",len:80,type:"Text",valid:"list_var"}
    ];
    
    this.param = {name: "Photo", viewBaseId: "photo", onlyOne: false};

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
        currentComponentDescr = {type:tt, componId: componId,view:{viewId: viewId,title:"",tabLayout:"",selectedField:"",param:""}};
                    // title элемент по которому начинает работать фото, в tabLayout список viewId куда заносится изображение, 
                    // в selectedField - строка текст которой будет показан в меню выбора источника, в param имя параметра куда будет занесен путь к фото.
    }
    
    this.setValue = function(componParam) {
        componParam.style.height = "40px";
        currentComponentDescr.view.innerHTML = "";
        let dd = new EditForm(meta, currentComponentDescr.view, componParam, null, this, true);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.auwtdwxh6nbd";
    }
    
    this.isValid = function(compD) {
        let tab = "&ensp;";
        let err = {text:"",error:0};


        return err;
    }
    
    this.cbEdit = function(fieldName) {

    }
}