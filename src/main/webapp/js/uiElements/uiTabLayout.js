function uiTabLayout() {
    let uiParamView = 
    '<div style="float: left;clear: both;margin-top: 16px;width:100%;padding-bottom:5px;border-top: 1px solid #1DACEf;border-bottom: 1px solid #1DACEf;">'
        +'<div style="float: left;color: #8199A;margin-top: 8px;5">Colors</div> '
        +'<div style="margin-top: 5px;float: left;clear:both">'
            +'<div class="text_style_ui">Normal</div>'
            +'<div class="text_norm" onclick="changeNormColorTab(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>'
        +'<div style="margin-top: 5px;float: left;margin-left:10px">'
            +'<div class="text_style_ui">Selected</div>'
            +'<div class="text_sel" onclick="changeSelColorTab(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>'
        +'<div style="margin-top: 5px;float: left;margin-left:10px">'
            +'<div class="text_style_ui">Indicator</div>'
            +'<div class="text_ind" onclick="changeIndColorTab(this)" style="cursor: pointer;width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;"></div>'
        +'</div>'
        +'<div style="margin-top: 5px;float: left;margin-left:30px">'
            +'<div class="text_style_ui">Indicator height</div>'
            +'<input class="ind_h" style="border: 1px solid #bbd4ef;border-radius:5px;" onchange="changeIndHTab(this)" type="number" size="2" min="1" max="10">'
        +'</div>'
    +'</div>';

    this.setElementUI = function(p, newEl, parent) {
        let typeEl = createDivTab();
        newEl.appendChild(typeEl);
        let myCompon = myComponentDescr(p.componId);
        if (myCompon != null) {
            let dat = myCompon.model.menuList.list;
            if (dat != null) {
                showTabLayout(dat, typeEl, p.tabLayout);
            }
        }
        formBelow(p, parent, "ToolBar");
    }
    
    this.newElementUI = function(p) {

    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = uiParamView;
        setTabAttr(p);
    }
}
/*
function setTabAttr(p) {
    let compon = getComponentById(p.viewId);
    uiCurrentComponent = compon;
    if (compon != null) {
        let item = compon.tabLayout;
        let colorTxt = contentAttributes.getElementsByClassName("text_norm")[0];
        colorTxt.style.backgroundColor = findColorByIndex(item.textColor);
        colorTxt = contentAttributes.getElementsByClassName("text_sel")[0];
        colorTxt.style.backgroundColor = findColorByIndex(item.textSelect);
        colorTxt = contentAttributes.getElementsByClassName("text_ind")[0];
        colorTxt.style.backgroundColor = findColorByIndex(item.indColor);
        let indH = contentAttributes.getElementsByClassName("ind_h")[0];
        indH.value = item.indHeight;
    }
}
*/

function setTabAttr(p) {
    let item = p.tabLayout;
    let colorTxt = contentAttributes.getElementsByClassName("text_norm")[0];
    colorTxt.style.backgroundColor = findColorByIndex(item.textColor);
    colorTxt = contentAttributes.getElementsByClassName("text_sel")[0];
    colorTxt.style.backgroundColor = findColorByIndex(item.textSelect);
    colorTxt = contentAttributes.getElementsByClassName("text_ind")[0];
    colorTxt.style.backgroundColor = findColorByIndex(item.indColor);
    let indH = contentAttributes.getElementsByClassName("ind_h")[0];
    indH.value = item.indHeight;
}

function showTabLayoutNoParam() {
    let myCompon = myComponentDescr(currentElement.android.componId);
    let dat = myCompon.model.menuList.list;
    let typeEl = currentElement.getElementsByClassName("tab_layout")[0];
    let tabLayout = currentElement.android.tabLayout;
    showTabLayout(dat, typeEl, tabLayout);
}

function changeIndHTab(el) {
    currentElement.android.tabLayout.indHeight = el.value;
    showTabLayoutNoParam();
}

function changeNormColorTab(el) {
    elementChangeColor = el;
    openPickerColor(el.style.backgroundColor, setNormColorTab);
}

function setNormColorTab(id, color) {
    currentElement.android.tabLayout.textColor = id;
    elementChangeColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    showTabLayoutNoParam();
}

function changeSelColorTab(el) {
    elementChangeColor = el;
    openPickerColor(el.style.backgroundColor, setSelColorTab);
}

function setSelColorTab(id, color) {
    currentElement.android.tabLayout.textSelect = id;
    elementChangeColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    showTabLayoutNoParam();
}

function changeIndColorTab(el) {
    elementChangeColor = el;
    openPickerColor(el.style.backgroundColor, setIndColorTab);
}

function setIndColorTab(id, color) {
    currentElement.android.tabLayout.indColor = id;
    elementChangeColor.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    showTabLayoutNoParam();
}

function showTabLayout(dat, mB, tab) {
    mB.innerHTML = "";
    let ik = dat.length;
//console.log("showTabLayout IK="+ik);
    if (ik == 0) return;
    let widthItem = 100 / ik;
    mB.append(newItemTab(dat[0], tab, widthItem));
    for (let i = 1; i < ik; i++) {
        mB.append(newItemTabNext(dat[i], tab, widthItem));
    }
}

function newItemTab(item, tabLayout, ww) {
//console.log("newItemTab item.title="+item.title+"<<");
    let container = document.createElement('div')
    let str = '<div class="item_buttons" style="position:relative;width:'+ ww + '%;display:inline-block;height:100%">'
            +'<div style="margin-top:5px;text-align: center;font-size:' + dp_20 + 'px;color:' + findColorByIndex(tabLayout.textSelect) + '">' + item.title + '</div>'
            +'<div style="height:' + tabLayout.indHeight * MEASURE + 'px;position:absolute;background-color:' + findColorByIndex(tabLayout.indColor) + ';bottom:0px;width:100%"></div>'
        +'</div>';
    container.innerHTML = str;
    return container.firstChild;
}

function newItemTabNext(item, tab, ww) {
    let container = document.createElement('div')
    let str = '<div class="item_buttons" style="position:relative;width:' + ww + '%;display:inline-block;height:100%">'
            +'<div style="margin-top:5px;text-align: center;font-size:' + dp_20 + 'px;color:' + findColorByIndex(tab.textColor) + '">' + item.title + '</div>'
        +'</div>';
    container.innerHTML = str;
    return container.firstChild;
}


