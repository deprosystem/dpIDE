var rc;
var dirUploadFile;

function cancelUploadImg() {
    uploadPanel.style.display = "none";
    alert("Files successfully transferred to server");
}

function getCommanderDir(i) {
    doServer("GET", 'commander/list_dir?dir=' + rc.dir + '/' + rc.list[i].name, cbCommander);
}

function getCommanderRoot() {
    var i = posSlash(rc.dir);
    if (i > 0) {
        var d = rc.dir.substring(0, i);
        doServer("GET", 'commander/list_dir?dir=' + d, cbCommander);
    } else if (i == 0) {
        doServer("GET", 'commander/list_dir?dir=/', cbCommander);
    }
}

function posSlash(st) {
    var i = st.lastIndexOf('/');
    if (i > -1) {
        return i;
    } else {
        return st.lastIndexOf('\\');
    }
}

function getCommander() {
    commanderPanel.style.display = "block";
    currentProject = null;
    doServer("GET", "commander/list", cbCommander);
}

function viewSelFile() {
    uploadPanel.style.display = "flex";
    if (uploadFrame.src != "uploadOutsideApp.html") {
        uploadFrame.src = "uploadOutsideApp.html";
    }
}

function cbCommander(res) {
    upload_butt.style.display = "block";
    rc = JSON.parse(res);
    rc.dir = replaceAll(rc.dir, "\\", "/");
    dirUploadFile = rc.dir;
    name_dir.innerHTML = rc.dir;
    var lf = rc.list;
    var ik = lf.length;
    var list = document.getElementById("list_file");
    list.innerHTML = "";
    var i = posSlash(rc.dir);
    if (i >= 0) {
        list.append(createNewElRoot());
    }
    for (var i = 0; i < ik; i++) {
        list.append(createNewElCom(lf[i], i));
    }
}

function replaceAll(st, st1, st2) {
    var res = st;
    var i = res.indexOf(st1);
    while (i > 0) {
        res = res.replace(st1, st2);
        i = res.indexOf(st1);
    }
    return res;
}

function createNewElRoot() {
    var container = document.createElement('div')
    container.innerHTML = '<div class="file_el" style="padding-left: 5px; width: 30px;" onclick="getCommanderRoot()">..</div>';
    return container.firstChild
}

function createNewElCom(item, i) {
    var container = document.createElement('div')
    var icon = "";
    var size = "";
    if (item.type == 1) {
        icon = ' onclick="getCommanderDir(' + i + 
                ')"><img src="img/folder.png" height="16" width="16" style="margin-right: 5px;clear: both;float: left;"/>' + 
                '<div style="float: left;width: 380px;height: 20px; overflow: hidden;">';
        size = "";
    } else {
        icon = ' onclick="getFile(' + i + ')"><div style="clear: both;float: left;margin-left: 21px;width: 380px;height: 20px; overflow: hidden;">';
        size = '<div style="float: right;">' + item.size + '</div>';
    }
    container.innerHTML = '<div class="file_el" style="padding-left: 5px;"' + icon + item.name + '</div>' + size + '</div>';
    return container.firstChild
}

function getFile(i) {
    var link = document.createElement('a');
    let href = name_dir.innerHTML;
    link.setAttribute('href',href + "/" + rc.list[i].name);
    link.setAttribute('download','download');
    onload=link.click();
}
