function ChoiceQueryFields() {
    this.hostDomain = currentProject.host;
    this.oper;
    this.id;
    this.source = "guery";
    this.cb;
    
    this.choiceSource = function() {
        this.oper = 2;
        if (listQuerys == null) {
            doServerAlien("GET", this.hostDomain + 'query/list', this, null, null, document.body);
        } else {
            this.formListQuerys();
        }
    }
    
    this.getSourceById = function(id) {
        this.oper = 1;
        this.id = id;
        if (listQuerys == null) {
            doServerAlien("GET", this.hostDomain + 'query/list', this, null, null, document.body);
        } else {
            this.getById();
        }
    }
    
    this.cbDoServer = function(res, param) {
        listQuerys = JSON.parse(res);
        switch (this.oper) {
            case 1:
                this.getById();
                break;
            case 2:
                this.formListQuerys();
                break;
        }
    }
    
    this.getById = function() {
        let ik = listQuerys.length;
        for (let i = 0; i < ik; i++) {
            let item = listQuerys[i];
            if (item.id_query == this.id) {
                this.cb.setFieldsSource_1({name:item.name_query,fields:item.fields_result,param:item.param_query});
                break;
            }
        }
    }
    
    this.formListQuerys = function() {
        listQuerys.sort(function(a, b){
            let nameA=a.name_query.toLowerCase(), nameB=b.name_query.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        let wind = formWind(300, 400, 40, 250, "Choose a query", true, null, null, null, "");
        let ik = listQuerys.length;
        if (ik > 0) {
            for (let i = 0; i < ik; i++) {
                this.oneQueryView(i, wind);
            }
            let scr = wind.closest('.viewport');
            scr.scroll_y.resize();
        }
    }
    
    this.oneQueryView = function(i, el) {
        let item = listQuerys[i];
        let descr = item.title_query;
        if (descr == null) {
            descr = "";
        }
        let oneDiv = '<div  style="float:left;width:100%;height:36px;cursor:pointer;border-bottom:1px solid #aaf;clear:both;position:relative">'
                        +'<div class="name_t" style="font-size:14px;color:#000;position:absolute;top:1px;left:3px">' + item.name_query + '</div>'
                        +'<div class="descr_t" style="font-size:10px;color:#555;position:absolute;top:17px;left:3px;right:0;height:14px;overflow:hidden">' + descr + '</div>'
                    +'</div>';
        let cont = newDOMelement(oneDiv);
        cont.addEventListener("click", () => {this.selectQuery(i, el);}, true);
        el.appendChild(cont);
    }
    
    this.selectQuery = function(i, el) {
        closeDataWindow(el);
        let item = listQuerys[i];
        this.cb.setFieldsSource_1({id:item.id_query,name:item.name_query,fields:item.fields_result,param:item.param_query});
    }
}
