function uiSheetBottom() {
/*
    let uiParamView =
    '<div style="float: left;clear: both;margin-top: 10px;width:100%;padding-bottom:5px;border-bottom: 1px solid #1DACEf;">'
        +'<div style="float: left;color: #8199A;">Not hide on:</div> '
        +'<div style="float: left;clear:both">'
            +'<div style="font-size:10px;color:#2228">Swipe</div>'
            +'<img class="check_sheet_swipe" onclick="checkSwipeSheet(this);" style="cursor:pointer;margin-top:7px;margin-left:8px" width="16" height="16" src="img/check-act.png">'
        +'</div>'
        +'<div style="float: left;margin-left:10px">'
            +'<div style="font-size:10px;color:#2228">BackPressed</div>'
            +'<img class="check_sheet_bp" onclick="checkBPSheet(this);" style="cursor:pointer;margin-top:7px;margin-left:14px" width="16" height="16" src="img/check-act.png">'
        +'</div>'
    +'</div>';
*/
    this.setElementUI = function(p, newEl, parent) {
p.hideParam = 63; // 111111
    }
    
    this.newElementUI = function(p) {
        p.width = -1;
        p.height = -1;
//        p.background = 17;
        p.topMarg = "";
        p.leftMarg = "";
        p.hideParam = 63; // 111111
//        p.sheetParam = {noSwipe:false,noBP:false};
        p.componParam = {type:12, bool_1:false,bool_2:false,color_1:17};
        let pan = document.createElement('div');
        pan.className = "sheetPanel";
        pan.android = {typeUxUi: "ui",type:"RelativeLayout",typeFull:{name: 'RelativeLayout', typeBlock: 2},width:-1,height:250,background:19,children:[],
            gravLayout:{v:BOTTOM,h:NONE}, viewElement:pan};
        addNewElement(currentElement, pan);
        addNavigatorEl(pan);
        p.children.push(pan.android);
        return null;
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = "";
        editColor("Faded color", "color_1", true);
        showTitle("Not hide on:");
        editCheck("Swipe", "bool_1", false);
        editCheck("BackPressed", "bool_2", false);
//        editCheck("View match", "bool_3", false);
/*
        breakLine();
        editId("Positive view", "id_1", false, p.children, 100);
        editId("Negative view", "id_2", false, p.children, 100);
*/
    }
    
    this.viewElementUI = function(p, el) {

    }
}
/*
function setSheetAttr(p) {
    let item = p.sheetParam;
    if (item != null) {
        let swipe = contentAttributes.getElementsByClassName("check_sheet_swipe")[0];
        if (item.noSwipe) {
            swipe.src = "img/check-sel_1.png";
        } else {
            swipe.src = "img/check-act.png";
        }
        let bp = contentAttributes.getElementsByClassName("check_sheet_bp")[0];
        if (item.noBP) {
            bp.src = "img/check-sel_1.png";
        } else {
            bp.src = "img/check-act.png";
        }
    }
}

function checkSwipeSheet(el) {
    if (currentElement.android.sheetParam == null) {
        currentElement.android.sheetParam = {noSwipe:false,noBP:false};
    }
    currentElement.android.sheetParam.noSwipe = checkElement(el);
}

function checkBPSheet(el) {
    if (currentElement.android.sheetParam == null) {
        currentElement.android.sheetParam = {noSwipe:false,noBP:false};
    }
    currentElement.android.sheetParam.noBP = checkElement(el);
}
*/