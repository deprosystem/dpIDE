function uxScrollPanel() {
    this.param = {name: "ScrollPanel", viewBaseId: "scroll_panel", onlyOne: true};
    this.hiddenHandlers = ",Autch,Data,";
    this.getParamComp = function () {
        return this.param;
    }
    
    this.getSpecialView = function () {
        return docNavigator;
    }
    
    this.getEditParam = function () {
        return uxModelView("createViewForPanelV", "");
    }
    
    this.addComponent = function (componId, viewId) {
        let tt = this.param.name;
        let typeViewScroll = {type:"ItemScroll",typeFull:{name:"ItemScroll",typeBlock:2},typeUxUi: "ui",gravLayout:{h:4,v:4},componParam:{st_1:"",type:7},
            gravity:{h:4,v:4},width: -1,height:-2,children:[]};
//            gravity:{h:4,v:4},width: -1,height:-2,children:[],hideParam:62};
        let typeView = {type:"RelativeLayout",typeFull:{name:"RelativeLayout",typeBlock:0},typeUxUi: "ui",gravLayout:{h:4,v:4},gravity:{h:4,v:4},
            width: -1,height:-1,children:[typeViewScroll],hideParam:63};
        currentComponent = {type: tt, componId: componId, viewId:viewId, typeUxUi: "ux", componParam:{type:9},
                typeFull: {name: tt, typeBlock: 0}, gravLayout: {h: 3, v: 3}, gravity: {h:4, v:4}, parent:{android:{itemNav:{},parent:null}}, 
            width:-1,height:-1,itemNav:{},viewElement: null,children:[typeView]};
        currentComponentDescr = {type:tt, componId: componId, model:{method:0,data:[[]]},view:{viewId: viewId},navigator:[]};
    }
    
    this.setValue = function(componParam) {
        setValueModel(componParam);
//        setValueListPanel(componParam);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.xbdch0c6d3nw";
    }
    
    this.isValid = function(compD) {
        let err = {text:"",error:0};
        
        return err;
    }
}
