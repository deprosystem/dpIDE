function uiSwipe() {
   
    this.newElementUI = function(p) {
        p.componParam = {type:7,nodel:true,nomove:true};
        return null;
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = "";
        let radius = selectBlock("Card corner radius", "4,6,8,10,12,14,16,20", "cornersCardRadius", 0, 32);
        setValueSelectBlock(radius, p.radiusCard);
        radius.style.clear = "both";
        contentAttributes.appendChild(radius);

        let nn = editNumberParam("Elevation", 40, 24, 0, 10, "cardElevation");
        nn.style.clear = "both";
        if (p.elevCardShadow != null) {
            setValueNumber(nn, p.elevCardShadow);
        }
        contentAttributes.appendChild(nn);
    }
    
    this.viewElementUI = function(p, el) {

    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.3zi0jga40clq";
    }
}