var listTables = null;
var fieldsTable;
var tablePosition;
var hItemListFieldsTable = 24;
var listTablesForQuery = [];
var idTableField;
var USER_TABLE_NAME = "user";

let htmlTable = '<div class="descrTable" style="height:40px;margin-left:20px">'
        +'<div style="float:left;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">Name table</div>'
        +'<input class="name_t input_style" onkeyup="setFieldId(this)" onkeydown="return validNameLower(event)" value="" type="text" size="30"/>'
        +'</div>'
        +'<div style="float:left;margin-left:10px"><div style="color: #2228;font-size: 10px;margin-left:4px">Description</div>'
        +'<input class="descr_t input_style" value="" type="text" size="60"/>'
        +'</div>'
    +'</div>';

function addTable() {
    let descrTable = newDOMelement(htmlTable);
    descrTable.id_table = -1;
    fieldsTable = [{id_field:0, name:"id_", type:"Bigserial", title:"Primary key", key:true, system:"primary"},
        {id_field:1, name:"__date_create", type:"Timestamp", title:"Date create",def:"CURRENT_TIMESTAMP",system:"__date_create"}, 
        {id_field:2, name:"__date_edit", type:"Timestamp", title:"Date edit",def:"CURRENT_TIMESTAMP",system:"__date_edit"}];
    let editDataTable = editDataWind(metaTable, fieldsTable, cbAddTable, descrTable, 500, 500, 300);
    let td = editDataTable.getCellXY(0, 1);
    descrTable.fieldId = td.querySelector("INPUT");
}

function cbAddTable(dat, dopEl) {
    let nn = dopEl.getElementsByClassName("name_t")[0].value;
    let dd = dopEl.getElementsByClassName("descr_t")[0].value;
    let tableId = dopEl.id_table;
    if (nn != null && nn != "") {
        let ik = listTables.length;
        for (let i = 0; i < ik; i++) {
            let item = listTables[i]
            if (nn == item.name_table && tableId != item.id_table) {
                myAlert("There is already a table with the same name");
                return false;
            }
        }

        ik = dat.length;
        let ln = "";
        let sep = "";
        for (let i = 0; i < ik; i++) {
            let fName = dat[i].name;
            if (fName == null || fName.length == 0)  {
                ln += sep + i;
                sep = ", ";
            }
        }
        if (ln.length > 0) {
            myAlert("There is no name in the description of the fields with numbers" + ln);
            return false;
        }
        let hostDomain = currentProject.host;
        if (hostDomain != null && hostDomain.length > 0) {
            let ff = JSON.stringify(dat);
            let t = {id_table:tableId,name_table:nn,title_table:dd,fields_table:ff,schema:currentProject.resurseInd};
            if (tableId == -1) {
                doServerAlien("POST", hostDomain + "tables/descr", cbSaveTable, JSON.stringify(t));
            } else {
                doServerAlien("POST", hostDomain + "tables/descr", cbChangeTable, JSON.stringify(t), {id_table:dopEl.id_table});
            }
        }
    } else {
        myAlert("Table name not specified");
        return false;
    }
}

function setFieldId(el) {
    let descr = el.closest(".descrTable");
    if (descr.id_table == -1) {
        let inpId = descr.fieldId;
        inpId.value = "id_" + el.value;
    }
}

function cbSaveTable(res) {
    let it = JSON.parse(res);
    if (listTables == null) {
        listTables = [];
    }
    listTables.push(it);
    formListTables_1();
}

function cbChangeTable(res, par) {
    let it = JSON.parse(res);
    let tablePos = getTablePosition(par.id_table);
    if (tablePos > -1) {
        listTables.splice(tablePos, 1, it);
        formListTables_1();
    }
}

function getTablePosition(id_table) {
    let ik = listTables.length;
    for (let i = 0; i < ik; i++) {
        if (id_table == listTables[i].id_table) {
            return i;
        }
    }
    return - 1;
}

function deleteTableAdm(id_table) {
    event.stopPropagation();
    let item = listTables[getTablePosition(id_table)];
    myAlert("The " + item.name_table + "table and all its data will be deleted permanently.<br />Proceed?", "Proceed", proceedDelTable, item);
}

function proceedDelTable(item) {
    let t = {name_table:item.name_table,id_table:item.id_table};
    doServerAlien("POST", hostDomain + "tables/del_tab", cbDelTable, JSON.stringify(t), item);
}

function cbDelTable(res, item) {
    let i_1 =  getTablePosition(item.id_table);
    listTables.splice(i_1, 1);
    formListTables_1();
}

function editTable(i) {
    let item = listTables[getTablePosition(i)];
    fieldsTable = JSON.parse(item.fields_table);
    let descrTable = newDOMelement(htmlTable);
    if (item.name_table == USER_TABLE_NAME) {
        let nt = descrTable.querySelector(".name_t");
        nt.setAttribute('disabled','disabled');
        nt.onkeyup = "";
        let dt = descrTable.querySelector(".descr_t");
        dt.setAttribute('disabled','disabled');
    }
    descrTable.id_table = item.id_table;
    descrTable.getElementsByClassName("name_t")[0].value = item.name_table;
    descrTable.getElementsByClassName("descr_t")[0].value = item.title_table;
    let editDataTable = editDataWind(metaTable, fieldsTable, cbAddTable, descrTable);
    let td = editDataTable.getCellXY(0, 1);
    descrTable.fieldId = td.querySelector("INPUT");
}

function addTableForQuery() {
    if (listTables == null) return;
    if (listTablesForQuery.length == 5) return;
    let wind = formWind(250, 450, 40, 350, "Choose a table", true);
    let cont = newDOMelement('<div style="position:absolute;left:5px;right:10px"></div>');
    wind.appendChild(cont);
    let ik = listTables.length;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            oneTableForQuery(i, cont);
        }
    }
    resizeScrol(wind);
}

function oneTableForQuery(i, el) {
    let item = listTables[i];
    let cont = newDOMelement('<div style="float:left;width:100%;height:30px;overflow: hidden;cursor:pointer;border-bottom:1px solid #aaf;clear:both"></div>');
    let name = newDOMelement('<div style="font-size:16px;color:#000;margin-top:5px;float:left;margin-left:5px">' + item.name_table + '</div>');
    cont.appendChild(name);
    cont.addEventListener("click", function(){
                closeWindow(el);
                formTableForQuery(i);
            }, true);
    el.appendChild(cont);
    let rect = cont.getBoundingClientRect();
    let rect_1 = name.getBoundingClientRect();
    let descr = newDOMelement('<div style="font-size:12px;color:#555;margin-top:9px;height:12px;width:' + (rect.width - rect_1.width - 20) 
            + 'px;float:left;margin-left:10px;overflow:hidden">' + item.title_table + '</div>');
    cont.appendChild(descr);
}

function formTableForQuery(i) {
    let item = listTables[i];
    let itemForList = {id_table:item.id_table,name_table: item.name_table,title_table:item.title_table,fields_table:JSON.parse(item.fields_table)};
    listTablesForQuery.push(itemForList);
    formBlockTable(item);

    let jk = queryQueryData.children.length;
    let indListT = listTablesForQuery.length - 1;
    for (let j = 0; j < jk; j++) {
        let quEl = queryQueryData.children[j];
        addViewForTableInQuery(indListT, quEl);
    }
}

function formBlockTable(item) {
    let hTitle = 24;
    let block = newDOMelement('<div class="table_view" style="width:' + wTableInQuery + 'px;height:100%;float:left;position:relative;border-right:1px solid #1dace9;"></div>');
    block.id_table = item.id_table;
    block.name_table = item.name_table;
    let title = newDOMelement('<div class="tab_title" style="height:24px;border-bottom:1px solid #1dace9;position:absolute;left:0;top:0;right:0;background:#f3f8ff;">' 
            +'<div style="margin-top:3px;width:100%;text-align:center;font-size:14px;">' + item.name_table + '</div>'
            +'</div>');
    block.appendChild(title);
    let selField = newDOMelement('<img onclick="selAllFieldInTable(this)" style="width:14px;height:14px;position:absolute;right:10px;top:3px;cursor:pointer" src="img/check-act.png">');
    title.appendChild(selField);
    
    queryTables.appendChild(block);
    let wraperScroll = newDOMelement('<div style="position:absolute;left:0;top:' + hTitle + 'px;right:0;bottom:0"></div');
    block.appendChild(wraperScroll);
    let viewScroll = formViewScrolY(wraperScroll);
    viewScroll.style.right = "9px";
    let viewDataT = viewScroll.getElementsByClassName("viewData")[0];
//    viewDataT.style.marginRight = "15px";
    let fields = JSON.parse(item.fields_table);
    let ik = fields.length;
    for (let i = 0; i < ik; i++) {
        oneFieldTables(item.id_table, fields[i], viewDataT);
    }
    let imgAddQuery = footerQuery.getElementsByClassName("addWhere")[0];
    if (imgAddQuery != null) {
        imgAddQuery.style.display = "block";
    }
}

function selAllFieldInTable(el) {
    if (checkElement(el)) {
        addAllFieldsInQuery(el);
    } else {
        delAllFieldsInQuery(el);
    }
}

function addAllFieldsInQuery(el) {
    let tabBlock = el.closest(".table_view");
    let viewData = tabBlock.getElementsByClassName("viewData")[0];
    let child = viewData.children;
    let ik = child.length;
    for (let i = 0; i < ik; i++) {
        let itemEl = child[i];
        let sel = itemEl.getElementsByTagName("img")[0];
        if (sel.src.indexOf("check-sel") == -1) {
            addFieldsInQuery(sel);
            sel.src = "img/check-sel_1.png";
        }
    }
}

function delAllFieldsInQuery(el) {
    let tabBlock = el.closest(".table_view");
    let viewData = tabBlock.getElementsByClassName("viewData")[0];
    let child = viewData.children;
    let ik = child.length;
    for (let i = 0; i < ik; i++) {
        let itemEl = child[i];
        let sel = itemEl.getElementsByTagName("img")[0];
        if (sel.src.indexOf("check-sel") > -1) {
            delFieldsInQuery(sel);
            sel.src = "img/check-act.png";
        }
    }
}

function oneFieldTables(idTable, item, el) {
    let cont = newDOMelement('<div class="cont_f" style="float:left;width:100%;position:relative;height:' 
            + hItemListFieldsTable + 'px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
    cont.idTable = idTable;
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
    let selField = newDOMelement('<img onclick="selFieldInTable(this)" style="width:14px;cursor:pointer;height:14px;position:absolute;right:2px;top:3px;" src="img/check-act.png">');
    cont.appendChild(descr);
    cont.appendChild(selField);
}

function selFieldInTable(el) {
    if (checkElement(el)) {
        addFieldsInQuery(el);
    } else {
        delFieldsInQuery(el);
    }
    setViewAllImg(el);
}

function setViewAllImg(el) {
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

function addFieldsInQuery(el) {
    let cont = el.closest('.cont_f');
    let idTab = cont.idTable;
    let idF = cont.idField;
    let ik = listTablesForQuery.length;
    let itemTab = null;
    for (let i = 0; i < ik; i++) {
        itemTab = listTablesForQuery[i];
        if (itemTab.id_table == idTab) {
            let fields = itemTab.fields_table;
            let jk = fields.length;
            for (let j = 0; j < jk; j++) {
                let itemField = fields[j];
                if (itemField.id_field == idF) {
                    oneFieldView(idTab, itemField, queryFieldsData);
                    let ss = queryFieldsData.closest(".viewport");
                    ss.scroll_y.resize();
                    break;
                }
            }
            break;
        }
    }
}

function delFieldsInQuery(el) {
    let cont = el.closest('.cont_f');
    let idTab = cont.idTable;
    let idF = cont.idField;
    let fieldsView = queryFieldsData.children;
    let ik = fieldsView.length;
    for (let i = 0; i < ik; i++) {
        let vv = fieldsView[i];
        if (idTab == vv.idTable && idF == vv.idField) {
            vv.remove();
            let ss = queryFieldsData.closest(".viewport");
            ss.scroll_y.resize();
            break;
        }
    }
}

function oneFieldView(idTab, item, el) {
    let tt = currentComponentDescr.type;
    let isFormForQuery = tt == "Form" || tt == "ScrollForm";
    let cont = newDOMelement('<div class="field" style="float:left;width:100%;position:relative;height:' 
            + hItemListFieldsTable + 'px;overflow: hidden;border-bottom:1px solid #aaf;clear:both"></div>');
    cont.idTable = idTab;
    cont.idField = item.id_field;
    cont.name_field = item.name;
    cont.type_field = item.type;
    cont.title_field = item.title;
    let name = newDOMelement('<div class="name" style="font-size:14px;color:#000;margin-top:2px;float:left;margin-left:3px">' + item.name + '</div>');
    cont.appendChild(name);
    el.appendChild(cont);
    let rect = cont.getBoundingClientRect();
    let rect_1 = name.getBoundingClientRect();
    let descr = newDOMelement('<div style="font-size:10px;color:#555;margin-top:6px;height:11px;width:' + (rect.width - rect_1.width - 20) 
            + 'px;float:left;margin-left:5px;overflow:hidden">' + item.title);
    if (isFormForQuery) {
        let selField = newDOMelement('<img style="width:14px;cursor:pointer;height:14px;float:right;margin-right:2px;margin-top:3px;" src="img/check-sel_1.png">');
        selField.addEventListener("click", function(){checkElement(selField)}, false);
        cont.append(selField);

    }
    cont.appendChild(descr);
}

