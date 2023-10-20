function uiToolBar() {
    this.elementUI = '<div style="display:flex;flex-direction:row;align-items:center;position:absolute;width:100%;height:100%;">'
            +'<img class="img_back" width="'+dp_24+'" height="'+dp_24+'" style="margin-left:'+dp_16+'px;margin-right:'+dp_16+'px;">'
            +'<div class="title" style="display: inline-block; margin-left: 12px; white-space: pre-wrap;"></div>'
        + '</div>';

    let uiParamView = 
        '<div id="uiParamTextView" style="float:left;margin-top:12px;width:100%;">'
            +'<div style="margin-top: 5px;float: left;clear:both">'
                +'<div class="text_style_ui">Title color</div>'
                +'<div id="text_color" class="titleColor" onclick="setPickerTextColor(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
            +'</div>'
        +'</div>';
            
    this.setElementUI = function(p, newEl, parent) {
        typeEl = newDOMelement(this.elementUI);
        newEl.appendChild(typeEl);
        let myCompon = myComponentDescr(p.componId);
        if (myCompon == null) return;
        let v = myCompon.view;
        let tit = typeEl.getElementsByClassName("title")[0];
        if (tit != null) {
            if (currentScreen.title != null && currentScreen.title != "") {
                tit.innerHTML = currentScreen.title;
            }
            tit.style.color = findColorByIndex(p.textColor);
            tit.style.fontSize = (p.textSize * MEASURE) + px;
        }
        let img = typeEl.getElementsByClassName("img_back")[0];
        if (img != null) {
            if (v.selectedType != null && v.selectedType != "") {
                img.src = v.selectedType;
            }
        }
/*
        let tit = typeEl.getElementsByClassName("title")[0];
        if (tit != null) {
            if (currentScreen.title != null && currentScreen.title != "") {
                tit.innerHTML = currentScreen.title;
            }
            tit.style.color = findColorByIndex(p.textColor);
            tit.style.fontSize = (p.textSize * MEASURE) + px;
        }
        let img = typeEl.getElementsByClassName("img_back")[0];
        if (img != null) {
            if (p.imgBack != null && p.imgBack != "") {
                img.src = p.imgBack;
            }
        }
*/
    }
    
    this.newElementUI = function(p) {
        
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = uiParamView;
        setToolBarAttr(p);
    }
    
    this.viewElementUI = function(p, el) {
        let myCompon = myComponentDescr(p.componId);
        if (myCompon == null) return;
        let v = myCompon.view;
        let tit = el.getElementsByClassName("title")[0];
        if (tit != null) {
            if (currentScreen.title != null && currentScreen.title != "") {
                tit.innerHTML = currentScreen.title;
            }
            tit.style.color = findColorByIndex(p.textColor);
            if (p.textSize != null) {
                tit.style.fontSize = (p.textSize * MEASURE) + px;
            }
        }
        img = el.getElementsByClassName("img_back")[0];
        if (img != null) {
            if (v.selectedType != null && v.selectedType != "") {
                img.src = v.selectedType;
            }
        }
/*
        let tit = el.getElementsByClassName("title")[0];
        if (tit != null) {
            if (currentScreen.title != null && currentScreen.title != "") {
                tit.innerHTML = currentScreen.title;
            }
            tit.style.color = findColorByIndex(p.textColor);
            if (p.textSize != null) {
                tit.style.fontSize = (p.textSize * MEASURE) + px;
            }
        }
        img = el.getElementsByClassName("img_back")[0];
        if (img != null) {
            if (p.imgBack != null && p.imgBack != "") {
                img.src = p.imgBack;
            }
        }
*/
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.m81n6ymydj1v";
    }
}

function setToolBarAttr(p) {
    if (p.textColor == null || p.textColor == "") {
        text_color.style.backgroundColor = "#ffffff";
    } else {
        text_color.style.backgroundColor = findColorByIndex(p.textColor);
    }
}