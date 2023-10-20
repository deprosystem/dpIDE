function ListView(adapter, container, selColor) {
    this.list = adapter.getList();
    this.scroll_y;
    this.children;

    this.creteList = function() {
        let scr = container.closest('.viewport');
        if (scr != null) {
            this.scroll_y = scr.scroll_y;
        }
        let ik = this.list.length;
        let selPos = adapter.getSelectItemPos();
        for (let i = 0; i < ik; i++) {
            let itemV = adapter.createOneItem(i);
            itemV.positInListView = i;
            if (i == selPos) {
                itemV.style.backgroundColor = selColor;
            }
            itemV.addEventListener("click", () => {this.clickItem(itemV)}, false);
            container.append(itemV);
        }
//        this.children = container.children;
        if (this.scroll_y != null) {
            this.scroll_y.resize();
        }
    }
/*
    this.getSelectItem = function() {
        return this.list[adapter.getSelectItemPos()];
    }
*/
    this.editItem = function (met) {
        let wind = adapter.chooseEditForm();
        wind.innerHTML = "";
        new EditForm(met.meta, this.list[adapter.getSelectItemPos()].param, wind, null, this);
    }
    
    this.addItem = function() {
        this.list.push(adapter.getNewItem());
        let selPos = adapter.getSelectItemPos();
        if (selPos > -1) {
            container.children[selPos].style.backgroundColor = "";
        }
        let ik = this.list.length - 1;
        adapter.setSelectItemPos(ik);
        let itemV = adapter.createOneItem(ik);
        itemV.style.backgroundColor = selColor;
        itemV.positInListView = ik;
        itemV.addEventListener("click", () => {this.clickItem(itemV)}, false);
        container.append(itemV);
        if (this.scroll_y != null) {
            this.scroll_y.resize();
        }
    }
    
    this.clickItem = function(el) {
        let selPos = adapter.getSelectItemPos();
        if (selPos > -1) {
            container.children[selPos].style.backgroundColor = "";
        }
        selPos = el.positInListView;
        adapter.setSelectItemPos(selPos);
        container.children[selPos].style.backgroundColor = selColor;
    }
    
    this.cbEdit = function() {
        let pos = adapter.getSelectItemPos();
        let item = this.list[pos];
        let ch = container.children;
        let res = ch[pos];
        res.innerHTML = "";
        adapter.viewOneContent(res, item);
    }
    
    this.chooseItem = function(met, ww) {
        closeDataWindow(ww);
        adapter.setChooseResult(met.name);
    }
 
    this.creteList();
}