var TOP = 0, CENTER = 1, BOTTOM = 2, ABSOLUTE = 3, NONE = 4;
var LEFT = 0, RIGHT = 2;

var currentElement;
var listComponent;
var selTypeEl;

function formCompon() {
    listComponent = new Array();
    listComponent[0] = {};
    listComponent[0].name = 'Layouts';
    listComponent[0].children = new Array(//{name: 'LinearLayout', typeBlock: 1}, 
            {name: 'RelativeLayout', typeBlock: 2},
            {name: 'FrameLayout', typeBlock: 2});
    listComponent[1] = {};
    listComponent[1].name = 'Views';
    listComponent[1].children = new Array(
            {name: 'TextView', typeBlock: 0},
            {name: 'ImageView', typeBlock: 0}
                );
    listComponent[2] = {};
    listComponent[2].name = 'Input';
    listComponent[2].children = new Array(
            {name: 'EditText', typeBlock: 0},
            {name: 'SeekBar', typeBlock: 0},
            {name: 'Spinner', typeBlock: 0},
            {name: 'Switch', typeBlock: 0},
            {name: 'CheckBox', typeBlock: 0},
            {name: 'PlusMinus', typeBlock: 0},
            {name: 'Calendar', typeBlock: 0},
//            {name: 'EditGallery', typeBlock: 0},
    );
    listComponent[3] = {};
    listComponent[3].name = 'Containers';
    listComponent[3].children = new Array({name: 'CardView', typeBlock: 10},
            {name: 'RecyclerView', typeBlock: 10},
            {name: 'ScrollView', typeBlock: 10},
//            {name: 'HorizontalScrollView', typeBlock: 11}, 
            {name: 'ViewPager', isBlock: false}, 
//            {name: 'Spinner', typeBlock: 10}
                    );
    listComponent[4] = {};
    listComponent[4].name = 'Widgets';
    listComponent[4].children = new Array(
//            {name: 'VideoView', typeBlock: 0},
            {name: 'Gallery', typeBlock: 0},
            {name: 'Map', typeBlock: 0},
            {name: 'SheetBottom', typeBlock: 2});
    listComponent[5] = {};
    listComponent[5].name = 'Indicators';
    listComponent[5].children = new Array(
            {name: 'ProgressGroup', typeBlock: 2}, 
            {name: 'ProgressCircle', typeBlock: 0},
            {name: 'ProgressLine', typeBlock: 0},
            {name: 'Indicator', typeBlock: 0},
            {name: 'Ellipsis', typeBlock: 0},
            {name: 'Ratings', typeBlock: 0});
            
    var ik = listComponent.length;
    category.innerHTML = "";
    for (var i = 0; i < ik; i++) {
        var div = createDivClick(i);
        div.className = 'category-item';
        div.innerHTML = listComponent[i].name;
        category.appendChild(div);
    }
}

function clickCategory(i){
    var lc = document.getElementById('type_view');
    lc.innerHTML = '';
    var child = listComponent[i].children;
    var jk = child.length;
    selTypeEl = null;
    for (var j = 0; j < jk; j++) {
        var div = createDivClick2(i, j);
        div.className = 'type-item';
        div.innerHTML = child[j].name;
        lc.appendChild(div);
    }
}

function clickCategory2(i, j){
//    var type = listComponent[i].children[j].name;
    insertTypeFull = listComponent[i].children[j];
    setTypeInsert(insertTypeFull.name);
    if (selTypeEl != null) {
        selTypeEl.className = 'type-item';
    }
//    let arr = type_view.children;
    selTypeEl = type_view.children[j];
    selTypeEl.className = 'type_item_sel';
}

function createDivText() {
//let z = p.asdf;
    var container = document.createElement('div')
    container.innerHTML = '<div class="text" style="position: absolute; white-space: pre-wrap; color: #808080;"></div>';
    return container.firstChild
}

function createDivMenuB() {
    var container = document.createElement('div');
    container.innerHTML = '<div class="menu_b" style="position: absolute;left:0;top:0;right:0;bottom:0"></div>'
    return container.firstChild
}

function createDivTab() {
    var container = document.createElement('div')
    container.innerHTML = '<div class="tab_layout" style="display:flex;flex-direction:row;align-items:center;justify-content:space-around;width:100%;height:100%;"></div>'
    return container.firstChild;
}

function createForToolBar() {
    var container = document.createElement('div')
    container.innerHTML = '<div style="display:flex;flex-direction:row;align-items:center;position:absolute;width:100%;height:100%;">'
            +'<img class="img_back" width="'+dp_24+'" height="'+dp_24+'" style="margin-left:'+dp_16+'px;margin-right:'+dp_16+'px;">'
            +'<div class="title" style="display: inline-block; margin-left: 12px; white-space: pre-wrap;"></div>'
        + '</div>';
    return container.firstChild
}

function createDivEditText(el) {
    var marg = 4 * MEASURE;
    var bot = 10 * MEASURE;
    var margbot = 7 * MEASURE;
    var container = document.createElement('div')
        container.innerHTML = '<div class="line" style="position: absolute; left:' + marg 
//    container.innerHTML = '<div class="line" style="position: absolute; top:0px; left:' + marg 
            + 'px;right:' + marg + 'px;border-bottom:1px solid #808080; bottom:' + margbot + 'px;"></div>' 
            + '<div class="text" style="position: absolute; white-space: pre-wrap; color: #808080"></div>';
    el.appendChild(container.firstChild);
    return container.getElementsByClassName("text")[0];
}

function createDivImg() {
    var container = document.createElement('div')
    container.innerHTML = '<div class="image" style="width:100%;height:100%"></div>'
    return container.firstChild
}

function clickElement(event, el) {
    if (formNewElem) return;
    hideContourEl();
    currentElement = el;
    setParamCompon();
    setPickElement(el);
    selectNavigatorEl(el);
    if (el.android != null) {
        if (el.android.type == "ItemScroll") {
            ScrollItem(el);
        } else {
            if (el.android.type == "ScrollForm") {
                let cont = el.querySelector("div");
                if (cont != null) {
                    let dd = cont.querySelector("div");
                    if (dd != null && dd.android != null && dd.android.type == "ItemScroll") {
                        ScrollItem(dd);
                    }
                }
            }
        }
    }
}

function setPickElement(el) {
    appendContour();
}

function hideContourEl() {
    if (currentElement != null) {
        let el = currentElement.getElementsByClassName('contourEl')[0];
        if (el != undefined && el != null) {
            currentElement.removeChild(el);
            currentElement.style.outline = '';
        }
    }
}

function hideSelectEl(e) {
    if (e.target.id == 'content') {
        hideContourEl();
        if (selectViewElement != null) {
            selectViewElement.style.backgroundColor = '#fff';
            selectViewElement = null;
        }
        layoutParam.style.display = 'none';
    }
}

function appendContour() {
    if (currentElement.getElementsByClassName('contourEl').length == 0) {
        let contour = createContour();
        contour.style.display = 'block';
        currentElement.appendChild(contour);
        currentElement.style.outline = '2px solid #00f';
    }
}

function createDivClick(num) {
    var container = document.createElement('div')
    container.innerHTML = '<div onclick="clickCategory('+num+')"> </div>';
    return container.firstChild
}

function createDivClick2(i, j) {
    var container = document.createElement('div')
    container.innerHTML = '<div onclick="clickCategory2('+i+','+j+')"> </div>';
    return container.firstChild
}

function viewCompon() {
    viewComponElem(currentElement);
}

function changeBackground(el) {
    var p = el.android;
    if (p.background != null) {
        el.style.backgroundColor = p.background;
    }
}

function showElemChilds(el) {
    let p = el.android;
    if (p != null) {
        viewComponElem(el);
        let ch = p.children;
        if (ch != null && ch.length > 0) {
            let ik = ch.length;
            for (let i = 0; i <ik; i++) {
                showElemChilds(ch[i].viewElement);
            }
            if (p.width == WRAP) {
                el.style.width = maxChildWidth(el) + px;
            }
            if (p.height == WRAP) {
                el.style.height = maxChildHeight(el) + px;
            }
        }
    }
}
        
function viewComponElem(el) {
    let p = el.android;
    if (p.visibility != null && ! p.visibility) {
        return;
    }
    setLayoutChange();
    let rectParentEl = p.parent.getBoundingClientRect();
    let parentX = parseInt(rectParentEl.left);
    let parentY = parseInt(rectParentEl.top);
    var LL, RR, TT, BB;
    var pLL, pRR, pTT, pBB;
    LL = RR = TT = BB = 0;
    pLL = pRR = pTT = pBB = 0;
    
    let par = p.parent.android;
    let parL = 0, parT = 0, parR = 0, parB = 0;
    let allParPad = false;
    if (par != null) {
        if (par.padding != undefined && par.padding != '') {
                parL = parT = parR = parB = parseInt(par.padding) * MEASURE;
                allParPad = true;
        }
        if (par.leftPad != undefined && par.leftPad != '') {
                parL = parseInt(par.leftPad) * MEASURE;
        }

        if (par.topPad != undefined && par.topPad != '') {
                parT = parseInt(par.topPad) * MEASURE;
        }
        if (par.rightPad != undefined && par.rightPad != '') {
                parR = parseInt(par.rightPad) * MEASURE;
        }
        if (par.bottomPad != undefined && par.bottomPad != '') {
                parB = parseInt(par.bottomPad) * MEASURE;
        }
    }

    let allMarg = false;
    if (p.margin != undefined && p.margin != '') {
            LL = RR = TT = BB = parseInt(p.margin) * MEASURE;
            allMarg = true;
    }
    if (p.leftMarg != undefined && p.leftMarg != '') {
            LL = parseInt(p.leftMarg) * MEASURE;
    }
    
    if (p.topMarg != undefined && p.topMarg != '') {
            TT = parseInt(p.topMarg) * MEASURE;
    }
    if (p.rightMarg != undefined && p.rightMarg != '') {
            RR = parseInt(p.rightMarg) * MEASURE;
    }
    if (p.bottomMarg != undefined && p.bottomMarg != '') {
            BB = parseInt(p.bottomMarg) * MEASURE;
    }

    let padMarL = LL + parL;
    if (padMarL > 0) {
        el.style.marginLeft = padMarL + px;
    } else {
        el.style.marginLeft = "";
    }
    let padMarT = TT + parT;
    if (padMarT > 0) {
        el.style.marginTop = padMarT + px;
    } else {
        el.style.marginTop = "";
    }
    let padMarR = RR + parR;
    if (padMarR > 0) {
        el.style.marginRight = padMarR + px;
    } else {
        el.style.marginRight = "";
    }
    let padMarB = BB + parB;
    if (padMarB > 0) {
        el.style.marginBottom = padMarB + px;
    } else {
        el.style.marginBottom = "";
    }

    
    if (p.padding != undefined) {
        if (p.padding == '') {
            el.style.padding = '';
        } else {
            pLL = pRR = pTT = pBB = parseInt(p.padding) * MEASURE;
        }
    }
    if (p.leftPad != undefined) {
        if (p.leftPad == '') {
            if (pLL == 0) el.style.paddingLeft = '';
        } else {
            pLL = parseInt(p.leftPad) * MEASURE;
        }
    }
    
    if (p.topPad != undefined) {
        if (p.topPad == '') {
            if (pTT == 0) el.style.paddingTop = '';
        } else {
            pTT = parseInt(p.topPad) * MEASURE;
        }
    }
    if (p.rightPad != undefined) {
        if (p.rightPad == '') {
            if (pRR == 0) el.style.paddingRight = '';
        } else {
            pRR = parseInt(p.rightPad) * MEASURE;
        }
    }
    if (p.bottomPad != undefined) {
        if (p.bottomPad == '') {
            if (pBB == 0) el.style.paddingBottom = '';
        } else {
            pBB = parseInt(p.bottomPad) * MEASURE;
        }
    }
    let img;
    try {
        uiFunction = eval("new ui" + p.type + "()");
        uiFunction.viewElementUI(p, el);
    } catch(e) {
    }
    let pp;
    let margR;
    if (p.parent != null) {
        pp = p.parent.android;
        if (pp != null && pp.type == "List") {
            let span = pp.spanC;
            let mm = -1;
            if (span != null) {
                mm = parseInt(span);
            }
            if (mm > 1) {
                margR = screenWpx - screenWpx / mm;
            }
        }
    }

    if (p.parent != null) {
        relativeL(el, p, parL, parT, parR, parB, margR);
    }
    let ik;
    
    if (p.gravLayout.h == null || p.gravLayout.h == "" || p.gravLayout.h == NONE) {
        if (p.toLeftOf != null && p.toLeftOf != "") {
            let leftOf = -1;
            let rectEl;
            let parentV = el.parentElement;
            if (parentV != null) {
                let child = parentV.children;
                ik = child.length;
                let elem;
                for (let i = 0; i < ik; i++) {
                    elem = child[i];
                    if (elem.android != null && elem.android.viewId == p.toLeftOf) {
                        rectEl = elem.getBoundingClientRect();
                        leftOf = parseInt(rectParentEl.right - rectEl.left);
                        break;
                    }
                }
                if (leftOf > -1) {
                    let leftMargElem = 0;
                    if (elem.android.leftMarg != null && elem.android.leftMarg != "") {
                        leftMargElem = parseInt(elem.android.leftMarg) * MEASURE;
                    }
                    if (p.width != MATCH) {
                        el.style.left = "";
                    }
                    el.style.right = (leftOf + leftMargElem + RR) + px;
                }
            }
        }
        if (p.toRightOf != null && p.toRightOf != "") {
            let rightOf = -1;
            let rectEl;
            let parentV = el.parentElement;
            if (parentV != null) {
                let child = parentV.children;
                ik = child.length;
                let elem;
                for (let i = 0; i < ik; i++) {
                    elem = child[i];
                    if (elem.android != null && elem.android.viewId == p.toRightOf) {
                        rectEl = elem.getBoundingClientRect();
                        rightOf = parseInt(rectEl.right) - parentX;
                        break;
                    }
                }
                if (rightOf > -1) {
                    el.style.marginLeft = (rightOf + LL) + px;
                }
            }
        }
    }
    if (p.gravLayout.v == null || p.gravLayout.v == "" || p.gravLayout.v == NONE) {
        if (p.below != null && p.below != "") {
            let below = -1;
            let parentV = el.parentElement;
            if (parentV != null) {
                let child = parentV.children;
                let ik = child.length;
                let elem;
                for (let i = 0; i < ik; i++) {
                    elem = child[i];
                    if (elem.android != null && elem.android.viewId == p.below) {
                        let rectEl = elem.getBoundingClientRect();
                        below = parseInt(rectEl.bottom) - parentY;
                        break;
                    }
                }
                if (below > -1) {
                    let botMargElem = 0;
                    if (elem.android.bottomMarg != null) {
                        botMargElem = parseInt(elem.android.bottomMarg) * MEASURE;
                    }
                    if (p.height == MATCH) {
                        el.style.top = (below + botMargElem + TT) + px;
                    } else {
                        el.style.marginTop = (below + botMargElem + TT) + px;
                    }
                }
            }
        }

        if (p.above != null && p.above != "") {
            let above = -1;
            let parentV = el.parentElement;
            if (parentV != null) {
                let child = parentV.children;
                let ik = child.length;
                let elem;
                for (let i = 0; i < ik; i++) {
                    elem = child[i];
                    if (elem.android != null) {
                        if (elem.android.visibility == null) {
                            elem.android.visibility = true;
                        }
                        if (elem.android.viewId == p.above && elem.android.visibility ) {
                            let rectEl = elem.getBoundingClientRect();
                            above = parseInt(rectParentEl.bottom - rectEl.top);
                            break;
                        }
                    }
                }
                let topMargElem = 0;
                if (above > -1) {
                    if (elem.android.topMarg != null && elem.android.topMarg != "") {
                        topMargElem = parseInt(elem.android.topMarg) * MEASURE;
                    }
                    if (p.height != MATCH) {
                        el.style.top = "";
                    }
                    el.style.bottom = (above + topMargElem + BB) + px;
/*
                    if (p.height == MATCH) {
                        el.style.bottom = (above + topMargElem + BB) + px;
                    } else {
                        if (p.height == WRAP) {
                            el.style.top = "";
                        }
                        el.style.bottom = (above + topMargElem + BB) + px;
                    }
*/
                }
            }
        }
    }

    var hH = parseInt(el.style.height);
    var wW = parseInt(el.style.width);
    let contentEl;
    let pc;
    let line;
    switch(p.type) {
        case "TextView":
            viewTextView(el, p, hH, wW);
            break;
        case "PlusMinus":
            line = el.getElementsByClassName("line")[0]
            if (p.componParam != null && p.componParam.noEdit != null && p.componParam.noEdit) {
                if (line != null) {
                    line.style.display = "none";
                }
                viewTextView(el, p, hH, wW);
            } else {
                if (line != null) {
                    line.style.display = "block";
                }
                viewEditText(el, p, hH, wW);
            }
            break;
        case "EditText":
            line = el.getElementsByClassName("line")[0]
            if (p.componParam != null) {
                if (p.componParam.bool_2 == null) {
                    p.componParam.bool_2 = true;
                }
                if (p.componParam.bool_2) {
                    if (line != null) {
                        line.style.display = "block";
                    }
                    viewEditText(el, p, hH, wW);
                } else {
                    if (line != null) {
                        line.style.display = "none";
                    }
                    viewTextView(el, p, hH, wW);
                }
            }
            break;
        case "ImageView":
            contentEl = el.getElementsByClassName("image")[0];
//console.log("contentEl width="+contentEl.style.width+"<< class="+contentEl.className+"<<");
            imgEl = el.getElementsByTagName("img")[0];
            if (imgEl == null) {
                let p_src = p.src;
                if (p_src == null || p_src == "") {
                    p_src = "img/picture.png";
                }
                imgEl = newDOMelement('<IMG SRC="'+ p_src +'" style="width:100%;height:100%;pointer-events: none;">');
                contentEl.appendChild(imgEl);
            }
            if (p.componParam != null && p.componParam.oval != null && p.componParam.oval) {
                contentEl.style.width = "100%";
                contentEl.style.height = "100%";
                imgEl.style.borderRadius = "50%";
            } else {
                pc = p.corners;
                if (pc != null) {
                    contentEl.style.width = "100%";
                    contentEl.style.height = "100%";
                    let stR = (parseInt(pc.lt) * MEASURE) + "px " + (parseInt(pc.tr) * MEASURE) + "px " + (parseInt(pc.rb) * MEASURE) + "px " 
                            + (parseInt(pc.bl) * MEASURE) + "px";
                    imgEl.style.borderRadius = stR;
                } else {
//                    contentEl.style.width = "";
//                    contentEl.style.height = "";
                    if (pLL > 0) {
                        contentEl.style.marginLeft = pLL + px;
                    }
                    if (pTT > 0) {
                        contentEl.style.marginTop = pTT + px;
                    }
                    if (pRR > 0) {
                        contentEl.style.marginRight = pRR + px;
                    }
                    if (pBB > 0) {
                        contentEl.style.marginBottom = pBB + px;
                    }
                }
            }
//console.log("11111 contentEl width="+contentEl.style.width+"<< class="+contentEl.className+"<<");
            if (p.componParam != null && p.componParam.borderColor != null && p.componParam.w_bord != null) {
                imgEl.style.border = p.componParam.w_bord + "px solid " + findColorByIndex(p.componParam.borderColor);
            } else {
                imgEl.style.border = "";
            }
            if (p.componParam != null && p.componParam.int_0 != null && p.componParam.int_0 != 0) {
                imgEl.style.filter = 'blur(' + p.componParam.int_0 + 'px)';
            } else {
                imgEl.style.filter = '';
            }
            break;
        case "CardView":
            let radC = p.radiusCard;
            if (radC != null) {
                el.style.borderRadius = (parseInt(radC) * MEASURE) + px;
            }

            let elev = p.elevCardShadow;
            if (elev != null && elev > 0) {
                el.style.boxShadow = "0px 0px 5px " + elev + "px #eee";
            } else {
                el.style.boxShadow = "";
            }
            break;
        default:

            break;
    }

    if (p.type != "SeekBar") {
        setBackgoundEl(el, p);
    }

    let parentW = el.parentElement;
    if (parentW != null && parentW.android != null && parentW.android.height == WRAP) {
        parentW.style.height = maxChildHeight(parentW) + px;
    }
    if (parentW != null && parentW.android != null && parentW.android.width == WRAP) {
        parentW.style.width = maxChildWidth(parentW) + px;
    }
    if (p.visibility != null && ! p.visibility) {
        el.oldDisplay = el.style.display;
        el.style.display = "none";
    } else {
        let idEl = p.viewId;
        if (idEl != null && idEl != "" && parentW != null && parentW.android != null) {
            let parCh = parentW.android.children;
            if (parCh != null && parCh.length > 0) {
                let ik = parCh.length;
                for (let i = 0; i < ik; i++) {
                    let pCh = parCh[i];
                    if (pCh.viewId != idEl && pCh.viewElement != null) {
                        if (pCh.above == idEl || pCh.below == idEl || pCh.toRightOf == idEl || pCh.toLeftOf == idEl) {
                            viewComponElem(pCh.viewElement);
                        }
                    }
                }
            }
        }

        if (parentW != null && parentW.android != null) {
            
            if (p.width == WRAP && parentW.android.width == WRAP) {
                viewComponElem(parentW);
            }
            if (p.height == WRAP && parentW.android.height == WRAP) {
                viewComponElem(parentW);
            }
        }
    }
    if (p.type == "ItemScroll" || p.type == "ScrollForm") {
        resizeScroll(el);
    }
}

function viewTextView(el, p, hH, wW) {
    let contentEl = el.getElementsByClassName("text")[0];
    if (p.height != WRAP) {
        switch(p.gravity.v) {
            case TOP:
                contentEl.style.bottom = '';
                contentEl.style.top = '0px';
                break;
            case BOTTOM:
                contentEl.style.top = '';
                contentEl.style.bottom = '0px';
                break;
            case NONE:
            case CENTER:
                let ccc;
                if (p.componParam != null && p.componParam.typeValidTV != null && p.componParam.typeValidTV != "no") {
                    ccc = p.textSize * MEASURE;
                } else {
                    ccc = contentEl.clientHeight;
                }
                contentEl.style.bottom = '';
                let cc = hH - ccc ;
                if (cc < 0) {
                    cc = 0;
                } else {
                    cc = cc / 2;
                }
                contentEl.style.top = cc + px;
                break;
        }
    }
    if (p.width != WRAP) {
        switch(p.gravity.h) {
            case RIGHT:
                contentEl.style.left = '';
                contentEl.style.right = '0px';
                break;
            case NONE:
            case LEFT:
                contentEl.style.right = '';
                contentEl.style.left = '0px';
                break;
            case CENTER:
                let ccc = contentEl.clientWidth;
                wW = el.clientWidth;
                let cc = wW / 2 - ccc / 2;
                contentEl.style.right = '';
                contentEl.style.left = cc + 'px';
                break;
        }
    }
}

function viewEditText(el, p, hH, wW) {
    let contentEl = el.getElementsByClassName("text")[0];
    var pad4 = 4 * MEASURE;
    switch(p.gravity.v) {
        case TOP:
            contentEl.style.bottom = '';
            contentEl.style.top = '0px';
            break;
        case BOTTOM:
            contentEl.style.top = '';
            contentEl.style.bottom = '0px';
            break;
        case NONE:
        case CENTER:
            var ccc = p.textSize * MEASURE;
            cc = hH / 2 - ccc / 2;
            contentEl.style.bottom = '';
            contentEl.style.top = cc + 'px';
            break;
    }
    switch(p.gravity.h) {
        case RIGHT:
            contentEl.style.left = '';
            contentEl.style.right = pad4 + px;
            break;
        case NONE:
        case LEFT:
            contentEl.style.right = '';
            contentEl.style.left = pad4 + px;
            break;
        case CENTER:
            var ccc = contentEl.clientWidth;
            wW = el.clientWidth;
            cc = wW / 2 - ccc / 2;
            contentEl.style.right = '';
            contentEl.style.left = cc + 'px';
            break;
    }
}

function relativeL(el, p, pLL, pTT, pRR, pBB, margR) {
    let root_w = p.parent.offsetWidth;
    let root_h = p.parent.offsetHeight;
    let pParent = p.parent.android;
    let contentEl;
    let rectParent;
    let line;
    if (p.width == MATCH) {
        el.style.width = "";
        el.style.left = "0px";
        if (margR != null) {
            el.style.right = margR + px;
        } else {
            el.style.right = "0";
        }
    } else if (p.width == WRAP) {
        let wWpx;
        let wwSave = el.style.width;
        el.style.width = "";
        el.style.left = "0px";
        el.style.right = "0px";
        switch(p.type) {
            case "PlusMinus":
                line = el.getElementsByClassName("line")[0]
                if (p.componParam != null && p.componParam.noEdit != null && p.componParam.noEdit) {
                    if (line != null) {
                        line.style.display = "none";
                    }
                    wrapTextViewW(el, p, pLL, pTT);
                } else {
                    if (line != null) {
                        line.style.display = "block";
                    }
                    wrapEditTextW(el, p);
                }
                break;
            case "EditText" :
//                wrapEditTextW(el, p);
                line = el.getElementsByClassName("line")[0]
                if (p.componParam != null) {
                    if (p.componParam.bool_2 == null) {
                        p.componParam.bool_2 = true;
                    }
                    if (p.componParam.bool_2) {
                        if (line != null) {
                            line.style.display = "block";
                        }
                        wrapEditTextW(el, p);
                    } else {
                        if (line != null) {
                            line.style.display = "none";
                        }
                        wrapTextViewW(el, p, pLL, pTT);
                    }
                }
                break;
            case "TextView" :
                wrapTextViewW(el, p, pLL, pTT);
                break;
            case "Indicator":
                let diam = p.componParam.diam * MEASURE;
                el.style.width = diam * 6 + px;
                break;
            case "RelativeLayout" :
                el.style.width = maxChildWidth(el) + px;
                break;
            case "Switch":
            case "CheckBox":
                el.style.width = wwSave;
                el.style.right = "";
                break;
            default:
                el.style.width = maxChildWidth(el) + px;
        }
    } else {
        el.style.width = (p.width * MEASURE - pLL - pRR) + px;
    }
    if (typeof(p.height) == "string") {
        var hhh = findDimenByName(p.height);
        var hi = parseInt(hhh);
        el.style.height = (hi * MEASURE) + px;
    } else {
        if (p.height == MATCH) {
            el.style.height = "";
            el.style.top = "0px";
            el.style.bottom = "0px";
        } else if (p.height == WRAP) {
            switch(p.type) {
                case "PlusMinus":
                    line = el.getElementsByClassName("line")[0]
                    if (p.componParam != null && p.componParam.noEdit != null && p.componParam.noEdit) {
                        if (line != null) {
                            line.style.display = "none";
                        }
                        wrapTextViewH(el, p);
                    } else {
                        if (line != null) {
                            line.style.display = "block";
                        }
                        wrapEditTextH(el, p);
                    }
                    break;
                case "EditText" :
//                    wrapEditTextH(el, p);
                    line = el.getElementsByClassName("line")[0]
                    if (p.componParam != null) {
                        if (p.componParam.bool_2 == null) {
                            p.componParam.bool_2 = true;
                        }
                        if (p.componParam.bool_2) {
                            if (line != null) {
                                line.style.display = "block";
                            }
                            wrapEditTextH(el, p);
                        } else {
                            if (line != null) {
                                line.style.display = "none";
                            }
                            wrapTextViewH(el, p);
                        }
                    }
                    break;
                case "TextView" :
                    wrapTextViewH(el, p);
                    break;
                case "SeekBar" :
                    if (p.seekBarParam != null) {
                        el.style.height = parseInt(p.seekBarParam.thumbDiam) * MEASURE + px;
                    }
                    break;
                case "Indicator":
                case "Ratings":
                    el.style.height = (p.componParam.diam * MEASURE) + px;
                    break;
                case "RelativeLayout" :
                    el.style.height = maxChildHeight(el) + px;
                    break;
                default:
                    el.style.height = maxChildHeight(el) + px;
            }
        } else {
            el.style.height = (p.height * MEASURE - pTT - pBB) + px;
        }
    }

    if (p.type == "ImageView" || p.type == "Gallery" || p.type == "Map") {
        if (p.src != null && p.src != '') {
            var elDivImg = el.getElementsByClassName('image')[0];
            if (elDivImg == null) {
                elDivImg = createDivImg();
                el.appendChild(elDivImg);
            }
            elDivImg.innerHTML = '<IMG SRC="'+ p.src +'" style="width:100%;height:100%;pointer-events: none;">';
            elImg = elDivImg.firstChild;
            if (p.width != WRAP) {
                var ww = parseInt(el.style.width);                    
                elImg.width = ww;
            }
            if (p.height != WRAP) {
                var hh = parseInt(el.style.height);                    
                elImg.height = hh;
            }
        }
    }

    if (p.gravLayout != null) {
        el.style.position = 'absolute';
        if (p.height != MATCH) {
            switch(p.gravLayout.v) {
                case NONE:
                case TOP:
                    el.style.bottom = '';
                    el.style.top = '0px';
                    break
                case BOTTOM:
                    el.style.top = '';
                    el.style.bottom = '0px';
                    break
                case CENTER:
                    var ccc = el.clientHeight;
                    cc = root_h - ccc;
                    if (cc < 0) {
                        cc = 0;
                    } else {
                        cc = cc / 2;
                    }
                    el.style.bottom = '';
                    el.style.top = cc + px;
                    break
            }
        }
        if (p.width != MATCH) {
            switch(p.gravLayout.h) {
                case RIGHT:
                    el.style.left = '';
                    if (pParent.rightPad != null && pParent.rightPad != "") {
                        el.style.right = (parseInt(pParent.rightPad) * MEASURE) + 'px';
                    } else {
                        el.style.right = '0px';
                    }
                    break
                case NONE:
                case LEFT:
                    el.style.right = '';
                    el.style.left = '0px';
                    break
                case CENTER:
                    var ccc = el.clientWidth;
                    cc = root_w / 2 - ccc / 2;
                    let rect = el.getBoundingClientRect();
                    el.style.right = '';
                    el.style.left = cc + px;
                    break
            }
        }
    }
}

function wrapTextViewH(el, p) {
    let contentEl = el.getElementsByClassName("text")[0];
    let tS = parseInt(p.textSize);
    let standH = tS * 1.3;
    contentEl.style.top = "0";
    contentEl.style.marginTop = "0";
    contentEl.style.marginLeft = "0";
    el.style.overflowY = "";
    el.style.overflowX = "";
    el.style.height = "";

    let rect = contentEl.getBoundingClientRect();
    let oH = contentEl.offsetHeight;
    if (oH > 0) {
        maxLine = 1;
        if (p.componParam != null && p.componParam.maxLine != null && p.componParam.maxLine > 1) {
            maxLine = p.componParam.maxLine;
        }
        let maxH = maxLine * tS * MEASURE * 1.146;
        if (contentEl.offsetHeight > maxH) {
            el.style.height = maxH + "px";
            el.style.overflowY = "hidden";
        } else {
            el.style.height = contentEl.offsetHeight + "px";
        }
    } else {
        el.style.height = standH * MEASURE + "px";
    }
}

function wrapTextViewW(el, p, pLL, pTT) {
    let wWpx;
    let contentEl = el.getElementsByClassName("text")[0];
    rectParent = contentEl.getBoundingClientRect();
    if (p.componParam != null && p.componParam.typeValidTV != null && p.componParam.typeValidTV != "no") {
        wWpx = parseInt(rectParent.right - rectParent.left);
        if (wWpx == 0) {
            wWpx = 10;
        } 
        wWpx = wWpx + 8;
        el.style.width = wWpx + px;
    } else {
        wWpx = parseInt(rectParent.right - rectParent.left) + 1;
        el.style.right = "";
        el.style.width = wWpx + px;
        if (pLL > 0) {
            contentEl.style.marginLeft = pLL + px;
        } else {
            contentEl.style.marginLeft = "";
        }
        if (pTT > 0) {
            contentEl.style.marginTop = pTT + px;
        } else {
            contentEl.style.marginTop = "";
        }
    }
}

function wrapEditTextH(el, p) {
    let h;
    if (p.textSize == null || p.textSize == 0) {
        h = 18;
    } else {
        h = p.textSize;
    }
    let standH = standartHeightEditText(h);
    if (p.componParam != null && p.componParam.lines != null && p.componParam.lines > 1 
            && (p.componParam.st_2 == null || p.componParam.st_2 != "text")
            && (p.componParam.st_13 == null || p.componParam.st_13.length == 0)) {
        let plusH = (p.componParam.lines - 1) * 1.3 * p.textSize;
        standH = standH + plusH;
    }
    if (p.componParam.bool_1) {
        standH += 12;
    }
    el.style.height = standH * MEASURE + px;
}

function wrapEditTextW(el, p) {
        let contentEl = el.getElementsByClassName("text")[0];
        rectParent = contentEl.getBoundingClientRect();
        let wWpx = parseInt(rectParent.right - rectParent.left);
        if (wWpx == 0) {
            wWpx = 10;
        } 
        wWpx = wWpx + 8;
        el.style.width = wWpx + px;
}

function showSeekBarEl(seekBar, p) {
    let el = seekBar.getElementsByClassName("_bar")[0];
    if (p.componParam.background != null) {
        if (p.componParam.background > 999) {
            if (el.style.backgroundColor.length > 0) {
                el.style.backgroundColor = "";
            }
            if (p.componParam.background > 1999) {      // Selector

            } else {        // Drawable
                if (p.componParam.background == 1999) {         // new Drawable
                    setDrawable(el, tempDrawable);
                } else {
                    setDrawable(el, JSON.parse(findDrawableByIndex(p.componParam.background)));
                }
            }
        } else {
            el.style.background == "";
            el.style.border = "";
            el.style.borderRadius = "";
            el.style.backgroundColor = findColorByIndex(p.componParam.background);
        }
    } else {
        el.style.background == "";
        el.style.border = "";
        el.style.borderRadius = "";
        el.style.backgroundImage = "";
        el.style.backgroundColor = "";
    }
}

function setBackgoundEl(el, p) {
    if (p.background != null) {
        if ( p.background == 100000) {
            if (p.src != null && p.src != "") {
                el.style.backgroundImage = "url('" + p.src + "')";
                el.style.backgroundSize = "cover";
            } else {
                el.style.backgroundImage = "";
            }
        } else {
            if (p.background > 999) {
                if (el.style.backgroundColor.length > 0) {
                    el.style.backgroundColor = "";
                }
                if (p.background > 1999) {      // Selector

                } else {        // Drawable
                    if (p.background == 1999) {         // new Drawable
                        setDrawableEl(el, tempDrawable);
                    } else {
                        setDrawableEl(el, JSON.parse(findDrawableByIndex(p.background)));
                    }
                }
            } else {
                clearBackgroundDraw(el);
                el.style.backgroundColor = findColorByIndex(p.background);
            }
        }
    } else {
        clearBackgroundDraw(el);
        el.style.backgroundImage = "";
        el.style.backgroundColor = "";
    }
}

function maxChildWidth(el) {
    let child = el.children;
    ik = child.length;
    let elem;
    let maxR = 0;
    let minR = 1000000;
    let elL, elR, elPad, elTt;

    for (let i = 0; i < ik; i++) {
        elem = child[i];
        if (elem.android == null) {
            continue;
        }
        if (elem.android.visibility != null && ! elem.android.visibility) {
            continue;
        }
        rectEl = elem.getBoundingClientRect();
        
        elL = elem.style.marginLeft;

        elTt = 0;
        if (elL != null && elL != "") {
            elTt = parseInt(elL);
        }
        let tt = rectEl.left - elTt;
        if (tt < minR) {
            minR = tt;
        }

        elR = elem.style.marginRight;
        elPad = 0;
        if (elR != null && elR != "") {
            elPad = parseInt(elR);
        }
        let bb = rectEl.right + elPad;
        if (bb > maxR) {
            maxR = bb;
        }
    }
    return maxR - minR;
}

function maxChildHeight(el) {
    let child = el.children;
    ik = child.length;
    let elem;
    let maxB = 0;
    let minB = 1000000;
    let elT, elB, elPad, elTt;
    for (let i = 0; i < ik; i++) {
        elem = child[i];
        if (elem.android == null) {
            continue;
        }
        if (elem.android.visibility != null && ! elem.android.visibility) {
            continue;
        }
        rectEl = elem.getBoundingClientRect();
        elT = elem.style.marginTop;

        elTt = 0;
        if (elT != null && elT != "") {
            elTt = parseInt(elT);
        }
        let tt = rectEl.top - elTt;
        if (tt < minB) {
            minB = tt;
        }
        
        elB = elem.style.marginBottom;
        elPad = 0;
        if (elB != null && elB != "") {
            elPad = parseInt(elB);
        }
        let bb = rectEl.bottom + elPad;
        if (bb > maxB) {
            maxB = bb;
        }
    }
    return maxB - minB;
}

function standartHeightEditText(ts) {
    var tt = parseInt(ts);
    return tt + padTopEditText(tt) + 10;
}

function padTopEditText(ts) {
    return parseInt((ts - 10) * 0.32 + 12.8);
}

function findDimenByName(name) {
    var ik = listDimens.length;
    var result = "0";
    for (var i = 0; i < ik; i++) {
        if (name == listDimens[i].itemName) {
            result = listDimens[i].itemValue;
            break;
        }
    }
    return result;
}