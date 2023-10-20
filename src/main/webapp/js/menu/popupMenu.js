function popupMenu(target, w, menu, listener, param) {
    let xy = getCoordsEl(target);
    let x = xy.left;
    let y = xy.top;
    let h = xy.height;
    y = y + h;
    
    let dv = document.createElement('div');
    dv.style.cssText = "position:absolute;width:" + w + "px;padding-left:10px;padding-right:10px;background:white;border:1px solid #1dace9;border-radius:8px;left:" 
            + x + "px;top:" + y + "px;z-index:100";
    let st = "";
    if (menu != null && menu.length > 0) {
        let arrMes = menu.split(",");
        for (let i = 0; i < arrMes.length; i++) {
            let item = document.createElement("div");
            item.className = "itemPopup";
            if (i == 0) {
                item.style.cssText = "height:40px;border-top:1px solid #" + "fff";
            } else {
                item.style.cssText = "height:40px;border-top:1px solid #" + "1dace9";
            }
            let txtItem = document.createElement("div");
            txtItem.style.cssText = "cursor:pointer;font-size:16px;font-weight:600;margin-top:10px;";
            txtItem.innerHTML = arrMes[i];
            item.appendChild(txtItem);
            txtItem.addEventListener("click", function(){
                listener(i, param);
                dv.parentNode.removeChild(dv);
                target.popup = null;
            }, true);
            dv.appendChild(item);
        }
    }
    document.body.append(dv);
    return dv;
}
