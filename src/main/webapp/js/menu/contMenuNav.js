var n_selectElement;

function n_hiddenContMenu() {
    n_contextMenu.style.visibility='hidden';
    document.getElementById('n_blockAll').style.display = 'none';
}

function n_contMenuStart(e){
    e = e || event;
    var target = e.target || event.srcElement;
    n_selectElement = target.elementLink;
    let pp = n_selectElement.android;
    n_contextMenu.style.left=''+e.clientX+'px';
    n_contextMenu.style.top=''+e.clientY+'px';
    n_contextNameOb.innerHTML=target.elementLink.android.type;
    if (target.elementLink.android.typeFull.typeBlock > 0) {
        n_contextActive.style.color = '#000';
        n_contextActive.onclick = n_clElement;
    } else {
        n_contextActive.style.color = '#999';
        n_contextActive.onclick = '';
    }
    n_contextMenu.style.visibility="visible";
    let elR = n_contextMenu.querySelector(".del");
    if (pp.componParam != null && pp.componParam.nodel) {
        elR.style.display = "none";
    } else {
        elR.style.display = "block";
    }
    elR = n_contextMenu.querySelector(".act");
    if (pp.componParam != null && pp.componParam.noact) {
        elR.style.display = "none";
    } else {
        elR.style.display = "block";
    }
    document.getElementById('n_blockAll').style.display = 'block';
    return false;
}

function n_ovRM(el) {
  el.style.background='#c1e1fc';
}

function n_outRM(el) {
  el.style.background='';
}

function n_clActive(el) {
    setActive(root);
    n_hiddenContMenu();
}

function n_clElement(el) {
    if (n_selectElement.android.typeFull.typeBlock > 0) {
        setActive(n_selectElement);
        n_hiddenContMenu();
        hideContourEl();
    }
}

function n_clDelete(el) {
    n_hiddenContMenu();
    var parent = n_selectElement.parentNode;
    var itemMenu = n_selectElement.android.itemNav;
    delFromLayout(n_selectElement.android);
    parent.removeChild(n_selectElement);
    currentElement = parent;
    var parentMenu = itemMenu.parentNode;
    parentMenu.removeChild(itemMenu);
    var pm = parentMenu.parentNode.getElementsByClassName('plus-minus')[0];
    if (isPunktMenuChild(parent) ) {
        pm.innerHTML = '-';
    } else {
        pm.innerHTML = '&nbsp;';
    }
    viewCompon();
}

function delFromLayout(p) {
    let par = p.parent.android;
    if (par != null) {
        let ik = par.children.length;
        for (let i = 0; i < ik; i++) {
            if (p == par.children[i]) {
                par.children.splice(i, 1);
            }
        }
    }
}

function isPunktMenuChild(el) {
    var child = el.childNodes;
    var ik = child.length;
    if (ik > 0) {
        for (var i = 0; i < ik; i++) {
            if (child[i].android !=  undefined) {
                return true;
            }
        }
    }
    return false;
}