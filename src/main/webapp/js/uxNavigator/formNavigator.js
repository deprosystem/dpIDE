function FormNavigator() {
'use strict';

    this.contentD;
    this.controll;
    this.paramView;
    this.viewPort;
    this.dataHand;
    this.wind;
    this.hControl = 40;
    this.wContent = 440;
    this.wWind = 700;
    let wNum = 24;
    let wElem = 150;
    let wType = 135;
    let wEvent = 100;
    let hLine = 20;
//    this.panelFon;
    this.after;
    this.dataView;
    this.indSelGroupHand;
    this.listHandView;
    this.contentGroup;
    this.selElementHand;
    this.selDataHand;
    this.hiddenHandlers;
    this.isScreen;
    this.menuSelect;
    this.cb;
    this.dataEdit;
    
    this.init = function(dat, compon, aft, isScreen, menuSelect, cb, offset) {
        if (dat == null) return;
        this.after = aft;
        this.cb = cb;
        this.isScreen = isScreen;
        if (compon != null) {
            let uxFunction = null;
            try {
                uxFunction = eval("new ux" + compon.type + "();");
            } catch(e) { }
            if (uxFunction != null) {
                this.hiddenHandlers = uxFunction.hiddenHandlers;
            }
        }
        
        if (this.isScreen == null) {
            this.hiddenHandlers += "Push,";
        }
        if (aft) {
            this.hiddenHandlers = hiddenAfterHandlers;
        }
        this.menuSelect = menuSelect;
        if (menuSelect != null) {
            this.wContent -= wEvent;
            this.wWind -= wEvent;
        }
        this.dataHand = dat;
        this.selectRow = -1;
        let ll, tt;
        if (this.after) {
            ll = 600;
            tt = 50;
        } else {
            ll = 550;
            tt = 40;
        }
        if (offset != null) {
            tt += offset;
            ll += offset;
        }
        this.contentD = formWind(this.wWind, 400, tt, ll, "Navigator", null, null, "", null, "");
        this.contentD.style.bottom = (this.hControl - 1) + "px";
        this.contentD.style.width = this.wContent + "px";
        this.wind = this.contentD.closest(".dataWindow");
        this.paramView = newDOMelement('<div style="position:absolute;top:' + 49 + 'px;right:0;bottom:' + (this.hControl - 1) + 'px;left:' + (this.wContent + 1) + 'px;border-left:1px solid #1dace9"></div>');
        this.controll = createFooter(this.hControl);
        let buttonAdd = createButtonBlue("Add");
        buttonAdd.style.marginTop = "5px";
        this.controll.appendChild(buttonAdd);
        let buttonOk = createButtonWeite('Ok', 50);
        buttonOk.style.marginTop = "5px";
        this.controll.appendChild(buttonOk);
        buttonOk.addEventListener('click', () => {
            this.closeWindows();
        });
        let clos = this.wind.querySelector(".titleWindClose");
        clos.addEventListener('click', () => {
            this.removPanel();
        });
        this.wind.appendChild(this.paramView);
        this.wind.appendChild(this.controll);
        this.viewPort = formViewScrolY(this.contentD);
        this.dataView = this.viewPort.querySelector(".viewData");
        this.dataView.appendChild(this.titleHandView());
        buttonAdd.addEventListener('click', () => {
            this.addHand(dat, this.dataView);
        });

        let ik = dat.length;
        if (ik > 0) {
            for (let i = 0; i < ik; i++) {
                this.dataView.append(this.oneHandView(i, this.dataHand[i]));
            }
            this.selHand(0, this.dataView);
        } 
        this.viewPort.scroll_y.resize();
    };
    
    this.closeWindows = function() {
        if ( ! this.after) {
            saveNavigator(this.dataHand);
        }
        if (this.cb != null) {
            if (this.cb.cbNavigator != null) {
                this.cb.cbNavigator();
            } else {
                this.cb();
            }
        }
        closeDataWindow(this.controll);
    };;
    
    this.stopProp = function() {
        event.stopPropagation();
    }
    
    this.removPanel = function() {
        if ( ! this.after) {
            saveNavigator(this.dataHand);
        }
    };
    
    this.addHand = function(dat, dataView) {
        let item = {viewId:0,handler:"start"};
        dat.push(item);
        dataView.appendChild(this.oneHandView(dat.length - 1, item));
        this.viewPort.scroll_y.resize();
        this.selHand(dat.length - 1, dataView);
    }

    this.oneHandView = function(i, item) {
        let typeEv = "";
        if (this.menuSelect == null) {
             typeEv = '<div class="typeEvent" style="width:' + wEvent + 'px;height:100%;border-right:1px solid #1dace9;float:left"></div>';
        }
        let vv = '<div style="height:' + hLine + 'px;width:100%;border-bottom:1px solid #1dace9">' 
                +'<div style="width:' + wNum + 'px;height:100%;text-align:right;border-right:1px solid #1dace9;float:left">' 
                    + '<div style="margin-top:2px;margin-right:2px">' + i + '</div>' 
                + '</div>'
                +'<div class="elId" style="width:' + wElem + 'px;height:100%;border-right:1px solid #1dace9;float:left"></div>'
                +typeEv
                +'<div class="elType" style="width:' + wType + 'px;height:100%;border-right:1px solid #1dace9;float:left"></div>'
                +'<img class="delRec" style="margin-top:5px;margin-left:5px;float:left;cursor:pointer" src="img/del_red.png"/>'
            + '</div';
        let hh = newDOMelement(vv);
        let elId = hh.querySelector(".elId");
        let idHand;
        if (this.menuSelect == null) {
            idHand = this.setSelectIdHandl({name:"viewId",len:wElem}, item);
        } else {
            let stSel = editCreateSelect(this.menuSelect.split(','), item.viewId);
            idHand = newDOMelement(stSel);
            idHand.className = "";
            idHand.style.width = wElem + "px";
            idHand.style.border = "none";
            idHand.style.backgroundColor = "#0000";
            let selEl = idHand.options[idHand.selectedIndex].value;
            if (item.viewId != selEl)  {
                item.viewId = selEl;
            }
        }
//        idHand.className = "sel_id";
        elId.appendChild(idHand);
        
        if (this.menuSelect == null) {
            let elEvent = hh.querySelector(".typeEvent");
            let typeEvent = this.setSelectEvent({name:"event",len:wEvent}, item);
            typeEvent.className = "event";
            elEvent.appendChild(typeEvent);
            let tagSelIdEvent = hh.querySelector(".event");
            tagSelIdEvent.addEventListener('change', () => {
                this.changeEvent(i, tagSelIdEvent);
            }, false);
        }
        let elType = hh.querySelector(".elType");
        let typeHand = this.setSelectHand({name:"handler"}, item);
        typeHand.addEventListener('click', () => {
            this.selectHand(i, typeHand);
        }, false);
        elType.appendChild(typeHand);
        hh.addEventListener('click', () => {
            this.selHand(i, hh);
        });
        
        idHand.addEventListener('change', () => {
            this.changeIdHand(i, idHand);
        }, false);
        let del = hh.querySelector(".delRec");
        del.addEventListener('click', () => {
            this.delRecord(i);
        }, false);
        return hh;
    }
    
    this.selectHand = function(ind, el) {
//        let maxW = 250;
        let hand = this.dataHand[ind].handler;
        this.selDataHand = ind;
        let wPopUp = 230;
        let wContGr = 90;
        let wContHand = wPopUp - wContGr - 4;
        let ww = formPopUp(el, wPopUp, 250);
        this.selElementHand = el;
        this.contentGroup = newDOMelement('<div style="position:absolute;width:' + wContGr + 'px;left:4px;top:4px;bottom:4px;border-right:1px solid #1dace9"></div>');
        ww.append(this.contentGroup);
        let contentHand = newDOMelement('<div style="position:absolute;width:' + wContHand + 'px;right:0;top:4px;bottom:4px;"></div>');
        ww.append(this.contentGroup);
        ww.append(contentHand);
        let scrollHand = formViewScrolY(contentHand, true);
        this.listHandView = scrollHand.querySelector(".viewData");
        let ik = handlerGroups.length;
        let iSel = 0;
        this.indSelGroupHand = -1;
        for (let i = 0; i < ik; i++) {
            let nameGr = handlerGroups[i].group;
            let it = newDOMelement('<div style="height:20px;margin-right:4px;"></div>');
            let nn = newDOMelement('<div style="margin-top:3px;cursor:pointer;float:left;width:100%;">' + nameGr + '</div>');
            it.append(nn);
            if (this.hiddenHandlers == null || this.hiddenHandlers.indexOf(nameGr) == -1) {
                it.addEventListener('click', () => {
                    this.clickGroup(i);
                }, false);
                if (("," + handlerGroups[i].items + ",").indexOf(hand) > -1) {
                    it.style.backgroundColor = "#eef";
                    iSel = i;
                }
            } else {
                nn.style.color = "#999";
            }
            this.contentGroup.append(it);
        }
        this.clickGroup(iSel);
    };
    
    this.clickGroup = function(ind) {
        if (this.indSelGroupHand == ind) return;
        let ch = this.contentGroup.children;
        if (this.indSelGroupHand > -1) {
            ch[this.indSelGroupHand].style.backgroundColor = "";
        }
        this.indSelGroupHand = ind;
        ch[this.indSelGroupHand].style.backgroundColor = "#eef";
        let listH = handlerGroups[ind].items.split(",");
        let ik = listH.length;
        this.listHandView.innerHTML = "";
        for (let i = 0; i < ik; i++) {
            let nameGr = listH[i];
            let it = newDOMelement('<div style="height:20px;margin-left:4px;"></div>');
            let nn = newDOMelement('<div style="margin-top:3px;cursor:pointer;float:left;width:100%;">' + nameGr + '</div>');
            it.append(nn);
            if (this.hiddenHandlers == null || this.hiddenHandlers.indexOf(',' + nameGr + ',') == -1) {
                it.addEventListener('click', () => {
                    this.clickHand(listH[i]);
                }, false);
            } else {
                nn.style.color = "#999";
            }
            this.listHandView.append(it);
        }
    };
    
    this.clickHand = function(st) {
        let txtHand = this.selElementHand.querySelector("div");
        txtHand.innerHTML = st;
        this.dataHand[this.selDataHand].handler = st;
        this.dataHand[this.selDataHand].param = null;
        this.selHandFull(this.selDataHand);
        closePopUp(this.listHandView);
    };
    
    this.setSelectHand = function(met, item) {
        let vv;
        if (item != null) {
            let nameV = met.name;
            vv = item[nameV];
            if (vv == null) {
                vv = "start";
            }
        }
        let cont = newDOMelement('<div style="width:100%;height:100%;cursor:pointer"></div>');
        let valTxt = newDOMelement('<div style="float:left;margin-left:4px;margin-top:1px;font-size:13px">' + vv + '</div>');
        cont.append(valTxt);
        cont.append(newDOMelement('<img style="margin-right:5px;float:right;width:' + hLine + 'px;height:' + hLine + 'px" src="img/chevron_down.png"/>'));
        return cont;
    };
 
    this.delRecord = function(i) {
        event.stopPropagation();
        this.dataHand.splice(i, 1);
        let ik = this.dataHand.length;
        this.dataView.innerHTML = "";
        this.dataView.appendChild(this.titleHandView());
        if (ik > 0) {
            for (let j = 0; j < ik; j++) {
                this.dataView.appendChild(this.oneHandView(j, this.dataHand[j]));
            }
        } else {
            this.paramView.innerHTML = "";
        }
        this.selectRow = -1;
        if (i < ik) {
            this.selHand(i);
        } else {
            if (ik > 0)  {
                this.selHand(ik - 1);
            }
        }
    };
    
    this.selHand = function(i) {
        if (this.selectRow == i + 1) return;
        this.selHandFull(i);
    };
    
    this.selHandFull = function(i) {
        let ch = this.dataView.children;
        let rowI;
        if (this.selectRow > -1) {
            rowI = ch[this.selectRow];
            rowI.style.backgroundColor = "";
        }
        this.selectRow = i + 1;
        rowI = ch[this.selectRow];
        rowI.style.backgroundColor = "#eef";
        let hand = this.dataHand[i].handler;
        let jk = listMetaHandlers.length;
        let selJ = -1;
        for (let j = 0; j < jk; j++) {
            if (listMetaHandlers[j].handl == hand) {
                selJ = j;
                break;
            }
        }
        if (selJ > -1) {
            this.paramView.innerHTML = "";
            this.dataEdit = this.dataHand[i];
//console.log("this.dataEdit="+JSON.stringify(this.dataEdit));
            this.editF = new EditForm(listMetaHandlers[selJ].meta, this.dataEdit, this.paramView, this.after, this, null, null, this.isScreen);
        } else {
            this.paramView.innerHTML = "";
        }
    };
    
    this.changeIdHand = function(i, el) {
        let val = el.options[el.selectedIndex].value;
        this.dataHand[i].viewId = val;
    };
    
    this.changeEvent = function(i, el) {
        let val = el.options[el.selectedIndex].value;
        this.dataHand[i].event = val;
    };
    
    this.titleHandView = function() {
        let typeEv = "";
        if (this.menuSelect == null) {
             typeEv = '<div style="width:' + wEvent + 'px;height:100%;text-align:center;border-right:1px solid #1dace9;float:left">'
                    + '<div style="margin-top:2px;">Type event</div>'
                + '</div>';
        }
        let vv = '<div style="height:' + hLine + 'px;width:100%;border-bottom:1px solid #1dace9">' 
                +'<div style="width:' + wNum + 'px;height:100%;text-align:right;border-right:1px solid #1dace9;float:left"></div>'
                +'<div style="width:' + wElem + 'px;height:100%;text-align:center;border-right:1px solid #1dace9;float:left">' 
                    + '<div style="margin-top:2px;">Element</div>'
                + '</div>'
                + typeEv
                +'<div style="width:' + wType + 'px;height:100%;text-align:center;border-right:1px solid #1dace9;float:left">'
                    + '<div style="margin-top:2px;">Handler</div>'
                + '</div>'
            + '</div';
        let hh = newDOMelement(vv);
        return hh;
    };
    
    this.cbEdit = function(name, tag, getData) {
        if (getData) {
            switch (name) {
                case "param_1":
                    let nn = this.dataEdit.id;
                    if (nn != null && nn.length > 0) {
                        let comp = getComponentByViewId(this.dataEdit.id, currentScreen);
                        let menu = comp.model.menuList.list;
                        let ik = menu.length;
                        let st = "";
                        let sep = "";
                        for (let i = 0; i < ik; i++) {
                            let item = menu[i];
                            st += sep + item.screen;
                            sep = ",";
                        }
                        return st;
                    }
                    return "";
                    break;
            }
        } else {
            switch (name) {
                case "id":
                    let res = this.editF.getView("param_1");
                    let inp = res.querySelector("select");
                    let nn = this.dataEdit.id;
                    if (nn != null && nn.length > 0) {
                        let comp = getComponentByViewId(this.dataEdit.id, currentScreen);
                        let menu = comp.model.menuList.list;
                        let ik = menu.length;
                        let st = "";
                        let sep = "";
                        let first = "";
                        for (let i = 0; i < ik; i++) {
                            let item = menu[i];
                            st += sep + item.screen;
                            sep = ",";
                            if (first.length == 0) {
                                first = item.screen;
                            }
                        }
                        inp.innerHTML = formOptionsSelUI(st, first);
                        this.dataEdit.param_1 = first;
                    }
                    break;
            }
        }
    };
    
    this.setSelectIdHandl = function (met, item, addItem) {
        let vv;
        if (item != null) {
            let nameV = met.name;
            vv = item[nameV];
            if (vv == null) {
                vv = "";
            }
        }
        let selSel = formSelectViewIdHandl(vv, addItem);
        selSel.style.width = met.len + "px";
        selSel.style.border = "none";
        selSel.style.backgroundColor = "#0000";
        return selSel;
    }

    this.setSelectEvent = function (met, item, addItem) {
        let vv;
        if (item != null) {
            let nameV = met.name;
            vv = item[nameV];
            if (vv == null) {
                vv = "click";
            }
        }
        let selSel = formSelectForEditData(listEvents, vv);
        selSel.style.width = met.len + "px";
        selSel.style.border = "none";
        selSel.style.backgroundColor = "#0000";
        return selSel;
    }

    this.setSelect = function (met, item) {
        let vv;
        if (item != null) {
            let nameV = met.name;
            vv = item[nameV];
            if (vv == null) {
                vv = "";
            }
        }
        let selSel = formSelectForEditData(met.select, vv);
        selSel.style.width = met.len + "px";
        selSel.style.border = "none";
        selSel.style.backgroundColor = "#0000";
        return selSel;
    }
}


