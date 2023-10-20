var indicatorColor;

function uiIndicator() {
    this.setElementUI = function(p, newEl, parent) {

    }
    
    this.newElementUI = function(p) {
        p.width = WRAP;
        p.height = WRAP;
        p.componParam = {diam:7,colorNorm:3,colorSel:4,type:10};
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = formIndicatorContent(p);
        let diam = contentAttributes.getElementsByClassName("containerForDiam")[0];
        let numb = createNumber(50, 24, 2, 20, "changeIndicatorDiam(this);");
        numb.style.float = "left";
        numb.className = "numb";
        numb.style.marginTop = "3px";
        setValueNumber(numb, p.componParam.diam);
        diam.appendChild(numb);
    }
    
    this.viewElementUI = function(p, el) {
        el.innerHTML = "";
        if (p.componParam == null) {
            p.componParam = {diam:7,colorNorm:3,colorSel:4};
        }
        let diam = p.componParam.diam * MEASURE;
        let colS = findColorByIndex(p.componParam.colorSel);
        let colN = findColorByIndex(p.componParam.colorNorm);
        el.appendChild(formItemInd(colS, diam));
        el.appendChild(formItemInd(colN, diam));
        el.appendChild(formItemInd(colN, diam));
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.7jryj8bqgsqc";
    }
}

function formItemInd(color, diam) {
    var container = document.createElement('div')
    let rr = diam / 2;
    container.innerHTML = '<div style="float:left;width:' + diam + 'px;height:' + diam + 'px;border-radius:' + rr + 'px;background:' 
            + color + ';margin-left:' + rr + 'px;margin-right:' + rr + 'px;"></div>'
    return container.firstChild
}

function formIndicatorContent(p) {
    if (p.componParam == null) {
        p.componParam = {diam:7,colorNorm:3,colorSel:4};
    }
    let st =
        '<div style="float: left;clear: both;margin-top: 16px;width:100%;padding-bottom:5px;border-top: 1px solid #1DACEf;border-bottom: 1px solid #1DACEf;">'
            +'<div style="margin-top: 5px;float: left;clear:both">'
                +'<div class="text_style_ui">Normal</div>'
                +'<div class="text_norm" onclick="setPickerIndicatorColorNorm(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; \n\
                    border: 1px solid #bbd4ef;border-radius:5px;background:' + findColorByIndex(p.componParam.colorNorm)+ '"></div>'
            +'</div>'
            +'<div style="margin-top: 5px;float: left;margin-left:10px">'
                +'<div class="text_style_ui">Selected</div>'
                +'<div class="text_sel" onclick="setPickerIndicatorColorSel(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; \n\
                    border: 1px solid #bbd4ef;border-radius:5px;background:' + findColorByIndex(p.componParam.colorSel)+ '"></div>'
            +'</div>'
            +'<div class="containerForDiam" style="margin-top: 5px;float: left;margin-left:10px">'
                +'<div class="text_style_ui">Point diameter</div>'

            +'</div>'
        +'</div>';
        return st;
}

function changeIndicatorDiam(el) {
    let p = currentElement.android;
    p.componParam.diam = el.value;
    viewCompon();
}

function setPickerIndicatorColorNorm(el) {
    indicatorColor = el;
    openPickerColor(el.style.backgroundColor, setIndColorNorm);
}

var setIndColorNorm = function (id, color) {
    let p = currentElement.android;
    p.componParam.colorNorm = id;
    indicatorColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function setPickerIndicatorColorSel(el) {
    indicatorColor = el;
    openPickerColor(el.style.backgroundColor, setIndColorSel);
}

var setIndColorSel = function (id, color) {
    let p = currentElement.android;
    p.componParam.colorSel = id;
    indicatorColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

