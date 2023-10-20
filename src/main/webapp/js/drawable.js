var tempDrawable;
var savedIdBackground;
var pppp;
var positionGrad = ["", "to top", "to top right", "to right", "to bottom right"];
var listDrawable;
var maxIndexDrawable;
var funcCallBack;

function editDrawableForElement() {
    editDrawable(viewCompon, currentElement.android);
}

function chooseDrawableForElement() {
    chooseDrawable(viewCompon, currentElement.android);
}

function editDrawable(fCB, p) {
    let idDr = '<div style="padding-bottom:12px;border-bottom:1px solid #1DACEf;"><div class="text_style_ui">Id</div>\n\
        <input class="input_style_ui" onkeydown="return validName(event)" type="text"></div>';
    let radius1 = '<div style="width: 100%;padding-bottom: 5px;float: left;clear: both;padding-bottom:12px;margin-top: 12px;border-bottom: 1px solid #1DACEf;">\n\
            <div style="width: 100%;float: left;">\n\
                <div class="text_style_ui" style="float: left;">Corners</div>\n\
                <div onclick="cornersAllClear(this)" style="float: right;color: #1DACE9;font-size: 10px;cursor: pointer">Clear</div></div>';
    let radius2 = '<div id="listCorners" style="margin-left:8px;float:left; margin-top:5px">\n\
                <div onclick="setCorners(this)" class="el_marg_pad" >2</div> \n\
                <div onclick="setCorners(this)" class="el_marg_pad">4</div> \n\
                <div onclick="setCorners(this)" class="el_marg_pad">8</div> \n\
                <div onclick="setCorners(this)" class="el_marg_pad">10</div> \n\
                <div onclick="setCorners(this)" class="el_marg_pad">12</div> \n\
                <div onclick="setCorners(this)" class="el_marg_pad">16</div> \n\
                <div onclick="setCorners(this)" class="el_marg_pad">20</div> \n\
                <div onclick="setCorners(this)" class="el_marg_pad">24</div>\n\
                <div onclick="setCorners(this)" class="el_marg_pad">h/2</div>\n\
                </div>';
    let rectInp = '<div style="width:158px;height:80px;position:relative;margin-top:10px;float: left;clear:both">\n\
        <div style="border:2px solid #1DACEf;position:absolute;left:20px;top:12px;right:20px;bottom:12px;"></div></div>';
    let bord = '<div style="width: 100%;float: left;clear: both;padding-bottom:12px;margin-top: 12px;border-bottom: 1px solid #1DACEf;"> \n\
            <div style="float: left;width:100%"> \n\
                <div class="text_style_ui" style="float: left;">Border</div> \n\
                <div onclick="borderClear(this)" style="float: right;color: #1DACE9;font-size: 10px;cursor: pointer">Clear</div> \n\
            </div> \n\
            <div onclick="styleBorderSol()" style="margin-top: 5px;float: left;clear:both"> \n\
                <div class="text_style_ui">Solid</div> \n\
                <div id="stBordSol" class="solid" style="cursor: pointer;position:relative;width: 30px; height: 30px; float: left; border: 2px solid #bbd4ef;border-radius:5px;">\n\
                    <div id="indBordSol" style="position:absolute;width:20px;height:20px;border-radius:10px;background-color:#deeaff;left:5px;top:5px"></div>\n\
                </div> \n\
            </div> \n\
            <div onclick="styleBorderDash()" style="margin-top: 5px;float: left;margin-left:10px"> \n\
                <div class="text_style_ui">Dotted</div> \n\
                <div id="stBordDash" class="dotted" style="cursor: pointer;position:relative;width: 30px; height: 30px; float: left; border: 2px dashed #bbd4ef;border-radius:5px;">\n\
                    <div id="indBordDash" style="display:none;position:absolute;width:20px;height:20px;border-radius:10px;background-color:#deeaff;left:5px;top:5px"></div>\n\
                </div> \n\
            </div> \n\
            <div style="margin-top: 5px;float: left;margin-left:10px">\n\
                <div class="text_style_ui">Color</div>\n\
                <div id="colorBorder" class="text_sel" onclick="setBorderColor(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>\n\
            </div>\n\
        </div>';
    let bordWidth = '<div style="margin-top: 5px;float: left;margin-left:10px">\n\
                <div class="text_style_ui">Width</div>\n\
            </div>';
    let backGr = '<div style="width: 100%;float: left;clear: both;margin-top: 12px;"> \n\
            <div style="float: left;width:100%"> \n\
                <div class="text_style_ui" style="float: left;">Background</div> \n\
                <div onclick="setGradient(0)" style="float: right;color: #1DACE9;font-size: 10px;cursor: pointer">Clear</div> \n\
            </div> \n\
            <div onclick="setColorDrawable_1()" style="cursor: pointer; margin-top: 5px;float: left"> \n\
                <div class="text_style_ui">Color</div>  \n\
                <div id="colorDraw_1" style="width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div> \n\
            </div> \n\
            <div onclick="changeColorDrawable()" style="cursor: pointer; margin-top:20px;float: left;width:20px;height:20px;position:relative;margin-left:2px">\n\
                <img src="img/arrow_rigth.png" style="float:left;width:18px;height:8px;position:absolute;top:7px">\n\
                <img src="img/arrow_left.png" style="float:left;width:18px;height:8px;position:absolute;top:7px">\n\
            </div>\n\
            <div onclick="setColorDrawable_2()" style="cursor: pointer; margin-top: 5px;float: left;"> \n\
                <div class="text_style_ui">Color 2</div>  \n\
                <div id="colorDraw_2" style="width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div> \n\
            </div> \n\
            <div style="margin-top: 5px;float: left;margin-left:5px;">'
                +'<div class="text_style_ui">Gradient</div>'
                +'<div id="gradientDraw" style="float: left;margin-top:5px">\n\
                    <img onclick="setGradient(0)" src="img/x_blue.png" style="cursor: pointer;float:left;width:18px;height:18px;">\n\
                    <img onclick="setGradient(1)" src="img/arrow_top.png" style="cursor: pointer;float:left;margin-left:9px;width:12px;height:17px;">\n\
                    <img onclick="setGradient(2)" src="img/arrow_top_rigth.png" style="cursor: pointer;float:left;margin-left:9px;width:16px;height:16px;margin-top:2px">\n\
                    <img onclick="setGradient(3)" src="img/arrow_rigth.png" style="cursor: pointer;float:left;margin-left:9px;width:18px;height:12px;margin-top:5px">\n\
                    <img onclick="setGradient(4)" src="img/arrow_bottom_rigth.png" style="cursor: pointer;float:left;margin-left:9px;width:16px;height:16px;margin-top:2px">\n\
                </div> \n\
            </div> \n\
        </div>';
    let wind = formWind(250, 500, 40, -400, "Drawable", null, "drawableCanc");
    let divDraw = document.createElement('div');
    wind.appendChild(divDraw);
    divDraw.style.cssText = "position:absolute;top:12px;left:12px;right:12px;bottom:50px";
    divDraw.appendChild(newDOMelement(idDr));
    let rr = newDOMelement(radius1);
    divDraw.appendChild(rr);

    let nn = createNumber(40, 24, 0, 100, "changeCornersRadius");
    nn.style.float = "left";
    nn.style.clear = "both";
    nn.style.marginTop = "5px";
    setNumberInputId(nn, "radiusCorners");
    rr.appendChild(nn);
    rr.appendChild(newDOMelement(radius2));
    let ri = newDOMelement(rectInp);
    rr.appendChild(ri);
    let nnLT = createNumber(40, 24, 0, 100, "changeRadius");
    nnLT.style.position = "absolute";
    setNumberInputId(nnLT, "radiusLT");
    ri.appendChild(nnLT);
    let nnRT = createNumber(40, 24, 0, 100, "changeRadius");
    nnRT.style.position = "absolute";
    nnRT.style.right = "0";
    setNumberInputId(nnRT, "radiusTR");
    ri.appendChild(nnRT);
    
    let nnLB = createNumber(40, 24, 0, 100, "changeRadius");
    nnLB.style.position = "absolute";
    nnLB.style.bottom = "0";
    setNumberInputId(nnLB, "radiusBL");
    ri.appendChild(nnLB);
    let nnRB = createNumber(40, 24, 0, 100, "changeRadius");
    nnRB.style.position = "absolute";
    nnRB.style.right = "0";
    nnRB.style.bottom = "0";
    setNumberInputId(nnRB, "radiusRB");
    
    ri.appendChild(nnRB);
    let bordV = newDOMelement(bord);
    divDraw.appendChild(bordV);
    let bordW = newDOMelement(bordWidth);
//    setNumberInputId(bordW, "widthBorder");
    bordV.appendChild(bordW);
    nn = createNumber(40, 24, 0, 30, "changeWidthBorder");
    nn.style.marginTop = "3px";
    setNumberInputId(nn, "widthBorder");
    bordW.appendChild(nn);
    divDraw.appendChild(newDOMelement(backGr));

    let footer = createFooter(50);
    wind.appendChild(footer);
    let buttonOk = createButtonBlue('Ok', 70);
    buttonOk.addEventListener("click", function(event){drawableOk();closeWindow(wind);}, true);
    footer.appendChild(buttonOk);
    let buttonCancel = createButtonWeite('Cancel', 70);
    buttonCancel.addEventListener("click", function(event){closeWindow(wind);drawableCanc();}, true);
    footer.appendChild(buttonCancel);
    funcCallBack = fCB;
    savedIdBackground = p.background;
    pppp = p;
    tempDrawable = null;
    if (savedIdBackground > 999 && savedIdBackground < 1999) {
        tempDrawable = JSON.parse(findDrawableByIndex(savedIdBackground));
    }
    if (tempDrawable == null) {
        tempDrawable = newDrawable();
    }
    p.background = 1999;
    radiusLT.value = tempDrawable.corners.lt;
    radiusTR.value = tempDrawable.corners.tr;
    radiusRB.value = tempDrawable.corners.rb;
    radiusBL.value = tempDrawable.corners.bl;
    colorBorder.style.backgroundColor = findColorByIndex(tempDrawable.bordedColor);
    widthBorder.value = tempDrawable.border;
    if (tempDrawable.borderStyle == "solid") {
        indBordSol.style.display = "block";
        indBordDash.style.display = "none";
    } else {
        indBordSol.style.display = "none";
        indBordDash.style.display = "block";        
    }
    colorDraw_1.style.backgroundColor = findColorByIndex(tempDrawable.color_1);
    colorDraw_2.style.backgroundColor = findColorByIndex(tempDrawable.color_2);
    setGradientView(tempDrawable.gradient);
}

function setNumberInputId(el, id) {
    let inp = el.getElementsByTagName("input")[0];
    inp.id = id;
}

function newDrawable() {
    var tD = {};
    tD.corners = {"lt" : 0, "tr" : 0, "rb" : 0, "bl" : 0};
    tD.type = "rectangle";
    tD.border = 0;
    tD.borderStyle = "solid";
    tD.bordedColor = 3;
    tD.color_1 = 0;
    tD.color_2 = -1;
    tD.gradient = 0;
    return tD;
}

function setCorners(el) {
    cornersClear(el);
    el.style.backgroundColor = fonSel;
    let vv = el.innerHTML;
    let value;
    if (vv == 'h/2') {
        let p = currentElement.android;
        let h = p.height;
        if (h > 0) {
            value = parseInt(h/2 + 0.5);
        } else {
            value = 0;
        }
    } else {
        if (vv == "") {
            value = 0;
        } else {
            value = parseInt(vv);
        }
    }
    radiusCorners.value = value;
    radiusLT.value = value;
    radiusTR.value = value;
    radiusRB.value = value;
    radiusBL.value = value;
    tempDrawable.corners = {"lt" : value, "tr" : value, "rb" : value, "bl" : value};
    funcCallBack();
}

function cornersClear(el) {
    let ch = listCorners.children;
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        let item = ch[i];
        if (item == el) {
            item.style.backgroundColor = fonSel;
        } else {
            item.style.backgroundColor = "";
        }
    }
}

function changeCornersRadius(el) {
    cornersClear(null);
    var value = el.value;
    radiusLT.value = value;
    radiusTR.value = value;
    radiusRB.value = value;
    radiusBL.value = value;
    tempDrawable.corners = {"lt" : value, "tr" : value, "rb" : value, "bl" : value};
    funcCallBack();
}

function changeRadius(el) {
    switch (el.id) {
        case "radiusLT":
            tempDrawable.corners.lt = el.value;
            break;
        case "radiusTR":
            tempDrawable.corners.tr = el.value;
            break;
        case "radiusRB":
            tempDrawable.corners.rb = el.value;
            break;
        case "radiusBL":
            tempDrawable.corners.bl = el.value;
            break;
    }
    funcCallBack();
}

function changeWidthBorder(el) {
    tempDrawable.border = el.value;
    funcCallBack();
}

function borderClear() {
    widthBorder.value = "";
    tempDrawable.border = "";
    funcCallBack();
}

function cornersAllClear(el) {
    cornersClear(null);
    let value = "";
    radiusCorners.value = value;
    radiusLT.value = value;
    radiusTR.value = value;
    radiusRB.value = value;
    radiusBL.value = value;
    tempDrawable.corners = {"lt" : 0, "tr" : 0, "rb" : 0, "bl" : 0};
    funcCallBack();
}

function setCornersDom(el, lt, tr, rb, bl) {
    el.style.borderRadius = lt + px + " " + tr + px + " " + rb + px + " " + bl + px;
}

function clearBackgroundDraw(el) {
    let drawEl = getChildrenByClassName(el, 'drawableBackground');
    if (drawEl != null) {
        el.removeChild(drawEl[0]);
    }
}

function setDrawableEl(el, draw) {
    if (draw == null) return;
    let drawEl = el.firstChild;
    if (drawEl == null || drawEl.className != 'drawableBackground') {
        drawEl = createDrawableEl();
        el.insertBefore(drawEl, el.firstChild);
    }
    setDrawable(drawEl, draw);
}

function setDrawable(drawEl, draw) {
    if (draw.gradient == 0) {
        drawEl.style.backgroundColor = findColorByIndex(draw.color_1);
    } else {
        var gradEnd = "linear-gradient(" + positionGrad[draw.gradient] + "," + findColorByIndex(draw.color_1) + "," +
                findColorByIndex(draw.color_2) + ")";
        drawEl.style.background = "-webkit-" + gradEnd;
        drawEl.style.background = "-moz-" + gradEnd;
        drawEl.style.background = "-o-" + gradEnd;
    }
    if (draw.border > 0) {
        var colorBord = findColorByIndex(draw.bordedColor);
        if (colorBord.length > 7) {
            colorBord = colorBord.substring(0, 7);
        }
        drawEl.style.border = (draw.border * MEASURE) + px + " " + draw.borderStyle + " " + colorBord;
    } else {
        drawEl.style.border = "";
    }
    var corners = draw.corners;
    if (corners != undefined) {
        setCornersDom(drawEl, corners.lt * MEASURE, corners.tr * MEASURE, corners.rb * MEASURE, corners.bl * MEASURE);
    }
}

function createDrawableEl() {
    var container = document.createElement('div')
    container.innerHTML = '<div class="drawableBackground"></div>'
    return container.firstChild
}

function styleBorderSol() {
    indBordSol.style.display = "block";
    indBordDash.style.display = "none";
    tempDrawable.borderStyle = "solid";
    funcCallBack();
}

function styleBorderDash() {
    indBordSol.style.display = "none";
    indBordDash.style.display = "block";
    tempDrawable.borderStyle = "dashed";
    funcCallBack();
}

function setGradient(num) {
    setGradientView(num);
    tempDrawable.gradient = num;
    funcCallBack();
}

function setGradientView(num) {
    var imgs = document.getElementById("gradientDraw").getElementsByTagName("img");
    var ik = imgs.length;
    for (var i = 0; i < ik; i++) {
        if (i == num) {
            imgs[i].style.backgroundColor = fonSel;
        } else {
            imgs[i].style.backgroundColor = "";
        }
    }
}

function drawableOk() {
    maxIndexDrawable ++;
    var item = {};
    item.itemId = maxIndexDrawable;
    item.itemName = "shape_"+maxIndexDrawable;
    item.itemValue = JSON.stringify(tempDrawable);
    listDrawable.push(item);
    pppp.background = maxIndexDrawable;
    isDrawableChange = true;
    funcCallBack();
}

function drawableCanc() {
    pppp.background = savedIdBackground;
    funcCallBack();
}

function chooseDrawable(fCB, p) {
    funcCallBack = fCB;
    pppp = p;
    let wind = formWind(220, 400, 40, -350, "Choose Drawable");
    let divList = document.createElement('div');
    wind.appendChild(divList);
    divList.style.cssText = "position:absolute;top:12px;left:12px;right:12px;bottom:50px";
    let footer = createFooter(50);
    wind.appendChild(footer);
    let buttonCancel = createButtonWeite('Cancel', 70);
    buttonCancel.addEventListener("click", function(event){closeWindow(wind)}, true);
    footer.appendChild(buttonCancel);
    var ik = listDrawable.length;
    for (var i = 0; i < ik; i++) {
        var item = listDrawable[i];
        var itemView = newItemListDraw(item, i);
        var itemDraw = itemView.getElementsByClassName("itemDraw")[0];
//console.log("itemValue="+item.itemValue+"<<");

        setDrawable(itemDraw, JSON.parse(item.itemValue));
        divList.appendChild(itemView);
    }
}

function selectedDrawable(el, i) {
    var item = listDrawable[i];
    pppp.background = item.itemId;
    closeWindow(el);
    funcCallBack();
//    viewCompon();
}

function newItemListDraw(item, i) {
    var container = document.createElement('div')
    container.innerHTML = '<div onclick="selectedDrawable(this,' + i + ')" class="itemDrawView" style="padding-bottom: 5px;clear: both; float: left;width:100%">' 
            + '<div style="float: left;">' + item.itemName 
            + '</div><div class="itemDraw" style="float: left; margin-left: 10px;height: 35px; width: 70px;"></div>'
            +'<img onclick="del_drawable(this,' + i +')" style="float:right;cursor:pointer;" width="18" height="18" src="img/close-o.png">'
        +'</div>'
    return container.firstChild;
}

function del_drawable(el, i) {
    listDrawable.splice(i);
    let item = el.parentElement;
    item.parentNode.removeChild(item);
    isDrawableChange = true;
}
/*
function setListDrawable() {
    
}
*/
function findDrawableByIndex(ind) {
    var ik = listDrawable.length;
    for (var i = 0; i < ik; i ++) {
        var item = listDrawable[i];
        if (item.itemId == ind) {
            return item.itemValue;
        }
    };
    return null;
}

function setMaxIndexDrawable() {
    maxIndexDrawable = 999;
    var ik = listDrawable.length;
    for (var i = 0; i < ik; i ++) {
        var ld = listDrawable[i];
        if (maxIndexDrawable < ld.itemId) {
            maxIndexDrawable = ld.itemId;
        }
    }
}

function setColorDrawable_1() {
    openPickerColor(colorDraw_1.style.backgroundColor, setColorDraw_1);
}

function setColorDrawable_2() {
    openPickerColor(colorDraw_2.style.backgroundColor, setColorDraw_2);
}

function setColorDraw_1(id, color) {
    tempDrawable.color_1 = id;
    colorDraw_1.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    funcCallBack();
}

function setColorDraw_2(id, color) {
    tempDrawable.color_2 = id;
    colorDraw_2.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    funcCallBack();
}

function changeColorDrawable() {
    let id = tempDrawable.color_1;
    let color = colorDraw_1.style.backgroundColor
    tempDrawable.color_1 = tempDrawable.color_2;
    colorDraw_1.style.backgroundColor = colorDraw_2.style.backgroundColor;
    tempDrawable.color_2 = id;
    colorDraw_2.style.backgroundColor = color;
    funcCallBack();
}
