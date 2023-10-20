

function dbEditQuery(wind, idQu, forCompon) {
    let hFooter = 150;
    let wFieldQuery = 220;
    selectQueryEl = null;
    listTablesForQuery.length = 0;
    let descr = '<div class="descrQuery" style="height:' + hTitleQuery + 'px;border-bottom:1px solid #1dace9;">'
            +'<div style="margin-top:5px;float:left;font-size:10px;margin-left:10px">Name</div>'
            +'<input class="inpName input_style" onkeydown="keyText(event,' + "'name_low'" + ')" type="text" style="margin-left:10px;width:200px;height:20px;float:left"/>'
            +'<div style="margin-top:5px;float:left;font-size:10px;margin-left:10px">Description</div>'
            +'<input class="inpDescr input_style" type="text" style="margin-left:10px;width:400px;height:20px;float:left"/>'
            +'</div>';
    let title = '<div style="height:' + hTitleQuery + 'px;border-bottom:1px solid #1dace9;">'
            +'<div style="width:' + wFieldQuery + 'px;text-align:center;margin-top:3px;float:left;font-size:14px;">Fields</div>'
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
    addFooter(wind, controll);
    let buttonSave = createButtonBlue('Save', 70);
    buttonSave.addEventListener("click", function(){closeDataWindow(wind, dbSaveQuery(idQu, forCompon))}, false);
    controll.appendChild(buttonSave);
    let buttonCancel = createButtonWeite('Cancel', 70);
    buttonCancel.addEventListener("click", function(event){closeWindow(wind);}, true);
    controll.appendChild(buttonCancel);
    let descript = newDOMelement(descr);
    wind.appendChild(descript);
    let windMenu = newDOMelement('<div class="windMenu_q" style="position:absolute;top:' + (hTitleQuery + 1) + 'px;left:0;right:0;bottom:50px"></div>');
    wind.appendChild(windMenu);
    let titleEl = newDOMelement(title);
    let addTab = newDOMelement('<img style="margin-top:4px;margin-left:25px;float:left;cursor:pointer;" width="14" height="14" src="img/add_blue.png">');
    let order = newDOMelement('<img style="margin-top:6px;margin-right:15px;float:right;cursor:pointer;" width="12" height="12" src="img/sort-2.png">');
    titleEl.appendChild(addTab);
    titleEl.appendChild(order);
    titleEl.append(newDOMelement('<div style="margin-top:4px;float:right;margin-right:7px;">Order</div>'));

    windMenu.appendChild(titleEl);

    
    let footerEl = newDOMelement(footer);
    footerQuery = footerEl;
    windMenu.appendChild(footerEl);
    let titleWhereEl = newDOMelement(titleWhere);
    footerEl.appendChild(titleWhereEl);
    let addWhere = newDOMelement('<img class="addWhere" style="margin-top:4px;margin-left:25px;display:none;float:left;cursor:pointer;" width="14" height="14" src="img/add_blue.png">');
    addWhere.addEventListener("click", function(){
        addWhereForQuery();
    }, true);
    titleWhereEl.appendChild(addWhere);
    wraperQuery = newDOMelement('<div class="wraperQuery" style="position:absolute;top:' + (hTitleQuery + 1) + 'px;left:0;right:0;bottom:0"></div>')
    footerEl.appendChild(wraperQuery);
    let scrollQu = formViewScrolY(wraperQuery, true);
    queryQueryData = scrollQu.getElementsByClassName("viewData")[0];
    
    windMenu.append(newDOMelement(fieldsTit));
    queryFields = newDOMelement(fields);
    windMenu.appendChild(queryFields);
    queryTables = newDOMelement(tables);
    windMenu.appendChild(queryTables);
    order.addEventListener("click", function(){
        setOrderForQuery();
    }, true);
    addTab.addEventListener("click", function(){
        addTableForQuery();
    }, true);

    let scrF = formViewScrolY(queryFields, true);
    queryFieldsData = scrF.querySelector(".viewData");
    
    if (queryOrder == null) {
        queryOrder = [];
    } else {
        queryOrder.length = 0;
    }
    
    if (listTables != null) {
        if (idQu != null && idQu > -1) {
            doServerAlien("GET", hostDomain + "query/get?id=" + idQu , cbDBQueryValue, null, null, wind);
        }
    } else {
        hostDomain = currentProject.host;
        hostDescr = currentProject.whereServer;
        if (hostDomain != null && hostDomain.length > 0  && hostDescr != "Third party API") {
           doServerAlien("GET", hostDomain + 'tables/list', cbDBGetListTablesQuery, null, idQu, wind);
        }
    }
}

function cbDBGetListTablesQuery(res, idQu) {
    listTables = JSON.parse(res);
    if (idQu != null && idQu > -1) {
        doServerAlien("GET", hostDomain + "query/get?id=" + idQu , cbDBQueryValue, null, null, wind);
    }
}

function cbDBQueryValue(res) {
    errorQuery = false;
/*
    if (queryOrder == null) {
        queryOrder = [];
    } else {
        queryOrder.length = 0;
    }
*/
    let ik;
    let query = JSON.parse(res);
    let originQuery = JSON.parse(query.origin_query);
    let wind_1 = queryTables.closest(".wind");
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
            let tab = getTabInQuery(item.id_table);
            if (tab != -1) {
                formTableForQuery(tab);
                let bb = queryTables.getElementsByClassName("table_view");
                let bbL = bb.length;
                if (bbL > 0) {
                    let blockTab = bb[bbL - 1];
                    let rr = blockTab.getElementsByClassName('tab_title')[0];
                    let imgAll = rr.getElementsByTagName('img')[0];
                    if (item.fullness == 2) {
                        checkAllFieldsInQuery(blockTab);
                        imgAll.src = "img/check-sel_1.png";
                    } else if (item.fullness == 1) {
                        checkSelFieldsInQuery(blockTab, item.listFields);
                        imgAll.src = "img/check-sel-blur.png";
                    }
                }
            } else {
                errorQuery = true;
            }
        }
    }
    if (originQuery.where != null) {
        let where = originQuery.where;
        ik = where.length;
        for (let i = 0; i < ik; i++) {
            item = where[i];
            addWhereForQuery(item);
        }
    }
    let ord = originQuery.order;
    if (ord != null) {
        ik = ord.length;
        for (let i = 0; i < ik; i++) {
            queryOrder.push(ord[i]);
        }
    }
/*
    let dataEd = currentComponentDescr.model.data[0];
    let fk = dataEd.length;
    if (dataEd != null) {
        let fieldsQQ = queryFieldsData.children;
        ik = fieldsQQ.length;
        for (let i = 0; i < ik; i++) {
            let item = fieldsQQ[i];
            if (item.type_field.indexOf("erial") == -1) {
                let imgCheck = item.querySelector("IMG");
                if (imgCheck != null) {
                    imgCheck.src = "img/check-act.png";
                    for (f = 0; f < fk; f++) {
                        let itemF = dataEd[f];
                        if (itemF.name == item.name_field) {
                            if (itemF.edit) {
                                imgCheck.src = "img/check-sel_1.png";
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
*/
}

function dbSaveQuery(qu, forCompon){
    let wind_1 = queryTables.closest(".wind");
    let inpName = wind_1.querySelector(".inpName");
    let nameQu = inpName.value;
    if (nameQu == null || nameQu == "") {
        myAlert("Query name not specified");
        return true;
    }
    let inpDescr = wind_1.querySelector(".inpDescr");
    let descrQu = inpDescr.value;
    
    let childTab = queryTables.children;
    let ik = childTab.length;
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
    let data = [];
    let itemData;
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
        if (selTab.src.indexOf("act") > -1) {
            cf = 0;
        } else if (selTab.src.indexOf("blur") > -1) {
            cf = 1;
        } else {
            cf = 2;
            fields += sepF + aliasForF + "*";
            sepF = ", ";
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
                    fields += sepF + aliasObr + it.name_field;
                    sepF = ", ";
                }
            }
        }
        resOneTab = {id_table:viewTabI.id_table,fullness:cf,listFields:lF};
        res.push(resOneTab);
    }

    let fieldsQQ = queryFieldsData.children;
    ik = fieldsQQ.length;
    let listFields = [];
    for (let i = 0; i < ik; i++) {
        let item = fieldsQQ[i];
        if (item.type_field.indexOf("erial") == -1) {
//            let sel = item.querySelector("SELECT");
//            itemData = {name:item.name_field,type:item.type_field,edit:sel.value};          
            let imgCheck = item.querySelector("IMG");
            let ed = false;
            if (imgCheck != null && imgCheck.src.indexOf("check-sel") > -1) {
                ed = true;
            }
            itemData = {name:item.name_field,type:item.type_field,edit:ed};
            data.push(itemData);
        }
    }
    
    let SQL = "SELECT " + fields + " FROM " + tables;
/*
    let qu = -1;
    currentComponentDescr.model.data[0] = data;
    currentComponentDescr.model.bool_1 = noRequest.src.indexOf("check-sel") > -1;
    let url = currentComponentDescr.model.url;
    if (url != null && url != "") {
        url = "" + url;
        let ar = url.split("/")
        if (ar.length > 1) {
            qu = parseInt(ar[2]);
        } else {
            qu = parseInt(url);
        }
    }
    if (qu == null || isNaN(qu)) {
        qu = -1;
    }
*/
// Query

    let queryChild = queryQueryData.children;
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
//console.log("queryForSave="+JSON.stringify(queryForSave));

//   ORDER BY

    let fieldsC = queryFieldsData.children;
    ik = fieldsC.length;
    for (let i = 0; i < ik; i++) {
        let ffI = fieldsC[i];
        let nameFfI = ffI.querySelector(".name").innerHTML;
        listFields.push(nameFfI);
    }
    ik = queryOrder.length;
    let jk = listFields.length;
    let order_query = "";
    let sepOrd = "";
    for (let i = 0; i < ik; i++) {
        let it = queryOrder[i];
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
    let origin_query = {fieldTable:res,where:queryForSave,order:queryOrder};
//    currentComponentDescr.model.param = strParam;
    let original = JSON.stringify(origin_query);
    if (forCompon && (nameQu == null || nameQu == "")) {
        currentComponentDescr.model.param = strParam;
        if (nameQu == null || nameQu == "") {
            nameQu = currentScreen.screenName + "_" + currentComponent.viewId;
        }
    }
    let dat = {id_query:qu,name_query:nameQu,descr_query:descrQu,type_query:"SELECT",origin_query:original,sql_query:SQL,param_query:strParam, listWhere:JSON.stringify(where_list), orderBy:order_query};
    hostDomain = currentProject.host;
//console.log("hostDomain="+hostDomain+"<< DAT="+JSON.stringify(dat));
    doServerAlien("POST", hostDomain + "query/create", cbDBQueryCreate, JSON.stringify(dat), {forCompon:forCompon,id:qu,name:nameQu,descr:descrQu}, document.body);
}

function cbDBQueryCreate(res, par) {
    let dat = JSON.parse(res);
    if (par.forCompon) {
        if (dat.id_query != null) {
            currentComponentDescr.model.url = "query/" + currentProject.resurseInd + "/" + dat.id_query;
        }
    } else {
        if (par.id == -1) {
            
        }
    }
/*
    let dat = JSON.parse(res);
    if (dat.id_query != null) {
        currentComponentDescr.model.url = "query/" + currentProject.resurseInd + "/" + dat.id_query;
    }
*/
}