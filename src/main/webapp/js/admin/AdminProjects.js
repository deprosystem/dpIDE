function AdminProjects() {
    this.list;
    this.init = function() {
        this.wind = formWind(290, 400, 40, 500, "Projects", null, "noCloseWind");
        this.wind.className = "w_scroll wind";
        this.wind.style.overflowY = "auto";
        this.wind.style.overflowX = "hidden";
    }
    
    this.setProject = function(userId, userName) {
        setTitleWind(this.wind, "Projects by user " + userName);
        doServer("GET", 'admin/listProjects?id=' + userId, this, null, {mode:0}, this.wind);
    }
    
    this.cbDoServer = function(res, param) {
        let ik;
        switch (param.mode) {
            case 0:
                this.list = JSON.parse(res);
                ik = this.list.length;
                this.wind.innerHTML = "";
                for (let i = 0; i < ik; i++) {
                    let item = this.list[i];
                    this.wind.append(this.viewOne(item, i));
                }
                break;
            case 1:
                ik = this.list.length;
                for (let i = 0; i < ik; i++) {
                    let item = this.list[i];
                    if (item.user_id == this.selUserId) {
                        this.list.splice(i, 1);
                        let ch = this.wind.children;
                        ch[i].remove();
                        break;
                    }
                }
/*
                this.list.splice(param.indSel, 1);
                let ch = this.wind.children;
                ch[param.indSel].remove();
*/
                break;
            case 2:
                let dat = JSON.stringify({schema:param.schema,projectId:param.projectId});
                doServer("POST", "admin/delProject", this, dat, {mode:1,indSel:param.indSel}, this.wind);
                break;
        }
    }
    
    this.viewOne = function(item, i) {
        let dat = "";
        if (item.date_create != null && item.date_create != 0) {
            dat = dateServer(item.date_create, "dd.MM.yy");
        }
        let oneDiv = '<div style="width: 100%;height: 20px;margin-left:5px">'
                +'<div style="width:100px;margin-top:3px;float:left">' + item.project_name + '</div>'
                +'<div style="width:40px;margin-top:3px;float:left">' + dat + '</div>'
                +'</div>';
        let cont = newDOMelement(oneDiv);
        let del = newDOMelement('<img style="float:right;cursor:pointer;margin-right:15px;margin-top:2px" width="14" height="14" src="img/close-o.png">');
        cont.append(del);
        del.addEventListener("click", () => {this.delProject(item, i);});
        return cont;
    }

    this.delProject = function(item, i) {
        event.stopPropagation();
        item.indSel = i;
        myAlert("Project " + item.project_name + " will be deleted.<br />Proceed?", "Proceed", this, item);
    }
    
    this.cbForAlert = function(item) {
        let dat = {mode:2,schema:item.resurse_ind,projectId:item.project_id,indSel:item.indSel};
        if (item.where_server == "Third party API") {

        } else {
            if (item.host == null || item.host.length == 0) {
                doServer("POST", "admin/delProject", this, JSON.stringify(dat), {mode:1,indSel:item.indSel}, this.wind);
            } else {
                doServerAlien("POST", item.host + "db/del_schema", this, JSON.stringify(dat), dat, this.wind);
            }
        }
    }
    
    this.init();
}

function noCloseWind(el) {
    return true;
}
