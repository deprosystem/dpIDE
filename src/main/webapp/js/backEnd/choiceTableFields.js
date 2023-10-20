function ChoiceTableFields() {
    this.hostDomain = currentProject.host;
    this.oper;
    this.id;
    this.source = "table";
    this.cb;
    
    this.choiceSource = function() {
        this.oper = 2;
        if (listTables == null) {
            doServerAlien("GET", this.hostDomain + 'tables/list', this, null, null, document.body);
        } else {
            this.formListTables();
        }
    }
    
    this.getSourceById = function(id) {
        this.oper = 1;
        this.id = id;
        if (listTables == null) {
            doServerAlien("GET", this.hostDomain + 'tables/list', this, null, null, document.body);
        } else {
            this.getById();
        }
    }
    
    this.cbDoServer = function(res, param) {
        listTables = JSON.parse(res);
        switch (this.oper) {
            case 1:
                this.getById();
                break;
            case 2:
                this.formListTables();
                break;
        }
    }
    
    this.getById = function() {
        let ik = listTables.length;
        for (let i = 0; i < ik; i++) {
            let item = listTables[i];
            if (item.id_table == this.id) {
                this.cb.setFieldsSource_1({name:item.name_table,fields:item.fields_table});
//                return {name_query:item.name,fields_result:fields_table};
            }
        }
//        return null;
    }
    
    this.formListTables = function() {
        listTables.sort(function(a, b){
            let nameA=a.name_table.toLowerCase(), nameB=b.name_table.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        let wind = formWind(300, 400, 40, 250, "Choose a table", true, null, null, null, "");
        let ik = listTables.length;
        if (ik > 0) {
            for (let i = 0; i < ik; i++) {
                this.oneQueryView(i, wind);
            }
            let scr = wind.closest('.viewport');
            scr.scroll_y.resize();
        }
    }
    
    this.oneQueryView = function(i, el) {
        let item = listTables[i];
        let descr = item.title_table;
        if (descr == null) {
            descr = "";
        }
        let oneDiv = '<div  style="float:left;width:100%;height:36px;cursor:pointer;border-bottom:1px solid #aaf;clear:both;position:relative">'
                        +'<div class="name_t" style="font-size:14px;color:#000;position:absolute;top:1px;left:3px">' + item.name_table + '</div>'
                        +'<div class="descr_t" style="font-size:10px;color:#555;position:absolute;top:17px;left:3px;right:0;height:14px;overflow:hidden">' + descr + '</div>'
                    +'</div>';
        let cont = newDOMelement(oneDiv);
        cont.addEventListener("click", () => {this.selectTab(i, el);}, true);
        el.appendChild(cont);
    }
    
    this.selectTab = function(i, el) {
        closeDataWindow(el);
        let item = listTables[i];
        this.cb.setFieldsSource_1({id:item.id_table,name:item.name_table,fields:item.fields_table});
    }
}


