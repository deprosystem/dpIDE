function MultiLingual() {
    let hTitle = 24;
 
    let meta = [
        {name:"value",len:375,type:"No"},
        {name:"valueL",len:390,type:"Text"}
    ];
    
    let metaOptions = [
        {name:"nameLangHeader",title:"Name parameter",len:120,type:"Text"},
        {name:"codeLangInit",title:"Initial language code",len:40,type:"Text"},
        {name:"save",title:"Ok",type:"ButtonB",br:true}
    ];
    
    this.listStr;
    this.listCode;
    this.listLangStr;
    this.contr;
    this.selLang = -1;
    this.Languages;
    
    this.init = function() {
        this.wind = formWind(780, 365, 70, 150, "Multi-language support", null, this, "Ok", this, "", true);
        setHelp(this.wind, "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.e2wdgwn3bkwx");
        this.title = newDOMelement('<div style="height:' + hTitle + 'px;border-bottom:1px solid #1dace9;position:absolute;left:0;top:0;right:0">'
                +'<div style="margin-left: 25px;margin-top: 4px">Original text</div>'
            +'</div>');
        this.wind.append(this.title);
        this.cont = newDOMelement('<div style="position:absolute;top:' + (hTitle + 1) + 'px;left:3px;right:0;bottom:0"></div>')
        this.wind.append(this.cont);
        if (currentProject.languages != null) {
            this.Languages = JSON.parse(currentProject.languages);
            this.listLangStr = this.Languages.listLangStr;
        } else {
            this.Languages = {listLangStr:[]};
            this.listLangStr = this.Languages.listLangStr;
        }
        this.dataWind = this.windContr = this.wind.closest(".dataWindow");
        this.windContr = this.dataWind.querySelector(".footer_wind");
        this.addL = newDOMelement('<div style="position:absolute;top:12px;right:14px;bottom:0;cursor: pointer">'
                    +'<img style="width: 12px;height: 12px;margin-top: 5px;float:left" src="img/add_blue.png"/>'
                    +'<div style="margin-top: 4px;margin-left: 7px;float:left">Add language</div>'
                +'</div>');
        this.addL.addEventListener('click', () => {this.selL()});
        this.windContr.append(this.addL);
        this.setParam = newDOMelement('<div style="position:absolute;top:12px;right:130px;bottom:10px;cursor: pointer">'
                    +'<img style="width: 14px;height: 14px;margin-top: 5px;float:left" src="img/setting.png"/>'
                    +'<div style="margin-top: 4px;margin-left: 7px;float:left">Options</div>'
                +'</div>');
        this.setParam.addEventListener('click', () => {this.setOptions()});
        this.windContr.append(this.setParam);
        this.formControlLang(0);
        this.baseStrings();
        new ListEdit(meta, this.listStr, this.cont, this, null, true, true);
        this.changeLang(0);
    }
    
    this.delLang = function() {
//        this.listLangStr.push({codeLang:cod,nameLang:name,listString:[]});
        myAlert("You are about to delete the " + this.listLangStr[this.selLang].nameLang + " language data.<br />Proceed?", "Proceed", this);
//        this.listLangStr[this.selLang]
    }
    
    this.cbForAlert = function(par) {
        this.listLangStr.splice(this.selLang, 1);
        let ik = this.listLangStr.length;
        if (ik > 0) {
            let num;
            if (this.selLang < ik) {
                num = this.selLang;
            } else {
                num = ik - l
            }
            this.selLang = -1;
            this.formSelLang(num);
            this.changeLang(num);
        } else {
            this.formSelLang(0);
            this.changeLang(0);
        }
    }
    
    this.cbListEdit = function(name, ind, tag) {
        
    }
    
    this.cbChangeRow = function(i, tag) {
        
    }
    
    this.formControlLang = function(num) {
        this.contr = newDOMelement('<div style="position: absolute;right: 80px;top:0;bottom:0;"></div>');
        this.title.append(this.contr);
        this.formSelLang(num);
    }
    
    this.formSelLang = function(num) {
        this.contr.innerHTML = "";
        let ik = this.listLangStr.length;
        if (ik > 0) {
            let st = '<select class = "select_no_' + browser + '">';
            for (let i = 0; i < ik; i++) {
                let sel = "";
                if (num == i) {
                    sel = "selected";
                }
                let item = this.listLangStr[i];
                st += '<option ' + sel + '>' + item.codeLang + ": " + item.nameLang + '</option>'
            }
            st += '</select>';
            let selView = newDOMelement(st);
            selView.style.marginTop = "1px";
            selView.style.width = "140px";
            selView.addEventListener('change', () => {this.changeLangSel(selView)});
            let delL = newDOMelement('<img style="width: 12px;height: 12px;margin-top: 5px;float:right;cursor:pointer" src="img/del_red.png"/>');
            delL.addEventListener('click', () => {this.delLang()});
            this.contr.append(delL);
            this.contr.append(selView);
            this.contr.append(newDOMelement('<div style="float:left;margin-top:3px;margin-right:5px">Language text</div>'));
            meta[1].type = "Text";
        } else {
            this.contr.append(newDOMelement('<div style="float:left;margin-top:3px;">No additional languages</div>'));
            meta[1].type = "No";
        }
    }
    
    this.selL = function() {
        if (this.listCode == null) {
            doServer("get", "project/getlang", this, null, {param:1}, document.body);
        } else {
            this.formMenu();
        }
    }
    
    this.changeLangSel = function(el) {
        this.changeLang(el.selectedIndex);
    }
    
    this.changeLang = function(num) {
        this.saveOldLang();
        this.setNewLang(num);
        this.cont.innerHTML = "";
        new ListEdit(meta, this.listStr, this.cont, this, null, true, true);
    }
    
    this.setNewLang = function(num) {
        let ik = this.listStr.length;
        for (let i = 0; i < ik; i++) {
            this.listStr[i].valueL = "";
        }
        if (this.listLangStr.length > 0) {
            this.selLang = num;
            let list = this.listLangStr[num].listString;
            let jk = list.length;
            for (let j = 0; j < jk; j++) {
                let itemN = list[j];
                for (let i = 0; i < ik; i++) {
                    let item = this.listStr[i];
                    if (itemN.itemName == item.name) {
                        item.valueL = itemN.itemValue;
                        break;
                    }
                }
            }
        } else {
            this.selLang = -1;
        }
    }
    
    this.saveOldLang = function() {
        if (this.selLang > -1 && this.listLangStr.length > 0) {
            let list = this.listLangStr[this.selLang].listString;
            list.length = 0;
            let ik = this.listStr.length;
            for (let i = 0; i < ik; i++) {
                let item = this.listStr[i];
                if (item.valueL != null && item.valueL.length > 0) {
                    list.push({itemId:i,itemName:item.name,itemValue:item.valueL});
                }
            }
        }
    }
    
    this.formMenu = function() {
        let panel = newDOMelement('<div style="position: absolute;top:0;left:0;right:0;bottom:0"></div>');
        this.dataWind.append(panel);
        let dv = newDOMelement('<div style="width: 150px;position: absolute;right: 5px;top: 55px;bottom: 50px;background:white;border:1px solid #1dace9;border-radius:8px;"></div>');
        panel.addEventListener("click", () => {this.removePopupMenu(dv)});
        panel.append(dv);
//        dv.addEventListener("click", () => {event.stopPropagation()});
        let list = newDOMelement('<div style="position: absolute;right: 0;top:5px;bottom:5px;left:3px;overflow-y:scroll"></div>');
        dv.append(list);
        let ik = this.listCode.length;
        for (let i = 0; i < ik; i++) {
            let st = this.listCode[i];
            let arr = st.split(";");
            let item = newDOMelement('<div style="height:24px;"></div>');
            let cod = newDOMelement('<div style="float:left;margin-top:3px;cursor:pointer">' + arr[0] + ": " + arr[1] + '</div>');
            item.append(cod);
            item.addEventListener("click", () => {this.selectLang(arr[0], arr[1])});
            list.append(item);
        }
    }
    
    this.setOptions = function() {
        let panel = newDOMelement('<div style="position: absolute;top:0;left:0;right:0;bottom:0"></div>');
        this.dataWind.append(panel);
        this.dv = newDOMelement('<div style="width: 150px;position: absolute;right: 5px;top: 55px;bottom: 50px;background:white;border:1px solid #1dace9;border-radius:8px;"></div>');
        panel.addEventListener("click", () => {this.removePopupMenu(this.dv)});
        panel.append(this.dv);
        this.dv.addEventListener("click", () => {event.stopPropagation()});
        new EditForm(metaOptions, this.Languages, this.dv, null, this);
    }
    
    this.selectLang = function(cod, name) {
        this.listLangStr.push({codeLang:cod,nameLang:name,listString:[]});
        if (this.listLangStr.length >= 3) {
            this.addL.style.display = "none";
        }
        let num = this.listLangStr.length - 1;
        this.formSelLang(num);
        this.changeLang(num);
    }
    
    this.removePopupMenu = function(men) {
        men.parentElement.remove();
    }
    
    this.baseStrings = function() {
        this.listStr = [];
        let ik = listScreen.length;
        for (let i = 0; i < ik; i++) {
            let item = listScreen[i];
            if (item.title != null && item.title.length > 0) {
                this.listStr.push({name:item.screenName.toLowerCase() + "_screen_title", value:item.title, valueL:""});
            }
            this.scName = item.screenName.toLowerCase();
            let components = item.components;
            if (components != null && components.length > 0) {
                let jk = components.length;
                for (let j = 0; j < jk; j++) {
                    let comp = components[j];
                    let cViewId = comp.view.viewId.toLowerCase();
                    switch (comp.type) {
                        case "ToolBar":
                        case "ToolMenu":
                            if (comp.model.menuList != null && comp.model.menuList.list != null && comp.model.menuList.list.length > 0) {
                                let tml = comp.model.menuList.list;
                                let mk = tml.length;
                                for (let m = 0; m < mk; m++) {
                                    this.listStr.push({name:this.scName + "_" + cViewId + m, value:tml[m].title, valueL:""});
                                }
                            }
                            break;
                        case "Menu":
                        case "MenuBottom":
                            let ml = comp.model.menuList.list;
                            mk = ml.length;
                            for (let m = 0; m < mk; m++) {
                                itemM = ml[m];
                                this.listStr.push({name:this.scName + "_" + cViewId + "_" + itemM.screen, value:itemM.title, valueL:""});
                            }
                            break;
                    }
                }
            }
            let layout = item.layout;
            if (layout != null && layout.children.length > 0) {
                this.countTxt = 0;
                this.procLayout(layout.children);
            }
        }
    }
    
    this.procLayout = function(children) {
        let ik = children.length;
        for (let i = 0; i < ik; i++) {
            let item = children[i];
            if (item.text != null && item.text.length > 0 && item.formResourse) {
                let vId = item.viewId;
                if (vId == null || vId.length == 0) {
                    vId = item.countTxt;
                    item.countTxt ++;
                }
                this.listStr.push({name:this.scName + "_" + vId + "_txt", value:item.text, valueL:""});
            }
            if (item.type == "EditText") {
                if (item.componParam != null && item.componParam.st_1 != null && item.componParam.st_1.length > 0) {
                    let vId = item.viewId;
                    if (vId == null || vId.length == 0) {
                        vId = item.countTxt;
                        item.countTxt ++;
                    }
                    this.listStr.push({name:this.scName + "_" + vId + "_hint", value:item.componParam.st_1, valueL:""});
                }
            }
            if (item.children != null && item.children.length > 0) {
                this.procLayout(item.children);
            }
        }
    }
    
    this.formString = function(name, value) {
        name
    }
    
    this.cbDoServer = function(res, param) {
        switch (param.param) {
            case 0:
                
                break;
            case 1:
                this.listCode = res.split(",");
                this.formMenu();
                break;
        }
    }
    
    this.cbEdit = function(name) {
        switch (name) {
            case "save":
                this.removePopupMenu(this.dv);
                break;
        }
    }
    
    this.cbWind = function() {
        this.saveOldLang();
        let ww = this.wind.closest('.dataWindow');
        let pf = ww.panelFon;
        ww.style.display = "none";
        pf.style.display = "none";
        return true;
    }
    
    this.cbCloseWind = function(el) {
        return this.cbWind();
    }
    
    this.viewLang = function() {
        let ww = this.wind.closest('.dataWindow');
        let pf = ww.panelFon;
        ww.style.display = "block";
        pf.style.display = "block";
    }
    
    this.init();
}


