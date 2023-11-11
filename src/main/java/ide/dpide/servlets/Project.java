package ide.dpide.servlets;

import com.google.gson.JsonSyntaxException;
import ide.dpide.android.ItemSwitch;
import ide.dpide.android.ListSwitchParam;
import ide.dpide.android.SwitchParam;
import ide.dpide.db.ProjectDB;
import ide.dpide.db.SQL;
import ide.dpide.entity.DataServlet;
import ide.dpide.entity.DescrHost;
import ide.dpide.entity.ListScreen;
import ide.dpide.entity.ParamDel;
import ide.dpide.projects.ItemAppParam;
import ide.dpide.projects.ItemResurces;
import ide.dpide.projects.ItemStyle;
import ide.dpide.projects.ProjectM;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@WebServlet(name = "Project", urlPatterns = {"/project/*"})
public class Project extends BaseServlet {

        @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
            ProjectDB projectDb = new ProjectDB(request);
            List<ProjectM> listProject;
            ProjectM pc;
            String projectId;
            String realPath = request.getServletContext().getRealPath("");
            if ( ! realPath.endsWith(File.separator)) {
                realPath += File.separator;
            }
            String res;
            switch (ds.query) {
                case "/project/create":
                    if (ds.userId == userExample) {
                        sendError(response, "You are not allowed to create a project");
                        break;
                    }
                    pc = null;
                    try {
                        pc = gson.fromJson(getStringRequest(request), ProjectM.class);
                        pc.userId = ds.userId;
//                        pc.namePackage = pc.nameProject.toUpperCase() + ".ide";
                        if (pc.logo == null) {
                            pc.logo = "";
                        }
                        if (pc.comment == null) {
                            pc.comment = "";
                        }
                        if (pc.nameAPP == null || pc.nameAPP.length() == 0) {
                            pc.nameAPP = pc.nameProject;
                        }
                    } catch (JsonSyntaxException | IOException e) {
                        System.out.println(e);
                        sendError(response, "Project create error " + e.toString());
                    }
                    long id = -1;
                    if (pc != null) {
                        pc.strings = formStrings(pc.nameAPP);
                        pc.languages = formStringsLang();
                        pc.colors = formColor();
                        pc.dimens = formDimens();
                        pc.style = formStyle();
                        pc.style_spec = formStyleSpec();
                        pc.style_check = formStyleCheck();
                        pc.style_check_3 = formStyleCheck_3();
                        pc.drawable = formDrawable();
                        pc.appParam = formAppParam();
                        pc.screens = formScreens();
                        pc.resurseInd = lowerCaseRandom(15);
                        pc.push = "";
                        pc.host = "";
                        pc.dateCreate = new Date().getTime();
                        pc.whereServer = "Server IDE";
                        id = projectDb.createProjectId(pc);
                        pc.projectId = id;
                        createBaseRes(ds.patchOutsideProject, pc.resurseInd, realPath);
                        projectDb.setLastProject(String.valueOf(ds.userId), String.valueOf(id));
                        sendResult(response, gson.toJson(pc));
                    }
                    break;

                case "/project/save":
                    pc = null;
                    if (ds.userId == userExample) {
                        sendResultOk(response);
                        break;
                    }
                    try {
                        pc = gson.fromJson(getStringRequest(request), ProjectM.class);
                    } catch (JsonSyntaxException | IOException e) {
                        System.out.println(e);
                        sendError(response, "Input Error " + e.toString());
                    }
                    if (pc != null) {
System.out.println("pc.style_check_3="+pc.style_check_3+"<<");
                        String er = projectDb.updateProject(pc);
                        if (er.length() == 0) {
                            sendResultOk(response);
                        } else {
                            sendError(response, er);
                        }
                    }
                    break;
                case "/project/list":
                    listProject = projectDb.getListProject(ds.userId);
                    sendResult(response, gson.toJson(listProject));
                    break;
                case "/project/getproject":
                    String idPr = request.getParameter("id");
                    projectDb.setLastProject(String.valueOf(ds.userId), idPr);
                    sendResult(response, gson.toJson(projectDb.getProjectById(idPr)));
                    break;
                case "/project/change":
                    if (ds.userId == userExample) {
                        sendError(response, "This project cannot be changed");
                        break;
                    }
                    projectId = request.getHeader("projectId");
                    String stReq = "";
                    try {
                        stReq = getStringRequest(request);
                    } catch (IOException e) {
                        System.out.println(e);
                        sendError(response, "Project create error " + e.toString());
                    }
                    if (stReq != null && stReq.length() > 0) {
                        pc = null;
                        pc = gson.fromJson(stReq, ProjectM.class);
                        if (pc != null) {
                            pc.userId = ds.userId;
                            if (pc.logo == null) {
                                pc.logo = "";
                            }
                            if (pc.comment == null) {
                                pc.comment = "";
                            }
                            projectDb.changeProject(pc, projectId);
                            sendResult(response, gson.toJson(projectDb.getProjectById(projectId)));
                        }
                    }
                    break;
                case "/project/getparam":
                    sendResult(response, projectDb.getQueryList(SQL.getParam));
                    break;
                case "/project/getlang":
                    sendResult(response, Constants.codeL);
                    break;
                case "/project/sethost":
                    if (ds.userId == userExample) {
                        sendError(response, "This project cannot be changed");
                        break;
                    }
                    projectId = request.getHeader("projectId");
                    try {
                        String stDescr = getStringRequest(request);
                        DescrHost dh = gson.fromJson(stDescr, DescrHost.class);
                        projectDb.setHost(projectId, dh);
                        sendResult(response, dh.domain);
                    } catch (IOException e) {
                        System.out.println(e);
                        sendError(response, "sethost error " + e.toString());
                    }
                    sendResultOk(response);
                    break;
                case "/project/templates":
                    sendResult(response, projectDb.getQueryList(SQL.getTemplates));
                    break;
                case "/project/create_from_template":
                    pc = null;
                    try {
                        pc = gson.fromJson(getStringRequest(request), ProjectM.class);
                        pc.userId = ds.userId;
//                        pc.namePackage = pc.nameProject.toUpperCase() + ".ide";
                        if (pc.logo == null) {
                            pc.logo = "";
                        }
                        if (pc.comment == null) {
                            pc.comment = "";
                        }
                        if (pc.nameAPP == null || pc.nameAPP.length() == 0) {
                            pc.nameAPP = pc.nameProject;
                        }
                    } catch (JsonSyntaxException | IOException e) {
                        System.out.println(e);
                        sendError(response, "Project create error " + e.toString());
                    }
                    id = -1;
                    if (pc != null) {
                        ProjectM template = projectDb.getProjectById(String.valueOf(pc.projectId));
                        pc.strings = formStrings(pc.nameAPP);;
                        pc.colors = template.colors;
                        pc.dimens = template.dimens;
                        pc.style = template.style;
                        pc.style_spec = template.style_spec;
                        pc.style_check = template.style_check;
                        pc.style_check_3 = template.style_check_3;
                        pc.drawable = template.drawable;
                        pc.appParam = template.appParam;
                        pc.resurseInd = lowerCaseRandom(15);
                        pc.screens = template.screens.replaceAll(template.resurseInd, pc.resurseInd);
                        pc.host = template.host;
                        pc.dateCreate = new Date().getTime();
                        pc.whereServer = "Server IDE";
                        id = projectDb.createProjectId(pc);
                        pc.projectId = id;
                        createResFromTemplate(ds.patchOutsideProject, pc.resurseInd, template.resurseInd);
                        projectDb.setLastProject(String.valueOf(ds.userId), String.valueOf(id));
                        sendResult(response, gson.toJson(pc));
                    }
                    break;
                case "/project/delete":
                    if (ds.userId == userExample) {
                        sendError(response, "This project cannot be deleted");
                        break;
                    }
                    ParamDel par = null;
                    try {
                        String param = getStringRequest(request);
                        par = gson.fromJson(param, ParamDel.class);
                    } catch (IOException e) {
                        System.out.println(e);
                        sendError(response, "delete project error " + e.toString());
                        break;
                    }
                    res = "";
                    if (par != null) {
                        String basePath = ds.patchOutsideProject;
                        String projectPath = Constants.PROJECTS_DATA + par.schema;
                        deleteDir(basePath + projectPath);
//                        projectDb.deleteProjectId(par.projectId);
                        res = projectDb.deleteProjectId(par.projectId);
                        if (res.indexOf("error") == 0) {
                            sendError(response, res);
                        } else {
                            sendResultOk(response);
                        }
                    } else {
                        sendError(response, "project/delete no options to delete");
//                        sendResultOk(response);
                    }
                    break;
                case "/project/del_only":
                    if (ds.userId == userExample) {
                        sendError(response, "This project cannot be deleted");
                        break;
                    }
                    par = null;
                    try {
                        String param = getStringRequest(request);
                        par = gson.fromJson(param, ParamDel.class);
                    } catch (IOException e) {
                        System.out.println(e);
                        sendError(response, "delete project error " + e.toString());
                        break;
                    }
                    projectDb.deleteProjectId(par.projectId);
                    sendResultOk(response);
                    break;
            }
    }
    
    @Override
    public int needToLogin() {
        return 2;
    }
    
    private void createBaseRes(String basePath, String resurseInd, String realPath) {
        String projectPath = basePath + Constants.PROJECTS_DATA + resurseInd + "/res";
        formDir(projectPath);
        String mipmapPath = realPath + "mipmap/res";
        copyDir(mipmapPath, projectPath);
    }
    
    private void createResFromTemplate(String basePath, String resurseIndNewProject, String resurseIndTemplate) {
        String projectPath = basePath + Constants.PROJECTS_DATA + resurseIndNewProject + "/res";
        formDir(projectPath);
        String templatePath = basePath + Constants.PROJECTS_DATA + resurseIndTemplate + "/res";
        copyDir(templatePath, projectPath);
    }
    
    private String formStrings(String appName) {
        List<ItemResurces> li = new ArrayList();
        ItemResurces ir = new ItemResurces();
        ir.itemId = 0;
        ir.itemName = "app_name";
        ir.itemValue = appName;
        li.add(ir);
        return gson.toJson(li);
    }

    private String formStringsLang() {
        return "[]";
    }
    
    private String formStyle() {
        List<ItemStyle> li = new ArrayList();
        ItemStyle is = new ItemStyle();
        is.styleName = "AppTheme";
        List<ItemResurces> listItem = new ArrayList();
        listItem.add(new ItemResurces("parent", "Theme.AppCompat.Light.NoActionBar"));
        listItem.add(new ItemResurces("colorPrimary", "@color/primary"));
        listItem.add(new ItemResurces("colorPrimaryDark", "@color/primaryDark"));
        listItem.add(new ItemResurces("colorAccent", "@color/accent"));
        is.listItem = listItem;
        li.add(is);
        
        is = new ItemStyle();
        is.styleName = "st_title";
        listItem = new ArrayList();
        listItem.add(new ItemResurces("android:textSize", "24sp"));
        listItem.add(new ItemResurces("android:textColor", "@color/title"));
        is.listItem = listItem;
        li.add(is);
        return gson.toJson(li);
    }
    
    private String formStyleSpec() {
        ListSwitchParam lsp = new ListSwitchParam();
        ItemSwitch is = new ItemSwitch();
        is.id = 0;
        is.type = "switch";
        is.param = new SwitchParam(0,0,14,30,24, "", "top", "Off", 12,0,3,6,3,0,7,false);
        lsp.add(is);
        return gson.toJson(lsp);
    }
    
    private String formStyleCheck() {
        ListSwitchParam lsp = new ListSwitchParam();
        ItemSwitch is = new ItemSwitch();
        is.id = 0;
        is.type = "check";
        is.param = new SwitchParam(0,0,14,30,24, "", "top", "Off", 12,0,3,6,3,0,7,false);
        lsp.add(is);
        return gson.toJson(lsp);
    }
    
    private String formStyleCheck_3() {
        ListSwitchParam lsp = new ListSwitchParam();
        ItemSwitch is = new ItemSwitch();
        is.id = 0;
        is.type = "check";
        is.param = new SwitchParam(0,0,14,30,24, "", "top", "Off", 12,0,0,0,19,0,7,false);
        lsp.add(is);
        return gson.toJson(lsp);
    }

    private String formDrawable() {
        List<ItemResurces> li = new ArrayList();
        ItemResurces ir = new ItemResurces();
        ir.itemId = 1000;
        ir.itemName = "shape_1000";
        ir.itemValue = "{\"corners\":{\"lt\":50,\"tr\":50,\"rb\":50,\"bl\":50},\"type\":\"rectangle\",\"border\":0,\"borderStyle\":\"solid\",\"bordedColor\":3,\"color_1\":0,\"color_2\":-1,\"gradient\":0}";
        li.add(ir);
        return gson.toJson(li);
    }
    
    private String formAppParam() {
        List<ItemAppParam> li = new ArrayList();
        return gson.toJson(li);
    }

    private String formScreens() {
        ListScreen ls = new ListScreen();
//        List<ScreenM> ls = new ArrayList();
        return gson.toJson(ls);
    }

    private String formDimens() {
        List<ItemResurces> li = new ArrayList();
        ItemResurces item = new ItemResurces();
        item.itemId = 0;
        item.itemName = "dim_10";
        item.itemValue = "10dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 1;
        item.itemName = "dim_12";
        item.itemValue = "12dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 2;
        item.itemName = "dim_14";
        item.itemValue = "14dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 3;
        item.itemName = "dim_16";
        item.itemValue = "16dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 4;
        item.itemName = "dim_18";
        item.itemValue = "18dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 5;
        item.itemName = "dim_20";
        item.itemValue = "20dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 6;
        item.itemName = "dim_24";
        item.itemValue = "24dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 7;
        item.itemName = "dim_28";
        item.itemValue = "28dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 8;
        item.itemName = "dim_32";
        item.itemValue = "32dp";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 9;
        item.itemName = "dim_48";
        item.itemValue = "48dp";
        li.add(item);
        
        li.add(resurseItem(10, "d_h_tool", "56dp"));
        
        return gson.toJson(li);
    }
    
    private String formColor() {
        List<ItemResurces> li = new ArrayList();
        ItemResurces item;
        item = new ItemResurces();
        item.itemId = 0;
        item.itemName = "primary";
        item.itemValue = "#51aeff";
        li.add(item);

        item = new ItemResurces();
        item.itemId = 1;
        item.itemName = "primaryDark";
        item.itemValue = "#007eed";
        li.add(item);
        item = new ItemResurces();
        item.itemId = 2;
        item.itemName = "primaryLight";
        item.itemValue = "#a3d4ff";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 3;
        item.itemName = "accent";
        item.itemValue = "#ffe854";
        li.add(item);

        item = new ItemResurces();
        item.itemId = 4;
        item.itemName = "accentDark";
        item.itemValue = "#ffc300";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 5;
        item.itemName = "accentLight";
        item.itemValue = "#fff199";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 6;
        item.itemName = "grey";
        item.itemValue = "#cccccc";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 7;
        item.itemName = "greyDark";
        item.itemValue = "#bbbbbb";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 8;
        item.itemName = "greyLight";
        item.itemValue = "#eeeeee";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 9;
        item.itemName = "error";
        item.itemValue = "#ff7755";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 10;
        item.itemName = "errorDark";
        item.itemValue = "#ff0000";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 11;
        item.itemName = "errorLight";
        item.itemValue = "#ff5544";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 12;
        item.itemName = "text";
        item.itemValue = "#454545";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 13;
        item.itemName = "title";
        item.itemValue = "#000000";
        li.add(item);
        
        item = new ItemResurces();
        item.itemId = 14;
        item.itemName = "comment";
        item.itemValue = "#888888";
        li.add(item);
        
        li.add(resurseItem(15, "black_50", "#00000088"));
        li.add(resurseItem(16, "black", "#000000"));
        li.add(resurseItem(17, "black_20", "#00000032"));
        
        li.add(resurseItem(18, "white_50", "#ffffff88"));
        li.add(resurseItem(19, "white", "#ffffff"));
        li.add(resurseItem(20, "white_20", "#ffffff32"));
        li.add(resurseItem(21, "defoult_text", "#808080"));

        return gson.toJson(li);
        
    }
    
    private ItemResurces resurseItem(int id, String nameItem, String valueItem) {
        ItemResurces item = new ItemResurces();
        item.itemId = id;
        item.itemName = nameItem;
        item.itemValue = valueItem;
        return item;
    }   

    private void getOutputStream() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
