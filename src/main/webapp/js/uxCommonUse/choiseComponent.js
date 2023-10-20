
var groupComponents = [
    {group:"Navigation",item:"ToolBar,ToolMenu,MenuBottom,Menu,Spinner,PopupMenu,ScreenSequence,Intro"},
    {group:"Containers",item:"List,Pager,TabLayout,Panel,Form,ScrollPanel,ScrollForm,SheetBottom"},
    {group:"Media",item:"Photo,Video,EditGallery"},
    {group:"Google",item:"Map"},
    {group:"Widgets",item:"Drawer,Web"},
    {group:"Push",item:"SubscribeServer,SubscribeFirebase"},
    {group:"Other",item:"PlusMinus,Total,Tags"},
];

var componentsSelGroup;
var componentsContenGroup;
var componentsViewCompon;

function choiseComponent(el) {
    let wPopUp = 230;
    let wContGr = 90;
    let wContHand = wPopUp - wContGr - 4; 
    let hPopUp = 250;
    let ww = formPopUp(el, wPopUp, hPopUp);
    componentsContenGroup = newDOMelement('<div style="position:absolute;width:' + wContGr + 'px;left:4px;top:4px;bottom:4px;border-right:1px solid #1dace9"></div>');
    ww.append(componentsContenGroup);
    let contentHand = newDOMelement('<div style="position:absolute;width:' + wContHand + 'px;right:0;top:4px;bottom:4px;"></div>');
    ww.append(contentHand);
    let scrollHand = formViewScrolY(contentHand, true);
    componentsViewCompon = scrollHand.querySelector(".viewData");
    let ik = groupComponents.length;
    let iSel = -1;
    for (let i = 0; i < ik; i++) {
        let it = newDOMelement('<div style="height:20px;margin-right:4px;"></div>');
        let nn = newDOMelement('<div style="margin-top:3px;cursor:pointer;float:left;width:100%;">' + groupComponents[i].group + '</div>');
        it.append(nn);
        it.addEventListener('click', () => {
            clickComponentsGroup(i, groupComponents[i].item);
        }, false);
        componentsContenGroup.append(it);
    }
    if (componentsSelGroup != null) {
        clickComponentsGroup(componentsSelGroup, groupComponents[componentsSelGroup].item);
    } else {
        clickComponentsGroup(0, groupComponents[0].item);
    }
}

function clickComponentsGroup(ind, item) {
    let ch = componentsContenGroup.children;
    if (componentsSelGroup != null) {
        ch[componentsSelGroup].style.backgroundColor = "";
    }
    componentsSelGroup = ind;
    ch[componentsSelGroup].style.backgroundColor = "#eef";
    let listComp = item.split(",");
    let ik = listComp.length;
    componentsViewCompon.innerHTML = "";
    for (let i = 0; i < ik; i++) {
        let it = newDOMelement('<div style="height:20px;margin-left:4px;"></div>');
        let nn = newDOMelement('<div style="margin-top:3px;cursor:pointer;float:left;width:100%;">' + listComp[i] + '</div>');
        it.append(nn);
        it.addEventListener('click', () => {
            closePopUp(componentsViewCompon);
            selComponType(listComp[i]);
        }, false);
        componentsViewCompon.append(it);
    }
}
