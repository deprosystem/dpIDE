var selectItemInMenuB;
var elementChangeColor;
function uiMenuBottom() {
    let uiParamView = 
    '<div style="float: left;clear: both;margin-top: 16px;width:100%;padding-bottom:5px;border-top: 1px solid #1DACEf;border-bottom: 1px solid #1DACEf;">'
        +'<div style="float: left;color: #8199A;margin-top: 8px;5">Colors</div> '
        +'<div style="margin-top: 5px;float: left;clear:both">'
            +'<div class="text_style_ui">Normal</div>'
            +'<div class="text_norm" onclick="changeNormColorMenuB(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>'
        +'<div style="margin-top: 5px;float: left;margin-left:10px">'
            +'<div class="text_style_ui">Selected</div>'
            +'<div class="text_sel" onclick="changeSelColorMenuB(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>'
        +'<div style="margin-top: 5px;float: left;margin-left:10px">'
            +'<div class="text_style_ui">Enabled</div>'
            +'<div class="text_enabl" onclick="changeEnablColorMenuB(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>'
        +'<div style="margin-top: 5px;float: left;margin-left:10px">'
            +'<div class="text_style_ui">Badge</div>'
            +'<div class="text_badge" onclick="changeBadgeMenuB(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>'
    +'</div>'
    +'<div style="float: left;clear: both;margin-top: 10px;width:100%;padding-bottom:5px;border-bottom: 1px solid #1DACEf;">'
        +'<div style="float: left;color: #8199A;">Selected</div> '
        +'<div style="float: left;clear:both">'
            +'<div style="font-size:10px;color:#2228">Zoom</div>'
            +'<img class="check_sel_zoom" onclick="checkZoomMenuB(this);" style="cursor:pointer;margin-top:7px;margin-left:8px" width="16" height="16" src="img/check-act.png">'
        +'</div>'
        +'<div style="float: left;margin-left:10px">'
            +'<div style="font-size:10px;color:#2228">Change color</div>'
            +'<img class="check_change_color" onclick="checkColorMenuB(this);" style="cursor:pointer;margin-top:7px;margin-left:14px" width="16" height="16" src="img/check-act.png">'
        +'</div>'
        +'<div style="margin-left: 10px;float: left;">'
            +'<div class="text_style_ui">Drawable</div> '
            +'<div onclick="chooseDrawableMenuB()" style="cursor: pointer;width: 60px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;background: #1DACE9">'
                +'<div style="color: #fff;text-align: center;margin-top: 6px">choose</div>'
            +'</div>'
            +'<div onclick="editDrawableMenuB()" style="margin-lefn:10px;cursor:pointer;width: 70px; margin-left:10px;height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;background: #1DACE9">'
                +'<div style="color: #fff;text-align: center;margin-top: 6px;">edit / new</div>'
            +'</div>'
        +'</div>'
    +'</div>'
    +'<div style="float:left;clear: both;margin-top: 10px;"><div style="color:#2228;font-size: 10px;margin-left:4px">Image location</div>'
        +'<select class="location select_' + browser + '" onchange="changeImageLocation(this)" style="width:60px;font-size:12px;color:#110000;"><option>top</option><option>left</option></select>'
    +'</div>';
            
    this.setElementUI = function(p, newEl, parent) {
        let typeEl = createDivMenuB();
        newEl.appendChild(typeEl);
        let myCompon = myComponentDescr(p.componId);
        if (myCompon != null) {
            let menuList = myCompon.model.menuList.list;
            if (menuList != null) {
                let colorSet = p.colorSet;
                showMenuB(menuList, typeEl, colorSet);
            }
        };
    }
    
    this.viewElementUI = function(p, newEl) {
        let myCompon = myComponentDescr(p.componId);
        let typeEl = newEl.getElementsByClassName("menu_b")[0];
        if (myCompon != null) {
            let menuList = myCompon.model.menuList.list;
            if (menuList != null) {
                let colorSet = p.colorSet;
                showMenuB(menuList, typeEl, colorSet);
            }
        };
    }
    
    this.newElementUI = function(p) {
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = uiParamView;
        setMenuBAttr(p);
    }
    
    this.getHelpLink = function() {
        return "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.z5su4efsh9rh";
    }
}

function setMenuBAttr(p) {
    let item = p.colorSet;
    let colorTxt = contentAttributes.getElementsByClassName("text_norm")[0];
    colorTxt.style.backgroundColor = findColorByIndex(item.textColor);
    colorTxt = contentAttributes.getElementsByClassName("text_sel")[0];
    colorTxt.style.backgroundColor = findColorByIndex(item.textSelect);
    colorTxt = contentAttributes.getElementsByClassName("text_enabl")[0];
    colorTxt.style.backgroundColor = findColorByIndex(item.enabledColor);
    colorTxt = contentAttributes.getElementsByClassName("text_badge")[0];
    colorTxt.style.backgroundColor = findColorByIndex(item.badgeColor);
    colorTxt = contentAttributes.getElementsByClassName("check_sel_zoom")[0];
    if (item.toAnimate) {
        colorTxt.src = "img/check-sel_1.png";
    } else {
        colorTxt.src = "img/check-act.png";
    }
    colorTxt = contentAttributes.getElementsByClassName("check_change_color")[0];
    if (item.changeColor) {
        colorTxt.src = "img/check-sel_1.png";
    } else {
        colorTxt.src = "img/check-act.png";
    }
    let location = contentAttributes.getElementsByClassName("location")[0];
    location.value = item.location;
}

function showMenuBNoParam() {
    let myCompon = myComponentDescr(currentElement.android.componId);
    let dat = myCompon.model.menuList.list;
    let typeEl = currentElement.getElementsByClassName("menu_b")[0];
    let colorSet = currentElement.android.colorSet;
    showMenuB(dat, typeEl, colorSet);
}

function changeNormColorMenuB(el) {
    elementChangeColor = el;
    openPickerColor(el.style.backgroundColor, setNormColorMenuB);
}

function setNormColorMenuB(id, color) {
    currentElement.android.colorSet.textColor = id;
    elementChangeColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    showMenuBNoParam();
}

function changeSelColorMenuB(el) {
    elementChangeColor = el;
    openPickerColor(el.style.backgroundColor, setSelColorMenuB);
}

function setSelColorMenuB(id, color) {
    currentElement.android.colorSet.textSelect = id;
    elementChangeColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    showMenuBNoParam();
}

function changeEnablColorMenuB(el) {
    elementChangeColor = el;
    openPickerColor(el.style.backgroundColor, setEnablColorMenuB);
}

function setEnablColorMenuB(id, color) {
    currentElement.android.colorSet.enabledColor = id;
    elementChangeColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    showMenuBNoParam();
}

function changeBadgeMenuB(el) {
    elementChangeColor = el;
    openPickerColor(el.style.backgroundColor, setBadgeMenuB);
}

function setBadgeMenuB(id, color) {
    currentElement.android.colorSet.badgeColor = id;
    elementChangeColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    showMenuBNoParam();
}

function checkZoomMenuB(el) {
    currentElement.android.colorSet.toAnimate = checkElement(el);
}

function checkColorMenuB(el) {
    currentElement.android.colorSet.changeColor = checkElement(el);
}

function editDrawableMenuB() {
    if (selectItemInMenuB != null) {
        editDrawable(showMenuBNoParam, currentElement.android.colorSet);
    }
}

function chooseDrawableMenuB() {
    if (selectItemInMenuB != null) {
        chooseDrawable(showMenuBNoParam, currentElement.android.colorSet);
    }
}

function changeImageLocation(el) {
    currentElement.android.colorSet.location = el.options[el.selectedIndex].value;
    showMenuBNoParam();
}

