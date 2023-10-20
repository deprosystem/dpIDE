var clientCallBack;
var clientElement;
var notPicker = true;
var maxIndexColor;
var listColor;
var widthAlphaGrad;
var alphaHEX, alpha255, alphaProc;
var pickerColor;

var changeColor;
var colorWithoutAlpha;
var styleAlpha1 = "position: absolute; right: 5px; top: 200px; width: 310px; height: 10px; outline: 1px solid black; background: -moz-linear-gradient(left,";
var styleAlpha2 = "); background: -webkit-linear-gradient(left,";
var elementchangeNameColor;

function openPickerColor(colorInit, cb, el) {
    windSelectColor.style.display = 'block';
    clientCallBack = cb;
    clientElement = el;
    if (colorInit.length > 0) {
        var color = colorInit;
        if (colorInit.charAt(0) != "#") {
            color = rgb2hex(colorInit);
        }
        if (color.length > 7) {
            colorWithoutAlpha = color.substring(0, 7);
            alphaHEX = color.substring(7);
        } else {
            colorWithoutAlpha = color;
            alphaHEX = "ff";
        }
        pickerColor = colorWithoutAlpha + alphaHEX;
    } else {
        colorWithoutAlpha = "";
        alphaHEX = "ff";
        pickerColor = "";
    }
    old_color.style.backgroundColor = pickerColor;
    out_color.style.backgroundColor = pickerColor;
    out_color_text.innerHTML = pickerColor;
    let rgb = colorStrToRGB(pickerColor);
    out_color_rgb.innerHTML = rgb.r + ", " + rgb.g + ", " + rgb.b;
    var rectParent = alpha_pos.getBoundingClientRect();
    widthAlphaGrad = rectParent.right - rectParent.left;
    
    var alphaColor = pickerColor;
    var alphaPosition = widthAlphaGrad;
    alpha255 = parseInt(alphaHEX, 16);
    alphaProc = alpha255 / 255;
    alphaColor.innerHTML = "hex=" + alphaHEX + ", int=" + alpha255 + ", " + (alphaProc * 100).toFixed(1).replace(/\.?0*$/,'') + "%";
    alphaPosition = parseInt(widthAlphaGrad * alpha255 / 255);

    alphaGrad.style.cssText = styleAlpha1 + "#ffffff," + colorWithoutAlpha + styleAlpha2 + "#ffffff," + colorWithoutAlpha + ");";
    alpha_arrow.style.marginLeft = alphaPosition + px;
    if (notPicker) {
        picker.init(pickerColorCallBack, el);
        notPicker = false;
    }
}

function moveAlphaInd(event) {
    var x = event.pageX;
    var rectParent = alpha_pos.getBoundingClientRect();
    var parentX = rectParent.left;

    var rect = alpha_arrow.getBoundingClientRect();
    var x_block = rect.left - parentX;
    delta_x = x_block - x;
    document.onmousemove = dragAlphaInd;
    document.onmouseup = clearMove;
    event.stopPropagation();
}

function dragAlphaInd(event) {
    var x = event.pageX;
    var new_x = delta_x + x;
    if (new_x < 0) {
        new_x = 0;
    }
    if (new_x > widthAlphaGrad) {
        new_x = widthAlphaGrad;
    }
    alphaProc = new_x / widthAlphaGrad;
    alpha255 = parseInt(alphaProc * 255);
    alphaHEX = strToHex("" + alpha255);
    alphaColor.innerHTML = "hex=" + alphaHEX + ", int=" + alpha255 + ", " + (alphaProc * 100).toFixed(1).replace(/\.?0*$/,'') + "%";

    pickerColor = colorWithoutAlpha + alphaHEX;
    out_color.style.backgroundColor = pickerColor;
    out_color_text.innerHTML = pickerColor;
    alpha_arrow.style.marginLeft = new_x + "px";
}

function pickerColorCallBack(colorInit, el) {
    colorWithoutAlpha = rgb2hex(colorInit);
    pickerColor = colorWithoutAlpha + alphaHEX;
    out_color.style.backgroundColor = pickerColor;
    out_color_text.innerHTML = pickerColor;
    rgbInt(colorInit);
    alphaGrad.style.cssText = styleAlpha1 + "#ffffff," + colorWithoutAlpha + styleAlpha2 + "#ffffff," + colorWithoutAlpha + ");";
}

function rgbInt(rgb) {
    let sr1 = rgb.indexOf("(");
    let sr2 = rgb.indexOf(")");
    let arColor = rgb.substring(sr1 + 1, sr2).split(",");
    out_color_rgb.innerHTML = arColor[0] + ", " + arColor[1] + ", " + arColor[2];
}

function rgb2hex(rgb){
    var sr1 = rgb.indexOf("(");
    var sr2 = rgb.indexOf(")");
    var arColor = rgb.substring(sr1 + 1, sr2).split(",");
    if (arColor.length < 4) {
        return "#" + strToHex(arColor[0]) + strToHex(arColor[1]) + strToHex(arColor[2]);
    } else {
        return "#" + strToHex(arColor[0]) + strToHex(arColor[1]) + strToHex(arColor[2]) + strToHex(arColor[3]);
    }
}

function strToHex(str) {
if (str == undefined) {
    return "00";
}
    var st = str.trim();
    var h;
    if (st.indexOf('.') > -1) {
        h = parseFloat(st);
        h = parseInt(h * 255).toString(16);
    } else {
        h = parseInt(st).toString(16);
    }
    if (h.length == 1) {
        h = "0" + h;
    }
    return h;
}

function setPickerColorResulr() {
    if (isSystemChange) {
        changeColor.style.backgroundColor = pickerColor;
        var ind = changeColor.id.substring(changeColor.id.indexOf("_") + 1);
        var ik = listColor.length;
        for (var i = 0; i < ik; i ++) {
            var item = listColor[i];
            if (item.itemId == ind) {
                item.itemValue = pickerColor;
                break;
            }
        };
        setSignColorChange();
        isSystemChange = false;
        hideDefaultColor.style.display = "none";
        hideColorList.style.display = "none";
    } else {
        var ind = getIndColor(pickerColor);
        if (ind > 0) {
            clientCallBack(ind, pickerColor);
        } else {
            var item = {};
            maxIndexColor ++;
            item.itemId = maxIndexColor;
            item.itemName = "color_" + item.itemId;
            item.itemValue = pickerColor;
            listColor.push(item);
            addNewColor(item);
            clientCallBack(item.itemId, pickerColor);
        }
    }
}

function addNewColor(item) {
    var str = '<div class="rowListColor"><div oncontextmenu="changeNameColor(this);return false;" class="nameColor"'
                    +' style="cursor: text;">' + item.itemName + '</div><div id="ListColorId_' + item.itemId 
                    + '" class="oneColorDef" onclick="setSystemColor(this)" oncontextmenu="changeSystemColor(this);return false;" style="background:' 
                    + item.itemValue + '"></div></div>';
    var elColor = createNewColor(str);
    listColorView.appendChild(elColor);
    setSignColorChange();
}

function createNewColor(str) {
    var container = document.createElement('div')
    container.innerHTML = str;
    return container.firstChild
}

function getIndColor(color) {
    var ik = listColor.length;
    for (var i = 0; i < ik; i ++) {
        var item = listColor[i];
        if (item.itemValue == color) {
            return item.itemId;
        }
    };
    return -1;
}

function setSystemColor(el) {
    var ind = el.id.substring(el.id.indexOf("_") + 1);
//    clientCallBack(ind, el.style.backgroundColor);
    clientCallBack(ind, findColorByIndex(ind));
}

function changeSystemColor(el) {
    event.preventDefault();
    isSystemChange = true;
    changeColor = el;
    hideColorList.style.display = "block";
    hideDefaultColor.style.display = "block";
//    return false;
}

function setPickerColor() {
    openPickerColor(bg_color.style.backgroundColor, setBackgroundColor);
}

function setPickerToolTextColor() {
    openPickerColor(text_color.style.backgroundColor, setToolTextColor);
}

function setPickerEditTextColor() {
    openPickerColor(edittext_color.style.backgroundColor, setEditTextColor);
}

function setBorderColor() {
    openPickerColor(colorBorder.style.backgroundColor, setBorderNewColor);
}

function setBorderNewColor(id, color) {
    tempDrawable.bordedColor = id;
    colorBorder.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    funcCallBack();
//    viewCompon();
}

var setBackgroundColor = function (id, color) {
    paramCompon.background = id;
    bg_color.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

var setToolTextColor = function (id, color) {
    paramCompon.textColor = id;
    tool_text_color.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

var setEditTextColor = function (id, color) {
    paramCompon.textColor = id;
    edittext_color.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function findColorByIndex(ind) {
    let ik = listColor.length;
    for (let i = 0; i < ik; i ++) {
        let item = listColor[i];
        if (item.itemId == ind) {
            return item.itemValue;
        }
    };
    return "";
}

function findColorByName(name) {
    var ik = listColor.length;
    for (var i = 0; i < ik; i ++) {
        var item = listColor[i];
        if (item.itemName == name) {
            return item.itemValue;
        }
    };
    return "";
}

function setListColor() {
    isColorChange = false;
    let strListColor = "";
    let ik = listColor.length;
    maxIndexColor = 99;
    for (let i = 0; i < ik; i ++) {
        let item = listColor[i];
        if (item.itemId < 100) {
            let ppp = document.getElementById("presetColor_" + item.itemId);
            if (ppp != null) {
                ppp.style.backgroundColor = item.itemValue;
            }
        } else {
            if (maxIndexColor < item.itemId) {
                maxIndexColor = item.itemId;
            }
            strListColor += '<div class="rowListColor"><div oncontextmenu="changeNameColor(this,' + i + ');return false;" class="nameColor"'
                    +' style="cursor: text;">' + item.itemName + '</div><div id="ListColorId_' + item.itemId 
                    + '" class="oneColorDef" onclick="setSystemColor(this)" oncontextmenu="changeSystemColor(this);return false;" style="cursor: pointer;background:' 
                    + item.itemValue + '"></div></div>' ;
        }
    }
    listColorView.innerHTML = strListColor;
}

function changeNameColor(el, i) {
    event.stopPropagation();
    let wind = formWind(300, 180, 40, -920, "Change name color")
    wind.innerHTML = '<div style="float: left; margin-top: 10px;margin-left:10px;"> <div style="float: left; width: 100px;">Old name</div><div style="float: left; margin-left:8px" >' + el.innerHTML + '</div></div>'
        +'<div style="float: left; margin-top: 10px;margin-left:10px;"> <div style="float: left; width: 100px;margin-top:4px;">New name</div><input class="input_style" style="float: left; margin-left:5px" type="text" size="24"/></div>';
    elementchangeNameColor = el;
    
    let footer = createFooter(50);
    wind.appendChild(footer);
    let buttonOk = createButtonBlue('Ok', 70);
    buttonOk.addEventListener("click", function(){changeName(wind, i);}, true);
    footer.appendChild(buttonOk);
    let buttonCancel = createButtonWeite('Cancel', 70);
    buttonCancel.addEventListener("click", function(){closeWindow(wind);}, true);
    footer.appendChild(buttonCancel);
}

function changeName(el, i) {
    setSignColorChange();
    let par = el.parentElement;
    let newName = par.getElementsByTagName("input")[0].value;
    listColor[i].itemName = newName;
    elementchangeNameColor.innerHTML = newName;
    closeWindow(el);
}

function closeWindColor() {
    windEditForm.style.display = "none";
}

function setSignColorChange () {
    isColorChange = true;
    setSignChanges();
}

function cancelSelectColor() {
    if (isSystemChange) {
        isSystemChange = false;
        hideDefaultColor.style.display = "none";
        hideColorList.style.display = "none";
    } else {
        windSelectColor.style.display = 'none';
    }
}



