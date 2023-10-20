function uiSpinner() {
    
    let meta = [
        {name: "st_1", title:"Value",rows:2,type:"Textarea"},
        {name: "st_2", title:"Image",type:"Img"}
    ]
    
    this.setElementUI = function(p, newEl, parent) {
        this.createDivSpin(p, newEl);
//        newEl.append(this.createDivSpin(p));
    }
    
    this.newElementUI = function(p) {
//        return this.createDivSpin(p);
        this.createDivSpin(p, currentElement);
        return null;
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = "";
        if (p.componId == null || p.componId.length == 0) {
            if (p.componParam == null) {
                p.componParam = {type:24};
            }
            let dd = new EditForm(meta, p.componParam, contentAttributes, null, this);
        }
    }
    
    this.cbEdit = function(fieldName) {
        if (fieldName == "st_2") {
            let img = currentElement.querySelector("IMG");
            img.src = currentElement.android.componParam.st_2;
            viewCompon();
        }
    }

    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.rsho4mbf33iy";
    }
    
    this.viewElementUI = function(p, el) {
        if (p.typeUxUi == "ux") {
            return;
        }
        let divText = el.getElementsByClassName('text')[0];
        if (divText == null) {
            divText = createDivText();
            el.appendChild(divText);
        }
        if (p.textSize != null) {
            divText.style.fontSize = (p.textSize * MEASURE) + px;
        }
        if (p.textColor == null) {
            divText.style.color = "#808080";
        } else {
            divText.style.color = findColorByIndex(p.textColor);
        }
        if (p.letterSpac != null || p.letterSpac != "0.0") {
            divText.style.letterSpacing = p.letterSpac + "em";
        } else {
            divText.style.letterSpacing = "";
        }
        if (p.lineSpac != null || p.lineSpac != "0.0") {
            divText.style.lineHeight = (p.lineSpac * MEASURE) + "px";
        } else {
            divText.style.lineHeight = "";
        }
        if (p.text != null) {
            divText.innerHTML = p.text;
        }
        if (p.textStyle != null && p.textStyle == 1) {
            divText.style.fontStyle = "italic";
        } else {
            divText.style.fontStyle = "";
        }
        if (p.fontWeight != null && p.fontWeight == 1) {
            divText.style.fontWeight = "bold";
        } else {
            divText.style.fontWeight = "";
        }
        let img = el.querySelector("IMG");
        if (p.componParam.st_2 != null && p.componParam.st_2.length > 0) {
            img.src = p.componParam.st_2;
        }
    }
    
    this.createDivSpin = function(p, newEl) {
        if (p.typeUxUi == "ux") {
            return;
        }
        p.height = 24;
        if (p.componParam == null) {
            p.componParam = {type:24};
        }
        p.typeUxUi = "ui";
        let typeEl = createDivText();
        typeEl.innerHTML = p.viewId;
        typeEl.style.width = "100%";
        typeEl.style.height = "100%";
        newEl.append(typeEl);
        
        let px24 = 24 * DENSITY + "px";
        let img = newDOMelement('<img src="img/android_arrow_down.png" style="width:' + px24 + ';height:' + px24 + ';position:absolute;right:0">');
/*
        img.style.width = px24;
        img.style.height = px24;
        img.style.position = "absolute";
        img.style.right = "0";
        img.src = "img/android_arrow_down.png";
*/
        newEl.append(img);
        
        
        
/*
        let ACTIVE_r = ACTIVE;
        let currentElement_r = newEl;
        setActive(newEl);

        txtView = formImg({name:""});
        txtView.style.outline = "";
        let p1 = txtView.android;
        p1.width = 24;
        p1.height = 24;
        p1.gravLayout.h = 2;
        p1.src = "img/android_arrow_down.png";
        currentElement.android.viewElement = currentElement;
        currentElement = newEl;
        setActive(ACTIVE_r);
*/
    }
}


