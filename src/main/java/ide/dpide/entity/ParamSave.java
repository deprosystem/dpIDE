package ide.dpide.entity;

import ide.dpide.android.ListSwitchParam;
import ide.dpide.projects.ItemResurces;
import ide.dpide.projects.ItemStyle;
import ide.dpide.projects.Lang;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ParamSave {
    public String nameAPP, nameScreenStart, nameClassStart, realPath, resPath;
    public String currentScreen, path, schema, basePath, userProjPath;
    public String toolId, menuId, scrollId;
    public String pathLayoutItem;
    public boolean noToolMenu, noDrawer, noFragmContainer, isCamera, havePush;
    public Screen currentScreenObj;
    public int typeScreen, countStr;
    public List<String> arrayString;
    public List<String> addApp;
    public Set<String> addPermish, styleTxtInpt;
    public List<ItemResurces> listString;
    public ListScreen sreens;
    public ListItemResurces colors, drawable, strings, appParam;
    public List<ItemStyle> styles;
    public ListSwitchParam switchSpec, styleCheck, styleCheck_3;
    public HashSet<String> importD, plaginGradle, addImplement, addClassPath;
    public Lang lang;
    public List<ItemResurces> getListString() {
        if (listString == null) {
            listString = new ArrayList();
        }
        return listString;
    }
}
