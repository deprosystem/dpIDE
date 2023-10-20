function formLogin() {
    
    
this.tttDDDlll;
    
    
    this.regView;
    this.logView;
    let dataLog = [];
    let metaLog = [
        {name: "log", title:"Login",len:300,type:"Text", validSend:"minLen=2",valid:"latin"},
        {name: "pass", title:"Password",len:300,type:"Password",valid:"password",validSend:"minLen=2"},
        {name: "viewpas", title:"Show password",type:"Check"},
    ];
    let dataReg = [];
    let metaReg = [
        {name: "name", title:"Name",len:300,type:"Text", validSend:"notEmpty"},
        {name: "log", title:"Login",len:300,type:"Text", validSend:"minLen=2",valid:"latin"},
        {name: "email", title:"Email",len:300,type:"Text", validSend:"email"},
        {name: "pass", title:"Password",len:300,type:"Password",validSend:"minLen=5 pass=aA0&",valid:"password"},
        {name: "viewpas", title:"Show password",type:"Check"},
    ];
    let dataCode = [];
    let metaCode = [
        {name: "code", title:"Confirmation code",len:300,type:"Text", validSend:"len=4 number",valid:"number"}
    ];

    this.currentEdit;
    this.currentData;
    this.currentView;
    this.editCode;
    this.panelCode;
    this.panel = newDOMelement('<div style="position:relative;height:350px;width:420px;border: 1px solid #1dace9;border-radius:8px;background:white"></div>');
    loginPanel.append(this.panel);
    this.panel.addEventListener('keydown', () => {if( event.code === 'Enter' ) this.send();});
    let sendPanel = newDOMelement('<div style="position:absolute;height:50px;width:100%;bottom:0px;border-top: 1px solid #1dace9;"></div>');
    panel.append(sendPanel);
    let bootSend = createButtonBlue("Send");
    bootSend.addEventListener('click', () => {this.send();});
    sendPanel.append(bootSend);
    let contrPanel = newDOMelement('<div style="position:absolute;height:40px;width:100%;top:0px;border-bottom:1px solid #1dace9;font-size:20px;"></div>');
    panel.append(contrPanel);
    let log = newDOMelement('<div style="height:100%;width:48%;background:#DAF0FA;text-align:center;border-top-left-radius:8px;float:left;cursor:pointer">'
            +'<div style="margin-top:5px;">Login</div></div>');
    let reg = newDOMelement('<div style="height:100%;width:48%;text-align:center;border-top-right-radius:8px;float:right;cursor:pointer">'
            +'<div style="margin-top:5px;">Register</div></div>');
    log.addEventListener('click', () => {this.clickLog();});
    reg.addEventListener('click', () => {this.clickReg();});
    contrPanel.append(log);
    contrPanel.append(reg);
    let viewLog = newDOMelement('<div style="position:absolute;left:0;top:41px;right:0;bottom:71px;"></div>');
    let viewReg = newDOMelement('<div style="position:absolute;left:0;top:41px;right:0;bottom:71px;background-color:white;display:none"></div>');
    panel.append(viewLog);
    panel.append(viewReg);
    let viewError = newDOMelement('<div style="position:absolute;left:5px;height:20px;right:5px;bottom:51px;color:red"></div>');
    panel.append(viewError);
    let editLog = new EditForm(metaLog, dataLog, viewLog, null, this);
    let editReg = new EditForm(metaReg, dataReg, viewReg, null, this);
    this.regView = editReg.getView("pass").querySelector("input");
    this.logView = editLog.getView("pass").querySelector("input");
    this.currentEdit = editLog;
    this.currentData = dataLog;
    this.currentView = logView;
    
    this.clickReg = function() {
        reg.style.backgroundColor = "#DAF0FA";
        log.style.backgroundColor = "";
        viewReg.style.display = "block";
        viewLog.style.display = "none";
        this.currentEdit = editReg;
        this.currentData = dataReg;
        this.currentView = regView;
        viewError.innerHTML = "";
    }
    
    this.clickLog = function() {
        reg.style.backgroundColor = "";
        log.style.backgroundColor = "#DAF0FA";
        viewReg.style.display = "none";
        viewLog.style.display = "block";
        this.currentEdit = editLog;
        this.currentData = dataLog;
        this.currentView = logView;
        viewError.innerHTML = "";
    }
    
    this.cbEdit = function(name){
        switch (name) {
            case "viewpas":
                if (this.currentData.viewpas) {
                    this.currentView.type = "text";
                } else {
                    this.currentView.type = "password";
                }
                break;
        }
    }
    
    this.send = function() {
        viewError.innerHTML = "";
        let err = this.currentEdit.isValid();
        if (err.length > 0) {
            viewError.innerHTML = err;
        } else {
            let url;
            let data;
            if (this.currentData == dataCode) {
                url = "auth/login";
                data = JSON.stringify({login: dataReg.log, password: dataReg.pass, codeConfirm: dataCode.code});
            } else {
                if (this.currentData == dataReg) {
                    url = "auth/register";
                    data = JSON.stringify({userName: dataReg.name, login: dataReg.log, password: dataReg.pass, email:dataReg.email});
                } else {
                    url = "auth/login";
                    data = JSON.stringify({login: dataLog.log, password: dataLog.pass});
                }
            }
            doServer("POST", url, this, data, null, document.body);
        }
    }
    
    this.cbDoServer = function(res) {
        if (this.currentData == dataReg) {
            this.panelCode = newDOMelement('<div style="position:absolute;left:0;top:0;right:0;bottom:71px;background-color:#fff;font-size:20px;"></div>');
            this.panel.append(this.panelCode);
            let pc = newDOMelement('<div style="position:absolute;left:0;top:50px;right:0;bottom:0"></div>');
            this.panelCode.append(pc);
            let txt = newDOMelement('<div style="float:left;font-size:20px;text-align:center"></div>');
            txt.innerHTML = "A confirmation code has been sent to your email. Enter it here.";
            pc.append(txt);
            this.editCode = new EditForm(metaCode, dataCode, pc, null, this);
            this.currentData = dataCode;
            this.currentEdit = this.editCode;
        } else {
            loginPanel.innerHTML = "";
            loginPanel.style.display = "none"
            initialView(res);
        }
    }
}


