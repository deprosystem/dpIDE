function ColorCircle(parent) {
    this.centerX;
    this.centerY;
    this.circleTop;
    this.circleLeft;
    this.deltX;
    this.deltY;
    this.deltX_T;
    this.ind;
    this.saturation;
    this.lightness;
//    this.cb = cb;
    this.listenerMove;
    this.ctx;
    this.screen
    this.rule;
    this.accent;
    this.listColor = [{name:"primary",h:0,s:100,l:50,a:1},{name:"accent",h:180,s:100,l:50,a:1},
        {name:"secondary",h:150,s:100,l:50,a:1},{name:"tertiary",h:210,s:100,l:50,a:1}];
    
    let radius = 150;
    let coefSaturation = 1.5;
    let radiusPoint = 12;
    let diamPoint = 24;
    let diamPoint_1 = 20;
    let diamPoint_2 = 16;
    let radiusMin = 148;  // До центра this.primary
    let diamThumb = 32;
    let radiusThumb = 16;
    let widthSetting = 250;
    let leftSetting = 380;
    let MEASURE = 0.6;

    this.init = function(){
//        this.rule = 0;
        let stCircle = '<div style="left:15px;top:15px;width: 300px; height: 300px;position: absolute;border-radius:50%;overflow:visible"></div>';
        let stGrad = '<div style="position: absolute;left: 0px;top: 0px;width: 100%;height: 100%;border-radius: 50%;background: conic-gradient(red, yellow, lime, aqua,blue,  magenta, red);"></div>';
        let stSS = '<div style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border-radius: 50%; box-sizing: border-box; background: radial-gradient(circle closest-side, #808080, transparent);"></div>'
        this.circle = newDOMelement(stCircle);
        this.gradient = newDOMelement(stGrad);
        this.primary = this.createPoint(diamPoint, this.listColor[0]);
        this.primary.addEventListener("mousedown", () => {this.mouseDown(0);}, true);
        this.accent = this.createPoint(diamPoint_1, this.listColor[1]);
        this.accent.addEventListener("mousedown", () => {this.mouseDown(1);}, true);
        this.circle.append(this.gradient);
        this.circle.append(newDOMelement(stSS));
        this.circle.append(this.primary);
        this.circle.append(this.accent);
        parent.onselectstart = function() { return false; }
        parent.append(this.circle);
        parent.append(newDOMelement('<div style="position:absolute;height: 20px;top:10px;left: 420px;">Rule color harmony</div>'));
        let complem = newDOMelement('<div style="position:absolute;top:32px;left: 382px;cursor:pointer">Complementary</div>');
        complem.addEventListener("click", () => {this.clickRule(0);}, true);
        parent.append(complem);
        let triad = newDOMelement('<div style="position:absolute;top:32px;left:470px;cursor:pointer">Triad</div>');
        triad.addEventListener("click", () => {this.clickRule(1);}, true);
        parent.append(triad);
        let split = newDOMelement('<div style="position:absolute;top:32px;left: 500px;cursor:pointer">Split</div>');
        split.addEventListener("click", () => {this.clickRule(2);}, true);
        parent.append(split);
        let square = newDOMelement('<div style="position:absolute;top:32px;left: 527px;cursor:pointer">Square</div>');
        square.addEventListener("click", () => {this.clickRule(3);}, true);
        parent.append(square);
        this.fieldOfColors = this.createFieldOfColors();
        parent.append(this.fieldOfColors);
        this.auxiliaryColors = this.createAuxiliaryColors();
        parent.append(this.auxiliaryColors);
        
        this.saturation = newDOMelement('<div style="position: absolute;left:' + leftSetting + 'px;top: 100px;width:' + (widthSetting + diamThumb) + 'px;height:' + diamThumb 
                + 'px;border-radius: 22px;border:2px solid #aaa"></div>');
        this.saturationThumb = this.createThumb(this.saturation);
        this.saturationThumb.addEventListener("mousedown", () => {this.mouseDownSaturThumb();}, true);
        parent.append(this.saturation);
        this.txtSatur = newDOMelement('<div style="position: absolute;left:' + (leftSetting - 50) + 'px;top: 108px;">S 270</div>');
        parent.append(this.txtSatur);
        this.txtLightness = newDOMelement('<div style="position: absolute;left:' + (leftSetting - 50) + 'px;top: 158px;">L 70</div>');
        parent.append(this.txtLightness);
        this.txtAlpha = newDOMelement('<div style="position: absolute;left:' + (leftSetting - 50) + 'px;top: 208px;">A 100</div>');
        parent.append(this.txtAlpha);
        
        this.lightness = newDOMelement('<div style="position: absolute;left:' + leftSetting + 'px;top: 150px;width:' + (widthSetting + diamThumb) + 'px;height:' + diamThumb 
                + 'px;border-radius: 22px;border:2px solid #aaa"></div>');
        this.lightnessThumb = this.createThumb(this.lightness);
        this.lightnessThumb.addEventListener("mousedown", () => {this.mouseDownLightnessThumb();}, true);
        parent.append(this.lightness);
        
        let alpha_1 = newDOMelement('<div style="position: absolute;left:' + leftSetting + 'px;top: 200px;width:' + (widthSetting + diamThumb) + 'px;height:' + diamThumb 
                + 'px;border-radius: 22px;border:2px solid #aaa;background: conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px"></div>');
        this.alpha = newDOMelement('<div style="position: absolute;left:0;top:0;width:100%;height:100%;border-radius: 22px;"></div>');
        this.alphaThumb = this.createThumb(this.alpha);
        this.alphaThumb.addEventListener("mousedown", () => {this.mouseDownAlphaThumb();}, true);
        alpha_1.append(this.alpha);
        parent.append(alpha_1);
        let save = newDOMelement('<div style="cursor:pointer;height:30px;background:#1DACE9;border-radius:4px;left:720px;bottom:18px;position:absolute;;width:80px">'
                +'<div style="text-align: center;margin-top:7px;color:#fff">Save</div></div>');
        save.addEventListener("click", () => {this.savePalette();}, true);
        parent.append(save);
        let cancel = newDOMelement('<div style="cursor:pointer;height:30px;border-radius:4px;border:1px solid #1DACE9;left:810px;bottom:18px;position:absolute;;width:80px">'
                +'<div style="text-align: center;margin-top:7px;color:#1DACE9">Cancel</div></div>');
        cancel.addEventListener("click", () => {closeDataWindow(cancel);}, true);
        parent.append(cancel);
        
        this.formScreen();
        this.clickRule(0);
        this.setHue(3);
        this.setHue(2);
        this.setHue(1);
        this.setHue(0);
        this.ind = 0;
        this.setSetting(0);
    }
    
    this.savePalette = function() {
        closeDataWindow(parent);
        let hsl = this.listColor[0];
        let rgba = hslaToHexa(hsl);
        listColor[0].itemValue = rgba;
        presetColor_0.style.backgroundColor = rgba;
        let dark = hsl.l - 10;
        if (dark < 0) {
            dark = 0;
        }
        let hslV = {h:hsl.h, s:hsl.s, l:dark, a:hsl.a};
        rgba = hslaToHexa(hslV);
        listColor[1].itemValue = rgba;
        presetColor_1.style.backgroundColor = rgba;
        let light = hsl.l + 15;
        if (light > 100) {
            light = 100;
        }
        hslV.l = light;
        rgba = hslaToHexa(hslV);
        listColor[2].itemValue = rgba;
        presetColor_2.style.backgroundColor = rgba;
        
        hsl = this.listColor[1];
        rgba = hslaToHexa(hsl);
        listColor[3].itemValue = rgba;
        presetColor_3.style.backgroundColor = rgba;
        
        dark = hsl.l - 10;
        if (dark < 0) {
            dark = 0;
        }
        hslV = {h:hsl.h, s:hsl.s, l:dark, a:hsl.a};
        rgba = hslaToHexa(hslV);
        listColor[4].itemValue = rgba;
        presetColor_4.style.backgroundColor = rgba;
        light = hsl.l + 15;
        if (light > 100) {
            light = 100;
        }
        hslV.l = light;
        rgba = hslaToHexa(hslV);
        listColor[5].itemValue = rgba;
        presetColor_5.style.backgroundColor = rgba;
        isColorChange = true;
        setScreenView();
    }
    
    this.clickRule = function(rule) {
        if (this.rule == rule) return;
        this.rule = rule;
        let list = this.listColor;
        let list_0 = list[0];
        let list_2 = list[2];
        let list_3 = list[3];
        if (list_2.el != null) {
            list_2.el.remove();
            list_3.el.remove();
        }
        let noView = false;
        let angle_1, angle_2;
        switch (rule) {
            case 0:
                list_2.h = list_0.h;
                list_3.h = list_0.h;
                list_2.l = 50;
                list_3.l = 50;
                let S_2 = list_0.s - 25;
                let S_3 = list_0.s - 50;
                if (S_2 < 0) {
                    S_2 += 100;
                }
                list_2.s = S_2;
                if (S_3 < 0) {
                    S_3 += 100;
                }
                list_3.s = S_3;
                this.secondary = this.createPoint(diamPoint_2, this.listColor[2], true);
                this.tertiary = this.createPoint(diamPoint_2, this.listColor[3], true);
                this.circle.append(this.secondary);
                this.circle.append(this.tertiary);
                break;
            case 2:
            case 3:
            case 1:
                switch (rule) {
                    case 1:
                        angle_1 = 120;
                        angle_2 = 240;
                        break;
                    case 2:
                        angle_1 = 150;
                        angle_2 = 210;
                        break;
                    case 3:
                        angle_1 = 90;
                        angle_2 = 270;
                        break;
                }
                list_2.h = list_0.h + angle_2;
                if (list_2.h > 360) {
                    list_2.h = list_2.h - 360;
                }
                list_3.h = list_0.h + angle_1;
                if (list_3.h > 360) {
                    list_3.h = list_3.h - 360;
                }
                list_2.l = list_0.l;
                list_3.l = list_0.l;
                list_2.s = list_0.s;
                list_3.s = list_0.s;
                this.secondary = this.createPoint(diamPoint_2, this.listColor[2]);
                this.secondary.addEventListener("mousedown", () => {this.mouseDown(2);}, true);
                this.tertiary = this.createPoint(diamPoint_2, this.listColor[3]);
                this.tertiary.addEventListener("mousedown", () => {this.mouseDown(3);}, true);
                this.circle.append(this.secondary);
                this.circle.append(this.tertiary);
                break;
        }
        this.setHue(3);
        this.setHue(2);
    }
    
    this.createThumb = function(el) {
        let stPoint = '<svg style="width:' + diamThumb + 'px; height:' + diamThumb + 'px; position: absolute;overflow:visible">'
                    +'<circle cx="' + radiusThumb + '" cy="' + radiusThumb + '" r="' + radiusThumb + '" fill="none" stroke-width="2" stroke="#000"></circle>'
                    +'<circle cx="' + radiusThumb + '" cy="' + radiusThumb + '" r="' + (radiusThumb - 2) + '" fill="none" stroke-width="2" stroke="#fff"></circle>'
                +'</svg>';
        t = newDOMelement(stPoint);
        el.append(t);
        return t;
    }
    
    this.createPoint = function(diam, param, noView) {
        let radius = diam / 2;
        let stPoint;
        if (noView) {
            stPoint = '<div style="width:' + diam + 'px; height:' + diam + 'px; position: absolute;pointer-events: none;"></div>';
        } else {
            stPoint = '<svg class="' + param.name + '" style="width:' + diam + 'px; height:' + diam + 'px; position: absolute;overflow:visible">'
                        +'<circle cx="' + radius + '" cy="' + radius + '" r="' + radius + '" fill="none" stroke-width="2" stroke="#000"></circle>'
                        +'<circle cx="' + radius + '" cy="' + radius + '" r="' + (radius - 2) + '" fill="none" stroke-width="2" stroke="#fff"></circle>'
                    +'</svg>';
        }
        param.el = newDOMelement(stPoint);
        param.radius = radius;
        param.el.hsl = param;
        return param.el;
    }
    
    this.createFieldOfColors = function() {
        let field = newDOMelement('<div style="position:absolute;left:12px;top:380px;width:650px;height:120px"></div>');
        let ik = 5;
        for (let i = 0; i < ik; i++) {
            field.append(this.colorPoint());
        }
        let nameColor = newDOMelement('<div style="position:absolute;left:12px;top:360px;width:650px;height:20px"></div>');
        nameColor.append(this.namePoint("Primary"));
        nameColor.append(this.namePoint("Accent"));
        nameColor.append(this.namePoint("Secondary"));
        nameColor.append(this.namePoint("Tertiary"));
        nameColor.append(this.namePoint("Background"));
        parent.append(nameColor);
        return field;
    }
    
    this.createAuxiliaryColors = function() {
        parent.append(newDOMelement('<div style="position:absolute;left:32px;top:510px;">AuxiliaryColors</div>'))
        let field = newDOMelement('<div style="position:absolute;left:12px;top:530px;width:650px;height:80px"></div>');
        let ik = 4;
        for (let i = 0; i < ik; i++) {
            field.append(this.colorAuxiliaryPoint());
        }
        return field;
    }
    
    this.namePoint = function(name) {
        let cont = newDOMelement('<div style="width: 130px;height: 100%;float:left;"></div>');
        cont.append(newDOMelement('<div style="width:100%;height:100%;text-align: center;">' + name + '</div>'));
        return cont;
    }
    
    this.setSetting = function(i) {
        let hsl = this.listColor[i];
        this.saturation.style.background = 'linear-gradient(to right, #808080, hsl(' + hsl.h +',100%,50%))';
        this.saturationThumb.style.left = Math.round(widthSetting * hsl.s / 100) + "px";
        let s = hsl.s;
        let h = hsl.h;
        this.lightness.style.background = 'linear-gradient(to right, hsl(' + h +',' + s + '%, 0%),hsl(' + h +',' + s + '%, 20%),hsl(' + h +',' + s + '%, 40%),hsl(' + h +',' + s 
                + '%, 60%),hsl(' + h +',' + s + '%, 80%),hsl(' + h +',' + s + '%, 100%))';
        this.lightnessThumb.style.left = Math.round(widthSetting * hsl.l / 100) + "px";
        
        this.alpha.style.background = 'linear-gradient(to right, hsla(' + h +',100%, 50%,0.0),hsla(' + h +',100%, 50%, 1.0))';
        this.alphaThumb.style.left = Math.round(widthSetting * hsl.a) + "px";
    }
    
    this.colorPoint = function() {
        let cont = newDOMelement('<div style="width: 130px;height: 100%;float:left;background: conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px"></div>');
        cont.append(newDOMelement('<div style="width: 100%;height: 100%;"></div>'));
        return cont;
    }
    
    this.colorAuxiliaryPoint = function() {
        let cont = newDOMelement('<div style="width: 130px;height: 100%;float:left;background: conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px"></div>');
        cont.append(newDOMelement('<div style="width: 100%;height: 50%;"></div>'));
        cont.append(newDOMelement('<div style="width: 100%;height: 50%;"></div>'));
        return cont;
    }

    this.mouseDownAlphaThumb = function() {
        let x = event.pageX;
        let rectEl = event.target.getBoundingClientRect();
        this.deltX_T = x - rectEl.left;
        this.listenerMove = () => {this.mouseMoveAlphaThumb();};
        document.addEventListener("mousemove", this.listenerMove, false);
        document.addEventListener("mouseup", () => {document.removeEventListener("mousemove", this.listenerMove, false)}, false);
    }
    
    this.mouseMoveAlphaThumb = function() {
        let hsl = this.listColor[this.ind];
        let rect = this.alpha.getBoundingClientRect();
        let centerElX = event.pageX + this.deltX_T - diamThumb - rect.left;
//        let centerElX = event.pageX - this.deltX_T + radiusThumb - leftSetting;
        if (centerElX < 0) {
            centerElX = 0;
        } else if (centerElX > widthSetting) {
            centerElX = widthSetting;
        }
        this.alphaThumb.style.left = centerElX + "px";
        hsl.a = centerElX / widthSetting;
        this.setHue(this.ind);
    }
    
    this.mouseDownLightnessThumb = function() {
        let x = event.pageX;
        let rectEl = event.target.getBoundingClientRect();
        this.deltX_T = x - rectEl.left;
        this.listenerMove = () => {this.mouseMoveLightnessThumb();};
        document.addEventListener("mousemove", this.listenerMove, false);
        document.addEventListener("mouseup", () => {document.removeEventListener("mousemove", this.listenerMove, false)}, false);
    }
    
    this.mouseMoveLightnessThumb = function() {
        let hsl = this.listColor[this.ind];
//        let centerElX = event.pageX - this.deltX_T + radiusThumb - leftSetting;
        let rect = this.lightness.getBoundingClientRect();
        let centerElX = event.pageX + this.deltX_T - diamThumb - rect.left;
        if (centerElX < 0) {
            centerElX = 0;
        } else if (centerElX > widthSetting) {
            centerElX = widthSetting;
        }
        this.lightnessThumb.style.left = centerElX + "px";
        hsl.l = Math.round(centerElX / widthSetting * 100);
        this.setHue(this.ind);
    }
    
    this.mouseDownSaturThumb = function() {
        let x = event.pageX;
        let rectEl = event.target.getBoundingClientRect();
        this.deltX_T = x - rectEl.left;
        this.listenerMove = () => {this.mouseMoveSaturThumb();};
        document.addEventListener("mousemove", this.listenerMove, false);
        document.addEventListener("mouseup", () => {document.removeEventListener("mousemove", this.listenerMove, false)}, false);
    }
    
    this.mouseMoveSaturThumb = function() {
        let hsl = this.listColor[this.ind];
        let rect = this.saturation.getBoundingClientRect();
        let centerElX = event.pageX + this.deltX_T - diamThumb - rect.left;
        if (centerElX < 0) {
            centerElX = 0;
        } else if (centerElX > widthSetting) {
            centerElX = widthSetting;
        }
        this.saturationThumb.style.left = centerElX + "px";
        hsl.s = Math.round(centerElX / widthSetting * 100);
        this.setHue(this.ind);
    }

    this.mouseDown = function(i) {
        this.ind = i;
        let x = event.pageX;
        let y = event.pageY;
        let rectEl = event.target.getBoundingClientRect();
        let rectCircle = this.circle.getBoundingClientRect();
        this.centerX = rectCircle.left + radius;
        this.centerY = rectCircle.top + radius;
        this.circleLeft = rectCircle.left ;
        this.circleTop = rectCircle.top ;
        this.deltX = x - rectEl.left;
        this.deltY = y - rectEl.top;
        this.listenerMove = () => {this.mouseMove(i);};
        document.addEventListener("mousemove", this.listenerMove, false);
        document.addEventListener("mouseup", () => {document.removeEventListener("mousemove", this.listenerMove, false)}, false);
        this.setSetting(i);
    }
    
    this.mouseMove = function(i) {
        let hsl = this.listColor[i];
        let rad = hsl.radius;
        let centerElX = event.pageX - this.deltX + rad;
        let centerElY = event.pageY - this.deltY + rad;
        let x = centerElX - this.centerX;
        let y = centerElY - this.centerY;
        let len = Math.sqrt(x * x + y * y);
        let newX = centerElX;
        let newY = centerElY;
        let propor;
        if (len > radiusMin) {
            propor = radiusMin / len;
            newX = x * propor + this.centerX;
            newY = y * propor + this.centerY;
        }
        let xx = newX - this.circleLeft;
        let yy = newY - this.circleTop;
        let xxC = xx - rad;
        let yyC = yy - rad;
        hsl.el.style.left = xxC + "px";
        hsl.el.style.top = yyC + "px";
        let xxCentr = xx - radius;
        let yyCentr = yy - radius;
        let newLen = Math.sqrt(xxCentr * xxCentr + yyCentr * yyCentr);
        propor = (newLen - rad) / newLen;
        let lineX = xxCentr * propor + radius;
        let lineY = yyCentr * propor + radius;
        let angle = this.angleDeg(len, x, -y);
        let oldH = hsl.h;
        let s = radius;
        if (len < radius) {
            s = len;
        }
        s = Math.round(s / radius * 100);
        hsl.s = s;
        hsl.h = Math.round(angle);
        this.setColorPalitr(i);
        if (i == 0) {
            let deltH = hsl.h - oldH;
            if (this.rule == 0) {
                let list = this.listColor;
                let list_0 = list[0];
                let S_2 = list_0.s - 25;
                let S_3 = list_0.s - 50;
                if (S_2 < 0) {
                    S_2 += 100;
                }
                if (S_3 < 0) {
                    S_3 += 100;
                }
                list[2].s = S_2;
                list[3].s = S_3;
                list[2].h = list_0.h;
                list[3].h = list_0.h;
                this.setHue(2);
                this.setHue(3);
                
                let hslR = this.listColor[1];
                hslR.h =  hslR.h + deltH;
                this.setHue(1);
            } else {
                let jk = this.listColor.length;
                for (let j = 1; j < jk; j++) {
                    let hslR = this.listColor[j];
                    hslR.h =  hslR.h + deltH;
/*
                    if (j > 1) {
                        let list = this.listColor;
                        hslR.s = list[0].s;
                    }
*/
                    this.setHue(j);
                }
            }
        }
        this.setSetting(i);
    }
    
    this.setColorPalitr = function(i) {
        let hsl = this.listColor[i];
        let cc = this.fieldOfColors.children;
        let ccI = cc[i];
        ccI.children[0].style.backgroundColor = "hsla(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%," + hsl.a + ")";
        let ccA = this.auxiliaryColors.children;
        let dark = hsl.l - 10;
        if (dark < 0) {
            dark = 0;
        }
        let light = hsl.l + 15;
        if (light > 100) {
            light = 100;
        }
        ccA[i].children[0].style.backgroundColor = "hsla(" + hsl.h + "," + hsl.s + "%," + dark + "%," + hsl.a + ")";
        ccA[i].children[1].style.backgroundColor = "hsla(" + hsl.h + "," + hsl.s + "%," + light + "%," + hsl.a + ")";
        if (i == 0) {
            cc[4].children[0].style.backgroundColor = "hsla(" + hsl.h + "," + hsl.s + "%," + 97 + "%," + hsl.a + ")";
            if (this.rule == 0) {
                hsl = this.listColor[2];
                cc[2].children[0].style.backgroundColor = "hsla(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%," + hsl.a + ")";
                hsl = this.listColor[3];
                cc[3].children[0].style.backgroundColor = "hsla(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%," + hsl.a + ")";
            }
        }
        this.drawScreen();
    }
    
    this.setHue = function(i) {
        let hsl = this.listColor[i];
        let h1 = hsl.h;
        if (h1 > 360) {
            h1 = h1 % 360;
        }
        hsl.h = h1;
        let r = hsl.s * coefSaturation;
        let rad = (Math.PI * h1) / 180;
        let x = r * Math.sin(rad);
        let y = r * Math.cos(rad);
        let xx = x + radius - hsl.radius;
        let yy = radius - y - hsl.radius;
        hsl.el.style.left = xx + "px";
        hsl.el.style.top = yy + "px";
        this.setColorPalitr(i);
        this.txtSatur.innerHTML = "S " + hsl.s;
        this.txtLightness.innerHTML = "L " + hsl.l;
        this.txtAlpha.innerHTML = "A " + Math.round(hsl.a * 100);
    }
    
    this.angleDeg = function(len, x, y) {
        let angle = (Math.asin(x / len) * 180.0) / Math.PI;
        if (y < 0) {
            angle = 180 - angle;
        } else if (x < 0 && y > 0) {
            angle = angle + 360;
        }
        return angle;
    }

    this.formScreen = function() {
        let wScr = 425 * MEASURE;
        let hScr = 897 * MEASURE;
        this.screen = newDOMelement('<div style="position: absolute;width:' + wScr + 'px;height:' + hScr + 'px;border:2px solid #555;top:20px;left:720px"></div>')
        parent.append(this.screen);
        let listEl = [];
        this.screen.listEl = listEl;
        this.blackBrightness = colorBrightness(0, 0, 0);
        this.whiteBrightness = colorBrightness(255, 255, 255);
        let L_24 = 24 * MEASURE;
        let d_img = Math.round(18 * MEASURE);
        let d_img_G = Math.round(32 * MEASURE);
        let d_img_Men = Math.round(24 * MEASURE);
        let d_56 = Math.round(56 * MEASURE);
        let d_20 = Math.round(20 * MEASURE);
        let d_12 = Math.round(12 * MEASURE);
        let d_16 = Math.round(16 * MEASURE);
        let d_27 = Math.round(27 * MEASURE);
        let d_48 = Math.round(48 * MEASURE);
        let d_72 = Math.round(72 * MEASURE);
        let d_cursor = Math.round(92 * MEASURE);
        let d_top_box = Math.round(98 * MEASURE);
        let d_bottom_box = Math.round(140 * MEASURE);
        let d_left_box = Math.round(20 * MEASURE);
        let strStatus = newDOMelement('<div style="position: absolute;width:100%;height:' + L_24 + 'px;top:0;"></div>')
        this.screen.append(strStatus);
// iColor = 0 -primary, = 1 - accent, = 2 - secondary, 10 - white or black зависит от контраста
        listEl.push({el:strStatus,what:"backgr",iColor:0,dl:"d"});
        let timeStat = newDOMelement('<div style="position:absolute;left:3px;top:1px;font-size:10px;">12:21</div>');
        strStatus.append(timeStat);
        listEl.push({el:timeStat,what:"color",iColor:0,contrast:true});
        let imgBat = newDOMelement('<canvas width="' + d_img + '" height="' + d_img + '" style="right:3px;top:1px;position:absolute">No canvas</canvas>')
        strStatus.append(imgBat);
        listEl.push({el:imgBat,what:"img",iColor:0,contrast:true,url:"img/battery.png"});
        let toolBar = newDOMelement('<div style="position: absolute;width:100%;height:' + d_56 + 'px;top:' + L_24 + 'px;"></div>')
        this.screen.append(toolBar);
        listEl.push({el:toolBar,what:"backgr",iColor:0});
        let imgArrow = newDOMelement('<canvas width="' + d_img_G + '" height="' + d_img_G + '" style="left:3px;top:6px;position:absolute">No canvas</canvas>')
        toolBar.append(imgArrow);
        listEl.push({el:imgArrow,what:"img",iColor:0,contrast:true,url:"img/arrow.png"});
        let titleScr = newDOMelement('<div style="position:absolute;left:70px;top:5px;font-size:20px;">Title screen</div>');
        toolBar.append(titleScr);
        listEl.push({el:titleScr,what:"color",iColor:0,contrast:true});
        let menuBot = newDOMelement('<div style="position: absolute;width:100%;height:' + d_56 + 'px;bottom:0;"></div>')
        this.screen.append(menuBot);
        listEl.push({el:menuBot,what:"backgr",iColor:0});
        let men_1 = newDOMelement('<div style="position:absolute;left:5px;bottom:3px;font-size:10px;">Menu 1</div>');
        menuBot.append(men_1);
        listEl.push({el:men_1,what:"color",iColor:1});
        let imgMen1 = newDOMelement('<canvas width="' + d_img_Men + '" height="' + d_img_Men + '" style="left:10px;top:4px;position:absolute">No canvas</canvas>')
        menuBot.append(imgMen1);
        listEl.push({el:imgMen1,what:"img",iColor:1,url:"img/men_1.png"});
        let floatBott = newDOMelement('<div style="position: absolute;width:' + d_56 + 'px;height:' + d_56 + 'px;border-radius: 50%;box-shadow:2px 1px 4px #777;right:' + L_24 + 'px;bottom:' + d_72 + 'px"></div>');
        this.screen.append(floatBott);
        listEl.push({el:floatBott,what:"backgr",iColor:2});
        let plusV = newDOMelement('<div style="position: absolute;left:' + d_27 + 'px;top:' + d_img + 'px;width: 2px;height:' + d_20 + 'px"></div>');
        floatBott.append(plusV);
        listEl.push({el:plusV,what:"backgr",iColor:2,contrast:true});
        let plusH = newDOMelement('<div style="position: absolute;top:' + d_27 + 'px;left:' + d_img + 'px;height: 2px;width:' + d_20 + 'px"></div>');
        floatBott.append(plusH);
        listEl.push({el:plusH,what:"backgr",iColor:2,contrast:true});
        let box = newDOMelement('<div style="position:absolute;top:' + d_top_box + 'px;bottom:' + d_bottom_box + 'px;left:' + d_left_box 
                + 'px;right:' + d_left_box + 'px"></div>');
        this.screen.append(box);
        listEl.push({el:box,what:"backgr",iColor:4});
        let box_1 = newDOMelement('<div style="position:absolute;top:20px;bottom:100px;left:20px;right:20px;background-color:#fff"></div>');
        box.append(box_1);
        let txtEd = newDOMelement('<div style="position: absolute;left:' + d_12 + 'px;top:' + L_24 + 'px;">Edit text</div>');
        box_1.append(txtEd);
        let cursor = newDOMelement('<div style="position: absolute;left:' + d_cursor + 'px;top:' + d_16 + 'px;width: 1.5px;height:' + L_24 + 'px"></div>');
        box_1.append(cursor);
        listEl.push({el:cursor,what:"backgr",iColor:1});
        let underlining = newDOMelement('<div style="position: absolute;left:' + d_12 + 'px;top:' + d_48 + 'px;width: 100px;height:1px"></div>');
        box_1.append(underlining);
        listEl.push({el:underlining,what:"backgr",iColor:1});
    }

    this.drawScreen = function() {
        let listEl = this.screen.listEl;
        let ind = this.ind;
        let ik = listEl.length;

        for (let i = 0; i < ik; i++) {
            let item = listEl[i];
            let hsl;
            let L;
            switch (item.what) {
                case "backgr":
                    switch (item.iColor) {
                        case 0:
                            hsl = this.listColor[0];
                            L = this.formDarkLight(item.dl, hsl.l);
                            break;
                        case 1:
                            hsl = this.listColor[1];
                            L = this.formDarkLight(item.dl, hsl.l);
                            break;
                            break;
                        case 2:
                            hsl = this.listColor[2];
                            L = this.formDarkLight(item.dl, hsl.l);
                            break;
                        case 4:
                            let hsl_1 = this.listColor[0];
                            L = 97;
                            hsl = {h:hsl_1.h,s:hsl_1.s,l:L};
//                            L = this.formDarkLight(item.dl, hsl.l);
                            break;
                    }
                    let rgb;
                    if (item.contrast) {
                        rgb = this.formColorContrast(hsl.h, hsl.s, L);
                    } else {
                        rgb = hslToRgbNum(hsl.h,hsl.s,L);
                    }
//                    rgb = hslToRgb(hsl.h, hsl.s, L);
                    let rgb_s = {r:rgb.r.toString(16), g:rgb.g.toString(16), b:rgb.b.toString(16)};
                    let color_rgb = "#" + add0(rgb_s.r) + add0(rgb_s.g) + add0(rgb_s.b);
                    item.el.style.backgroundColor = color_rgb;
                    break;
                case "color":
                    hsl = this.listColor[item.iColor];
                    L = this.formDarkLight(item.dl, hsl.l);
                    let colorTxt;
                    if (item.contrast) {
                        colorTxt = this.formColorContrast(hsl.h, hsl.s, L).rgb;
                    } else {
                        let rgb_a = hslToRgb(hsl.h, hsl.s, L);
                        colorTxt = "#" + add0(rgb_a.r) + add0(rgb_a.g) + add0(rgb_a.b);
                    }
                    item.el.style.color = colorTxt;
                    break;
                case "img":
                    hsl = this.listColor[item.iColor];
                    L = this.formDarkLight(item.dl, hsl.l);
                    let colorImg;
                    if (item.contrast) {
                        colorImg = this.formColorContrast(hsl.h, hsl.s, L);
                    } else {
                        colorImg = hslToRgbNum(hsl.h,hsl.s,L);
                    }
                    colorImg_J = JSON.stringify(colorImg);
                    if (item.oldColor != colorImg_J) {
                        changeImgColor(item.el, item.url, colorImg);
                        item.oldColor = colorImg_J;
                    }
                    break;
            }
        }
    }
    
    this.formDarkLight = function(dl, ll) {
        let L = ll;
        switch(dl) {
            case "d":
                L = L - 10;
                if (L < 0) {
                    L = 0;
                }
                break;
            case "l":
                L = L + 15;
                if (L > 100) {
                    L = 100;
                }
                break;
        }
        return L;
    }
    
    this.formColorContrast = function(h, s, l) {
        let color_rgb;
        let rgb = hslToRgbNum(h, s, l);
        let customBrightness = colorBrightness(rgb.r, rgb.g, rgb.b);
        let wC = contrast(this.whiteBrightness, customBrightness);
        let bC = contrast(this.blackBrightness, customBrightness);
        let rgb_img;
        if (wC > (bC - 4)) {
            color_rgb = '#fff';
            rgb_img = {r:255, g:255, b:255};
        } else {
            color_rgb = '#000';
            rgb_img = {r:0, g:0, b:0};
        }
        rgb_img.rgb = color_rgb;
        return rgb_img;
    }
    
    
    this.init();
}