function WindListView(adapter, met, w, h, t, l, tit) {
    this.list;
    this.init = function() {
        let wind = formWind(w, h, t, l, tit, null, null, null, null, "");
        let windParent = wind.closest(".dataWindow")
        let h_footer = 30;
        let controll = createFooter(h_footer);
        wind.style.bottom = (h_footer + 1) + "px";
        windParent.appendChild(controll);
        let addControl = newDOMelement('<IMG SRC="img/add_blue.png" style="margin-left:20px;float:left;width:20px;margin-top:5px;cursor:pointer">');
        controll.appendChild(addControl);
        let edit = newDOMelement('<IMG SRC="img/edit.png" style="margin-left:15px;float:left;width:20px;margin-top:5px;cursor:pointer">');
        edit.addEventListener("click", () => {this.list.editItem(met)}, false);
        controll.appendChild(edit);
        
        let choose = newDOMelement('<IMG SRC="img/choose.png" style="margin-left:15px;float:left;width:20px;margin-top:5px;cursor:pointer">');
        choose.addEventListener("click", () => {this.list.chooseItem(met, windParent)}, false);
        controll.appendChild(choose);
        
        let scrollQu = formViewScrolY(wind);
        let windData = scrollQu.getElementsByClassName("viewData")[0];
        windData.style.marginLeft = "5px";
        
        this.list = new ListView(adapter, windData, "#f6faff");
        addControl.addEventListener("click", () => {this.list.addItem()}, false);
    }

    this.init();
}

