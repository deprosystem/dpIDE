var listEvents = "click,change";
var handlerGroups = [
    {group:"Navigation",items:"start,back,backOk,finishDialog,setMenu,nextScreen,actual"},
    {group:"Components",items:"add item list,delete item list"},
    {group:"Variables",items:"addVar,delVar,cleanVar,cleanCopyVar,restoreVar,setVar,writeVar,saveViewInParams,addParam,setParam,setValueParam,Clear form fields"},
    {group:"Visibility",items:"show,hide,showHide,openDrawer,closeDrawer"},
    {group:"Data",items:"send,update,delete"},
    {group:"Autch",items:"sign in,sign up,edit profile,setToken,setProfile"},
    {group:"Animation",items:"springScale"},
    {group:"Other",items:"dialUp,exit,clear form,set Locale"},
    {group:"Push",items:"drawer,selectTab,selectMenu,selectList,nullifyCount"}
];

var listMetaHandlers = [
        {handl:"start", meta:[{name: "param", title:"Screen",len:150,type:"Text",valid:"latin"},
                    {name: "param_1", title:"Must be valid",len:150,type:"Text",br:true},
                    {name: "check", title:"Change enabled",type:"Check"},
                    {name: "after", title:"After",type:"Navig",after:true}]},
        {handl:"setVar", meta:[{name: "id", title:"The element to which the value is assigned",len:150,type:"SelectId"},
                    {name: "param", title:"Global variable name",len:150,type:"Text",valid:"latin",br:true},
                    {name: "param_1", title:"Variable list",len:200,type:"Text",valid:"list_var",br:true}]},
        {handl:"backOk", meta:[{name: "param", title:"Return parameter list",len:150,type:"Text",valid:"latin",br:true}]},
        {handl:"send", meta:[{name: "param", title:"Model",type:"Send"},
                    {name: "after", title:"After",type:"Navig",after:true},
                    {name: "param_1", title:"Element with data",len:200,type:"SelectId",br:true,visibility:true}]},
        {handl:"delete", meta:[{name: "param", title:"Model",type:"Delete"},
                    {name: "after", title:"After",type:"Navig",after:true}]},
        {handl:"sign in", meta:[{name: "param", title:"Model",type:"SignIn"},
                    {name: "after", title:"After",type:"Navig",after:true},
                    {name: "param_1", title:"Element with data",len:200,type:"SelectId",br:true,visibility:true}]},
        {handl:"sign up", meta:[{name: "param", title:"Model",type:"SignUp"},
                    {name: "after", title:"After",type:"Navig",after:true},
                    {name: "param_1", title:"Element with data",len:200,type:"SelectId",br:true,visibility:true}]},
        {handl:"edit profile", meta:[{name: "param", title:"Model",type:"EditProfile"},
                    {name: "after", title:"After",type:"Navig",after:true},
                    {name: "param_1", title:"Element with data",len:200,type:"SelectId",br:true,visibility:true}]},
        {handl:"forgot", meta:[{name: "param", title:"Model",type:"Forgot"},
                    {name: "after", title:"After",type:"Navig",after:true}]},
        {handl:"clear form", meta:[{name: "id", title:"The form",len:150,type:"SelectIdTags",tags:",Form,ScrollForm,",event:"param_1"},
                    {name: "param_1", title:"Field List",len:240,height: 240,type:"ListCheck",br:true,tags:",ImageView,EditText,Spinner,"}]},
        {handl:"springScale", meta:[{name: "id", title:"Element for animation",len:150,type:"SelectId"}]},
        {handl:"hide", meta:[{name: "id", title:"The element that is hidden",len:150,type:"SelectId"}]},
        {handl:"show", meta:[{name: "id", title:"The element that is shown",len:150,type:"SelectId"}]},
        {handl:"actual", meta:[{name: "id", title:"Component to be updated",len:150,type:"SelectIdUX"}]},
        {handl:"setValueParam", meta:[{name: "id", title:"The element to which the parameter value is assigned",len:150,type:"SelectId"}]},
        {handl:"assignValue", meta:[{name: "id", title:"The element to be assigned values",len:150,type:"SelectId"}]},
        {handl:"restoreVar", meta:[{name: "param", title:"The element that is shown",len:150,type:"Text",valid:"latin"}]},
        {handl:"setMenu", meta:[{name: "param", title:"Screen name",len:150,type:"Text",valid:"latin"}]},
        {handl:"addRecord", meta:[{name: "id", title:"The element to which the record is added",len:150,type:"SelectId",tags:"List"}]},
        {handl:"Clear form fields", meta:[{name: "param_1", title:"Element with data",len:100,type:"SelectId",visibility:true}]},
        {handl:"checked", meta:[{name: "after", title:"On navigator",type:"Navig"},
            {name: "nav_1", title:"Off navigator",type:"Navig"}]},
        {handl:"selectMenu", meta:[{name: "id", title:"Id menu",type:"SelectIdTags",tags:",Menu,MenuBottom,"},
            {name: "param", title:"Type push",type:"SelectPush"},
            {name: "param_1", title:"Name screen",type:"SelectMyOptions"},
            {name: "check", title:"Pass the push on",type:"Check"}]},
        {handl:"selectList", meta:[{name: "id", title:"Id list",type:"SelectIdTags",tags:",List,"},
            {name: "param", title:"Type push",type:"SelectPush"},
            {name: "param_1", title:"Name field",type:"Text",valid:"latin",len:200},
            {name: "check", title:"Pass the push on",type:"Check"}]},
        {handl:"nullifyCount", meta:[{name: "param", title:"Type push",type:"SelectPush"}]}
    ];
