function uiEditText() {
    let inputTypeEd = "text,textCapCharacters,textCapWords,textCapSentences,textMultiLine,textImeMultiLine,textNoSuggestions,textUri,textEmailAddress,textEmailSubject,textShortMessage,textLongMessage,textPersonName,textPostalAddress,textPassword,textVisiblePassword,textWebEditText,textFilter,textPhonetic,number,numberSigned,numberDecimal,phone,datetime,date,time";
    let uiParamView = 
        '<div id="uiParamTextView" style="float:left;width:100%;">'
            +'<div class="text_style_ui" style="float: left;">Value</div>'
            +'<textarea id="text_text_value" style="margin-top: 5px; float:left;clear:both;width:100%;border:1px solid #C5DCFA;box-sizing: border-box;border-radius: 8px;"\n\
                onKeyUp="inputEditTextValue(event, this)" rows="1" cols="27"></textarea>'
            +'<div style="float:left;clear:both;margin-top:8px;">'
                +'<div style="font-size:10px;color:#2228">Show text in APP</div>'
                +'<img class="check_form_res" style="cursor:pointer;margin-top:5px;margin-left:14px" width="16" height="16" src="img/check-act.png">'
            +'</div>'
            +'<div style="float:left;clear:both;margin-top:8px;width:100%;position:relative;height:40px;">'
                +'<div style="position:absolute;left:0;top:0;bottom:0;right:40px">'
                    +'<div class="text_style_ui">Hint</div>'
                    +'<input class="input_style_ui hint_edit" type="text">'
                +'</div>'
                +'<div style="position:absolute;top:0;bottom:0;right:0">'
                    +'<div style="font-size:10px;color:#2228">Animate</div>'
                    +'<img class="check_animate" onclick="checkAnimateEditText(this);" style="cursor:pointer;margin-top:5px;margin-left:14px" width="16" height="16" src="img/check-act.png">'
                +'</div>'
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
            +'<div style="margin-top: 8px;float: left;margin-left:10px;">'
                +'<div class="text_style_ui">Color cursor</div>'
                +'<div id="cursor_color" class="text_sel" onclick="setPickerCursorColor(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
            +'</div>'
            +'<div style="margin-top: 8px;float: left;margin-left:10px;">'
                +'<div class="text_style_ui">Color hint</div>'
                +'<div id="hint_color" class="text_sel" onclick="setPickerHintColor(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
            +'</div>'
            +'<div style="float:left;margin-top:8px;margin-left:10px;">'
                +'<div style="font-size:10px;color:#2228">Underline</div>'
                +'<img class="checkUnderline" onclick="checkUnderline(this);" style="cursor:pointer;margin-top:5px;margin-left:14px" width="16" height="16" src="img/check-act.png">'
            +'</div>'
        +'</div>';

    let meta= [
        {name: "st_2", title:"inputType",len:200,type:"MultiCheck",value:inputTypeEd,br:true},
        {name: "st_3", title:"imeOptions",type:"Select",value:"actionNext,actionDone,none"},
        
        {type:"Line"},
        {title:"Restrictions",len:150,type:"Label"},
        {name: "bool_3", title:"Filled",type:"Check",br:true},
        {name: "bool_4", title:"Email",type:"Check"},
        {name: "st_13", title:"Phone mask",type:"Text",len:110},
        {name: "errorTxt", title:"Error message text",type:"Text",len:120},
        {name: "st_5", title:"fieldLength",type:"Text",len:40,valid:"number",br:true},
        {name: "st_6", title:"minLength",type:"Text",len:40,valid:"number"},
        {name: "st_7", title:"minValue",type:"Text",len:40,valid:"float"},
        {name: "st_8", title:"maxValue",type:"Text",len:40,valid:"float"},
        {name: "bool_5", title:"Password",type:"Check",br:true},
        {name: "st_9", title:"Rule",type:"Text",len:40,valid:"password",clazz:"pass_attr"},
//        {name: "st_10", title:"Show",len:80,type:"SelectId",clazz:"pass_attr",br:true},
//        {name: "st_11", title:"Hide",len:80,type:"SelectId",clazz:"pass_attr"},
        {name: "st_10", title:"Show",len:80,type:"Img",clazz:"pass_attr",br:true},
        {name: "st_11", title:"Hide",len:80,type:"Img"},
        {name: "st_12", title:"Equals",len:80,type:"SelectId",tags:"EditText",clazz:"pass_attr"}
    ]

    this.setElementUI = function(p, newEl, parent) {
        newEl.appendChild(createDivEditText(newEl));
    }
    
    this.newElementUI = function(p) {
        p.text = "";
        p.textSize = 18;
        p.textColor = 12;
        p.letterSpac = '0.0';
        p.componParam = {typeValidTV:"no",errorId:"",errorTxt:"",color_1:3,color_2:21,bool_2:true,bool_1:true};
        return createDivEditText(currentElement);
    }
    
    this.setContent = function(p) {
        if (p.componParam == null) {
            p.componParam = {typeValidTV:"no",errorId:"",errorTxt:"",color_1:3,color_2:21,bool_2:true,bool_1:true};
        }
        contentAttributes.innerHTML = uiParamView;
        let checkRes = contentAttributes.querySelector(".check_form_res");
        checkRes.addEventListener('click', () => {this.checkFormResourseText(checkRes)});
        let txHint = contentAttributes.querySelector(".hint_edit");
        txHint.addEventListener('keyup', () => {this.inputEditTextHint(txHint)});
//        let txHint = contentAttributes.getElementsByClassName("hint_edit")[0];
        if (p.componParam.st_1 != null) {
            txHint.value = p.componParam.st_1;
        } else {
            txHint.value = "";
        }
        if (p.componParam.st_2 == null || p.componParam.st_2.length == 0) {
            p.componParam.st_2 = "text";
        }
        if (p.formResourse != null) {
            let cfr = contentAttributes.getElementsByClassName("check_form_res")[0];
            if (p.formResourse) {
                cfr.src = "img/check-sel_1.png";
            } else {
                cfr.src = "img/check-act.png";
            }
        }
        if (p.componParam.bool_2 != null) {
            let cfr = contentAttributes.getElementsByClassName("checkUnderline")[0];
            if (p.componParam.bool_2 == null) {
                p.componParam.bool_2 = true;
            }
            if (p.componParam.bool_2) {
                cfr.src = "img/check-sel_1.png";
            } else {
                cfr.src = "img/check-act.png";
            }
        }
        if (p.componParam.bool_1 != null) {
            let cfr = contentAttributes.getElementsByClassName("check_animate")[0];
            if (p.componParam.bool_1) {
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
        if (p.componParam.color_1 == null) {
            p.componParam.color_1 = 3;
        }
        cursor_color.style.backgroundColor = findColorByIndex(p.componParam.color_1);
        if (p.componParam.color_2 == null) {
            p.componParam.color_2 = 21;
        }
        hint_color.style.backgroundColor = findColorByIndex(p.componParam.color_2);
        
        let sizeBl = selectBlock("Size", "8,10,12,14,16,18,20,24,28,32", "setSizeTV", 6, 56);
        setValueSelectBlock(sizeBl, p.textSize);
        uiParamTextView.appendChild(sizeBl);
        let spacBl = selectBlock("letterSpacing", "-0.05,-0.02,0.0,0.02,0.05,0.07,0.1", "setLetterTV", -0.05, 0.5, 0.01);
        setValueSelectBlock(spacBl, p.letterSpac);
        uiParamTextView.appendChild(spacBl);
        setTextViewAttr(p);

        let maxLine = editNumberParam("maxLines", 50, 24, 0, 20, "maxLineTV");
        maxLine.style.clear = "both";
        maxLine.style.marginLeft = "";
        maxLine.style.marginTop = "5px";
        if (p.componParam.maxLine == null) {
            p.componParam.maxLine = 1;
        }
        setValueNumber(maxLine, p.componParam.maxLine);
        contentAttributes.appendChild(maxLine);
        
        let lines = editNumberParam("lines", 50, 24, 0, 20, "linesEdit");
        lines.style.marginLeft = "10px";
        lines.style.marginTop = "5px";
        if (p.componParam.lines == null) {
            p.componParam.lines = 1;
        }
        setValueNumber(lines, p.componParam.lines);
        contentAttributes.appendChild(lines);

        let length = editNumber("Length", 50, "lengthEdit");
        if (p.componParam.st_4 == null) {
            p.componParam.st_4 = "";
        }
        setValueNumber(length, p.componParam.st_4);
        contentAttributes.append(length);

        let sss = selectListID("error ID", 80, currentChildren, p.componParam.errorId, changeErrorIdTV, "TextView");
        sss.id = "errorTextId";
        if (p.componParam.bool_1 != null && p.componParam.bool_1) {
            sss.style.display = "none";
        }
        contentAttributes.append(sss);
        new EditForm(meta, p.componParam, contentAttributes, null, this, true);
        this.viewPass(currentElement.android.componParam.bool_5);
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
            divText.style.color = "#333";
        } else {
            divText.style.color = findColorByIndex(p.textColor);
        }
        if (p.letterSpac != null || p.letterSpac != "0.0") {
            divText.style.letterSpacing = p.letterSpac + "em";
        } else {
            divText.style.letterSpacing = "";
        }

        if (p.whatChanges == null) {
            p.whatChanges = "text";
        }
        if (p.whatChanges == "text") {
            if (p.text != null && p.text != "") {
                divText.innerHTML = p.text;
            }
        } else {
            if (p.componParam.st_1 != null && p.componParam.st_1 != "") {
                divText.innerHTML = p.componParam.st_1;
            }
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
    
    this.cbEdit = function(name) {
        switch (name) {
            case "st_13":
                viewCompon();
                break;
            case "bool_5":
                this.viewPass(currentElement.android.componParam.bool_5);
                break;
        }
    }
    
    this.viewPass = function(bb) {
        let bbN;
        if (bb) {
            bbN = "block";
        } else {
            bbN = "none";
        }
        let listV = contentAttributes.getElementsByClassName("pass_attr");
        let ik = listV.length;
        for (let i = 0; i < ik; i++) {
            let v = listV[i];
            v.style.display = bbN;
        }
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.5pv1ovkaeomq";
    }
    
    this.checkFormResourseText = function(el) {
        let p = currentElement.android;
        p.formResourse = checkElement(el);
        if (p.formResourse && (p.viewId == null || p.viewId.length == 0)) {
            this.maxId = 0;
            this.maxNumId(currentChildren, "edit");
            p.viewId = "edit_" + (this.maxId + 1);
            el_id_input.value = p.viewId;
            let item_name = p.itemNav.querySelector('.item-name');
            item_name.innerHTML = p.viewId + ': ' + p.type;
        }
    }
    
    this.inputEditTextHint = function(el) {
        let elText = currentElement.getElementsByClassName('text')[0];
        elText.innerHTML = el.value;
        let p = currentElement.android;
        p.componParam.st_1 = el.value;
        p.whatChanges = "hint";
        if (el.value != null && el.value.length > 0 && (p.viewId == null || p.viewId.length == 0)) {
            this.maxId = 0;
            this.maxNumId(currentChildren, "edit");
            p.viewId = "edit_" + (this.maxId + 1);
            el_id_input.value = p.viewId;
            let item_name = p.itemNav.querySelector('.item-name');
            item_name.innerHTML = p.viewId + ': ' + p.type;
        }
        viewCompon();
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
/*
function inputEditTextHint(e, el) {
    let elText = currentElement.getElementsByClassName('text')[0];
    elText.innerHTML = el.value;
    currentElement.android.componParam.st_1 = el.value;
    currentElement.android.whatChanges = "hint";
    viewCompon();
}
*/
function inputEditTextValue(e, el) {
    var elText = currentElement.getElementsByClassName('text')[0];
    elText.innerHTML = el.value;
    currentElement.android.text = el.value;
    currentElement.android.whatChanges = "text";
    viewCompon();
}

function checkAnimateEditText(el) {
    let cc = checkElement(el);
    currentElement.android.componParam.bool_1 = cc;
    if (cc) {
        errorTextId.style.display = "none";
    } else {
        errorTextId.style.display = "block";
    }
    viewCompon();
}

function setPickerCursorColor() {
    openPickerColor(cursor_color.style.backgroundColor, setCursorColor);
}

function setCursorColor (id, color) {
    currentElement.android.componParam.color_1 = id;
    cursor_color.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function setPickerHintColor() {
    openPickerColor(hint_color.style.backgroundColor, setHintColor);
}

function setHintColor (id, color) {
    currentElement.android.componParam.color_2 = id;
    hint_color.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function checkUnderline(el) {
    currentElement.android.componParam.bool_2 = checkElement(el);
    viewCompon();
}

function changeInputType(el) {
    currentElement.android.componParam.st_2 = el.options[el.selectedIndex].value;
    viewCompon();
}

function changeImeOptions(el) {
    currentElement.android.componParam.st_3 = el.options[el.selectedIndex].value;
}

function linesEdit(el) {
    currentElement.android.componParam.lines = el.value;
    viewCompon();
}

function lengthEdit(el) {
    currentElement.android.componParam.st_4 = el.value;
}

function changeValidEditText(el) {
    currentElement.android.componParam.typeValidTV = el.options[el.selectedIndex].value;
/*
    let ee = contentAttributes.getElementsByClassName("errorV")[0];
    if (currentElement.android.componParam.typeValidTV == "no") {
        ee.style.display = "none";
    } else {
        ee.style.display = "block";
    }
    viewCompon();
*/
}

