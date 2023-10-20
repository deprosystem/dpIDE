function AdminSchema() {
    this.listProj;
    this.listSchem;
    this.list;
    this.delSchemaVal;

    this.init = function() {
        this.wind = formWind(410, 400, 40, 50, "Schemas");
        this.wind.className = "w_scroll wind";
        this.wind.style.overflowY = "auto";
        this.wind.style.overflowX = "hidden";
        doServer("GET", 'admin/listAllProjects', this, null, {mode:0}, this.wind);
    }
    
    this.cbDoServer = function(res, param) {
        let ik;
        switch (param.mode) {
            case 0:
                this.listProj = JSON.parse(res);
                doServerAlien("GET", "https://apps.dp-ide.com/db/schems", this, null, {mode:1}, this.wind);
                break;
            case 1:
                this.listSchem = JSON.parse(res);
                this.formSchemas();
                break;
            case 2:
                ik = this.list.length;
                let ch = this.wind.children;
                let delSch = param.schema;
                for (let i = 0; i < ik; i++) {
                    let item = this.list[i];
                    if (item.schema_name == delSch) {
                        this.list.splice(i, 1);
                        ch[i].remove();
                        break;
                    }
                }
                break;
        }
    }
    
    this.formSchemas = function() {
        this.list = [];
        let ik = this.listSchem.length;
        let jk = this.listProj.length;
        let item;
        for (let i = 0; i < ik; i++) {
            item = this.listSchem[i];
            let sch = item.schema_name;
            let noProj = true;
            for (let j = 0; j < jk; j++) {
                if (this.listProj[j].resurse_ind == sch) {
                    noProj = false;
                    break;
                }
            }
            if (noProj) {
                this.list.push(item);
            }
        }
        ik = this.list.length;
        for (let i = 0; i < ik; i++) {
            let vO = this.viewOne(this.list[i]);
            this.wind.append(vO);
        }
    }
    
    this.viewOne = function(item) {
        let dat = "";
        let oneDiv = '<div style="width: 100%;height: 22px;margin-left:5px">'
                +'<div style="width:200px;margin-top:3px;cursor:pointer;float:left">' + item.schema_name + '</div>'
                +'</div>';
        let cont = newDOMelement(oneDiv);
        let del = newDOMelement('<img style="float:right;cursor:pointer;margin-right:15px;margin-top:2px" width="14" height="14" src="img/close-o.png">');
        cont.append(del);
        del.addEventListener("click", () => {this.delSchema(item);});
        return cont;
    }
    
    this.delSchema = function(item) {
        event.stopPropagation();
        myAlert("Delete scheme " + item.schema_name + "?<br />Proceed?", "Proceed", this, item);
    }
    
    this.cbForAlert = function(item) {
        let dat = {mode:2,schema:item.schema_name};
        doServerAlien("POST", "https://apps.dp-ide.com/db/del_schema", this, JSON.stringify(dat), dat, this.wind);
    }
    
    this.init();
}

