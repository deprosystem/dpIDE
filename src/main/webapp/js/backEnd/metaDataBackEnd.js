var typeFieldDescr = "Text,Img,Gallery,Serial,Bigserial,Int,Long,Float,Double,Date,Time,Timestamp,TimestampZ,Select,Boolean,Check,Switch";

var metaTable = {titleForm:"Description Table", description:
    [{name: "name", title:"Name",len:15,valid:"name_low"},
    {name: "title", title:"Title",len:20},
    {name: "type", title:"Type",len:90,type:TYPE_SELECT,select:typeFieldDescr},
    {name: "length", title:"Length",len:5,type:TYPE_INT},
    {name: "def", title:"Default value",len:20},
    {name: "format", title:"Format",len:10},
    {name: "not_null", title:"Not NULL",type:TYPE_BOOLEAN,marg:25},
    {name: "index", title:"Index",type:TYPE_BOOLEAN,marg:15},
    {name: "unique", title:"Unique",type:TYPE_BOOLEAN,marg:15},
//    {name: "key", title:"Key",type:TYPE_BOOLEAN,marg:10}
]
}