function QuerySelect (wind, listTab, idQu, cbQuery) {
    this.wind = wind;
    this.listTables = listTab;
    this.idQu = idQu;
    this.selectQuEl;
    this.cbQuery = cbQuery;
//    this.listTablesQu = [];
    this.queryQueryQu;
    this.queryTables;
    this.listTablesForQu = [];
    this.queryFieldsDataQu;
    this.errorQuery;
    this.wTableInQu = 175;
    this.fieldsOrderView;
    this.queryOrderQu = [];
    this.listAlias;
    this.expresion;
    
    this.init = function() {
        let hFooter = 150;
        let wFieldQuery = 220;
        this.selectQuEl = null;
        this.listTablesForQu.length = 0;
        let descr = '<div class="descrQuery" style="height:' + hTitleQuery + 'px;border-bottom:1px solid #1dace9;">'
                +'<div style="margin-top:5px;float:left;font-size:10px;margin-left:10px">Name</div>'
                +'<input class="inpName input_style" onkeydown="keyText(event,' + "'name_low'" + ')" type="text" style="margin-left:10px;width:200px;height:20px;float:left"/>'
                +'<div style="margin-top:5px;float:left;font-size:10px;margin-left:10px">Description</div>'
                +'<input class="inpDescr input_style" type="text" style="margin-left:10px;width:400px;height:20px;float:left"/>'
                +'</div>';
        let title = '<div style="height:' + hTitleQuery + 'px;border-bottom:1px solid #1dace9;">'
//                +'<div style="width:' + wFieldQuery + 'px;text-align:center;margin-top:3px;float:left;font-size:14px;">Fields</div>'
                +'<div style="width:' + wFieldQuery + 'px;float:left;height:100%">'
                    +'<div style="margin-top:3px;float:left;font-size:14px;margin-left:10px;">Fields</div>'
                    +'<div class="addExp" style="margin-top:3px;float:left;font-size:14px;margin-left:40px;cursor:pointer;">Add expression</div>'
                +'</div>'
                +'<div style="height:100%;width:1px;background-color:#1dace9;float:left"></div>'
                +'<div style="text-align:center;margin-top:3px;float:left;margin-left:30px;font-size:14px;">Tables</div>'
                +'</div>';
        let titleWhere = '<div style="height:' + hTitleQuery + 'px;border-bottom:1px solid #1dace9;">'
                +'<div style="margin-top:3px;float:left;margin-left:' + wFieldQuery + 'px;font-size:14px;">Where</div>'
                +'</div>';
        let footer = '<div style="position:absolute;;border-top:1px solid #1dace9;left:0;bottom:0;right:0;height:' + hFooter +'px"></div>';
        let fieldsTit = '<div style="position:absolute;border-right:1px solid #1dace9;left:0;top:' + (hTitleQuery + 1) + 'px;width:' + wFieldQuery + 'px;height:' + hTitleQuery 
                +'px;border-bottom:1px solid #1dace9;background-color:#f3f8ff;">'
                +'<div style="margin-top:4px;float:left;margin-left:5px;">Fields name</div>';
        fieldsTit += '</div>';
        let fields = '<div class="fields_q" style="position:absolute;border-right:1px solid #1dace9;left:0;top:' + (hTitleQuery * 2 + 2) + 'px;width:' + wFieldQuery + 'px;bottom:' + (hFooter + 1) +'px"></div>';
        let tables = '<div class="tables_q" style="position:absolute;;top:' + (hTitleQuery + 1) + 'px;left:' + (wFieldQuery + 1) + 'px;bottom:' + (hFooter + 1) +'px;right:0"></div>';

        let controll = createFooter(50);
        addFooter(this.wind, controll);
        let buttonSave = createButtonBlue('Save', 70);
        buttonSave.addEventListener("click", () => {closeDataWindow(this.wind, this.dbSaveQu())}, false);
        controll.appendChild(buttonSave);
        let buttonCancel = createButtonWeite('Cancel', 70);
        buttonCancel.addEventListener("click", () => {closeWindow(this.wind);}, true);
        controll.appendChild(buttonCancel);
        let descript = newDOMelement(descr);
        this.wind.appendChild(descript);
        let windMenu = newDOMelement('<div class="windMenu_q" style="position:absolute;top:' + (hTitleQuery + 1) + 'px;left:0;right:0;bottom:50px"></div>');
        this.wind.appendChild(windMenu);
        let titleEl = newDOMelement(title);
        let addExp = titleEl.querySelector(".addExp");
        let addTab = newDOMelement('<img style="margin-top:4px;margin-left:25px;float:left;cursor:pointer;" width="14" height="14" src="img/add_blue.png">');
        let order = newDOMelement('<img style="margin-top:6px;margin-right:15px;float:right;cursor:pointer;" width="12" height="12" src="img/sort-2.png">');
        titleEl.appendChild(addTab);
        titleEl.appendChild(order);
        titleEl.append(newDOMelement('<div style="margin-top:4px;float:right;margin-right:7px;">Order</div>'));

        windMenu.appendChild(titleEl);
        addExp.addEventListener("click", () => {this.addExpresion(addExp, true);}, true);
        let footerEl = newDOMelement(footer);
        footerQuery = footerEl;
        windMenu.appendChild(footerEl);
        let titleWhereEl = newDOMelement(titleWhere);
        footerEl.appendChild(titleWhereEl);
        let addWhere = newDOMelement('<img class="addWhere" style="margin-top:4px;margin-left:25px;display:none;float:left;cursor:pointer;" width="14" height="14" src="img/add_blue.png">');
        addWhere.addEventListener("click", () => {this.addWhereForQu();}, true);
        titleWhereEl.appendChild(addWhere);
        wraperQuery = newDOMelement('<div class="wraperQuery" style="position:absolute;top:' + (hTitleQuery + 1) + 'px;left:0;right:0;bottom:0"></div>')
        footerEl.appendChild(wraperQuery);
        let scrollQu = formViewScrolY(wraperQuery, true);
        this.queryQueryQu = scrollQu.getElementsByClassName("viewData")[0];

        windMenu.append(newDOMelement(fieldsTit));
        queryFields = newDOMelement(fields);
        windMenu.appendChild(queryFields);
        this.queryTables = newDOMelement(tables);
        windMenu.appendChild(this.queryTables);
        order.addEventListener("click", () => {this.setOrderForQu();}, true);
        addTab.addEventListener("click", () => {this.addTableQu();}, true);

        let scrF = formViewScrolY(queryFields, true);
        this.queryFieldsDataQu = scrF.querySelector(".viewData");

        this.queryOrderQu.length = 0;
        
        if (this.idQu != null && this.idQu > -1) {
            doServerAlien("GET", hostDomain + "query/get?id=" + this.idQu, this, null, {source:1}, this.wind);
        }
    }
    
    this.setQueryValue = function(res) {
        this.errorQuery = false;
        let ik;
        let query = JSON.parse(res);
        let originQuery = JSON.parse(query.origin_query);
        this.listAlias = originQuery.listAlias;
        let wind_1 = this.queryTables.closest(".wind");
        let inpName = wind_1.querySelector(".inpName");
        let inpDescr = wind_1.querySelector(".inpDescr");
        inpName.value = query.name_query;
        inpDescr.value = query.descr_query;
        if (originQuery.fieldTable != null) {
            let origin = originQuery.fieldTable;
            ik = origin.length;
            let item;
            for (let i = 0; i < ik; i++) {
                item = origin[i];
                let tab = this.getTabInQu(item.id_table);
                if (tab != -1) {
                    this.formTableQu(tab);
                    let bb = this.queryTables.getElementsByClassName("table_view");
                    let bbL = bb.length;
                    if (bbL > 0) {
                        let blockTab = bb[bbL - 1];
                        let rr = blockTab.getElementsByClassName('tab_title')[0];
                        let imgAll = rr.getElementsByTagName('img')[0];
                        if (item.fullness == 2) {
                            this.checkAllFieldsInQu(blockTab);
                            imgAll.src = "img/check-sel_1.png";
                        } else if (item.fullness == 1) {
                            this.checkSelFieldsInQu(blockTab, item.listFields);
                            imgAll.src = "img/check-sel-blur.png";
                        }
                    }
                } else {
                    this.errorQuery = true;
                }
            }
        }
        if (originQuery.where != null) {
            let where = originQuery.where;
            ik = where.length;
            for (let i = 0; i < ik; i++) {
                item = where[i];
                this.addWhereForQu(item);
            }
        }
        let ord = originQuery.order;
        if (ord != null) {
            ik = ord.length;
            for (let i = 0; i < ik; i++) {
                this.queryOrderQu.push(ord[i]);
            }
        }
        ik = this.listAlias.length;
        for (let i = 0; i < ik; i++) {
            let al = this.listAlias[i];
            if (al.typeSource == "Expresion") {
                let cont = newDOMelement('<div class="field" style="float:left;width:100%;position:relative;height:' 
                        + hItemListFieldsTable + 'px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
                cont.idTable = -1;
                cont.idField = -1;
                cont.name_field = al.name_field;
                cont.type_field = "Expresion";
                cont.title = "";
                cont.typeSource = "Expresion";
                cont.alias = al.alias;
                conf.lang = al.lang;
                this.queryFieldsDataQu.append(cont);
                cont.addEventListener("contextmenu", () => {
                    event.preventDefault();event.stopPropagation();
                    this.addExpresion(cont);
                }, true);
                this.setNameFieldView(cont);
            }
        }
    }
    
    this.checkSelFieldsInQu = function(el, fields) {
        let viewData = el.getElementsByClassName("viewData")[0];
        let child = viewData.children;
        let ik = child.length;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            if (this.isFieldInListQu(itemEl.idField, fields)) {
                let sel = itemEl.getElementsByTagName("img")[0];
                this.addFieldsInQu(sel);
                sel.src = "img/check-sel_1.png";
            }
        }
    }
    
    this.isFieldInListQu = function (id, fields) {
        let ik = fields.length;
        for (let i = 0; i < ik; i++) {
            if (fields[i] == id) {
                return true;
            }
        }
        return false;
    }
    
    this.checkAllFieldsInQu = function(el) {
        let viewData = el.getElementsByClassName("viewData")[0];
        let child = viewData.children;
        let ik = child.length;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            let sel = itemEl.getElementsByTagName("img")[0];
            this.addFieldsInQu(sel);
            sel.src = "img/check-sel_1.png";
        }
    }
    
    this.addExpresion = function(el, newExp) {
        let pp = formPopUp(el, 300, 150);
        let meta_Exp = [
            {name: "name", title:"Expresion",len:270,type:"Text",clear:true},
            {name: "alias", title:"Name",len:120,type:"Text",valid:"name_low",clear:true}
        ];
        if (newExp) {
            this.expresion = {alias:"",name:"",newE:newExp};
        } else {
            this.expresion = {alias:el.alias,name:el.name_field,newE:newExp};
        }
        new EditForm(meta_Exp, this.expresion, pp);
        let controll = createFooter(50);
        pp.append(controll);
        let buttonOk = createButtonBlue("Save");
        buttonOk.addEventListener('click', () => {closePopUp(pp);this.saveExpresion(el, newExp)});
        controll.append(buttonOk);
        if (! newExp) {
            let buttonDel = createButtonBlue("Delete");
            buttonDel.addEventListener('click', () => {closePopUp(pp);this.delExpresion(el)});
            controll.append(buttonDel);
        }
        
        let buttonCancel = createButtonWeite('Cancel', 70);
        buttonCancel.addEventListener('click', () => {closePopUp(pp);});
        controll.append(buttonCancel);
    }
    
    this.saveExpresion = function(el, newExp) {
        if (newExp) {
            let cont = newDOMelement('<div class="field" style="float:left;width:100%;position:relative;height:' 
                    + hItemListFieldsTable + 'px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
            cont.idTable = -1;
            cont.idField = -1;
            cont.name_field = this.expresion.name;
            cont.type_field = "Expresion";
            cont.title = "";
            cont.typeSource = "Expresion";
            cont.alias = this.expresion.alias;
            this.queryFieldsDataQu.append(cont);
            cont.addEventListener("contextmenu", () => {
                event.preventDefault();event.stopPropagation();
                this.addExpresion(cont);
            }, true);
            this.setNameFieldView(cont);
        } else {
            el.alias = this.expresion.alias;
            el.name_field = this.expresion.name;
            el.innerHTML = "";
            this.setNameFieldView(el);
        }
    }
    
    this.delExpresion = function(el) {
        el.remove();
        let ss = this.queryFieldsDataQu.closest(".viewport");
        ss.scroll_y.resize();
    }
    
    this.getTabInQu = function (id) {
        let ik = listTables.length;
        for (i = 0; i < ik; i++) {
            let item = listTables[i];
            if (item.id_table == id) {
                return i;
            }
        }
        return -1;
    }
    
    this.dbSaveQu = function() {
        let wind_1 = this.queryTables.closest(".wind");
        let inpName = wind_1.querySelector(".inpName");
        let nameQu = inpName.value;
        if (nameQu == null || nameQu == "") {
            myAlert("Query name not specified");
            return true;
        }
        let inpDescr = wind_1.querySelector(".inpDescr");
        let descrQu = inpDescr.value;
        let childTab = this.queryTables.children;

        let fieldsQQ = this.queryFieldsDataQu.children;
        let ik = fieldsQQ.length;
        let listFields = [];
        let listAlias = [];
        let data = [];
        let itemData;
        for (let i = 0; i < ik; i++) {
            let item = fieldsQQ[i];
            let namF = item.name_field;
            let lang;
            if (item.alias != null && item.alias.length > 0) {
                namF = item.alias;
                lang = item.lang
                listAlias.push({idSource:item.idTable,name_field:item.name_field,typeSource:item.typeSource,idField:item.idField,alias:item.alias,lang:item.lang});
            }
            itemData = {id_field:i,name:namF,type:item.type_field,title:item.title};
            data.push(itemData);
        }

        ik = childTab.length;
        let manyTables = false;
        if (ik == 0) return;
        if (ik > 1) {
            manyTables = true;
        }
        let res = [];
        let tables = "";
        let sepT = "";
        let fields = "";
        let sepF = "";
        let alias;
        let aliasForF;
        let schema = currentProject.resurseInd;
        let viewTabI;
        let listAllField = [];
        for (let i = 0; i < ik; i++) {
            viewTabI = childTab[i];
            let id_tab = viewTabI.id_table;
            let tab = gatTableById(id_tab);
            let listField = null;
            if (tab != null) {
                listField = JSON.parse(tab.fields_table);
            }
            if (listField != null) {
                let kk = listField.length;
                for (let k = 0; k < kk; k++) {
                    listAllField.push(listField[k].name);
                }
            }
        }

        for (let i = 0; i < ik; i++) {
            viewTabI = childTab[i];
            let name_table = viewTabI.name_table;
            let id_tab = viewTabI.id_table;
            let typeSource = viewTabI.typeSource;
            let tab = gatTableById(id_tab);
            let listField = null;
            if (tab != null) {
                listField = JSON.parse(tab.fields_table);
            }

            alias = "";
            aliasForF = "";
            if (manyTables) {
                alias = " AS _t_" + i;
                aliasForF = "_t_" + i + ".";
            }
            tables += sepT + schema + "." + name_table + alias;
            sepT = ", ";
            let tt = viewTabI.getElementsByClassName("tab_title")[0];
            let selTab = tt.getElementsByTagName("img")[0];
            let cf;
            let alK = listAlias.length;
            if (selTab.src.indexOf("act") > -1) {
                cf = 0;
            } else if (selTab.src.indexOf("blur") > -1) {
                cf = 1;
            } else {
                isAl = false;
                for (let al = 0; al < alK; al++) {
                    let alIt = listAlias[al];
                    if (alIt.idSource == id_tab && alIt.typeSource == typeSource) {
                        isAl = true;
                        break;
                    }
                }
                if (isAl) {
                    cf = 1;
                } else {
                    cf = 2;
                    fields += sepF + aliasForF + "*";
                    sepF = ", ";
                }
            }
            let lF = [];
            if (cf == 1) {
                let ff = viewTabI.getElementsByClassName("viewData")[0];
                let childField = ff.children;
                let jk = childField.length;
                for (let j = 0; j < jk; j++) {
                    let it = childField[j];
                    if (it.getElementsByTagName('img')[0].src.indexOf("act") < 0) {
                        lF.push(it.idField);
                        let asName = "";
                        for (let al = 0; al < alK; al++) {
                            let alIt = listAlias[al];
                            if (alIt.idField == it.idField && alIt.idSource == it.idTable && alIt.typeSource == it.typeSource) {
                                let lang = "";
                                if (alIt.lang) {
                                    lang = alIt.alias + "_!!!lang!!!";
                                }
                                asName = lang + " AS " + alIt.alias;
                                break;
                            }
                        }
                        let aliasObr = "";
                        if (manyTables) {
                            let bk = listAllField.length;
                            let countName = 0;
                            let nnn = it.name_field;
                            for (let b = 0; b < bk; b++) {
                                if (listAllField[b] == nnn) {
                                    countName ++;
                                }
                            }
                            if (countName > 1) {
                                aliasObr = aliasForF;
                            }
                        }
                        if (asName.length > 0) {
                            fields += sepF + aliasObr + asName;
                        } else {
                            fields += sepF + aliasObr + it.name_field + asName;
                        }
                        sepF = ", ";
                    }
                }
            }
            let resOneTab = {id_table:viewTabI.id_table,typeSource:viewTabI.typeSource,fullness:cf,listFields:lF};
            res.push(resOneTab);
        }
        
        
        
        ik = listAlias.length;
        for (let i = 0; i < ik; i++) {
            let al = listAlias[i];
            if (al.typeSource == "Expresion") {
                fields += sepF + al.name_field + " AS " + al.alias;
            }
        }
        
        
        
        let SQL = "SELECT " + fields + " FROM " + tables;

    // Query

        let queryChild = this.queryQueryQu.children;
        ik = queryChild.length;
        let where_query = " WHERE ";
        let where_list = [];
        let strParam = "";
        let sepStrPar = "";
        let queryForSave = [];
        let sepQ = "";
        for (let i = 0; i < ik; i++) {
            let itemQ = queryChild[i];
            let childQ = itemQ.children;
            let onlyTab = itemQ.getElementsByClassName("table");
            let jk = onlyTab.length;
            let listFieldInTab = [];
            for (let j = 0; j < jk; j++) {
                let item = onlyTab[j];
                if (item.id_field != null) {
                    let ff = {id_table:item.id_table,id_field:item.id_field,name:item.name,type:item.type,position:j};
                    listFieldInTab.push(ff);
                }
            }
            let oneQuery;
            jk = listFieldInTab.length;

            let selOper = itemQ.getElementsByClassName("operF")[0];
            let selOperValue = selOper.options[selOper.selectedIndex].value;
            let selAndOr = itemQ.getElementsByClassName("operAndOr")[0];

            let andOrValue = " AND ";
            if (selAndOr != null) {
                andOrValue = selAndOr.options[selAndOr.selectedIndex].value;
            }
            let div_par = itemQ.querySelector(".div_param");
            let inp_val = div_par.querySelector('input');
            let typeParV = div_par.querySelector(".typePar");
            let val = inp_val.value;
            let valPar = div_par.querySelector(".valPar");
            let typeVal = valPar.typeValue;
            let paramValue = val;
            let typeParValue = typeParV.options[typeParV.selectedIndex].value;

            if (jk > 0) {
                let it_0 = listFieldInTab[0];
                let nameT_0 = "";
                if (manyTables) {
                    nameT_0 = "_t_" + it_0.position + ".";
                }
                if (jk == 2) {
                    let it_1 = listFieldInTab[1];
                    let nameT_1 = "";
                    if (manyTables) {
                        nameT_1 = "_t_" + it_1.position + ".";
                    }
                    oneQuery = nameT_0 + it_0.name + " " + selOperValue + " " + nameT_1 + it_1.name;
                    where_query += sepQ + oneQuery;
                    where_list.push(oneQuery);
                } else {
                    let paramValueQu = paramValue;
                    let parVal;
                    switch (typeParValue) {
                        case "Field":
                            let fieldId = div_par.querySelector(".viewId");
                            val = fieldId.options[fieldId.selectedIndex].value.trim();
                        case "Parameter":
                            if (val == null || val.length == 0) {
                                parVal = it_0.name;
                            } else {
                                parVal = val;
                            }
                            paramValue = parVal;
                            paramValueQu = "%" + parVal + "%";
                            strParam += sepStrPar + parVal;
                            sepStrPar = ",";
                            break;
                        case "Profile":
                            let profId = div_par.querySelector(".profile");
                            parVal = profId.options[profId.selectedIndex].value.trim();
                            paramValue = parVal;
                            paramValueQu = "%" + parVal + "%";
    //                        strParam += sepStrPar + parVal;
    //                        paramValueQu = prefixProfileParam + parVal;
                            strParam += sepStrPar + it_0.name + "=" + prefixProfileParam + parVal;
                            sepStrPar = ",";
                            break;
                    }
                    let valQu = addQuote(it_0.type, paramValueQu);
                    oneQuery =  valQu + " " + selOperValue + " " + nameT_0 + it_0.name;
                    where_query += sepQ + oneQuery;
                    where_list.push(oneQuery);
                }
                sepQ = " AND ";
                queryForSave.push({addOr:andOrValue,param:paramValue,typePar:typeParValue,typeValue:typeVal,oper:selOperValue,list:listFieldInTab});
            }
        }
    //   ORDER BY

        let fieldsC = this.queryFieldsDataQu.children;
        ik = fieldsC.length;
        for (let i = 0; i < ik; i++) {
            let ffI = fieldsC[i];
            let nameFfI = ffI.querySelector(".name").innerHTML;
            listFields.push(nameFfI);
        }
        ik = this.queryOrderQu.length;
        let jk = listFields.length;
        let order_query = "";
        let sepOrd = "";
        for (let i = 0; i < ik; i++) {
            let it = this.queryOrderQu[i];
            let nameF = it.nameF;
            let ordF = it.ordF;
            if (ordF != 0) {
                for (j = 0; j < jk; j++) {
                    if (listFields[j] == nameF) {
                        let ordSort = "";
                        if (ordF == 2) {
                            ordSort = ' DESC';
                        }
                        order_query += sepOrd + nameF + ordSort;
                        sepOrd = ", "
                        break;
                    }
                }
            }
        }
        let origin_query = {fieldTable:res,where:queryForSave,order:this.queryOrderQu,listAlias:listAlias};
        let original = JSON.stringify(origin_query);
//        let nam = currentScreen.screenName + "_" + currentComponent.viewId;
//console.log("SQL="+JSON.stringify(SQL)+"<<");
        let dat = {id_query:this.idQu,name_query:nameQu,descr_query:descrQu,type_query:"SELECT",origin_query:original,sql_query:SQL,
            param_query:strParam, listWhere:JSON.stringify(where_list), orderBy:order_query,fields_result:JSON.stringify(data)};
        hostDomain = currentProject.host;
        doServerAlien("POST", hostDomain + "query/create", this, JSON.stringify(dat), 
        {source:2,id:this.idQu,name:nameQu,descr:descrQu,type_query:"SELECT",param_query:strParam,fields_result:JSON.stringify(data)}, document.body);
    }
    
    this.cbDoServer = function (res, par) {
        switch (par.source) {
            case 1:
                this.setQueryValue(res);
                break;
            case 2:
                if (this.cbQuery.cbQuery != null) {
                    this.cbQuery.cbQuery(res, par);
                } else {
                    this.cbQuery(res, par);
                }
                break;
        }
    }
    
    this.setOrderForQu = function() {
        let wFields = 180;
        let contWind = formWind(wFields + wFields + 15, 400, 40, 650, "Sorting", false, null, "Save", this, "");
        let tit = newDOMelement('<div style="height:' + hTitleQuery + 'px;border-top:1px solid #1dace9;border-bottom:1px solid #1dace9;position:absolute;left:0;top:0;right:0">'
                +'<div style="float:left;margin-top:4px;margin-left:15px;width:' + wFields + 'px;">Selected query fields</div>'
                +'<div style="float:left;margin-top:4px;">Sort fields</div></div')
        contWind.appendChild(tit);
        let contOrd = newDOMelement('<div style="position:absolute;top:' + (hTitleQuery + 1) + 'px;left:0;bottom:0;right:0;"></div>');
        contWind.appendChild(contOrd);
        let fields = newDOMelement('<div style="position:absolute;top:0;left:5px;bottom:0;width:' + wFields + 'px;border-right:1px solid #1dace9"></div>');
        contOrd.appendChild(fields);
        this.fieldsOrderView = newDOMelement('<div style="position:absolute;top:0;left:' + (10 + wFields) + 'px;bottom:0;width:' + wFields + 'px;"></div>');
        contOrd.appendChild(this.fieldsOrderView);
        let viewPort = formViewScrolY(fields);
        let fieldsData = viewPort.querySelector(".viewData");
        let aaa = this.queryFieldsDataQu.innerHTML;
        fieldsData.innerHTML = aaa;
        let fieldsC = fieldsData.children;
    //    let fieldsC = fields.children;
        let ik = fieldsC.length;
        let listFields = [];
        for (let i = 0; i < ik; i++) {
            let ffI = fieldsC[i];
            ffI.style.cursor = "pointer";
            let nameFfI = ffI.querySelector(".name").innerHTML;
            listFields.push(nameFfI);
            ffI.addEventListener("click", () => {
                let ffCl = event.target.closest('.field');
                let nn = ffCl.querySelector(".name").innerHTML;
                let ffO = this.fieldForOrderQu(nn, 'order_az.png');
                this.fieldsOrderView.appendChild(ffO);
            }, true);
        }
        viewPort.scroll_y.resize();
        ik = this.queryOrderQu.length;
        let jk = listFields.length;
        for (let i = 0; i < ik; i++) {
            let it = this.queryOrderQu[i];
            let nameF = it.nameF;
            let ordF = it.ordF;
            if (ordF != 0) {
                let noIs = true;
                for (j = 0; j < jk; j++) {
                    if (listFields[j] == nameF) {
                        let srcOrd = 'order_az.png';
                        if (ordF == 2) {
                            srcOrd = 'order_za.png';
                        }
                        let ffOrd = this.fieldForOrderQu(nameF, srcOrd);
                        this.fieldsOrderView.append(ffOrd);
                        noIs = false;
                        break;
                    }
                }
                if (noIs) {
                    it.ordF = 0;
                }
            }
        }
    }
    
    this.cbWind = function() {      //  saveSorting
//    this.saveSortingQu = function () {
        let childOrd = this.fieldsOrderView.children;
        let ik = childOrd.length;
        if (this.queryOrderQu == null) {
            this.queryOrderQu = [];
        } else {
            this.queryOrderQu.length = 0;
        }
        for (let i = 0; i < ik; i++) {
            let viewF = childOrd[i];
            let nn = viewF.querySelector(".name").innerHTML;
            let src = viewF.querySelector(".typeOrd").src;
            let ord = 1;
            if (src.indexOf("order_za") > -1) {
                ord = 2;
            }
            this.queryOrderQu.push({nameF:nn,ordF:ord});
        }
    }
    
    this.fieldForOrderQu = function (name, src) {
        let res = newDOMelement('<div class="fieldOrd" style="width:100%;height:' + hTitleQuery + 'px;border-bottom:1px solid #1dace9"></div>');
        let nn = newDOMelement('<div class="name" style="float:left;margin-left:4px;margin-top:4px">' + name + '</div>');
        res.appendChild(nn);
        let del = newDOMelement('<img onclick="delOrd(this)" style="margin-top:6px;float:right;margin-right:7px;cursor:pointer;" width="10" height="10" src="img/del_red.png">')
        res.appendChild(del);
        let arrT = newDOMelement('<img onclick="liftUpOrd(this)" style="margin-top:5px;float:right;margin-right:7px;cursor:pointer;" width="12" height="12" src="img/arrow_top.png">')
        res.appendChild(arrT);
        let ord = newDOMelement('<img class="typeOrd" onclick="typeOrd(this)" style="margin-top:4px;float:right;margin-right:7px;cursor:pointer;" width="14" height="14" src="img/' + src + '">')
        res.appendChild(ord);
        return res;
    }
    
    this.addWhereForQu = function(item) {
        let itemParam = "";
        let itemOper = "";
        let itemAndOr = "AND";
        let itemTypePar = "";
        let itemTypeValue;
        if (item != null) {
            itemParam = item.param;
            itemOper = item.oper;
            itemAndOr = item.addOr;
            itemTypePar = item.typePar;
            itemTypeValue = item.typeValue;
        }
        itemAndOr = "AND";
        let qu = '<div class="one_query" onclick="selectQuery(this);" style="height:' + hTitleQuery + 'px;border-bottom:1px solid #1dace9;width:100%"></div>';
        let quEl = newDOMelement(qu);
        let and_or = newDOMelement('<div class="and_or" style="float:left;width:' + wOperQuery + 'px;border-right:1px solid #1dace9;height:100%"></div>');
        quEl.appendChild(and_or);
        let quParam = newDOMelement('<div class="div_param" style="float:left;width:' + wDivParam + 'px;border-right:1px solid #1dace9;height:100%"></div>');
        let selectTypeParam = formSelectForEditData("Parameter,System,Value,Field,Profile", itemTypePar);
        selectTypeParam.className = "typePar select";
        selectTypeParam.addEventListener("change", () => {this.setTypeParQu(selectTypeParam)}, false);
        selectTypeParam.style.cssText = 'float:left;border:none;width:' + wTypeParamQu + 'px;background-color:#0000;text-indent:unset;font-size:11px;margin-top:4px';
        quParam.append(selectTypeParam);
        let valueParam = newDOMelement('<div class="valPar" style="float:left;height:100%"></div>');
        valueParam.typeValue = itemTypeValue;
        quParam.append(valueParam);
        let inpV = newDOMelement('<input class="value_qu" value="' + itemParam + '" type="text" style="width:' + (wDivParam - wTypeParamQu - 6) 
                +'px;margin-top:3px;border:none;background-color:#0000;font-size:11px;margin-top:3px"/>');
        valueParam.append(inpV);

        let inp = newDOMelement('<select class = "viewId select_' + browser + '">');
        let vvF = "";
        if (itemTypePar == "Field") {
            vvF = itemParam;
        }

        inp.innerHTML = newOptionsTypeUI(null, vvF);
        inp.style.cssText = 'float:left;border:none;width:' +  (wDivParam - wTypeParamQu - 6) + 'px;background-color:#0000;text-indent:unset;font-size:11px;height:24px;';
        inp.style.display = "none";
        quParam.append(inp);

        let inpProf = newDOMelement('<select class = "profile select_' + browser + '">');
        vvF = "";
        if (itemTypePar == "Profile") {
            vvF = itemParam;
        }
        inpProf.innerHTML = this.optionsProfileQu(vvF);
        inpProf.style.cssText = 'float:left;border:none;width:' +  (wDivParam - wTypeParamQu - 6) + 'px;background-color:#0000;text-indent:unset;font-size:11px;height:24px;';
        inpProf.style.display = "none";
        quParam.append(inpProf);

        quEl.appendChild(quParam);
        let oper_param = newDOMelement('<div class="oper_param" style="float:left;width:' + wOperQuery + 'px;border-right:1px solid #1dace9;height:100%"></div>');
        quEl.appendChild(oper_param);
        let delQu = newDOMelement('<img class="delQu" style="margin-top:3px;float:right;margin-right:2px;cursor:pointer;" width="16" height="16" src="img/close-o.png">');
        delQu.addEventListener("click", () => {this.delQu(delQu);}, true);
        quEl.appendChild(delQu);
        let selectOper = formSelectForEditData("=,<,>,<=,>=,<>,LIKE",itemOper);
        selectOper.className = "operF";
        selectOper.style.cssText = 'border:none;width:100%;background:#0000;text-indent:unset;text-overflow:unset;font-size:11px;text-align:center;margin-top:4px';
        oper_param.appendChild(selectOper);

        if (this.queryQueryQu.children != null && this.queryQueryQu.children.length > 0) {
            if (itemAndOr != "") {
                let selectAndOr = formSelectForEditData("AND,OR,NOT", itemAndOr);
                selectAndOr.className = "operAndOr";
                selectAndOr.style.cssText = 'border:none;width:100%;background:#0000;text-indent:unset;text-overflow:unset;font-size:11px;text-align:center;margin-top:4px';
                and_or.appendChild(selectAndOr);
            } else {

            }
        }
        let ik = this.listTablesForQu.length;
        for (let i = 0; i < ik; i++) {
            this.addViewForTableInQu(i, quEl);
        }

        this.queryQueryQu.appendChild(quEl);
        if (selectQueryEl != null) {
            selectQueryEl.style.backgroundColor = "";
        }
        selectQueryEl = quEl;
        quEl.style.backgroundColor = "#f3f8ff";
        if (item != null) {
            ik = item.list.length;
            let ccc = this.queryQueryQu.children;
            for (let i = 0; i < ik; i++) {
                itTab = item.list[i];
                let tab = this.getTabForQu(itTab.id_table);
                if (tab != null) {
                    let ff = this.getFieldInTableQu(itTab.id_field, tab);
                    if (ff != null) {
                        this.setFieldInQueryParamQu(itTab.id_table, ff.id_field, ff.name, ff.type, true);
                    } else {
                        this.errorQuery = true;
                    }
                } else {
                    this.errorQuery = true;
                }
            }
        }

        this.setTypeParQu(selectOper, true);
        let scr = this.queryQueryQu.closest('.viewport');
        scr.scroll_y.resize();
        if (this.errorQuery) {
            dialogError("Caution!", "Data change affected this request");
        }
    }
    
    this.optionsProfileQu = function (vv) {
        if (this.listTables != null && this.listTables.length > 0) {
            let st = '';
            let ik = listTables.length;
            for (let i = 0; i < ik; i++) {
                let itemTab = listTables[i];
                if (itemTab.name_table == "user") {
                    let listField = JSON.parse(itemTab.fields_table);
                    let jk = listField.length;
                    for (let j = 0; j < jk; j++) {
                        let sel = "";
                        nameF = listField[j].name;
                        if (nameF == "login" || nameF == "password") {
                            continue;
                        }
                        if (nameF == vv) {
                            sel = "selected";
                        }
                        st += '<option ' + sel + '>' + nameF + '</option>'
                    }
                }
            }
            return st;
        }
        return "";
    }
    
    this.delQu = function(el) {
        let qu = el.closest('.one_query');
        qu.remove();
    }
    
    this.setTypeParQu = function (el, newQU) {
        let qu = el.closest('.one_query');
        let listQu = qu.getElementsByClassName("field");
        let ik = listQu.length;
        let count = 0;
        let quI;
        for (let i = 0; i < ik; i++) {
            quI = listQu[i];
            if (quI.innerHTML.length > 0) {
                count++;
            }
        }
        let typePar = qu.querySelector(".typePar");
        let valPar = qu.querySelector(".valPar");
        let selPar = qu.querySelector(".viewId");
        let selProf = qu.querySelector(".profile");
        if (count == 1) {
            let typeF = quI.typeField;
            let inputValue = valPar.querySelector(".value_qu");
            inputValue.type = "text";
            inputValue.onkeydown = null;
            if (! newQU) {
                inputValue.value = "";
            }
            selPar.style.display = "none";
            switch (typePar[typePar.selectedIndex].value) {
                case "Parameter":
                    typePar.style.display = "block";
                    valPar.style.display = "block";
                    inputValue.onkeydown = validNameParam;
                    valPar.typeValue = "";
                    break;
                case "Profile":
                    typePar.style.display = "block";
                    valPar.style.display = "none";
                    selPar.style.display = "none";
                    selProf.style.display = "block";
                    break;
                case "Field":
                    typePar.style.display = "block";
                    valPar.style.display = "none";
                    selPar.style.display = "block";
                    valPar.typeValue = "";
                    break;
                case "System":
                    typePar.style.display = "block";
                    valPar.style.display = "none";
                    inputValue.value = "";
                    switch (typeF) {
                        case "Date":
                            inputValue.value = "CURRENT_DATE";
                            break;
                        case "Time":
                            inputValue.value = "CURRENT_TIME";
                            break;
                        case "Timestamp":
                        case "TimestampZ":
                            inputValue.value = "CURRENT_TIMESTAMP";
                            break;
                        default:
                            inputValue.value = "Has no system value";
                    }
                    valPar.typeValue = "";
                    inputValue.onkeydown = function(e) {return false;}
                    break;
                case "Value":
                    valPar.style.display = "block";
                    if (typeF != valPar.typeValue || newQU) {
                        if (! newQU) {
                            inputValue.value = "";
                        }
                        valPar.typeValue = typeF;
                        switch (typeF) {
                            case "Long":
                            case "Int":
                                inputValue.onkeydown = validNumberSign;
                                break;
                            case "Float":
                            case "Double":
                                inputValue.onkeydown = validFloat;
                                break;
                            case "Boolean":

                                break;
                            case "Text":
                                inputValue.onkeydown = null;
                                break;
                            case "Date":
                                inputValue.type = "date";
                                break;
                            case "Timestamp":
                                inputValue.type = "datetime";
                                break;
                            case "Time":
                                inputValue.type = "time";
                                break;
                        }
                    }
                    break;
            }
        } else {
            typePar.style.display = "none";
            valPar.style.display = "none";
        }
    }
    
    this.getTabForQu = function (id) {
        let ik = this.listTablesForQu.length;
        for (i = 0; i < ik; i++) {
            let item = this.listTablesForQu[i];
            if (item.id_table == id) {
                return item;
            }
        }
        return null;
    }
    
    this.getFieldInTableQu = function (id, tab) {
        let fields = tab.fields_table;
        let ik = fields.length;
        for (i = 0; i < ik; i++) {
            let item = fields[i];
            if (item.id_field == id) {
                return item;
            }
        }
        return null;
    }
    
    this.addViewForTableInQu = function(i, quEl) {
        let item = this.listTablesForQu[i];
        let divWhereForTab = newDOMelement('<div class="table" style="float:left;width:' + this.wTableInQu 
                + 'px;display:flex;flex-direction:row;align-items:center;border-right:1px solid #1dace9;height:100%"></div>');
        let field = newDOMelement('<div class="field" style="margin-left:3px"></div>');
        divWhereForTab.appendChild(field);
        divWhereForTab.id_table = item.id_table;
        divWhereForTab.name_table = item.name_table;
        quEl.appendChild(divWhereForTab);
    }
    
    this.oneTableQu = function(i, el) {
        let item = this.listTables[i];
        let cont = newDOMelement('<div style="float:left;width:100%;height:30px;overflow: hidden;cursor:pointer;border-bottom:1px solid #aaf;clear:both"></div>');
        let name = newDOMelement('<div style="font-size:16px;color:#000;margin-top:5px;float:left;margin-left:5px;color:#f00">' + item.name_table + '</div>');
        cont.appendChild(name);
        cont.addEventListener("click", () => {closeWindow(el);this.formTableQu(i);}, true);
        el.appendChild(cont);
        let rect = cont.getBoundingClientRect();
        let rect_1 = name.getBoundingClientRect();
        let descr = newDOMelement('<div style="font-size:12px;color:#555;margin-top:9px;height:12px;width:' + (rect.width - rect_1.width - 20) 
                + 'px;float:left;margin-left:10px;overflow:hidden">' + item.title_table + '</div>');
        cont.appendChild(descr);
    }
    
    this.addTableQu = function() {
        if (this.listTablesForQu.length > 4) return;
        let wind = formWind(250, 450, 40, 350, "Choose a table", true);
        let cont = newDOMelement('<div style="position:absolute;left:5px;right:10px"></div>');
        wind.appendChild(cont);
        let ik = this.listTables.length;
        if (ik > 0) {
            for (let i = 0; i < ik; i++) {
                this.oneTableQu(i, cont);
            }
        }
        resizeScrol(wind);
    }
    
    this.formTableQu = function(i) {
        let item = this.listTables[i];
        item.typeSource = "Table";
        let itemForList = {id_table:item.id_table,typeSource:item.typeSource,name_table: item.name_table,title_table:item.title_table,fields_table:JSON.parse(item.fields_table)};
        this.listTablesForQu.push(itemForList);
        this.formBlockTableQu(item);

        let jk = this.queryQueryQu.children.length;
        let indListT = this.listTablesForQu.length - 1;
        for (let j = 0; j < jk; j++) {
            let quEl = this.queryQueryQu.children[j];
            this.addViewForTableInQu(indListT, quEl);
        }
    }
    
    this.formBlockTableQu = function(item) {
        let hTitle = 24;
        let block = newDOMelement('<div class="table_view" style="width:' + this.wTableInQu + 'px;height:100%;float:left;position:relative;border-right:1px solid #1dace9;"></div>');
        block.id_table = item.id_table;
        block.name_table = item.name_table;
        block.typeSource = item.typeSource;
        let title = newDOMelement('<div class="tab_title" style="height:24px;border-bottom:1px solid #1dace9;position:absolute;left:0;top:0;right:0;background:#f3f8ff;">' 
                +'<div style="margin-top:3px;width:100%;text-align:center;font-size:14px;">' + item.name_table + '</div>'
                +'</div>');
        block.appendChild(title);
        let selField = newDOMelement('<img style="width:14px;height:14px;position:absolute;right:10px;top:3px;cursor:pointer" src="img/check-act.png">');
        selField.addEventListener("click", () => {this.selAllFieldInTableQu(selField);}, true);
        title.appendChild(selField);

        this.queryTables.appendChild(block);
        let wraperScroll = newDOMelement('<div style="position:absolute;left:0;top:' + hTitle + 'px;right:0;bottom:0"></div');
        block.appendChild(wraperScroll);
        let viewScroll = formViewScrolY(wraperScroll);
        viewScroll.style.right = "9px";
        let viewDataT = viewScroll.getElementsByClassName("viewData")[0];
    //    viewDataT.style.marginRight = "15px";
        let fields = JSON.parse(item.fields_table);
        let ik = fields.length;
        for (let i = 0; i < ik; i++) {
            this.oneFieldTablesQu(item.id_table, item.typeSource, fields[i], viewDataT);
        }
        let imgAddQuery = footerQuery.getElementsByClassName("addWhere")[0];
        if (imgAddQuery != null) {
            imgAddQuery.style.display = "block";
        }
    }
    
    this.oneFieldTablesQu = function(idTable, typeSource, item, el) {
        let cont = newDOMelement('<div class="cont_f" style="float:left;width:100%;position:relative;height:' 
                + hItemListFieldsTable + 'px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
        cont.idTable = idTable;
        cont.idField = item.id_field;
        cont.name_field = item.name;
        cont.type_field = item.type;
        cont.title = item.title;
        cont.typeSource = typeSource;
        let name = newDOMelement('<div style="font-size:14px;color:#000;margin-top:2px;cursor:pointer;float:left;margin-left:3px">' 
                + item.name + '</div>');
        cont.appendChild(name);
        name.addEventListener("click", () => {this.setFieldInQu(name);}, true);
        el.appendChild(cont);
        let rect = cont.getBoundingClientRect();
        let rect_1 = name.getBoundingClientRect();
        let descr = newDOMelement('<div style="font-size:10px;color:#555;margin-top:6px;height:11px;width:' + (rect.width - rect_1.width - 20) 
                + 'px;float:left;margin-left:5px;overflow:hidden">' + item.title + '</di>');
        cont.appendChild(descr);
        let selField = newDOMelement('<img style="width:14px;cursor:pointer;height:14px;position:absolute;right:2px;top:3px;" src="img/check-act.png">');
        selField.addEventListener("click", () => {this.selFieldInTableQu(selField);}, true);
        cont.appendChild(selField);
    }

    this.selFieldInTableQu = function(el) {
        if (checkElement(el)) {
            this.addFieldsInQu(el);
        } else {
            this.delFieldsInQu(el);
        }
        this.setViewAllImgQu(el);
    }
    
    this.setViewAllImgQu = function (el) {
        let cont = el.closest(".viewData");
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
        let tabBlock = el.closest(".table_view");
        let viewData = tabBlock.getElementsByClassName("tab_title")[0];
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
    
    this.addFieldsInQu = function (el) {
        let cont = el.closest('.cont_f');
        let idTab = cont.idTable;
        let typeSource = cont.typeSource;
        let idF = cont.idField;
        let ik = this.listTablesForQu.length;
        let itemTab = null;
        for (let i = 0; i < ik; i++) {
            itemTab = this.listTablesForQu[i];
            if (itemTab.id_table == idTab) {
                let fields = itemTab.fields_table;
                let jk = fields.length;
                for (let j = 0; j < jk; j++) {
                    let itemField = fields[j];
                    if (itemField.id_field == idF) {
                        this.oneFieldViewQu(idTab, typeSource, itemField, this.queryFieldsDataQu);
                        let ss = this.queryFieldsDataQu.closest(".viewport");
                        ss.scroll_y.resize();
                        break;
                    }
                }
                break;
            }
        }
    }
    
    this.delFieldsInQu = function(el) {
        let cont = el.closest('.cont_f');
        let idTab = cont.idTable;
        let idF = cont.idField;
        let fieldsView = this.queryFieldsDataQu.children;
        let ik = fieldsView.length;
        for (let i = 0; i < ik; i++) {
            let vv = fieldsView[i];
            if (idTab == vv.idTable && idF == vv.idField) {
                vv.remove();
                let ss = this.queryFieldsDataQu.closest(".viewport");
                ss.scroll_y.resize();
                break;
            }
        }
    }
    
    this.selAllFieldInTableQu = function(el) {
        if (checkElement(el)) {
            this.addAllFieldsInQu(el);
        } else {
            this.delAllFieldsInQu(el);
        }
    }
    
    this.oneFieldViewQu = function (idTab, typeSource, item, el) {
        let cont = newDOMelement('<div class="field" style="float:left;width:100%;position:relative;height:' 
                + hItemListFieldsTable + 'px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
        cont.idTable = idTab;
        cont.idField = item.id_field;
        cont.name_field = item.name;
        cont.type_field = item.type;
        cont.title = item.title;
        cont.typeSource = typeSource;
        el.append(cont);
        cont.addEventListener("contextmenu", () => {
            event.preventDefault();event.stopPropagation();
            this.setAlias(cont);
        }, true);
        if (this.listAlias != null) {
            let alK = this.listAlias.length;
            cont.alias = "";
            for (let al = 0; al < alK; al++) {
                let alIt = this.listAlias[al];
                if (alIt.idField == item.id_field && alIt.idSource == idTab && alIt.typeSource == typeSource) {
                    cont.alias = alIt.alias;
                    cont.lang = alIt.lang;
                    break;
                }
            }
        }
        this.setNameFieldView(cont);
    }
    
    this.setNameFieldView = function(cont) {
        let nam;
        if (cont.alias != null && cont.alias.length > 0) {
            let lang = "";
            if (cont.lang) {
                lang = " (locale)";
            }
            nam = cont.name_field +  ' AS ' + cont.alias + lang;
        } else {
            nam = cont.name_field;
        }
        let name = newDOMelement('<div class="name" style="font-size:14px;color:#000;margin-top:2px;float:left;margin-left:3px">' 
                + nam + '</div>');
        cont.append(name);
        let rect = cont.getBoundingClientRect();
        let rect_1 = name.getBoundingClientRect();
        let descr = newDOMelement('<div style="font-size:10px;color:#555;margin-top:6px;height:11px;width:' + (rect.width - rect_1.width - 20) 
                + 'px;float:left;margin-left:5px;overflow:hidden">' + cont.title);
        cont.append(descr);
    }
    
    this.setAlias = function(el) {
        let pp = formPopUp(el, 300, 150);
        let meta_Alias = [
            {name: "alias", title:"Alias",len:140,type:"Text",valid:"name_low",clear:true},
            {name: "lang", title:"Data varies by language",type:"Check"}
        ]
        this.alias = {alias:el.alias};
        new EditForm(meta_Alias, this.alias, pp);
        let controll = createFooter(50);
        pp.append(controll);
        let buttonOk = createButtonBlue("Save");
        buttonOk.addEventListener('click', () => {closePopUp(pp);this.saveAlias(el)});
        controll.append(buttonOk);
        let buttonCancel = createButtonWeite('Cancel', 70);
        buttonCancel.addEventListener('click', () => {closePopUp(pp);});
        controll.append(buttonCancel);
    }
    
    this.saveAlias = function(el) {
        el.alias = this.alias.alias;
        el.lang = this.alias.lang;
        el.innerHTML = "";
        this.setNameFieldView(el);
    }
    
    this.setFieldInQu = function(el) {
        let cont = el.closest(".cont_f");
        let idTab = cont.idTable;
        let idField = cont.idField;
        let name = cont.name_field;
        this.setFieldInQueryParamQu(idTab, idField, name, cont.type_field, false);
    }
    
    this.setFieldInQueryParamQu = function(idTab, idField, nameField, typeField, empyData) {
        let ik = this.listTablesForQu.length;
        let iRes = -1;
        for (let i = 0; i < ik; i++) {
            let item = this.listTablesForQu[i];
            if (idTab == item.id_table) {
                iRes = i;
                break;
            }
        }
        if (iRes > -1 && selectQueryEl != null) {
            let listTab = selectQueryEl.getElementsByClassName("table");
            if (iRes < listTab.length) {
                let item = listTab[iRes];
                let elFieldQu = item.querySelector(".field");
                if (elFieldQu.innerHTML == nameField) {
                    elFieldQu.innerHTML = "";
                    elFieldQu.typeField = "";
                } else {
                    item.id_field = idField;
                    item.name = nameField;
                    item.type = typeField;
                    elFieldQu.typeField = typeField;
                    elFieldQu.innerHTML = nameField;
                }
                this.setTypeParQu(elFieldQu, empyData);
            }
        }
    }
    
    this.addAllFieldsInQu = function (el) {
        let tabBlock = el.closest(".table_view");
        let viewData = tabBlock.getElementsByClassName("viewData")[0];
        let child = viewData.children;
        let ik = child.length;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            let sel = itemEl.getElementsByTagName("img")[0];
            if (sel.src.indexOf("check-sel") == -1) {
                this.addFieldsInQu(sel);
                sel.src = "img/check-sel_1.png";
            }
        }
    }

    this.delAllFieldsInQu = function (el) {
        let tabBlock = el.closest(".table_view");
        let viewData = tabBlock.getElementsByClassName("viewData")[0];
        let child = viewData.children;
        let ik = child.length;
        for (let i = 0; i < ik; i++) {
            let itemEl = child[i];
            let sel = itemEl.getElementsByTagName("img")[0];
            if (sel.src.indexOf("check-sel") > -1) {
                this.delFieldsInQu(sel);
                sel.src = "img/check-act.png";
            }
        }
    }
    
    this.init();
}