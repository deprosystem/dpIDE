function uiList() {
            
    this.setElementUI = function(p, newEl, parent) {
        formBelow(p, parent, "ToolBar");
        let pp = getCompByType(parent.children, "MenuBottom");
        if (pp.gravLayout.v == BOTTOM) {
            formAbove(p, parent, "MenuBottom");
        }
    }
    
    this.viewElementUI = function(p, el) {
        let myCompon = myComponentDescr(p.componId);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.rd9cj4tvy7lm";
    }    
}