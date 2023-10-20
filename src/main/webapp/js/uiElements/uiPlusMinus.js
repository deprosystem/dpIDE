function uiPlusMinus() {
    
    let uiParamView = 
        '<div id="uiParamTextView" style="float:left;margin-top:12px;width:100%;">'
            +'<div class="text_style_ui" style="float: left;">Value</div>'
            +'<textarea id="text_text_value" style="margin-top: 5px; float:left;clear:both;width:100%;border:1px solid #C5DCFA;box-sizing: border-box;border-radius: 8px;"\n\
                onKeyUp="inputEditTextValue(event, this)" rows="3" cols="27"></textarea>'
            +'<div style="float:left;clear:both;margin-top:8px;">'
                +'<div style="font-size:10px;color:#2228">Show text in APP</div>'
                +'<img class="check_form_res" onclick="checkFormResourseText(this);" style="cursor:pointer;margin-top:5px;margin-left:14px" width="16" height="16" src="img/check-act.png">'
            +'</div>'
            +'<div style="float:left;clear:both;margin-top:8px;width:100%">'
                +'<div class="text_style_ui">Hint</div>'
                +'<input class="input_style_ui hint_edit" onKeyUp="inputEditTextHint(event, this)" type="text">'
            +'</div>'
            +'<div style="margin-top: 8px;float: left;clear:both">'
                +'<div class="text_style_ui">Color</div>'
                +'<div id="text_color" class="text_sel" onclick="setPickerTextColor(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
            +'</div>'
            +'<div style="margin-top: 8px;float: left;margin-left:10px;">'
                +'<div class="text_style_ui">Bold</div>'
                +'<div class="font_sel" onclick="textWeight(this)" style="font-weight:bold;">B</div>'
            +'</div>'
            +'<div style="margin-top: 8px;float: left;margin-left:10px;">'
                +'<div class="text_style_ui">Italic</div>'
                +'<div class="font_sel" onclick="textStyle(this)" style="font-style:italic;font-family:serif;font-weight:bolder;margin-top:2px">I</div>'
            +'</div>'
        +'</div>';


    this.setElementUI = function(p, newEl, parent) {
        if (p.componParam == null) {
            p.componParam = {type:18};
        }
        newEl.appendChild(createDivEditText(newEl));
    }
    
    this.newElementUI = function(p) {
        p.text = "";
        p.textSize = 14;
        p.letterSpac = '0.0';
        if (p.componParam == null) {
            p.componParam = {type:18};
        }
        return createDivEditText(currentElement);
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = uiParamView;
        let txHint = contentAttributes.getElementsByClassName("hint_edit")[0];
        if (p.hint != null) {
            txHint.value = p.hint;
        } else {
            txHint.value = "";
        }
        if (p.formResourse != null) {
            let cfr = contentAttributes.getElementsByClassName("check_form_res")[0];
            if (p.formResourse) {
                cfr.src = "img/check-sel_1.png";
            } else {
                cfr.src = "img/check-act.png";
            }
        }
        let txtAr = contentAttributes.getElementsByTagName("textarea")[0];
        if (p.text != null) {
            txtAr.value = p.text;
        } else {
            txtAr.value = "";
        }
        let sizeBl = selectBlock("Size", "8,10,12,14,16,18,20,24,28,32", "setSizeTV", 6, 56);
        setValueSelectBlock(sizeBl, p.textSize);
        uiParamTextView.appendChild(sizeBl);
        
        let spacBl = selectBlock("letterSpacing", "-0.05,-0.02,0.0,0.02,0.05,0.07,0.1", "setLetterTV", -0.05, 0.5, 0.01);
        setValueSelectBlock(spacBl, p.letterSpac);
        uiParamTextView.appendChild(spacBl);

        let sss = selectListID("Result id", 80, currentChildren, p.componParam.resultId, changePM_result);
        sss.style.marginTop = "5px";
        sss.style.clear = "both";
        sss.style.marginLeft = "0";
        contentAttributes.appendChild(sss);
        
        let v_min = editNumberParam("Min", 50, 24, -1000, 1000, "pmMinV");
        v_min.style.clear = "both";
        v_min.style.marginTop = "5px";
        if (p.componParam.minV == null) {
            p.componParam.minV = 0;
        }
        setValueNumber(v_min, p.componParam.minV);
        contentAttributes.appendChild(v_min);
        
        v_min = editNumberParam("Max", 50, 24, -1000, 1000, "pmMaxV");
        v_min.style.marginLeft = "10px";
        v_min.style.marginTop = "5px";
        if (p.componParam.maxV == null) {
            p.componParam.maxV = 100;
        }
        setValueNumber(v_min, p.componParam.maxV);
        contentAttributes.appendChild(v_min);
        
        let ed_r = editCheckbox("No edit", p.componParam.noEdit, "PMnoEdit");
        ed_r.style.marginTop = "5px";
        ed_r.style.marginLeft = "10px";
        contentAttributes.appendChild(ed_r);
        
        setTextViewAttr(p);
    }
    
    this.viewElementUI = function(p, el) {
        let divText = el.getElementsByClassName('text')[0];
        if (divText == null) {
            divText = createDivEditText();
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
        if (p.hint != null && p.hint != "") {
            divText.innerHTML = p.hint;
        }
        if (p.text != null && p.text != "") {
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
}
/*
function changePL_minus(el) {
    currentElement.android.componParam.minusId = el.options[el.selectedIndex].value;
}

function changePL_plus(el) {
    currentElement.android.componParam.plusId = el.options[el.selectedIndex].value;
}
*/
function changePM_result(el) {
    currentElement.android.componParam.resultId = el.options[el.selectedIndex].value;
}

function PMnoEdit(vv) {
    currentElement.android.componParam.noEdit = vv;
    viewCompon();
}

function pmMinV(el) {
    currentElement.android.componParam.minV = el.value;
}

function pmMaxV(el) {
    currentElement.android.componParam.maxV = el.value;
}

