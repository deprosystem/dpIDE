var hostDescr, hostDomain, hostPassword, hostPanel, whereServer;

function setHostPanel() {
    let host = "Not described";
    let hostButt = "Describe the server";
    hostDescr = whereServ = currentProject.whereServer;
    let par = button_host.parentElement;
    par.onclick = descrHost;
    hostDomain = currentProject.host;
    where_serv.innerHTML = whereServ;
    button_host.innerHTML = hostButt;
    if (hostDomain != null && hostDomain.length > 0) {
        host = currentProject.host;
        descr_host.innerHTML = host;
        hostButt = "Change server description";
        par.onclick = changeHost;
        if (hostDomain != null && hostDomain.length > 0  && hostDescr != "Third party API") {
            if (listTables == null) {
                doServerAlien("GET", hostDomain + 'tables/list', cbGetTables);
            } else {
                formListTables();
            }
        }
    }
}

function dbViewHostPanel() {
    hostDescr = "Server IDE"; 
    hostDomain = "";
    hostPassword = "";
    hostPanel = null;
    scrollListDataDB.innerHTML = "";
    let chHost = editSelect("Where is the server", 110, "Server IDE,Own server", "", "changeHostSel");
    chHost.style.marginTop = "5px";
    chHost.style.marginLeft = "5px";
    scrollListDataDB.appendChild(chHost);
    
    hostPanel = newDOMelement('<div style="float:left;clear:both;margin-left:5px;margin-top:5px;display:none"></div>');
    let domain = editTextParam("Domain name", 200, "", "changeHostDomain");
    hostPanel.appendChild(domain);
    scrollListDataDB.appendChild(hostPanel);
    
    let buttonSend = createButtonBlue('Send', 70);
    buttonSend.style.clear = "both";
    buttonSend.style.marginTop = "24px";
    buttonSend.addEventListener("click", function(){dbSendDescrHost();}, true);
    scrollListDataDB.appendChild(buttonSend);
/*
    let buttonAddF = createButtonBlue('Send', 70);
    buttonAddF.style.clear = "both";
    buttonAddF.style.marginTop = "24px";
    buttonAddF.addEventListener("click", function(){dbAddF();}, true);
    scrollListDataDB.appendChild(buttonAddF);
*/
}

function dbAddF() {
    doServerAlien("get", hostDomain + "db/getQuery_1", cbDBAddFGetQu, null, null, document.body);
}

function cbDBAddFGetQu(res) {
    let qu = JSON.parse(res);
console.log("DDDD="+qu.descr_query+"<<");
}

function dbSendDescrHost() {
    if (hostDescr == "Server IDE") {
        hostDomain = "https://apps.dp-ide.com/";
    }
    let dat = {whereServer:hostDescr,domain:hostDomain,pass:hostPassword,res_ind:currentProject.resurseInd};
    doServerAlien("POST", hostDomain + "db/create", cbDBCreateHost, JSON.stringify(dat), null, document.body);
}

function cbDBCreateHost(res) {
    currentProject.host = hostDomain;
    currentProject.whereServer = hostDescr;
    let dat = {whereServer:hostDescr,domain:hostDomain,pass:hostPassword,res_ind:currentProject.resurseInd};
    doServer("POST", 'project/sethost', cbDBSetHost, JSON.stringify(dat));
}

function cbDBSetHost() {
    let tt = dataDescript.querySelector(".titleBlock");
    tt.innerHTML = "";
    tt.append(newDOMelement(dataTabQu));
    dbViewTable();
}

function cbGetTables(res) {
    listTables = JSON.parse(res);
    formListTables();
}

function formListTables() {
    formListTables_1();
//    setButtonAdd();
}

function formListTables_1() {
    listTables.sort(function(a, b){
        let nameA=a.name_table.toLowerCase(), nameB=b.name_table.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    scrollListDataDB.innerHTML = "";
    let ik = listTables.length;
    if (ik > 0) {
        for (let i = 0; i < ik; i++) {
            oneTableView(listTables[i], scrollListDataDB);
        }
    }
}

function oneTableView(item, el) {
    let cont = newDOMelement('<div class="tableInf" onclick="editTable(' + item.id_table + ')" style="float:left;width:100%;height:30px;overflow: hidden;cursor:pointer;border-bottom:1px solid #aaf;clear:both"></div>');
    let name = newDOMelement('<div class="name_t" style="font-size:16px;color:#000;margin-top:5px;float:left;margin-left:5px">' + item.name_table + '</div>');
    cont.appendChild(name);
    el.appendChild(cont);
    let rect = cont.getBoundingClientRect();
    let rect_1 = name.getBoundingClientRect();
    let descr = newDOMelement('<div class="title_t" style="font-size:12px;color:#555;margin-top:9px;height:12px;width:' + Math.round(rect.width - rect_1.width - 40) 
            + 'px;float:left;margin-left:10px;overflow:hidden">' + item.title_table + '</div>');
    cont.appendChild(descr);    
    if (item.name_table != "user") {
        let del = newDOMelement('<img onclick="deleteTableAdm(' + item.id_table + ');" style="margin-top:11px;float:right;margin-right:7px;cursor:pointer;" width="10" height="10" src="img/del_red.png">');
        cont.appendChild(del);
    }
}

function descrHost() {
    hostDescr = "Server IDE"; 
    hostDomain = "";
    hostPassword = "";
    hostPanel = null;
    let wind = formWind(350, 300, 40, 350, "Describe the server");
    let footer = createFooter(50);
    addFooter(wind, footer);
    let buttonSend = createButtonBlue('Send', 70);
    buttonSend.addEventListener("click", function(){sendDescrHost();closeWindow(wind);}, true);
    footer.appendChild(buttonSend);
    let buttonCancel = createButtonWeite('Cancel', 70);
    buttonCancel.addEventListener("click", function(event){closeWindow(wind);}, true);
    footer.appendChild(buttonCancel);
    
    let chHost = editSelect("Where is the server", 110, "Server IDE,Own server,Third party API", "", "changeHostSel");
    chHost.style.marginTop = "5px";
    chHost.style.marginLeft = "5px";
    wind.appendChild(chHost);
    
    hostPanel = document.createElement('div');
    hostPanel.style.cssText = "float:left;clear:both;margin-left:5px;margin-top:5px;display:none";
    wind.appendChild(hostPanel);
    
    let domain = editTextParam("Domain name", 200, "", "changeHostDomain");
    hostPanel.appendChild(domain);
/*
    let pass = editTextParam("Password", 120, "", "changeHostPassw");
    pass.style.marginTop = "5px";
    pass.style.clear = "both";
    hostPanel.appendChild(pass);
*/
}

function changeHost() {
    hostDescr = ""; 
    hostDomain = "";
    hostPassword = "";
    hostPanel = null;
    let wind = formWind(350, 300, 40, 350, "Change describe the server");
    let footer = createFooter(50);
    addFooter(wind, footer);

    let buttonCancel = createButtonWeite('Cancel', 70);
    buttonCancel.addEventListener("click", function(event){closeWindow(wind);}, true);
    footer.appendChild(buttonCancel);
    
    wind.innerHTML = '<div style="margin-left:20px;margin-top:40px;font-size:20px">Server migration is not currently implemented</div>'
}

function sendDescrHost() {
    if (hostDescr == "Server IDE") {
            hostDomain = "https://apps.dp-ide.com/";
//        hostDomain = "https://apps.deprosystem.com/";
    }
    let dat = {whereServer:hostDescr,domain:hostDomain,pass:hostPassword,res_ind:currentProject.resurseInd};
    if (hostDescr == "Third party API") {
        cbCreateHost(dat);
    } else {
        doServerAlien("POST", hostDomain + "db/create", cbCreateHost, JSON.stringify(dat));
    }
}

function cbCreateHost(res) {
//    setButtonAdd(false);
    currentProject.host = hostDomain;
    descr_host.innerHTML = hostDomain;
    currentProject.whereServer = hostDescr;
    where_serv.innerHTML = hostDescr;
    button_host.innerHTML = "Change server description";
    let par = button_host.parentElement;
    par.onclick = changeHost;
    let dat = {whereServer:hostDescr,domain:hostDomain,pass:hostPassword,res_ind:currentProject.resurseInd};
    doServer("POST", 'project/sethost', cbSetHost, JSON.stringify(dat));
}

function cbSetHost(res) {
// нічого не треба
    doServerAlien("GET", hostDomain + 'tables/list', cbGetTables);
}

function openAdminWind() {
    let hostNew;
    hostDomain = currentProject.host;
    if (debagStatus) {
        hostNew = hostDomain.replace("apps", "deb-apps");
    } else {
        hostNew = hostDomain;
    }
    window.open(hostNew + "?schema=" + currentProject.resurseInd, '_blank');
}

function changeHostSel(el) {
    if (hostPanel == null) return;
    let val = el.options[el.selectedIndex].value;
    hostDescr = val;
    if (val != "Server IDE") {
        hostPanel.style.display = "block";
    } else {
        hostPanel.style.display = "none";
        hostDomain = "https://apps.dp-ide.com/";
//        hostDomain = "https://apps.deprosystem.com/";
    }
}

function changeHostDomain(el) {
    hostDomain = el.value;
}

function changeHostPassw(el) {
    hostPassword = el.value;
}

