function myAlert(txt, cbTxt, cbFunc, param) {
    let wCaution = 400, wCaution_2 = 200;
    let hCaution = 250, hCaution_2 = 125;
    let cautionBlockAll = newDOMelement('<div onclick="n_hiddenMyAlert(this)" style="background-color: #aaa7; top: 0;left: 0;right: 0;bottom: 0;z-index: 10;position: absolute;"></div>');

    let caution = newDOMelement('<div style="position:absolute;width:' + wCaution + 'px;height:' + hCaution + 'px;left:50%;top:50%;margin-left:-' 
            + wCaution_2 + 'px;margin-top:-' + hCaution_2 + 'px;border:1px solid #1dace9;border-radius: 5px;background-color:#fff"></div>');
    cautionBlockAll.appendChild(caution);
    let warning = newDOMelement('<div style="float:left;width:100%;font-size:24px;color:red;text-align:center;margin-top:30px">Warning</div');
    let text = newDOMelement('<div style="float:left;width:100%;font-size:16px;text-align:center;margin-top:30px">' + txt + '</div');
    caution.appendChild(warning);
    caution.appendChild(text);
    if (cbTxt != null) {
        let btnBl = createButtonBlue(cbTxt, 80);
        btnBl.style.marginTop = "20px";
        if (cbFunc.cbForAlert == null) {
            btnBl.addEventListener("click", function(){cautionBlockAll.remove();cbFunc(param);}, false);
        } else {
            btnBl.addEventListener("click", function(){cautionBlockAll.remove();cbFunc.cbForAlert(param);}, false);
        }
        caution.appendChild(btnBl);
    }
    let btnWeite = createButtonWeite("Cancel", 80);
    btnWeite.addEventListener("click", function(){cautionBlockAll.remove();}, false);
    btnWeite.style.marginTop = "20px";
    caution.appendChild(btnWeite);
    document.body.append(cautionBlockAll);
}

function n_hiddenMyAlert(el) {
    el.remove();
}


