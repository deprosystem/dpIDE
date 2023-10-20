function uiPanel() {

    this.setElementUI = function(p, newEl, parent) {
//        formBelow(p, parent, "ToolBar");
//        formAbove(p, parent, "MenuBottom");
    }
    
    this.newElementUI = function(p) {
        return null;
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = "";
    }
    
    this.viewElementUI = function(p, el) {

    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.pzylfjpxe7o1";
    }
}