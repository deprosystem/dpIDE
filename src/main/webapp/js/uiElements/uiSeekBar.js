function uiSeekBar() {
    let drawBar = '<div style="margin-left: 10px;float: left;margin-top:5px;">'
            +'<div class="text_style_ui">Drawable</div> '
            +'<div onclick="chooseDrawableSeekB()" style="cursor: pointer;width: 60px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;background: #1DACE9">'
                +'<div style="color: #fff;text-align: center;margin-top: 6px">choose</div>'
            +'</div>'
            +'<div onclick="editDrawableSeekB()" style="margin-lefn:10px;cursor:pointer;width: 70px; margin-left:10px;height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;background: #1DACE9">'
                +'<div style="color: #fff;text-align: center;margin-top: 6px;">edit / new</div>'
            +'</div>'
        +'</div>';

    let imgThumb = '<div style="cursor: pointer; margin-top: 5px;float: left;margin-left: 10px;">'
                +'<div class="text_style_ui">Image</div>'
                +'<img class="thumb_img" onclick="setImgThumb(event)" width="30" height="30" style="width: 30px; height: 30px; float: left; border: 1px solid #bbd4ef;border-radius:5px;">'
            +'</div>';
    
    let meta = [
        {title:"Save in parameters",len:150,type:"Label"},
        {name: "saveParam", title:"min - max",type:"Text",len:80,br:true,valid:"latin"},
        {name: "st_2", title:"min",type:"Text",len:80,valid:"latin"},
        {name: "st_3", title:"max",type:"Text",len:80,valid:"latin"},
        {title:"Show in view",len:150,type:"Label"},
        {name: "st_4", title:"min - max",type:"SelectId",len:80,br:true,tags:"TextView"},
        {name: "st_5", title:"min",type:"SelectId",len:80,tags:"TextView"},
        {name: "st_6", title:"max",type:"SelectId",len:80,tags:"TextView"}
    ]

    this.setElementUI = function(p, newEl, parent) {
        newEl.appendChild(createDivSeekBar(p));
    }
    
    this.newElementUI = function(p) {
        return createDivSeekBar(p);
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = "";
        sbPar = p.seekBarParam;
        contentAttributes.appendChild(newDOMelement('<div style="color:#000;float:left;">Bar options</div>'));
        let h_bar = editNumberParam("Height", 40, 24, 2, 25, "seekBarH");
        h_bar.style.clear = "both";
        h_bar.style.marginTop = "5px";
        setValueNumber(h_bar, sbPar.barHeight);
        contentAttributes.appendChild(h_bar);
        
        let barColor;
        if (p.componParam.background == null) {
            barColor = "#1B5AE730";
        } else {
            if (p.componParam.background < 1000) {
                barColor = findColorByIndex(p.componParam.background);
            } else if (p.componParam.background < 1999) {
                tempDrawable = JSON.parse(findDrawableByIndex(p.componParam.background));
                barColor = findColorByIndex(tempDrawable.color_1);
            } else {
                barColor = "#1B5AE730";
            }
        }
        let c_bar = editColorParam("Color", barColor, 'col_bar', seekColorBar);
        c_bar.style.marginTop = "5px";
        c_bar.style.marginLeft = "10px";
        contentAttributes.appendChild(c_bar);
        
        contentAttributes.appendChild(newDOMelement(drawBar));
        
        contentAttributes.appendChild(newDOMelement('<div style="color:#000;float:left;clear:both;margin-top:5px;">Thumb options</div>'));
        let h_thumb = editNumberParam("Diameter", 40, 24, 20, 50, "seekThumbH");
        h_thumb.style.clear = "both";
        h_thumb.style.marginTop = "5px";
        setValueNumber(h_thumb, sbPar.thumbDiam);
        contentAttributes.appendChild(h_thumb);
        
        let thumbColor;
        if (sbPar.tumbColor == null) {
            thumbColor = "#1B5AE780";
        } else {
            thumbColor = findColorByIndex(sbPar.tumbColor);
        }
        let c_thumb = editColorParam("Color", barColor, 'col_thumb', seekColorThumb);
        c_thumb.style.marginTop = "5px";
        c_thumb.style.marginLeft = "10px";
        contentAttributes.appendChild(c_thumb);
        contentAttributes.appendChild(newDOMelement(imgThumb));
        
        let sss = selectListID("Slider id", 80, currentChildren, sbPar.sliderId, changeSeekSlider);
//        sss.style.clear = "both";
        sss.style.marginLeft = "10px";
        sss.style.marginTop = "5px";
        contentAttributes.appendChild(sss);
        
        let ed_r = editCheckbox("Range", sbPar.range, "seekRange");
        ed_r.style.clear = "both";
        ed_r.style.marginTop = "5px";
        contentAttributes.appendChild(ed_r);
        
        let c_between = editColorParam("Color between", findColorByIndex(sbPar.betweenColor), 'col_between', seekColorBetween);
        c_between.style.marginTop = "5px";
        c_between.style.marginLeft = "10px";
        contentAttributes.appendChild(c_between);
        
        contentAttributes.appendChild(newDOMelement('<div style="color:#000;float:left;clear:both;margin-top:5px;">The values</div>'));
        let v_min = editNumberParam("Min", 40, 24, -1000, 1000, "seekMinV");
        v_min.style.clear = "both";
        v_min.style.marginTop = "5px";
        setValueNumber(v_min, sbPar.minV);
        contentAttributes.appendChild(v_min);
        
        v_min = editNumberParam("Max", 40, 24, -1000, 1000, "seekMaxV");
        v_min.style.marginLeft = "10px";
        v_min.style.marginTop = "5px";
        setValueNumber(v_min, sbPar.maxV);
        contentAttributes.appendChild(v_min);
        
        v_min = editNumberParam("Min initial value", 40, 24, -1000, 1000, "seekMinInitV");
        v_min.style.marginLeft = "10px";
        v_min.style.marginTop = "5px";
        setValueNumber(v_min, sbPar.minInit);
        contentAttributes.appendChild(v_min);
        
        v_min = editNumberParam("Max initial value", 40, 24, -1000, 1000, "seekMaxInitV");
        v_min.style.marginLeft = "10px";
        v_min.style.marginTop = "5px";
        setValueNumber(v_min, sbPar.maxInit);
        contentAttributes.appendChild(v_min);
        
        let sendN = editTextParam("Send notification", 80, sbPar.sendNotif, "seekSendNotif");
        sendN.style.clear = "both";
        sendN.style.marginTop = "5px";
//        sendN.style.marginLeft = "10px";
        contentAttributes.appendChild(sendN);
/*
        let savP = editTextParam("Save in parameters", 80, sbPar.saveParam, "seekSaveParam");
        savP.style.marginTop = "5px";
        savP.style.marginLeft = "10px";
        contentAttributes.appendChild(savP);
*/
        let dd = new EditForm(meta, p.componParam, contentAttributes, null, this, true);
        
    }
    
    this.viewElementUI = function(p, el) {
        let cc = el.getElementsByClassName("_seekBar")[0];
        cc.innerHTML = "";
        sbPar = p.seekBarParam;
        let h_bar = sbPar.barHeight * MEASURE;
        let thumbDiam = sbPar.thumbDiam * MEASURE;
        let tumbColor;
        if (sbPar.tumbColor == null) {
            tumbColor = "#1B5AE780";
        } else {
            tumbColor = findColorByIndex(sbPar.tumbColor);
        }
        let td2 = thumbDiam / 2;
        let td_b_2 = (thumbDiam - h_bar) / 2
        
        let bar = newDOMelement('<div class="_bar" style="position:absolute;left:' + td2 + 'px;right:' + td2 + 'px;top:' + td_b_2 + 'px;height:' 
                + h_bar + 'px;"></div>');
        cc.appendChild(bar);
        
        let tumb;
        if (sbPar.range) {
            let bet_color = findColorByIndex(sbPar.betweenColor);
            let between = newDOMelement('<div class="_between" style="position:absolute;left:' + (td2 + thumbDiam) + 'px;width:' + (thumbDiam * 2) + 'px;top:' 
                    + td_b_2 + 'px;height:' + h_bar + 'px;background-color:' + bet_color + '"></div>');
            cc.appendChild(between);
            if (sbPar.tumbColor == 100000) {
                tumb = newDOMelement('<div class="_tumb" style="position:absolute;left:' + (thumbDiam * 3) + 'px;height:' 
                    + thumbDiam + 'px;width:' + thumbDiam + 'px;background-size:cover;background-image:url(' + "'" + p.src + "');" + '"></div>');
            } else {
                tumb = newDOMelement('<div class="_tumb" style="position:absolute;left:' + (thumbDiam * 3) + 'px;height:' 
                    + thumbDiam + 'px;width:' + thumbDiam + 'px;border-radius:' + td2 + 'px;background-color:' + tumbColor + '"></div>');
            }
            cc.appendChild(tumb);
        }
        if (sbPar.tumbColor == 100000) {
            tumb = newDOMelement('<div class="_tumb" style="position:absolute;left:' + thumbDiam + 'px;height:' 
                + thumbDiam + 'px;width:' + thumbDiam + 'px;background-size:cover;background-image:url(' + "'" + p.src + "');" + '"></div>');
        } else {
            tumb = newDOMelement('<div class="_tumb" style="position:absolute;left:' + thumbDiam + 'px;height:' 
                + thumbDiam + 'px;width:' + thumbDiam + 'px;border-radius:' + td2 + 'px;background-color:' + tumbColor + '"></div>');
        }
        cc.appendChild(tumb);
        
        showSeekBarEl(el, p);
    }
}

function createDivSeekBar(p) {
    if (p.componParam == null) {
        p.componParam = {type:16, background:2};
    }
    if (p.seekBarParam == null) {
        p.seekBarParam = {thumbDiam:32, thumbImg:"", barHeight:12, range:false, betweenColor:1, minV:0, maxV:100, minInit:0, maxInit:0, sliderId:"", 
            sendNotif:"", saveParam:""};
    }
    if (p.hideParam == null) {
        p.hideParam = 36; // 100000
    }
/*
    if (p.background == null) {
        p.background = "2";
    }
*/    
    return div = newDOMelement('<div class="_seekBar" style="position: absolute;left:0;top:0;right:0;bottom:0"></div>');
}

function seekBarH(el) {
    currentElement.android.seekBarParam.barHeight = el.value;
    viewCompon();
}

function seekThumbH(el) {
    currentElement.android.seekBarParam.thumbDiam = el.value;
    viewCompon();
}

function seekColorBar(id, color) {
    paramCompon.componParam.background = id;
    let el_col = contentAttributes.getElementsByClassName("col_bar")[0];
    el_col.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function seekColorThumb(id, color) {
    paramCompon.seekBarParam.tumbColor = id;
    let el_col = contentAttributes.getElementsByClassName("col_thumb")[0];
    el_col.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function showSeekBar() {
    showSeekBarEl(currentElement, currentElement.android);
}

function editDrawableSeekB() {
    editDrawable(showSeekBar, currentElement.android.componParam);
}

function chooseDrawableSeekB() {
    chooseDrawable(showSeekBar, currentElement.android.componParam);
}

function setImgThumb(e) {
    selectListImage(e, cbImgThumb);
}

function cbImgThumb(i) {
    let nn = listImage[i];
    let el_col = contentAttributes.getElementsByClassName("thumb_img")[0];
    el_col.src = nn;
    let p = currentElement.android;
    p.seekBarParam.tumbColor = 100000;
    p.src = nn;
    viewCompon();
}

function seekRange(vv) {
    currentElement.android.seekBarParam.range = vv;
    viewCompon();
}

function seekColorBetween(id, color) {
    paramCompon.seekBarParam.betweenColor = id;
    let el_col = contentAttributes.getElementsByClassName("col_between")[0];
    el_col.style.backgroundColor = color;
    windSelectColor.style.display = 'none';
    viewCompon();
}

function seekMinV(el) {
    currentElement.android.seekBarParam.minV = el.value;
}

function seekMaxV(el) {
    currentElement.android.seekBarParam.maxV = el.value;
}

function seekMinInitV(el) {
    currentElement.android.seekBarParam.minInit = el.value;
}

function seekMaxInitV(el) {
    currentElement.android.seekBarParam.maxInit = el.value;
}

function changeSeekSlider(el) {
    currentElement.android.seekBarParam.sliderId = el.options[el.selectedIndex].value;
}

function seekSendNotif(el) {
    currentElement.android.seekBarParam.sendNotif = el.value;
}
/*
function seekSaveParam(el) {
    currentElement.android.seekBarParam.saveParam = el.value;
}
*/