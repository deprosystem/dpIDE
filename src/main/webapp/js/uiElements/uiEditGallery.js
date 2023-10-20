function uiEditGallery() {
    
    let meta= [
        {name: "st_1", title:"Add",len:80,type:"SelectId"},
        {name: "st_2", title:"Delete",len:80,type:"SelectId"},
        {name: "st_3", title:"Move forward",len:80,type:"SelectId"}
    ]
    
    this.setElementUI = function(p, newEl, parent) {
    }
    
    this.newElementUI = function(p) {
        p.componParam = {};
//        p.componParam = {type:26};
        p.src = "img/picture.png";
        return createDivImg();;
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = "";
        new EditForm(meta, p.componParam, contentAttributes, null, null, true);
    }
    
    this.viewElementUI = function(p, el) {

    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.d5xa4tmynyxe";
    }
}