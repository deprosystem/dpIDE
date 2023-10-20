function uiSwitch() {
    
    let metaSwitch = [
        {name: "", title:"Text",len:150,type:"Label"},
        {name: "color_1", title:"Color",type:"Color"},
        {name: "int_1", title:"Bold",litera:"B",type:"Litera"},
        {name: "int_2", title:"Italic",litera:"I",italic:true,type:"Litera"},
        {name: "int_3", title:"Size",type:"SelBlock",min:6,max:52,step:1,value:"8,10,12,14,18,20,22,24,28,32"},
        {type:"Line"},
        {title:"Track options",len:150,type:"Label"},
        {title:"Colors",len:150,type:"Label",fontS:10},
        {name: "color_2", title:"Off",type:"Color",br:true},
        {name: "color_3", title:"On",type:"Color"},
        {name: "color_4", title:"Unavailable",type:"Color"},
        {name: "int_4", title:"Height",type:"SelBlock",min:1,max:40,step:1,value:"8,10,12,14,18,20,22,24,28,30,36"},
        {name: "st_2", title:"Gravity",type:"Select",value:"top,center,bottom",br:true},
        {type:"Line"},
        {title:"Thumb options",len:150,type:"Label"},
        {title:"Colors",len:150,type:"Label",fontS:10},
        {name: "color_5", title:"Off",type:"Color",br:true},
        {name: "color_6", title:"On",type:"Color"},
        {name: "color_7", title:"Unavailable",type:"Color"},
        {name: "int_5", title:"Diameter",type:"SelBlock",min:1,max:40,step:1,value:"8,10,12,14,18,20,22,24,28,30,36"}
    ]
    
    let meta = [
        {name: "st_1", title:"Value",rows:2,type:"Textarea",br:true},
        {name: "int_1", title:"Style switch",type:"Choose",what:"switch",meta:metaSwitch,br:true},
        {name: "st_3", title:"Checked",type:"Select",value:"Off,On"},
        {name: "bool_1", title:"Enabled",type:"Check"}
    ];
    
    let wTrack = +(65 * MEASURE).toFixed(1);
    
    this.data;
            
    this.setElementUI = function(p, newEl, parent) {
        newEl.appendChild(this.createDivSwitch(p));
    }
    
    this.newElementUI = function(p) {
        return this.createDivSwitch(p);
    }
    
    this.setContent = function(p) {
        if (this.data == null) {
            this.data = p;
        }
        contentAttributes.innerHTML = "";
        let dd = new EditForm(meta, p, contentAttributes, null, this);
    }
    
    this.cbEdit = function(fieldName) {
        if (fieldName == "int_1") {
            let vv = this.data[fieldName];
            this.data.componParam.int_1 = vv;
            viewCompon();
        } else {
            viewCompon();
        }
    }
    
    this.viewElementUI = function(p, el) {
        el.innerHTML = "";
        elSw = this.createDivSwitch(p);
        el.appendChild(elSw);
        if (p.height == WRAP) {
            let pc = this.getParamSwitch(p.componParam.int_1);
            if (pc == null) return;
            let hh = pc.int_4;
            if (hh < pc.int_5) {
                hh = pc.int_5;
            }
            if (hh < pc.int_3) {
                hh = pc.int_3;
            }
            el.style.height = (hh * MEASURE) + "px";
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
            el.style.width = (wTrack + wT) + "px";
        }
    }
    
    this.createDivSwitch = function(p) {
        if (p.componParam == null) {
            p.componParam = {type:21,int_1:ListStyleSpec[activeStyleSpecPos].id};
        }
        let pc = this.getParamSwitch(p.componParam.int_1);
        if (pc == null) return;
        if (p.st_3 == null || p.st_3 == "") {
            p.st_3 = "Off";
        }
        if (p.bool_1 == null) {
            p.bool_1 = true;
        }
        if (p.int_1 == null) {
            p.int_1 = ListStyleSpec[activeStyleSpecPos].id;
//            isStylesSpecChange = true;
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
        let switchCont = newDOMelement('<div class="_switch" style="position: absolute;left:0;top:0;right:0;bottom:0"></div>');
        let containerTxt = newDOMelement('<div style="position: absolute;left:0;top:0;right:' + wTrack + 'px;bottom:0;display:flex;align-items:' + grav 
                    + ';justify-content:' + grav_h + '"></div>');
        switchCont.appendChild(containerTxt);
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
        let hTr = pc.int_4 * MEASURE;
        let hThumb = pc.int_5 * MEASURE;
        let marg = 0;
        let margHoriz = 0;
        if (hThumb < hTr) {
            marg = (hTr - hThumb) / 2;
            margHoriz = marg;
        } else {
            marg = (hThumb - hTr) / 2;
        }
        let right = wTrack - hThumb - margHoriz;
        grav = pc.st_2;
        let top_bott = "";
        if (grav == "top") {
            grav = "start";
            top_bott = "margin-top:" + marg + "px;";
        } else if (grav == "bottom") {
            grav = "end";
            top_bott = "margin-bottom:" + marg + "px;";
        }
        let trackTopBoot = "", thumbTopBoot = "";
        if (hThumb < hTr) {
            thumbTopBoot = top_bott;
        } else {
            trackTopBoot = top_bott;
        }
        let showTr = findColorByIndex(pc.color_2);
        let showThumb = findColorByIndex(pc.color_5);
        if (p.st_3 == "On") {
            showTr = findColorByIndex(pc.color_3);
            showThumb = findColorByIndex(pc.color_6);
            right = margHoriz;
        } 
        if ( ! p.bool_1) {
            showTr = findColorByIndex(pc.color_4);
            showThumb = findColorByIndex(pc.color_7);
        }
        let contTrack = newDOMelement('<div style="position: absolute;right:0;top:0;width:' + wTrack + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        switchCont.appendChild(contTrack);
        let track = newDOMelement('<div style="width:' + wTrack + 'px;height:' + hTr + 'px;background-color:' + showTr
                +';border-radius:' + (hTr / 2) + 'px;' + trackTopBoot + '"></div>');
        let contThumb = newDOMelement('<div style="position: absolute;right:' + right + 'px;top:0;width:' + hThumb 
                + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        switchCont.appendChild(contThumb);
        let thumb = newDOMelement('<div style="float:left;width:' + hThumb + 'px;height:' + hThumb + 'px;background-color:' + showThumb 
                +';border-radius:' + (hThumb / 2) + 'px;' + thumbTopBoot + '"></div>');
        contThumb.appendChild(thumb);
        contTrack.appendChild(track);
        return switchCont;
    }

    this.clickChoose = function(el, met) {
        new WindListView(this, met, 250, 500, 40, -400, "Switch styles");
    }
    
    this.viewOneContent = function(res, item) {
        isStylesSpecChange = true;
        let pc = item.param;
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
        let txt = newDOMelement('<div class="text" style="' + bold + it + fs + 'color:' + findColorByIndex(pc.color_1) + '">' + "Switch_" + item.id + '</div>');
        res.append(txt);
        let hTr = pc.int_4 * MEASURE;
        let hThumb = pc.int_5 * MEASURE;
        let marg = 0;
        let margHoriz = 0;
        if (hThumb < hTr) {
            marg = (hTr - hThumb) / 2;
            margHoriz = marg;
        } else {
            marg = (hThumb - hTr) / 2;
        }
        let wTrack = 65 * MEASURE;
        let right = wTrack - hThumb - margHoriz;
//        let grav = "center";
        let trackTopBoot = "", thumbTopBoot = "";
        let grav = pc.st_2;
        let top_bott = "";
        if (grav == "top") {
            grav = "start";
            top_bott = "margin-top:" + marg + "px;";
        } else if (grav == "bottom") {
            grav = "end";
            top_bott = "margin-bottom:" + marg + "px;";
        }
        if (hThumb < hTr) {
            thumbTopBoot = top_bott;
        } else {
            trackTopBoot = top_bott;
        }
        let scOff = newDOMelement('<div style="position:relative;height:100%;margin-left:50px;"></div>');
        res.append(scOff);
        let showTr = findColorByIndex(pc.color_2);
        let showThumb = findColorByIndex(pc.color_5);
        let contTrack = newDOMelement('<div style="position: absolute;right:0;top:0;width:' + wTrack + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        scOff.appendChild(contTrack);
        let track = newDOMelement('<div style="width:' + wTrack + 'px;height:' + hTr + 'px;background-color:' + showTr
                +';border-radius:' + (hTr / 2) + 'px;' + trackTopBoot + '"></div>');
        let contThumb = newDOMelement('<div style="position: absolute;right:' + right + 'px;top:0;width:' + hThumb 
                + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        scOff.appendChild(contThumb);
        let thumb = newDOMelement('<div style="float:left;width:' + hThumb + 'px;height:' + hThumb + 'px;background-color:' + showThumb 
                +';border-radius:' + (hThumb / 2) + 'px;' + thumbTopBoot + '"></div>');
        contThumb.appendChild(thumb);
        contTrack.appendChild(track);
        
        let scOn = newDOMelement('<div style="position:relative;height:100%;margin-left:50px;"></div>');
        res.append(scOn);
        showTr = findColorByIndex(pc.color_3);
        showThumb = findColorByIndex(pc.color_6);
        right = margHoriz;
        contTrack = newDOMelement('<div style="position: absolute;right:0;top:0;width:' + wTrack + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        scOn.appendChild(contTrack);
        track = newDOMelement('<div style="width:' + wTrack + 'px;height:' + hTr + 'px;background-color:' + showTr
                +';border-radius:' + (hTr / 2) + 'px;' + trackTopBoot + '"></div>');
        contThumb = newDOMelement('<div style="position: absolute;right:' + right + 'px;top:0;width:' + hThumb 
                + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        scOn.appendChild(contThumb);
        thumb = newDOMelement('<div style="float:left;width:' + hThumb + 'px;height:' + hThumb + 'px;background-color:' + showThumb 
                +';border-radius:' + (hThumb / 2) + 'px;' + thumbTopBoot + '"></div>');
        contThumb.appendChild(thumb);
        contTrack.appendChild(track);
        
        let scEnabled = newDOMelement('<div style="position:relative;height:100%;margin-left:50px;"></div>');
        res.append(scEnabled);
        showTr = findColorByIndex(pc.color_4);
        showThumb = findColorByIndex(pc.color_7);
        right = wTrack - hThumb - margHoriz;
        contTrack = newDOMelement('<div style="position: absolute;right:0;top:0;width:' + wTrack + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        scEnabled.appendChild(contTrack);
        track = newDOMelement('<div style="width:' + wTrack + 'px;height:' + hTr + 'px;background-color:' + showTr
                +';border-radius:' + (hTr / 2) + 'px;' + trackTopBoot + '"></div>');
        contThumb = newDOMelement('<div style="position: absolute;right:' + right + 'px;top:0;width:' + hThumb 
                + 'px;bottom:0;display:flex;align-items:' + grav + '"></div>');
        scEnabled.appendChild(contThumb);
        thumb = newDOMelement('<div style="float:left;width:' + hThumb + 'px;height:' + hThumb + 'px;background-color:' + showThumb 
                +';border-radius:' + (hThumb / 2) + 'px;' + thumbTopBoot + '"></div>');
        contThumb.appendChild(thumb);
        contTrack.appendChild(track);
    }
    
    this.chooseEditForm = function() {
        return formWind(370, 500, 100, -20, "Switch style options", null, null, null, null, "");
    }

    this.getList = function() {
        return ListStyleSpec;
    }

    this.createOneItem = function(i) {
        let item = ListStyleSpec[i];
        let res = newDOMelement('<div style="width:100%;height:40px;border-bottom:1px solid #1dace9;display:flex;align-items:center;"></div>');
        this.viewOneContent(res, item);
        return res;
    }
    
    this.addItem = function(ch) {
        let item = JSON.parse(JSON.stringify(ListStyleSpec[activeStyleSpecPos]));
        item.id = ListStyleSpec.length;
        ListStyleSpec.push(item);
        isStylesSpecChange = true;
        ch[activeStyleSpecPos].style.backgroundColor = "";
        activeStyleSpecPos = ListStyleSpec.length - 1;
        let itemV = this.createOneItem(activeStyleSpecPos);
        itemV.style.backgroundColor = "#f6faff";
        return itemV;
    }
    
    this.getSelectItemPos = function() {
        return activeStyleSpecPos;
    }
    
    this.setSelectItemPos = function(pos) {
        activeStyleSpecPos = pos;
    }
    
    this.getNewItem = function() {
        let item = JSON.parse(JSON.stringify(ListStyleSpec[activeStyleSpecPos]));
        item.id = ListStyleSpec.length;
        isStylesSpecChange = true;
        return item;
    }
    
    this.clickItem = function(ch, pos) {
        ch[activeStyleSpecPos].style.backgroundColor = "";
        activeStyleSpecPos = pos;
        ch[activeStyleSpecPos].style.backgroundColor = "#f6faff";
    }
    
    this.setChooseResult = function(fieldName) {
        let item = ListStyleSpec[activeStyleSpecPos]
        this.data[fieldName] = item.id;
        this.data.componParam.int_1 = item.id;
        viewCompon();
    }
    
    this.getParamSwitch = function(id) {
        let ik = ListStyleSpec.length;
        for (let i = 0; i < ik; i++) {
            let item = ListStyleSpec[i];
            if (item.id == id) {
                return item.param;
            }
        }
        return null;
    }
}


