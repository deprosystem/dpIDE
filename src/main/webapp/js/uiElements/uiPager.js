function uiPager() {
    this.setElementUI = function(p, newEl, parent) {
        formBelow(p, parent, "ToolBar,TabLayout");
        formAbove(p, parent, "MenuBottom");
    }
    
    this.newElementUI = function(p) {
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = "";
    }
    
    this.viewElementUI = function(p, el) {

    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.cffi72il661n";
    }
}