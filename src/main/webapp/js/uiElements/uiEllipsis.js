var ellipsisColor;

function uiEllipsis() {
    let cont = '<div class="container" style="width:100%;height:100%;display:flex;justify-content:space-around;"></div>';
    this.setElementUI = function(p, newEl, parent) {
        if (p.componParam == null) {
            p.componParam = {diam:3,colorNorm:0,amountDots:5,orient:"vertical",type:14};
        }
        let div = newDOMelement(cont);
        newEl.appendChild(div);
    }
    
    this.newElementUI = function(p) {
        p.componParam = {diam:3,colorNorm:0,amountDots:5,orient:"vertical",type:14};
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = formEllipsisContent(p);
        let diam = contentAttributes.getElementsByClassName("containerForDiam")[0];
        let numb = createNumber(40, 24, 1, 10, "changeEllipsDiam(this);");
        numb.style.float = "left";
        numb.className = "numb";
        numb.style.marginTop = "3px";
        setValueNumber(numb, p.componParam.diam);
        diam.appendChild(numb);
        
        let am = contentAttributes.getElementsByClassName("containerForAmount")[0];
        numb = createNumber(40, 24, 1, 10, "changeEllipsAmount(this);");
        numb.style.float = "left";
        numb.className = "numb";
        numb.style.marginTop = "3px";
        setValueNumber(numb, p.componParam.amountDots);
        am.appendChild(numb);
    }
    
    this.viewElementUI = function(p, el) {
        let div = el.getElementsByClassName('container')[0];
        if (div == null) {
            div = newDOMelement(cont);
            el.appendChild(div);
        }
        

        div.innerHTML = "";
        if (p.componParam == null) {
            p.componParam = {diam:3,colorNorm:0,amountDots:5,orient:"vertical",type:14};
        }
        if (p.componParam.orient == "vertical") {
            div.style.flexDirection = "column";
        } else {
            div.style.flexDirection = "row";
        }
        let amount = p.componParam.amountDots;
        let diam = p.componParam.diam * MEASURE;
        let colS = findColorByIndex(p.componParam.colorNorm);
        for (let i = 0; i < amount; i++) {
            div.appendChild(formItemEllipsis(colS, diam));
        }
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.5db4na7yamp0";
    }
}

function formItemEllipsis(color, diam) {
    var container = document.createElement('div')
    let rr = diam / 2;
    container.innerHTML = '<div style="width:' + diam + 'px;height:' + diam + 'px;border-radius:' + rr + 'px;background-color:' + color + ';"></div>'
    return container.firstChild
}

function formEllipsisContent(p) {
    if (p.componParam == null) {
        p.componParam = {diam:3,colorNorm:0,amountDots:5,orient:"vertical",type:14};
    }
    let st =
        '<div style="float: left;clear: both;margin-top: 16px;width:100%;padding-bottom:5px;border-bottom: 1px solid #1DACEf;">'
            +'<div style="margin-top: 5px;float: left;clear:both">'
                +'<div class="text_style_ui">Dot color</div>'
                +'<div class="text_norm" onclick="setPickerEllipsisColor(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; \n\
                    border: 1px solid #bbd4ef;border-radius:5px;background:' + findColorByIndex(p.componParam.colorNorm)+ '"></div>'
            +'</div>'
            +'<div class="containerForDiam" style="margin-top: 5px;float: left;margin-left:10px">'
                +'<div class="text_style_ui">Diameter</div>'

            +'</div>'
            +'<div class="containerForAmount" style="margin-top: 5px;float: left;margin-left:10px">'
                +'<div class="text_style_ui">Amount</div>'

            +'</div>'
            +'<div style="float:left;margin-left:10px;"><div style="font-size:10px;color:#8199A5;margin-left:4px;margin-top:5px">Orientation</div>'
                +'<select class="orient type_screen select_' + browser + '" onchange="changeOrientEllipsis(this)" \n\
                    style="width:88px;font-size:12px;color:#110000;margin-top:3px;height:26px"><option>vertical</option><option>horizontal</option></select>'
            +'</div>'
        +'</div>';
        return st;
}

function changeEllipsDiam(el) {
    let p = currentElement.android;
    p.componParam.diam = el.value;
    viewCompon();
}

function changeEllipsAmount(el) {
    let p = currentElement.android;
    p.componParam.amountDots = el.value;
    viewCompon();
}

function setPickerEllipsisColor(el) {
    ellipsisColor = el;
    openPickerColor(el.style.backgroundColor, setEllipsisColor);
}

var setEllipsisColor = function (id, color) {
    let p = currentElement.android;
    p.componParam.colorNorm = id;
    ellipsisColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function changeOrientEllipsis(el) {
    currentElement.android.componParam.orient = el.options[el.selectedIndex].value;
    viewCompon();
}

