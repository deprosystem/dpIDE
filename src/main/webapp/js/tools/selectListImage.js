var listImage;
var listCategorySysImg, listSystemImg;
var isPanelSelImg;
var selCategory, selSystemImg;
var dataCategoryImg, dataSystemImg, dataCustomImg;
var indListCategorySysImg = -1;
var indListSystemImg = -1;
var paramSelectImg;
var blockSysImg, buttonColor;
var canvasSelImg;
var setImageColor = 16;

function selectListImage(e, func, param) {
    let el = e.target;
    paramSelectImg = {"el":el,"func":func,"param":param};
    selectImage();
}

function selectImage() {
    let wWind = 450, wCategory = 150;
    let wSysImg = wWind - wCategory - 1;
    let hFooter = 50, hFooter_1 = hFooter + 1;
    let tabHrml = '<div style="position:absolute;left:0;top:0;right:0;height:30px;">'
            +'<div class="substrate" style="position:absolute;left: var(--leftSelIcon);width:50%;height:100%;background-color:#E7F7FF;transition: left 400ms"></div>'
            +'<div class="system" onclick="selectSourceIcon(this)" style="position:absolute;left:0;width:50%;height:100%;"><div style="margin-top:5px;text-align:center;font-size:14px">System</div></div>'
            +'<div class="custom" onclick="selectSourceIcon(this)" style="position:absolute;right:0;width:50%;height:100%;"><div style="margin-top:5px;text-align:center;font-size:14px">Custom</div></div>'
        +'</div>';
    let blockHtml = '<div style="position:absolute;left:0;top:31px;right:0;bottom:0;overflow-x:hidden;border-top:1px solid var(--c_blue)"></div>';
    let sysHtml = '<div class="block_system" style="position:absolute;left:var(--leftBlockIcon);width:100%;height:100%;transition: left 400ms"></div>';
    let customHtml = '<div class="block_custom" style="position:absolute;left:var(--leftBlockIcon_custom);width:100%;height:100%;transition: left 400ms"></div>';
    let selImg = '<div style="width:40px;height:40px;margin-top:5px;margin-left:20px;float:left;position:relative">'
            +'<img width="40" height="40" style="position:absolute;" src="img/chess_2.png">'
            +'</div>';
    let buttColorHtml = '<div onclick="setColorSystemImg(this)" style="cursor: pointer; margin-top: 2px;float: left;margin-left:10px;">'
            +'<div class="text_style_ui">Icon color</div>'
            +'<div class="colorImg" style="width: 30px; height: 28px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>';

    let wind = formWind(wWind, 550, 40, 350, "Select image", null, null, null, null, "");
    wind.onselectstart = function() { return false; }
    selSystemImg = -1;
    let tab = newDOMelement(tabHrml);
    wind.append(tab);
    isPanelSelImg = (document.documentElement.style.getPropertyValue('--leftSelIcon') != "50%");
    let block = newDOMelement(blockHtml);
    let blockSys = newDOMelement(sysHtml);
    block.append(blockSys);
    let controlSys = createFooter(hFooter);
    let buttAccept = createButtonBlue("To accept");
    buttAccept.addEventListener("click", function(){setSelectSysImage()}, true);
    controlSys.append(buttAccept);
    let buttCancelSys = createButtonWeite("Cancel", 70);
    buttCancelSys.addEventListener("click", function(){closeDataWindow(wind);}, true);
    controlSys.append(buttCancelSys);
    let selImgView = newDOMelement(selImg);
    canvasSelImg = newDOMelement('<canvas class="canvasSelImg" width="40" height="40" style="position:absolute">No canvas</canvas>');
    selImgView.append(canvasSelImg);
    controlSys.append(selImgView);
//            newDOMelement('<div style="position:absolute;left:0;right:0;bottom:0;height:50px;border-top:1px solid #1dace9"></div>');
    blockSys.append(controlSys);
    let blColor = newDOMelement(buttColorHtml);
    buttonColor = blColor.querySelector(".colorImg");
    buttonColor.style.backgroundColor = findColorByIndex(setImageColor);
    controlSys.append(blColor);
    let blockCategory = newDOMelement('<div style="position:absolute;left:0;top:0;bottom:' + hFooter_1 + 'px;width:' + wCategory + 'px;"></div>');
    let scrollCateg = formViewScrolY(blockCategory, false);
    dataCategoryImg = scrollCateg.querySelector(".viewData");    
    blockSys.append(blockCategory);
    blockSysImg = newDOMelement('<div style="position:absolute;right:0;top:0;bottom:' + hFooter_1 + 'px;width:' + wSysImg + 'px;"></div>');
    let scrollSysImg = formViewScrolY(blockSysImg, false);
    dataSystemImg = scrollSysImg.querySelector(".viewData");  
    blockSys.append(blockSysImg);
    let blockCustomGeneral = newDOMelement(customHtml);
    let blockCustom = newDOMelement('<div style="position:absolute;left:0;top:0;bottom:' + hFooter_1 + 'px;right:0"></div>');
    
    let controlCustom = createFooter(hFooter);
    let buttAcceptC = createButtonBlue("Upload image");
    buttAcceptC.addEventListener("click", function(){uploadImage()}, true);
    controlCustom.append(buttAcceptC);
    let buttCancelC = createButtonWeite("Cancel", 70);
    buttCancelC.addEventListener("click", function(){closeDataWindow(wind);}, true);
    controlCustom.append(buttCancelC);
    blockCustomGeneral.append(controlCustom)
    blockCustomGeneral.append(blockCustom)
    
    block.append(blockCustomGeneral);
    let scrollCustom = formViewScrolY(blockCustom, false);
    dataCustomImg = scrollCustom.querySelector(".viewData");    
    wind.append(block);
    if (listCategorySysImg == null) {
        if (isPanelSelImg) {
            doServer("GET", 'images/categorySystem', cbGetCategoryImg, null, null, blockCategory);
        } else {
            doServer("GET", 'images/categorySystem', cbGetCategoryImg);
        }
    } else {
        setCategoryImg();
    }
    if (listImage == null) {
        if ( ! isPanelSelImg) {
            doServer("GET", 'images/list', cbGetListImg, null, null, blockCustom);
        } else {
            doServer("GET", 'images/list', cbGetListImg);
        }
    } else {
        setCustomImg()
    }
}

function cbGetListImg(res) {
    listImage = JSON.parse(res);
    setCustomImg()
}

function setSelectSysImage() {
    if (selSystemImg == -1) {
        myAlert("Image not selected");
    } else {
        let cc = listCategorySysImg[indListCategorySysImg];
        let nn = listSystemImg[selSystemImg];
        let col = findColorByIndex(setImageColor);
        let color = jsColorToIntAndroid(col);
        doServer("GET", 'images/changeColor?category=' + cc + '&nameFile=' + nn + '&color=' + color, cbChangeColorImg, null, null, blockSysImg);
    }
}

function cbChangeColorImg(res) {
    closeDataWindow(blockSysImg);
    listImage = JSON.parse(res);
    let col = findColorByIndex(setImageColor);
    let color = jsColorToIntAndroid(col);
    let nam = listSystemImg[selSystemImg];
    nam = nam.substring(0, nam.indexOf('.'));
    nam = "_" + nam + "_" + color;
    let i = setCustomImg(nam);
    if (paramSelectImg.func.callBackEditF == null) {
        paramSelectImg.func(i, paramSelectImg.param);
    } else {
        paramSelectImg.func.callBackEditF(i, paramSelectImg);
    }
}

function setCustomImg(name_new) {
    dataCustomImg.innerHTML = "";
    let iRes = -1;
    var str = '';
    for (let i = 0; i < listImage.length; i++) {
        let path = listImage[i];
        let ii = path.lastIndexOf("/");
        let nam = path.substring(ii + 1);
        nam = nam.substring(0, nam.indexOf('.'));
        if (nam == name_new) {
            iRes = i;
        }
        let item = createItemListImg(path, nam);
        item.addEventListener("click", function(event){setSelectImage(i)}, true);
        dataCustomImg.appendChild(item);
    }
    let scr = dataCustomImg.closest('.viewport');
    scr.scroll_y.resize();
    return iRes;
}

function selectSourceIcon(el) {
    if (el.className == "custom") {
        document.documentElement.style.setProperty('--leftSelIcon', '50%');
        document.documentElement.style.setProperty('--leftBlockIcon', '100%');
        document.documentElement.style.setProperty('--leftBlockIcon_custom', '0px');
    } else {
        document.documentElement.style.setProperty('--leftSelIcon', '0px');
        document.documentElement.style.setProperty('--leftBlockIcon', '0px');
        document.documentElement.style.setProperty('--leftBlockIcon_custom', '-100%');
    }
}

function cbGetCategoryImg(res) {
    listCategorySysImg = JSON.parse(res);
    setCategoryImg();
}

function setColorSystemImg(el) {
    openPickerColor(buttonColor.style.backgroundColor, setImgColor);
}

function setImgColor(id, color) {
    windSelectColor.style.display = 'none';
    setImageColor = id;
    buttonColor.style.backgroundColor = color;
    let st = listSystemImg[selSystemImg];          // ????????????????????????
    let category = listCategorySysImg[indListCategorySysImg];
    let rgb = colorStrToRGB(color);
    changeImgColor(canvasSelImg, 'projectdataIDE/systemIcons/' + category + '/drawable-mdpi/' + st, rgb);
}

function setCategoryImg() {
    let ik = listCategorySysImg.length;
    for (let i = 0; i < ik; i++) {
        let item = oneCategory(i);
        dataCategoryImg.append(item);
    }
    let scr = dataCategoryImg.closest('.viewport');
    scr.scroll_y.resize();

    if (indListCategorySysImg > -1) {
        selectCategory_1(indListCategorySysImg);
    } else {
        selectCategory_1(0);
    }
}

function oneCategory(i) {
    let st = listCategorySysImg[i];
    let itemHTML = '<div onclick="selectCategory(' + i + ')" style="width:100%;height:24px;">'
            +'<div style="margin-top:5px;margin-left:5px;float:left;width:100%;cursor:pointer">' + st + '</div>'
            +'</div';
    return newDOMelement(itemHTML);
}

function selectCategory(i) {
    if (indListCategorySysImg == i) return;
    selectCategory_1(i);
}

function selectCategory_1(i) {
    let category = listCategorySysImg[i];
    if (indListCategorySysImg != null && indListCategorySysImg > -1) {
        dataCategoryImg.children[indListCategorySysImg].style.backgroundColor = "";
    }
    indListCategorySysImg = i;
    let viewItem = dataCategoryImg.children[i];
    viewItem.style.backgroundColor = "#def";
    
    if (indListSystemImg == indListCategorySysImg && listSystemImg != null) {
        formViewSystemImg();
    } else {
        indListSystemImg = -1;
        if (isPanelSelImg) {
            doServer("GET", 'images/listSystem?categoty=' + category, cbGetSystemImg, null, null, blockSysImg);
        } else {
            doServer("GET", 'images/listSystem?categoty=' + category, cbGetSystemImg);
        }
    }
}

function cbGetSystemImg(res) {
    listSystemImg = JSON.parse(res);
    formViewSystemImg();
}

function formViewSystemImg() {
    let ik = listSystemImg.length;
    dataSystemImg.innerHTML = "";
    indListSystemImg = indListCategorySysImg;
    let category = listCategorySysImg[indListCategorySysImg];
    for (let i = 0; i < ik; i++) {
        let item = oneSystemImg(i, category);
        dataSystemImg.append(item);
    }
    let scr = dataSystemImg.closest('.viewport');
    scr.scroll_y.resize();
}

function oneSystemImg(i, category) {
    let st = listSystemImg[i];
    let itemHTML = '<div onclick="selectSysImg(' + i + ')" style="float:left;width:34px;height:34px;">'
        +'<img width="28" height="28" style="float:left;margin-left:3px;cursor:pointer" src="projectdataIDE/systemIcons/' + category + '/drawable-mdpi/' + st + '">'
            +'</div';
    return newDOMelement(itemHTML);
}

function selectSysImg(i) {
    selSystemImg = i;
    let st = listSystemImg[i];
    let category = listCategorySysImg[indListCategorySysImg];
    let color = findColorByIndex(setImageColor);
    let rgb = colorStrToRGB(color);
    changeImgColor(canvasSelImg, 'projectdataIDE/systemIcons/' + category + '/drawable-mdpi/' + st, rgb);
}

function createItemListImg(path, nam) {
    var container = document.createElement('div');
    container.innerHTML = '<div style="float:left;height:46px;width:46px;cursor: pointer;position:relative">'
                +'<img width="40" height="40" style="position:absolute;margin-left:5px;margin-top:5px" src="img/chess_2.png">'
                +'<img width="40" height="40" style="position:absolute;margin-left:5px;margin-top:5px" src="' + path + '">'
                
    return container.firstChild;
}

function setSelectImage(i) {
    closeDataWindow(blockSysImg);
    if (paramSelectImg.func.callBackEditF == null) {
        paramSelectImg.func(i, paramSelectImg.param);
    } else {
        paramSelectImg.func.callBackEditF(i, paramSelectImg);
    }
}

function selectListImageEl(el, cb) {
    let par = {"el":el,"func":cb};
    if (listImage == null) {
        doServer("GET", 'images/list', cbGetListImgEl, null, par);
    } else {
        selectImageEl(par)
    }
}

function cbGetListImgEl(res, par) {
    if (res == "") return;
    listImage = JSON.parse(res);
    selectImageEl(par);
}

function selectImageEl(par) {
    let windMenu = formWind(250, 450, 40, 350, "Select image");
    let viewport = document.createElement('div');
    viewport.className = "viewport";
    let content = document.createElement('div');
    content.className = "content";
    viewport.appendChild(content);
    windMenu.appendChild(viewport);
    for (let i = 0; i < listImage.length; i++) {
        let path = listImage[i];
        let ii = path.lastIndexOf("/");
        let nam = path.substring(ii + 1);
        nam = nam.substring(0, nam.indexOf('.'))
        let item = createItemListImg(path, nam);
        item.addEventListener("click", function(event){setSelectImageEl(event, i, par, path)}, true);
        content.appendChild(item);
    }
    let scrollVert = new scrollX(viewport, "scroll");
    scrollVert.init();
}

function setSelectImageEl(e, i, par, path) {
    let el = e.target;
    closeWindow(el);
    par.func(i, path);
    par.el.src = path;
}
