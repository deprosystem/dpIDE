function PushNotifications() {
    let metaPush = [
        {name:"config",title:"For mobile",type:"FileToStr",len:70},
        {name:"isJson",len:20,type:"ImgLabel",src:"img/check_green.png"},
        {name:"confserv",title:"For server",type:"FileToStr",len:70},
        {name:"isJsonServ",len:20,type:"ImgLabel",src:"img/check_green.png"},
//        {name:"icon",title:"Icon",type:"Img",len:30},
//        {name:"color",title:"Color",type:"Color",len:40},
        {name:"add", title:"Add channel",type:"ClickLab",img:"img/add_blue.png",float:"right",margR:7,tLocation:"right",color:"#1DACE9",wh:12},
    ];
    let meta = [
        {name:"name",title:"Id",len:70,type:"Text",valid:"latin"},
        {name:"txt",title:"Name visible to user",len:130,type:"Text"},
        {name:"importance",title:"Importance",len:80,type:"Select",value:"NONE,MIN,LOW,DEFAULT,HIGH"},
        {name:"screen",title:"Start screen",type:"Text",len:100,valid:"latin"}
    ];
    let metaNotif = [
        {name:"name",title:"Name",len:70,type:"Text",valid:"latin"},
        {name:"txt",title:"Text",len:100,type:"Text"},
        {name:"icon",title:"Icon",type:"Img",len:30},
        {name:"large",title:"Large",type:"Img",len:35},
        {name:"color",title:"Color",type:"Color",len:40}
    ];
    let metaServ = [
//        {name:"type",title:"Type",len:120,type:"Select",value:"New data,Data change,Event occurrence,Queue change,Push message"},
        {name:"type",title:"Type",len:120,type:"Select",value:"New data,Data change,Event occurrence,Queue change"},
        {name:"table",title:"Table",len:120,type:"Tables"}
    ];
/*
    let metaServMes = [
        {name:"type",title:"Type",len:120,type:"Select",value:"New data,Data change,Event occurrence,Queue change,Push message"}
    ];
 */
    let metaServOther = [
        {name:"title",title:"Title push",len:120,type:"Text"},
        {name:"message",title:"Message push",len:120,type:"Text"},
        {name: "param", title:"Parameters message",len:200,type:"MultiCheck",value:"",br:true},
        {name: "data", title:"Other data",len:200,type:"MultiCheck",value:"",br:true}
    ];
    let hCont = 50;
    let wChan = 420;
    let wNotice = 312;
    let leftNotice = 422;
    let leftServ = 732;
    
    this.pushData = null;
    this.rowChannel = -1;
    this.rowotices = -1;
    this.numChanal;
    this.numNotices;
    this.fields;
    
    this.init = function() {
        if (this.pushData == null) {
            if (currentProject != null) {
                if (currentProject.push != null && currentProject.push.length > 0) {
                    this.pushData = JSON.parse(currentProject.push);
                } else {
                    this.pushData = {config:"",notif:[]};
                }
            }
        }
    };
    
    this.edit = function() {
        if (this.pushData === null) {
            dialogError("Error", "No project");
            return;
        }
        this.wind = formWind(1032, 365, 70, 150, "Push notifications", null, this, null, null, "");
        setHelp(this.wind, "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.qki8f7sfwnoq");
        if (listTables == null) {
            doServerAlien("GET", currentProject.host + 'tables/list', this, null, {param:0}, this.wind);
        } else {
            this.edit_1();
        }
    };
    
    this.cbDoServer = function(res, par) {
        switch (par.param) {
            case 0:
                listTables = JSON.parse(res);
                this.edit_1();
                break;
            case 1:
                closeDataWindow(this.wind);
                break;
        }
    };
    
    this.edit_1 = function() {
        let chanalView = newDOMelement('<div style="width:' + wChan + 'px;position: absolute;left: 0;top: 0;bottom: 40px;border-right: 1px solid #1dace9"></div>');
        this.wind.append(chanalView);
        
        let notices = newDOMelement('<div style="left:' + leftNotice + 'px;position: absolute;width:' + wNotice + 'px;top: 0;bottom: 40px;border-right:1px solid #1dace9"></div>');
        let contNotices = newDOMelement('<div style="top:0;left:2px;height:' + hCont + 'px;position:absolute;right:0;border-bottom:1px solid #1dace9"></div');
        let addNotices = newDOMelement('<div style="margin-right:10px;margin-top:11px;float:right;color:#1dace9;cursor:pointer">Add notice</div>');
        addNotices.addEventListener("click", () => {this.addRowNotice();}, true);
        contNotices.append(addNotices);
        let addNoticesImg = newDOMelement('<img width="12" height="12" style="margin-right:10px;margin-top:12px;float:right;cursor:pointer" src="img/add_blue.png">');
        addNoticesImg.addEventListener("click", () => {this.addRowNotice();}, true);
        contNotices.append(addNoticesImg);
        notices.append(contNotices);
        this.noticesView = newDOMelement('<div style="left: 2px;position: absolute;right: 0;top:' + hCont + 'px;bottom:0;"></div>');
        notices.append(this.noticesView);
        this.wind.append(notices);
        let serv = newDOMelement('<div style="left:' + leftServ + 'px;position: absolute;right:0;top: 0;bottom: 40px;"></div>');
        this.contServ = newDOMelement('<div style="top:0;left:2px;height:' + hCont + 'px;position:absolute;right:0;border-bottom:1px solid #1dace9"></div');
        serv.append(this.contServ);
        this.descrServ = newDOMelement('<div style="bottom:0;left:2px;top:' + (hCont + 1) + 'px;position:absolute;right:0;"></div');
        serv.append(this.descrServ);
        this.wind.append(serv);
        let contInp = newDOMelement('<div style="top:0;left:0;height:' + hCont + 'px;position:absolute;right:0;border-bottom:1px solid #1dace9"></div');
        chanalView.append(contInp);
        contInp.append(newDOMelement('<div style="font-size:10px;color:#8199A5;position:absolute;left:7px">Choose a Firebase config files</div>'));
        this.edPush = new EditForm(metaPush, this.pushData, contInp, null, this, true, null, null, 7, "channel");
        this.edPush.setVisibility("isJson", "config");
        this.edPush.setVisibility("isJsonServ", "confserv");

        this.windEdit = newDOMelement('<div style="position: absolute;left: 3px;right:0;top:' + hCont + 'px;bottom: 40px;overflow: auto"></div>');
        chanalView.append(this.windEdit);
        this.listEdit = new ListEdit(meta, this.pushData.notif, this.windEdit, this, "channel");
        let control = newDOMelement('<div style="position: absolute;left: 0;right: 0;height:40px;bottom:0;border-top:1px solid #1dace9""></div>');
        this.wind.append(control);
        let bootonOk = createButtonBlue(" Ok ");
        bootonOk.style.marginTop = "5px";
        bootonOk.style.float = "right";
        bootonOk.style.marginRight = "10px";
        bootonOk.addEventListener("click", () => {this.savePush();});
        control.append(bootonOk);
    };

    this.listPushNameSt = function() {
        let ik = this.pushData.notif.length;
        let st = "";
        let sep = "";
        for (let i = 0; i < ik; i++) {
            item = this.pushData.notif[i];
            let notif = this.pushData.notif[i]["notices"];
            if (notif != null) {
                let jk = notif.length;
                for (let j = 0; j < jk; j++) {
                    st += sep + notif[j].name;
                    sep = ",";
                }
            }
        }
        return st;
    };
    
    this.addRowNotice = function() {
        this.listEditNotices.addRow();
    };
    
    this.cbListEdit = function(name, ind, tag) {

    };
    
    this.cbEdit = function(name, tag, additional) {
        switch (tag) {
            case "channel":
                switch (name) {
                    case "config":
                        this.edPush.setVisibility("isJson", "config");
                        break;
                    case "confserv":
                        this.edPush.setVisibility("isJsonServ", "confserv");
                        break;
                    case "add":
                        this.listEdit.addRow();
                        break;
                }
                break;
            case "notices":
                switch (name) {
                    case "type":
/*
                        switch(datServ.type) {
                            case "Push message":
                                this.descrServ.innerHTML = "";
                                datServ.table = "";
                                this.contServ.innerHTML = "";
                                new EditForm(metaServMes, datServ, this.contServ, null, this, true, null, null, 7, "notices");
                                break;
                            default:
                                this.contServ.innerHTML = "";
                                new EditForm(metaServ, datServ, this.contServ, null, this, true, null, null, 7, "notices");
                                this.setDescrServ(datServ);
                                break;
                        }
 */
                        break;
                    case "table":
                        let datNot = this.pushData.notif[this.numChanal]["notices"];
                        let datI = datNot[this.numNotices];
                        let datServ = datI.serv;
                        datServ.title = "";
                        datServ.message = "";
                        datServ.param = "";
                        datServ.data = "";
                        this.setDescrServ(datServ);
                        break;
                }
                break;
        }
    };
    
    this.setDescrServ = function(datServ) {
        this.descrServ.innerHTML = "";
        let ik = listTables.length;
        let tt = datServ.table;
        let num = 0;
        for (let i = 0; i < ik; i++) {
            if (tt == listTables[i].name_table) {
                num = i;
                break;
            }
        }
        let tab = listTables[num];
        let listFields = JSON.parse(tab.fields_table);
        ik = listFields.length;
        let st = "";
        let sep = "";
        datServ.primaryKay = "";
        for (let i = 0; i < ik; i++) {
            let item = listFields[i];
            st += sep + item.name;
            sep = ",";
            if (item.key) {
                datServ.primaryKay = item.name;
            }
        }
        this.fields = st;
        metaServOther[2].value = st;
        metaServOther[3].value = st;
        new EditForm(metaServOther, datServ, this.descrServ, null, this, true, null, null, 7, "notices");
    };
    
    this.cbChangeRow = function(i, tag) {
        switch (tag) {
            case "channel":
                this.noticesView.innerHTML = "";
                if (i > -1) {
                    this.numChanal = i;
                    let dataNotif = this.pushData.notif[i]["notices"];
                    if (dataNotif == null) {
                        dataNotif = [];
                        this.pushData.notif[i]["notices"] = dataNotif;
                    }
                    this.listEditNotices = new ListEdit(metaNotif, dataNotif, this.noticesView, this, "notices");
                }
                break;
            case "notices":
                this.contServ.innerHTML = "";
                this.numNotices = i;
                let datNot = this.pushData.notif[this.numChanal]["notices"];
                let datI = datNot[i];
                if (datI.serv == null) {
                    datI.serv = {type:"New data"};
                }
                let datServ = datI.serv;
                new EditForm(metaServ, datServ, this.contServ, null, this, true, null, null, 7, "notices");
                this.setDescrServ(datServ);
                break;
        };
    };
    
    this.savePush = function() {
        this.savePushServ();
    };
    
    this.savePushServ = function() {
        let dat = {json:this.pushData.confserv};
        let listPush = [];
        let ik = this.pushData.notif.length;
        for (let i = 0; i < ik; i++) {
            item = this.pushData.notif[i];
            let notif = this.pushData.notif[i]["notices"];
            if (notif != null) {
                let jk = notif.length;
                for (let j = 0; j < jk; j++) {
                    let item = notif[j];
                    let serv = item.serv;
                    if (serv != null) {
                        let itemServ = {name:item.name,type:serv.type,table:serv.table,primaryKay:serv.primaryKay,title:serv.title,message:serv.message,param:serv.param,data:serv.data};
                        listPush.push(itemServ);
                    }
                }
            }
        }
        dat.listPush = listPush;
        doServerAlien("POST", currentProject.host + "push/save", this, JSON.stringify(dat), {param:1}, this.wind);
    };
    
    this.cbCloseWind = function(el) {
//        return true;
    };
    
    this.getJson = function() {
        if (this.pushData != null) {
            return JSON.stringify(this.pushData);
//            let notif = this.pushData.notif;
        } else {
            return "";
        }
    };
    
    this.init();
}