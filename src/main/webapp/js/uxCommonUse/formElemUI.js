function formElement(item, toRightOf, namePrev, topM, leftM) {
    let txtView;
    let p = {};
    switch (item.type) {    // Text,Img,Int,Float,Time
        case "Timestamp":
        case "Date":
        case "Text":
        case "Expresion":
            txtView = formTxt(item);
            p = txtView.android;
            break;
        case "Img":
            txtView = formImg(item);
            p = txtView.android;
            p.width = 30;
            p.height = 30;
            p.src = "img/picture.png";
            break;
        case "Int":
            txtView = formTxt(item);
            p = txtView.android;
            if (item.format != null && item.format.length > 0) {
                p.componParam = {type:3, formatNum:item.format};
            }
            break;
        case "Float":
            txtView = formTxt(item);
            p = txtView.android;
            if (item.format != null && item.format.length > 0) {
                p.componParam = {type:3, formatNum:item.format};
            }
            break;
        case "Boolean":
            if (item.edit != null && item.edit == "checkBox") {
                txtView = formCheck(item);
                p = txtView.android;
            } else {
                txtView = formTxt(item);
                p = txtView.android;
            }
            break;
        case "Time":
            txtView = formTxt(item);
            p = txtView.android;
            if (item.format != null && item.format.length > 0) {
                p.componParam = {type:3, formatTime:item.format};
            }
            break;
        case "Gallery":
            txtView = formGallery(item);
            p = txtView.android;
            p.width = MATCH;
            p.height = 230;
            p.rightMarg = 12;
            p.src = "img/picture.png";
            p.componParam = {type:8};
            p.componParam.bindEl = "ind_" + item.name;
            let curr = currentElement;
            let ind = formIndicator(item);
            currentElement.android.viewElement = currentElement;
            ind.android.topMarg = 210;
            if (namePrev != "") {
                ind.android.below = namePrev;
            }
            currentElement = curr;
            break;
        case "Select":
            if (item.edit != null && item.edit == "spinner") {
                txtView = formSpinner(item);
                p = txtView.android;
            } else {
                txtView = formTxt(item);
                p = txtView.android;
            }
            break;
        case "Check":
            if (item.edit != null && item.edit) {
                txtView = formCheck(item);
                p = txtView.android;
            } else {
                txtView = formTxt(item);
                p = txtView.android;
            }
            break;
    }
    currentElement.android.viewElement = currentElement;
    if (namePrev != "") {
        p.below = namePrev;
    }
    if (topM != null && topM != 0) {
        p.topMarg = topM;
    }
    if (leftM != null) {
        p.leftMarg = leftM;
    } else {
        p.leftMarg = 12;
    }
    if (toRightOf != "") {
        p.toRightOf = toRightOf;
    }
}

function formDivider() {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = 'RelativeLayout';
    p.typeFull = {name: 'RelativeLayout', typeBlock: 2};
    p.gravLayout = {h:4,v:BOTTOM};
    p.gravity = {h:4,v:4};
    p.width = -1;
    p.height = 1;
    p.background = 6;
    p.children = [];
    currentElement.android = p;
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    return currentElement;
}

function formImgFirst(ww, imgHeight, data, margTop, margLeft) {
//console.log("formImgFirst margTop="+margTop+"<< margLeft="+margLeft+"<<");
    let item;
    let imgId = -1;
    let ik = data.length;
    for (let i = 0; i < ik; i++) {
        item = data[i];
        if (item.type == "Img") {
            imgId = i;
            break;
        }
    }
    if (imgId > -1) {
        let imgView = formImg(item);
        p = imgView.android;
        p.viewId = item.name;
        p.viewElement = imgView;
        p.width = ww;
        if (margTop != null && margTop.length > 0) {
            p.topMarg = margTop;
        }
        if (margLeft != null && margLeft.length > 0) {
            p.leftMarg = margLeft;
        }
        namePrev = item.name;
        p.height = imgHeight;
//console.log("formImgFirst p.topMarg="+p.topMarg+"<< p.leftMarg="+p.leftMarg+"<< margTop="+margTop+"<< margLeft="+margLeft+"<<");
        p.src = "img/picture.png";
    }
    return imgId;
}

function formImg(item) {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = "ImageView";
    p.typeFull = {name: 'ImageView', typeBlock: 0};
    p.gravLayout = {h:4,v:4};
    p.gravity = {h:4,v:4};
    p.componParam = {oval:false,w_bord:0,borderColor:0};
    currentElement.android = p;
    let typeEl = createDivImg();
    p.scaleType = 0;
    p.viewId = item.name;
    currentElement.appendChild(typeEl);
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    return currentElement;
}

function formGallery(item) {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = "Gallery";
    p.typeFull = {name: 'Gallery', typeBlock: 0};
    p.gravLayout = {h:4,v:4};
    p.gravity = {h:4,v:4};
    currentElement.android = p;
    let typeEl = createDivImg();
    p.viewId = item.name;
    currentElement.appendChild(typeEl);
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    return currentElement;
}

function formIndicator(item) {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.type = "Indicator";
    p.typeFull = {name: 'Indicator', typeBlock: 0};
    p.componParam = {diam:7,colorNorm:3,colorSel:4,type:10};
    p.width = WRAP;
    p.height = WRAP;
    p.gravLayout = {h:CENTER,v:4};
    currentElement.android = p;
    let typeEl = createDivImg();
    p.viewId = "ind_" + item.name;
    currentElement.appendChild(typeEl);
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    return currentElement;
}

function formTxt(item) {
    currentElement = createNewEl();
    p = {typeUxUi: "ui"};
    p.componParam = {typeValidTV:"no"};
    let typeEl;
    if (item.edit != null) {
        switch(item.edit) {
            case "text":
                p.type = "EditText";
                p.typeFull = {name: 'EditText', typeBlock: 0};
                p.textSize = 18;
                p.textColor = 12;
                p.componParam.bool_1 = true;
                p.componParam.st_3 = "actionNext";
                typeEl = createDivEditText(currentElement);
                break;
            case "spinner":
//                return formSpinner(item);
                return formSpinner_UX_UI(item);
/*
                typeEl = formSpinner_1(currentElement);
                p = {viewId:item.name,typeUxUi:"ui",type:"Spinner",typeFull:{name: 'Spinner', typeBlock: 0},width:MATCH,height:24,gravLayout:{h:4,v:4},
                    gravity:{h:4,v:4},rightMarg:12,textColor:12,children:[],componParam:{type:24}};
                break;
*/
        }
    } else {
        p.type = "TextView";
        p.typeFull = {name: 'TextView', typeBlock: 0};
        if (item.name == "title") {
            p.textSize = 22;
            p.textColor = 13;
        } else {
            p.textSize = 16;
            p.textColor = 12;
        }
        typeEl = createDivText();
    }
    if (p != null) {
        p.width = MATCH;
        p.height = WRAP;
        p.gravLayout = {h:4,v:4};
        p.gravity = {h:4,v:4};
        currentElement.android = p;
        p.text = item.name;
        p.viewId = item.name;
        p.letterSpac = '0.0';
        p.rightMarg = 12;
    }
    currentElement.appendChild(typeEl);
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    return currentElement;
}

function formButton(name) {
    currentElement = createNewEl();
    let typeEl = createDivText();
    let p = {"typeUxUi":"ui","children":[],"type":"TextView","typeFull":{"name":"TextView","typeBlock":0},"gravLayout":{"h":1,"v":4},
        "gravity":{"h":1,"v":1},"width":200,"height":35,"topMarg":"50","leftMarg":"","itemNav":{},"text":"Send","textSize":24,"letterSpac":"0.0","textColor":"19",
        "componParam":{"typeValidTV":"no","format":"no","ellipsize":"none","maxLine":0},"background":1000,"viewId":"send","formResourse":true};
    currentElement.android = p;
    currentElement.appendChild(typeEl);
    currentElement.android.viewElement = currentElement;
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    return currentElement;
}

function formSpinner_UX_UI(item) {
// UX
    let copyCurrentComponentView = currentComponentView;
    let copyCurrentComponentDescr = currentComponentDescr;
    uxFunction = new uxSpinner();
    let viewId = item.name;
    let listCompon = currentComponentView.closest(".list_components");
    
    currentComponentView = newComponent(viewId);
    currentComponentView.addEventListener('click', selComponent, true);
    currentComponentView.addEventListener('focus', selComponent, true);
    listCompon.append(currentComponentView);
    
    list_screens.scrollTop = list_screens.scrollHeight;
    currentComponentView.componId = idComponentNum;
    uxFunction.addComponent(idComponentNum, viewId);
    idComponentNum ++;
    
    currentScreen.components.push(currentComponentDescr);
/*
    if (currentComponent != null) {
        currentChildren.push(currentComponent);
    }
*/
    setValueComponent(currentComponentView, currentComponent, currentComponentDescr);
    currentComponentView = copyCurrentComponentView;
    currentComponentDescr = copyCurrentComponentDescr;
    return formSpinnerUI(item);
    
/*
    let typeEl = createDivText();
    typeEl.innerHTML = item.name;
    el.append(typeEl);
    
    let px24 = 24 * DENSITY + "px";
    let img = newDOMelement('<img src="img/android_arrow_down.png" style="width:' + px24 + ';height:' + px24 + ';position:absolute;right:0">');
    el.append(img);
    return currentElement;
*/
}

function formSpinnerUI(item) {
    currentElement = createNewEl();
/*
    let p = {viewId:item.name,typeUxUi:"ui",type:"Spinner",typeFull:{name: 'Spinner', typeBlock: 0},width:MATCH,height:24,gravLayout:{h:4,v:4},gravity:{h:4,v:4},
        rightMarg:12,textColor:12,children:[],componParam:{type:24}};
*/
    currentElement.android = currentComponent;
    let typeEl = createDivText();
    typeEl.innerHTML = item.name;
    currentElement.append(typeEl);
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
/*    
    let px24 = 24 * DENSITY + "px";
    let img = newDOMelement('<img src="img/android_arrow_down.png" style="width:' + px24 + ';height:' + px24 + ';position:absolute;right:0">');
    currentElement.append(img);
*/
    return currentElement;
}

function formSpinner(item) {
    currentElement = createNewEl();
    let p = {viewId:item.name,typeUxUi:"ui",type:"Spinner",typeFull:{name: 'Spinner', typeBlock: 0},width:MATCH,height:24,gravLayout:{h:4,v:4},gravity:{h:4,v:4},
        rightMarg:12,textColor:12,children:[],componParam:{type:24}};
    currentElement.android = p;
    let typeEl = createDivText();
    typeEl.innerHTML = item.name;
    currentElement.append(typeEl);
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    
    let px24 = 24 * DENSITY + "px";
    let img = newDOMelement('<img src="img/android_arrow_down.png" style="width:' + px24 + ';height:' + px24 + ';position:absolute;right:0">');
    currentElement.append(img);
    return currentElement;
}

function formCheck(item) {
    let wCheck = +(24 * MEASURE).toFixed(1);
    let wCheck_2 = wCheck * 2 + 5;
    let p = {viewId:item.name,type:"CheckBox",typeUxUi:"ui",componParam:{type:22,int_1:ListStyleCheck[activeStyleCheckPos].id,color_2:3,color_3:0},
        typeFull:{name:"CheckBox",typeBlock:0},gravLayout:{h:3,v:1},gravity:{h:4,v:4},width:MATCH,height:WRAP,gravLayout:{h:4,v:4},gravity:{h:4,v:4},
        rightMarg:12,textColor:12,children:[]};
    let pc = getParamCheck(p.componParam.int_1);
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
//        return container;
    
    
    
    
    
    
    
    currentElement = container;
    currentElement.android = p;
    addNewElement(ACTIVE, currentElement);
    addNavigatorEl(currentElement);
    ACTIVE.android.children.push(currentElement.android);
    return currentElement;
}

function getParamCheck(id) {
    let ik = ListStyleCheck.length;
    for (let i = 0; i < ik; i++) {
        let item = ListStyleCheck[i];
        if (item.id == id) {
            return item.param;
        }
    }
    return null;
}