
function uiRatings() {
    let cont = '<div class="container" style="width:100%;height:100%;display:flex;justify-content:space-between;flex-direction:row;"></div>';
    
    this.setElementUI = function(p, newEl, parent) {
        if (p.componParam == null) {
            p.componParam = {diam:15,amountDots:5,type:19};
        }
        let div = newDOMelement(cont);
        newEl.appendChild(div);
    }
    
    this.newElementUI = function(p) {
        p.componParam = {diam:15,amountDots:5,type:19};
        return newDOMelement(cont);
    }
    
    this.setContent = function(p) {
        contentAttributes.innerHTML = "";
        let edImg = editImage("Contour image", p.componParam.srcContour, "changeImgRatingsContour");
        contentAttributes.appendChild(edImg);
        edImg = editImage("Filled image", p.componParam.srcFilled, "changeImgRatingsFilled");
        edImg.style.marginLeft = "10px";
        contentAttributes.appendChild(edImg);
        
        let amount = editNumberParam("Number of images", 50, 24, 3, 20, "ratingsAmount");
        amount.style.clear = "both";
        amount.style.marginTop = "5px";
        setValueNumber(amount, p.componParam.amountDots);
        contentAttributes.appendChild(amount);
        
        let diam = editNumberParam("Image width", 50, 24, 3, 20, "ratingsWidtht");
        diam.style.marginTop = "5px";
        diam.style.marginLeft = "10px";
        setValueNumber(diam, p.componParam.diam);
        contentAttributes.appendChild(diam);
    }
    
    this.viewElementUI = function(p, el) {
        let contour = p.componParam.srcContour;
        let filled = p.componParam.srcFilled;
        if (contour != null && filled != null) {
            let div = el.getElementsByClassName('container')[0];
            if (div == null) {
                div = newDOMelement(cont);
                el.appendChild(div);
            }
            div.innerHTML = "";
            let amount = p.componParam.amountDots;
            let amount1 = amount - 1;
            let diam= p.componParam.diam * MEASURE;

            for (let i = 0; i < amount; i++) {
                if (i == amount1) {
                    div.appendChild(formItemRatings(diam, contour));
                } else {
                    div.appendChild(formItemRatings(diam, filled));
                }
            }
        }
    }
}

function formItemRatings(diam, img) {
    var container = document.createElement('div')
    container.innerHTML = '<img style="width:' + diam + 'px;height:' + diam + 'px;" src="' + img + '"></div>'
    return container.firstChild;
}

function changeImgRatingsContour(i, path) {
    currentElement.android.componParam.srcContour = path;
    viewCompon();
}

function changeImgRatingsFilled(i, path) {
    currentElement.android.componParam.srcFilled = path;
    viewCompon();
}

function ratingsWidtht(el) {
    currentElement.android.componParam.diam = el.value;
    viewCompon();
}

function ratingsAmount(el) {
    currentElement.android.componParam.amountDots = el.value;
    viewCompon();
}


