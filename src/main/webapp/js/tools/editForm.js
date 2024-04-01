function EditForm(meta, data, domEl, after, cbEdit, marg, margTop, isScreen, margLeft, tag) {
// after = true - Вызвана из EditForm применяется когда при заполнении полей какому нибудь полю нужно также выполнить EditForm, например в навигаторе
    
    if (meta == null || domEl == null || data == null) {
        return null;
    };
    
    this.edData = data;
    this.edMeta = meta;
    this.edDomEl = domEl;
    this.cb = cbEdit;
    this.list;
    this.windDataStyle;
    this.contWind;
    this.marg_L;
    this.marg_T;
//    let fonSel = "#deeaff";
    
    this.makeEditForm = function() {
        let ik = this.edMeta.length;
        if (marg) {
            if (margTop != null && margTop > 0) {
                this.marg_T = "margin-top:" + margTop + "px;";
            } else {
               this.marg_T = "";
            }
            if (margLeft != null && margLeft > 0) {
                this.marg_L = "margin-left:" + margLeft + "px;";
            } else {
               this.marg_L = "";
            }
//            this.marg_L = "";
        } else {
            this.marg_T = "margin-top:5px;";
            this.marg_L = "margin-left:7px;";
        }
        let isFocus = false;
        for (let i = 0; i < ik; i++) {
            let met = this.edMeta[i];
            if (met.visibility == null || (isScreen && met.visibility)) {
                let ff = this.oneField(i);
                if (ff != null) {
                    this.edDomEl.append(ff);
                }
                if (met.type == "Line" ) {
                    if (marg) {
                        if (margTop != null && margTop > 0) {
                            this.marg_T = "margin-top:" + margTop + "px;";
                        } else {
                           this.marg_T = "";
                        }
                        if (margLeft != null && margLeft > 0) {
                            this.marg_L = "margin-left:" + margLeft + "px;";
                        } else {
                           this.marg_L = "";
                        }
//                        this.marg_L = "";
                    } else {
                        this.marg_T = "margin-top:5px;";
                        this.marg_L = "margin-left:7px;";
                    }
                } else {
                    if (marg) {
                        this.marg_L = "margin-left:10px;";
                    } else {
                        this.marg_L = "margin-left:7px;";
                    }
                }
                if (met.type == "Text" && ! isFocus) {
                    let elInp = ff.querySelector("input");
                    elInp.focus();
                    isFocus = true;
                }
            }
        }
    }
    
    this.getView = function(name) {
        let ch = this.edDomEl.children;
        let ik = ch.length;
        for (let i = 0; i < ik; i++) {
            let item = ch[i];
            if (item.nameField == name) {
                return item;
            }
        }
        return null;
    }
    
    this.isValid = function() {
        let ik = this.edMeta.length;
        let arrValid;
        let valid;
        let nameVal;
        for (let i = 0; i < ik; i++) {
            let met = this.edMeta[i];
            if (met.validSend != null && met.validSend.length > 0) {
                arrValid = met.validSend.split(" ");
                let jk = arrValid.length; 
                for (let j = 0; j < jk; j++) {
                    nameVal = arrValid[j].split("=");
                    let res = this.isOneValid(nameVal[0], nameVal[1], met);
                    if (res.length > 0) {
                        return res;
                    }
                }
            }
        }
        return "";
    }
    
    this.isOneValid = function(nameV, valueV, met) {
        let valueField = this.edData[met.name];
        let intV;
        let ik;
        switch (nameV) {
            case "notEmpty":
                if (valueField == null || valueField.length == 0) {
                    return "Field " + met.title + " must be filled";
                }
                break;
            case "minLen":
                intV = parseInt(valueV);
                if (valueField == null || valueField.length < intV) {
                    return "Field " + met.title + " must have at least " + intV + " characters";
                }
                break;
            case "len":
                intV = parseInt(valueV);
                if (valueField == null || valueField.length != intV) {
                    return "Field " + met.title + " must contain " + intV + " characters";
                }
                break;
            case "pass":
                ik = valueV.length;
                for (let i = 0; i < ik; i++) {
                    let c = valueV.charAt(i);
                    switch (c) {
                        case 'a':
                            if ( ! this.inDiapason(valueField, 97, 122)) {
                                return "Field " + met.title + " must contain at least one small letter";
                            }
                        case 'A':
                            if ( ! this.inDiapason(valueField, 65, 90)) {
                                return "Field " + met.title + " must contain at least one capital letter";
                            }
                        case '0':
                            if ( ! this.inDiapason(valueField, 48, 57)) {
                                return "Field " + met.title + " must contain at least one number";
                            }
                        case '@':
                            if ( ! this.inDiapason(valueField, 32, 47)) {
                                return "Field " + met.title + " must contain at least one special character";
                            }
                    }
                    
                }
                break;
            case "email":
                let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if ( ! reg.test(valueField)) {
                   return "Field " + met.title + " incorrect email";
                }
                break;
            case "number":
                ik = valueField.length;
                for (let i = 0; i <ik; i++) {
                    let c = valueField[i];
                    if ( c < "0" || c > "9") {
                        return "Field " + met.title + " must contain only numbers";
                    }
                }
                break;
        }
        return "";
    };
    
    this.inDiapason = function(st, min, max) {
        let ik = st.length;
        for (let i = 0; i <ik; i++) {
            let c = st.charCodeAt(i);
            if ( c >= min && c <= max) {
                return true;
            }
        }
        return false;
    };
    
    this.oneField = function(i) {
        let met = this.edMeta[i];
        let br = "";
        this.marg_T = "";
        this.marg_L = "";
        if (marg) {
            if (margTop != null && margTop > 0) {
                this.marg_T = "margin-top:" + margTop + "px;";
            } else {
               this.marg_T = "";
            }
            if (margLeft != null && margLeft > 0) {
                this.marg_L = "margin-left:" + margLeft + "px;";
            } else {
               this.marg_L = "";
            }
//            this.marg_L = "";
        } else {
            this.marg_T = "margin-top:5px;";
            this.marg_L = "margin-left:7px;";
        }
        if (met.br) {
            br = "clear:both;";
//            this.marg_L = "";
        }
        if (met.margL != null) {
            this.marg_L = "margin-left:" + met.margL + "px;";
        }
        if (met.margT != null) {
            this.marg_T = "margin-top:" + met.margT + "px;";
        }
        let clazz = "";
        if (met.clazz != null && met.clazz.length > 0) {
            clazz = ' class="' + met.clazz + '"';
        }
        let marg_R = "";
        if (met.margR != null && met.margR > 0) {
            marg_R = "margin-right:" + met.margR + "px";
        }
        let flo;
        if (met.float == "right") {
            flo = "float:right;";
        } else {
            flo = "float:left;" + this.marg_L;
        }
        let res = newDOMelement('<div' + clazz + ' style="position:relative;' + flo + marg_R + this.marg_T + br + '"></div>');
        if (met.tLocation == null) {
            res.append(newDOMelement('<div style="color: #8199A5;font-size: 10px;">' + met.title + '</div>'));
        }
        let inp;
        let vv = this.edData[met.name];
        if (vv == null) {
            vv = "";
        }
        let wh;
        switch (met.type) {
            case "Text":
            case "Password":
            case "Email":
                let ww;
                if (met.len == -1) {
                    ww = "100%;box-sizing: border-box";
                    res.style.width = "100%";
                } else {
                    ww = met.len + "px";
                }
                let type_inp = met.type.toLowerCase();
                let autoCompl = "";
                if (met.type == "Password") {
                    autoCompl = ' autocomplete="new-password" ';
                }
                inp = newDOMelement('<input class="input_style" type=' + type_inp + autoCompl + ' style="width:' + ww+ ';" value="' + vv + '"/>');
                inp.nameField = met.name;
//                inp.addEventListener('keydown', () => {thi7s.clickText(event, met.valid)}, false);
//                inp.addEventListener('keyup', () => {this.clickTextUp(event)}, false);
                inp.addEventListener('input', () => {this.inputText(event, met)});
                res.append(inp);
                if (met.clear) {
                    let cl = newDOMelement('<img src="img/del_red.png" style="position:absolute;cursor:pointer;right:2px;top:19px;width:12px;height:12px;">');
                    res.append(cl);
                    cl.addEventListener('click', () => {inp.value = ""; this.edData[met.name] = ""}, false);
                }
                break;
            case "Navig":
                if (after) {
                    return null;
                } else {
                    res = newDOMelement('<div style="float:left;margin-left:7px;clear:both;margin-top:15px;padding-left:10px;padding-right:10px;height:30px;background-color:#1DACE9;' 
                            +'border-radius:4px;cursor:pointer;"><div style="text-align: center;margin-top:7px;color:#fff">' + met.title + '</div></div>');
                    res.addEventListener('click', () => {this.clickAfter(event, met)}, false);
                }
                break;
            case "SignUp":
            case "SignIn":
            case "Send":
            case "EditProfile":
                res = newDOMelement('<div style="float:left;margin-left:7px;clear:both;margin-top:15px;padding-left:10px;padding-right:10px;height:30px;background-color:#1DACE9;' 
                        +'border-radius:4px;cursor:pointer;"><div style="text-align: center;margin-top:7px;color:#fff">' + met.title + '</div></div>');
                res.addEventListener('click', () => {this.clickSend(event, met)}, false);
                break;
            case "Delete":
                res = newDOMelement('<div style="float:left;margin-left:7px;clear:both;margin-top:15px;padding-left:10px;padding-right:10px;height:30px;background-color:#1DACE9;' 
                        +'border-radius:4px;cursor:pointer;"><div style="text-align: center;margin-top:7px;color:#fff">' + met.title + '</div></div>');
                res.addEventListener('click', () => {this.clickDelete(event, met)}, false);
                break;
            case "Label":
                let fs = "";
                if (met.fontS != null) {
                    fs = "font-size=" + met.fontS + "px;";
                }
                res = newDOMelement('<div style="float:left;margin-left:3px;clear:both;color:#000;' + fs + '">' + met.title + '</div>');
                break;
            case "Line":
                res = newDOMelement('<div style="float: left;clear:both;height:1px;border-bottom:1px solid #1DACEf;width:100%;margin-top:3px;margin-bottom:3px"></div>');
                break;
            case "ImgLabel":
                wh = "20";
                if (met.len != null) {
                    wh = met.len;
                }
                res.innerHTML = "";
                inp = newDOMelement('<img style="margin-top:14px;" width="' + wh + '" height="' + wh + '" src="' + met.src + '">');
                res.append(inp);
                res.name = met.name;
                break;
            case "FileToStr":
                let widt = "";
                if (met.len != null) {
                    widt = ' style="width:' + met.len + 'px;"';
                }
                res.innerHTML = "";
                inp = newDOMelement('<div class="button_blue"' + widt + '>'
                    +'<div style="text-align:center;margin-left:7px;margin-right:7px;margin-top:7px;color:#fff;">' + met.title + '</div>'+'</div>');
                inp.style.marginLeft = "0px";
                inp.style.marginTop = "13px";
                let inputFile = newDOMelement('<input type="file" accept=".json" style="display: none"/>');
                res.append(inputFile);
                inp.addEventListener("click", function(){inputFile.click();}, true);
                inputFile.addEventListener("change", () => {this.processFiles(inputFile, met);}, true);
                res.append(inp);
                break;
            case "SelectId":
                inp = newDOMelement('<select class = "select_' + browser + '">');
                inp.nameField = met.name;
                inp.addEventListener('focus', () => {this.focusSelId(inp, met.tags, vv, met.firstEl);}, true);
                inp.addEventListener('change', () => {this.changeSelId(inp, met)}, true);
                inp.innerHTML = newOptionsTypeUI(met.tags, vv, met.firstEl);
                res.append(inp);
                break;
            case "SelectMyOptions":
                inp = newDOMelement('<select class = "select_' + browser + '">');
                inp.nameField = met.name;
//                inp.addEventListener('focus', () => {this.focusSelId(inp, met.tags, vv, met.firstEl)}, true);
                inp.addEventListener('change', () => {this.changeSelId(inp, met);}, true);
                let stOprions = "";
                if (this.cb != null) {
                    if (this.cb.cbEdit != null) {
                        stOprions = this.cb.cbEdit(met.name, tag, true);
                    } else {
                        stOprions = this.cb(met.name, tag, true);
                    }
                }
                inp.innerHTML = formOptionsSelUI(stOprions, vv);
                res.append(inp);
                break;
            case "SelectIdTags":
                inp = newDOMelement('<select class = "select_' + browser + '">');
                inp.nameField = met.name;
                inp.addEventListener('focus', () => {this.focusSelIdTags(inp, met.tags, vv)}, true);
                inp.addEventListener('change', () => {this.changeSelIdTags(inp, met)}, true);
                inp.innerHTML = newOptionsTagsUI(met.tags, vv);
                res.append(inp);
                break;
            case "SelectIdUX":
                inp = formSelectIdHandlUx(vv);
                inp.style.cssText = "width:100px;font-size:12px;color:#110000;";
                inp.className = 'select_' + browser;
                inp.nameField = met.name;
                inp.addEventListener("change", () => {this.changeSelId(inp, met);}, false);
                res.append(inp);
                break;
            case "SelectTypeUX":
            
                break;
            case "SelectPush":
                inp = newDOMelement('<select class = "select_' + browser + '">');
                inp.nameField = met.name;
                inp.innerHTML = formOptionsSelUI(pushNotif.listPushNameSt(), vv);
                if (vv == null || vv.length == 0) {
                    this.changeSelPush(inp, met);
                }
                inp.addEventListener('change', () => {this.changeSelPush(inp, met);}, true);
                res.append(inp);
                break;
            case "MultiCheck":
                if (met.value != null) {
                    inp = newDOMelement('<div style="width:' + met.len 
                            +'px;height:28px;border: 1px solid #bbd4ef;border-radius:5px;position:relative;background-color:#fff;overflow-x:hidden">'
                            +'<div style="position:absolute;top:6px;left:4px;font-size:13px;">' + vv + '</div>'
                            +'<img src="img/chevron_down.png" style="position:absolute;right:1px;top:2px;width:31px;height:26px;background-color:#fff">'
                            +'</div>');
                    inp.addEventListener("click", () => {this.multiCheck(inp, met)}, false);
                } else {
                    if (met.src != null && met.src != "") {
                        inp = newDOMelement('<img width="20" height="20" src="' + met.src + '" style="margin-top:4px;margin-left:5px;cursor:pointer;">');
                        inp.addEventListener("click", () => {this.clickMultiCheck(inp, met);}, false);
                    }
                }
                res.append(inp);
                break;
            case "Select":
                inp = formSelectForEditData(met.value, vv);
                inp.style.cssText = "font-size:12px;color:#110000;";
                if (met.len != null) {
                    inp.style.width = met.len + "px";
                }
                inp.className = 'select_' + browser;
                inp.nameField = met.name;
                inp.addEventListener("change", () => {this.changeSelId(inp, met)}, false);
                res.append(inp);
                break;
            case "Tables":
                inp = selectTable(vv);
                inp.style.cssText = "font-size:12px;color:#110000;";
                if (met.len != null) {
                    inp.style.width = met.len + "px";
                }
                inp.className = 'select_' + browser;
                inp.nameField = met.name;
                inp.addEventListener("change", () => {this.changeSelTab(inp, met);}, false);
                res.append(inp);
                if (vv == null || vv.length == 0) {
                    this.changeSelTab(inp, met);
                }
                break;
            case "Color":
                if (vv == "") {
                    vv = "0";
                }
                inp = this.formEditColor(met.name, vv);
                inp.nameField = met.name;
                inp.viewEl = true;
                inp.cb = this;
                inp.addEventListener("click", () => {setPikEditFormColor(inp)}, false);
                res.append(inp);
                break;
            case "Choose":
                inp = newDOMelement('<div style="width:60px;height:28px;background-color:#1DACE9;float:left;' 
                        +'border-radius:4px;cursor:pointer;"><div style="text-align: center;margin-top:5px;color:#fff">Choose</div></div>');
                inp.addEventListener('click', () => {this.cb.clickChoose(inp, met);}, false);
                inp.nameField = met.name;
                res.append(inp);
                break;
            case "ClickLab":
                wh = 16;
                if (met.wh != null && met.wh > 0) {
                    wh = met.wh;
                }
                let topClick = 26 - wh / 2;
                inp = newDOMelement('<img style="float:left;margin-top:' + topClick + 'px;" width="' + wh + '" height="' + wh + '" src="' + met.img + '">');
                let colorLab = "";
                if (met.color != null && met.color.length > 0) {
                    colorLab = "color:" + met.color + ";";
                }
                let lab = newDOMelement('<div style="float:left;margin-top:18px;margin-left:7px;' + colorLab + '">' + met.title + '</div>');
                res.addEventListener("click", () => {this.clickClick(met)}, false);
                res.style.cursor = "pointer";
                res.append(inp);
                res.append(lab);
                break;
            case "ButtonB":
                res = createButtonBlue(met.title, met.len);
                res.addEventListener("click", () => {this.clickButton(met)});
                if (met.br) {
                    res.style.clear = "both";
                }
                break;
            case "Check":
                if (vv == "") {
                    vv = false;
                }
                let valCh = "check-act";
                if (vv) {
                    valCh = "check-sel_1";
                }
                inp = newDOMelement('<img style="cursor:pointer;margin-top:5px;margin-left:8px" width="16" height="16" src="img/' + valCh + '.png">');
                inp.nameField = met.name;
                inp.addEventListener("click", () => {this.clickCheckbox(this.checkEditCheckbox(inp), inp)}, false);
                res.append(inp);
                break;
            case "Textarea":
                inp = newDOMelement('<textarea style="width:100%;border:1px solid #C5DCFA;box-sizing: border-box;border-radius: 8px;" rows="' 
                        + met.rows + '">' + vv + '</textarea>');
                inp.nameField = met.name;
                inp.addEventListener('keyup', () => {this.clickTextAreaUp(inp)}, false);
                res.style.marginLeft = "";
                res.style.width = "100%";
                res.append(inp);
                break;
            case "SelBlock":
                inp = this.selectBlock(met, "setEditFormSelectBlock");
                setValueSelectBlock(inp, String(vv));
                inp.nameField = met.name;
                inp.cb = this;
                res.append(inp);
                break;
            case "Litera":
                if (vv == "") {
                    vv = 0;
                }
                let bg = "";
                if (vv == 1) {
                    bg = "background-color:" + fonSel +";";
                }
                let it = "";
                if (met.italic) {
                    it = 'font-style:italic;';
                }
                inp = newDOMelement('<div class="font_sel" style="font-weight:bold;' + bg + it + '">' + met.litera + '</div>');
                inp.nameField = met.name;
                inp.addEventListener("click", () => {this.clickLitera(inp)}, false);
                res.append(inp);
                break;
            case "Number":

                break;
            case "Click":
                inp = newDOMelement('<img class="imageV" style="margin-top:3px;cursor:pointer;" width="24" height="24" src="' 
                        + met.img + '">');
                res.addEventListener("click", () => {this.clickCustom(met.name)}, false);
                res.append(inp);
                break;
            case "Img":
                inp = newDOMelement('<img class="imageV" style="border:2px solid #bdf;border-radius:4px;background:#fff;cursor:pointer;" width="24" height="24" src="' 
                        + vv + '">');
                inp.addEventListener("click", () => {selectListImage(event, this, met.name)}, false);
                res.append(inp);
                break;
            case "ImgChess":
                inp = newDOMelement('<div style="width:34px;height:34px;position:relative;">'
                    +'<img style="position:absolute;bottom:0px;left:0px;border:2px solid #bdf;border-radius:4px" width="30" height="30" src="img/chess_2.png">'
                    +'<img class="img_back" style="position:absolute;cursor:pointer;bottom:6px;left:6px" width="20" height="20" src="' + vv + '">'
                    +'</div>'
                );
                let imgB = inp.querySelector(".img_back");
                imgB.addEventListener("click", () => {selectListImage(event, this, met.name)}, false);
                res.append(inp);
                break;
            case "ListCheck":
                inp = newDOMelement('<div style="width:' + met.len + 'px;height:' + met.height + 'px;position:relative;">');
                formViewScrolY(inp, true);
                res.name = met.name;
                res.inp = inp;
                inp.vv = vv;
                inp.nameField = met.name;
                res.func = "formListCheck";
                if (met.form != null && met.form.length > 0) {
                    this.formListCheck(inp, met.form);
                } else {
                    let mk = this.edMeta.length;
                    for (let m = 0; m < mk; m++) {
                        let itMet = this.edMeta[m];
                        if (itMet.event == met.name) {
                            let vvV = this.edData[itMet.name];
                            if (vvV != null && vvV.length > 0) {
                                this.formListCheck(inp, vvV);
                            }
                        }
                    }
                }
                res.append(inp);
                break;
        }
        res.nameField = met.name;
        return res;
    };
    
    this.setVisibilityValue = function(name, value) {
        let ch = this.edDomEl.children;
        let ik = ch.length;
        for (let i = 0; i < ik; i++) {
            let item = ch[i];
            if (item.name == name) {
                if (value) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
                break;
            }
        }
    };
    
    this.setVisibility = function(nameF, nameV) {
        let fF = this.getField(nameF);
        let vv = this.edData[nameV];
        if (vv != null && vv.length > 0) {
            fF.style.display = "block";
        } else {
            fF.style.display = "none";
        }
    };
    
    this.getField = function(name) {
        let ch = this.edDomEl.children;
        let ik = ch.length;
        for (let i = 0; i < ik; i++) {
            let item = ch[i];
            if (item.name == name) {
                return item;
            }
        }
    };
    
    this.clickClick = function(met) {
        if (this.cb != null) {
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(met.name, tag);
            } else {
                this.cb(met.name, tag);
            }
        }
    };
    
    this.clickButton = function(met) {
        if (this.cb != null) {
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(met.name, tag);
            } else {
                this.cb(met.name, tag);
            }
        }
    }
    
    this.processFiles = function(inputFile, met) {
        let file = inputFile.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            this.edData[met.name] = e.target.result;
            if (this.cb != null) {
                if (this.cb.cbEdit != null) {
                    this.cb.cbEdit(met.name, tag);
                } else {
                    this.cb(met.name, tag);
                }
            }
        };
        reader.readAsText(file);
    }
    
    this.formListCheck = function(inp, val) {
//        inp.innerHTML = val;
        let dataV = inp.querySelector(".viewData");
        if (val.trim() == "") {
            dataV.innerHTML = "";
            return;
        }
        let elSEl = choiceViewById(currentChildren, val);
        let list = " " + formIdTagsNoUXGroup(elSEl.children, this.edMeta[1].tags);
//        let list = " " + formIdTagsNoUXGroup(elSEl.children, this.edMeta[i].tags);
        let arr = list.split(",");
        let ik = arr.length;
        let vv = this.edData[inp.nameField];
        if (vv == null) {
            vv = "";
        }
        vv = "," + vv + ",";
        for (let i = 1; i < ik; i++) {
            let oneCheck = newDOMelement('<div style="width:100%;height:30px"></div>');
            let srcVV = "check-act";
            let nam = arr[i];
            if (vv.indexOf("," + nam + ",") > -1) {
                srcVV = "check-sel_1";
            }
            let selField = newDOMelement('<img class="sel_img" style="float:left;margin-top:6px;width:18px;cursor:pointer;height:18px;" src="img/' + srcVV + '.png">');
            selField.addEventListener('click', () => {this.clickListCheck(inp, oneCheck)}, false);
            oneCheck.append(selField);
            oneCheck.append(newDOMelement('<div class="d_name" style="float:left;margin-top:6px;margin-left:5px;">' + nam + '</div>'));
            dataV.append(oneCheck);
        }
        let viewPort = inp.querySelector(".viewport");
        viewPort.scroll_y.resize();
    }
    
    this.clickListCheck = function(inp, el) {
        let ch = el.querySelector('.sel_img');
        checkElement(ch);
        let st = "";
        let sel = "";
        let dataV = inp.querySelector(".viewData");
        let child = dataV.children;
        let ik = child.length;
        for (let i = 0; i < ik; i++) {
            let item = child[i];
            let ch1 = item.querySelector('.sel_img');
            if (ch1.src.indexOf("check-sel") > -1) {
                let dd = item.querySelector('.d_name');
                st += sel + dd.innerHTML;
                sel = ",";
            }
        }
        this.edData[inp.nameField] = st;
    }
    
    this.callBackEditF = function(i, par) {
        let nn = listImage[i];
        let inp = par.el;
        let name = par.param;
        inp.src = nn;
        this.edData[name] = nn;
        if (this.cb != null) {
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(name, tag);
            } else {
                this.cb(name, tag);
            }
        }
    }
    
    this.clickMultiCheck = function(inp, met) {
        let str = formListIdElem(currentChildren, met.tags).substring(1);
        this.selectMulti(inp, met, str);
    }
    
    this.selectMulti = function(inp, met, str) {
        let ls = str.split(",");
        let ik = ls.length;
        let namEd = this.edData[met.name];
        let selF = "";
        if (namEd != null) {
            selF = namEd.split(",");
        }
        this.contWind = formWind(240, 400, 40, 350, met.title, true, null, "Save", this, "");
        this.contWind.nameField = met.name;
        this.contWind.inpInp = inp;
        for (let i = 0; i < ik; i++) {
            let itemV = this.oneRowMultiCheck(i, ls[i], selF);
            this.contWind.append(itemV);
        }
    }
    
    this.multiCheck = function(inp, met) {
        this.selectMulti(inp, met, met.value);
    }
    
    this.oneRowMultiCheck = function(i, item, selF) {
        let res = newDOMelement('<div style="height:24px;width:100%;display:flex;align-items:center;font-size:14px;"></div>');
        let name = newDOMelement('<div class="name" style="width:120px;margin-left:3px;">' + item + '</div>');
        let selField = newDOMelement('<img class="sel_img" style="width:18px;cursor:pointer;height:18px;" src="img/check-act.png">');
        selField.addEventListener('click', () => {this.selectRowMultiCheck(selField)}, false);
        let jk = selF.length;
        for (let j = 0; j < jk; j++) {
            if (item == selF[j]) {
                checkElement(selField);
                break;
            }
        }
        res.append(name);
        res.append(selField);
        return res;
    }
    
    this.cbWind = function() {
        let ch = this.contWind.children;
        let ik = ch.length;
        let res = "";
        let sep = "";
        for (let i = 0; i < ik; i++) {
            let item = ch[i];
            if (isCheckElement(item.querySelector(".sel_img"))) {
                res += sep + item.querySelector(".name").innerHTML;
                sep = ",";
            }
        }
        let nn = this.contWind.nameField;
        this.edData[nn] = res;
        let inpDiv = this.contWind.inpInp.querySelector("div");
        if (inpDiv != null) {
            inpDiv.innerHTML = res;
        }
        if (this.cb != null) {
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(nn, tag);
            } else {
                this.cb(nn, tag);
            }
        }
    };
    
    this.selectRowMultiCheck = function(el) {
        checkElement(el);
    };
    
    this.selectBlock = function(met, cb) {
        let divSelList = document.createElement('div');
        divSelList.style.float = "left";
        divSelList.className = "divSelList";
        divSelList.innerHTML = newSelListHoriz(met.value, cb);
        let numb = createNumber(50, 24, met.min, met.max, "changeSelectBlockNumb(this);" + cb, met.step);
        numb.style.float = "left";
        numb.className = "numb";
        numb.style.marginLeft = "8px";
        divSelList.appendChild(numb);
        divSelList.appendChild(newDOMelement('<img width="10" height="10" onclick="clearSelectValue(this);' 
                + cb + '(this);" style="margin-left: 7px;margin-top:7px;cursor: pointer;" src="img/del_red.png">'));
        return divSelList;
    };
    
    this.changeSelId = function(el, met) {
        this.edData[el.nameField] = el.options[el.selectedIndex].value;
        if (this.cb != null) {
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(met.name, tag);
            } else {
                this.cb(met.name, tag);
            }
        }
    };
    
    this.changeSelTab = function(el, met) {
        this.edData[el.nameField] = el.options[el.selectedIndex].value;
        if (this.cb != null) {
//            this.cb.cbEdit(el.nameField);
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(met.name, tag, el.selectedIndex);
            } else {
                this.cb(met.name, tag, el.selectedIndex);
            }
        }
    };
    
    this.changeSelPush = function(el, met) {
        this.edData[el.nameField] = el.options[el.selectedIndex].value;
        if (this.cb != null) {
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(met.name, tag);
            } else {
                this.cb(met.name, tag);
            }
        }
    };
    
    this.changeSelIdTags = function(el, met) {
        let val = el.options[el.selectedIndex].value;
        this.edData[el.nameField] = val;
        let ev = met.event;
        if (ev != null && ev.length > 0) {
            let ch = this.edDomEl.children;
            let ik = ch.length;
            for (let i = 0; i < ik; i++) {
                let item = ch[i];
                if (item.name == ev) {
                    this[item.func](item.inp, val);
                }
            }
        }
        if (this.cb != null) {
//            this.cb.cbEdit(el.nameField);
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(met.name, tag);
            } else {
                this.cb(met.name, tag);
            }
        }
    }
    
    this.clickCustom = function(name) {
        if (this.cb != null) {
//            this.cb.cbEdit(name);
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(name, tag);
            } else {
                this.cb(name, tag);
            }
        }
    };
    
    this.focusSelId = function(el, tags, vv, firstEl) {
        el.innerHTML = newOptionsTypeUI(tags, vv, firstEl);
    };
    
    this.focusSelIdTags = function(el, tags, vv) {
        el.innerHTML = newOptionsTagsUI(tags, vv);
    };
    
    this.clickLitera = function (el) {
        if (el.style.backgroundColor != '') {
            this.edData[el.nameField] = 0;
            el.style.backgroundColor = "";
        } else {
            this.edData[el.nameField] = 1;
            el.style.backgroundColor = fonSel;
        }
        if (this.cb != null) {
//            this.cb.cbEdit(el.nameField);
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(el.nameField, tag);
            } else {
                this.cb(el.nameField, tag);
            }
        }
    };
    
    this.clickTextUp = function(event) {
        let el = event.target;
        this.edData[el.nameField] = el.value;
        if (this.cb != null) {
//            this.cb.cbEdit(el.nameField, event);
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(el.nameField, tag);
            } else {
                this.cb(el.nameField, tag);
            }
        }
    }
    
    this.clickTextAreaUp = function(el) {
        this.edData[el.nameField] = el.value;
        if (this.cb != null) {
//            this.cb.cbEdit(el.nameField);
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(el.nameField, tag);
            } else {
                this.cb(el.nameField, tag);
            }
        }
    };
    
    this.inputText = function(event, met) {
//        console.log("edData="+this.edData[met.name]+"<< tag="+event.target.value+"<< selectionStart="+event.target.selectionStart+"<< selectionEnd="+event.target.selectionEnd);
        let valid = met.valid;
        let el = event.target;
        let val = el.value;
        if (valid != null){
            let mes = this.inputValid(val, valid);
            if (mes.length == 0) {
                this.edData[met.name] = val;
                if (this.cb != null) {
                    if (this.cb.cbEdit != null) {
                        this.cb.cbEdit(met.name, tag);
                    } else {
                        this.cb(met.name, tag);
                    }
                }
            } else {
                let vvv = this.edData[met.name];
                if (vvv == null) {
                    vvv = "";
                }
                el.value = vvv;
                tooltipMessage(el, mes);
            }
        } else {
            this.edData[met.name] = val;
            if (this.cb != null) {
                if (this.cb.cbEdit != null) {
                    this.cb.cbEdit(met.name, tag);
                } else {
                    this.cb(met.name, tag);
                }
            }
        }
    }
    
    this.inputValid = function(val, valid) {
        let ik = val.length;
        let kUp;
        switch (valid) {
            case "latin":
                for (let i = 0; i < ik; i++) {
                    kUp = val[i].toUpperCase();
                    if ( ! ((kUp >= "A" && kUp <= "Z") || kUp == "_" || (kUp >= "0" && kUp <= "9")))  {
                        return "Only english letters, _ and numbers";
                    } else {
                        if ( i == 0 && kUp >= "0" && kUp <= "9") {
                            return "The first character cannot be a digit";
                        }
                    }
                }
                break;
            case "name_var":
                for (let i = 0; i < ik; i++) {
                    kUp = val[i].toUpperCase();
                    if ( ! ((kUp >= "A" && kUp <= "Z") || kUp == "_" || (kUp >= "0" && kUp <= "9") || kUp == "."))  {
                        return "Only english letters, _ . and numbers";
                    } else {
                        if ( i == 0 && kUp >= "0" && kUp <= "9") {
                            return "The first character cannot be a digit";
                        }
                    }
                }
                break;
            case "name_low":
                for (let i = 0; i < ik; i++) {
                    kUp = val[i]
                    if ( ! ((kUp >= "a" && kUp <= "z") || kUp == "_" || (kUp >= "0" && kUp <= "9")))  {
                        return "English small letters only, _ and numbers";
                    } else {
                        if (i == 0 && kUp >= "0" && kUp <= "9") {
                            return "The first character cannot be a digit";
                        }
                    }
                }
                break;
            case "list_var":
                for (let i = 0; i < ik; i++) {
                    kUp = val[i].toUpperCase();
                    if ( ! ((kUp >= "A" && kUp <= "Z") || kUp == "_" || kUp == "," || (kUp >= "0" && kUp <= "9")))  {
                        return "Only english letters, _ and numbers";
                    } else {
                        if (targ.value.length == 0 ) {
                            if ((kUp >= "0" && kUp <= "9") || kUp == ',') {
                                return "The first character cannot be a digit";
                            }
                        } else {
                            if ( i == 0 && ((kUp >= "0" && kUp <= "9") || kUp == ',')) {
                                return "The first character cannot be a digit";
                            }
                        }
                    }
                }
                break;
            case "number":
                for (let i = 0; i < ik; i++) {
                    kUp = val[i];
                    if (kUp < "0" || kUp > "9") {
                        return "Only numbers";
                    }
                }
                break;
            case "float":
                for (let i = 0; i < ik; i++) {
                    kUp = val[i];
                    if ((kUp >= "0"  && kUp <= "9") || kUp == "-" || kUp == ".") {
                        if (kUp == "-") {
                            if (i > 0) {
                                return "Minus not at the beginning";                            }
                        } else if (kUp == ".") {
                            if (val.indexOf(".") > -1) {
                                return "The point is already there";
                            }
                        }
                    } else {
                        return "The point is already there";
                    }
                }
                break;
            case "password":
                for (let i = 0; i < ik; i++) {
                    kUp = val[i].toUpperCase();
                    if ( ! ((kUp >= "A" && kUp <= "Z") || (kUp >= " " && kUp <= "/") || (kUp >= "0" && kUp <= "9")))  {
                        return "Only english letters, numbers and special character";
                    }
                }
                break;
        }
        return "";
    }
/*
    this.whatPasted = function(inp, met) {
        let vDat = this.edData[met.name];
        let vField = inp.value;
        let nDat = 0;
        if (vDat != null) {
            nDat = vDat.length;
        }
        let nField = vField.length;
        let sel = inp.selectionStart;
        let nEvInp = nField - nDat;
        let vEvInp = vField.substring(sel - nEvInp, sel);
        let beforeInsertion = vField.substring(0, sel - nEvInp);
console.log("whatPasted="+vEvInp+"<< beforeInsertion="+beforeInsertion+"<<");
        if (vEvInp.length > 1) {
            this.edData[met.name] = beforeInsertion;
            inp.value = beforeInsertion;
        }
    }
*/           
/*                                                                           
    this.clickText = function(event, valid) {
console.log("clickText event.key="+event.key+"<< selectionStart="+event.target.selectionStart);
        let k = event.key;
        if (k == "ArrowRight" || k == "ArrowLeft" || k == "Tab" || k == "ShiftKey" || k == "Insert"
            || k == "Home" || k == "End" || k == "Backspace" || k == "Delete" || k == "Shift") {
            return true;
        }
        } 
    }

    this.clickTextDop = function(targ, k, KC, valid, event) {
        let kUp = k.toUpperCase();
        switch (valid) {
            case "latin":
//                kUp = event.key.toUpperCase();
//                targ = event.target;
                if ( ! ((kUp >= "A" && kUp <= "Z") || kUp == "_" || (kUp >= "0" && kUp <= "9")))  {
                    this.preventAndMess(event, targ, "Only english letters, _ and numbers");
//                    event.preventDefault();
//                    tooltipMessage(targ, "Only english letters, _ and numbers");
                } else {
                    if ( targ.selectionStart == 0 && k >= "0" && k <= "9") {
                        this.preventAndMess(event, targ, "The first character cannot be a digit");
//                        event.preventDefault();
//                        tooltipMessage(targ, "The first character cannot be a digit");
                    }
                }
                break;
            case "name_low":
//                targ = event.target;
                if ( ! ((k >= "a" && k <= "z") || k == "_" || (k >= "0" && k <= "9")))  {
                    this.preventAndMess(event, targ, "English small letters only, _ and numbers");
//                    event.preventDefault();
//                    tooltipMessage(targ, "English small letters only, _ and numbers");
                } else {
                    if (targ.value.length == 0 && k >= "0" && k <= "9") {
                        this.preventAndMess(event, targ, "The first character cannot be a digit");
//                        event.preventDefault();
//                        tooltipMessage(targ, "The first character cannot be a digit");
                    }
                }
                break;
            case "list_var":
//                targ = event.target;
//                kUp = event.key.toUpperCase();
                if ( ! ((kUp >= "A" && kUp <= "Z") || kUp == "_" || kUp == "," || (kUp >= "0" && kUp <= "9")))  {
                    this.preventAndMess(event, targ, "Only english letters, _ and numbers");
//                    event.preventDefault();
//                    tooltipMessage(targ, "Только английские буквы, _ и цифры");
                } else {
                    if (targ.value.length == 0 ) {
                        if ((k >= "0" && k <= "9") || k == ',') {
                            this.preventAndMess(event, targ, "The first character cannot be a digit");
//                            event.preventDefault();
//                            tooltipMessage(targ, "The first character cannot be a digit");
                        }
                    } else {
                        if ( targ.selectionStart == 0 && ((k >= "0" && k <= "9") || k == ',')) {
                            this.preventAndMess(event, targ, "The first character cannot be a digit");
//                            event.preventDefault();
//                            tooltipMessage(targ, "The first character cannot be a digit");
                        }
                    }
                }
                break;
            case "number":
//                kUp = event.key;
                if (k < "0" || k > "9") {
                    this.preventAndMess(event, targ, "Only numbers");
//                    event.preventDefault();
//                    tooltipMessage(event.currentTarget, "Only numbers");
                }
                break;
            case "float":
//                kC = event.keyCode;
                if ((kC > 47 && kC < 58) || kC == 173 || k == ".") {
                    if (kC == 173) {
                        if (event.target.selectionStart > 0) {
                            this.preventAndMess(event, targ, "Minus not at the beginning");
//                            event.preventDefault();
//                            tooltipMessage(event.target, "Minus not at the beginning");
                            return false;
                        }
                    } else if (k == ".") {
                        let vv = event.target.value;
                        if (vv.indexOf(".") > -1) {
                            this.preventAndMess(event, targ, "The point is already there");
//                            event.preventDefault();
//                            tooltipMessage(event.target, "The point is already there");
                            return false;
                        }
                    }
                    return true;
                } else {
                    this.preventAndMess(event, targ, "Only numbers, sign and dot");
                    return false;
                }
                break;
            case "password":
//                kUp = event.key.toUpperCase();
//                targ = event.target;
                if ( ! ((kUp >= "A" && kUp <= "Z") || (kUp >= " " && kUp <= "/") || (kUp >= "0" && kUp <= "9")))  {
                    this.preventAndMess(event, targ, "Only english letters, numbers and special character");
                }
                break;
        }
    }
*/
    this.preventAndMess = function(event, targ, mes) {
        if (event != null) {
            event.preventDefault();
            tooltipMessage(targ, mes);
        }
    }
    
    this.formEditColor = function(name, vv) {
        let colorHTML3 = '<div style="cursor: pointer; width: 30px; height: 30px; float: left;border: 1px solid #bbd4ef;border-radius:5px;background-color:';
        let colorHTML4 = '"></div>';
        let el = newDOMelement(colorHTML3 + findColorByIndex(vv) + colorHTML4);
        return el;
    }
    
    this.setColor = function(el, id, color) {
        this.edData[el.nameField] = id;
        el.style.backgroundColor = color;
        if (this.cb != null) {
//            this.cb.cbEdit(el.nameField);
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(el.nameField, tag);
            } else {
                this.cb(el.nameField, tag);
            }
        }
    };
    
    this.setSelectBlock = function(el, vv) {
        this.edData[el.nameField] = vv;
        if (this.cb != null) {
//            this.cb.cbEdit(el.nameField);
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(el.nameField, tag);
            } else {
                this.cb(el.nameField, tag);
            }
        }
    };
    
    this.clickAfter = function(event, met) {
        let name = met.name;
        let nnn = new FormNavigator();
        if (this.edData[name] == null || ! this.edData[name]) {
            this.edData[name] = [];
        }
        nnn.init(this.edData[name], met.after, null, null, null, null, 15);
    };
    
    this.clickSend = function(event, met) {
        let name = met.name;
        let crud = new CRUD(this.edData, name, met.type);
    };
    
    this.clickDelete = function(event, met) {
        let name = met.name;
        let crud = new CRUD(this.edData, name, met.type);
    };

    this.clickCheckbox = function(check, el) {
        this.edData[el.nameField] = check;
        if (this.cb != null) {
//            this.cb.cbEdit(el.nameField);
            if (this.cb.cbEdit != null) {
                this.cb.cbEdit(el.nameField, tag);
            } else {
                this.cb(el.nameField, tag);
            }
        }
    };

    this.checkEditCheckbox = function(el) {
        let check = el.src.indexOf("check-sel") == -1;
        if (check) {
            el.src = "img/check-sel_1.png";
        } else {
            el.src = "img/check-act.png";
        }    
        return check;
    }
    
    this.makeEditForm();
}

function setPikEditFormColor(el) {
    openPickerColor(el.style.backgroundColor, setEditFormColor, el);
}

function setEditFormColor(id, color) {
    windSelectColor.style.display = 'none';
    clientElement.cb.setColor(clientElement, id, color);
}

function setEditFormSelectBlock(el) {
    let elD = el.closest(".divSelList");
    if (el.tagName == "INPUT") {
        value = parseInt(el.value);
    } else {
        if (el.tagName == "DIV") {
            value = parseInt(el.innerHTML);
        } else {
            value = 0;
        }
    }
    elD.cb.setSelectBlock(elD, value);
}
