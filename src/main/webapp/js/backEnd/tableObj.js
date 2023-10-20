function TableObj(selF, tabF, isSend) {
    this.fieldsTable = tabF;
    this.selectTable;
    this.selAllFieldsImg;
    this.viewData;
    this.scrollT;
    this.tableId;
    this.tableName;
    this.crud;
    if (selF != null) {
        this.selectFields = selF;
        this.scrollF = this.selectFields.closest(".viewport");
        this.scrollF = this.scrollF.scroll_y;
    }
    
    let hItem = 24;
    let self = this;
    
    this.chooseTableFields = function(crud) {
        this.crud = crud;
        this.cooseTable_0();
    }
    
    this.cooseTable = function() {
        this.crud = null;
        this.cooseTable_0();
    }
    
    this.cooseTable_0 = function() {
        hostDomain = currentProject.host;
        if (hostDomain != null && hostDomain.length > 0  && hostDescr != "Third party API") {
            if (listTables == null) {
                doServerAlien("GET", hostDomain + 'tables/list', this.cbGetTab, null, null, tabF);
            } else {
                self.cooseTable_1();
            }
        } else {
            myAlert("Inappropriate data source");
        }
    }
    
    self.cooseTable_1 = function() {
        if (listTables == null) {
            myAlert("No tables described");
        } else {
            let wind = formWind(250, 450, 40, 350, "Choose a table", true, null, null, null, "");
            let cont = newDOMelement('<div style="position:absolute;left:5px;right:10px"></div>');
            wind.appendChild(cont);
            let ik = listTables.length;
            if (ik > 0) {
                for (let i = 0; i < ik; i++) {
                    this.oneTable(i, cont);
                }
            }
            resizeScrol(wind);
        }
    }
    
    this.cbGetTab = function(res) {
        listTables = JSON.parse(res);
        self.cooseTable_1();
    }
    
    this.oneTable = function(i, el) {
        let item = listTables[i];
        let cont = newDOMelement('<div style="float:left;width:100%;height:30px;overflow: hidden;cursor:pointer;border-bottom:1px solid #aaf;clear:both"></div>');
        let name = newDOMelement('<div style="font-size:16px;color:#000;margin-top:5px;float:left;margin-left:5px">' + item.name_table + '</div>');
        cont.appendChild(name);
        cont.addEventListener("click", () => {closeDataWindow(el); this.formFieldsInTable(i);}, false);
        el.appendChild(cont);
        this.tableId = item.id_table;
        let rect = cont.getBoundingClientRect();
        let rect_1 = name.getBoundingClientRect();
        let descr = newDOMelement('<div style="font-size:12px;color:#555;margin-top:9px;height:12px;width:' + (rect.width - rect_1.width - 20) 
                + 'px;float:left;margin-left:10px;overflow:hidden">' + item.title_table + '</div>');
        cont.appendChild(descr);
    }
    
    this.formFieldsInTable = function(it) {
        if (this.crud == null) {
            let item = listTables[it];
            this.tableName = item.name_table;
            this.selectTable = {id_table:item.id_table,name_table: item.name_table,title_table:item.title_table,fields_table:JSON.parse(item.fields_table)};
            this.tableId = item.id_table;
            this.fieldsTable.innerHTML = "";
            this.selectFields.innerHTML = "";
            let block = newDOMelement('<div class="table_view" style="width:100%;height:100%;float:left;position:relative;border-right:1px solid #1dace9;"></div>');
            let title = newDOMelement('<div class="tab_title" style="height:' + hItem + 'px;border-bottom:1px solid #1dace9;position:absolute;left:0;top:0;right:0;background:#f3f8ff;">' 
                    +'<div style="margin-top:3px;width:100%;text-align:center;font-size:14px;">' + item.name_table + '</div>'
                    +'</div>');
            block.appendChild(title);
            this.selAllFieldsImg = newDOMelement('<img style="width:18px;height:18px;position:absolute;right:10px;top:3px;cursor:pointer" src="img/check-act.png">');
            this.selAllFieldsImg.addEventListener("click", () => {this.selAllFields(this.selAllFieldsImg);}, false);
            title.appendChild(this.selAllFieldsImg);

            this.fieldsTable.appendChild(block);
            let wraperScroll = newDOMelement('<div class="TTT" style="position:absolute;left:0;top:' + hItem + 'px;right:0;bottom:0"></div');
            block.appendChild(wraperScroll);
            let viewScroll = formViewScrolY(wraperScroll, true);
            viewScroll.style.right = "9px";
            this.viewData = viewScroll.querySelector(".viewData");
            this.scrollT = viewScroll.scroll_y;

            let fields = JSON.parse(item.fields_table);
            let ik = fields.length;
            for (let i = 0; i < ik; i++) {
                this.oneFieldTables(item.id_table, fields[i], this.viewData);
            }
            this.scrollT.resize();
        } else {
            this.crud.crudDelete(it);
        }
    }
    
    this.oneFieldTables = function (idTable, item, el) {
//        let cont = newDOMelement('<div class="cont_f" style="float:left;width:100%;position:relative;height:' 
//                + hItem + 'px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
        
        let cont = newDOMelement('<div class="cont_f" style="position:relative;height:' 
                + hItem + 'px;border-bottom:1px solid #aaf;"></div>');
        cont.idField = item.id_field;
        cont.name_field = item.name;
        cont.type_field = item.type;

        let name = newDOMelement('<div onclick="setFieldInQuery(this)" style="font-size:14px;color:#000;margin-top:2px;cursor:pointer;float:left;margin-left:3px">' 
                + item.name + '</div>');
        cont.appendChild(name);
        el.appendChild(cont);
        let rect = cont.getBoundingClientRect();
        let rect_1 = name.getBoundingClientRect();
        let descr = newDOMelement('<div style="font-size:10px;color:#555;margin-top:6px;height:11px;width:' + (rect.width - rect_1.width - 20) 
                + 'px;float:left;margin-left:5px;overflow:hidden">' + item.title);
        let selField = newDOMelement('<img style="width:18px;cursor:pointer;height:18px;position:absolute;right:2px;top:3px;" src="img/check-act.png">');
        selField.addEventListener("click", () => {this.selectFieldInTab(selField);}, false);
        cont.appendChild(descr);
        cont.appendChild(selField);
    }
    
    this.selAllFields = function (el) {
        if (checkElement(el)) {
            this.addAllFields(el);
        } else {
            this.delAllFields(el);
        }
    }
    
    this.addAllFields = function (el) {
        let child = this.viewData.children;
        let ik = child.length;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            let sel = itemEl.getElementsByTagName("img")[0];
            if (sel.src.indexOf("check-sel") == -1) {
                this.addFieldOne(sel);
                sel.src = "img/check-sel_1.png";
            }
        }
    }
    
    this.addSelectFields = function (selArray) {
        let child = this.viewData.children;
        let ik = child.length;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            if (this.isId(itemEl.idField, selArray)) {
                let sel = itemEl.getElementsByTagName("img")[0];
                this.addFieldOne(sel);
                sel.src = "img/check-sel_1.png";
            }
        }
    }
    
    this.isId = function(id, arrId) {
        let ik = arrId.length;
        for (let i = 0; i < ik; i++) {
            if (id == arrId[i]) {
                return true;
            }
        }
        return false;
    }
    
    this.delAllFields = function (el) {
        let child = this.viewData.children;
        let ik = child.length;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            let sel = itemEl.getElementsByTagName("img")[0];
            if (sel.src.indexOf("check-sel") > -1) {
                this.delFieldOne(sel);
                sel.src = "img/check-act.png";
            }
        }
    }
    
    this.selectFieldInTab = function (el) {
        if (checkElement(el)) {
            this.addFieldOne(el);
        } else {
            this.delFieldOne(el);
        }
        this.setViewImg(el);
    }
    
    this.setViewImg = function (el) {
        let cont = this.viewData;
        let child = cont.children;
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

        let viewData = this.fieldsTable.getElementsByClassName("tab_title")[0];
        let sel = viewData.getElementsByTagName("img")[0];
        if (cMin == 0) {
            sel.src = "img/check-sel_1.png";
        } else {
            if (cPl == 0) {
                sel.src = "img/check-act.png";
            } else {
                sel.src = "img/check-sel-blur.png";
            }
        }
    }
    
    this.addFieldOne = function (el) {
        let cont = el.closest('.cont_f');
        let idF = cont.idField;
        let fields = this.selectTable.fields_table;
        let jk = fields.length;
        for (let j = 0; j < jk; j++) {
            let itemField = fields[j];
            if (itemField.id_field == idF) {
                this.oneFieldView(itemField, this.selectFields);
                this.scrollF.resize();
                break;
            }
        }
    }
    
    this.delFieldOne = function (el) {
        let cont = el.closest('.cont_f');
        let idF = cont.idField;
        let fieldsView = this.selectFields.children;
        let ik = fieldsView.length;
        for (let i = 0; i < ik; i++) {
            let vv = fieldsView[i];
            if (idF == vv.idField) {
                vv.remove();
                this.scrollF.resize();
                break;
            }
        }
    }
/*
    this.scrollTable = function() {
        if (this.scrollT != null) {
            this.scrollT.resize();
        }
    }
*/
    this.oneFieldView = function (item, el) {
        let cont = newDOMelement('<div class="field" style="float:left;width:100%;position:relative;height:' 
                + hItem + 'px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
        cont.idField = item.id_field;
        cont.name_field = item.name;
        cont.type_field = item.type;
        let name = newDOMelement('<div class="name" style="font-size:14px;color:#000;margin-top:2px;float:left;margin-left:3px">' + item.name + '</div>');
        cont.appendChild(name);
        el.appendChild(cont);
        let rect = cont.getBoundingClientRect();
        let rect_1 = name.getBoundingClientRect();
        let descr = newDOMelement('<div style="font-size:10px;color:#555;margin-top:6px;height:11px;width:' + (rect.width - rect_1.width - 20) 
                + 'px;float:left;margin-left:5px;overflow:hidden">' + item.title);
        let margR = "2";
        if (isSend) {
            let selSel = formSelectForEditData("Field,Profile,System date,System time,My longitude,My latitude", "");
            selSel.className = "selProf";
            selSel.style.width = "110px";
            selSel.style.border = "none";
            selSel.style.backgroundColor = "#0000";
            selSel.style.float = "right";
            cont.append(selSel);
            margR = "110";
        
/*
            let selProf = newDOMelement('<img class="selProf" style="width:18px;cursor:pointer;height:18px;position:absolute;right:2px;top:3px;" src="img/check-act.png">');
            selProf.addEventListener("click", () => {checkElement(selProf);}, false);
            cont.appendChild(selProf);
            margR = "30";
*/
        }
        let selField = newDOMelement('<img class="selField" style="width:18px;cursor:pointer;height:18px;position:absolute;right:' + margR + 'px;top:3px;" src="img/check-act.png">');
        selField.addEventListener("click", () => {checkElement(selField);}, false);
        cont.appendChild(selField);
        cont.appendChild(descr);
    }
    
    this.getTableInformation = function() {
        let src = this.selAllFieldsImg.src;
        let cf = 2;
        let lF = [];
        if (src.indexOf("act") > -1) {
            cf = 0;
        } else if (src.indexOf("blur") > -1) {
            cf = 1;
            let childField = this.viewData.children;
            let jk = childField.length;
            for (let j = 0; j < jk; j++) {
                let it = childField[j];
                if (it.getElementsByTagName('img')[0].src.indexOf("act") < 0) {
                    lF.push(it.idField);
                }
            }
        }
        return {id_table:this.tableId,name_table:this.tableName,fullness:cf,listFields:lF};
    }
}