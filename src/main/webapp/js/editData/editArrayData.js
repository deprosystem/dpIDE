function EditData(meta, data, domEl, obrSave, dopEl, move_1) {
    let edData, edMeta, edDomEl;
    let edObrSave = obrSave;
    let tableEdit, tableEditRows, tabContainer, tabTool;
    let tabHeader, tabBody;
    let widthTabl;
    let hTitle = 30, hTool = 50, wNum = 24; // ширина колонки с номером строки
    let hDopEl;
    let countRows;
    let imgSetValue;
    let tabViewport;
    let scrollVert;
    let move;
    let  colorSelect = "#f3f8ff", colorNew = "#f5f9ff", 
            colorDel, colorErrorTr, colorErrorTh;
    if (meta == null) {
        return null;
    };
    edMeta = meta;
    let ikM = edMeta.length;
    if (domEl == null) {
        return null;
    }
    edDomEl = domEl;
    if (data == null) {
        return null;
    }
    edData = data;
    let ikD = edData.length
    let maxIdField;
    let idPrimaryInput;
    
    formEditTab();
    
    function formEditTab() {
        let tr;
        let td;
        let met;
        
        tabContainer = document.createElement('div');
        tabContainer.style.cssText = "position:relative;height:100%;;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;-o-user-select: none;user-select: none; ";
        edDomEl.appendChild(tabContainer);
        hDopEl = 0;
        move = move_1;
        if (dopEl != null) {
            tabContainer.append(dopEl);
            hDopEl = dopEl.clientHeight;
        }
        tabHeader = document.createElement('div');
        tabHeader.style.cssText = "white-space:nowrap;height:" + hTitle + "px;color:#110000;font-size:12px;clear:both";
        let dv = document.createElement('div');
        dv.innerHTML = "&nbsp;";
        dv.style.cssText = "display:inline-block;height:100%;";
        tabHeader.appendChild(dv);
        for (let i = 0; i < ikM; i++) {
            dv = document.createElement('div');
            dv.innerHTML = edMeta[i].title;
            dv.style.cssText = "display:inline-block;height:100%;margin-top:7px;";
            tabHeader.appendChild(dv);
        }
        if (move) {
            dv = document.createElement('div');
            dv.innerHTML = "&nbsp;";
            dv.style.cssText = "display:inline-block;height:100%;";
            tabHeader.appendChild(dv);
        }
        dv = document.createElement('div');
        dv.innerHTML = "&nbsp;";
        dv.style.cssText = "display:inline-block;height:100%;";
        tabHeader.appendChild(dv);
        tabContainer.appendChild(tabHeader);
        
        tabTool = document.createElement('div');
        tabTool.style.cssText = "height:" + hTool + "px;bottom:0px;right:0px;left:0px;position:absolute;border-top:1px solid #C5DCFA;";
        let saveBl = createSaveData();
        let addBl = createAddItem();
        addBl.addEventListener("click", function(event){addItem(event)}, true);
        saveBl.addEventListener("click", function(event){saveData(event)}, true);
        tabTool.appendChild(saveBl);
        tabTool.appendChild(addBl);
        tabContainer.appendChild(tabTool);

        tabViewport = document.createElement('div');
        tabViewport.className = "viewport";
        tabViewport.style.cssText = "bottom:" + (hTool + 1) + "px;position:absolute;top:" + (hTitle + hDopEl) + "px";
        tabBody = document.createElement('div');
        tabBody.className = "content";
//        tabBody.style.cssText = "overflow:hidden;";
        tabViewport.appendChild(tabBody);
        tabContainer.appendChild(tabViewport);

        tableEdit = document.createElement('table');
        tableEdit.className = "edit_data";
        tableEdit.style.borderCollapse = "collapse";
        tableEdit.style.backgroundColor = "#fff";
        tabBody.appendChild(tableEdit);
        
        maxIdField = 1;
        let isId = false;
        if (ikD > 0) {
            for (let j = 0; j < ikD; j++) {
                let item = edData[j];
                tr = document.createElement('tr');
                if (item != null && item.system != null && item.system.length > 0) {
                    tr.system = item.system;
                }
                let idF = item.id_field;
                if (idF == null) {
                    idF = maxIdField;
                    maxIdField ++;
                } else {
                    isId = true;
                    if (maxIdField < idF) {
                        maxIdField = idF;
                    }
                }
                tr.idField = idF;
                tr.addEventListener("mouseover", function(event){mouseoverTr(event)}, true);
                tr.addEventListener("mouseout", function(event){mouseoutTr(event)}, true);
                td = createCellNum(j);
                tr.appendChild(td);
                for (let i = 0; i < ikM; i++) {
                    td = createTD(i, item);
                    tr.appendChild(td);
                }
                if (move) {
                    if ( item.system != null && item.system.length > 0) {
                        td = createMoveBlanck();
                    } else {
                        td = createMove();
                    }
                    tr.append(td);
                }
                if ( item.system != null && item.system.length > 0) {
                    td = createDelBlanck();
                } else {
                    td = createDel();
                }
                tr.key_dat = item.key;
                tr.append(td);
                tableEdit.appendChild(tr);
                if (isId) {
                    maxIdField ++;
                }
            }
        } else {
            createNewTR();
        }

        tableEditRows = tabBody.getElementsByTagName('tr');
        if (tableEditRows != null && tableEditRows.length > 0) {
            formHeader(tableEditRows);
        }
        scrollVert = new scrollX(tabViewport, "scroll");
        scrollVert.init();
    }
    
    function formHeader(tableEditRows) {
        tr = tableEditRows[0];
        let cells = tr.getElementsByTagName('td');
        let tit = tabHeader.getElementsByTagName('div');
        let ik = cells.length;
        let ik1 = ik - 1;
        for (let i = 0; i < ik; i ++) {
            let cellW = cells[i].clientWidth;
            if (i == ik1) {
                cellW --;
            }
            tit[i].style.width = cellW + 'px';
        }
        widthTabl = tableEdit.clientWidth + 17;
        countRows = tableEditRows.length;
    }
    
    this.getWidthW = function() {
        return widthTabl;
    };
    
    this.getCellXY = function(i, j) {
        let rows = tabBody.getElementsByTagName('tr');
        if (rows.length > 0) {
            let row = rows[i];
            let cells = row.getElementsByTagName('td');
            return cells[j];
        } else {
            return null;
        }
    }
    
    function mouseoverTr(event) {
        hoverTr(event, "#f3f7ff");
    }
    
    function mouseoutTr(event) {
        hoverTr(event, "");
    }
    
    function createDelBlanck() {
        let td = document.createElement('td');
        let dv = newDOMelement('<div style="width:21px;height:16px;"></div');
        td.appendChild(dv);
        return td;
    }
    
    function createDel() {
        let td = document.createElement('td');
        let dv = document.createElement('img');
        dv.style.cssText = "width:16px;height:16px;margin-left:5px;cursor:pointer";
        dv.src = "img/close-o.png";
        dv.addEventListener("click", function(event){delRow(event)}, true);
        td.appendChild(dv);
        return td;
    }
    
    function createMove() {
        let td = document.createElement('td');
        let dv = document.createElement('img');
        dv.style.cssText = "width:8px;height:16px;margin-left:5px;cursor:pointer";
        dv.src = "img/arrow_top.png";
        dv.addEventListener("click", function(event){moveRowTop(event)}, true);
        td.appendChild(dv);
        dv = document.createElement('img');
        dv.style.cssText = "width:8px;height:16px;margin-left:2px;cursor:pointer";
        dv.src = "img/arrow_bottom.png";
        dv.addEventListener("click", function(event){moveRowBottom(event)}, true);
        td.appendChild(dv);
        return td;
    }
    
    function createMoveBlanck() {
        let td = document.createElement('td');
        let dv = newDOMelement('<div class="systemRow" style="width:16px;height:16px;margin-left:5px;"></div>');
        td.appendChild(dv);
        return td;
    }
    
    function moveRowTop(e) {
        let tr = e.target.closest('tr');
        let befTr = tr.previousElementSibling;
        let parEl = tr.parentElement;
        if (befTr != null && befTr.querySelector('.systemRow') == null) {
            parEl.insertBefore(tr, befTr);
        }
    }
    
    function moveRowBottom(e) {
        let tr = e.target.closest('tr');
        let aftTr = tr.nextElementSibling;
        let parEl = tr.parentElement;
        if (aftTr != null && aftTr.querySelector('.systemRow') == null) {
            parEl.insertBefore(aftTr, tr);
        }
    }
    
    function delRow(e) {
        let tr = e.target.closest('tr');
        let ik = tableEditRows.length;
        let iTr = -1;
        for (let i = 0; i < ik; i++) {
            if (tableEditRows[i] == tr) {
                iTr = i;
                break;
            }
        }
        tr.parentNode.removeChild(tr);
        tableEditRows = tabBody.getElementsByTagName('tr');
        if (iTr > -1) {
            ik = tableEditRows.length;
            for (let i = iTr; i < ik; i++) {
                let row = tableEditRows[i];
                let cells = row.getElementsByTagName('td');
                let first = cells[0].firstElementChild;
                first.innerHTML = i;
            }
        }
    }
    
    function hoverTr(event, color) {
        let tr = event.currentTarget;
        let act = document.activeElement;
        let cells = tr.getElementsByTagName("td");
        let ik = cells.length - 1;
        for (let i = 1; i < ik; i++) {
            cells[i].style.backgroundColor = color;
        }
    }
    
    function createCellNum(j) {
        let td = document.createElement('td');
//        td.style.border = "1px solid black";
        let dv = document.createElement('div');
        dv.style.cssText = "width:" + wNum + "px;text-align:right;margin-right:4px;";
        dv.innerHTML = j;
        td.appendChild(dv);
        return td;
    }
    
    function createTD(i, item) {
        let met = edMeta[i];
        let td = document.createElement('td');
        td.style.border = "1px solid #C5DCFA";
        if (met.type == null) {
            met.type = TYPE_TEXT;
        }
        let isSyst = false;
        if (item != null && item.system != null && item.system.length > 0) {
            isSyst = true;
        }
        let inp;
        switch (met.type) {
            case TYPE_BOOLEAN:
                inp = document.createElement('input');
                if (isSyst && item.system.indexOf(',' + met.name + ',') == -1) { 
                    inp.setAttribute('disabled','disabled');
                }
                inp.type = "checkbox";
                inp.name = met.name;
                if (item != null) {
                    let nameV = met.name;
                    let vv = item[nameV];
                    if (vv == null) {
                        vv = false;
                    }
                    inp.checked = vv;
                }
                if (met.marg != null) {
                    inp.style.marginLeft = met.marg + "px";
                    inp.style.marginRight = met.marg + "px";
                }
                inp.style.backgroundColor = "#0000";
                td.appendChild(inp);
                break;
            case TYPE_SELECT:
                if (isSyst && item.system.indexOf(',' + met.name + ',') == -1) {
                    let vv;
                    if (item != null) {
                        let nameV = met.name;
                        vv = item[nameV];
                        if (vv == null) {
                            vv = "";
                        }
                    }
                    inp = newDOMelement('<div style="width:' + met.len + 'px;background-color:#0000;margin-left:5px">' + vv + '</div>');
                    td.append(inp);
                    inp.isSyst = isSyst;
                } else {
                    if (met.select != null && met.select.length > 0) {
                        td.append(setSelect(met, item));
                    }
                }
                break;
            case ID_SELECT:
                td.appendChild(setSelectId(met, item));
                break;
            case FIELDS_SELECT:
                td.appendChild(setSelectFields(met, item));
                break;
            case ID_SELECT_HANDL:
                td.appendChild(setSelectIdHandl(met, item));
                break;
            case ID_SELECT_HANDL_SCR:
                td.appendChild(setSelectIdHandl(met, item, "Execute at startup screen"));
                break;
            case TYPE_IMG:
                let divImg = document.createElement('div');
                divImg.style.backgroundImage = "url(img/chess_2.png)";
                divImg.style.backgroundSize = "contain";
                let img = document.createElement('img');
                img.style.width = met.len + "px";
                divImg.style.width = (met.len + 4) + "px";
                if (met.h != null) {
                    img.style.height = met.h + "px";
                    divImg.style.height = (met.h + 4) + "px";
                } else {
                    img.style.height = met.len + "px";
                    divImg.style.height = (met.len + 4) + "px";
                }
                let vv = "";
                if (item != null) {
                    let nameV = met.name;
                    vv = item[nameV];
                }
                img.style.backgroundColor = "#0000";
                img.style.cursor = "pointer";
                if (vv != null && vv != "") {
                    img.src = vv;
                    img.srcElem = vv;
                }
                if (met.marg != null) {
                    divImg.style.marginLeft = met.marg + "px";
                    divImg.style.marginRight = met.marg + "px";
                    img.style.marginLeft = "2px";
                    img.style.marginTop = "2px";
                }
                if ( ! (isSyst && item.system.indexOf(',' + met.name + ',') == -1)) {
                    img.addEventListener('click', function(event){selecktImgArrayData(event)}, false);
                }
                divImg.appendChild(img);
                td.appendChild(divImg);
                break;
            default:
                let readOnl = "";
                if (isSyst && item.system.indexOf(',' + met.name + ',') == -1) {
                    readOnl = "disabled = 'disabled'";
                }
                inp = newDOMelement('<input type="text" name="' + met.name + '" size="' + met.len + '" style="margin-left:3px;margin-right:3px;outline:none;border:none"' + readOnl +  '>');
                if (item != null) {
                    let nameV = met.name;
                    let vv = item[nameV];
                    if (vv == null) {
                        vv = "";
                    }
                    inp.value = vv;
                }
                switch (met.type) {
                    case TYPE_INT:
                        inp.addEventListener('keydown', function(event){clickNumbet(event)}, false);
                        break;
                    case TYPE_FLOAT:
                        inp.addEventListener('keydown', function(event){editFloat(event)}, false);
                        break;
                    case TYPE_TEXT:
                    default:
                        inp.addEventListener('keydown', function(event){clickText(event, met.valid)}, false);
                }
                if (! isSyst) {
                    inp.addEventListener('focus', function(event){focusInput(event)}, false);
                    inp.addEventListener('blur', function(event){blurInput(event)}, false);
                } else {
                    if (met.name == "name") {
                        idPrimaryInput = inp;
                    }
                }
                inp.style.backgroundColor = "#0000";
                td.appendChild(inp);
        }
        return td;
    }
    
    function selecktImgArrayData(e) {
        selectListImage(e, setImgEditData, e.currentTarget);
    }
    
    function setImgEditData(i, par) {
        let nn = listImage[i];
        par.src = nn;
        par.srcElem = nn;
    }

    function setSelect(met, item) {
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
    
    function setSelectId(met, item) {
        let vv;
        if (item != null) {
            let nameV = met.name;
            vv = item[nameV];
            if (vv == null) {
                vv = "";
            }
        }
        let selSel;
        if (met.type_view == null) {
            selSel = formSelectViewId(vv);
        } else {
            selSel = formSelectViewId(vv, met.type_view);
        }
        selSel.style.width = met.len + "px";
        selSel.style.border = "none";
        selSel.style.backgroundColor = "#0000";
        return selSel;
    }
    
    function setSelectFields(met, item) {
        let vv;
        if (item != null) {
            let nameV = met.name;
            vv = item[nameV];
            if (vv == null) {
                vv = "";
            }
        }
        let selSel = formSelectFields(vv);
        selSel.style.width = met.len + "px";
        selSel.style.border = "none";
        selSel.style.backgroundColor = "#0000";
        return selSel;
    }
    
    function setSelectIdHandl(met, item, addItem) {
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
    
    function focusInput(e) {
        e.currentTarget.style.background = "#cdf";
    }
    
    function blurInput(e) {
        e.currentTarget.style.background = "#0000";
    }
    
    function tooltip(target, message) {
        let maxW = 250;
        let xy = getCoords(target);
        let x = xy.left;
        let y = xy.top;
        let dv = document.createElement('div');
        if (y > 40) {
            y -= 40;
        } else {
            y += 20;
        }
        let wD = document.documentElement.clientWidth;
        if ((wD - x) < maxW) {
            x = wD - maxW - 20;
        }
        dv.style.cssText = "position:absolute;max-width:" + maxW + "px;padding:5px;background:var(--c_yelow_lite);border:1px solid #ffc700;border-radius:8px;left:" 
                + x + "px;top:" + y + "px;z-index:100";
        dv.innerHTML = message;
        document.body.append(dv);
        setTimeout(function(){ document.body.removeChild(dv);},2000);
    }
    
    function getCoords(elem) { 
        var box = elem.getBoundingClientRect();
        return {
          top: box.top + pageYOffset,
          left: box.left + pageXOffset
        };
    }
    
    clickUpInput = function(event) {
        let k = event.key;
        if (k == "ArrowDown" || k == "ArrowUp") {
            let cell = event.target.closest('td');
            if (cell != null) {
                let cR = cell.parentNode.rowIndex;
                let cC = cell.cellIndex;
                switch (k) {
                    case "ArrowDown":
                        if ((cR + 1) < countRows) {
                            upDown(cC, cR + 1);
                            return true;
                        }
                        break;
                    case "ArrowUp":
                        if (cR > 0) {
                            upDown(cC, cR - 1);
                            return true;
                        }
                        break;
                }
            }
        }
        return false;
    }
    
    function clickText(event, valid) {
        let k = event.key;
        if (k == "ArrowUp" || k == "ArrowDown") {
            return clickUpInput(event);
        } else { 
            if (k == "ArrowRight" || k == "ArrowLeft" || k == "Tab" 
                || k == "Home" || k == "End" || k == "Backspace" || k == "Delete" || k == 'Shift') {
                return true;
            }
        }
        if (valid != null) {
            switch (valid) {
                case "latin":
                    let kUp = event.key.toUpperCase();
                    if ( ! ((kUp >= "A" && kUp <= "Z") || kUp == "_" || (kUp >= "0" && kUp <= "9")))  {
                        event.preventDefault();
                        tooltip(event.target, "Только английские буквы, _ и цифры");
                    }
                    break
                case "name_low":
                    let targ = event.target;
//                        let k = event.key;
                    if ( ! ((k >= "a" && k <= "z") || k == "_" || (k >= "0" && k <= "9")))  {
                        event.preventDefault();
                        tooltip(targ, "Только английские буквы, _ и цифры");
                    } else {
                        if (targ.value.length == 0 && k >= "0" && k <= "9") {
                            event.preventDefault();
                            tooltip(targ, "The first character cannot be a digit");
                        }
                    }
                    break
            }
        }
    }
    
    function clickNumbet(event) {
        let k = event.keyCode;
        if (k < 47) {
            return clickUpInput(event);
        } else {
            if ( ! ((k > 47 && k < 58) || k == 173)) {
                event.preventDefault();
                tooltip(event.target, "Только цифры");
            } else {
                if (k == 173) {
                    if (event.target.selectionStart > 0) {
                        event.preventDefault();
                        tooltip(event.target, "Минус не в начале");
                    }
                }
            }
        }
    }

    function editFloat(event) {
        let k = event.keyCode;
        let z = event.key;
        if (k < 47) {
            return true;
        }
        if ((k > 47 && k < 58) || k == 173 || z == ".") {
            if (k == 173) {
                if (event.target.selectionStart > 0) {
                    event.preventDefault();
                    tooltipMessage(event.target, "Minus not at the beginning");
                    return false;
                }
            } else if (z == ".") {
                let vv = event.target.value;
                if (vv.indexOf(".") > -1) {
                    event.preventDefault();
                    tooltipMessage(event.target, "The point is already there");
                    return false;
                }
            }
            return true;
        } else {
            event.preventDefault();
            tooltipMessage(event.target, "Only numbers");
            return false;
        }
    }

    function upDown(cC, cR) {
        let row = tableEditRows[cR];
        let cells = row.getElementsByTagName('td');
        let cellSel = cells[cC];
        let newInput = cellSel.getElementsByTagName("input")[0];
        newInput.focus();
    }
    
    function createAddItem() {
        var container = document.createElement('div')
        container.innerHTML = '<div style="cursor:pointer;width: 80px;height:30px;background:#1DACE9;border-radius:4px;margin-right:15px;margin-top:10px;float:right;">'
                +'<div style="text-align: center;margin-top:7px;color:#fff">Add</div></div>';
        return container.firstChild;
    }
    
    function createSaveData() {
        var container = document.createElement('div')
        container.innerHTML = '<div style="cursor:pointer;width:78px;border:1px solid #1DACE9;height:28px;border-radius:4px;margin-right:10px;margin-top:10px;float:right;">'
                +'<div style="text-align: center;margin-top:7px;color:#1DACE9">Save</div></div>';
        return container.firstChild;
    }
    
    function addItem(e) {
        createNewTR();
        tableEditRows = tabBody.getElementsByTagName('tr');
        countRows = tableEditRows.length;
        scrollVert.resize(e);
    }
    
    function createNewTR() {
        let firstElem;
        let num = 0;
        if (tableEditRows != null) {
            num = tableEditRows.length;
        }
        let tr = document.createElement('tr');
        tr.idField = maxIdField;
        maxIdField ++;
        let td = createCellNum(num);
        tr.appendChild(td);

        for (let i = 0; i < ikM; i++) {
            td = createTD(i, null);
            if (i == 0) {
                firstElem = td;
            }
            tr.appendChild(td);
        }
        if (move) {
            td = createMove();
            tr.append(td);
        }
        td = createDel();
        tr.appendChild(td);
        tr.addEventListener("mouseover", function(event){mouseoverTr(event)}, true);
        tr.addEventListener("mouseout", function(event){mouseoutTr(event)}, true);
        tableEdit.appendChild(tr);
        tableEditRows = tabBody.getElementsByTagName('tr');
        countRows = tableEditRows.length;
        if (firstElem != null) {
            let newInput = firstElem.getElementsByTagName("input")[0];
            if (newInput != null) {
                newInput.focus();
            }
        }
    }
    
    function saveData(e) {
        edData.length = 0;
        let jk = tableEditRows.length;
        for (j = 0; j < jk; j++) {
            let item = {};
            let row = tableEditRows[j];
            item.id_field = row.idField;
            let cells = row.getElementsByTagName('td');
            let ik = cells.length - 1;
            if (row.key_dat) {
                item.key = row.key_dat;
            }
            if (move) {
                ik--;
            }
            for (i = 1; i < ik; i++) {
                let elem = cells[i].firstElementChild;
                let i1 = i - 1;
                switch (elem.tagName) {
                    case "INPUT":
                        if (elem.type == "checkbox") {
                            item[edMeta[i1].name] = elem.checked;
                        } else {
                            item[edMeta[i1].name] = parseValue(elem.value, edMeta[i1].type);
                        }
                        break;
                    case "SELECT":
                        item[edMeta[i1].name] = elem.options[elem.selectedIndex].value;
                        break;
                    case "DIV":
                        if (elem.isSyst) {
                            item[edMeta[i1].name] = elem.innerHTML;
                        } else {
                            let elImg = elem.getElementsByTagName("img");
                            if (elImg != null && elImg.length > 0) {
                                elImg = elImg[0];
                                item[edMeta[i1].name] = elImg.srcElem;
                            }
                        }
                        break;
                    case "IMG":
                        item[edMeta[i1].name] = elem.srcElem;
                        break;
                }
            }
            if (row.system != null && row.system.length > 0) {
                item.system = row.system;
            }
            edData.push(item);
        }
        let closeW = true;
        if (edObrSave != null) {
            let cc;
            if (edObrSave.obrSaveEdit != null) {
                cc = edObrSave.obrSaveEdit(edData, dopEl);
            } else {
                cc = edObrSave(edData, dopEl);
            }
            if (cc != null && ! cc) {
                closeW = false;
            }
        }
        if (closeW) {
            closeWindEditData();
        }
    }
    
    function parseValue(value, type) {
        let res;
        switch (type) {
            case TYPE_INT:
                res = parseInt(value);
            case TYPE_FLOAT:
                res = parseFloat(value);
            default:
                return value;
        }
        if (isNaN(res)) {
            return value;
        } else {
            return res;
        }
    }
    
    function closeWindEditData() {
//        let el = edDomEl.parentElement;
//        el.parentNode.removeChild(el);
        
        
        let el_1 = edDomEl.closest('.dataWindow');
        if (el_1.panelFon != null) {
            el_1.panelFon.remove();
        }
        el_1.remove();
    }
}
