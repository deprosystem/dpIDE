function AdminUsers() {
    this.list;
    this.selUser;
    this.selUserId;
    
    this.init = function() {
        this.wind = formWind(410, 400, 40, 50, "Users", null, this);
        this.wind.className = "w_scroll wind";
        this.wind.style.overflowY = "auto";
        this.wind.style.overflowX = "hidden";
        this.admProj = new AdminProjects();
        doServer("GET", 'admin/listUsers', this, null, {mode:0}, this.wind);
    }
    
    this.cbDoServer = function(res, param) {
        let ik;
        switch (param.mode) {
            case 0:
                this.list = JSON.parse(res);
                ik = this.list.length;
                for (let i = 0; i < ik; i++) {
                    let item = this.list[i];
                    let vO = this.viewOne(item);
                    if (i == 0) {
                        this.selUser = vO;
                        vO.style.backgroundColor = "#eef0ff";
                    }
                    this.wind.append(vO);
                }
                break;
            case 1:
                ik = this.list.length;
                let iDel = -1;
                let ch = this.wind.children;
                for (let i = 0; i < ik; i++) {
                    let item = this.list[i];
                    if (item.user_id == this.selUserId) {
                        this.list.splice(i, 1);
                        ch[i].remove();
                        iDel = i;
                        break;
                    }
                }
                if (iDel > -1) {
                    this.selUser = null;
                    ch = this.wind.children;
                    if (iDel < this.list.length) {
                        this.selUser = null;
                        this.selectUser(this.list[iDel], ch[iDel]);
                    } else {
                        iDel = this.list.length - 1;
                        if (iDel >= 0) {
                            this.selUser = null;
                            this.selectUser(this.list[iDel], ch[iDel]);
                        }
                    }
                }
                break;
        }
    }
    
    this.viewOne = function(item) {
        let dat = "";
        if (item.tyme_actual != null && item.tyme_actual != 0) {
            dat = dateServer(item.tyme_actual, "dd.MM.yy");
        }
        let oneDiv = '<div style="width: 100%;height: 22px;margin-left:5px">'
                +'<div style="width:200px;margin-top:3px;cursor:pointer;float:left">' + item.user_name 
                +'</div><div style="width:100px;margin-top:3px;cursor:pointer;float:left">' + item.login + '</div>'
                +'<div style="width:40px;margin-top:3px;cursor:pointer;float:left">' + dat + '</div></div>';
        let cont = newDOMelement(oneDiv);
        let del = newDOMelement('<img style="float:right;cursor:pointer;margin-right:15px;margin-top:2px" width="14" height="14" src="img/close-o.png">');
        cont.append(del);
        cont.addEventListener("click", () => {this.selectUser(item, cont);});
        del.addEventListener("click", () => {this.delUser(item, cont);});
        return cont;
    }
    
    this.selectUser = function(item, selV) {
        if (this.selUser != null) {
            this.selUser.style.backgroundColor = "";
        }
        this.selUser = selV;
        this.selUserId = item.user_id;
        selV.style.backgroundColor = "#eef0ff";
        this.admProj.setProject(item.user_id, item.user_name);
    }
    
    this.delUser = function(item, selV) {
        event.stopPropagation();
        if (this.selUserId == item.user_id) {
            if (this.admProj.list.length == 0) {
                myAlert("User " + item.user_name + " will be deleted along with all projects.<br />Proceed?", "Proceed", this, item);
            } else {
                myAlert("Need to delete all projects of user " + item.user_name, null, this, item);
            }
        } else {
            this.selectUser(item, selV);
        }
    }
    
    this.cbForAlert = function(item) {
        doServer("POST", "admin/delUser", this, JSON.stringify({userId:item.user_id, userResInd:item.resurse_ind}), {mode:1}, this.wind);
    }

    this.cbCloseWind = function() {
        closeDataWindow(this.admProj.wind);
        return false;
    }
    
    this.init();
}


