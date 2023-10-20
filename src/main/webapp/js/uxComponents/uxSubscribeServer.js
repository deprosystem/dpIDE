function uxSubscribeServer() {
    let meta = [
        {name: "title", title:"Switch",len:150,type:"SelectId",tags:"Switch"},
//        {name: "selectedField", title:"Name push",len:150,type:"Text",valid:"latin"},
        {name: "selectedField", title:"Name push",len:150,type:"SelectPush"}
    ];
    
    this.param = {name: "SubscribeServer", viewBaseId: "subPush", onlyOne: false};

    this.getParamComp = function () {
        return this.param;
    };
    
    this.getSpecialView = function () {
        return "";
    };
    
    this.getEditParam = function () {
        return "";
    };
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        currentComponent = null;
        currentComponentDescr = {type:tt, componId: componId,view:{viewId: viewId,title:"",tabLayout:"",selectedField:"",param:""}};
                    // title элемент по которому начинает работать фото, в tabLayout список viewId куда заносится изображение, 
                    // в selectedField - строка текст которой будет показан в меню выбора источника, в param имя параметра куда будет занесен путь к фото.
    };
    
    this.setValue = function(componParam) {
        componParam.style.height = "40px";
        currentComponentDescr.view.innerHTML = "";
        let dd = new EditForm(meta, currentComponentDescr.view, componParam, null, this, true, null, null, 7);
    };
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.sgp7rs875x6k";
    };
    
    this.isValid = function(compD) {
        let tab = "&ensp;";
        let err = {text:"",error:0};


        return err;
    };
    
    this.cbEdit = function(fieldName) {

    }
}