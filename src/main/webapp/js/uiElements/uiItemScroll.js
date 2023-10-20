function uiItemScroll() {
/*
    let meta= [
        {name: "st_1", title:"Height item scroll",type:"Text",len:40,valid:"number"}
    ]
*/
    this.setElementUI = function(p, newEl, parent) {
    }
    
    this.newElementUI = function(p) {
        return null;
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = "";
        el_h_match.onclick = "";
        el_h_match.style.cursor = "auto";
//        new EditForm(meta, p.componParam, contentAttributes, null, this, true);
    }
    
    this.viewElementUI = function(p, el) {
        if (el.scroll_y == null) {
            new ScrollItem(el);
        }
    }
/*
    this.cbEdit = function(name) {
        let h = currentElement.android.componParam.st_1;
        currentElement.style.bottom = "";
        currentElement.style.height = h + "px";
        resizeScrollItem(currentElement);
    }
*/
}


