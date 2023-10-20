function uiCardView() {
   
    this.newElementUI = function(p) {
        p.componParam = {type:13};
        p.colorCardShadow = -1;
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
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.bdwhrd882iq6";
    }
}

function cornersCardRadius(vv) {
    let res = vv;
    if (vv.tagName == "INPUT") {
        res = vv.value;
    }
    currentElement.android.radiusCard = res;
    viewCompon();
}

function setPickerColorElev() {
    let colEl = contentAttributes.getElementsByClassName("colorEditParam")[0];
    openPickerColor(colEl.style.backgroundColor, setColorElev);
}

function setColorElev(id, color) {
    let colEl = contentAttributes.getElementsByClassName("colorEditParam")[0];
    colEl.style.backgroundColor = color;
    currentElement.android.colorCardShadow = id;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function cardElevation(el) {
    currentElement.android.elevCardShadow = el.value;
    viewCompon();
}
