var angleResizeX, angleResizeY;
var delta_x, delta_y;
var parentX, parentY, parentWpx, parentHpx;
var status;
var statusNEW = 0, statusOLD = 1;
var formNewElem = false;
var elementTop, elementLeft;
var elClick = null;
const deltaOfset = 3;

function moveElement(event) {
    let x = event.pageX;
    let y = event.pageY;
    let rectParent = currentElement.android.parent.getBoundingClientRect();
    parentX = parseInt(rectParent.left);
    parentY = parseInt(rectParent.top);
    parentWpx = parseInt(rectParent.right - rectParent.left);
    parentHpx = parseInt(rectParent.bottom - rectParent.top);
    let rect = currentElement.getBoundingClientRect();
    elementTop = parseInt(rect.top);
    elementLeft = parseInt(rect.left);
    var x_block = rect.left - parentX;
    var y_block = rect.top - parentY;
    delta_x = x_block - x;
    delta_y = y_block - y;
    currentElement.style.top = "0px";
    currentElement.style.marginTop = y_block + px;
    currentElement.style.left = "0px";
    currentElement.style.width = rect.width + px;
    currentElement.style.right = "";
    currentElement.style.marginLeft = x_block + px;
    document.onmousemove = moveEl;
    document.onmouseup = moveUp;
    event.stopPropagation();
}

function moveEl(event) {
    var x = event.pageX;
    var y = event.pageY;
    var new_x = delta_x + x;
    var new_y = delta_y + y;
    if (new_x < 0) {
        new_x = 0;
    }
    if (new_y < 0) {
        new_y = 0;
    }
    if (new_x <= parentWpx && new_y <= parentHpx) {
        currentElement.style.marginTop = new_y + px;
        currentElement.style.marginLeft = new_x + px;
        footer_inf.innerHTML = 'Y='+(new_y/ MEASURE).toFixed(1)+"dp X="+(new_x/ MEASURE).toFixed(1)+'dp';
    }
}

function moveUp(e) {
    footer_inf.innerHTML = "";
    document.onmousemove = null;
    document.onmouseup = null;
    let rect = currentElement.getBoundingClientRect();
    let dX = elementLeft - parseInt(rect.left);
    let dY = elementTop - parseInt(rect.top);
    if (dX < 0) {
        dX = - dX;
    }
    if (dY < 0) {
        dY = - dY;
    }
    if (dX < deltaOfset && dY < deltaOfset) {
        clickEl();
        return;
    }

    elementTop = rect.top;
    elementLeft = rect.left;
    
    let p = currentElement.android;
    var XX, YY;
    p.gravLayout.h = ABSOLUTE;
    p.gravLayout.v = ABSOLUTE;
    YY = parseInt(currentElement.style.marginTop);
    XX = parseInt(currentElement.style.marginLeft);
    p.topMarg = parseInt(YY / MEASURE);
    p.leftMarg = parseInt(XX / MEASURE);
    if (p.above != undefined) {
        p.above = undefined;
    }
    if (p.below != undefined) {
        p.below = undefined;
    }
    if (p.toRightOf != undefined) {
        p.toRightOf = undefined;
    }
    if (p.toLeftOf != undefined) {
        p.toLeftOf = undefined;
    }
    setParamCompon();
    viewCompon();
//    currentElement.style.right = "";
}

function mouseUpEl(e) {
    formNewElem = false;
    footer_inf.innerHTML = "";
    var e = e || window.event;
    document.onmousemove = null;
    var p = currentElement.android;
    let csw = currentElement.style.width;
    var w;
    if (csw != "") {
        w = parseInt(csw);
    } else {
        if (p.width == MATCH) {
            w = parseInt(ACTIVE.style.width);
        }
    }
    var h;
    let csh = currentElement.style.height;
    if (csh != "") {
        h = parseInt(csh);
    } else {
        if (p.height == MATCH) {
            h = parseInt(ACTIVE.style.height);
        }
    }
    if (w > 1 || h > 1) {
        var XX, YY;
        p.gravLayout.h = ABSOLUTE;
        p.gravLayout.v = ABSOLUTE;
        p.width = parseInt(w / MEASURE);
        p.height = parseInt(h / MEASURE);
        YY = parseInt(currentElement.style.marginTop);
        XX = parseInt(currentElement.style.marginLeft);
        p.topMarg = parseInt(YY / MEASURE);
        p.leftMarg = parseInt(XX / MEASURE);
        setParamCompon();
        viewCompon();
        currentElement.style.right = "";
        if (p.type == "RecyclerView") {
            setActive(currentElement);
        }
    }
    elClick = null;
}

function clickEl() {
//console.log("currentElement.getElementsByClassName('contourEl')[0]="+currentElement.getElementsByClassName('contourEl')[0]);
    if (currentElement.getElementsByClassName('contourEl')[0] != null) {
//console.log("clickEl hideScroll currentElement="+currentElement);
        hideContourEl();
/*
        if (currentElement != null) {
            hideScroll(currentElement);
        }
*/
    } else {
//console.log("clickEl showScroll");
        let targ = event.target;
        if (targ != null) {
            currentElement = targ;
//            showScroll(currentElement);
        }
//console.log("clickEl setPickElement");
        setPickElement();
    }
}

function addNewElement(target, el) {
    el.android.parent = target;
    target.appendChild(el);
}

function createNewEl() {
    var container = document.createElement('div');
//  ??????    onmousedown
    container.innerHTML = '<div class="element" onmousedown="resizeContour(event)" style="position: absolute; outline: 2px solid #aaa; overflow: hidden"></div>'
    return container.firstChild;
}

function mouseUpNewEl(e) {
    formNewElem = false;
    document.onmousemove = null;
    document.onmouseup = null;
    var e = e || window.event;
    var w = parseInt(currentElement.style.width);
    var h = parseInt(currentElement.style.height);
    var p;
    if (w > 1 || h > 1) {
        var XX, YY;
        p = currentElement.android;
        p.gravLayout.h = ABSOLUTE;
        p.gravLayout.v = ABSOLUTE;
        p.gravity.h = NONE;
        p.gravity.v = NONE;
        p.width = parseInt(w / MEASURE);
        p.height = parseInt(h / MEASURE);
        YY = parseInt(currentElement.style.marginTop);
        XX = parseInt(currentElement.style.marginLeft);
        p.topMarg = parseInt(YY / MEASURE);
        p.leftMarg = parseInt(XX / MEASURE);
        
        if (status == statusNEW) {
            addNavigatorEl(currentElement);
            if (ACTIVE.android.children == null) {
                ACTIVE.android.children = [];
            }
            ACTIVE.android.children.push(currentElement.android);
            p.viewElement = currentElement;
        }
        
        var typeEl = null;
        try {
            uiFunction = eval("new ui" + p.type + "()");
            typeEl = uiFunction.newElementUI(p);
        } catch(e) {
//console.log("mouseUpNewEl catch="+e+"<<");
        }
        if (typeEl != null) {
            currentElement.appendChild(typeEl);
        }
        setParamCompon();
        showElemChilds(currentElement);
    } else {
        ACTIVE.removeChild(currentElement);
        currentElement = null;
        layoutParam.style.display = 'none';
        if (elClick != null) {
            clickElement(e, elClick);
            elClick = null;
        }
    }
}

function resizeContour(e) {
    if (e.button == 2) {
        return;
    }
    var classN = e.target.className;
    let el = e.currentTarget;
    if (el.android != null) {
        if (elClick == null) {
            elClick = el;
        }
    }
    if (classN.indexOf('contour') == -1) {
        if (e.target === ACTIVE) {
            classN = 'active'
        } else {
            if (e.currentTarget === ACTIVE) {
                classN = 'active'
            }
        }
    }
    status = statusOLD;
    if (classN === 'active') {
        status = statusNEW;
        var x = e.pageX;
        var y = e.pageY;
        hideContourEl();
        currentElement = createNewEl();
        p = {typeUxUi: "ui",children:[],viewId:""};
        p.type = typeInsert;
        p.typeFull = insertTypeFull;
        p.gravLayout = {};
        p.gravity = {};
        currentElement.android = p;
        addNewElement(ACTIVE, currentElement);
        let rectParent = p.parent.getBoundingClientRect();
        parentX = parseInt(rectParent.left) + window.pageXOffset;
        parentY = parseInt(rectParent.top) + window.pageYOffset;
        parentWpx = parseInt(rectParent.right - rectParent.left);
        parentHpx = parseInt(rectParent.bottom - rectParent.top);
        angleResizeX = parseInt((x - parentX) / MEASURE) * MEASURE;
        angleResizeY = parseInt((y - parentY) / MEASURE) * MEASURE;
        currentElement.style.marginTop = angleResizeY +'px';
        currentElement.style.marginLeft = angleResizeX +'px';
        currentElement.style.width = '0px';
        currentElement.style.height = '0px';
        appendContour();
        
        e.stopPropagation();
        document.onmousemove = resizeNewAngle;
        document.onmouseup = mouseUpNewEl;
    } else if (classN.indexOf('contour') > -1) {
        currentElement = e.target.closest(".element");
        switch(classN) {
            case 'contourRB':
                angleResizeX = currentElement.offsetLeft;
                angleResizeY = currentElement.offsetTop;
                break;
            case 'contourRT':
                angleResizeX = currentElement.offsetLeft;
                angleResizeY = currentElement.offsetTop + currentElement.clientHeight;
                break;
            case 'contourLT':
                angleResizeX = currentElement.offsetLeft + currentElement.clientWidth;
                angleResizeY = currentElement.offsetTop + currentElement.clientHeight;
                break;
            case 'contourLB':
                angleResizeX = currentElement.offsetLeft + currentElement.clientWidth;
                angleResizeY = currentElement.offsetTop;
                break;
        }
        e.stopPropagation();
        let rectParent = currentElement.android.parent.getBoundingClientRect();
        parentX = parseInt(rectParent.left) + window.pageXOffset;
        parentY = parseInt(rectParent.top) + window.pageYOffset;
        document.onmousemove = resizeNewAngle;
        document.onmouseup = mouseUpEl;
    } else {
        document.onmouseup = clickEl;
    }
}

function resizeNewAngle(e) {
    formNewElem = true;
    var e = e || window.event;
    var x = e.pageX;
    var y = e.pageY;
    var deltY = parseInt((y - angleResizeY - parentY) / MEASURE) * MEASURE;
    var deltX = parseInt((x - angleResizeX - parentX) / MEASURE) * MEASURE;
    if (deltX >= 0) {
        currentElement.style.width = deltX + px;
    } else {
        currentElement.style.width = ( -deltX) + px;
        currentElement.style.marginLeft = (angleResizeX + deltX) +px;
    }
    if (deltY >= 0) {
        currentElement.style.height = deltY + px;
    } else {
        currentElement.style.height = ( -deltY) + px;
        currentElement.style.top = "0px";
        currentElement.style.marginTop = (angleResizeY + deltY) +px;
    }
}