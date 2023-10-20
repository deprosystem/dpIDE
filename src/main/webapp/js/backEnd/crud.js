function CRUD(dat, name, type_crud) {
    this.param;
    this.choose;
    this.fieldsTable;
    this.selectFields;
    this.tabbleObj;
    this.where;
    this.whereDel;
    this.viewPortF;
    this.hostDomainQ;
    this.idTable;
    this.query;
    this.data;
    this.selectOperQuery;
    this.blockErrorTxt;
    this.nameTable;
    this.listFields;
    this.type_crud = type_crud;
    this.fieldsForSelect;
    this.fieldsInTable;
    this.delNameTable;
    this.delIdTable;
    
    let self = this;
    let isSend;
    let wFields = 320;
    let wTab = 200;
    let hRow = 24;
    let hWhere = 150;
    let hViewFT = 240;
    let hTitleQuery = 24;
    let wFieldQuery = 205;
    let wTypeParamQu = 80;
    let meta_send = [
        {name: "err_1", title:"Text error",len:300,type:"Text"}
    ]
    let meta_EditProf = [
        {name: "err_1", title:"Text error",len:300,type:"Text"},
        {name: "err_2", title:"Not logged in",len:300,type:"Text"}
    ]
    
    this.init = function() {
        isSend = false;
        let titForm;
        this.data = dat;
        this.hostDomainQ = currentProject.host;
        hostDescr = currentProject.whereServer;
        if (this.hostDomainQ == null || this.hostDomainQ.length == 0  || hostDescr == "Third party API") {
            myAlert("Domain not set");
            return;
        }
        let wind = formWind(wFields + wTab + 1, 400, 40, 650, "Model parameters", false, null, "Save", this, "");
        wind.style.display = "flex";
        wind.style.flexDirection = "column";
        this.blockErrorTxt = newDOMelement('<div style="width:100%;height:48px;border-bottom:1px solid #1dace9"></div>');
        
        wind.append(this.blockErrorTxt);
        let par = this.data[name];
        if (par != null) {
            this.param = JSON.parse(par);
        }
        let foot;
        let buttonChooseT;

        if (this.type_crud == "Delete") {
            if (par == null) {
                this.param = {method:"POST", url:"",oper:"DELETE"};
            }
            foot = wind.parentElement.querySelector(".footer_wind");
            buttonChooseT = createButtonBlue("Choose a table");
            buttonChooseT.addEventListener("click", () => {this.chooseTableFields()}, false);
            foot.prepend(buttonChooseT);
            addW = createButtonBlue("Add condition");
            addW.addEventListener("click", () => {this.addCondition()}, false);
            foot.prepend(addW);
            this.blockErrorTxt.style.height = "24px";
            this.blockErrorTxt.append(newDOMelement('<div style="float:left;margin-left:10px;margin-top:5px;">Table: </div>'));
            this.nameTable = newDOMelement('<div style="float:left;font-size:14px;margin-left:10px;margin-top:2px;"></div>');
            this.blockErrorTxt.append(this.nameTable);
            this.whereDel = newDOMelement('<div style="position:absolute;top:25px;left:0;right:0;bottom:0"></div>');
            wind.append(this.whereDel);
            this.scrollWhere = formViewScrolY(this.whereDel, true);
            this.listWhere = this.scrollWhere.querySelector(".viewData");
            this.scrollT = this.scrollWhere.scroll_y;
            if (listTables == null) {
                doServerAlien("GET", this.hostDomainQ + 'tables/list', self.initDel_0, null, null, wind);
            } else {
                self.initDel();
            }
        } else {
            switch (this.type_crud) {
                case "Send":
                    if (par == null) {
                        this.param = {method:"POST", url:"",oper:"INSERT",err_1:"There is already an entry with such keys"};
                    }
                    foot = wind.parentElement.querySelector(".footer_wind");
                    buttonChooseT = createButtonBlue("Choose a table");
                    buttonChooseT.addEventListener("click", () => {this.cooseTableCrud()}, false);
                    foot.prepend(buttonChooseT);
                    if (this.param.err_1 == null || this.param.err_1 == "") {
                        this.param.err_1 = "There is already an entry with such keys";
                    }
                    isSend = true;
                    break;
                case "SignUp":
                    if (par == null) {
                        this.param = {method:"POST", url:"autch/" + currentProject.resurseInd + "/2",oper:"INSERT",err_1:"A user with this login already exists",
                        queryFilds:{fields:"login,password",valid:"login,password",indF:[1,2],indV:[1,2]}};
                    }
                    break;
                case "SignIn":
                    if (par == null) {
                        this.param = {method:"POST", url:"autch/" + currentProject.resurseInd + "/1",oper:"INSERT",err_1:"Incorrect login or password",
                        queryFilds:{fields:"login,password",valid:"login,password",indF:[1,2],indV:[1,2]}};
                    }
                    break;
                case "EditProfile":
                    if (par == null) {
                        this.param = {method:"POST", url:"autch/" + currentProject.resurseInd + "/3",oper:"INSERT",err_1:"A user with this login already exists",
                        err_2:"You need to log in",queryFilds:{fields:"login,password",valid:"login,password",indF:[1,2],indV:[1,2]}};
                    }
                    this.blockErrorTxt.style.height = "96px";
                    break;
            }
            let viewFT = newDOMelement('<div style="position:relative;width:100%;flex-grow:1;"></div>');
            wind.append(viewFT);
            this.where = newDOMelement('<div style="width:100%;height:' + hWhere + 'px;display:none;border-top:1px solid #1dace9;"></div>');
            wind.append(this.where);
            let selF = newDOMelement('<div style="float:left;position:relative;height:100%;width:' + wFields + 'px;border-right:1px solid #1dace9;"></div>');
            let stSend = "";
            if (isSend) {
                stSend = '<div style="margin-top:3px;float:right;margin-right:35px;margin-left:30px;">Source</div>';
            }
            let titleF = newDOMelement('<div class="tab_title" style="height:' + hRow + 'px;border-bottom:1px solid #1dace9;position:absolute;left:0;top:0;right:0;background:#f3f8ff;">' 
                    +'<div style="margin-top:3px;float:left;margin-left:5px;">Fields name</div>'
                    +stSend
                    +'<div style="margin-top:3px;float:right;margin-right:5px;">Validate</div>'
                    +'</div>');
            selF.appendChild(titleF);
            let wraperScrollF = newDOMelement('<div style="position:absolute;left:0;top:' + hRow + 'px;right:0;bottom:0"></div');
            selF.appendChild(wraperScrollF);
            this.viewPortF = formViewScrolY(wraperScrollF, true);
            this.selectFields = this.viewPortF.querySelector(".viewData");
            this.fieldsTable = newDOMelement('<div style="float:left;height:100%;width:' + wTab + 'px;position:relative;"></div>');
            viewFT.append(selF);
            viewFT.append(this.fieldsTable);
            if (this.type_crud == "SignIn") {
                let shutScreen = newDOMelement('<div style="position:absolute;left:0;top:0;right:0;bottom:0"></div>');
                shutScreen.addEventListener('click', () => {event.stopPropagation();});
                viewFT.append(shutScreen);
            }
            
            if (listTables == null) {
                doServerAlien("GET", this.hostDomainQ + 'tables/list', self.init_0, null, null, this.fieldsTable);
            } else {
                self.init_1();
            }

/*
            this.hostDomain = currentProject.host;
            if (this.hostDomain != null && this.hostDomain.length > 0  && hostDescr != "Third party API") {
                if (listTables == null) {
                    doServerAlien("GET", this.hostDomainQ + 'tables/list', self.init_0, null, null, this.fieldsTable);
                } else {
                    self.init_1();
                }
            } else {
                myAlert("Inappropriate data source");
            }
*/
        }
    }
    
    self.init_0 = function(res) {
        listTables = JSON.parse(res);
        self.init_1();
    }
    
    self.init_1 = function() {
        self.tabbleObj = new TableObj(self.selectFields, self.fieldsTable, isSend);
        self.getQuery();
    }
    
    self.initDel_0 = function(res) {
        listTables = JSON.parse(res);
        self.initDel();
    }
    
    self.initDel = function() {
        self.tabbleObj = new TableObj(self.selectFields);
        self.getQuery("DELETE");
    }
    
    this.getQuery = function(type) {
        let qu = this.getIdQuery();
        if (qu > -1) {
            doServerAlien("GET", this.hostDomainQ + "query/get?id=" + qu , this, null, "getQuery", this.fieldsTable);
        } else {
            if (type != null) {
                this.query = {type_query:type};
            } else {
                this.query = {type_query:"INSERT"};
            }
            this.cbGetQuery_1();
        }
    }

    this.cbDoServer = function (res, paramDo) {
        switch (paramDo) {
            case "getQuery": 
                this.cbGetQuery(res);
                break;
            case "saveCrud": 
                this.cbQueryCreate(res);
                break;
        }
    }
    
    this.cbGetQuery = function(res) {
        this.query = JSON.parse(res);
        this.cbGetQuery_1();
    }
    
    this.cbGetQuery_1 = function() {
        if (this.query.err_1 == null || this.query.err_1 == "") {
            this.query.err_1 = "There is already an entry with such keys";
        }
        switch (this.type_crud) {
            case "EditProfile":
                new EditForm(meta_EditProf, this.query, this.blockErrorTxt);
                break;
            case "Delete":
                break;
            default:
                new EditForm(meta_send, this.query, this.blockErrorTxt);
                break;
        }
        if (this.query.origin_query != null) {
            let originQuery = JSON.parse(this.query.origin_query);
            if (originQuery.fieldTable != null) {
                let origin = originQuery.fieldTable;
                let item = origin[0];
                let tab = getTabInQuery(item.id_table);
                if (tab != -1) {
                    if (this.type_crud == "Delete") {
                        let itemDel = listTables[tab];
                        this.fieldsInTable = JSON.parse(itemDel.fields_table);
                        this.nameTable.innerHTML = itemDel.name_table;
                        this.delNameTable = itemDel.name_table;
                        this.delIdTable = itemDel.id_table;
                        this.listWhere.innerHTML = "";
                        this.fieldsForSelect = "";
                        let ik =  this.fieldsInTable.length;
                        for (i = 0; i < ik; i++) {
                            this.fieldsForSelect += "," + this.fieldsInTable[i].name;
                        }
                        this.fieldsForSelect
                        let where = originQuery.where;
                        ik = where.length;
                        for (let i = 0; i < ik; i++) {
                            this.oneWhere(where[i]);
                        }
                        this.scrollT.resize();
                    } else {
                        this.idTable = item.id_table;
                        this.tabbleObj.formFieldsInTable(tab);
                        this.tabbleObj.addSelectFields(item.listFields);
                        this.tabbleObj.setViewImg();
                        if (this.param != null && this.param.queryFilds != null && this.param.queryFilds.indV != null) {
                            let pp = this.param.queryFilds.indP;
                            this.markingValidFields(this.param.queryFilds.indV, pp);
                        }
                    }
                }
            }
            
            
/*            
            if (this.type_crud == "Delete") {
                this.nameTable.innerHTML = originQuery.fieldTable[0].
            } else {
                if (originQuery.fieldTable != null) {
                    let origin = originQuery.fieldTable;
                    let item = origin[0];
                    let tab = getTabInQuery(item.id_table);
                    if (tab != -1) {
                        this.idTable = item.id_table;
                        this.tabbleObj.formFieldsInTable(tab);
                        this.tabbleObj.addSelectFields(item.listFields);
                        this.tabbleObj.setViewImg();
                        if (this.param != null && this.param.queryFilds != null && this.param.queryFilds.indV != null) {
                            let pp = this.param.queryFilds.indP;
                            this.markingValidFields(this.param.queryFilds.indV, pp);
                        }
                    }
                }
            }
*/
        }
     }
    
    this.getIdQuery = function() {
        let qu = -1;
        let url = this.param.url;
        if (url != null && url != "") {
            url = "" + url;
            let ar = url.split("/")
            if (ar.length > 1) {
                qu = parseInt(ar[2]);
            } else {
                qu = parseInt(url);
            }
        }
        return qu;
    }

    this.cooseTableCrud = function() {
        this.tabbleObj.cooseTable();
    }
    
    this.chooseTableFields = function() {
        this.tabbleObj.chooseTableFields(this);
    }
    
    this.crudDelete = function(iTab) {
        let item = listTables[iTab];
        this.fieldsInTable = JSON.parse(item.fields_table);
        this.nameTable.innerHTML = item.name_table;
        this.delNameTable = item.name_table;
        this.delIdTable = item.id_table;
        this.listWhere.innerHTML = "";
        this.fieldsForSelect = "";
        let ik =  this.fieldsInTable.length;
        for (i = 0; i < ik; i++) {
            this.fieldsForSelect += "," + this.fieldsInTable[i].name;
        }
    }
    
    this.addCondition = function() {
//        this.listWhere.append(newDOMelement('<div style="width:100%;height:30px;background:red;"></div>'));
        this.oneWhere();
        this.scrollT.resize();
    }
    
    this.oneWhere = function(item) {
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
//        itemAndOr = "AND";
        let qu = '<div class="one_query" onclick="selectQuery(this);" style="height:' + hTitleQuery + 'px;border-bottom:1px solid #1dace9;width:100%"></div>';
        let quEl = newDOMelement(qu);
        let and_or = newDOMelement('<div class="and_or" style="float:left;width:' + wOperQuery + 'px;border-right:1px solid #1dace9;height:100%"></div>');
        quEl.appendChild(and_or);
        let quParam = newDOMelement('<div class="div_param" style="float:left;width:' + wDivParam + 'px;border-right:1px solid #1dace9;height:100%"></div>');
        let selectTypeParam = formSelectForEditData("Parameter,System,Value,Field,Profile", itemTypePar);
        selectTypeParam.className = "typePar select";
        selectTypeParam.addEventListener("change", function(){setTypePar(selectTypeParam)}, false);
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
        inpProf.innerHTML = optionsProfile(vvF);
        inpProf.style.cssText = 'float:left;border:none;width:' +  (wDivParam - wTypeParamQu - 6) + 'px;background-color:#0000;text-indent:unset;font-size:11px;height:24px;';
        inpProf.style.display = "none";
        quParam.append(inpProf);

        quEl.appendChild(quParam);
        let oper_param = newDOMelement('<div class="oper_param" style="float:left;width:' + wOperQuery + 'px;border-right:1px solid #1dace9;height:100%"></div>');
        quEl.append(oper_param);
        let delQu = newDOMelement('<img class="delQu" onclick="delQuery(this)" style="margin-top:3px;float:right;margin-right:2px;cursor:pointer;" width="16" height="16" src="img/close-o.png">');
        quEl.append(delQu);
        
        let selectOper = formSelectForEditData("=,<,>,<=,>=,<>,LIKE",itemOper);
        selectOper.className = "operF";
        selectOper.style.cssText = 'border:none;width:100%;background:#0000;text-indent:unset;text-overflow:unset;font-size:11px;text-align:center;margin-top:4px';
        oper_param.append(selectOper);
        
        let name_field = newDOMelement('<div class="name_field" style="float:left;width:' + wFieldQuery + 'px;border-right:1px solid #1dace9;height:100%"></div>');
        let nameField = "";
        if (item != null && item.list != null) {
            let fk = this.fieldsInTable.length;
            let itemF = null;
            let quId = item.list[0].id_field;
            for (let f = 0; f < fk; f++) {
                let itF = this.fieldsInTable[f];
                if (itF.id_field == quId) {
                    itemF = itF;
                    break;
                }
            }
            if (itemF == null) {
                return;
            }
            nameField = itemF.name;
        }
            
        let selectNameField = formSelectForEditData(this.fieldsForSelect, nameField);
        selectNameField.className = "nameF";
        selectNameField.style.cssText = 'float:left;border:none;width:100%;background-color:#0000;text-indent:unset;font-size:11px;margin-top:4px';
//        selectNameField.style.cssText = 'border:none;width:100%;background:#0000;text-indent:unset;text-overflow:unset;font-size:11px;text-align:center;margin-top:4px';
        name_field.append(selectNameField);
        quEl.append(name_field);
/*
        if (queryQueryData.children != null && queryQueryData.children.length > 0) {
            if (itemAndOr != "") {
                let selectAndOr = formSelectForEditData("AND,OR,NOT", itemAndOr);
                selectAndOr.className = "operAndOr";
                selectAndOr.style.cssText = 'border:none;width:100%;background:#0000;text-indent:unset;text-overflow:unset;font-size:11px;text-align:center;margin-top:4px';
                and_or.appendChild(selectAndOr);
            } else {

            }
        }
        let ik = listTablesForQuery.length;
        for (let i = 0; i < ik; i++) {
            addViewForTableInQuery(i, quEl);
        }
*/
        this.listWhere.append(quEl);

    }

// Save CRUD
    this.cbWind = function() {
        let qu = this.getIdQuery();
        let serv = "autch/";
        if (qu > 3) {
            switch (this.type_crud) {
                case "SignIn":
                    qu = 1;
                    break;
                case "SignUp":
                    qu = 2;
                    break;
                case "EditProfile":
                    qu = 3;
                    break;
                default:
                    serv = "query/";
                    break;
            }
            this.param.url = serv + currentProject.resurseInd + "/" + qu;
        }

        let res;
        let fv;
        if (this.type_crud != "Delete") {
            fv = this.formFieldsValid();
            if (fv.fields == ""){
                myAlert("No fields selected for data transfer");
                return;
            }
            res = [this.tabbleObj.getTableInformation()];
//            this.param.queryFilds = fv;
        } else {
            res = [{id_table:this.delIdTable,name_table:this.delNameTable}];
            fv = {fields:"",valid:"",indF:[],indV:[],prof:"",indP:[]};
        }
//console.log("RES="+JSON.stringify(res));
        this.param.queryFilds = fv;
        
//   WHERE
        let queryForSave = [];
        let strParam = "";
        let where_list = [];
        if (this.listWhere != null) {
            let queryChild = this.listWhere.children;
            let ik = queryChild.length;
            let where_query = " WHERE ";
            let sepStrPar = "";
            let sepQ = "";
            for (let i = 0; i < ik; i++) {
                let itemQ = queryChild[i];
    /*
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
    */
                let oneQuery;
    //            jk = listFieldInTab.length;

                let selOper = itemQ.querySelector(".operF");
                let selOperValue = selOper.options[selOper.selectedIndex].value;
                let selAndOr = itemQ.querySelector(".operAndOr");

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
                let viewNameF = itemQ.querySelector(".nameF");
                let posit = viewNameF.selectedIndex;
                let nameF = viewNameF.options[posit].value;
                let itemF = this.fieldsInTable[posit - 1];
                let ff = [{id_field:itemF.id_field,name:itemF.name,type:itemF.type,position:posit - 1}];
                let typeF = itemF.type;

                let paramValueQu = paramValue;
                let parVal;
                switch (typeParValue) {
                    case "Field":
                        let fieldId = div_par.querySelector(".viewId");
                        val = fieldId.options[fieldId.selectedIndex].value.trim();
                    case "Parameter":
                        if (val == null || val.length == 0) {
                            parVal = nameF;
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
                        strParam += sepStrPar + nameF + "=" + prefixProfileParam + parVal;
                        sepStrPar = ",";
                        break;
                }
                let valQu = addQuote(typeF, paramValueQu);
                oneQuery =  valQu + " " + selOperValue + " " + nameF;
                where_query += sepQ + oneQuery;
                where_list.push(oneQuery);
                sepQ = " AND ";
                queryForSave.push({addOr:andOrValue,param:paramValue,typePar:typeParValue,typeValue:typeVal,oper:selOperValue,list:ff});
    //            queryForSave.push({addOr:andOrValue,param:paramValue,typePar:typeParValue,typeValue:typeVal,oper:selOperValue,list:listFieldInTab});
            }
        }
//        this.param.queryFilds.fields = strParam;

//*********
        let origin_query = {fieldTable:res,where:queryForSave,order:null};
//        currentComponentDescr.model.param = strParam;
        let original = JSON.stringify(origin_query);
        let nam = currentScreen.screenName + "_" + this.data.viewId;
        let SQL = "";
        switch (this.param.oper) {
            case "INSERT":
                SQL = "INSERT INTO " + currentProject.resurseInd + "." + res[0].name_table;
                nam += "_insert";
                strParam = res[0].name_table;
                break;
            case "DELETE":
                SQL = "DELETE FROM " + currentProject.resurseInd + "." + this.delNameTable;
                nam += "_delete";
                break;
            default:
                nam += "_send";
                strParam = res[0].name_table;
        }

//       this.param.queryFilds.fields = strParam;
        let dat;
        if (qu < 4) {
            dat = {id_query:qu,type_query:this.query.type_query,origin_query:original,sql_query:SQL,param_query:strParam,
                err_1:this.query.err_1,err_2:this.query.err_2};
        } else {
            dat = {id_query:qu,name_query:nam,type_query:this.query.type_query,origin_query:original,sql_query:SQL,param_query:strParam, listWhere:JSON.stringify(where_list),
                err_1:this.query.err_1,err_2:this.query.err_2};
        }

//console.log("DAT="+JSON.stringify(dat));
        doServerAlien("POST", this.hostDomainQ + "query/create", this, JSON.stringify(dat), "saveCrud", this.fieldsTable);
    }
    
    this.cbQueryCreate = function (res) {
        let dat = JSON.parse(res);
        if (dat.id_query != null) {
            this.param.url = "query/" + currentProject.resurseInd + "/" + dat.id_query;
        }
        this.data[name] = JSON.stringify(this.param);
    }
    
    this.formFieldsValid = function() {
        let ff = "";
        let vv = "";
        let pp = "";
        let indF = [];
        let indV = [];
        let indP = [];
        let imgP;
        let sepF = "", sepV = "", sepP = "";
        let fieldsView = this.selectFields.children;
        let ik = fieldsView.length;
        for (let i = 0; i < ik; i++) {
            let item = fieldsView[i];
            ff += sepF + item.name_field;
            sepF = ",";
            indF.push(item.idField);
            if (isSend) {
//                sepF = ",";
                imgP = item.querySelector('.selProf');
            }
            if (isSend && imgP.value != "Field") {
                pp += sepP + item.name_field;
                let valS = imgP.value;
                ff += "=" + valS;
                indP.push({id:item.idField,source:valS});
//                indP.push(item.idField + "=" + imgP.value);
                sepP = ",";
            } else {
                let img = item.querySelector('.selField');
                if (img.src.indexOf("act") == -1) {
                    vv += sepV + item.name_field;
                    indV.push(item.idField);
                    sepV = ",";
                }
            }
/*
            if (isSend && imgP.src.indexOf("act") == -1) {
                pp += sepP + item.name_field;
                indP.push(item.idField);
                sepP = ",";
            } else {
                let img = item.querySelector('.selField');
                if (img.src.indexOf("act") == -1) {
                    vv += sepV + item.name_field;
                    indV.push(item.idField);
                    sepV = ",";
                }
            }
*/
        }
        return {fields:ff,valid:vv,indF:indF,indV:indV,prof:pp,indP:indP};
    }
    
    this.markingValidFields = function (arr, arrP) {
        let fieldsView = this.selectFields.children;
        let ik = fieldsView.length;
        let img;
        for (let i = 0; i < ik; i++) {
            let item = fieldsView[i];
            let noProf = true;
            if (isSend && arrP != null) {
                let valSource = isFieldInListCrud(item.idField, arrP);
                if (valSource != null) {
                    img = item.querySelector('.selProf');
                    img.value = valSource;
                    noProf = false;
                }
            }
            if (noProf && isFieldInList(item.idField, arr)) {
                img = item.querySelector('.selField');
                img.src = "img/check-sel_1.png";
            }
        }
    }
    
    this.init();
}

function isFieldInListCrud(id, fields) {
    let ik = fields.length;
    for (let i = 0; i < ik; i++) {
        if (fields[i].id == id) {
            return fields[i].source;
        }
    }
    return null;
}

