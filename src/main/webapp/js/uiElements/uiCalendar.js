function uiCalendar() {
    this.setElementUI = function(p, newEl, parent) {
        newEl.appendChild(createDivCalendar(p));
    }
    
    this.newElementUI = function(p) {
        return createDivCalendar(p);
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = "";
        let cTxt = editColorParam("Text color", findColorByIndex(p.componParam.workDayColor), 'col_txt', setColorCalendTxt);
        contentAttributes.appendChild(cTxt);
        let cTint = editColorParam("Tint color", findColorByIndex(p.componParam.selectTintColor), 'col_tint', setColorCalendTint);
        cTint.style.marginLeft = "10px";
        contentAttributes.appendChild(cTint);
        let cSelTxt = editColorParam("Select text color", findColorByIndex(p.componParam.selectTextColor), 'col_selTxt', setColorCalendSelTxt);
        cSelTxt.style.marginLeft = "10px";
        contentAttributes.appendChild(cSelTxt);
        
        let cHolidays = editColorParam("Holidays color", findColorByIndex(p.componParam.holidaysColor), 'col_selTxt', setColorcHolidays);
        cHolidays.style.marginLeft = "10px";
        contentAttributes.appendChild(cHolidays);
        
        let hol = editCheckbox("Holidays", p.componParam.isHolidays, "calendIsHolidays");
        hol.style.marginTop = "5px";
        hol.style.marginLeft = "10px";
        contentAttributes.appendChild(hol);
        
        contentAttributes.appendChild(newDOMelement('<div style="height:1px;width:100%;background-color:#bbd4ef;float:left;clear:both;margin-top:5px"></div>'));
        let hMonth = selectBlock("Height month", "32,36,40,44,50,56,62", "setHeightMonth", 28, 72);
        setValueSelectBlock(hMonth, p.componParam.heightMonth);
        hMonth.style.clear = "both";
        contentAttributes.appendChild(hMonth);
        
        let hCel = selectBlock("Height cell", "32,36,40,44,50,56,62", "setHeightCell", 28, 72);
        setValueSelectBlock(hCel, p.componParam.heightCell);
        hCel.style.clear = "both";
        contentAttributes.appendChild(hCel);
        
        let hTint = selectBlock("Tint diameter", "28,32,36,40,44,50", "setHeightTint", 22, 56);
        setValueSelectBlock(hTint, p.componParam.tintDiam);
        hTint.style.clear = "both";
        contentAttributes.appendChild(hTint);
        
        let hTxtS = selectBlock("Date font height", "10,12,14,16,18", "setDaySize", 8, 20);
        setValueSelectBlock(hTxtS, p.componParam.textDaySize);
        hTxtS.style.clear = "both";
        contentAttributes.appendChild(hTxtS);
        
        let hMonthS = selectBlock("Month font height", "8,10,12,14,16", "setMonthSize", 6, 18);
        setValueSelectBlock(hMonthS, p.componParam.monthSize);
        hTxtS.style.clear = "both";
        contentAttributes.appendChild(hMonthS);
        
        contentAttributes.appendChild(newDOMelement('<div style="height:1px;width:100%;background-color:#bbd4ef;float:left;clear:both;margin-top:5px"></div>'));
        
        let countAfter = editNumberParam("Number of months after", 40, 24, 0, 10, "calendAfter");
        countAfter.style.clear = "both";
        countAfter.style.marginTop = "5px";
        setValueNumber(countAfter, p.componParam.countAfterMonth);
        contentAttributes.appendChild(countAfter);
        
        let countBefore = editNumberParam("Number of months before", 40, 24, 0, 10, "calendBefore");
        countBefore.style.marginLeft = "10px";
        countBefore.style.marginTop = "5px";
        setValueNumber(countBefore, p.componParam.countBeforeMonth);
        contentAttributes.appendChild(countBefore);
        
        let afterT = editCheckbox("No choice after today", p.componParam.afterToday, "calendAfterToday");
        afterT.style.clear = "both";
        afterT.style.marginTop = "5px";
        contentAttributes.appendChild(afterT);
        
        let tillT = editCheckbox("No choice until today", p.componParam.tillToday, "calendTillToday");
        tillT.style.marginTop = "5px";
        tillT.style.marginLeft = "10px";
        contentAttributes.appendChild(tillT);
        
        let rang = editCheckbox("Date range", p.componParam.rangeDate, "calendDataRange");
        rang.style.marginTop = "5px";
        rang.style.marginLeft = "10px";
        contentAttributes.appendChild(rang);
        
        let sendN = editTextParam("Send notification", 80, p.componParam.sendNotif, "calendSendNotif");
        sendN.style.marginTop = "5px";
        sendN.style.clear = "both";
        contentAttributes.appendChild(sendN);
        
        let savP = editTextParam("Save in parameters", 80, p.componParam.saveParam, "calendSaveParam");
        savP.style.marginTop = "5px";
        savP.style.marginLeft = "10px";
        contentAttributes.appendChild(savP);

        let datF = editTextParam("Date format", 80, p.componParam.dateFormat, "calendDateFormat");
        datF.style.marginTop = "5px";
        datF.style.marginLeft = "10px";
        contentAttributes.appendChild(datF);
        
        if (p.componParam.nameMonth == null) {
            p.componParam.nameMonth = "";
        }
        let nameM = editTextParam("Name of months", 200, p.componParam.nameMonth, "calendNameMonth");
        nameM.style.marginTop = "5px";
        sendN.style.clear = "both";
        contentAttributes.appendChild(nameM);
    }
    
    this.viewElementUI = function(p, el) {
        let monts = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let dat = new Date();
        let mm = dat.getMonth();
        let dd = dat.getDate();
        let cc = el.getElementsByClassName("_calendar")[0];
        cc.innerHTML = "";
        let h_m = p.componParam.heightMonth * MEASURE;
        let h_c = p.componParam.heightCell * MEASURE;
        let font_m = p.componParam.monthSize * MEASURE;
        let font_d = p.componParam.textDaySize * MEASURE;
        let tintDiam = p.componParam.tintDiam * MEASURE;
        let textColor = findColorByIndex(p.componParam.workDayColor);
        let tintColor = findColorByIndex(p.componParam.selectTintColor);
        let tintTextColor = findColorByIndex(p.componParam.selectTextColor);
        let month = newDOMelement('<div class="_c_month" style="display:flex;justify-content:space-around;flex-direction:column;float:left;height:' + h_m 
                + 'px"><div style="font-size:' + font_m + 'px;">' + monts[mm] + '</div></div>');
        let yy = dat.getFullYear();
        let daysInM = daysInMonth(mm, yy);
        let dd01= new Date(yy, mm, 1);
        let week = dd01.getDay();
        week = (week == 0) ? 6 : --week;
        cc.appendChild(month);
        let divW = newDOMelement(weekView(h_c, textColor, font_d));
        let countD = 0;
        let dayW;
        for (let i = 0; i < week; i++) {
            dayW = newDOMelement(dayView(tintDiam, ""));
            divW.appendChild(dayW);
            countD++;
        }
        for (let i = 1; i <= daysInM; i++) {
            if (countD == 7) {
                cc.appendChild(divW);
                countD = 0;
                divW = newDOMelement(weekView(h_c, textColor, font_d));
            }
            if (i == dd) {
                dayW = newDOMelement(daySel(tintDiam, i, tintColor, tintTextColor));
            } else {
                dayW = newDOMelement(dayView(tintDiam, i));
            }
            divW.appendChild(dayW);
            countD++;
        }
        for (let i = countD; i < 7; i++) {
            dayW = newDOMelement(dayView(tintDiam, ""));
            divW.appendChild(dayW);
        }
        cc.appendChild(divW);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#heading=h.vpedvweafc7r";
    }
}

function weekView(h, tColor, tSize) {
    return '<div style="display:flex;justify-content:space-around;flex-direction:row;height:' + h + 'px;width:100%;font-size:' + tSize + 'px;color:' + tColor + '"></div>'
}

function daySel(w, i, tintColor, textColor) {
    let st = '<div style="position:relative;height:100%;width:' + w + 'px;">'
                +'<div style="position:absolute;width:' + w + 'px;height:' + w + 'px;position:absolute;background-color:' + tintColor + ';border-radius:' + (w / 2) + 'px"></div>'
                +'<div style="text-align:center;display:flex;justify-content:space-around;flex-direction:column;position:absolute;width:' + w + 'px;height:' + w 
                + 'px;color:' + textColor + '">' + i + '</div>'
    +'</diw>';
    return st;
}

function dayView(w, i) {
    let st = '<div style="height:' + w + 'px;width:' + w + 'px;text-align:center;display:flex;justify-content:space-around;flex-direction:column;">' + i + '</div>';
    return st;
}

function createDivCalendar(p) {
    if (p.componParam == null) {
        p.componParam = {type:15, heightMonth:56, heightCell:56, monthSize:14, textDaySize:16, tintDiam:40, workDayColor:13, selectTintColor:0, selectTextColor:3, nameMonth:"",
            countAfterMonth:0, countBeforeMonth:0, afterToday:false, tillToday:false, rangeDate:false, holidaysColor:6, isHolidays:false, sendNotif:"", saveParam:"",dateFormat:""};
    }
    return div = newDOMelement('<div class="_calendar" style="position: absolute;left:0;top:0;right:0;bottom:0"></div>');
}

function setColorCalendTxt(id, color) {
    paramCompon.componParam.workDayColor = id;
    let el_txt = contentAttributes.getElementsByClassName("col_txt")[0];
    el_txt.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function setColorCalendTint(id, color) {
    paramCompon.componParam.selectTintColor = id;
    let el_col = contentAttributes.getElementsByClassName("col_tint")[0];
    el_col.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function setColorCalendSelTxt(id, color) {
    paramCompon.componParam.selectTextColor = id;
    let el_col = contentAttributes.getElementsByClassName("col_selTxt")[0];
    el_col.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function setColorcHolidays(id, color) {
    paramCompon.componParam.holidaysColor = id;
    let el_col = contentAttributes.getElementsByClassName("col_selTxt")[0];
    el_col.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function setHeightMonth(vv) {
    let res = vv;
    if (vv.tagName == "INPUT") {
        res = vv.value;
    }
    currentElement.android.componParam.heightMonth = res;
    viewCompon();
}

function setHeightCell(vv) {
    let res = vv;
    if (vv.tagName == "INPUT") {
        res = vv.value;
    }
    currentElement.android.componParam.heightCell = res;
    viewCompon();
}

function setHeightTint(vv) {
    let res = vv;
    if (vv.tagName == "INPUT") {
        res = vv.value;
    }
    currentElement.android.componParam.tintDiam = res;
    viewCompon();
}

function setDaySize(vv) {
    let res = vv;
    if (vv.tagName == "INPUT") {
        res = vv.value;
    }
    currentElement.android.componParam.textDaySize = res;
    viewCompon();
}

function setMonthSize(vv) {
    let res = vv;
    if (vv.tagName == "INPUT") {
        res = vv.value;
    }
    currentElement.android.componParam.monthSize = res;
    viewCompon();
}

function calendAfter(el) {
    currentElement.android.componParam.countAfterMonth = el.value;
//    viewCompon();
}

function calendBefore(el) {
    currentElement.android.componParam.countBeforeMonth = el.value;
//    viewCompon();
}

function calendAfterToday(vv) {
    currentElement.android.componParam.afterToday = vv;
}

function calendTillToday(vv) {
    currentElement.android.componParam.tillToday = vv;
}

function calendDataRange(vv) {
    currentElement.android.componParam.rangeDate = vv;
}

function calendIsHolidays(vv) {
    currentElement.android.componParam.isHolidays = vv;
}

function calendSendNotif(el) {
    currentElement.android.componParam.sendNotif = el.value;
}

function calendSaveParam(el) {
    currentElement.android.componParam.saveParam = el.value;
}

function calendDateFormat(el) {
    currentElement.android.componParam.dateFormat = el.value;
}

function calendNameMonth(el) {
    currentElement.android.componParam.nameMonth = el.value;
}