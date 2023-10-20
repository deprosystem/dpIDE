function ListEdit(meta, data, cont, cb, tag, noTile, noDel) {
    this.meta = meta;
    this.data = data;
    this.cb = cb;
    this.tag = tag;
    this.selRow = -1;
    this.noTile = noTile;
    this.noDel = noDel;
    
    let widthTable;
    let ikD = this.data.length;
    let ikM = this.meta.length;
    let heightTitle = 24;
    let rowStr = '<div class="row" style="float:left;clear: both;height:' + (heightTitle) + 'px;border-bottom:1px solid #1dace9;"></div>';
    let dividerStr = '<div style="float:left;width:0.7px;height:100%;background-color:#1dace9;"></div>';
    let dividerTitleStr = '<div style="float:left;width:0.7px;height:100%;background-color:#1dace9;cursor:col-resize"></div>';
    let delStr = '<div style="float:left;height:100%;width:25px;"></div>';
    let hCont = heightTitle + 1;
    if (this.noTile) {
        hCont = 0;
    }
    let containerStr = '<div style="position:absolute;left:0;top:' + hCont + 'px;right:0;bottom:2px;overflow-y:auto;"></div>';
    
    this.init = function() {
        let row;
        let col;
        let met;
        if ( ! this.noTile) {
            let divTitle = newDOMelement(rowStr);
            divTitle.style.fontWeight = "600";
            cont.append(divTitle);

            for (let i = 0; i < ikM; i++) {
                dv = document.createElement('div');
                let item = this.meta[i];
                dv.innerHTML = item.title;
                let lenCol = item.len;
                if (item.len == null) {
                    lenCol = 50;
                }
                dv.style.cssText = "float:left;margin-top:4px;text-align: center;width:" + lenCol + "px;overflow:hidden;";
                divTitle.append(dv);
                let divider = newDOMelement(dividerTitleStr);
                divTitle.append(divider);
                divider.addEventListener("mousedown", () =>{this.chWidthCell()}, true);
            }
            if ( ! this.noDel) {
                let delCell = newDOMelement(delStr);
                divTitle.append(delCell);
                divTitle.append(newDOMelement(dividerStr));
            }
        }
        this.cont = newDOMelement(containerStr);
        cont.append(this.cont);
        for (let j = 0; j < ikD; j++) {
            row = this.newRow(j);
            this.cont.append(row);
        }
        if (ikD > 0) {
            this.selectRow(0);
        }
    }
    
    this.newColon = function(met, item) {
        let lenCol = met.len;
        if (met.len == null) {
            lenCol = 50;
        }
        let cell = newDOMelement('<div class="col" style="float:left;height: 100%;width:' + lenCol + 'px;overflow:hidden;"></div>');
        let vv;
        if (item != null) {
            vv = item[met.name];
        }
        if (vv == null) {
            vv = "";
        }
        let inp;
        let ww;
        let hh;
        switch (met.type) {
            case "Text":
                let type_inp = met.type.toLowerCase();
                inp = newDOMelement('<input type=' + type_inp + ' style="width:100%;outline:none;border:none;background-color:#0000" value="' + vv + '"/>');
                inp.nameField = met.name;
                inp.valField = vv;
                inp.addEventListener('input', () => {this.inputText(inp, met)});
                inp.addEventListener('keydown', () => {this.clickUpInput(event)});
                cell.append(inp);
                break;
            case "Select":
                inp = formSelectForEditData(met.value, vv);
                inp.style.cssText = "width:100%;font-size:12px;color:#110000;border:none;background-color:#0000";
                inp.nameField = met.name;
                inp.addEventListener('change', () => {this.changeSelect(inp, met)}, true);
                cell.append(inp);
                break;
            case "Img":
                ww = 24;
//                let hh = 24;
                let margImg = "";
                cell.style.textAlign = "center";
                if (met.widthImg != null) {
                    ww = met.widthImg;
//                    hh = met.widthImg;
                    let mm = (heightTitle - ww) / 2;
                    margImg = "margin-left:" + mm + "px;margin-top:" + mm + "px;";
                }
                inp = newDOMelement('<img class="imageV" style="cursor:pointer;' + margImg + '" width="' + ww + '" height="' + ww + '" src="' + vv + '">');
                inp.addEventListener("click", () => {selectListImage(event, this, met.name)}, false);
                cell.append(inp);
                break;
            case "Color":
                if (vv == "") {
                    vv = "0";
                }
                hh = heightTitle - 4;
                ww = lenCol - 4;
                inp = newDOMelement('<div style="cursor:pointer;width:' + ww + 'px;height:' + hh + 'px;margin-left:2px;margin-top:2px;border-radius:5px;background-color:'
                        + findColorByIndex(vv) + '"></div>');
                inp.nameField = met.name;
                inp.cb = this;
                inp.addEventListener("click", () => {setPikEditFormColor(inp)}, false);
                cell.append(inp);
                break;
            case "No":
                inp = newDOMelement('<div style="margin-top:4px">' + vv + '</div>');
                inp.nameField = met.name;
                inp.valField = vv;
                cell.style.backgroundColor = "#fff";
                cell.append(inp);
                break;
        }
        return cell;
    }
    
    this.changeSelect = function(el, met) {
        let ind = el.closest(".row").ind;
        this.data[ind][el.nameField] = el.options[el.selectedIndex].value;
        if (this.cb != null) {
            this.cb.cbListEdit(el.nameField, ind, this.tag);
        }
    }
    
    this.callBackEditF = function(i, par) {
        let nn = listImage[i];
        let inp = par.el;
        let ind = inp.closest(".row").ind;
        let name = par.param;
        inp.src = nn;
        this.data[ind][name] = nn;
        if (this.cb != null) {
            this.cb.cbListEdit(name, ind, this.tag);
        }
    }
    
    this.inputText = function(el, met) {
        let ind = el.closest(".row").ind;
        let valid = met.valid;
        let val = el.value;
        if (valid != null){
            let mes = this.inputValid(val, valid);
            if (mes.length == 0) {
                this.data[ind][met.name] = val;
                el.valField = val;
                if (this.cb != null) {
                    this.cb.cbListEdit(met.name, ind, tag);
                }
            } else {
                el.value = el.valField;
                tooltipMessage(el, mes);
            }
        } else {
            el.valField = val;
            this.data[ind][met.name] = val;
            if (this.cb != null) {
                this.cb.cbListEdit(met.name, ind, this.tag);
            }
        }
    }
    
    this.inputValid = function(val, valid) {
        let ik = val.length;
        let kUp;
        switch (valid) {
            case "latin":
                for (let i = 0; i < ik; i++) {
                    kUp = val[i].toUpperCase();
                    if ( ! ((kUp >= "A" && kUp <= "Z") || kUp == "_" || (kUp >= "0" && kUp <= "9")))  {
                        return "Only english letters, _ and numbers";
                    } else {
                        if ( i == 0 && kUp >= "0" && kUp <= "9") {
                            return "The first character cannot be a digit";
                        }
                    }
                }
                break;
            case "name_low":
                for (let i = 0; i < ik; i++) {
                    kUp = val[i]
                    if ( ! ((kUp >= "a" && kUp <= "z") || kUp == "_" || (kUp >= "0" && kUp <= "9")))  {
                        return "English small letters only, _ and numbers";
                    } else {
                        if (i == 0 && kUp >= "0" && kUp <= "9") {
                            return "The first character cannot be a digit";
                        }
                    }
                }
                break;
            case "list_var":
                for (let i = 0; i < ik; i++) {
                    kUp = val[i].toUpperCase();
                    if ( ! ((kUp >= "A" && kUp <= "Z") || kUp == "_" || kUp == "," || (kUp >= "0" && kUp <= "9")))  {
                        return "Only english letters, _ and numbers";
                    } else {
                        if (targ.value.length == 0 ) {
                            if ((kUp >= "0" && kUp <= "9") || kUp == ',') {
                                return "The first character cannot be a digit";
                            }
                        } else {
                            if ( i == 0 && ((kUp >= "0" && kUp <= "9") || kUp == ',')) {
                                return "The first character cannot be a digit";
                            }
                        }
                    }
                }
                break;
            case "number":
                for (let i = 0; i < ik; i++) {
                    kUp = val[i];
                    if (kUp < "0" || kUp > "9") {
                        return "Only numbers";
                    }
                }
                break;
            case "float":
                for (let i = 0; i < ik; i++) {
                    kUp = val[i];
                    if ((kUp >= "0"  && kUp <= "9") || kUp == "-" || kUp == ".") {
                        if (kUp == "-") {
                            if (i > 0) {
                                return "Minus not at the beginning";                            }
                        } else if (kUp == ".") {
                            if (val.indexOf(".") > -1) {
                                return "The point is already there";
                            }
                        }
                    } else {
                        return "The point is already there";
                    }
                }
                break;
            case "password":
                for (let i = 0; i < ik; i++) {
                    kUp = val[i].toUpperCase();
                    if ( ! ((kUp >= "A" && kUp <= "Z") || (kUp >= " " && kUp <= "/") || (kUp >= "0" && kUp <= "9")))  {
                        return "Only english letters, numbers and special character";
                    }
                }
                break;
        }
        return "";
    }
    
    this.addRow = function() {
        let itemBlanck = {};
        let ind = this.data.length;
        this.data.push(itemBlanck);
        let row = this.newRow(ind);
        this.cont.append(row);
        this.selectRow(ind);
    }
    
    this.newRow = function(ind) {
        let row = newDOMelement(rowStr);
        row.ind = ind;
        let item = this.data[ind];
        row.item = item;
        row.addEventListener('click', () => {this.changeRow(event)});
        for (let i = 0; i < ikM; i++) {
            met = this.meta[i];
            col = this.newColon(met, item);
            col.ind = i;
            row.append(col);
            row.append(newDOMelement(dividerStr));
        }
        if ( ! this.noDel) {
            let delCell = newDOMelement(delStr);
            let delImg = newDOMelement('<img class="imageV" style="margin-top:6px;margin-left:7px;cursor:pointer;" width="10" height="10" src="img/del_red.png">');
            delImg.addEventListener("click", () => {this.delRow(row)}, false);
            delCell.append(delImg);
            row.append(delCell);
            row.append(newDOMelement(dividerStr));
        }
        return row;
    }
    
    this.delRow = function(row) {
        event.stopPropagation();
        let ind = row.ind;
        let ch = this.cont.children;
        if (this.selRow > -1) {
            ch[this.selRow].style.backgroundColor = "";
        }
        this.data.splice(ind, 1);
        row.remove();
        let ik = ch.length;
        for (let i = 0; i < ik; i++) {
            ch[i].ind = i;
        }
        if (ind >= ik) {
            ind = ik - 1;
        }
        this.selRow = ind;
        if (ind > -1) {
            ch[this.selRow].style.backgroundColor = "#eff";
        }
        if (this.cb != null) {
            this.cb.cbChangeRow(ind, this.tag);
        }
    }
    
    this.setColor = function(el, id, color) {
        let r = el.closest(".row");
        r.item[el.nameField] = id;
        el.style.backgroundColor = color;
        if (this.cb != null) {
            this.cb.cbListEdit(el.nameField, r.ind, this.tag);
        }
    }
    
    this.chWidthCell = function() {     //  change length colon
        
    }
    
    this.changeRow = function(event) {
        let row = event.currentTarget;
        this.selectRow(row.ind);
    }
    
    this.clickUpInput = function(event) {
        let k = event.key;
        if (k == "ArrowDown" || k == "ArrowUp") {
            let col = event.target.closest('.col');
            let row = col.closest('.row');
            if (row != null) {
                let cR = row.ind;
                let cC = col.ind;
                let countRows = this.data.length;
                switch (k) {
                    case "ArrowDown":
                        if ((cR + 1) < countRows) {
                            this.upDown(cC, cR + 1);
                        }
                        break;
                    case "ArrowUp":
                        if (cR > 0) {
                            this.upDown(cC, cR - 1);
                        }
                        break;
                }
            }
        }
    }
    
    this.upDown = function (cC, cR) {
        let ch = this.cont.children;
        let row = ch[cR];
        let cells = row.getElementsByClassName('col');
        let cellSel = cells[cC];
        let newInput = cellSel.querySelector("input");
        newInput.focus();
        this.selectRow(row.ind);
    }
    
    this.selectRow = function(i) {
        let ch = this.cont.children;
        let ik = ch.length;
        if (this.selRow > -1) {
            ch[this.selRow].style.backgroundColor = "";
        }
        this.selRow = i;
        ch[this.selRow].style.backgroundColor = "#eff";
        if (this.cb != null) {
            this.cb.cbChangeRow(i, this.tag);
        }
    }
    
    this.init();
}


