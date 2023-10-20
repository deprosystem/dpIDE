function resizeScrollItem(el) {
    if (el.scroll_y != null) {
        el.scroll_y.resize();
    } else {
        let scrollY = new ScrollItem(el);
    }
}

function resizeScroll(el) {
    let elScr = el;
    if (el.className.indexOf("infoItem") == -1) {
        elScr = el.querySelector(".infoItem");
    }
    if (elScr != null) {
        resizeScrollItem(elScr);
    }
}



