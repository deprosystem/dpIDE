var listTemplates;
var systemUser = 54;
var windTemplatesCategory;
var selectTemplatesCategory = "";
var selectIndCategory;
var selectColorCategory = "";
var divListCategory, divDetailCategory;
var selectViewTemplate;
var detailTemplate;

function fromTemplates() {
    let wind = formWind(650, 400, 40, 200, "Template", null, null, "Choose", templateChoose, "");
    setHelp(wind, "https://docs.google.com/document/d/1iYRvK_JAz67laVPot_pCEUa0sM9Jp3hSJZMMG4qmtxQ/edit#bookmark=id.76hk6wuhx5tt");
    doServer("POST", "project/templates", cbGetTemplates, null, wind, wind);

}

function cbGetTemplates(res, wind) {
    listTemplates = JSON.parse(res);
    let wList = 300;
    let list = newDOMelement('<div style="position:absolute;top:0;left:0;bottom:0;width:' + wList + 'px;border-right:1px solid #1dace9;"></div>');
    wind.append(list);
    detailTemplate = newDOMelement('<div style="position:absolute;top:0;right:0;bottom:0;left:' + (wList + 1) + 'px;"></div>');
    let imgTempl = newDOMelement('<img style="position:absolute;left:3px;top:3px;right:3px;width:220px">');
    let comment = newDOMelement('<div style="position:absolute;top:230px;right:3px;left:3px;"></div>');
    detailTemplate.append(imgTempl);
    detailTemplate.append(comment);
    wind.append(detailTemplate);
    let cont = newDOMelement('<div style="position:absolute;top:0;right:0;left:0;height:24px;display:flex;flex-direction:row;border-bottom:1px solid #1dace9;"></div>');
    list.append(cont);
    let my = newDOMelement('<div style="height:100%;flex-grow:1;text-align:center"><div onclick="clickOwnerTemplates(this)" style="margin:4px;cursor:pointer">My</div></div>');
    let sys = newDOMelement('<div style="height:100%;flex-grow:1;text-align:center"><div onclick="clickOwnerTemplates(this)" style="margin:4px;cursor:pointer">System</div></div>');
    let cast = newDOMelement('<div style="height:100%;flex-grow:1;text-align:center"><div onclick="clickOwnerTemplates(this)" style="margin:4px;cursor:pointer">Custom</div></div>');
    cont.append(my);
    cont.append(sys);
    cont.append(cast);
    windTemplatesCategory = newDOMelement('<div style="position:absolute;top:25px;right:0;left:0;bottom:0;"></div>');
    list.append(windTemplatesCategory);
    clickOwnerTemplates(my.firstElementChild);
}

function clickOwnerTemplates(el) {
    let wCategory = 120;
    let parEl = el.parentElement.parentElement;
    let ch = parEl.children;
    let ik = ch.length;
    for (let i = 0; i < ik; i++) {
        ch[i].style.backgroundColor = "";
    }
    el.parentElement.style.backgroundColor = "#E7F7FF";
    ik = listTemplates.length;
    let userId = getCookie("user_id");
    let listCategory = [];
    windTemplatesCategory.innerHTML = "";
    let lastCategory = "";
    let owner = el.innerHTML;
    switch(owner) {
        case "My":
            for(let i = 0; i < ik; i++) {
                let item = listTemplates[i];
                if (userId == item.user_id) {
                    if (lastCategory != item.category_name) {
                        lastCategory = item.category_name;
                        listCategory.push(lastCategory);
                    }
                }
            }
            break;
        case "System":
            for(let i = 0; i < ik; i++) {
                let item = listTemplates[i];
                if (systemUser == item.user_id) {
                    if (lastCategory != item.category_name) {
                        lastCategory = item.category_name;
                        listCategory.push(lastCategory);
                    }
                }
            }
            break;
        case "Castom":
            for(let i = 0; i < ik; i++) {
                let item = listTemplates[i];
                if (userId != item.user_id && item.user_id != systemUser) {
                    if (lastCategory != item.category_name) {
                        lastCategory = item.category_name;
                        listCategory.push(lastCategory);
                    }
                }
            }
            break;
    }
    ik = listCategory.length;
    if (ik == 0) {
        windTemplatesCategory.innerHTML = "No templates";
    } else {
        selectIndCategory = 0;
        let selCat = listCategory[0];
        divListCategory = newDOMelement('<div style="position:absolute;top:0;left:0;bottom:0;width:' + wCategory + 'px;border-right:1px solid #1dace9;"></div>');
        divListCategory.owner = owner;
        divDetailCategory = newDOMelement('<div style="position:absolute;top:0;right:0;bottom:0;left:' + (wCategory + 1) + 'px;"></div>');
        windTemplatesCategory.append(divListCategory);
        windTemplatesCategory.append(divDetailCategory);
        for (let i = 0; i < ik; i++) {
            let namC = listCategory[i];
            let item = newDOMelement('<div onclick="clCategory(this, ' + i + ');" style="height:18px"><div style="margin:2px;cursor:pointer">' + namC + '</div</div');
            item.onmouseover = function () {
                selectColorCategory = item.style.backgroundColor;
                item.style.backgroundColor = "#E7F7FF";
            }
            item.onmouseout = function () {
                item.style.backgroundColor = selectColorCategory;
            }
            if (namC == selectTemplatesCategory) {
                selCat = namC;
                selectIndCategory = i;
//                item.style.backgroundColor = "#E7F7FF";
            }
            divListCategory.append(item);
        }
        divListCategory.children[selectIndCategory].style.backgroundColor = "#D7E7FF";
    }
}

function clCategory(el, i) {
    let ch = divListCategory.children;
    ch[selectIndCategory].style.backgroundColor = "";
    selectIndCategory = i;
    ch[selectIndCategory].style.backgroundColor = "#D7E7FF";
    selectColorCategory = "#D7E7FF";
    let nam = el.firstElementChild.innerHTML;
    divDetailCategory.innerHTML = "";
    let ik = listTemplates.length;
    let owner = divListCategory.owner;
    selectViewTemplate = null;
    for(let i = 0; i < ik; i++) {
        let item = listTemplates[i];
        if (isNeeded(owner, item) && item.category_name == nam) {
            let itemView = newDOMelement('<div onclick="clProject(this, ' + i + ');" style="height:18px"><div style="margin:2px;cursor:pointer">' + item.project_title + '</div</div');
            if (selectViewTemplate == null) {
                selectViewTemplate = itemView;
            }
            divDetailCategory.append(itemView);
        }
    }
    clProject(selectViewTemplate, 0);
}

function clProject(el, i) {
    selectViewTemplate.style.backgroundColor = "";
    selectViewTemplate = el;
    selectViewTemplate.style.backgroundColor = "#D7E7FF";
    let item = listTemplates[i];
    detailTemplate.indProject = i;
    detailTemplate.querySelector("img").src = item.image;
    detailTemplate.querySelector("div").innerHTML = item.project_comment;
}

function isNeeded(owner, item) {
    switch(owner) {
        case "My":
            if (userId == item.user_id) {
                return true;
            }
            break;
        case "System":
            if (systemUser == item.user_id) {
                return true;
            }
            break;
        case "Castom":
            if (userId != item.user_id && item.user_id != systemUser) {
                
            }
            break;
    }
    return false;
}

function templateChoose() {
    let item = listTemplates[detailTemplate.indProject];
    let create = [
        {name: "nameProject", title:"* Project name",len:-1,type:"Text",valid:"latin"},
        {name: "comment", title:"Description",type:"Textarea",rows:3,br:true}
    ]
    newProjectForCreate = {nameProject:item.project_name,comment:item.item,projectId:item.project_id};
    let wind = formWind(300, 400, 40, 200, "New project from template", null, null, "Send", sendCreateTemplate, "");
    let windDat = newDOMelement('<div style="position:absolute;left:16px;right:16px"></div>');
    wind.append(windDat);
    wind.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        sendCreateTemplate();
        closeDataWindow(wind);
      }
    });
    new EditForm(create, newProjectForCreate, windDat, null, null, true, 20);
}

function sendCreateTemplate() {
    if (newProjectForCreate.nameProject == null || newProjectForCreate.nameProject.length == 0) {
        myAlert("You need to fill in the fields with *");
        return true;
    } else {
        doServer("POST", "project/create_from_template", cbProjectFromTemplare, JSON.stringify(newProjectForCreate));
    }
}

function cbProjectFromTemplare(res) {
//    console.log("RES="+res);
    currentProject = JSON.parse(res);
    cbCreateProjectDop();
}

function inTemplates() {
    
}

