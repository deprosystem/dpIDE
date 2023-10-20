function FieldsFromSource(model, ind, editC, choiseSource) {
    this.model = model;
    this.ind = ind;
    this.editC = editC;
    this.wind;
    this.choiseSource = choiseSource;
    this.idNewQuery = -1;
    let typeEdit = "text,spinner,checkBox,seekBar,switch,radioBox,none";
    
    let hTitle = 24, wFields = 280, hTitle1 = hTitle + 1;
    
    this.init = function() {
        this.choiseSource.cb = this;
        wind = formWind(515, 450, 40, 250, "Specify fields for view from the " + this.choiseSource.source, null, null, null, null, "");
        wind.style.bottom = "51px";
        let wd = wind.closest(".dataWindow");
        let editF = "";
        if (this.editC) {
            editF = '<div style="position:absolute;top:7px;left:215px;font-size:10px;width:42px;">Edit type</div>'
        }
        let titleSt = '<div style="height:' + hTitle + 'px;border-bottom:1px solid #1dace9;font-size:14px;position:relative">'
                +'<div style="width:' + wFields + 'px;text-align:center;margin-top:3px;float:left;">Fields view</div>'
                +editF
                +'<div style="height:100%;width:1px;background-color:#1dace9;float:left"></div>'
                +'<div style="text-align:center;margin-top:3px;float:left;width:220px">Fields in data source</div>'
                +'</div>';
        let controll = createFooter(50);
        addFooter(wind, controll);
        let buttonSave = createButtonBlue('Save', 70);
        buttonSave.addEventListener("click", () => {this.saveFieldsSource();closeDataWindow(wind);}, true);
        controll.append(buttonSave);
        if (this.ind == 0) {
            let buttonChang = createButtonBlue('Change data source');
            buttonChang.addEventListener("click", () => {this.changeQuery();}, true);
            controll.append(buttonChang);
        }
        let buttonCancel = createButtonWeite('Cancel', 70);
        buttonCancel.addEventListener("click", function(){closeDataWindow(wind);}, true);
        controll.append(buttonCancel);
        wd.append(controll);
        let title = newDOMelement(titleSt);
        wind.append(title);
        this.selFieldAll = newDOMelement('<img style="width:14px;height:14px;position:absolute;right:7px;top:3px;cursor:pointer" src="img/check-act.png">');
        this.selFieldAll.addEventListener("click", () => {this.selAllFieldInQu();}, true);
        title.append(this.selFieldAll);
        this.fView = newDOMelement('<div class="fView" style="position:absolute;top:' + hTitle1 + 'px;left:0;bottom:0;width:' + wFields 
                + 'px;border-right:1px solid #1dace9"></div>');
        this.fQuery = newDOMelement('<div class="fQuery" style="position:absolute;top:' + hTitle1 + 'px;right:0;bottom:0;left:' + (wFields - 1) 
                + 'px;"></div>');
        wind.append(this.fView);
        wind.append(this.fQuery);
        this.fViewPort = formViewScrolY(this.fView);
        this.fieldsView = this.fViewPort.querySelector(".viewData");
        this.fQueryPort = formViewScrolY(this.fQuery);
        this.fieldsQuery = this.fQueryPort.querySelector(".viewData");
        this.wind = wind;
        if (this.model.idQuery == -1) {
            this.model.idQuery = null;
        }
        if (this.model.idQuery != null) {
            this.idNewQuery = this.model.idQuery;
            let item = this.choiseSource.getSourceById(this.model.idQuery);
            if (item != null) {
                this.setFieldsSource_1(item);
            }
        }
    }

    this.changeQuery = function() {
        this.choiseSource.choiceSource();
    }

    this.setFieldsSource_1 = function(item) {
        if (item.id != null) {
            this.idNewQuery = item.id;
        }
//console.log("ITEM="+JSON.stringify(item));
        this.paramQuery = item.param;
        this.selFieldAll.src = "img/check-act.png";
        this.fieldsQuery.innerHTML = "";
        this.fieldsView.innerHTML = "";
        setTitleWind(this.wind, "Specify fields for view from the " + this.choiseSource.source + " <span style='color:#009fff;font-size:22px'>" + item.name + "</span>");

        let fildsQu = JSON.parse(item.fields);
        let ik = fildsQu.length;
        for (let i = 0; i < ik; i++) {
            let it = fildsQu[i];
//console.log("setFieldsSource_1 it.name="+it.name+"<<");
            let cont = newDOMelement('<div class="cont_f" style="float:left;width:100%;position:relative;height:28px;border-bottom:1px solid #aaf;clear:both"></div>');
            let name = newDOMelement('<div style="margin-top:2px;float:left;margin-left:4px;font-size:14px">' + it.name + ' </div>');
            cont.idField = it.id_field;
            cont.name_field = it.name;
            cont.type_field = it.type;
            cont.title_field = it.title;
            cont.append(name);
            this.fieldsQuery.append(cont);
            let rect = cont.getBoundingClientRect();
            let rect_1 = name.getBoundingClientRect();
            let descr = newDOMelement('<div style="font-size:10px;color:#555;margin-top:7px;height:11px;width:' + (rect.width - rect_1.width - 20) 
                    + 'px;float:left;margin-left:5px;overflow:hidden">' + it.title);
            cont.append(descr);
            let selField = newDOMelement('<img style="width:14px;cursor:pointer;height:14px;position:absolute;right:4px;top:4px;" src="img/check-act.png">');
            cont.append(selField);
            selField.addEventListener("click", () => {this.selFieldInQu(selField);}, true);
        }
        this.fQueryPort.scroll_y.resize();
        this.setFieldsView ();
    }
    
    this.setFieldsView = function() {
        let data = this.model.data[this.ind];
        let ik = data.length;
        let child = this.fieldsQuery.children;
        let qk = child.length;
        for (let i = 0; i < ik; i++) {
            let item = data[i];
            let nam = item.name;
            for (q = 0; q < qk; q++) {
                let it = child[q];
                if (nam == it.name_field) {
                    let img = it.querySelector("img");
                    img.src = "img/check-sel_1.png";
                    this.addFieldsInQuery(it, item.edit);
                    break;
                }
            }
        }
        this.setViewAllImg();
    }
    
    this.selFieldInQu = function(el) {
        if (checkElement(el)) {
            this.addFieldsInQuery(el);
        } else {
            this.delFieldsInQuery(el);
        }
        this.setViewAllImg();
    }
    
    this.addFieldsInQuery = function(el, ed) {
        let cont = el.closest('.cont_f');
        this.oneFieldView(cont, ed);
        this.fViewPort.scroll_y.resize();
    }
    
    this.delFieldsInQuery = function(el) {
        let cont = el.closest('.cont_f');
        let idF = cont.name_field;
        let ch = this.fieldsView.children;
        let ik = ch.length;
        for (let i = 0; i < ik; i++) {
            let vv = ch[i];
            if (idF == vv.name_field) {
                vv.remove();
                this.fViewPort.scroll_y.resize();
                break;
            }
        }
    }
    
    this.oneFieldView = function(item, ed) {
        let cont = newDOMelement('<div class="field" style="float:left;width:100%;position:relative;height:28px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
        cont.idField = item.idField;
        cont.name_field = item.name_field;
        cont.type_field = item.type_field;
        cont.title_field = item.title_field;
        let name = newDOMelement('<div class="name" style="font-size:14px;color:#000;margin-top:2px;float:left;margin-left:3px">' + item.name_field + '</div>');
        cont.appendChild(name);
        this.fieldsView.append(cont);
        let rect = cont.getBoundingClientRect();
        let rect_1 = name.getBoundingClientRect();
        let descr = newDOMelement('<div style="font-size:10px;color:#555;margin-top:6px;height:11px;width:' + (rect.width - rect_1.width - 20) 
                + 'px;float:left;margin-left:5px;overflow:hidden">' + item.title_field);
        cont.appendChild(descr);
        
        if (this.editC) {
            let vv = "";
            if (ed != null) {
                vv = ed;
            }
            if (item.type_field == "Img" || item.type_field == "Gallery") {
                vv = "none";
            }
            let selType = formSelectForEditData(typeEdit, vv);
            selType.className = "sel select_" + browser;
            selType.style.cssText = "width:80px;font-size:12px;color:#110000;position:absolute;right:3px;";
            cont.append(selType);
        }
/*
        if (this.editC) {
            let imgSrc = "img/check-act.png";
            if (ed) {
                imgSrc = "img/check-sel_1.png";
            }
            let selField = newDOMelement('<img style="width:14px;cursor:pointer;height:14px;position:absolute;right:3px;top:2px;" src=' + imgSrc + '>');
            selField.addEventListener("click", function(){checkElement(selField)}, false);
            cont.append(selField);
        }
*/
    }
    
    this.setViewAllImg = function() {
        let child = this.fieldsQuery.children;
        let ik = child.length;
        let cPl = 0, cMin = 0;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            let sel = itemEl.getElementsByTagName("img")[0];
            if (sel.src.indexOf("check-sel") > -1) {
                cPl++;
            } else {
                cMin++;
            }
        }
        if (cMin == 0) {
            this.selFieldAll.src = "img/check-sel_1.png";
        } else {
            if (cPl == 0) {
                this.selFieldAll.src = "img/check-act.png";
            } else {
                this.selFieldAll.src = "img/check-sel-blur.png";
            }
        }
    }
    
    this.selAllFieldInQu = function() {
        if (checkElement(this.selFieldAll)) {
            this.addAllFields();
        } else {
            this.delAllFields();
        }
    }
   
    this.addAllFields = function() {
        let child = this.fieldsQuery.children;
        let ik = child.length;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            let sel = itemEl.querySelector("img");
//            this.addFieldsInQuery(sel);

            if (sel.src.indexOf("check-sel") == -1) {
                this.addFieldsInQuery(sel);
                sel.src = "img/check-sel_1.png";
            }

        }
    }
    
    this.delAllFields = function() {
        let child = this.fieldsQuery.children;
        let ik = child.length;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            let sel = itemEl.querySelector("img");
            if (sel.src.indexOf("check-sel") > -1) {
                this.delFieldsInQuery(sel);
                sel.src = "img/check-act.png";
            }
        }
    }
    
    this.saveFieldsSource = function() {
        if (this.ind == 0 && this.idNewQuery != this.model.idQuery) {
            this.model.idQuery = this.idNewQuery;
            this.model.url = "query/" + currentProject.resurseInd + "/" + this.idNewQuery;
            let ik = this.model.data.length;
            for (let i = 1; i < ik; i++) {
                this.model.data[i].length = 0;
            }
        }
        this.model.param = this.paramQuery;
//console.log("this.model.param="+this.model.param+"<<");
        let fieldsQQ = this.fieldsView.children;
        ik = fieldsQQ.length;
        let data = this.model.data[this.ind];
        data.length = 0;
        for (let i = 0; i < ik; i++) {
            let item = fieldsQQ[i];
            let itemData = {name:item.name_field,type:item.type_field};
//console.log("saveFieldsSource itemData="+JSON.stringify(itemData));
            data.push(itemData);
        }
    }
    
    this.init();
}


