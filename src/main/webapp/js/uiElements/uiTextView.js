function uiTextView() {
    
    let uiParamView = 
        '<div id="uiParamTextView" style="float:left;width:100%;">'
            +'<div class="text_style_ui" style="float: left;">Value</div>'
            +'<textarea id="text_text_value" style="margin-top: 5px; float:left;clear:both;width:100%;border:1px solid #C5DCFA;box-sizing: border-box;border-radius: 8px;"\n\
                onKeyUp="inputTextValue(event, this)" rows="3" cols="27"></textarea>'
            +'<div style="float:left;clear:both;margin-top:12px;width:100%">'
                +'<div style="float:left;">'
                    +'<div style="font-size:10px;color:#2228">Show text in APP</div>'
                    +'<img class="check_form_res" style="cursor:pointer;margin-top:5px;margin-left:14px" width="16" height="16" src="img/check-act.png">'
                +'</div>'
                +'<div style="float:right;margin-right:10px;">'
                    +'<div style="font-size:10px;color:#2228">Format</div>'
                    +'<select class="select_format type_screen select_' + browser 
                    +'" onchange="changeFormatTV(this)" style="width:88px;font-size:12px;color:#110000;"><option>no</option><option>dd.MM.yy</option>'
                    +'<option>d.M.yy</option><option>dd.MMM.yy</option><option>yy.MM.dd</option><option>12 345</option><option>12 345.67</option><option>12 345.678</option></select>'
                +'</div>'
            +'</div>'
            +'<div style="margin-top: 5px;float: left;clear:both">'
                +'<div class="text_style_ui">Color</div>'
                +'<div id="text_color" class="text_sel" onclick="setPickerTextColor(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
            +'</div>'
            +'<div style="margin-top: 5px;float: left;margin-left:10px;">'
                +'<div class="text_style_ui">Bold</div>'
                +'<div class="font_sel" onclick="textWeight(this)" style="font-weight:bold;">B</div>'
            +'</div>'
            +'<div style="margin-top: 5px;float: left;margin-left:10px;">'
                +'<div class="text_style_ui">Italic</div>'
                +'<div class="font_sel" onclick="textStyle(this)" style="font-style:italic;font-family:serif;font-weight:bolder;margin-top:2px">I</div>'
            +'</div>'
        +'</div>';


    this.setElementUI = function(p, newEl, parent) {
        if (p.componParam == null) {
            p.componParam = {typeValidTV:"no"};
        }
        newEl.appendChild(createDivText());
    }
    
    this.newElementUI = function(p) {
        p.text = "";
        p.textSize = 16;
        p.letterSpac = '0.0';
        p.textColor = 12;
        p.componParam = {typeValidTV:"no"};
        return createDivText();
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = uiParamView;
        let checkRes = contentAttributes.querySelector(".check_form_res");
        checkRes.addEventListener('click', () => {this.checkFormResourseText(checkRes)});
        let txtAr = contentAttributes.getElementsByTagName("textarea")[0];
        if (p.text != null) {
            txtAr.value = p.text;
        }
        if (p.formResourse != null) {
            let cfr = contentAttributes.getElementsByClassName("check_form_res")[0];
            if (p.formResourse) {
                cfr.src = "img/check-sel_1.png";
            } else {
                cfr.src = "img/check-act.png";
            }
        }
        if (p.componParam.format == null) {
            p.componParam.format = "no";
        }
        cfr = contentAttributes.getElementsByClassName("select_format")[0];
        cfr.value = p.componParam.format;
        let sizeBl = selectBlock("Size", "8,10,12,14,16,18,20,22,24,28,32,40", "setSizeTV", 6, 56);
        setValueSelectBlock(sizeBl, p.textSize);
        uiParamTextView.appendChild(sizeBl);
        let spacBl = selectBlock("letterSpacing", "-0.05,-0.02,0.0,0.02,0.05,0.07,0.1", "setLetterTV", -0.05, 0.5, 0.01);
        setValueSelectBlock(spacBl, p.letterSpac);
        uiParamTextView.appendChild(spacBl);
        let lineSpacBl = selectBlock("lineSpacing", "0,1,2,3,4,6,8,10", "setLineSpacTV", 0, 14);
        setValueSelectBlock(lineSpacBl, p.lineSpac);
        uiParamTextView.appendChild(lineSpacBl);
        if (p.componParam.ellipsize == null) {
            p.componParam.ellipsize = "none";
        }
        let ellipsize = dropDownList("Ellipsize", "end,start,middle,marquee,none", 65, "changeEllipsizeTV", p.componParam.ellipsize);
        ellipsize.style.clear = "both";
        ellipsize.style.marginLeft = "";
        contentAttributes.appendChild(ellipsize);
/*
        let single = editCheckbox("Single Line", p.componParam.singleLine, "changeSingleLineTV");
        single.style.marginTop = "5px";
        single.style.marginLeft = "10px";
        contentAttributes.appendChild(single);
*/
        let maxLine = editNumberParam("maxLines", 50, 24, 0, 20, "maxLineTV");
        maxLine.style.marginLeft = "10px";
        maxLine.style.marginTop = "5px";
        if (p.componParam.maxLine == null) {
            p.componParam.maxLine = 0;
        }
        setValueNumber(maxLine, p.componParam.maxLine);
        contentAttributes.appendChild(maxLine);
        
        let typeValid = dropDownList("Validation type", "no,filled,email", 65, "changeValidTypeTV", p.componParam.typeValidTV);
        typeValid.style.clear = "both";
        typeValid.style.marginLeft = "";
        contentAttributes.appendChild(typeValid);

        let errorV = document.createElement('div');
        errorV.className = "errorV";
        errorV.style.cssText = "float:left;height:40px;";

        if (p.componParam.typeValidTV != "no") {
            errorV.style.display = "block";
        } else {
            errorV.style.display = "none";
        }
        let sss = selectListID("error ID", 80, currentChildren, p.componParam.errorId, changeErrorIdTV, "TextView");
        errorV.appendChild(sss);

        let txtErr = editTextParam("Error message text ", 120, p.componParam.errorTxt, "changeErrotTxtTV");
        txtErr.style.marginLeft = "10px";
        errorV.appendChild(txtErr);
        contentAttributes.appendChild(errorV);
        
        
        
        let acceptN = editTextParam("Accept notification", 80, p.componParam.acceptNotif, "acceptNotifTV");
        acceptN.style.marginTop = "5px";
        acceptN.style.clear = "both";
        contentAttributes.appendChild(acceptN);
        
        let grammar = editTextParam("Grammar", 150, p.componParam.grammar, "grammarTV");
        grammar.style.marginTop = "5px";
        grammar.style.clear = "both";
        contentAttributes.appendChild(grammar);
        
        let space = editCheckbox("Space if zero", p.componParam.spaceZero, "grammarSpaceIfZero");
        space.style.marginTop = "5px";
        space.style.marginLeft = "10px";
        contentAttributes.appendChild(space);

        setTextViewAttr(p);
    }
    
    this.viewElementUI = function(p, el) {
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
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.bu23sw3ieotq";
    }
    
    this.checkFormResourseText = function(el) {
        let p = currentElement.android;
        p.formResourse = checkElement(el);
        if (p.formResourse && (p.viewId == null || p.viewId.length == 0)) {
            this.maxId = 0;
            this.maxNumId(currentChildren, "txt");
            p.viewId = "txt_" + (this.maxId + 1);
            el_id_input.value = p.viewId;
            let item_name = p.itemNav.querySelector('.item-name');
            item_name.innerHTML = p.viewId + ': ' + p.type;
        }
    }
    
    this.maxNumId = function(ch, type) {
        let ik = ch.length;
        for (let i = 0; i < ik; i++) {
            let item = ch[i];
            let vId = item.viewId;
            if (vId != null && vId.length > 0) {
                let arr = vId.split("_");
                if (arr.length == 2 && arr[0] == type) {
                    let num = parseInt(arr[1]);
                    if (num != NaN && num > this.maxId) {
                        this.maxId = num;
                    }
                }
            }
            if (item.children != null && item.children.length > 0) {
                this.maxNumId(item.children, type);
            }
        }
    }
}

function setTextViewAttr(p) {
    if (p.textColor == null || p.textColor == "") {
        text_color.style.backgroundColor = "#808080";
    } else {
        text_color.style.backgroundColor = findColorByIndex(p.textColor);
    }
}

function inputTextValue(e, el) {
    var elText = currentElement.getElementsByClassName('text')[0];
    elText.innerHTML = el.value;
    currentElement.android.text = el.value;
    viewCompon();
}

function setSizeTV(vv) {
    let res = vv;
    if (vv.tagName == "INPUT") {
        res = vv.value;
    }
    currentElement.android.textSize = res;
    viewCompon();
}

function setLineSpacTV(vv) {
    let res = vv;
    if (vv.tagName == "INPUT") {
        res = vv.value;
    }
    currentElement.android.lineSpac = res;
    viewCompon();
}

function setLetterTV(vv) {
    let res = vv;
    if (vv.tagName == "INPUT") {
        res = vv.value;
    }
    currentElement.android.letterSpac = res;
    viewCompon();
}

function setPickerTextColor() {
    openPickerColor(text_color.style.backgroundColor, setTextColor);
}

function setTextColor (id, color) {
    paramCompon.textColor = id;
    text_color.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function changeFormatTV(el) {
    currentElement.android.componParam.format = el.options[el.selectedIndex].value;
}

function textStyle(el) {
    let p = currentElement.android;
    if (el.style.backgroundColor != "") {
        p.textStyle = 0;
        el.style.backgroundColor = "";
    } else {
        p.textStyle = 1;
        el.style.backgroundColor = fonSel;
    }
    viewCompon();
}

function textWeight(el) {
    let p = currentElement.android;
    if (el.style.backgroundColor != '') {
        p.fontWeight = 0;
        el.style.backgroundColor = "";
    } else {
        p.fontWeight = 1;
        el.style.backgroundColor = fonSel;
    }
    viewCompon();
}

function changeValidTypeTV(el) {
    currentElement.android.componParam.typeValidTV = el.options[el.selectedIndex].value;
    let ee = contentAttributes.getElementsByClassName("errorV")[0];
    if (currentElement.android.componParam.typeValidTV == "no") {
        ee.style.display = "none";
    } else {
        ee.style.display = "block";
    }
    viewCompon();
}

function changeEllipsizeTV(el) {
    currentElement.android.componParam.ellipsize = el.options[el.selectedIndex].value;
}

function changeErrorIdTV(el) {
    currentElement.android.componParam.errorId = el.options[el.selectedIndex].value;
    
}

function changeErrotTxtTV(el) {
    currentElement.android.componParam.errorTxt = el.value;
}

function acceptNotifTV(el) {
    currentElement.android.componParam.acceptNotif = el.value;
}

function grammarTV(el) {
    currentElement.android.componParam.grammar = el.value;
}

function grammarSpaceIfZero(vv) {
    currentElement.android.componParam.spaceZero = vv;
}
/*
function changeSingleLineTV(vv) {
    currentElement.android.componParam.singleLine = vv;
}
*/
function maxLineTV(el) {
    currentElement.android.componParam.maxLine = el.value;
    viewCompon();
}

