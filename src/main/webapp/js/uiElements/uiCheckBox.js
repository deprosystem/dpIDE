function uiCheckBox() {
    let metaCheckBox = [
        {title:"Text",len:150,type:"Label"},
        {name: "color_1", title:"Color",type:"Color"},
        {name: "int_1", title:"Bold",litera:"B",type:"Litera"},
        {name: "int_2", title:"Italic",litera:"I",italic:true,type:"Litera"},
        {name: "bool_1", title:"Text left",type:"Check"},
        {name: "int_3", title:"Size",type:"SelBlock",min:6,max:52,step:1,value:"8,10,12,14,18,20,22,24,28,32"},
        {type:"Line"},
        {title:"Colors",len:150,type:"Label",fontS:10},
        {name: "color_2", title:"Off",type:"Color",br:true},
        {name: "color_3", title:"On",type:"Color"},
        {type:"Line"},
        {title:"Gravity",len:150,type:"Label",fontS:10},
        {name: "st_2", title:"Vertical",type:"Select",value:"top,center,bottom",br:true},
        {name: "st_3", title:"Horizontal",type:"Select",value:"left,center,right"}
    ]
    
    let meta = [
        {name: "st_1", title:"Text",rows:2,type:"Textarea",br:true},
        {name: "int_1", title:"Style switch",type:"Choose",what:"switch",meta:metaCheckBox,br:true},
        {name: "st_3", title:"Checked",type:"Select",value:"Off,On"},
        {name: "bool_1", title:"Enabled",type:"Check"}
    ];
    
    let wCheck = +(24 * MEASURE).toFixed(1);
    let wCheck_2 = wCheck * 2 + 5;
    
    this.data;
            
    this.setElementUI = function(p, newEl, parent) {
        newEl.appendChild(this.createDivElement(p));
    }
    
    this.newElementUI = function(p) {
        return this.createDivElement(p);
    }
    
    this.setContent = function(p) {
        if (this.data == null) {
            this.data = p;
        }
        contentAttributes.innerHTML = "";
        let dd = new EditForm(meta, p, contentAttributes, null, this);
    }
    
    this.cbEdit = function(fieldName) {
        viewCompon();
    }
    
    this.viewElementUI = function(p, el) {
        el.innerHTML = "";
        elSw = this.createDivElement(p);
        el.appendChild(elSw);
        if (p.height == WRAP) {
            let pc = this.getParamCheck(p.int_1);
            if (pc == null) return;
            let hh = wCheck;
            el.style.height = hh + "px";
            let txt = elSw.querySelector(".text");
            let hT = txt.getBoundingClientRect().height;
            if (hh < hT) {
                hh = hT;
                el.style.height = hh + "px";
            }
        }
        if (p.width == WRAP) {
            let txt = elSw.querySelector(".text");
            let wT = txt.getBoundingClientRect().width;
            el.style.width = (wCheck + 6 + wT) + "px";
            el.style.right = "";
        }
    }
    
    this.createDivElement = function(p) {
        if (p.componParam == null) {
            p.componParam = {type:22,int_1:ListStyleCheck[activeStyleCheckPos].id,color_2:3,color_3:0};
            
        }
        let pc = this.getParamCheck(p.componParam.int_1);
        if (pc == null) return;
        if (p.st_3 == null || p.st_3 == "") {
            p.st_3 = "Off";
        }
        if (p.bool_1 == null) {
            p.bool_1 = true;
        }
        if (p.int_1 == null) {
            p.int_1 = ListStyleCheck[activeStyleCheckPos].id;
        }
        let grav = pc.st_2;
        if (grav == "top") {
            grav = "start";
        } else if (grav == "bottom") {
            grav = "end";
        }
        let grav_h = pc.st_3;
        if (grav_h == null) {
            grav_h = "left";
        }
        if (grav_h == "left") {
            grav_h = "start";
        } else if (grav_h == "right") {
            grav_h = "end";
        }
        let container = newDOMelement('<div class="_switch" style="position: absolute;left:0;top:0;right:0;bottom:0"></div>');
        let containerTxt, containerCheck;

        if (pc.bool_1 != null && pc.bool_1) {
            containerTxt = newDOMelement('<div style="position: absolute;left:0;top:0;right:' + (wCheck + 6) + 'px;bottom:0;display:flex;align-items:' + grav 
                    + ';justify-content:' + grav_h + '"></div>');
            containerCheck = newDOMelement('<div style="position: absolute;right:3px;top:0;width:' + wCheck + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        } else {
            containerTxt = newDOMelement('<div style="position: absolute;right:0;top:0;left:' + (wCheck + 6) + 'px;bottom:0;display:flex;align-items:' + grav 
                    + ';justify-content:' + grav_h + '"></div>');
            containerCheck = newDOMelement('<div style="position: absolute;left:3px;top:0;width:' + wCheck + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        }

        container.appendChild(containerTxt);
        container.appendChild(containerCheck);
        let vv = "";
        if (p.st_1 != null) {
            vv = p.st_1;
        }
        let bold = "";
        if (pc.int_1 == 1) {
            bold = "font-weight:bold;";
        }
        let it = "";
        if (pc.int_2 == 1) {
            it = "font-style:italic;";
        }
        let fs = "font-size:" + (14 * MEASURE) + "px;";
        if (pc.int_3 != null && pc.int_3 != "") {
            fs = "font-size:" + (pc.int_3 * MEASURE) + "px;";
        }
        let txt = newDOMelement('<div class="text" style="' + bold + it + fs + 'color:' + findColorByIndex(pc.color_1) + '">' + vv + '</div>');
        containerTxt.appendChild(txt);

        let w4 = wCheck - 4;
        let checkV;
        if (p.st_3 != null && p.st_3 == "Off") {
            checkV = newDOMelement('<div style="width:' + w4 + 'px;height:' + w4 + 'px;border-radius:2px;border:2px solid ' + findColorByIndex(pc.color_2) + '"></div>');
        } else {
            checkV = newDOMelement('<div style="width:' + wCheck + 'px;height:' + wCheck + 'px;border-radius:2px;background-color:' + findColorByIndex(pc.color_3) + '"></div>');
            checkV.append(newDOMelement('<IMG SRC="img/check_icon.png" style="width:12px;height:12px;margin-top:1px;margin-left:1px">'));
        }
        containerCheck.append(checkV);
        return container;
    }
    
    
    
    
   this.clickChoose = function(el, met) {
        new WindListView(this, met, 250, 500, 40, -400, "Switch styles");
    }
    
    this.viewOneContent = function(res, item) {
        isStylesCheckChange = true;
        let pc = item.param;
        
        let grav = pc.st_2;
        if (grav == "top") {
            grav = "start";
        } else if (grav == "bottom") {
            grav = "end";
        }
        
        let grav_h = pc.st_3;
        if (grav_h == "left") {
            grav_h = "start";
        } else if (grav_h == "right") {
            grav_h = "end";
        }

        let container = newDOMelement('<div class="_check" style="position: absolute;left:3px;top:0;right:3px;bottom:0"></div>');
        let containerTxt, containerCheck;
        if (pc.bool_1 != null && pc.bool_1) {
            containerTxt = newDOMelement('<div style="position: absolute;left:0;top:0;right:' + (wCheck_2 + 6) + 'px;height:100%;display:flex;align-items:' + grav 
                    + ';justify-content:' + grav_h + '"></div>');
            containerCheck = newDOMelement('<div style="position: absolute;right:3px;top:0;width:' + wCheck_2 + 'px;height:100%;display:flex;align-items:' + grav + '"></div>');
        } else {
            containerTxt = newDOMelement('<div style="position: absolute;right:0;top:0;left:' + (wCheck_2 + 6) + 'px;height:100%;display:flex;align-items:' + grav 
                    + ';justify-content:' + grav_h + '"></div>');
            containerCheck = newDOMelement('<div style="position: absolute;left:3px;top:0;width:' + wCheck_2 + 'px;height:100%;display:flex;align-items:' + grav + '"></div>');
        }

        container.appendChild(containerTxt);
        container.appendChild(containerCheck);
        let bold = "";
        if (pc.int_1 == 1) {
            bold = "font-weight:bold;";
        }
        let it = "";
        if (pc.int_2 == 1) {
            it = "font-style:italic;";
        }
        let fs = "font-size:" + (14 * MEASURE) + "px;";
        if (pc.int_3 != null && pc.int_3 != "") {
            fs = "font-size:" + (pc.int_3 * MEASURE) + "px;";
        }
        let txt = newDOMelement('<div class="text" style="' + bold + it + fs + 'color:' + findColorByIndex(pc.color_1) + '">' + "Check_" + item.id + '</div>');
        containerTxt.appendChild(txt);

        let w4 = wCheck - 4;
        
        let checkOff = newDOMelement('<div style="width:' + w4 + 'px;height:' + w4 + 'px;float:left;border-radius:2px;border:2px solid ' + findColorByIndex(pc.color_2) + '"></div>');
        let checkOn = newDOMelement('<div style="width:' + wCheck + 'px;height:' + wCheck + 'px;float:left;border-radius:2px;margin-left:5px;background-color:' + findColorByIndex(pc.color_3) + '"></div>');
        checkOn.append(newDOMelement('<IMG SRC="img/check_icon.png" style="width:12px;height:12px;margin-top:1px;margin-left:1px">'));
        
        containerCheck.append(checkOff);
        containerCheck.append(checkOn);

        res.append(container);
    }
    
    this.chooseEditForm = function() {
        return formWind(370, 500, 100, -20, "Switch style options", null, null, null, null, "");
    }

    this.getList = function() {
        return ListStyleCheck;
    }

    this.createOneItem = function(i) {
        let item = ListStyleCheck[i];
        let res = newDOMelement('<div style="width:100%;height:40px;border-bottom:1px solid #1dace9;position:relative;"></div>');
        this.viewOneContent(res, item);
        return res;
    }
    
    this.addItem = function(ch) {
        let item = JSON.parse(JSON.stringify(ListStyleCheck[activeStyleCheckPos]));
        item.id = ListStyleCheck.length;
        ListStyleCheck.push(item);
        isStylesCheckChange = true;
        ch[activeStyleCheckPos].style.backgroundColor = "";
        activeStyleCheckPos = ListStyleCheck.length - 1;
        let itemV = this.createOneItem(activeStyleCheckPos);
        itemV.style.backgroundColor = "#f6faff";
        return itemV;
    }
    
    this.getSelectItemPos = function() {
        return activeStyleCheckPos;
    }
    
    this.setSelectItemPos = function(pos) {
        activeStyleCheckPos = pos;
    }
    
    this.getNewItem = function() {
        let item = JSON.parse(JSON.stringify(ListStyleCheck[activeStyleCheckPos]));
        item.id = ListStyleCheck.length;
        isStylesCheckChange = true;
        return item;
    }
    
    this.clickItem = function(ch, pos) {
        ch[activeStyleCheckPos].style.backgroundColor = "";
        activeStyleCheckPos = pos;
        ch[activeStyleCheckPos].style.backgroundColor = "#f6faff";
    }
    
    this.setChooseResult = function(fieldName) {
        let item = ListStyleCheck[activeStyleCheckPos]
        this.data[fieldName] = item.id;
        this.data.componParam.int_1 = item.id;
        viewCompon();
    }
    
    
    
    
    this.getParamCheck = function(id) {
        let ik = ListStyleCheck.length;
        for (let i = 0; i < ik; i++) {
            let item = ListStyleCheck[i];
            if (item.id == id) {
                return item.param;
            }
        }
        return null;
    }
}

