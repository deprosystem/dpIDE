var dataTabQu = '<div class="title" style="width: 100%;height:100%;display: flex; justify-content: space-between">'
                    +'<div style="flex-grow:3;height: 100%;display: flex; justify-content:center;border-right:1px solid #1DACE9">'
                        +'<div onclick="dbViewTable();" style="float:left;margin-top:4px;color:#222;cursor: pointer;">Tables</div>'
                        +'<img class="imgTable" onclick="addTable();" style="margin-top:4px;margin-left:10px;float:left;cursor:pointer;display:none;" width="14" height="14" src="img/add_blue.png">'
                    +'</div>'
                    +'<div style="flex-grow:3;height: 100%;display: flex; justify-content:center;border-right:1px solid #1DACE9">'
                        +'<div onclick="dbViewQuery();" style="float:left;margin-top:4px;color:#222;cursor: pointer;">Queries</div>'
                        +'<img class="imgQuery" onclick="dbAddQueryChoose();" style="margin-top:4px;margin-left:10px;float:left;cursor:pointer;display:none;" width="14" height="14" src="img/add_blue.png">'
                    +'</div>'
                    +'<div onclick="dbSetServer();" style="flex-grow:1;height: 100%;cursor: pointer;">'
                        +'<div style="text-align: center;margin-top:4px;color:#222;">Server</div>'
                    +'</div>'
                +'</div>';
var listDataDB, scrollListDataDB;

function viewData() {
    if (currentProject == null) return;
    let right_d = 120;
    if (ux_ui.innerHTML == "U I") {
        right_d = 120;
    } else {
        right_d = 465;
    }
//    hostDescr = whereServ = currentProject.whereServer;
//    hostDomain = currentProject.host;
//    setHostPanel();
    let hh = document.documentElement.clientHeight;
    if (show_data_inf.innerHTML == "Data") {
        show_data_inf.innerHTML = "UX-UI";
//        hideControlHeader();
        document.documentElement.style.setProperty('--r_data', 100 + "px");
        document.documentElement.style.setProperty('--h_backEnd', (hh - 35) + "px");
        setTimeout(hideControlHeader, 400);
    } else {
        show_data_inf.innerHTML = "Data";
        document.documentElement.style.setProperty('--r_data', right_d + "px");
        document.documentElement.style.setProperty('--h_backEnd', '0');
        setTimeout(showControlHeader, 400);
    }
}

function hideControlHeader() {
    if (ux_ui.innerHTML == "U I") {
        plus_screen.style.display = "none";
        corners.style.display = "none";
    } else {
        type_insert.style.display = "none";
        active.style.display = "none";
    }
    ux_ui_w.style.display = "none";
    emulator.style.display = "none";
    palette.style.display = "none";
    dataControll.style.display = "block";
    hostDomain = currentProject.host;
    if (dataDescript.children.length == 0) {
        dbServer();
    }
}

function showControlHeader() {
    if (ux_ui.innerHTML == "U I") {
        plus_screen.style.display = "block";
        corners.style.display = "block";
    } else {
        type_insert.style.display = "block";
        active.style.display = "block";
    }
    ux_ui_w.style.display = "block";
    emulator.style.display = "block";
    palette.style.display = "block";
    dataControll.style.display = "none";
}

function dbServer() {
    let heightTitle = 24;
    let dataServer = '<div class="title" style="width: 100%;height:100%;display: flex; justify-content: space-between">'
                    +'<div onclick="dbSetServer();" style="flex-grow:1;height: 100%;cursor: pointer;">'
                        +'<div style="text-align: center;margin-top:4px;color:#222;">Server</div>'
                    +'</div>'
                +'</div>';
    dataDescript.innerHTML="";
    setBorderDB(0);
    let titleDataDB = newDOMelement('<div class="titleBlock" style="position:absolute;left:0;height:' + (heightTitle + 1) + 'px;right:0;top:0;border-bottom: 1px solid #1DACE9;"></div>');
    dataDescript.append(titleDataDB);
    listDataDB = newDOMelement('<div class="list" style="position:absolute;left:0;top:' + (heightTitle + 1) + 'px;right:0;bottom:0"></div>');
    dataDescript.append(listDataDB);
    let scrollDiv = formViewScrolY(listDataDB, true);
    scrollListDataDB = scrollDiv.querySelector(".viewData");
    if (currentProject.host == null || currentProject.host == "") {
        titleDataDB.append(newDOMelement(dataServer));
        dbViewHostPanel();
    } else {
        titleDataDB.append(newDOMelement(dataTabQu));
        dbViewTable();
    }
}
/*
function dbPush() {
    setBorderDB(1);
    new PushServer();
}
*/
function dbAPI() {
    dataDescript.innerHTML="";
    setBorderDB(1);
}

function dbLocal() {
    let dataTabQuLocal = '<div style="width: 100%;height: 24px; border-bottom: 1px solid #1DACE9;display: flex; justify-content: space-between">'
                    +'<div style="flex-grow:3;height: 100%;display: flex; justify-content:center;border-right:1px solid #1DACE9">'
                        +'<div onclick="dbViewTableLocal();" style="float:left;margin-top:4px;color:#222;cursor: pointer;">Tables</div>'
                        +'<img onclick="dbAddTableLocal();" style="margin-top:4px;margin-left:10px;float:left;cursor:pointer;" width="14" height="14" src="img/add_blue.png">'
                    +'</div>'
                    +'<div style="flex-grow:3;height: 100%;display: flex; justify-content:center;border-right:1px solid #1DACE9">'
                        +'<div onclick="dbViewQueryLocal();" style="float:left;margin-top:4px;color:#222;cursor: pointer;">Queries</div>'
                        +'<img onclick="dbAddQueryLocal();" style="margin-top:4px;margin-left:10px;float:left;cursor:pointer;" width="14" height="14" src="img/add_blue.png">'
                    +'</div>'
                +'</div>';
            
    dataDescript.innerHTML="";
    setBorderDB(2);
    dataDescript.append(newDOMelement(dataTabQuLocal));
    dataDescript.append(newDOMelement('<div class="list" style="position:absolute;left:0;top:25px;right:0;bottom:0"></div>'));
}

function dbGoogleSh() {
    dataDescript.innerHTML="";
    setBorderDB(3);
}

function setBorderDB(j) {
    ch = dataControll.getElementsByClassName("source");
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let item = ch[i].firstElementChild;
        if (i == j) {
            item.style.borderBottom = "1.5px solid #eee";
        } else {
            item.style.borderBottom = "";
        }
    }
}

function dbViewTable() {
    if (listTables == null) {
        doServerAlien("GET", hostDomain + 'tables/list', cbDBGetTables, null, null, listDataDB);
    } else {
        dbSelectOper(0);
        formListTables_1();
        let dd = dataDescript.querySelector(".imgTable");
        dd.style.display = "block";
        let scr = scrollListDataDB.closest('.viewport');
        scr.scroll_y.resize();
    }
}

function dbViewQuery() {
    if (listQuerys == null) {
        hostDomain = currentProject.host;
        doServerAlien("GET", hostDomain + 'query/list', cbDBGetQuerys, null, null, listDataDB);
    } else {
        dbSelectOper(1);
        dbListQuerys();
    }
}

function dbListQuerys() {
    listQuerys.sort(function(a, b){
        let nameA=a.name_query.toLowerCase(), nameB=b.name_query.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    scrollListDataDB.innerHTML = "";
    let ik = listQuerys.length;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            oneQueryView(listQuerys[i], scrollListDataDB);
        }
        let scr = scrollListDataDB.closest('.viewport');
        scr.scroll_y.resize();
    }
    let dd = dataDescript.querySelector(".imgQuery");
    dd.style.display = "block";
}

function oneQueryView(item, el) {
    let img = "";
    switch (item.type_query) {
        case "SELECT":
            img = "select-tab";
            break;
        case "DELETE":
            img = "del-tab";
            break;
        case "INSERT":
            img = "add-tab";
            break;
        case "UPDATE":
            img = "edit-tab";
            break;
    }
    let descr = item.descr_query;
    if (descr == null) {
        descr = "";
    }
    let oneDiv = '<div onclick="editQuery(' + item.id_query + ')" style="float:left;width:100%;height:36px;overflow: hidden;cursor:pointer;border-bottom:1px solid #aaf;clear:both;position:relative">'
                    +'<img src="img/' + img + '.png" style="width:24px;height:24px;position:absolute;top:3px;left:3px;">'
                    +'<div class="name_t" style="font-size:14px;color:#000;position:absolute;top:1px;left:30px">' + item.name_query + '</div>'
                    +'<div class="descr_t" style="font-size:10px;color:#555;position:absolute;top:17px;left:30px;right:20px;height:14px;overflow:hidden">' + descr + '</div>'
                    +'<img onclick="deleteQuertAdm(' + item.id_query + ');" style="position:absolute;top:11px;right:7px;cursor:pointer;" width="10" height="10" src="img/del_red.png">'
                +'</div>';
    let cont = newDOMelement(oneDiv);
    el.appendChild(cont);
}

function editQuery(id) {
    let wind = formWind(1130, 625, 40, 250, "Editing a request");
    let quSel = new QuerySelect(wind, listTables, id, cbQuery);
}

function deleteQuertAdm(id) {
    event.stopPropagation();
    let ind = getQueryPosition(id);
    if (ind > -1) {
        let item = listQuerys[ind];
        myAlert("The " + item.name_query + " query and all its data will be deleted permanently.<br />Proceed?", "Proceed", proceedDelQuery, item);
    }
}

function proceedDelQuery(item) {
    let t = {id_query:item.id_query};
    doServerAlien("POST", hostDomain + "query/del_query", cbDelQuery, JSON.stringify(t), item);
}

function cbDelQuery(res, item) {
    let i_1 = getQueryPosition(item.id_query);
    listQuerys.splice(i_1, 1);
    dbListQuerys();
}

function getQueryPosition(id) {
    let ik = listQuerys.length;
    for (let i = 0; i < ik; i++) {
        if (id == listQuerys[i].id_query) {
            return i;
        }
    }
    return - 1;
}

function dbAddQueryChoose() {
    let cc = '<div style="margin-top: 24px">'
        +'<div style="margin-top: 7px"><label><input type="radio" name="choice" value="SELECT" checked/> <span style="font-weight:bold">SELECT</span> - get data from multiple tables</label></div>'
        +'<div style="margin-top: 7px"><label><input type="radio" name="choice" value="INNER JOIN"/> <span style="font-weight:bold">INNER JOIN</span></label></div>'
        +'<div style="margin-top: 7px"><label><input type="radio" name="choice" value="LEFT JOIN"/> <span style="font-weight:bold">LEFT JOIN</span> - left outer join</label></div>'
        +'<div style="margin-top: 7px"><label><input type="radio" name="choice" value="RIGHT JOIN"/> <span style="font-weight:bold">RIGHT JOIN</span> - right outer join</label></div>'
        +'<div style="margin-top: 7px"><label><input type="radio" name="choice" value="UNION"/> <span style="font-weight:bold">UNION</span> - used to combine the results</label></div>'
        +'<div style="margin-top: 7px"><label><input type="radio" name="choice" value="INTERSECT"/> <span style="font-weight:bold">INTERSECT</span> - returns all rows present strictly in both sets</label></div>'
        +'<div style="margin-top: 7px"><label><input type="radio" name="choice" value="EXCEPT"/> <span style="font-weight:bold">EXCEPT</span> - returns all rows present in the first set but not in the second</label></div>'
        +'<div style="margin-top: 7px"><label><input type="radio" name="choice" value="INSERT" /> <span style="font-weight:bold">INSERT</span> - adds data to table</label></div>'
        +'<div style="margin-top: 7px"><label><input type="radio" name="choice" value="UPDATE" /> <span style="font-weight:bold">UPDATE</span> - replaces data in a table</label></div>'
        +'<div style="margin-top: 7px"><label><input type="radio" name="choice" value="DELETE" /> <span style="font-weight:bold">DELETE</span> - deletes data in a table</label></div>'
        +'</div>';
    document.documentElement.style.setProperty('--w_wind_qu', "450px");
    document.documentElement.style.setProperty('--h_wind_qu', "400px");
    let wind = formWind(300, 400, 40, 250, "Forming a request");
    let ww = wind.closest(".dataWindow");
    ww.style.width = "var(--w_wind_qu)";
    ww.style.height = "var(--h_wind_qu)";
    ww.transition = "height 200ms";
    ww.WebkitTransition = "height 200ms";
    ww.transition = "width 200ms";
    ww.WebkitTransition = "width 200ms";
    let cRadio = newDOMelement(cc);
    wind.append(cRadio);
    let buttonOk = createButtonBlue(" Next ");
    buttonOk.style.marginTop = "30px";
    buttonOk.addEventListener("click", function(){dbNextQuery(wind);}, false);
    wind.append(buttonOk);
}

function dbNextQuery(wind) {
    let rad = wind.getElementsByTagName("input");
    let ik = rad.length;
    let type = "";
    for (let i = 0; i < ik; i++) {
        let item = rad[i];
        if (item.checked) {
            type = item.value;
            break;
        }
    }
    let w, h;
    if (type != "") {
        switch (type) {
            case "SELECT":
                w = 1130;
                h = 625;
                break;
            case "INSERT":
                
                break;
            case "UPDATE":
                
                break;
            case "DELETE":
                
                break;
        }
        document.documentElement.style.setProperty('--w_wind_qu', w + "px");
        document.documentElement.style.setProperty('--h_wind_qu', h + "px");
        setTimeout(dbProcessQuery, 300, wind, type);
    }
}

function dbProcessQuery(wind, type) {
    wind.innerHTML = "";
    switch (type) {
        case "SELECT":
//            dbEditQuery(wind, -1);
            let quSel = new QuerySelect(wind, listTables, -1, cbQuery);
//            quSel.init();
            break;
        case "INSERT":

            break;
        case "UPDATE":

            break;
        case "DELETE":

            break;
    }
}

function cbQuery(res, par) {
    let idPar = par.id;
    let item;
    if (idPar < 0) {
        let resD = JSON.parse(res);
        item = {id_query:resD.id_query,name_query:par.name,descr_query:par.descr,type_query:par.type_query,param_query:par.param_query,fields_result:par.fields_result};
        listQuerys.push(item);
        dbListQuerys();
    } else {
        let ik = listQuerys.length;
        for (let i = 0; i < ik; i++) {
            item = listQuerys[i];
            if (item.id_query == idPar) {
                item.param_query = par.param_query;
                item.fields_result = par.fields_result;
                if (item.name_query != par.name || item.descr_query != par.descr) {
                    item.name_query = par.name;
                    item.descr_query = par.descr;
                    dbListQuerys();
                }
            }
        }
    }
    
}
/*
function dbAddQuery() {
    dbEditQuery();
}
*/
function dbSetServer() {
    dbSelectOper(2);
    dbViewHostPanel();
    let scr = scrollListDataDB.closest('.viewport');
    scr.scroll_y.resize();
    
}

function cbDBGetQuerys(res) {
    listQuerys = JSON.parse(res);
    dbSelectOper(1);
    dbListQuerys();
}

function cbDBGetTables(res) {
    listTables = JSON.parse(res);
    dbSelectOper(0);
    formListTables_1();
    let dd = dataDescript.querySelector(".imgTable");
    dd.style.display = "block";
    let scr = scrollListDataDB.closest('.viewport');
    scr.scroll_y.resize();
}

function dbSelectOper(j) {
    let dbTitle = dataDescript.querySelector(".title");
    let ch = dbTitle.children;
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let item = ch[i];
        let img = item.querySelector("img");
        if (i == j) {
            item.style.backgroundColor = "#d5f0ff";
            if (img != null) {
                img.style.display = "block";
            }
        } else {
            item.style.backgroundColor = "";
            if (img != null) {
                img.style.display = "none";
            }
        }
    }
}


