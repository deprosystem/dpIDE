var AuthToken = '';

function doServer(metod, url, callBack, data, paramCallBack, progress, cbError, txtProgress){
    var req = initRequest();
    let divProgress;
    req.open(metod, url, true);
    req.setRequestHeader('Auth-token', AuthToken);
    if (currentProject != undefined && currentProject != null) {
        req.setRequestHeader('projectId', currentProject.projectId);
        req.setRequestHeader('name_schema', currentProject.resurseInd);
    }
    req.onreadystatechange = function () {
        if (divProgress != null) {
            document.body.removeChild(divProgress);
            divProgress = null;
        }
        if (req.readyState == 4) {
            if (req.status == 200) {
                if (callBack.cbDoServer == null) {
                    callBack(req.responseText, paramCallBack);
                } else {
                    callBack.cbDoServer(req.responseText, paramCallBack);
                }
            } else {
                let resEr = req.responseText;
console.log("AJAX="+resEr);
                let begRes = "";
                if (resEr.length > 9) {
                    begRes = resEr.substring(0, 9).toLowerCase();
                }
                if (begRes == "<!doctype") {
                    let wwind = new formWind(700, 450, 50, 200, "Error", null, null, null, null, "");
                    wwind.innerHTML = resEr;
                } else {
                    let errObj = JSON.parse(resEr);
                    let mes = errObj.message;
                    dialogError("Server error", "status=" + req.status + " " + mes, errObj.title);
                }
                if (cbError != null) {
                    if (cbError.cbErrorServer != null) {
                        cbError.cbErrorServer(resEr, paramCallBack);
                    } else {
                        cbError(resEr, paramCallBack);
                    }
                } 
            }
        }
    };
    if (progress != null) {
        divProgress = windProgr(progress, txtProgress);
        document.body.append(divProgress);
    }
    req.send(data);
}


function downloadFile(urlToSend) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(req.readyState == 4) { 
            if (req.status == 200) {
                let blob = req.response;
                let fileName = req.getResponseHeader("Content-Disposition");
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                let fn = fileName.split("=");
                fileName = fn[1];
                link.download = fileName;
                link.click();
            } else {
                let mes = "";
                if (req.responseText != "") {
                    mes = JSON.parse(req.responseText).message;
                }
                dialogError("Server error", "status=" + req.status + " " + mes);
            }
        }  else if(req.readyState == 2) {
            if(req.status == 200) {
                req.responseType = "blob";
            } else {
                req.responseType = "text";
            }
        }
    };
    
    
    req.open("GET", urlToSend, true);
    req.setRequestHeader('Auth-token', AuthToken);
    req.send();
}

function doServerAlien(metod, url, callBack, data, paramCallBack, progress, cbError, txtProgress){
    var req = initRequest();
    let divProgress;
    req.open(metod, url, true);
//    req.withCredentials = true;

    if (currentProject != null) {
//        req.setRequestHeader('projId', currentProject.projectId);
        req.setRequestHeader('schemDB', currentProject.resurseInd);
    }
    
    if (appToken != null && appToken != "") {
        req.setRequestHeader('Auth-token', appToken);
    }

    req.onreadystatechange = function () {
        if (divProgress != null) {
            document.body.removeChild(divProgress);
            divProgress = null;
        }
        if (req.readyState == 4) {
            if (req.status == 200) {
                if (callBack.cbDoServer == null) {
                    callBack(req.responseText, paramCallBack);
                } else {
                    callBack.cbDoServer(req.responseText, paramCallBack);
                }
            } else {
                let resEr = req.responseText;
console.log("AJAX="+resEr);
                let begRes = "";
                if (resEr.length > 9) {
                   begRes = resEr.substring(0, 9).toLowerCase();
                }
                if (begRes == "<!doctype") {
                   let wwind = new formWind(700, 450, 50, 200, "Error", true, null, null, null, "");
                   wwind.innerHTML = resEr;
                } else {
                   let errObj = JSON.parse(resEr);
                   let mes = errObj.message;
                   dialogError("Server error", "status=" + req.status + " " + mes, errObj.title);
                }
                if (cbError != null) {
                    if (cbError.cbErrorServer != null) {
                        cbError.cbErrorServer(resEr, paramCallBack);
                    } else {
                        cbError(resEr, paramCallBack);
                    }
                }
            }
        }
    };
    if (progress != null) {
        divProgress = windProgr(progress);
        document.body.append(divProgress);
    }
    req.send(data);
}

function windProgr(progress, txtProgress) {
    let xy = getCoordsEl(progress);
    let x = xy.left;
    let y = xy.top;
    let h = xy.height;
    let w = xy.width;
    let dv = document.createElement('div');
    dv.style.cssText = "position:absolute;width:" + w + "px;height:" + h + "px;background:#fffc;outline:1px solid #1dace9;border-radius:8px;left:" + x + "px;top:" 
            + y + "px;z-index:102";
    let pr = document.createElement('img');
    pr.className = "progress_center";
    dv.appendChild(pr);
    pr.src = "img/progress.png";
    if (txtProgress != null && txtProgress.length > 0) {
        dv.appendChild(newDOMelement('<div style="position:absolute;left:0;right:0;bottom:20px;height:15px;text-align:center;font-size:14px">' + txtProgress + '</div'));
    }
    return dv;
}

function initRequest() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function insertHtml() {
    this.get = function (elId, url, func) {
        this.elId = elId;
        this.url = url;
        this.func = func;
        var a = new XMLHttpRequest();
        a.open("GET", this.url);
        a.onreadystatechange = function(){
            if (a.readyState===4){
                document.getElementById(elId).innerHTML = a.responseText;
                if (func != null) {
                    func();
                }
            }
        }
        a.send(null);
    }
}