package ide.dpide.servlets;

import com.google.gson.JsonSyntaxException;
import ide.dpide.android.AndroidPar;
import ide.dpide.android.ColorSet;
import ide.dpide.android.Corners;
import ide.dpide.android.Drawable;
import ide.dpide.android.ItemChange;
import ide.dpide.android.ItemSwitch;
import ide.dpide.android.ListSwitchParam;
import ide.dpide.android.SeekBarParam;
import ide.dpide.android.SwitchParam;
import ide.dpide.android.TabLayout;
import ide.dpide.db.ProjectDB;
import ide.dpide.entity.Channel;
import ide.dpide.entity.Component;
import ide.dpide.entity.DataServlet;
import ide.dpide.entity.ItemVisibility;
import ide.dpide.entity.ListAppParam;
import ide.dpide.entity.ListComponent;
import ide.dpide.entity.ListItemResurces;
import ide.dpide.entity.ListItemStyle;
import ide.dpide.entity.ListScreen;
import ide.dpide.entity.Notification;
import ide.dpide.entity.ParamSave;
import ide.dpide.entity.PushNotif;
import ide.dpide.entity.Screen;
import ide.dpide.projects.DataList;
import ide.dpide.projects.Handler;
import ide.dpide.projects.ItemAppParam;
import ide.dpide.projects.ItemInitData;
import ide.dpide.projects.ItemLang;
import ide.dpide.projects.ItemResurces;
import ide.dpide.projects.ItemStyle;
import ide.dpide.projects.Lang;
import ide.dpide.projects.ListLang;
import ide.dpide.projects.ListResources;
import ide.dpide.projects.MenuItem;
import ide.dpide.projects.MenuList;
import ide.dpide.projects.Model;
import ide.dpide.projects.Navigator;
import ide.dpide.projects.Options;
import ide.dpide.projects.Param;
import ide.dpide.projects.ParamSend;
import ide.dpide.projects.ProjectM;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@WebServlet(name = "ExportResult", urlPatterns = {"/export/*"})
public class ExportResult extends BaseServlet {
    
    private String tab4 = "    ", tab8 = "        ", tab12 = "            ", tab16 = "                ", tab20 = "                    ";
    private String afterAutch = "setToken(), setProfile(\"profile\"), handler(0, VH.NEXT_SCREEN_SEQUENCE)";
    private String afterAutchProf = "setProfile(\"profile\")";
    private String paramAutch = "login,email,phone,password";
    
    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
        ProjectM projectM;
        ProjectDB projectDb = new ProjectDB(request);
        long projectId;
        String SAVE_DIR = "";
        String zipFileName;
        String idPr = request.getParameterValues("projectId")[0];
        projectId = Long.valueOf(idPr);
        projectM = projectDb.getProjectById(idPr);
        zipFileName = createRandomStr(10) + ".zip";
        ItemChange[] arChange;
        ParamSave parSave = new ParamSave();
        parSave.nameAPP = projectM.nameAPP;
        parSave.colors = gson.fromJson(projectM.colors, ListItemResurces.class);
        parSave.styles = gson.fromJson(projectM.style, ListItemStyle.class);
        parSave.drawable = gson.fromJson(projectM.drawable, ListItemResurces.class);
        parSave.strings = gson.fromJson(projectM.strings, ListItemResurces.class);
        parSave.switchSpec = gson.fromJson(projectM.style_spec, ListSwitchParam.class);
        parSave.styleCheck = gson.fromJson(projectM.style_check, ListSwitchParam.class);
        if (projectM.languages != null && projectM.languages.length() > 2) {
            parSave.lang = gson.fromJson(projectM.languages, Lang.class);
        }
        parSave.addApp = new ArrayList();
        parSave.schema = projectM.resurseInd;
        parSave.addPermish = new HashSet();
        parSave.plaginGradle = new HashSet();
        parSave.addImplement = new HashSet();
        parSave.addClassPath = new HashSet();
//        parSave.languages = projectM.languages;
        parSave.appParam = new ListItemResurces();

        parSave.styleTxtInpt = new HashSet();
        parSave.isCamera = false;
        parSave.havePush = false;
        parSave.importD = new HashSet();
        String basePath = ds.patchOutsideProject;
        String realPath = request.getServletContext().getRealPath("");
        String userPath = Constants.USERS_DATA + ds.userResurseInd + "/";
        String userProjPath = Constants.USERS_DATA + ds.userResurseInd + "/" + projectM.nameProject;
        String projectPath = Constants.PROJECTS_DATA + projectM.resurseInd;
        String resPath = userProjPath + "/app/src/main/res";
        parSave.realPath = realPath;
        parSave.resPath = resPath;
        String packN = projectM.namePackage + "." + projectM.nameProject;
        String pack = packN.replaceAll("\\.", "/");
        String javaPath = userProjPath + "/app/src/main/java/" + pack;
        parSave.basePath = basePath;
        parSave.userProjPath = userProjPath;
        int lengthBase = (basePath + userPath).length();
        setColorAlpha(projectM);
        switch (ds.query) {
            case "/export/apk":
            case "/export/android":
                createBaseProject(realPath, basePath,  userProjPath, basePath + projectPath);
                createDepro(realPath, basePath + javaPath, projectM, parSave);
                if (parSave.lang != null) {
                    formParamLangua(parSave);
                }
                createAppParam(basePath + javaPath, projectM, parSave);
                arChange = new ItemChange[] {
                    new ItemChange("#pack#", projectM.namePackage + "." + projectM.nameProject),
                    new ItemChange("#start_act#", parSave.nameClassStart),
                    new ItemChange("#start_screen#", parSave.nameScreenStart.toUpperCase()),
                    new ItemChange("#proj#", projectM.nameProject)
                };
                createLayout(basePath + resPath, parSave);
                createValue(basePath + resPath, parSave);
//                createAppParam(basePath + javaPath, projectM, parSave);
                createDrawable(basePath + resPath, parSave);
                createSwitch(realPath + "/android_base/", basePath + resPath, parSave);
                if (parSave.isCamera) {
                    setFileAndroid(realPath + "/android_base/my_file_provider", basePath + javaPath + "/MyFileProvider.java", arChange);
                    formDir(basePath + resPath + "/xml");
                    copyFile(realPath + "/android_base/file_paths_xml", basePath + resPath + "/xml/file_paths.xml");
                }
                if (parSave.havePush) {
                    setFileAndroid(realPath + "/android_base/push_service", basePath + javaPath + "/PushService.java", arChange);
                }
                setGradleAndroid(realPath + "/android_base/gradle_mod", basePath + userProjPath + "/app/build.gradle", arChange, parSave);
                setFileAndroid(realPath + "/android_base/start_activity", basePath + javaPath + "/" + parSave.nameClassStart + ".java", arChange);
                setManifestAndroid(realPath + "/android_base/manifest", basePath + userProjPath + "/app/src/main/AndroidManifest.xml", arChange, parSave);
                setFileAndroid(realPath + "/android_base/my_app", basePath + javaPath + "/MyApp.java", arChange);
                setGradleAndroid(realPath + "/android_base/gradle_proj", basePath + userProjPath + "/build.gradle", arChange, parSave);
                
                copyFile(realPath + "/android_base/gradle-wrapper.properties", basePath + userProjPath + "/gradle/wrapper/gradle-wrapper.properties");
                copyFile(realPath + "/android_base/gradle-wrapper.jar", basePath + userProjPath + "/gradle/wrapper/gradle-wrapper.jar");
                
                copyFile(realPath + "/android_base/compon-release.aar", basePath + userProjPath + "/app/libs/compon-release.aar");
                if (isSerwer) {
                    copyFile(realPath + "/android_base/gradle_prop_serv", basePath + userProjPath + "/gradle.properties");
                } else {
                    copyFile(realPath + "/android_base/gradle_prop", basePath + userProjPath + "/gradle.properties");
                }
                copyFile(realPath + "/android_base/git_ignor", basePath + userProjPath + "/.gitignore");
                copyFile(realPath + "/android_base/git_ignor_app", basePath + userProjPath + "/app/.gitignore");
//                copyFile(realPath + "/android_base/local.properties", basePath + userProjPath + "/local.properties");
                setFileAndroid(realPath + "/android_base/settings", basePath + userProjPath + "/settings.gradle", arChange);

                if (ds.query.equals("/export/apk")) {
                    PrintWriter writer;
                    try {
                        writer = new PrintWriter(basePath + userProjPath +  "/local.properties", "UTF-8");
                        if (isSerwer) {
                            writer.println("sdk.dir=/home/jura/android/cmdline-tools");
                        } else {
                            writer.println("sdk.dir=C\\:\\\\Users\\\\Yurii\\\\AppData\\\\Local\\\\Android\\\\Sdk");
                        }
                        writer.flush();
                        writer.close();
                    } catch (FileNotFoundException | UnsupportedEncodingException ex) {
                        System.out.println("Error form local.properties " + ex);
                    }

                    List<String> progr = new ArrayList();
                    if (isSerwer) {
//                        progr.add("gradle");
                        progr.add("/home/jura/.sdkman/candidates/gradle/6.7.1/bin/gradle");
//                        progr.add("/opt/gradle/gradle-6.7.1/bin/gradle");
                    } else {
                        progr.add("C:\\Users\\Yurii\\.gradle\\wrapper\\dists\\gradle-6.7.1-bin\\bwlcbys1h7rz3272sye1xwiv6\\gradle-6.7.1\\bin\\gradle.bat");
//                        progr.add("C:\\Users\\Yurii\\.gradle\\wrapper\\dists\\gradle-8.2.1-all\\5hap6b9n41hkg4jeh2au2pllh\\gradle-8.2.1\\bin\\gradle.bat");
                    }
                    progr.add("build");
                    String pathProject = basePath + userProjPath;
                    ProcessBuilder builder;
                    Process process;

                    builder = new ProcessBuilder(progr);
                    builder = builder.directory(new File(pathProject));
                    try {
                        process = builder.start();
                    } catch (IOException ex) {
                        System.out.println("Compile Process Error="+ ex);
                        return;
                    }
                    boolean isOk = false;
                    try ( BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream())) ) {
                        String line;
                        line = br.readLine();
//                        while ((line = br.readLine()) != null) {
                        while (line != null && line.indexOf("FAILED") == -1) {
//                            if (line != null) {
                            if (line.indexOf("BUILD SUCCESSFUL") > -1) {
                                isOk = true;
                            }
                            System.out.println(line);
//                            }
                            line = br.readLine();
                        }
                        br.close();
                    } catch (IOException | NullPointerException ex) {
                        System.out.println("Compil WRITE Error="+ ex);
                    }
                    try ( BufferedReader br = new BufferedReader(new InputStreamReader(process.getErrorStream())) ) {
                        String line;
                        line = br.readLine();
                        while (line != null) {
                            System.err.println(line);
                            line = br.readLine();
                        }
                        br.close();
                    } catch (IOException | NullPointerException ex) {
                        System.out.println("Compil WRITE Error="+ ex);
                    }
                    try {
                        process.waitFor();
                    } catch (InterruptedException ex) {
                        System.out.println("Compil waitFor Error="+ ex);
                    }
                    if (isOk) {
                        String resultFile = "download/get_apk/" + ds.userResurseInd + "/" + projectM.nameProject + "/app-debug.apk";
                        sendResult(response, resultFile);
                    } else {
                        sendError(response, "Build error. Information about the error was sent to the support team. You will be contacted within 24 hours.");
                    }
                } else {
                    String exportFileName = userPath + projectM.nameProject + ".zip";
                    zipRes(basePath + exportFileName, basePath + userProjPath, lengthBase);

                    exportFileName = "download/get_project/" + ds.userResurseInd + "/" + projectM.nameProject + ".zip";
                    sendResult(response, exportFileName);
                }
                break;
        }
    }
    
    private void createBaseProject(String realPath, String basePath, String userPath, String projectPath) {
        String userRes = basePath + userPath + "/app/src/main/res";
        formDir(basePath + userPath);
        formDir(basePath + userPath + "/app/libs");
        formDir(basePath + userPath + "/gradle/wrapper");
        formDir(userRes);
        formDir(userRes + "/drawable");
        String mipmap = userRes + "/mipmap";
        File file = new File(mipmap);
        if ( ! file.exists()) {
            copyDir(realPath + "/mipmap/res", projectPath + "/res");
        }
        copyDir(projectPath + "/res", userRes);
    }
    
    private void formParamLangua(ParamSave parSave) {
        ItemResurces ir = new ItemResurces(0, "nameLanguageInParam", parSave.lang.nameLangHeader);
        parSave.appParam.add(ir);
        ir = new ItemResurces(0, "initialLanguage", parSave.lang.codeLangInit);
        parSave.appParam.add(ir);
        ir = new ItemResurces(0, "nameLanguageInHeader", "Language");
        parSave.appParam.add(ir);
    }
    
    private void createAppParam(String path, ProjectM pr, ParamSave parSave) {
        parSave.nameScreenStart = "MAIN";
        parSave.nameClassStart = "MainActivity";
        try {
            ListAppParam param = gson.fromJson(pr.appParam, ListAppParam.class);
            try (FileWriter writer = new FileWriter(path + "/MyParams.java", false)) {
                writer.write("package " + pr.namePackage + "." + pr.nameProject + ";\n\n");
                writer.write("import com.dpcsa.compon.param.AppParams;\n\n");
                writer.write("public class MyParams extends AppParams {\n\n");
                writer.write("    @Override\n");
                writer.write("    public void setParams() {\n\n");
                writer.write(tab8 + "baseUrl = \"" + pr.host + "\";\n");
                writer.write(tab8 + "schema = \"" + parSave.schema + "\";\n");
                if (param != null) {
                    for (ItemAppParam iap : param) {
                        switch (iap.name) {
                            case "ScreenStart":
                                parSave.nameScreenStart = iap.value;
                                break;
                            case "ActivityStart":
                                parSave.nameClassStart = iap.value;
                                break;
                            case "baseUrl":
//                                writer.write(tab8 + iap.name + " = \"" + pr.host + "\";\n");
                                break;
                            case "geoApiKey":
                                String idGeo = formStringId("geoApiKey", iap.value, parSave.listString);
                                parSave.addApp.add("\n" + tab8 + "<meta-data");
                                parSave.addApp.add("\n" + tab12 + "android:name=\"com.google.android.geo.API_KEY\"");
                                parSave.addApp.add("\n" + tab12 + "android:value=\"@string/geoApiKey\"/>");
                                break;
                            default:
                                switch (iap.type) {
                                    case 0: // число
                                    case 2: // boolean
                                        writer.write(tab8 + iap.name + " = " + iap.value + ";\n");
                                        break;
                                    case 1: // строка
                                        writer.write(tab8 + iap.name + " = \"" + iap.value + "\";\n");
                                        break;
                                }
                        }
                    }
                }
                if (parSave.appParam != null && parSave.appParam.size() > 0) {
                    for (ItemResurces ir : parSave.appParam) {
                        writer.write(tab8 + ir.itemName + " = \"" + ir.itemValue + "\";\n");
                    }
                }
                writer.write("    }\n");
                writer.write("}\n");
                writer.flush();
                writer.close();
            }
        } catch (IOException ex) {
            System.out.println("ExportResult createAppParam error=" + ex);
        }
        
    }
    
    private void createDepro(String realPath, String path, ProjectM pr, ParamSave parSave) {
        formDir(path);
        ItemResurces iRes;
        List<ItemResurces> listString = parSave.getListString();
        List<String> menu = new ArrayList();
        parSave.arrayString = new ArrayList();
        List<String> declare = new ArrayList();
//        HashSet<String> importD = new HashSet();
        try {
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter( new FileOutputStream(path + "/MyDeclare.java"), "UTF8"));
            parSave.sreens = gson.fromJson(pr.screens, ListScreen.class);
            int ik = parSave.sreens.size();
            int ik1 = ik - 1;
            int z = 3;
            String st = "        ";
            String sep;
            for (int i = 0; i < ik; i++) {
                if (z == 3) {
                    if (i > 0) {
                        declare.add(st + "\n");
                    }
                    st = "        ";
                    z = 0;
                }
                z++;
                if (i == ik1) {
                    sep = ";";
                } else {
                    sep = ", ";
                }
                String name = parSave.sreens.get(i).screenName.toUpperCase();
                st += name + " = \"" + name + "\"" + sep;
            }
            declare.add(st + "\n\n");
            declare.add("    @Override\n");
            declare.add("    public void declare() {\n\n");
            for (int i = 0; i < ik; i++) {
                Screen sc = parSave.sreens.get(i);
                String scName = sc.screenName.toLowerCase();
                String type = "activity";
                if (sc.typeScreen == 1) {
                    type = "fragment";
                }
                String anim = "";
                if (sc.animate > 0) {
                    anim = ".animate(AS." + Constants.animate[sc.animate] + ")";
                }
                String endScr = ")" + anim + ";\n";
                int jk = sc.components.size();
                boolean isNavSet = false;
                if (sc.navigator != null && sc.navigator.size() > 0) {
                    isNavSet = true;
                }
                if (sc.initData != null && sc.initData.size() > 0) {
                    isNavSet = true;
                }
                if (jk > 0 || isNavSet) {
                    endScr = ")" + anim + "\n";
                }
                String tit = "";
                if (sc.title != null && sc.title.length() > 0) {
                    tit = ", " + formStringId(scName, "screen", "title", sc.title, listString);
                }
                String titPar = "";
                if (sc.titleParam != null && sc.titleParam.length() > 0) {
                    titPar = ", \"" + sc.titleParam.toLowerCase() + "\"";
                }
                declare.add("        " + type + "(" + scName.toUpperCase() + ", R.layout." + type + "_" + scName + tit + titPar + endScr);
                
                String startNavig = formStartNavigator(sc.navigator, tab16, tab12 + ".", parSave);
                String sepStartNav;
                if (startNavig.length() > 0) {
                    sepStartNav = ",\n";
                } else {
                    sepStartNav = "";
                }
                for (int j = 0; j < jk; j++) {
                    Component comp = sc.components.get(j);
                    if (comp.type.equals(Constants.LIST)) {
                        if (comp.options != null && comp.options.isCascade != null && comp.options.isCascade) {
                            if (comp.options.first) {
                                startNavig += sepStartNav + "cleanCopyVar(\"" + comp.options.nameGlob + "\")";
                                sepStartNav = ",\n";
                            }
                        }
                    }
                }
                
                String pushStart = formPushNavigator(sc.navigator, tab16, tab12 + ".", parSave);
                if (pushStart.length() > 0) {
                    declare.add(tab12 + ".pushNavigator(" + pushStart + ")\n");
                }
//System.out.println("pushStart="+pushStart+"<<");
                String initData = "";
                if (sc.initData != null && sc.initData.size() > 0) {
                    int dk = sc.initData.size();
                    String sepInitData = tab16;
                    for (int d = 0; d < dk; d++) {
                        ItemInitData id = sc.initData.get(d);
                        switch (id.typeSource) {
                            case "SIZE":
                                initData += sepInitData + "set(R.id." + id.viewId + ", TS.SIZE, R.id." + id.idComp + ")";
                                break;
                            case "PARAM":
                                String listPar = "";
                                if (id.param != null && id.param.length() > 0) {
                                    listPar = ", \"" + id.param + "\"";
                                }
                                initData += sepInitData + "setParam(R.id." + id.viewId + listPar + ")";
                                break;
                        }
                        sepInitData = tab16 + ",\n";
                    }
                }
                
                if (initData.length() > 0) {
                    declare.add(tab16 + ".setValue(" + initData + ")\n");
                }
                
                if (startNavig.length() > 0) {
                    declare.add(tab16 + ".startNavigator(" + startNavig + ")\n");
                }
                
                if (sc.navigator != null && sc.navigator.size() > 0) {
                    String endScrNav = "";
                    if (jk == 0) {
                        endScrNav = ";";
                    }
                    String navv = formNavigator(sc.navigator, tab16, tab12 + ".", parSave);
                    if (navv.length() > 0) {
                        declare.add(navv + endScrNav + "\n");
                    }
                }
                int jk1 = jk - 1;
                MenuList ml;
                String nameMenu;
                int mk, mk1;
                boolean noStart;
                String navList;
                String noHandlers;
                for (int j = 0; j < jk; j++) {
                    Component comp = sc.components.get(j);
                    String cViewId = comp.view.viewId.toLowerCase();
                    String endComp = ")\n";
                    if (j == jk1) {
                        endComp = ");\n\n";
                    }
                    switch (comp.type) {
                        case Constants.LIST:
                            navList = "";
                            if (comp.options != null && comp.options.isCascade != null && comp.options.isCascade) {
                                navList = formNavigatorList(comp.navigator, comp.options, tab20, ",\n" + tab16, parSave);
                            } else {
                                navList = formNavigator(comp.navigator, tab20, ",\n" + tab16, parSave);
                            }
                            String visiManager = formVisibility(comp);
                            String noActual = "";
                            if (comp.view.targetButton != null && comp.view.targetButton) {
                                noActual = ").noActualStart(";
                            }
                            String selT = "";
                            if (comp.view.selectedType != null && comp.view.selectedType.length() > 0) {
                                switch (comp.view.selectedType) {
                                    case "Single":
                                        selT = ".selected()";
                                        break;
                                    case "Multiple":
                                        selT = ".selected(" + comp.view.amountSelected + ")";
                                        break;
                                }
                            }
                            declare.add(tab12 + ".list(" + formModel(comp)
                                    + "\n" + tab16 + formView(comp, scName) + selT + visiManager + navList + noActual + endComp);
                            break;
                        case Constants.SCROLL:
                        case Constants.PANEL:
                            String noData = "";
                            if (comp.view.no_data != null && comp.view.no_data.length() > 0) {
                                noData = ".noDataView(R.id." + comp.view.no_data + ")";
                            }
                            declare.add(tab12 + ".component(TC.PANEL, " + formModel(comp)
                                    + "\n" + tab16 + "view(R.id." + comp.view.viewId + ")" + noData + formNavigator(comp.navigator, tab20, ",\n" + tab16, parSave) + endComp);
                            break;
                        case Constants.SCROLL_F:
                        case Constants.FORM:
                            declare.add(tab12 + ".component(TC.PANEL_ENTER, " + formModel(comp)
                                    + "\n" + tab16 + "view(R.id." + comp.view.viewId + ")" + formNavigator(comp.navigator, tab20, ",\n" + tab16, parSave) + endComp);
                            break;
                        case Constants.PAGER:
                            Component compTab = getComponentById(sc.components, comp.view.tabLayout);
                            if (compTab != null) {
                                declare.add(tab12 + ".component(TC.PAGER_F, view(R.id." + cViewId + ",\n");
                                declare.add(tab16 + formViewPager(compTab, scName, parSave) + endComp);
                            }
                            break;
                        case Constants.SPINNER:
                            noActual = "";
                            if (comp.view.targetButton != null && comp.view.targetButton) {
                                noActual = ").noActualStart(";
                            }
                            noHandlers = "";
                            if (comp.view.targetButton != null && comp.view.targetButton) {
                                noHandlers = ").noHandlersStart(";
                            }
                            declare.add(tab12 + ".component(TC.SPINNER, " + formModel(comp)
                                    + "\n" + tab16 + formViewSpinner(comp, scName) 
                                    + formNavigator(comp.navigator, tab20, ",\n" + tab16, parSave) + noActual + noHandlers + endComp);
                            break;
                        case Constants.DRAWER:
                            declare.add(tab12 + ".drawer(R.id." + cViewId + ", R.id.container_fragm, R.id.left_drawer, null, " 
                                    + comp.view.drawer_fragm.toUpperCase() + endComp);
                            break;
                        case Constants.TOOL:
                            String navMenuB = "";
                            String modTool;
                            if (comp.model.menuList == null || comp.model.menuList.list == null || comp.model.menuList.list.size() == 0) {
                                modTool = "null";
                            } else {
                                List<MenuItem> tml = comp.model.menuList.list;
                                nameMenu = "menuTool" + firstUpperCase(scName) + firstUpperCase(cViewId);
                                modTool = "model(" + nameMenu + ")";
                                parSave.importD.add(Constants.importToolMenu);
                                menu.add("    ToolBarMenu " + nameMenu + " = new ToolBarMenu()\n");
                                mk = tml.size();
                                mk1 = mk - 1;
                                noStart = true;
                                for (int m = 0; m < mk; m++) {
    //                                String startScr;
                                    MenuItem mi = tml.get(m);
                                    String endM = ")\n";
                                    if (m == mk1) {
                                        endM = ");\n";
                                    }
                                    String showAs = "2";
                                    if (mi.show.equals("never")) {
                                         showAs = "0";
                                    } else if (mi.show.equals("ifRoom")) {
                                        showAs = "1";
                                    }
                                    showAs = ", " + showAs;
                                    String stIcon = "0";
                                    if (mi.icon != null && mi.icon.length() > 0) {
                                        stIcon = dravableFromUrl(mi.icon);
                                    }
                                    menu.add("        .item(" + mi.id_field + ", " + stIcon + ", "
                                            + formStringId(scName, cViewId, mi.screen, mi.title, listString) + showAs + ", " + mi.withText 
                                            + ", false, true" + endM);
                                }
                                if (comp.navigator != null && comp.navigator.size() > 0) {
                                    navMenuB = navigatorMenuTool(comp.navigator, parSave);
                                }
                            }
                            String viewTool = ", view(R.id." + cViewId + ", new int[] {";
                            if (comp.view.selectedType != null && comp.view.selectedType.length() != 0) {
                                viewTool += dravableFromUrl(comp.view.selectedType) + ", ";
                            } else {
                                viewTool += "0, ";
                            }
                            if (comp.view.selectedField != null && comp.view.selectedField.length() != 0) {
                                viewTool += dravableFromUrl(comp.view.selectedField) + ", ";
                            } else {
                                viewTool += "0, ";
                            }
                            if (comp.view.selectedValue != null && comp.view.selectedValue.length() != 0) {
                                viewTool += dravableFromUrl(comp.view.selectedValue) + "})";
                            } else {
                                viewTool += "0})";
                            }
                            if (comp.view.zoomButtons != null && comp.view.zoomButtons) {
                                viewTool += ".setBooleanParam(true)";
                            }
                            declare.add("            .component(TC.TOOL, " + modTool + viewTool + navMenuB + endComp);
                            break;
                        case Constants.TOOL_MENU:
                            navMenuB = "";
                            if (comp.model.menuList == null || comp.model.menuList.list == null || comp.model.menuList.list.size() == 0) {
                                modTool = "null";
                            } else {
                                List<MenuItem> tml = comp.model.menuList.list;
                                nameMenu = "menuTool" + firstUpperCase(scName) + firstUpperCase(cViewId);
                                modTool = "model(" + nameMenu + ")";
                                parSave.importD.add(Constants.importToolMenu);
                                menu.add("    ToolBarMenu " + nameMenu + " = new ToolBarMenu()\n");
                                mk = tml.size();
                                mk1 = mk - 1;
                                noStart = true;
                                for (int m = 0; m < mk; m++) {
    //                                String startScr;
                                    MenuItem mi = tml.get(m);
                                    String endM = ")\n";
                                    if (m == mk1) {
                                        endM = ");\n";
                                    }
                                    String showAs = "2";
                                    if (mi.show.equals("never")) {
                                         showAs = "0";
                                    } else if (mi.show.equals("ifRoom")) {
                                        showAs = "1";
                                    }
                                    showAs = ", " + showAs;
                                    String stIcon = "0";
                                    if (mi.icon != null && mi.icon.length() > 0) {
                                        stIcon = dravableFromUrl(mi.icon);
                                    }
                                    String vis = "true";
                                    if (mi.visib != null && mi.visib) {
                                        vis = "false";
                                    }
                                    menu.add("        .item(" + mi.id_field + ", " + stIcon + ", "
                                            + formStringId(scName, cViewId, mi.screen, mi.title, listString) + showAs + ", " + mi.withText 
                                            + ", false, " + vis + endM);
                                }
                                if (comp.navigator != null && comp.navigator.size() > 0) {
                                    navMenuB = navigatorMenuTool(comp.navigator, parSave);
                                }
                            }
                            viewTool = ", view(";
                            if (comp.view.selectedType != null && comp.view.selectedType.length() != 0) {
                                viewTool += dravableFromUrl(comp.view.selectedType) + ")";
                            } else {
                                viewTool += "0)";
                            }
                            if (comp.view.zoomButtons != null && comp.view.zoomButtons) {
                                viewTool += ".setBooleanParam(true)";
                            }
                            declare.add("            .component(TC.TOOL_MENU, " + modTool + viewTool + navMenuB + endComp);
                            break;
                        case Constants.MENU_B:
                            if (noDrawer(sc.components) && sc.typeScreen == 0) {
                                declare.add("            .fragmentsContainer(R.id.container_fragm)\n");
                            }
                            ml = comp.model.menuList;
                            nameMenu = "menu" + firstUpperCase(scName) + firstUpperCase(cViewId);
                            parSave.importD.add(Constants.importMenu);
                            menu.add("    Menu " + nameMenu + " = new Menu()\n");
                            mk = ml.list.size();
                            mk1 = mk - 1;
                            noStart = true;
                            for (int m = 0; m < mk; m++) {
                                String startScr;
                                MenuItem mi = ml.list.get(m);
                                String endM = ")\n";
                                if (m == mk1) {
                                    endM = ");\n";
                                }
                                String screenM = ", \"\"";
                                if (mi.screen != null && mi.screen.length() > 0) {
                                    screenM = ", " + mi.screen.toUpperCase();
                                }
                                if (mi.start != null && mi.start && noStart) {
                                    startScr = ", true";
                                    noStart = false;
                                } else {
                                    startScr = "";
                                }
                                String stIcon = "0";
                                if (mi.icon != null && mi.icon.length() > 0) {
                                    stIcon = dravableFromUrl(mi.icon);
                                }
                                menu.add("        .item(" + stIcon + ", "
                                        + formStringId(scName, cViewId, mi.screen, mi.title, listString) + screenM + startScr + endM);
                            }
                            navMenuB = "";
                            if (comp.navigator != null && comp.navigator.size() > 0) {
                                navMenuB = navigatorMenuB(comp.navigator, mk, parSave);
                            }
                            declare.add("            .menuBottom(model(" + nameMenu + "), view(R.id." + cViewId + ")" + navMenuB + endComp);
                            break;
                        case Constants.MENU:
                            ml = comp.model.menuList;
                            nameMenu = "menu_" + firstUpperCase(scName) + "_" + firstUpperCase(cViewId);
                            parSave.importD.add(Constants.importMenu);
                            menu.add("    Menu " + nameMenu + " = new Menu()\n");
                            mk = ml.list.size();
                            mk1 = mk - 1;
                            noStart = true;
                            for (int m = 0; m < mk; m++) {
                                MenuItem mi = ml.list.get(m);
                                String startScr;
                                String stEnabled = "";
                                String endM = ")\n";
                                if (m == mk1 && ! (mi.divider != null && mi.divider)) {
                                    endM = ");\n";
                                }
                                String screenM = ", \"\"";
                                if (mi.screen != null && mi.screen.length() > 0) {
                                    screenM = ", " + mi.screen.toUpperCase();
                                }
                                
                                if (mi.start != null && mi.start && noStart) {
                                    startScr = ", true";
                                    noStart = false;
                                } else {
                                    startScr = "";
                                }
                                if (mi.enabled != null && mi.enabled.equals("Auth")) {
                                    stEnabled = ").enabled(1";
                                }
                                menu.add("        .item(" + dravableFromUrl(mi.icon) + ", "
                                        + formStringId(scName, cViewId, mi.screen, mi.title, listString) + screenM + startScr + stEnabled + endM);
                                if (mi.divider != null && mi.divider) {
                                    if (m == mk1) {
                                        menu.add("        .divider();\n");
                                    } else {
                                        menu.add("        .divider()\n");
                                    }
                                }
                            }
                            declare.add("            .menu(model(" + nameMenu + "), view(R.id." + cViewId + ")" + endComp);
                            break;
                        case Constants.MAP:
                            String zoom;
                            Param par = comp.param;
                            parSave.importD.add(Constants.importParamMap);
                            if (par.levelZoom == null || par.levelZoom.length() == 0) {
                                zoom = "";
                            } else {
                                zoom = ".levelZoom(" + par.levelZoom + "f)";
                            }
                            String contr = "";
                            if ( (comp.view.targetButton != null && comp.view.targetButton) || (comp.view.zoomButtons != null && comp.view.zoomButtons)) {
                                String targ = "false";
                                if (comp.view.targetButton != null && comp.view.targetButton) {
                                    targ = "true";
                                }
                                String zoo = "false";
                                if (comp.view.zoomButtons != null && comp.view.zoomButtons) {
                                    zoo = "true";
                                }
                                contr = "\n" + tab16 + ".mapControls(" + targ + "," + zoo + ")";
                            }
                            String coord = "";
                            if (par.longitude != null && par.latitude != null) {
                                String lat = "0", lon = "0";
                                if (par.longitude.length() != 0) {
                                    lon = par.longitude;
                                }
                                if (par.latitude.length() != 0) {
                                    lat = par.latitude;
                                }
                                coord = "\n" + tab16 + ".coordinateValue(" + lat + "," + lon + ")";
                            }
                            String mod = formModel(comp);
                            String nav = "";
                            if (comp.navigator.size() == 0) {
                                nav = ", null";
                            } else {
                                nav = formNavigator(comp.navigator, tab20, ",\n" + tab16, parSave);
                            }
                            declare.add(tab12 + ".componentMap(R.id." + cViewId + ", " + mod
                                    + "\n" + tab16 + "new ParamMap(true)" + zoom + coord + formMarker(comp) + contr + nav + endComp);
                            parSave.addPermish.add("<uses-permission android:name=\"android.permission.ACCESS_FINE_LOCATION\"/>");
                            parSave.addPermish.add("<uses-permission android:name=\"android.permission.ACCESS_COARSE_LOCATION\"/>");
                            break;
                        case Constants.TAGS:
                            navList = formNavigator(comp.navigator, tab20, ",\n" + tab16, parSave);
                            declare.add(tab12 + ".component(TC.TAGS, " + formModel(comp)
                                    + "\n" + tab16 + formView(comp, scName) + navList + endComp);
                            break;
                        case Constants.PLUS_MINUS:
                            navList = formNavigator(comp.navigator, tab20, ",\n" + tab16, parSave);
                            if (navList.length() == 0) {
                                navList = ", null";
                            }
                            String multStr = ", null";
                            if (comp.model.menuList != null && comp.model.menuList.list != null) {
                                List<MenuItem> mult = comp.model.menuList.list;
                                String sepMult = ", ";
//                                if (ik > 0) {
                                    multStr = "";
                                    for (MenuItem mi : mult) {
                                        String fRes = "";
                                        if (mi.screen != null && mi.screen.length() > 0) {
                                            fRes = mi.screen;
                                        }
                                        String stVi = "0";
                                        if ( mi.id.trim().length() > 0) {
                                            stVi = "R.id." + mi.id;
                                        }
                                        multStr += sepMult + "new Multiply(" + stVi + ", \"" + mi.title + "\", \"" + fRes + "\")";
                                    }
//                                } 
                            }
                            declare.add(tab12 + ".plusMinus(R.id." + comp.view.viewId + ", R.id." + comp.view.plusId + ", R.id." + comp.view.minusId 
                                    + navList + multStr + endComp);
                            break;
                        case Constants.TOTAL:
                            String nf = "";
                            String[] listNF = comp.view.selectedField.split(",");
                            for (String stNF : listNF) {
                                nf += ", \"" + stNF + "\"";
                            }
                            if (nf.length() == 0) {
                                nf = ", null";
                            } else {
                                parSave.importD.add(Constants.importMultiply);
                            }
                            String evV = ", 0";
                            if (comp.view.plusId != null && comp.view.plusId.length() != 0) {
                                evV = ", R.id." + comp.view.plusId ;
                            }
                            declare.add(tab12 + ".componentTotal(R.id." + comp.view.viewId + ", R.id." + comp.view.tabLayout 
                                    + evV + ", null" + nf + endComp);
                            break;
                        case Constants.PHOTO:
                            String[] phList;
                            String phStr = comp.view.tabLayout;
                            String phId = "";
                            if (phStr != null && phStr.length() > 0) {
                                phList = phStr.split(",");
                                int ikPh = phList.length;
                                if (ikPh == 1) {
                                    phId = ", R.id." + phStr;
                                } else {
                                    phId = ", new int[] {";
                                    sep = "";
                                    for (int k = 0; k < ikPh; k++) {
                                        phId += sep + "R.id." + phList[k];
                                        sep = ", ";
                                    }
                                    phId += "}";
                                }
                            }
                            String idStrPerm = ", 0";
                            if (comp.view.selectedField != null && comp.view.selectedField.length() > 0) {
                                idStrPerm = ", " + formStringId(scName + "_" + cViewId, comp.view.selectedField, parSave.listString);
                            }
                            String phParam = "";
                            if (comp.view.param != null && comp.view.param.length() > 0) {
                                phParam = ", \"" + comp.view.param + "\"";
                            }
                            declare.add(tab12 + ".componentPhoto(R.id." + comp.view.title + phId + idStrPerm + phParam + endComp);
                            addCameraPermishen(realPath + "/android_base/provider", parSave);
                            break;
                        case Constants.SUBSCRIBE_FIREBASE:
                            declare.add(tab12 + ".subscribeTopic(R.id." + comp.view.title + ", \"" + comp.view.selectedField + "\"" + endComp);
                            break;
                        case Constants.SUBSCRIBE_SERVER:
                            declare.add(tab12 + ".componentSubscribe(R.id." + comp.view.title + ", \"" + comp.view.selectedField + "\"" + endComp);
                            break;
                        case Constants.EDIT_GALLERY:
                            idStrPerm = ", 0";
                            if (comp.view.selectedField != null && comp.view.selectedField.length() > 0) {
                                idStrPerm = ", " + formStringId(scName + "_" + comp.view.tabLayout, comp.view.selectedField, parSave.listString);
                            }
                            declare.add(tab12 + ".editGallery(R.id." + comp.view.tabLayout + ", R.id." + comp.view.plusId + ", R.id." + comp.view.minusId 
                                    + ",\n" + tab16 + "R.id." + comp.view.title + idStrPerm 
                                    + ", \"query/" + parSave.schema + "/\"" + endComp);
                            addCameraPermishen(realPath + "/android_base/provider", parSave);
                            break;
                        case Constants.SEQUENCE:
                            declare.add(tab12 + ".componentSequence(" + comp.view.plusId.toUpperCase() + ", " + comp.view.minusId.toUpperCase() +
                                    ", " + comp.view.tabLayout.toUpperCase() + endComp);
                            break;
                        case Constants.INTRO:
                            String plus = comp.view.plusId;
                            if (plus == null || plus.length() == 0) {
                                plus = ", 0";
                            } else {
                                plus = ", R.id." + plus;
                            }
                            String minus = comp.view.minusId;
                            if (minus == null || minus.length() == 0) {
                                minus = ", 0";
                            } else {
                                minus = ", R.id." + minus;
                            }
                            String tabL = comp.view.tabLayout;
                            if (tabL == null || tabL.length() == 0) {
                                tabL = ", 0";
                            } else {
                                tabL = ", R.id." + tabL;
                            }
                            String parI = comp.view.param;
                            if (parI == null || parI.length() == 0) {
                                parI = ", 0";
                            } else {
                                parI = ", R.id." + parI;
                            }
                            declare.add(tab12 + ".componentIntro(" + formModel(comp) + " R.id." + comp.view.viewId + ", R.layout.item_" + scName + "_" 
                                    + comp.view.viewId + "_0" + plus + minus + tabL + parI + endComp);
                            break;
                    }
                }
            }
            
            if (pr.push != null && pr.push.length() > 0) {
                PushNotif pushN = gson.fromJson(pr.push, PushNotif.class);
                List<Channel> listC = pushN.notif;
                int ikCan = listC.size();
                if (ikCan > 0) {
                    addPushPermishen(realPath + "/android_base/push_for_manif", parSave);
                    createFileFromString(pushN.config, parSave.basePath + parSave.userProjPath + "/app/google-services.json");
                    parSave.plaginGradle.add("apply plugin: 'com.google.gms.google-services'");
                    parSave.addImplement.add("implementation 'com.google.firebase:firebase-messaging:20.0.1'");
                    parSave.addClassPath.add("classpath 'com.google.gms:google-services:4.3.3'");
                    parSave.havePush = true;
                }
                if (pushN.icon != null && pushN.icon.length() > 0) {
                    parSave.addApp.add("\n" + tab8 + "<meta-data");
                    parSave.addApp.add("\n" + tab12 + "android:name=\"com.google.firebase.messaging.default_notification_icon\"");
                    parSave.addApp.add("\n" + tab12 + "android:resource=\"@drawable/" + dravableFromName(pushN.icon) + "\" />");
                    if (pushN.color != null && pushN.color >= 0) {
                        parSave.addApp.add("\n" + tab8 + "<meta-data");
                        parSave.addApp.add("\n" + tab12 + "android:name=\"com.google.firebase.messaging.default_notification_color\"");
                        parSave.addApp.add("\n" + tab12 + "android:resource=\"" + findColorByIndex(pushN.color, parSave.colors) + "\" />");
                    }
                }
                declare.add("\n");
                for (int i = 0; i < ikCan; i++) {
                    Channel item = listC.get(i);
                    if (item.name != null && item.name.length() > 0 
                            && item.txt != null && item.txt.length() > 0 
                            && item.screen != null && item.screen.length() > 0) {
                        parSave.importD.add(Constants.importance + item.importance + ";\n");
                        declare.add("        channel(\"" + item.name + "\", \"" + item.txt +"\", IMPORTANCE_" + item.importance + ", " + item.screen + "Activity.class,");
                        List<Notification> notifi = item.notices;
                        int jkNot = notifi.size();
                        declare.add("\n            notices(");
                        for (int j = 0; j < jkNot; j++) {
                            Notification itemN = notifi.get(j);
                            if (j > 0) {
                                declare.add(",");
                            }
                            declare.add("\n            notice(\"" + itemN.name + "\")");
                            declare.add("\n                .lotPushs(\"" + itemN.txt + "\", true)");
                            if (itemN.large != null && itemN.large.length() > 0) {
                                declare.add("\n                .iconLarge(" + dravableFromUrl(item.large) + ")"); 
                            }
                            if (itemN.icon != null && itemN.icon.length() > 0) {
                                if (itemN.color == null || itemN.color.length() == 0) {
                                    itemN.color = "1";
                                }
                                declare.add("\n                .icon(" + dravableFromUrl(itemN.icon) + ", getColor(" 
                                    + findColorResourse(Integer.valueOf(itemN.color), parSave.colors) + "))");
                            }
                        }
                        declare.add("))\n");
                    }
                    if (item.icon != null && item.icon.length() > 0) {
                        declare.add("            .icon(" + dravableFromUrl(item.icon) + ")"); 
                    }
                    if (item.large != null && item.large.length() > 0) {
                        declare.add("\n            .iconLarge(" + dravableFromUrl(item.large) + ")"); 
                    }
                    if (item.color != null && item.color.length() > 0) {
                        declare.add("\n            .iconColor(" + findColorResourse(Integer.valueOf(item.color), parSave.colors) + ")"); 
                    }
                    declare.add(";\n");
                }
            }
            declare.add("    }\n");
            
            writer.write("package " + pr.namePackage + "." + pr.nameProject + ";\n\n");
            writer.write("import com.dpcsa.compon.base.DeclareScreens;\n");
            for (String stI : parSave.importD) {
                writer.write(stI);
            }
            writer.write("\n");
            writer.write("public class MyDeclare extends DeclareScreens {\n\n");
            writer.write("    public final static String\n");
            for (String stD : declare) {
                writer.write(stD);
            }

            int mk = menu.size();
            if (mk > 0) {
                writer.write("\n");
                for (int m = 0; m < mk; m++) {
                    writer.write(menu.get(m));
                }
            }
            
            writer.write("\n}\n");
            writer.flush();
            writer.close();
        } catch (IOException ex) {
            System.out.println("ExportResult createDimens error=" + ex);
        }
    }
    
    private String formVisibility(Component comp) {
        String visiManager = "";
        if (comp.visiManager != null && comp.visiManager.size() > 0) {
            visiManager = "\n" + tab16 + ".visibilityManager(";
            String sepVis = "";
            for (ItemVisibility iv : comp.visiManager) {
                switch (iv.type) {
                    case "show":
                        visiManager += sepVis + "visibility(R.id." + iv.view + ", \"" + iv.field + "\")" ;
                        break;
                    case "enabled":
                        visiManager += sepVis + "enabled(R.id." + iv.view + ", \"" + iv.field + "\")" ;
                        break;
                    case "hide":
                        visiManager += sepVis + "gone(R.id." + iv.view + ", \"" + iv.field + "\")" ;
                        break;
                }
                sepVis = ",";
            }
            visiManager += ")";
        }
        return visiManager;
    }
    
    private boolean noDrawer(ListComponent components) {
        for (Component comp : components) {
            if (comp.type.equals(Constants.DRAWER)) {
                return false;
            }
        }
        return true;
    }
    
    private Component getComponentById(ListComponent components, String id) {
        for (Component comp : components) {
            if (comp.view.viewId.equals(id)) {
                return comp;
            }
        }
        return null;
    }
    
    private String formModel(Component comp) {
        Model m = comp.model;
        if (m.bool_1 != null && m.bool_1) {
            return "null,";
        }
        String res = "model(";
        String stPar;
        switch (m.method) {
            case Constants.TEST:
                res += "JSON, " + gson.toJson(comp.model.test) + "),";
                break;
            case Constants.POST:
                res += "POST, ";
            case Constants.FILTER:
                if (m.method != Constants.POST) {
                    res += "FILTER, ";
                }
            case Constants.GET:
                if (m.url == null || m.url.length() == 0) {
                    return "";
                }
//System.out.println("comp.param="+comp.model.param+"<<");
                res += formUrl(comp);
                if (m.param != null && m.param.length() > 0) {
                    res += ", " + formUrlParam(comp);
                }
                if (m.st_1 != null && m.st_1.length() > 0) {
                    int dur = Integer.valueOf(m.st_1) * 60000;
                    res += ", " + dur;
                }
                res += "),";
                break;
            case Constants.PARAMETERS:
                stPar = "";
                if (m.param != null && m.param.length() > 0) {
                    stPar += ", " + formUrlParam(comp);
                }
                res += "PARAMETERS" + stPar + "),";
                break;
            case Constants.GLOBAL:
                stPar = "";
                if (m.param != null && m.param.length() > 0) {
                    stPar += ", " + formUrlParam(comp);
                }
                res += "GLOBAL" + stPar + "),";
                break;
            case Constants.PROFILE:
                res += "PROFILE),";
                break;
            case Constants.NULL:
                res = "null,";
        }
        return res;
    }
    
    private String formMarker(Component comp) {
        Param par = comp.param;
        String myM = "0, ", m = "0";
        boolean myB = false, mB = false;
        if (par.myMarker != null && par.myMarker.length() > 0) {
            myM = dravableFromUrl(par.myMarker) + ", ";
            myB = true;
        }
        if (par.marker != null && par.marker.length() > 0) {
            m = dravableFromUrl(par.marker);
            mB = true;
        }
        if (mB || myB) {
//            .markerClick(R.id.infoWindow, true),
            
            
            String mc = "";
            if (comp.model.data != null && comp.model.data.size() > 0) {
                mc = "\n" + tab16 + ".markerClick(R.id.mark_" +comp.view.viewId + ", false)";
            }
            return "\n" + tab16 + ".markerImg(" + myM + m + ")" + mc;
        } else {
            return "";
        }
    }
    
    private String formUrl(Component comp) {
        return inDoubleQuotes(comp.model.url);
    }
    
    private String formUrlParam(Component comp) {
        return inDoubleQuotes(comp.model.param);
    }
    
    private String formNavigatorList(Navigator navigator, Options opt, String tab, String beg, ParamSave parSave) {
        int ik = navigator.size();
        String res = beg + "navigator(";
        String sep = ",\n" + tab;
        if (opt.nextId != null && opt.nextId.length() > 0) {
            res += "addVar(R.id." + opt.nextId + ", \"" + opt.nameGlob + "\", \"" + opt.listVar + "\")";
        } else {
            sep = "";
        }
        res += sep + "addVar(R.id." + opt.enterId + ", \"" + opt.nameGlob + "\", \"" + opt.listVar + "\")";
        sep = ",\n" + tab;
        res += sep + "delVarFollow(R.id." + opt.enterId + ", \"" + opt.nameGlob + "\", \"" + opt.listVar + "\")";
        res += sep + "backOk(R.id." + opt.enterId + ")";
        if (ik > 0) {
            for (int i = 0; i < ik; i++) {
                res += sep + formHandler(navigator, i, false, false, parSave);
            }
        }
        res += ")";
        return res;
    }
    
    private String formStartNavigator(Navigator navigator, String tab, String beg, ParamSave parSave) {
        int ik = navigator.size();
        if (ik > 0) {
            String res = "";
            String sep = "";
            for (int i = 0; i < ik; i++) {
                Handler hh = navigator.get(i);
                if ( hh.viewId.equals("Execute at startup screen")) {
                    res += sep + formHandler(navigator, i, false, false, parSave);
                    sep = ",\n" + tab;
                }
            }
            return res;
        } else {
            return "";
        }
    }
    
    private String formPushNavigator(Navigator navigator, String tab, String beg, ParamSave parSave) {
        int ik = navigator.size();
        String res = "";
        String sep = "";
        for (int i = 0; i < ik; i++) {
            Handler hh = navigator.get(i);
            if (Constants.pushHandlers.contains(hh.handler)) {
                res += sep + formHandler(navigator, i, false, false, parSave);
                sep = ",\n" + tab;
            }
        }
        return res;
    }
    
    private String formNavigator(Navigator navigator, String tab, String beg, ParamSave parSave) {
        int ik = navigator.size();
        if (ik > 0) {
            String res = "";
            String sep = "";
            for (int i = 0; i < ik; i++) {
                Handler hh = navigator.get(i);
                if ( ! hh.viewId.equals("Execute at startup screen") 
                        && ! Constants.pushHandlers.contains(hh.handler)) {
                    res += sep + formHandler(navigator, i, false, false, parSave);
                    sep = ",\n" + tab;
                }
            }
//            res += ")";
            if (res.length() > 0) {
                return beg + "navigator(" + res + ")";
            } else {
                return "";
            }
        } else {
            return "";
        }
    }
    
    private String formHandler(Navigator navigator, int i, boolean menu, boolean tool, ParamSave parSave) {
        Handler hh = navigator.get(i);
        String res = "";
        String stId;
        String parId;
        String sep = "";
        String evType = "";
        if (hh.event != null && ! hh.event.equals("click")) {
            evType = ".setTypeEvent(ViewHandler.ev" + hh.event.toUpperCase() + ")";
            parSave.importD.add(Constants.importViewHandler);
        }
//        int ik = navigator.size();
        if (menu) {
            if (tool) {
                stId = String.valueOf(hh.id_field);
            } else {
                stId = "";
            }
        } else {
            if (hh.viewId != null && hh.viewId.length() > 0 && ! hh.viewId.equals("0")) {
                stId = "R.id." + hh.viewId;
            } else {
                stId = "";
            }
        }
        if (hh.id != null && hh.id.length() > 0) {
            parId = "R.id." + hh.id;
        } else {
            parId = "";
        }
        String com = "";
        if (stId.length() > 0 && parId.length() > 0) {
            com = ", ";
        }
        String comSh = "";
        String stAfter;
        if (stId.length() > 0) {
            comSh = ", ";
        }
        switch (hh.handler) {
            case "start":
                if (stId.length() > 0) {
                    sep = ",";
                } else {
                    sep = "";
                }
                stAfter = "";
                if (hh.after != null && hh.after.size() > 0) {
                    stAfter = ", after(";
                    String sepAft = "";
                    int ak = hh.after.size();
                    for (int a = 0; a < ak; a++) {
                        stAfter += sepAft + formHandler(hh.after, a, menu, tool, parSave);
                        sepAft = ",\n" + tab20;
                    }
                    stAfter += ")";
                }
                String mustValid = "";
                if (hh.param_1 != null && hh.param_1.length() > 0) {
                    mustValid = formMustValid(hh.param_1);
                }
                res = "start(" + stId + sep + hh.param.toUpperCase() + stAfter + mustValid + ")";
                break;

            case "setVar":
                res = "setVar(R.id." + hh.id + ",\"" + hh.param + "\",\"" + hh.param_1 + "\")";
                break;
            case "hide":
                res = "hide(" + stId + comSh + "R.id." + hh.id + ")";
                break;
            case "show":
                res = "show(" + stId + comSh + "R.id." + hh.id + ")";
                break;
            case "checked":
                if (hh.after != null && hh.nav_1 != null) {
                    stAfter = null;
                    if (hh.after != null && hh.after.size() > 0) {
                        stAfter = ", after(";
                        String sepAft = "";
                        int ak = hh.after.size();
                        for (int a = 0; a < ak; a++) {
                            stAfter += sepAft + formHandler(hh.after, a, menu, tool, parSave);
                            sepAft = ",\n" + tab20;
                        }
                        stAfter += ")";
                    }
                    
                    String stNav = null;
                    if (hh.nav_1 != null && hh.nav_1.size() > 0) {
                        stNav = ", after(";
                        String sepAft = "";
                        int ak = hh.nav_1.size();
                        for (int a = 0; a < ak; a++) {
                            stNav += sepAft + formHandler(hh.nav_1, a, menu, tool, parSave);
                            sepAft = ",\n" + tab20;
                        }
                        stNav += ")";
                    }
                    res = "checked(" + stId + stAfter + stNav + ")";
                }
                break;
            case "add item list":
                String vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                res = "handler(" + vId + ", VH.ADD_ITEM_LIST, R.id." + hh.id + ")";
                break;
            case "delete item list":
                vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                res = "handler(" + vId + ", VH.DEL_ITEM_LIST)";
                break;
            case "nextScreen":
                vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                res = "handler(" + vId + ", VH.NEXT_SCREEN_SEQUENCE)";
                break;
            case "dialUp":
                res = "handler(" + stId+ ", VH.DIAL_UP)";
                break;
            case "exit":
                vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                res = "exit(" + vId+ ")";
                break;
            case "springScale":
                res = "springScale(" + parId+ ", 3, 1000)";
                break;
            case "selectMenu":
                String cont = "";
                if (hh.check != null && hh.check) {
                    cont = ", true";
                }
                res = "selectMenu(" + parId+ ", \"" + hh.param + "\", \"" + hh.param_1.toUpperCase() + "\"" + cont + ")";
                break;
            case "selectList":
                if (hh.check != null && hh.check) {
                    cont = ", true";
                } else {
                    cont = ", false";
                }
                res = "selectRecycler(" + parId+ ", \"" + hh.param + "\", \"" + hh.param_1 + "\", 0" + cont + ")";
                break;
            case "nullifyCount":
                res = "nullifyCountPush(\"" + hh.param + "\")";
                break;
            case "actual":
                vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                if (vId == "0") {
                    res = "actual(" + parId + ")";
                } else {
                    res = "actual(" + vId + ", " + parId + ")";
                }
                break;
            case "send":
                vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                String ppPar;
                ParamSend parSend = gson.fromJson(hh.param, ParamSend.class);
                stAfter = ", after()";
                if (hh.after != null && hh.after.size() > 0) {
                    stAfter = ", after(";
                    String sepAft = "";
                    int ak = hh.after.size();
                    for (int a = 0; a < ak; a++) {
                        stAfter += sepAft + formHandler(hh.after, a, menu, tool, parSave);
                        sepAft = ",\n" + tab20;
                    }
                    stAfter += ")";
                }
                String mValid = "";
                String en = "false";
                if (hh.check != null && hh.check) {
                    en = "true";
                }
                mValid = ",\n" + tab20 + en;
                if (parSend.queryFilds.valid != null && parSend.queryFilds.valid.length() > 0) {
                    String[] arValid = parSend.queryFilds.valid.split(",");
                    for (String stValid : arValid) {
                        mValid += ", R.id." + stValid;
                    }
                }
                String stRecordId = "";
                if (hh.param_1 != null && hh.param_1.length() > 0) {
                    stRecordId = ", R.id." + hh.param_1;
                }
                res = "send(" + vId + stRecordId + ", model(POST, \"" + parSend.url + "\", \"" + parSend.queryFilds.fields + "\")" 
                        + "\n" + tab20 + stAfter + mValid + ")";
                break;
            case "delete":
                vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                parSend = gson.fromJson(hh.param, ParamSend.class);
//System.out.println("hh.param="+hh.param+"<< parSend="+parSend);
                stAfter = ", after()";
                if (hh.after != null && hh.after.size() > 0) {
                    stAfter = ", after(";
                    String sepAft = "";
                    int ak = hh.after.size();
                    for (int a = 0; a < ak; a++) {
                        stAfter += sepAft + formHandler(hh.after, a, menu, tool, parSave);
                        sepAft = ",\n" + tab20;
                    }
                    stAfter += ")";
                }

                stRecordId = "";
                if (hh.param_1 != null && hh.param_1.length() > 0) {
                    stRecordId = ", R.id." + hh.param_1;
                }
                res = "delete(" + vId + stRecordId + ", model(POST, \"" + parSend.url + "\", \"" + parSend.queryFilds.fields + "\")" 
//                res = "delete(" + vId + stRecordId + ", model(POST, \"" + parSend.url + "\", \"\")" 
                        + "\n" + tab20 + stAfter + ")";
                break;
            case "Clear form fields":
                vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                stRecordId = "";
                if (hh.param_1 != null && hh.param_1.length() > 0) {
                    stRecordId = ", R.id." + hh.param_1;
                }
                res = "handler(" + vId + ", VH.CLEAR_DATA" + stRecordId + ")";
                break;
            case "edit profile":
            case "sign up":
            case "sign in":
                vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                parSend = gson.fromJson(hh.param, ParamSend.class);
                int quInt = 1;
                stAfter = ", after("+ afterAutch + ")";
                switch (hh.handler) {
                    case "sign in":
                        quInt = 1;
                        break;
                    case "sign up":
                        quInt = 2;
                        break;
                    case "edit profile":
                        quInt = 3;
                        stAfter = ", after("+ afterAutchProf + ")";
                        break;
                }
                if (hh.after != null && hh.after.size() > 0) {
                    stAfter = ", after(" + afterAutch;
                    String sepAft = ",\n" + tab20;
                    int ak = hh.after.size();
                    for (int a = 0; a < ak; a++) {
                        stAfter += sepAft + formHandler(hh.after, a, menu, tool, parSave);
                    }
                    stAfter += ")";
                }
                mValid = "";
                en = "false";
                if (hh.check != null && hh.check) {
                    en = "true";
                }
                mValid = ",\n" + tab20 + en;
                if (parSend.queryFilds.valid != null && parSend.queryFilds.valid.length() > 0) {
                    String[] arValid = parSend.queryFilds.valid.split(",");
                    for (String stValid : arValid) {
                        mValid += ", R.id." + stValid;
                    }
                }
                String elRec = "";
                if (hh.param_1 != null && hh.param_1.length() > 0) {
                    elRec = ", R.id." + hh.param_1;
                }
                int iQu = parSend.url.lastIndexOf("/");
                String qu = parSend.url.substring(0, iQu) + "/" + quInt;
                res = "send(" + vId + elRec + ", model(POST, \"" + qu + "\", \"" + parSend.queryFilds.fields + "\")" 
                        + "\n" + tab20 + stAfter + mValid + ")";
                break;
            case "setMenu":
                vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                if (hh.param != null && hh.param.length() > 0) {
                    res = "handler(" + vId + ", VH.SET_MENU_ITEM, " + hh.param.toUpperCase()+ ")";
                }
                break;
            case "set Locale":
                vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                if (hh.param != null && hh.param.length() > 0) {
                    res = "handler(" + vId + ", VH.SET_LOCALE, " + hh.param+ ")";
                } else {
                    res = "handler(" + vId + ", VH.SET_LOCALE)";
                }
                break;
            case "clear form":
                vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                String[] arValid = hh.param_1.split(",");
                mValid = "";
                String sel = "";
                for (String stValid : arValid) {
                    mValid += sel + stValid;
                    sel = ",";
                }
                res = "handler(" + vId + ", VH.CLEAR_FORM, R.id." + hh.id + ", \"" + mValid + "\")";
                break;
            case "delRecord":
                vId = "0";
                if (stId.length() > 0) {
                    vId = stId;
                }
                res = "handler(" + vId + ", VH.DEL_RECORD)";
                break;
            default:
                String par = "";
                if (hh.param != null && hh.param.length() > 0) {
                    par = ", \"" + hh.param + "\"";
                }
                res = hh.handler + "(" + stId + com + parId + par + ")";
        }
        res += evType;
        return res;
    }
    
    private String formMustValid(String listView) {
        String res = ", false";
        String[] arr = listView.split(",");
        int ik = arr.length;
        for (int i = 0; i < ik; i++) {
            res += ", R.id." + arr[i];
        }
        return res;
    }
    
    private String navigatorMenuB(Navigator nav, int ik, ParamSave parSave) {
        String res = "";
        int nk = nav.size();
        for (int i = 0; i < ik; i++) {
            String vId = String.valueOf(i);
            String st = "";
            String sep = "";
            for (int n = 0; n < nk; n++) {
                Handler hh = nav.get(n);
                if (hh.viewId != null && hh.viewId.length() > 0 && hh.viewId.equals(vId)) {
                    st += sep + formHandler(nav, n, true, false, parSave);
                    sep = ",";
                }
            }
            if (st.length() == 0) {
                res += ", null";
            } else {
                res += ",\n" + tab20 + "navigator(" + st + ")";
            }
        }
        return res;
    }
    
    private String navigatorMenuTool(Navigator nav, ParamSave parSave) {
        String res = "";
        int nk = nav.size();
        String st = "";
        String sep = "";
        for (int n = 0; n < nk; n++) {
//            Handler hh = nav.get(n);
            st += sep + formHandler(nav, n, true, true, parSave);
            sep = ",";
        }
        if (st.length() == 0) {
            res += ", null";
        } else {
            res += ",\n" + tab20 + "navigator(" + st + ")";
        }
        return res;
    }
    
    private String formView(Component comp, String name) {
        String span = "";
        if (comp.view.spanC > 1) {
            span = ".spanCount(" + comp.view.spanC + ")";
        }
/*
        String visib = "";
        if (comp.view.visibility != null && comp.view.visibility.length() > 0) {
            visib = ".visibilityManager(";
            String[] arr = comp.view.visibility.split(",");
            String sep = "";
            for (int i = 0; i < arr.length; i++) {
                String aI = arr[i];
                visib += sep + "visibility(R.id." + aI + ",\"" + aI + "\")";
            }
            visib += ")";
        }
*/
        String sel = "";
        if (comp.view.selectedType != null) {
            switch (comp.view.selectedType) {
                case "Param":
                    String vv = comp.view.selectedField;
                    if (comp.view.selectedValue != null && comp.view.selectedValue.length() > 0) {
                        vv = comp.view.selectedField + "=" + comp.view.selectedValue;
                    }
                    sel = ".selected(\"" + vv + "\", TVS.PARAM)";
                    break;
                case "Value":
                    sel = ".selected(\"" + comp.view.selectedField + "\", \"" + comp.view.selectedValue +"\")";
                    break;
                case "Locale":
                    sel = ".selected(\"" + comp.view.selectedField + "\")";
                    break;
                case "Multiple":
                    sel = ".selected(\"" + comp.view.amountSelected + "\")";
                    break;
            }
        }

        String ft = "";
        if (comp.model.fieldType != null && comp.model.fieldType.length() > 0) {
            ft = ", \"" + comp.model.fieldType + "\"";
        }
        DataList data = comp.model.data;
        int ik = data.size();
        String stItems = "";
        if (ik > 1) {
            String sep = ", new int[]{";
            for (int i = 0; i < ik; i++) {
                stItems += sep + "R.layout.item_" + name + "_" + comp.view.viewId + "_" + i;
                sep = ",\n" + tab20;
            }
            stItems += "}";
        } else {
            stItems = ", R.layout.item_" + name + "_" + comp.view.viewId + "_0";
        }
        return "view(R.id." + comp.view.viewId + ft + stItems + ")" + span + sel;
//        return "view(R.id." + comp.view.viewId + ft + stItems + ")" + visib + span + sel;
    }
    
    private String formViewSpinner(Component comp, String name) {
        String vI = comp.view.viewId;
        return "view(R.id." + vI + ", R.layout.item_" + name + "_" + vI + "_drop, R.layout.item_" + name + "_" + vI + "_header)";
    }
    
    private String formViewPager(Component comp, String name, ParamSave parSave) {
        String res = "", arrSt = "";
        List<MenuItem> list = comp.model.menuList.list;
        if (list != null && list.size() > 0) {
            res = tab20 + "new String[] {";
            String sep = "";
            for (MenuItem mi : list) {
                res += sep + mi.screen.toUpperCase();
                arrSt += sep + mi.title;
                sep = ", ";
            }
            res += "})\n";
            res += tab20 + ".setTab(R.id." + comp.view.viewId + ", " + formArrayStringId(arrSt, name + "_" + comp.view.viewId, parSave.arrayString) + ")";
        }
        return res;
    }
    
    private String dravableFromUrl(String url) {
//        if (url == null) return "R.drawable.NULL";
        if (url == null) return "0";
        int i = url.lastIndexOf(".");
        int j = url.lastIndexOf("/") + 1;
        String res = "R.drawable." + url.substring(j, i);
        return res;
    }
    
    private String dravableFromName(String url) {
        if (url == null) return "NULL";
        int i = url.lastIndexOf(".");
        int j = url.lastIndexOf("/") + 1;
        return url.substring(j, i);
    }
    
    private String nameFromUrl(String url) {
        int i = url.lastIndexOf(".");
        int j = url.lastIndexOf("/") + 1;
        String res = url.substring(j, i);
        return res;
    }
    
    private String formStringId(String scr, String vievId, String name, String value, List<ItemResurces> listString) {
        if (name != null && name.length() > 0) {
            String vId;
            if (vievId == null || vievId.length() == 0) {
                vId = String.valueOf(listString.size());
            } else {
                vId = vievId;
            }
            String nameTit = scr + "_" + vId+ "_" + name;
            return formStringId(nameTit, value, listString);
        }
        return "";
    }
    
    private String formArrayStringId(String arr, String name, List<String> arrString) {
        String[] arrSt = arr.split(", ");
        arrString.add(tab4 + "<string-array name=\"" + name + "\">\n");
        for (String st : arrSt) {
            arrString.add(tab8 + "<item>" + st + "</item>\n");
        }
        arrString.add(tab4 + "</string-array>\n");
        return "R.array." + name;
    }
    
    private String formStringId(String name, String value, List<ItemResurces> listString) {
        ItemResurces iRes = new ItemResurces();
        iRes.itemName = name;
        iRes.itemValue = value;
        listString.add(iRes);
        return "R.string." + name;
    }
    
    private String formStringXML(String name, String value, List<ItemResurces> listString) {
        ItemResurces iRes = new ItemResurces();
        iRes.itemName = name;
        iRes.itemValue = value;
        listString.add(iRes);
        return "@string/" + name;
    }
    
    public String firstUpperCase(String word){
        if(word == null || word.isEmpty()) return "";//или return word;
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    }
    
    private void writeToZip(InputStream in, OutputStream out) throws IOException {
        byte[] buffer = new byte[1024];
        int len;
        while ((len = in.read(buffer)) >= 0)
            out.write(buffer, 0, len);
        in.close();
    }
    
    private void setColorAlpha(ProjectM projectM) {
        ListItemResurces colors = gson.fromJson(projectM.colors, ListItemResurces.class);
        for (ItemResurces ir : colors) {
            if (ir.itemValue.length() > 7) {
                String a = ir.itemValue.substring(7);
                if (a.equals("ff")) {
                    ir.itemValue = ir.itemValue.substring(0, 7);
                } else {
                    ir.itemValue = "#" + a + ir.itemValue.substring(1, 7);
                }
            }
        }
    }

    private void createLayout(String resPath, ParamSave parSave) {
        String path = resPath + "/layout";
        formDir(path);
        parSave.sreens.forEach((screen) -> {
            createLayout(screen, path, parSave);
        });
    }
    
    private void createLayout(Screen screen, String path, ParamSave parSave) {
        try {
            if (screen.layout != null) {
                parSave.typeScreen = screen.typeScreen;
                String type_screen = "activity_";
                if (screen.typeScreen == 1) {
                    type_screen = "fragment_";
                }
                parSave.currentScreen = screen.screenName;
                parSave.currentScreenObj = screen;
                parSave.toolId = "";
                parSave.menuId = "";
                parSave.scrollId = "";
                parSave.pathLayoutItem = path + "/item_" + screen.screenName.toLowerCase() + "_";
                parSave.path = path;
//                try (FileWriter writer = new FileWriter(path + "/" + type_screen + screen.screenName.toLowerCase() + ".xml", false)) {
                try ( BufferedWriter writer = new BufferedWriter(new OutputStreamWriter( new FileOutputStream(path + "/" + type_screen + screen.screenName.toLowerCase() + ".xml"), "UTF8"))) {
                    writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
                    parSave.noToolMenu = false;
                    createEl(screen.layout, true, "\n", writer, parSave, null);
                    writer.flush();
                    writer.close();
                }
            }
        } catch(IOException ex){
            System.out.println("ExportResult createLayout error=" + ex);
        } catch (JsonSyntaxException ex) {
            System.out.println("ExportResult createLayout JsonSyntaxException=" + ex);
        }
    }
    
    private void createEl(AndroidPar elScreen, boolean first, String tab0, BufferedWriter writer, ParamSave parSave, List<AndroidPar> parent) {
        parSave.countStr = 0;
        String typeEl = createOneElement(elScreen, first, tab0, writer, parSave, parent);
        String tab = tab0 + "    ";
        try {
            int ik;
            switch (elScreen.type) {
                case Constants.LIST:
                case Constants.INTRO:
                    writer.write(tab0 + "/>");
                    ik = elScreen.children.size();
                    if (ik == 0) {
                        createItemLayoutBlank(parSave.pathLayoutItem + elScreen.viewId + "_0.xml", parSave);
                    } else {
                        for (int i = 0; i < ik; i++) {
                            createItemLayout(elScreen.children.get(i), parSave.pathLayoutItem + elScreen.viewId + "_" + i + ".xml", parSave, elScreen.children);
                        }
                    }
                    break;
                case Constants.SPINNER:
                    if (elScreen.typeUxUi.equals("ui")) {
                        break;
                    }
                    writer.write(tab0 + "/>");
                    ik = elScreen.children.size();
                    if (ik == 0) {
                        createItemLayoutBlank(parSave.pathLayoutItem + elScreen.viewId + "_0.xml", parSave);
                    } else {
                        for (int i = 0; i < ik; i++) {
                            String hd;
                            if (i == 0) {
                                hd = "_header";
                            } else {
                                hd = "_drop";
                            }
                            createItemLayout(elScreen.children.get(i), parSave.pathLayoutItem + elScreen.viewId + hd+ ".xml", parSave, elScreen.children);
                        }
                    }
                    break;
                case Constants.SHEET:
                    writer.write(tab0 + "/>");
                    ik = elScreen.children.size();
                    if (ik == 0) {
                        createItemLayoutBlank(parSave.path + "/view_" + parSave.currentScreen.toLowerCase() + "_" + elScreen.viewId + ".xml", parSave);
                    } else {
                        for (int i = 0; i < ik; i++) {
                            createItemLayout(elScreen.children.get(i), parSave.path + "/view_" + parSave.currentScreen.toLowerCase() + "_" + elScreen.viewId + ".xml", parSave, elScreen.children);
                        }
                    }
                    break;

                case Constants.TAGS:
                    writer.write(tab0 + "/>");
                    ik = elScreen.children.size();
                    if (ik == 0) {
                        createItemLayoutBlank(parSave.pathLayoutItem + elScreen.viewId + "_0.xml", parSave);
                    } else {
                        for (int i = 0; i < ik; i++) {
                            createItemLayout(elScreen.children.get(i), parSave.pathLayoutItem + elScreen.viewId + "_" + i + ".xml", parSave, elScreen.children);
                        }
                    }
                    break;

                default :
                    if (elScreen.children != null && elScreen.children.size() > 0) {
                        writer.write(tab0 + ">");
                        if (parSave.typeScreen == 0 && first) {
                            ik = elScreen.children.size();
                            for (int i = 0; i < ik; i++) {
                                AndroidPar ap = elScreen.children.get(i);
                                if (ap.type.equals(Constants.DRAWER)) {
                                    ListComponent lc = parSave.currentScreenObj.components;
                                    int jk = lc.size();
                                    Component comp = null;
                                    for (int j = 0; j < jk; j++) {
                                        Component c = lc.get(j);
                                        if (c.type.equals(Constants.DRAWER) ) {
                                            comp = c;
                                            break;
                                        }
                                    }
                                    if (comp != null) {
                                        AndroidPar apTool = null, apMenu = null;
                                        for (int j = 0; j < ik; j++) {
                                            AndroidPar apJ = elScreen.children.get(j);
                                            if (apJ.type.equals(Constants.TOOL)) {
                                                apTool = apJ;
                                            } else {
                                                if (apJ.type.equals(Constants.MENU_B)) {
                                                    apMenu = apJ;
                                                }
                                            }
                                        }
                                        if ((comp.view.toolInDrawer != null && comp.view.toolInDrawer) ||
                                                (comp.view.menubInDrawer != null && comp.view.menubInDrawer)) {
                                            createDrawer(ap, apTool, apMenu, tab0, writer, parSave, elScreen.children);
                                            parSave.noToolMenu = true;
                                            parSave.noDrawer = true;
                                            parSave.noFragmContainer = true;
                                        } else {
                                            createDrawer(ap, tab0, writer, parSave);
                                            parSave.noFragmContainer = true;
                                            parSave.noDrawer = true;
                                        }
                                    }
                                    break;
                                }
                            }
                        }

                        if (typeEl.equals(Constants.SCROLLPANEL) || typeEl.equals(Constants.SCROLLFORM)) {
                            AndroidPar srollChild = elScreen.children.get(0);
                            srollChild = srollChild.children.get(0);
                            srollChild.viewId = elScreen.viewId;
                            createEl(srollChild, false, tab, writer, parSave, null);
                        } else {
                            elScreen.children.forEach((es) -> {
                                createEl(es, false, tab, writer, parSave, elScreen.children);
                            });
                        }
                        if (parSave.typeScreen == 0 && first) {
                            if (parSave.menuId.length() > 0) {
                                createFragmentContainer(writer, parSave);
                            }
                        }
                        writer.write(tab0 + "</" + typeEl + ">");
                    } else {
                        if (typeEl.length() > 0) {
                            if (elScreen.type.equals(Constants.EDITTEXT) && elScreen.componParam != null && elScreen.componParam.bool_1 != null && elScreen.componParam.bool_1) {
                                writer.write("/>");
                                writer.write(tab + "</" + Constants.InputLayout + ">\n");
                            } else {
                                writer.write(tab + "/>\n");
                            }
                        }
                    }
            }
        } catch (IOException ex) {
            System.out.println("ExportResult createLayout element error=" + ex);
        }
    }
    
    private void createFragmentContainer(BufferedWriter writer, ParamSave parSave) {
        if (parSave.noFragmContainer) return;
        try {
            writer.write("\n" + tab4 + "<FrameLayout\n");
            writer.write(tab8 + "android:id=\"@+id/container_fragm\"\n");
            writer.write(tab8 + "android:layout_width=\"match_parent\"\n");
            writer.write(tab8 + "android:layout_height=\"match_parent\"\n");
            if (parSave.menuId != null && parSave.menuId.length() > 0) {
                writer.write(tab8 + "android:layout_above=\"@id/" + parSave.menuId + "\"\n");
            }
            if (parSave.toolId != null && parSave.toolId.length() > 0) {
                writer.write(tab8 + "android:layout_below=\"@id/" + parSave.toolId + "\"\n");
            }
            writer.write(tab4 + "/>\n");
        } catch (IOException ex) {
            Logger.getLogger(ExportResult.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void createItemLayout(AndroidPar p, String path, ParamSave parSave, List<AndroidPar> parent) {
        try ( BufferedWriter writer = new BufferedWriter(new OutputStreamWriter( new FileOutputStream(path), "UTF8"))) {    
            writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
            createEl(p, true, "\n", writer, parSave, parent);
            writer.flush();
            writer.close();
        } catch(IOException ex){
            System.out.println("ExportResult createItemLayout error=" + ex);
        } 
    }
    
    private void createItemLayoutBlank(String path, ParamSave parSave) {
        try ( BufferedWriter writer = new BufferedWriter(new OutputStreamWriter( new FileOutputStream(path), "UTF8"))) {    
                writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
                writer.write("\n<RelativeLayout");
                writer.write("\n    xmlns:android=\"http://schemas.android.com/apk/res/android\"");
                writer.write("\n    android:layout_width=\"match_parent\"");
                writer.write("\n    android:layout_height=\"100dp\">");
                writer.write("\n</RelativeLayout>");
                writer.flush();
                writer.close();
        } catch(IOException ex){
            System.out.println("ExportResult createItemLayoutBlank error=" + ex);
        } 
    }
    
    private void createDrawer(AndroidPar elScreen, AndroidPar tool, AndroidPar men, String tab0, BufferedWriter writer, ParamSave parSave, List<AndroidPar> parent) {
        String tab1 = tab0 + "    ", tab2 = tab1 + "    ", tab3 = tab2 + "    ";
        try {
            writer.write(tab0 + "<" + Constants.componType[6]);
            writer.write(tab1 + "android:id=\"@+id/" + elScreen.viewId + "\"");
            writer.write(tab1 + "android:layout_width=\"match_parent\"");
            writer.write(tab1 + "android:layout_height=\"match_parent\">");
            
            writer.write(tab1 + "<RelativeLayout");
            writer.write(tab2 + "android:layout_width=\"match_parent\"");
            writer.write(tab2 + "android:layout_height=\"match_parent\">");
            if (tool != null) {
                createOneElement(tool, false, tab2, writer, parSave, parent);
                writer.write(tab3 + "/>");
            }
            if (men != null) {
                createOneElement(men, false, tab2, writer, parSave, parent);
                writer.write(tab3 + "/>");
            }
            
            writer.write(tab2 + "<FrameLayout");
            writer.write(tab3 + "android:id=\"@+id/container_fragm\"");
            writer.write(tab3 + "android:layout_width=\"match_parent\"");
            writer.write(tab3 + "android:layout_height=\"match_parent\"");
            if (men != null) {
                writer.write(tab3 + "android:layout_above=\"@id/" + parSave.menuId + "\"");
            }
            if (tool != null) {
                writer.write(tab3 + "android:layout_below=\"@id/" + parSave.toolId + "\"");
            }
            writer.write(tab3 + "/>");
            
            writer.write(tab2 + "</RelativeLayout>");
            
            writer.write(tab1 + "<FrameLayout");
            writer.write(tab2 + "android:id=\"@+id/left_drawer\"");
            writer.write(tab2 + "android:layout_width=\"340dp\"");
            writer.write(tab2 + "android:layout_height=\"match_parent\"");
            writer.write(tab2 + "android:background=\"#ffffff\"");
            writer.write(tab2 + "android:layout_gravity=\"start\"/>");
            
            writer.write(tab1 + "</" + Constants.componType[6] + ">");
            
        } catch (IOException ex) {
            Logger.getLogger(ExportResult.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private void createDrawer(AndroidPar p, String tab0, BufferedWriter writer, ParamSave parSave) {
        String tab1 = tab0 + "    ", tab2 = tab1 + "    ", tab3 = tab2 + "    ";
        try {
            writer.write(tab0 + "<" + Constants.componType[6]);
            writer.write(tab1 + "android:id=\"@+id/" + p.viewId + "\"");
            writer.write(tab1 + "android:layout_width=\"match_parent\"");
            if (p.below != null && p.below.length() > 0) {
                writer.write(tab1 + "android:layout_below=\"@id/" + p.below + "\"");
            }

            if (p.above != null && p.above.length() > 0) {
                writer.write(tab1 + "android:layout_above=\"@id/" + p.above + "\"");
            }

            writer.write(tab1 + "android:layout_height=\"match_parent\">");
           
            writer.write(tab1 + "<FrameLayout");
            writer.write(tab2 + "android:id=\"@+id/container_fragm\"");
            writer.write(tab2 + "android:layout_width=\"match_parent\"");
            writer.write(tab2 + "android:layout_height=\"match_parent\"/>");

            
            writer.write(tab1 + "<FrameLayout");
            writer.write(tab2 + "android:id=\"@+id/left_drawer\"");
            writer.write(tab2 + "android:layout_width=\"340dp\"");
            writer.write(tab2 + "android:layout_height=\"match_parent\"");
            writer.write(tab2 + "android:background=\"#ffffff\"");
            writer.write(tab2 + "android:layout_gravity=\"start\"/>");
            
            writer.write(tab1 + "</" + Constants.componType[6] + ">");
            
        } catch (IOException ex) {
            Logger.getLogger(ExportResult.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private String createOneElement(AndroidPar p, boolean first, String tab0, BufferedWriter writer, ParamSave parSave, List<AndroidPar> parent) {
        boolean isInputLayout = false;
        String typeEl = p.type;
        if ((parSave.noToolMenu && (typeEl.equals(Constants.TOOL) || typeEl.equals(Constants.MENU_B)) || 
                (parSave.noDrawer && typeEl.equals(Constants.DRAWER)))) {
            return "";
        }
        if (p.type.equals(Constants.SWIPE)) {
            if (p.width == 0) {
                return "";
            }
        }
        if (p.componParam != null && p.componParam.type != null) {
            typeEl = Constants.componType[p.componParam.type];
        }

        switch (p.type) {
            case Constants.TEXTVIEW:
                if (p.componParam != null) { 
                    if (p.componParam.acceptNotif != null && p.componParam.acceptNotif.length() > 0) {
                        typeEl = Constants.TextCompon;
                    }
                    if (p.componParam.format != null && ! p.componParam.format.equals("no")) {
                        typeEl = Constants.TextCompon;
                    }
                    if (p.componParam.typeValidTV != null && ! p.componParam.typeValidTV.equals("no")) {
                        typeEl = Constants.TextValid;
                    }
                    if (p.componParam.grammar != null && p.componParam.grammar.length() > 0) {
                        typeEl = Constants.TextGrammar;
                    }
                }
                break;
            case Constants.EDITTEXT:
                if (p.componParam != null) {
                    if (p.componParam.bool_1 != null && p.componParam.bool_1) {
                        typeEl = Constants.InputLayout;
                        isInputLayout = true;
                    } else {
                        if (p.componParam.st_13 != null && p.componParam.st_13.length() > 0) {
                            typeEl = Constants.EditMask;
                        } else {
                            typeEl = Constants.EditCompon;
                        }
                    }
                }
                break;
            case Constants.TOOL:
                parSave.toolId = p.viewId;
                break;
            case Constants.SWIPE_LAYOUT:
                List<AndroidPar> child = p.children;
                if (child != null) {
                    int ik = child.size();
                    AndroidPar pp;
                    boolean noSw = true;
                    for (int i = 0; i < ik; i++) {
                        pp = child.get(i);
                        if (pp.viewId.equals("sw_l")) {
                            if (pp.width > 0) {
                                noSw = false;
                            }
                        } else if (pp.viewId.equals("sw_r")) {
                            if (pp.width > 0) {
                                noSw = false;
                            }
                        }
                    }
                    if (noSw) {
                        typeEl = "RelativeLayout";
                    }
                }
                break;
            case Constants.MENU_B:
                parSave.menuId = p.viewId;
                break;
            case Constants.CARD_VIEW:
                typeEl = Constants.cardViewType;
                break;
            case Constants.IMAGEVIEW:
                typeEl = Constants.componImage;
                break;
        }
        try {
            writer.write(tab0 + "<" + typeEl);
            String tab = tab0 + "    ";

            if (first) {
                writer.write(tab + "xmlns:android=\"http://schemas.android.com/apk/res/android\"");
                writer.write(tab + "xmlns:app=\"http://schemas.android.com/apk/res-auto\"");
            }

            if (p.viewId != null && p.viewId.length() > 0) {
                if (typeEl.equals(Constants.SCROLLPANEL) || typeEl.equals(Constants.SCROLLFORM)) {
                    parSave.scrollId = p.viewId;
                } else {
                    if (isInputLayout) {
                        writer.write(tab + "android:id=\"@+id/" + Constants.txtInp + p.viewId + "\"");
                        if (p.width == Constants.MATCH) {
                            writer.write(tab + "android:layout_width=\"match_parent\"");
                        } else {
                            writer.write(tab + "android:layout_width=\"wrap_content\"");
                        }
                        if (p.height == Constants.MATCH) {
                            writer.write(tab + "android:layout_height=\"match_parent\"");
                        } else {
                            writer.write(tab + "android:layout_height=\"wrap_content\"");
                        }
                    } else {
                        writer.write(tab + "android:id=\"@+id/" + p.viewId + "\"");
                    }
                }
            }
            
            if ( ! first) {
                if (p.gravLayout.h == Constants.CENTER && p.gravLayout.v == Constants.CENTER) {
                    writer.write(tab + "android:layout_centerInParent=\"true\"");
                } else {
                    switch(p.gravLayout.h) {
                        case Constants.LEFT:
                            writer.write(tab + "android:layout_alignParentLeft=\"true\"");
                            break;
                        case Constants.RIGHT:
                            writer.write(tab + "android:layout_alignParentRight=\"true\"");
                            break;
                        case Constants.CENTER:
                            writer.write(tab + "android:layout_centerHorizontal=\"true\"");
                            break;
                        case Constants.ABSOLUTE:
                            if (p.left != null && p.left != 0) {
                                writer.write(tab + "android:layout_marginLeft=\"" + dimens(p.left) + "\"");
                            }
                            break;
                    }
                    switch(p.gravLayout.v) {
                        case Constants.TOP:
                            if (p.below == null || p.below.length() == 0) {
                                writer.write(tab + "android:layout_alignParentTop=\"true\"");
                            }
                            break;
                        case Constants.BOTTOM:
                            if (p.above == null || p.above.length() == 0) {
                                writer.write(tab + "android:layout_alignParentBottom=\"true\"");
                            }
                            break;
                        case Constants.CENTER:
                            writer.write(tab + "android:layout_centerVertical=\"true\"");
                            break;
                        case Constants.ABSOLUTE:
                            if (p.top != null) {
                                writer.write(tab + "android:layout_marginTop=\"" + dimens(p.top) + "\"");
                            }
                            break;
                    }
                }
            }
            if ( ! first) {
                if (p.toLeftOf != null && p.toLeftOf.length() > 0) {
                    writer.write(tab + "android:layout_toLeftOf=\"@id/" + getTxtInpt(p.toLeftOf, parent) + p.toLeftOf + "\"");
                }

                if (p.toRightOf != null && p.toRightOf.length() > 0) {
                    writer.write(tab + "android:layout_toRightOf=\"@id/" + getTxtInpt(p.toRightOf, parent) + p.toRightOf + "\"");
                }

                if (p.below != null && p.below.length() > 0) {
                    writer.write(tab + "android:layout_below=\"@id/" + getTxtInpt(p.below, parent) + p.below + "\"");
                }
                if (p.above != null && p.above.length() > 0) {
                    writer.write(tab + "android:layout_above=\"@id/" + getTxtInpt(p.above, parent) + p.above + "\"");
                }
            }
            if (p.margin != null && p.margin.length() > 0 && ! p.margin.equals("0")) {
                writer.write(tab + "android:layout_margin=\"" + dimens(p.margin) + "\"");
            }
            if (p.leftMarg != null && p.leftMarg.length() != 0 && ! p.leftMarg.equals("0")) {
                writer.write(tab + "android:layout_marginLeft=\"" + dimens(p.leftMarg) + "\"");
            }
            if (p.topMarg != null && p.topMarg.length() > 0 && ! p.topMarg.equals("0")) {
                writer.write(tab + "android:layout_marginTop=\"" + dimens(p.topMarg) + "\"");
            }
            if (p.rightMarg != null && p.rightMarg.length() > 0 && ! p.rightMarg.equals("0")) {
                writer.write(tab + "android:layout_marginRight=\"" + dimens(p.rightMarg) + "\"");
            }
            if (p.bottomMarg != null && p.bottomMarg.length() > 0 && ! p.bottomMarg.equals("0")) {
                writer.write(tab + "android:layout_marginBottom=\"" + dimens(p.bottomMarg) + "\"");
            }
            if (p.visibility != null && ! p.visibility) {
                writer.write(tab + "android:visibility=\"gone\"");
            }
            
            if (isInputLayout) {
                if (p.componParam.color_2 == null) {
                    p.componParam.color_2 = 21;
                }
                String styleTxtInpt = "txtInpt_12_" + p.componParam.color_2;
                parSave.styleTxtInpt.add(styleTxtInpt);
                writer.write(tab + "app:hintTextAppearance=\"@style/" + styleTxtInpt + "\"");
                writer.write(">");
                String tab_1 = tab + "    ";
                if (p.componParam.st_13 != null && p.componParam.st_13.length() > 0) {
                    writer.write(tab + "<" + Constants.EditMask);
                } else {
                    writer.write(tab + "<" + Constants.EditCompon);
                }
                tab += "    ";
                writer.write(tab + "android:id=\"@+id/" + p.viewId + "\"");

            }
            
            String w, h;
            if (p.width == Constants.MATCH) {
                w = "match_parent";
            } else if (p.width == Constants.WRAP) {
                w = "wrap_content";
            } else {
                w = dimens(p.width);
            }
            writer.write(tab + "android:layout_width=\"" + w + "\"");
            if (p.height == Constants.MATCH) {
                h = "match_parent";
            } else if (p.height == Constants.WRAP) {
                h = "wrap_content";
            } else {
                h = dimens(p.height);
            }
            writer.write(tab + "android:layout_height=\"" + h + "\"");
            
            if (p.orientataion != null && p.orientataion.length() > 0) {
                writer.write(tab + "android:orientation=\"" + p.orientataion + "\"");
            }
            if (typeEl.indexOf("Sheet") > -1) {
                if (p.background != null && p.background != 17) {
                    writer.write(tab + "app:fadedScreenColor=\""+ findColorByIndex(p.background, parSave.colors) + "\"");
                }
            } else {
                if (p.background != null && p.background >= 0) {
                    if (p.background > 999) {
                        if (p.background > 1999) {      // Selector
                            
                            if (p.background == 100000) {
                                String stSRC = p.src;
                                int ii = stSRC.lastIndexOf(".");
                                int jj = stSRC.lastIndexOf("/");
                                stSRC = stSRC.substring(jj + 1, ii);
                                writer.write(tab + "android:background=\"@drawable/"+ stSRC + "\"");
                            }
                        } else {        // Drawable
                            writer.write(tab + "android:background=\"@drawable/"+findDrawableByIndex(p.background, parSave.drawable) + "\"");
                        }
                    } else {
                        writer.write(tab + "android:background=\""+ findColorByIndex(p.background, parSave.colors) + "\"");
                    }
                } else {
                }
            }

            if (p.gravity != null) {
                if (p.gravity.h == Constants.CENTER && p.gravity.v == Constants.CENTER) {
                    writer.write(tab + "android:gravity=\"center\"");
                } else {
                    String gV = "";
                    String gH = "";
                    String grav = "";
                    switch(p.gravity.h) {
                        case Constants.LEFT:
                            gH = "left";
                            break;
                        case Constants.RIGHT:
                            gH = "right";
                            break;
                        case Constants.CENTER:
                            gH = "center_horizontal";
                            break;
                    }
                    switch(p.gravity.v) {
                        case Constants.TOP:
                            gV = "top";
                            break;
                        case Constants.BOTTOM:
                            gV = "bottom";
                            break;
                        case Constants.CENTER:
                            gV = "center_vertical";
                            break;
                    }
                    if (gV.length() > 0) {
                        if (gH.length() > 0) {
                            grav = gV + "|" + gH;
                        } else {
                            grav = gV;
                        }
                    } else {
                        if (gH.length() > 0) {
                            grav = gH;
                        }
                    }
                    if (grav.length() > 0) {
                        writer.write(tab + "android:gravity=\"" + grav + "\"");
                    }
                }
            }
       
            if (p.padding != null && p.padding.length() > 0 && ! p.padding.equals("0")) {
                writer.write(tab + "android:padding=\"" + dimens(p.padding) + "\"");
            }
            if (p.leftPad != null && p.leftPad.length() > 0 && ! p.leftPad.equals("0")) {
                writer.write(tab + "android:paddingLeft=\"" + dimens(p.leftPad) + "\"");
            }
            if (p.topPad != null && p.topPad.length() > 0 && ! p.topPad.equals("0")) {
                writer.write(tab + "android:paddingTop=\"" + dimens(p.topPad) + "\"");
            }
            if (p.rightPad != null && p.rightPad.length() > 0 && ! p.rightPad.equals("0")) {
                writer.write(tab + "android:paddingRight=\"" + dimens(p.rightPad) + "\"");
            }
            if (p.bottomPad != null && p.bottomPad.length() > 0 && ! p.bottomPad.equals("0")) {
                writer.write(tab + "android:paddingBottom=\"" + dimens(p.bottomPad) + "\"");
            }
            
            
            if (p.text != null && p.text.length() > 0) {
                if (p.formResourse != null && p.formResourse) {
                    String vId;
                    if (p.viewId == null || p.viewId.length() == 0) {
                        vId = String.valueOf(parSave.countStr);
                        parSave.countStr ++;
                    } else {
                        vId = p.viewId;
                    }
                    String nn = parSave.currentScreen + "_" + vId + "_txt";
                    formStringId(nn, p.text, parSave.listString);
                    parSave.countStr ++;
                    writer.write(tab + "android:text=\"@string/" + nn + "\"");
                }
            }

            if (p.textSize != null) {
                switch (p.type) {
                    case Constants.TOOL:
                        break;
                    case Constants.EDITTEXT:
                        if (p.textSize != 18) {
                            writer.write(tab + "android:textSize=\"" + dimens(p.textSize) + "\"");
                        }
                        break;
                    case Constants.TEXTVIEW:
                        if (p.textSize != 16) {
                            writer.write(tab + "android:textSize=\"" + dimens(p.textSize) + "\"");
                        }
                        break;
                    default:
                        if (p.textSize != 14) {
                            writer.write(tab + "android:textSize=\"" + dimens(p.textSize) + "\"");
                        }
                        break;
                }
            }
            if (p.textColor != null && p.textColor >= 0) {
                switch (p.type) {
                    case Constants.TOOL:
                        break;
                    default:
                        if (p.textColor != 12) {
                            writer.write(tab + "android:textColor=\"" + findColorByIndex(p.textColor, parSave.colors) + "\"");
                        }
                        break;
                }
            }

            if (p.src != null && p.src.length() > 0) {
                if (p.formResourse != null && p.formResourse) {
                    writer.write(tab + "android:src=\"@drawable/" + dravableFromName(p.src) + "\"");
                }
            }
            if (p.scaleType != null) {
                int iS = p.scaleType;
                if (iS >= Constants.scaleType.length) {
                    iS = Constants.scaleType.length - 1;
                }
                writer.write(tab + "android:scaleType=\"" + Constants.scaleType[iS] + "\"");
            }
            
            if (p.alias != null && p.alias.length() > 0 && ! isInputLayout) {
                writer.write(tab + "app:alias=\"" + p.alias + "\"");
            }
            
            switch (p.type) {

                case Constants.TOOL:
                    if ((p.textColor != null && p.textColor >= 0) || p.textSize != null) {
                        int size = 0;
                        if (p.textSize != null) {
                            size = p.textSize;
                        }
                        int color = 0;
                        if (p.textColor != null && p.textColor >= 0) {
                            color = p.textColor;
                        }
                        String styleTool = "toolStyle_" + size + "_" + color;
                        parSave.styleTxtInpt.add(styleTool);
                        writer.write(tab + "app:titleTextAppearance=\"@style/" + styleTool + "\"");
                    }
                    break;

                case Constants.IMAGEVIEW:
                    Corners pc = p.corners;
                    if (p.componParam != null && p.componParam.oval != null && p.componParam.oval) {
                        writer.write(tab + "app:oval=\"true\"");
                    } else {
                        if (pc != null) {
                            int lt = 0, tr = 0, rb = 0, bl = 0;
                            if (pc.lt.length() > 0) {
                                lt = Integer.valueOf(pc.lt);
                            }
                            if (pc.tr.length() > 0) {
                                tr = Integer.valueOf(pc.tr);
                            }
                            if (pc.rb.length() > 0) {
                                rb = Integer.valueOf(pc.rb);
                            }
                            if (pc.bl.length() > 0) {
                                bl = Integer.valueOf(pc.bl);
                            }
                            if (lt == tr && lt == rb && lt == bl) {
                                if (lt > 0) {
                                    writer.write(tab + "app:corners=\"" + lt + "dp\"");
                                }
                            } else {
                                if (lt > 0) {
                                    writer.write(tab + "app:corner_lt=\"" + lt + "dp\"");
                                }
                                if (tr > 0) {
                                    writer.write(tab + "app:corner_rt=\"" + tr + "dp\"");
                                }
                                if (rb > 0) {
                                    writer.write(tab + "app:corner_rb=\"" + rb + "dp\"");
                                }
                                if (bl > 0) {
                                    writer.write(tab + "app:corner_lb=\"" + bl + "dp\"");
                                }
                            }
                        }
                    }
                    if (p.componParam != null) {
                        if (p.componParam.w_bord != null && p.componParam.w_bord > 0 && p.componParam.borderColor != null) {
                            writer.write(tab + "app:riv_border_width=\"" + p.componParam.w_bord + "dp\"");
                            writer.write(tab + "app:riv_border_color=\"" + findColorByIndex(p.componParam.borderColor, parSave.colors) + "\"");
                        }
                        if (p.componParam.int_0 != null && p.componParam.int_0 > 0) {
                            writer.write(tab + "app:blur=\"" + p.componParam.int_0 + "\"");
                        }
                        String st_pl = p.componParam.st_1;
                        if (st_pl != null && st_pl.length() > 0) {
                            int ii = st_pl.lastIndexOf("/");
                            String namP = st_pl.substring(ii + 1);
                            writer.write(tab + "app:placeholder=\"@drawable/" + namP.substring(0, namP.indexOf('.')) + "\"");
                        }
                    }
                    break;
                case Constants.TEXTVIEW:
                    if (p.componParam != null) {
                        if (p.componParam.typeValidTV != null && ! p.componParam.typeValidTV.equals("no")) {
                            writer.write(tab + "app:typeValidate=\"" + p.componParam.typeValidTV + "\"");
                            if (p.componParam.errorId != null && p.componParam.errorId.length() > 0) {
                                writer.write(tab + "app:idError=\"@id/" + p.componParam.errorId + "\"");
                            }
                            if (p.componParam.errorTxt != null && p.componParam.errorTxt.length() > 0) {
                                writer.write(tab + "app:textError=\"" + p.componParam.errorTxt + "\"");
                            }
                        }
                        if (p.componParam.acceptNotif != null && p.componParam.acceptNotif.length() > 0) {
                            writer.write(tab + "app:acceptNotif=\"" + p.componParam.acceptNotif + "\"");
                        }
                        String format = p.componParam.format;
                        if (format != null && format.length() > 0 && ! p.componParam.format.equals("no")) {
                            if (Character.isDigit(format.charAt(0))) {
                                writer.write(tab + "app:numberFormat=\"" + format + "\"");
                            } else {
                                writer.write(tab + "app:dateFormat=\"" + format + "\"");
                            }
                        }
                        if (p.componParam.grammar != null && p.componParam.grammar.length() > 0) {
                            String namId = p.viewId;
                            if (namId == null) {
                                namId = "";
                            }
                            String nameStrId = parSave.currentScreen + namId + "grammar";
                            formStringId(nameStrId, p.componParam.grammar, parSave.listString);
                            writer.write(tab + "app:stringArray=\"@string/" + nameStrId + "\"");
                            if (p.componParam.spaceZero != null && p.componParam.spaceZero) {
                                writer.write(tab + "app:zeroNotView=\"true\"");
                            }
                        }
                        if (p.componParam.ellipsize != null && ! p.componParam.ellipsize.equals("none")) {
                            writer.write(tab + "android:ellipsize=\"" + p.componParam.ellipsize + "\"");
                            writer.write(tab + "android:maxLines=\"1\"");
                            writer.write(tab + "android:singleLine=\"true\"");
                        } else {
                            if (p.componParam.singleLine != null && p.componParam.singleLine) {
                                writer.write(tab + "android:singleLine=\"true\"");
                            }
                            if (p.componParam.maxLine != null && p.componParam.maxLine > 0) {
                                writer.write(tab + "android:maxLines=\"" + p.componParam.maxLine + "\"");
                            }
                        }
                    }
                    break;
                case Constants.EDITTEXT:
                    if (isInputLayout) {
                        
                    } else {
                        if (p.componParam.errorId != null && p.componParam.errorId.length() > 0) {
                            writer.write(tab + "app:idError=\"@id/" + p.componParam.errorId + "\"");
                        }
                    }
                    if (p.componParam.bool_2 == null) {
                        p.componParam.bool_2 = true;
                    }
                    if ( ! p.componParam.bool_2) {
                        writer.write(tab + "android:background=\"#0000\"");
                    }
                    if (p.componParam.color_1 != null && p.componParam.color_1 != 3) {
                        String styleEdit = "editStyle_21_" + p.componParam.color_1;
                        parSave.styleTxtInpt.add(styleEdit);
                        writer.write(tab + "android:theme=\"@style/" + styleEdit + "\"");
                    }
                    if (p.componParam.st_1 != null) {
//                        writer.write(tab + "android:hint=\"" + p.componParam.st_1 + "\"");
                        String vId;
                        if (p.viewId == null || p.viewId.length() == 0) {
                            vId = String.valueOf(parSave.countStr);
                            parSave.countStr ++;
                        } else {
                            vId = p.viewId;
                        }
                        String nn = parSave.currentScreen + "_" + vId + "_hint";
                        formStringId(nn, p.componParam.st_1, parSave.listString);
                        parSave.countStr ++;
                        writer.write(tab + "android:hint=\"@string/" + nn + "\"");
                    }
                    boolean noInputType = true;
                    if (p.componParam.st_3 == null) {
                        writer.write(tab + "android:imeOptions=\"actionNext\"");
                    } else {
                        if ( ! p.componParam.st_3.equals("none")) {
                            writer.write(tab + "android:imeOptions=\"" + p.componParam.st_3 + "\"");
                        }
                    }
                    if (p.componParam.st_4 != null && p.componParam.st_4.length() > 0) {
                        writer.write(tab + "android:maxLength=\"" + p.componParam.st_4 + "\"");
                    }
                    if (p.componParam.errorTxt != null && p.componParam.errorTxt.length() > 0) {
                        writer.write(tab + "app:textError=\"" + formStringXML(parSave.currentScreen + "_" + p.viewId + "_error", p.componParam.errorTxt, parSave.listString) + "\"");
                    }
                    boolean noRestrict = true;
                    if (p.componParam.st_13 != null && p.componParam.st_13.length() > 0) {
                        writer.write(tab + "app:mask=\"" + p.componParam.st_13 + "\"");
                        writer.write(tab + "android:maxLines=\"1\"");
                        writer.write(tab + "android:inputType=\"phone\"");
                        noInputType = false;
                        noRestrict = false;
                    }
                    if (p.componParam.bool_4 != null && p.componParam.bool_4 && noRestrict) {
                        writer.write(tab + "app:typeValidate=\"email\"");
                        writer.write(tab + "android:maxLines=\"1\"");
//                        writer.write(tab + "android:inputType=\"textEmailAddress\"");
//                        noInputType = false;
                        noRestrict = false;
                    }
                    if (p.componParam.bool_5 != null && p.componParam.bool_5 && noRestrict) {
                        writer.write(tab + "app:isPassword=\"true\"");
                        if (p.componParam.st_9 != null && p.componParam.st_9.length() > 0) {
                            writer.write(tab + "app:validPassword=\"" + p.componParam.st_9 + "\"");
                        }
/*
                        if (p.componParam.st_10 != null && p.componParam.st_10.length() > 0) {
                            writer.write(tab + "app:idShowPassword=\"@id/" + p.componParam.st_10 + "\"");
                        }
                        if (p.componParam.st_11 != null && p.componParam.st_11.length() > 0) {
                            writer.write(tab + "app:idHidePassword=\"@id/" + p.componParam.st_11 + "\"");
                        }
*/
                        if (p.componParam.st_10 != null && p.componParam.st_10.length() > 0) {
                            writer.write(tab + "app:idShowImg=\"@drawable/" + nameFromUrl(p.componParam.st_10) + "\"");
                        }
                        if (p.componParam.st_11 != null && p.componParam.st_11.length() > 0) {
                            writer.write(tab + "app:idHideImg=\"@drawable/" + nameFromUrl(p.componParam.st_11) + "\"");
                        }
                        if (p.componParam.st_12 != null && p.componParam.st_12.length() > 0) {
                            writer.write(tab + "app:equalsId=\"@id/" + p.componParam.st_12 + "\"");
                        }
                        writer.write(tab + "android:maxLines=\"1\"");
                        noRestrict = false;
                    }
                    if (p.componParam.st_6 != null && p.componParam.st_6.length() > 0) {
                        writer.write(tab + "app:minLength=\"" + p.componParam.st_6 + "\"");
                    }
                    if (noInputType) {
                        if (p.componParam.st_2 != null && p.componParam.st_2.length() > 0 && ! p.componParam.st_2.equals("none")) {
                            writer.write(tab + "android:inputType=\"" + p.componParam.st_2.replace(",", "|") + "\"");
                        }
                    }
/*
                    if (noInputType) {
                        if (p.componParam.st_2 == null) {
                            writer.write(tab + "android:inputType=\"text\"");
                        } else {
                            if ( ! p.componParam.st_2.equals("none")) {
                                writer.write(tab + "android:inputType=\"" + p.componParam.st_2 + "\"");
                            }
                        }
                    }
*/
                    if (noRestrict) {
                        if (p.componParam.lines != null && p.componParam.lines > 1) {
                            writer.write(tab + "android:lines=\"" + p.componParam.lines + "\"");
                        } 
/*
                        else {
                            if (p.componParam.maxLine != null && p.componParam.maxLine > 1) {
                                writer.write(tab + "android:maxLines=\"" + p.componParam.maxLine + "\"");
                            }
                        }
*/
                        if (p.componParam.maxLine != null && p.componParam.maxLine > 0) {
                            writer.write(tab + "android:maxLines=\"" + p.componParam.maxLine + "\"");
                        }
                        if (p.componParam.st_5 != null && p.componParam.st_5.length() > 0) {
                            writer.write(tab + "app:fieldLength=\"" + p.componParam.st_5 + "\"");
                            noRestrict = false;
                        }
                        if (p.componParam.st_7 != null && p.componParam.st_7.length() > 0) {
                            writer.write(tab + "app:minValue=\"" + p.componParam.st_7 + "\"");
                        }
                        if (p.componParam.st_8 != null && p.componParam.st_8.length() > 0) {
                            writer.write(tab + "app:maxValue=\"" + p.componParam.st_8 + "\"");
                        }
                    }
                    if (p.componParam.bool_3 != null && p.componParam.bool_3 && noRestrict) {
                        writer.write(tab + "app:typeValidate=\"filled\"");
                        noRestrict = false;
                    }

                    break;
                    
                case Constants.CALENDAR:
                    if (p.componParam.heightMonth != null) {
                        writer.write(tab + "app:heightMonth=\"" + p.componParam.heightMonth + "dp\"");
                    }
                    if (p.componParam.heightCell != null) {
                        writer.write(tab + "app:heightCell=\"" + p.componParam.heightCell + "dp\"");
                    }
                    if (p.componParam.monthSize != null) {
                        writer.write(tab + "app:monthSize=\"" + p.componParam.monthSize + "sp\"");
                    }
                    if (p.componParam.textDaySize != null) {
                        writer.write(tab + "app:textDaySize=\"" + p.componParam.textDaySize + "sp\"");
                    }
                    if (p.componParam.tintDiam != null) {
                        writer.write(tab + "app:selectTintDiam=\"" + p.componParam.tintDiam + "dp\"");
                    }
                    if (p.componParam.countAfterMonth != null && p.componParam.countAfterMonth > 0) {
                        writer.write(tab + "app:countAfterMonth=\"" + p.componParam.countAfterMonth + "\"");
                    }
                    if (p.componParam.countBeforeMonth != null && p.componParam.countBeforeMonth > 0) {
                        writer.write(tab + "app:countBeforeMonth=\"" + p.componParam.countBeforeMonth + "\"");
                    }
                    if (p.componParam.workDayColor != null) {
                        writer.write(tab + "app:workDayColor=\"" + findColorByIndex(p.componParam.workDayColor, parSave.colors) + "\"");
                    }
                    if (p.componParam.selectTintColor != null) {
                        writer.write(tab + "app:selectTintColor=\"" + findColorByIndex(p.componParam.selectTintColor, parSave.colors) + "\"");
                    }
                    if (p.componParam.selectTextColor != null) {
                        writer.write(tab + "app:selectTextColor=\"" + findColorByIndex(p.componParam.selectTextColor, parSave.colors) + "\"");
                    }
                    if (p.componParam.isHolidays != null && p.componParam.isHolidays) {
                        if (p.componParam.holidaysColor != null && p.componParam.holidaysColor != 6) {
                            writer.write(tab + "app:noWorkDayColor=\"" + findColorByIndex(p.componParam.holidaysColor, parSave.colors) + "\"");
                        }
                    }
                    if (p.componParam.sendNotif != null && p.componParam.sendNotif.length() > 0) {
                        writer.write(tab + "app:sendNotif=\"" + p.componParam.sendNotif + "\"");
                    }
                    if (p.componParam.dateFormat != null && p.componParam.dateFormat.length() > 0) {
                        writer.write(tab + "app:dateFormat=\"" + p.componParam.dateFormat + "\"");
                    }
                    if (p.componParam.saveParam != null && p.componParam.saveParam.length() > 0) {
                        writer.write(tab + "app:saveParam=\"" + p.componParam.saveParam + "\"");
                    }
                    if (p.componParam.rangeDate != null && p.componParam.rangeDate) {
                        writer.write(tab + "app:rangeDate=\"" + p.componParam.rangeDate + "\"");
                    }
                    if (p.componParam.afterToday != null && p.componParam.afterToday) {
                        writer.write(tab + "app:afterToday=\"" + p.componParam.afterToday + "\"");
                    }
                    if (p.componParam.tillToday != null && p.componParam.tillToday) {
                        writer.write(tab + "app:tillToday=\"" + p.componParam.tillToday + "\"");
                    }
                    if (p.componParam.nameMonth != null && p.componParam.nameMonth.length() > 0) {
                        String namId = p.viewId;
                        if (namId == null) {
                            namId = "";
                        }
                        String nameStrId = parSave.currentScreen + namId + "calendar";
                        formStringId(nameStrId, p.componParam.nameMonth, parSave.listString);
                        writer.write(tab + "app:nameMonth=\"@string/" + nameStrId + "\"");
                    }
                    break;
                case Constants.SEEKBAR:
                    SeekBarParam sbp = p.seekBarParam;
                    if (sbp != null) {
                        if (sbp.barHeight != null) {
                            writer.write(tab + "app:barHeight=\"" + sbp.barHeight + "dp\"");
                        }
                        if (sbp.betweenColor != null) {
                            writer.write(tab + "app:betweenColor=\"" + findColorByIndex(sbp.betweenColor, parSave.colors) + "\"");
                        }
                        if (sbp.tumbColor != null) {
                            if (sbp.tumbColor == 100000) {
                                writer.write(tab + "app:thumbImg=\"@drawable/" + nameFromUrl(p.src) + "\"");
                            } else {
                                writer.write(tab + "app:thumbColor=\"" + findColorByIndex(sbp.tumbColor, parSave.colors) + "\"");
                            }
                        }
                        if (sbp.range != null && ! sbp.range) {
                            writer.write(tab + "app:singleThumb=\"true\"");
                        }
                        if (p.componParam.background != null && p.componParam.background > 999) {
                            writer.write(tab + "app:barDrawable=\"@drawable/shape_" + p.componParam.background + "\"");
                        } else {
                            writer.write(tab + "app:barColor=\"" + findColorByIndex(p.componParam.background, parSave.colors) + "\"");
                        }
                        writer.write(tab + "app:minValueSeek=\"" + sbp.minV + "\"");
                        writer.write(tab + "app:maxValueSeek=\"" + sbp.maxV + "\"");
                        writer.write(tab + "app:minStartValue=\"" + sbp.minInit + "\"");
                        writer.write(tab + "app:maxStartValue=\"" + sbp.maxInit + "\"");
                        if (sbp.sliderId != null) {
                            writer.write(tab + "app:sliderViewInfo=\"@id/" + sbp.sliderId + "\"");
                        }
                        if (sbp.sendNotif != null && sbp.sendNotif.length() > 0) {
                            writer.write(tab + "app:sendNotif=\"" + sbp.sendNotif + "\"");
                        }
                        if (p.componParam.saveParam != null && p.componParam.saveParam.length() > 0) {
                            writer.write(tab + "app:saveParam=\"" + p.componParam.saveParam + "\"");
                        }
                        
                        if (p.componParam.st_2 != null && p.componParam.st_2.length() > 0) {
                            writer.write(tab + "app:saveParamMin=\"" + p.componParam.st_2 + "\"");
                        }
                        if (p.componParam.st_3 != null && p.componParam.st_3.length() > 0) {
                            writer.write(tab + "app:saveParamMax=\"" + p.componParam.st_3 + "\"");
                        }
                        if (p.componParam.st_4 != null && p.componParam.st_4.length() > 0) {
                            writer.write(tab + "app:showMinMaxValue=\"@id/" + p.componParam.st_4 + "\"");
                        }
                        if (p.componParam.st_5 != null && p.componParam.st_5.length() > 0) {
                            writer.write(tab + "app:showMinValue=\"@id/" + p.componParam.st_5 + "\"");
                        }
                        if (p.componParam.st_6 != null && p.componParam.st_6.length() > 0) {
                            writer.write(tab + "app:showMaxValue=\"@id/" + p.componParam.st_6 + "\"");
                        }
                    }
                    break;
                case Constants.TAB:
                    TabLayout tl = p.tabLayout;
                    if (tl.indColor != null) {
                        writer.write(tab + "app:tabIndicatorColor=\"" + findColorByIndex(tl.indColor, parSave.colors) + "\"");
                    }
                    if (tl.indHeight != null) {
                        writer.write(tab + "app:tabIndicatorHeight=\"" + tl.indHeight + "dp\"");
                    }
                    if (tl.textSelect != null) {
                        writer.write(tab + "app:tabSelectedTextColor=\"" + findColorByIndex(tl.textSelect, parSave.colors) + "\"");
                    }
                    if (tl.textColor != null) {
                        writer.write(tab + "app:tabTextColor=\"" + findColorByIndex(tl.textColor, parSave.colors) + "\"");
                    }
                    break;
                case Constants.GALLERY:
                    if (p.componParam != null) {
                        if (p.componParam.bindEl != null) {
                            writer.write(tab + "app:indicator=\"@id/" + p.componParam.bindEl + "\"");
                        }
                    }
                    break;
                case Constants.INDICATOR:
                    if (p.componParam != null) {
                        if (p.componParam.diam != null) {
                            writer.write(tab + "app:diametrItem=\"" + p.componParam.diam + "dp\"");
                        }
                        if (p.componParam.colorNorm != null) {
                            writer.write(tab + "app:colorNorm=\"" + findColorByIndex(p.componParam.colorNorm, parSave.colors) + "\"");
                        }
                        if (p.componParam.colorSel != null) {
                            writer.write(tab + "app:colorSelect=\"" + findColorByIndex(p.componParam.colorSel, parSave.colors) + "\"");
                        }
                    }
                    break;
                case Constants.SWITCH:
                    SwitchParam cp = getItemSwitch(p.int_1, parSave.switchSpec);
                    if (cp != null) {
                        if (p.st_1 != null && p.st_1.length() > 0) {
                            writer.write(tab + "android:text=\"" + p.st_1 + "\"");
                        }
                        if (cp.color_1 != null && cp.color_1 != 12) {
                            writer.write(tab + "android:textColor=\"" + findColorByIndex(cp.color_1, parSave.colors) + "\"");
                        }
                        String sepStyle = "";
                        String styleSw = "";
                        if (cp.int_1 != null && cp.int_1 == 1) {
                            styleSw = "bold";
                            sepStyle = "|";
                        }
                        if (cp.int_2 != null && cp.int_2 == 1) {
                            styleSw += sepStyle + "italic";
                        }
                        if (styleSw.length() > 0) {
                            writer.write(tab + "android:textStyle=\"" + styleSw + "\"");
                        }
                        if (cp.int_3 != null && cp.int_3 != 14) {
                            writer.write(tab + "android:textSize=\"" + cp.int_3 + "sp\"");
                        }
                        if (cp.st_2 != null && ! cp.st_2.equals("center")) {
                            writer.write(tab + "android:gravity=\"" + cp.st_2 + "\"");
                        }
                        if (p.st_3 != null && p.st_3.equals("On")) {
                            writer.write(tab + "android:checked=\"true\"");
                        }
                        if (p.bool_1 != null && ! p.bool_1) {
                            writer.write(tab + "android:enabled=\"false\"");
                        }
                        writer.write(tab + "android:thumb=\"@drawable/switch_thumb_" + p.int_1 + "\"");
                        writer.write(tab + "app:track=\"@drawable/switch_track_" + p.int_1 + "\"");
                    }
                    break;
                case Constants.CHECKBOX:
                    cp = getItemSwitch(p.int_1, parSave.styleCheck);
                    if (cp != null) {
                        if (p.st_1 != null && p.st_1.length() > 0) {
                            writer.write(tab + "android:text=\"" + p.st_1 + "\"");
                        }
                        if (cp.color_1 != null && cp.color_1 != 12) {
                            writer.write(tab + "android:textColor=\"" + findColorByIndex(cp.color_1, parSave.colors) + "\"");
                        }
                        String sepStyle = "";
                        String styleSw = "";
                        if (cp.int_1 != null && cp.int_1 == 1) {
                            styleSw = "bold";
                            sepStyle = "|";
                        }
                        if (cp.int_2 != null && cp.int_2 == 1) {
                            styleSw += sepStyle + "italic";
                        }
                        if (styleSw.length() > 0) {
                            writer.write(tab + "android:textStyle=\"" + styleSw + "\"");
                        }
                        if (cp.int_3 != null && cp.int_3 != 14) {
                            writer.write(tab + "android:textSize=\"" + cp.int_3 + "sp\"");
                        }
                        if (cp.bool_1 != null && cp.bool_1) {
                            writer.write(tab + "android:layoutDirection=\"rtl\"");
                        }
                        
                        
                        String gravV = "", gravH = "", gravRes = "";
                        if (cp.st_2 != null) {
                            switch (cp.st_2) {
                                case "center":
                                    gravV = "center_vertical";
                                    break;
                                case "bottom":
                                    gravV = "bottom";
                                    break;
                            }
                        }
                        if (cp.st_3 != null) {
                            switch (cp.st_3) {
                                case "center":
                                    gravH = "center_horizontal";
                                    break;
                                case "right":
                                    gravH = "right";
                                    break;
                            }
                        }
                        String sepGr = "";
                        if (gravV.length() > 0 && gravH.length() > 0) {
                            sepGr = "|";
                        }
                        gravRes = gravV + sepGr + gravH;
                        
                        if (gravRes.length() > 0) {
                            writer.write(tab + "android:gravity=\"" + gravRes + "\"");
                        }
                        
                        if (p.st_3 != null && p.st_3.equals("On")) {
                            writer.write(tab + "android:checked=\"true\"");
                        }
                        if (p.bool_1 != null && ! p.bool_1) {
                            writer.write(tab + "android:enabled=\"false\"");
                        }
                        if (cp.color_2 != null || cp.color_3 != null) {
                            writer.write(tab + "android:theme=\"@style/check_style_" + p.int_1 + "\"");
                        }
                    }
                    break;
                case Constants.ELLIPSIS:
                    if (p.componParam != null) {
                        if (p.componParam.orient != null && p.componParam.orient.equals("vertical")) {
                            writer.write(tab + "android:orientation=\"vertical\"");
                        }
                        if (p.componParam.diam != null) {
                            writer.write(tab + "app:diametrDot=\"" + p.componParam.diam + "dp\"");
                        }
                        if (p.componParam.colorNorm != null) {
                            writer.write(tab + "app:colorDot=\"" + findColorByIndex(p.componParam.colorNorm, parSave.colors) + "\"");
                        }
                        if (p.componParam.amountDots != null) {
                            writer.write(tab + "app:amountDots=\"" + p.componParam.amountDots + "\"");
                        }
                    }
                    break;
                case Constants.RATINGS:
                    if (p.componParam != null) {
                        if (p.componParam.diam != null) {
                            writer.write(tab + "app:widthStar=\"" + p.componParam.diam + "dp\"");
                        }
                        if (p.componParam.srcContour != null) {
                            writer.write(tab + "app:star=\"@drawable/" + nameFromUrl(p.componParam.srcContour) + "\"");
                        }
                        if (p.componParam.srcFilled != null) {
                            writer.write(tab + "app:starFilled=\"@drawable/" + nameFromUrl(p.componParam.srcFilled) + "\"");
                        }
                        if (p.componParam.amountDots != null) {
                            writer.write(tab + "app:amountStars=\"" + p.componParam.amountDots + "\"");
                        }
                    }
                    break;
                case Constants.MAP:
                    writer.write(tab + "class=\"com.google.android.gms.maps.SupportMapFragment\"");
                    break;
                case Constants.SHEET:
                    if (p.children != null && p.children.size() > 0) {
                        AndroidPar ap = p.children.get(0);
                        if (ap != null && ap.height == Constants.MATCH) {
                            writer.write(tab + "app:viewMatch=\"true\"");
                        }
                    }
                    if (p.sheetParam != null) {
                        if (p.componParam.bool_1) {
                            writer.write(tab + "app:noSwipeHide=\"true\"");
                        }
                        if (p.componParam.bool_2) {
                            writer.write(tab + "app:noBackPressedHide=\"true\"");
                        }
                        if (p.componParam.color_1 != null && p.componParam.color_1 != 17) {
                            writer.write(tab + "app:fadedScreenColor=\"" + findColorByIndex(p.componParam.color_1, parSave.colors) + "\"");
                        }
                    }
                    writer.write(tab + "app:viewId=\"@layout/view_" + parSave.currentScreen.toLowerCase() + "_" + p.viewId + "\"");
                    break;
                case Constants.MENU_B:
                    ColorSet cs = p.colorSet;
                    if (cs.textColor != 3) {
                        writer.write(tab + "app:normColor=\"" + findColorByIndex(cs.textColor, parSave.colors) + "\"");
                    }
                    writer.write(tab + "app:selectColor=\"" + findColorByIndex(cs.textSelect, parSave.colors) + "\"");
                    if ( ! cs.toAnimate) {
                        writer.write(tab + "app:toAnimate=\"false\"");
                    }
                    if ( ! cs.changeColor) {
                        writer.write(tab + "app:noSelImgChangeColor=\"true\"");
                    }
                    if (cs.location != null && ( ! cs.location.equals("top"))) {
                        writer.write(tab + "app:imageLocale=\"" + cs.location + "\"");
                    }
                    if (cs.background != null && cs.background.length() > 0) {
                        writer.write(tab + "app:selectBackground=\"@drawable/shape_" + cs.background + "\"");
                    }
                    break;
                case Constants.MENU:
                    if (p.componParam != null) {
                        if (p.componParam.colorNorm != 0) {
                            writer.write(tab + "app:normColor=\"" + findColorByIndex(p.componParam.colorNorm, parSave.colors) + "\"");
                        }
                        if (p.componParam.colorSel != 1) {
                            writer.write(tab + "app:selectColor=\"" + findColorByIndex(p.componParam.colorSel, parSave.colors) + "\"");
                        }
                        if (p.componParam.colorEnab != 7) {
                            writer.write(tab + "app:enablColor=\"" + findColorByIndex(p.componParam.colorEnab, parSave.colors) + "\"");
                        }
                        if (p.componParam.colorBadge != 3) {
                            writer.write(tab + "app:badgeColor=\"" + findColorByIndex(p.componParam.colorBadge, parSave.colors) + "\"");
                        }
                        if (p.componParam.colorDivider != 7) {
                            writer.write(tab + "app:dividerColor=\"" + findColorByIndex(p.componParam.colorDivider, parSave.colors) + "\"");
                        }
                    }
                    break;
                case Constants.CARD_VIEW:
                    if (p.radiusCard > 0) {
                        writer.write(tab + "app:cardCornerRadius=\"" + p.radiusCard + "dp\"");
                    }
                    if (p.elevCardShadow != null && p.elevCardShadow.length() > 0) {
                        writer.write(tab + "app:cardElevation=\"" + Integer.valueOf(p.elevCardShadow) + "dp\"");
                    }
                    break;
                case Constants.SPINNER:
                    if (p.typeUxUi.equals("ui")) {
                        if (p.componParam.st_1 != null && p.componParam.st_1.length() > 0) {
                            writer.write(tab + "app:listItems=\"" + p.componParam.st_1.replaceAll("\n", "") + "\"");
                        }
                        if (p.componParam.st_2 != null && p.componParam.st_2.length() > 0) {
                            writer.write(tab + "app:imageId=\"@drawable/" + nameFromUrl(p.componParam.st_2) + "\"");
                        }
                        writer.write(tab0 + "/>");
                    }
                    break;
                case Constants.PLUS_MINUS:
                    if (p.componParam != null) {
                        if (p.componParam.noEdit != null && p.componParam.noEdit) {
                            writer.write(tab + "app:noEdit=\"true\"");
                        }
                        if (p.componParam.maxV != null) {
                            writer.write(tab + "app:maxValue=\"" + p.componParam.maxV + "\"");
                        }
                        if (p.componParam.minV != null) {
                            writer.write(tab + "app:minValue=\"" + p.componParam.minV + "\"");
                        }
                        if (p.componParam.resultId != null && p.componParam.resultId.length() > 0) {
                            writer.write(tab + "app:viewMirror=\"@id/" + p.componParam.resultId + "\"");
                        }
                    }
                    break;
                case Constants.SWIPE_LAYOUT:
                    List<AndroidPar> child = p.children;
                    if (child != null) {
                        int ik = child.size();
                        AndroidPar pp;
                        boolean isSw = false;
                        for (int i = 0; i < ik; i++) {
                            pp = child.get(i);
                            if (pp.viewId.equals("sw_l")) {
                                if (pp.width > 0) {
                                    writer.write(tab + "app:swipeLeftViewId=\"@id/sw_l\"");
                                    isSw = true;
                                }
                            } else if (pp.viewId.equals("sw_r")) {
                                if (pp.width > 0) {
                                    writer.write(tab + "app:swipeRightViewId=\"@id/sw_r\"");
                                    isSw = true;
                                }
                            }
                        }
                        if (isSw) {
                            writer.write(tab + "app:swipeViewId=\"@id/T_0\"");
                        }
                    }
                    break;
            }
            if (p.componParam != null) {
                if (p.componParam.formatTime != null) {
                    writer.write(tab + "app:dateFormat=\"" + p.componParam.formatTime + "\"");
                }
                if (p.componParam.formatNum != null) {
                    writer.write(tab + "app:numberFormat=\"" + p.componParam.formatNum + "\"");
                }
            }
        } catch (IOException ex) {
            System.out.println("ExportResult createOneElement error=" + ex);
        }
        return typeEl;
    }
    
    private String getTxtInpt(String id, List<AndroidPar> parent) {
        if (id == null || id.length() == 0) {
            return "";
        }
        if (parent != null) {
            for (AndroidPar ap : parent) {
                if (ap.viewId != null && ap.viewId.length() > 0) {
                    if (ap.viewId.equals(id) && ap.type.equals(Constants.EDITTEXT)) {
                        if (ap.componParam != null && ap.componParam.bool_1 != null && ap.componParam.bool_1) {
                            return Constants.txtInp;
                        } else {
                            return "";
                        }
                    }
                }
            }
        }
        return "";
    }

    private String dimens(int d) {
        for (int i : Constants.standartDimens) {
            if (d == i) {
                return "@dimen/dim_" + d;
            }
        }
        return d + "dp";
    }
    
    private SwitchParam getItemSwitch(int ind, ListSwitchParam lsp) {
        int ik = lsp.size();
        for (int i = 0; i < ik; i++) {
            ItemSwitch item = lsp.get(i);
            if (item.id == ind) {
                item.isInLayouts = true;
                return item.param;
            }
        }
        return null;
    }
    
    private String dimens(String d) {
        return dimens(Integer.valueOf(d));
    }

    private String findColorByIndex(int colorInd, ListItemResurces colors) {
        for (ItemResurces ir : colors) {
            if (ir.itemId == colorInd) {
                if (ir.itemName != null && ir.itemName.length() > 0) {
                    return "@color/" + ir.itemName;
                } else {
                    return colorAndroid(ir.itemValue);
                }
            }
        }
        return "";
    }
    
    private String findColorResourse(int colorInd, ListItemResurces colors) {
        for (ItemResurces ir : colors) {
            if (ir.itemId == colorInd) {
                if (ir.itemName != null && ir.itemName.length() > 0) {
                    return "R.color." + ir.itemName;
                } else {
                    return ir.itemValue;
                }
            }
        }
        return "";
    }
    
    private String findDrawableByIndex(int ind, ListItemResurces drawable) {
        for (ItemResurces ir : drawable) {
            if (ir.itemId == ind) {
                return ir.itemName;
            }
        }
        return "";
    }

    private void createValue(String resPath, ParamSave parSave) {
        String path = resPath + "/values";
        formDir(path);
        createColors(path, parSave);
        createDimens(path);
        createStrings(path, parSave);
        createStyles(path, parSave);
        if (parSave.lang != null) {
            ListLang ll = parSave.lang.listLangStr;
            int ik = ll.size();
            for (int i = 0; i < ik; i++) {
                ItemLang item = ll.get(i);
                String path_1 = resPath + "/values-" + item.codeLang;
                formDir(path_1);
                createLangStr(path_1, item.listString);
            }
        }
    }
    
    private void addPushPermishen(String pathIn, ParamSave parSave) {
        if (parSave.havePush) {
            return;
        }
        try {
            FileReader reader = new FileReader(pathIn);
            Scanner scan = new Scanner(reader);
            while (scan.hasNextLine()) {
                String line = scan.nextLine();
                parSave.addApp.add(line + "\n");
            }
            reader.close();
            parSave.addPermish.add("<uses-permission android:name=\"com.google.android.providers.gsf.permission.READ_GSERVICES\"/>");
            parSave.havePush = true;
        } catch (IOException ex) {
            System.out.println("addPushPermishen error=" + ex);
        }
    }
    
    private void addCameraPermishen(String pathIn, ParamSave parSave) {
        if (parSave.isCamera) {
            return;
        }
        try {
            FileReader reader = new FileReader(pathIn);
            Scanner scan = new Scanner(reader);
            while (scan.hasNextLine()) {
                String line = scan.nextLine();
                parSave.addApp.add(line + "\n");
            }
            reader.close();
            parSave.addPermish.add("<uses-permission android:name=\"android.permission.CAMERA\"/>");
            parSave.addPermish.add("<uses-permission android:name=\"android.permission.WRITE_EXTERNAL_STORAGE\" />");
            parSave.addPermish.add("<uses-permission android:name=\"com.google.android.providers.gsf.permission.READ_GSERVICES\"/>");
            parSave.isCamera = true;
        } catch (IOException ex) {
            System.out.println("addCameraPermishen error=" + ex);
        }
    }
    
    public void setGradleAndroid(String pathIn, String pathOut, ItemChange[] arCh, ParamSave parSave) {
        try {
            FileReader reader = new FileReader(pathIn);
            FileWriter writer = new FileWriter(pathOut, false);
            Scanner scan = new Scanner(reader);
            while (scan.hasNextLine()) {
                String line = scan.nextLine();
                int i = line.indexOf("#");
                if (i < 0) {
                    writer.write(line + "\n");
                } else {
                    int i1 = line.indexOf("#", i + 1);
                    String par = line.substring(i, i1 + 1);
                    switch (par) {
                        case "#add_impl#":
                            for (String st : parSave.addImplement) {
                                writer.write(tab4 + st);
                            }
                            writer.write("\n");
                            break;
                        case "#add_plagin#":
                            for (String st : parSave.plaginGradle) {
                                writer.write(tab4 + st + "\n");
                            }
//                            writer.write("\n");
                            break;
                        case "#add_classpath#":
                            for (String st : parSave.addClassPath) {
                                writer.write(tab4 + st + "\n");
                            }
//                            writer.write("\n");
                            break;
                        default:
                            for (ItemChange ic : arCh) {
                                if (ic.name.equals(par)) {
                                    writer.write(line.replace(ic.name, ic.value) + "\n");
                                    break;
                                }
                            }
                    }

                }
            }
            writer.flush();
            writer.close();
            reader.close();
        } catch (IOException ex) {
            System.out.println("setGradleAndroid error=" + ex);
        }
    }
    
    public void setManifestAndroid(String pathIn, String pathOut, ItemChange[] arCh, ParamSave parSave) {
        try {
            FileReader reader = new FileReader(pathIn);
            FileWriter writer = new FileWriter(pathOut, false);
            Scanner scan = new Scanner(reader);
            while (scan.hasNextLine()) {
                String line = scan.nextLine();
                int i = line.indexOf("#");
                if (i < 0) {
                    writer.write(line + "\n");
                } else {
                    int i1 = line.indexOf("#", i + 1);
                    String par = line.substring(i, i1 + 1);
                    switch (par) {
                        case "#add_app#":
                            for (String st : parSave.addApp) {
                                writer.write(st);
                            }
                            writer.write("\n");
                            break;
                        case "#add_permish#":
                            for (String st : parSave.addPermish) {
                                writer.write("\n" + tab4 + st);
                            }
                            writer.write("\n");
                            break;
                        default:
                            for (ItemChange ic : arCh) {
                                if (ic.name.equals(par)) {
                                    writer.write(line.replace(ic.name, ic.value) + "\n");
                                    break;
                                }
                            }
                    }

                }
            }
            writer.flush();
            writer.close();
            reader.close();
        } catch (IOException ex) {
            System.out.println("setManifestAndroid error=" + ex);
        }
    }
    
    private void createColors(String path, ParamSave parSave) {
        if (parSave.colors != null && parSave.colors.size() > 0) {
            try {
                FileWriter writer = new FileWriter(path + "/colors.xml", false);
                writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
                writer.write("<resources>\n");
                for (ItemResurces ir : parSave.colors) {
                    if (ir.itemName != null && ir.itemName.length() > 0) {
                        writer.write("    <color name=\"" + ir.itemName + "\">" + colorAndroid(ir.itemValue) + "</color>\n");
                    }
                }
                writer.write("</resources>");
                writer.flush();
                writer.close();
            } catch (IOException ex) {
                System.out.println("ExportResult createColors error=" + ex);
            }
        }
    }
    
    private String colorAndroid(String js) {
        String col = js;
        String colIt = col;
        if (col.length() == 5) {
            colIt = "#" + col.substring(4) + col.substring(1, 4);
        } else {
            if (col.length() == 9) {
                String alf = col.substring(7);
                if ("ff".equals(alf)) {
                    colIt = "#" + col.substring(1, 7);
                } else {
                    colIt = "#" + col.substring(7) + col.substring(1, 7);
                }
            }
        }
        return colIt;
    }
    
    private void createStyles(String path, ParamSave parSave) {
        try {
            FileWriter writer = new FileWriter(path + "/styles.xml", false);
            writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
            writer.write("<resources>\n");
            if (parSave.styles != null && parSave.styles.size() > 0) {
                for (ItemStyle is : parSave.styles) {
                    if (is.listItem.size() > 0);
                    ItemResurces ir1 = is.listItem.get(0);
                    String par = "";
                    if (ir1.itemName.equals("parent")) {
                        par = " parent=\"" + ir1.itemValue + "\"";
                    }
                    writer.write("<style name=\"" + is.styleName + "\"" + par + ">\n");
                    for (ItemResurces ir : is.listItem) {
                        if ( ! ir.itemName.equals("parent")) {
                            writer.write("    <item name=\"" + ir.itemName + "\">" + ir.itemValue + "</item>\n");
                        }
                    }
                    writer.write("    </style>\n");
                }
            }
            ListSwitchParam lsp = parSave.styleCheck;
            if (lsp != null) {
                int ik = lsp.size();
                for (int i = 0; i < ik; i++) {
                    ItemSwitch item = lsp.get(i);
                    if (item.isInLayouts) {
                        SwitchParam sp = item.param;
                        writer.write("<style name=\"check_style_" + item.id + "\">\n");
                        if (sp.color_2 != null) {
                            writer.write("    <item name=\"colorControlNormal\">" + findColorByIndex(sp.color_2, parSave.colors) + "</item>\n");
                        }
                        if (sp.color_3 != null && sp.color_3 != 3) {
                            writer.write("    <item name=\"colorControlActivated\">" + findColorByIndex(sp.color_3, parSave.colors) + "</item>\n");
                        }
                        writer.write("    </style>\n");
                    }
                }
            }
//System.out.println("parSave.styleTxtInpt="+parSave.styleTxtInpt+"<<");
            Set<String> stInpt = parSave.styleTxtInpt;
            int color;
            for (String stT : stInpt) {
//System.out.println("   stT="+stT+"<<");
                writer.write("    <style name=\"" + stT + "\">\n");
                String[] arSt = stT.split("_");
                switch (arSt[0]) {
                    case "toolStyle":
                        String size = arSt[1];
                        color = Integer.valueOf(arSt[2]);
                        writer.write("        <item name=\"android:textSize\">" + size + "sp</item>\n");
                        writer.write("        <item name=\"android:textColor\">" + findColorByIndex(color, parSave.colors) + "</item>\n");
                        break;
                    case "editStyle":
                        int colorNorm = Integer.valueOf(arSt[1]);
                        color = Integer.valueOf(arSt[2]);
                        writer.write("        <item name=\"colorControlNormal\">" + findColorByIndex(colorNorm, parSave.colors) + "</item>\n");
                        writer.write("        <item name=\"colorControlActivated\">" + findColorByIndex(color, parSave.colors) + "</item>\n");
                        break;
                    case "txtInpt":
                        size = arSt[1];
                        color = Integer.valueOf(arSt[2]);
                        writer.write("        <item name=\"android:textSize\">" + size + "sp</item>\n");
                        writer.write("        <item name=\"android:textColor\">" + findColorByIndex(color, parSave.colors) + "</item>\n");
/*
                        if ( ! size.equals("12")) {
                            writer.write("        <item name=\"android:textSize\">" + size + "</item>\n");
                        }
                        if ( color != 21) {
                            writer.write("        <item name=\"android:textColor\">" + findColorByIndex(color, parSave.colors) + "</item>\n");
                        }
*/
                        break;
                }
                writer.write("    </style>\n");
            }
            writer.write("</resources>");
            writer.flush();
            writer.close();
        } catch (IOException ex) {
            System.out.println("ExportResult createDimens error=" + ex);
        }
    }
    
    private void createStrings(String path, ParamSave parSave) {
        try {
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter( new FileOutputStream(path + "/strings.xml"), "UTF8"));
            writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
            writer.write("<resources>\n");
            if (parSave.strings != null && parSave.strings.size() > 0) {
                for (ItemResurces ir : parSave.strings) {
                    if (ir.itemName != null && ir.itemName.length() > 0) {
                        writer.write("    <string name=\"" + ir.itemName + "\">" + ir.itemValue + "</string>\n");
                    }
                }
            }
            List<ItemResurces> listString = parSave.getListString();
            if (listString.size() > 0) {
                int sk = listString.size();
                if (sk > 0) {
                    for (int s = 0; s < sk; s++) {
                        ItemResurces ir = listString.get(s);
                        writer.write("    <string name=\"" + ir.itemName + "\">" + ir.itemValue + "</string>\n");
                    }
                }
            }
            if (parSave.arrayString != null  && parSave.arrayString.size() > 0) {
                for (String st : parSave.arrayString) {
                     writer.write(st);
                }
            }
            writer.write("</resources>");
            writer.flush();
            writer.close();
        } catch (IOException ex) {
            System.out.println("ExportResult createDimens error=" + ex);
        }
    }
    
    private void createLangStr(String path, ListResources lr) {
        try {
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter( new FileOutputStream(path + "/strings.xml"), "UTF8"));
            writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
            writer.write("<resources>\n");
            if (lr.size() > 0) {
                int sk = lr.size();
                if (sk > 0) {
                    for (int s = 0; s < sk; s++) {
                        ItemResurces ir = lr.get(s);
                        writer.write("    <string name=\"" + ir.itemName + "\">" + ir.itemValue + "</string>\n");
                    }
                }
            }
            writer.write("</resources>");
            writer.flush();
            writer.close();
        } catch (IOException ex) {
            System.out.println("ExportResult createDimens error=" + ex);
        }
    }
    
    private void createDimens(String path) {
        try {
            FileWriter writer = new FileWriter(path + "/dimens.xml", false);
            writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
            writer.write("<resources>\n");
            for (int ir : Constants.standartDimens) {
                writer.write("    <dimen name=\"dim_" + ir + "\">" + ir + "dp</dimen>\n");
            }
            writer.write("</resources>");
            writer.flush();
            writer.close();
        } catch (IOException ex) {
            System.out.println("ExportResult createDimens error=" + ex);
        }
    }
    
    
    private void createDrawable(String resPath, ParamSave parSave) {
        String path = resPath + "/drawable";
//        formDir(path);
        if (parSave.drawable != null && parSave.drawable.size() > 0) {
            for (ItemResurces ir : parSave.drawable) {
                createOneDrawable(path, ir, parSave.colors);
            }
        }
    }
    
    private void createSwitch(String prot, String resPath, ParamSave parSave) {
        String path = resPath + "/drawable/";
        ListItemResurces colors = parSave.colors;
        ListSwitchParam lsp = parSave.switchSpec;
        if (lsp == null) return;
        int ik = lsp.size();
        for (int i = 0; i < ik; i++) {
            ItemSwitch item = lsp.get(i);
            if (item.isInLayouts) {
                SwitchParam sp = item.param;
                int hTr = sp.int_4, diam = sp.int_5;
                int radTh = diam / 2;
                int radTr = hTr / 2;
                String stroke = "";
                if (radTh < radTr) {
                    stroke = "<stroke android:width=\"" + dimens(radTr - radTh) + "\" android:color=\"#0000\" />";
                }
                ItemChange[] arChange = new ItemChange[] {
                    new ItemChange("#colOn#", findColorByIndex(sp.color_6, colors)),
                    new ItemChange("#colOff#", findColorByIndex(sp.color_5, colors)),
                    new ItemChange("#col_enabl#", findColorByIndex(sp.color_7, colors)),
                    new ItemChange("#radius#", dimens(radTr)),
                    new ItemChange("#height#", dimens(hTr)),
                    new ItemChange("#stroke#", stroke)
                };
                setFileAndroid(prot + "thumb", path + "switch_thumb_" + item.id + ".xml", arChange);
                arChange = new ItemChange[] {
                    new ItemChange("#colOn#", findColorByIndex(sp.color_3, colors)),
                    new ItemChange("#colOff#", findColorByIndex(sp.color_2, colors)),
                    new ItemChange("#col_enabl#", findColorByIndex(sp.color_4, colors)),
                    new ItemChange("#radius#", dimens(radTr)),
                    new ItemChange("#height#", dimens(hTr))
                };
                setFileAndroid(prot + "track", path + "switch_track_" + item.id + ".xml", arChange);
            }
        }
    }
    
    private void createOneDrawable(String path, ItemResurces ir, ListItemResurces colors) {
        Drawable drawable = gson.fromJson(ir.itemValue, Drawable.class);
        String b4 = "\n    ";
        if (drawable.type == null) drawable.type = "rectangle";
        try {
            FileWriter writer = new FileWriter(path + "/" + ir.itemName + ".xml", false);
            writer.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
            writer.write("<shape");
            writer.write(b4 + "xmlns:android=\"http://schemas.android.com/apk/res/android\"");
            writer.write(b4 + "android:shape=\"" + drawable.type +"\">");
            if (drawable.gradient == 0) {
                writer.write(b4 + "<solid android:color=\"" + findColorByIndex(drawable.color_1, colors) + "\"/>");
            } else {
                writer.write(b4 + "<gradient android:angle=\"" + Constants.ANGLES[drawable.gradient] 
                        + "\" android:startColor=\"" + findColorByIndex(drawable.color_1, colors)
                        + "\" android:endColor=\"" + findColorByIndex(drawable.color_2, colors) + "\"/>");
            }
            if (drawable.border != null && drawable.border > 0) {
                if (drawable.borderStyle.equals("solid")) {
                    writer.write(b4 + "<stroke android:width=\"" + dimens(drawable.border) 
                            + "\" android:color=\"" + findColorByIndex(drawable.bordedColor, colors) + "\"/>");
                } else {
                    writer.write(b4 + "<stroke android:width=\"" + dimens(drawable.border) 
                            + "\" android:dashWidth=\"20dp\" android:dashGap=\"3dp\""
                            + " android:color=\"" + findColorByIndex(drawable.bordedColor, colors) + "\"/>");
                }
            }
            boolean corn = false;
            int lt = 0;
            if (drawable.corners.lt != null && drawable.corners.lt.length() > 0) {
                lt = Integer.valueOf(drawable.corners.lt);
                if (lt > 0) corn = true;
            }
            int tr = 0;
            if (drawable.corners.tr != null && drawable.corners.tr.length() > 0) {
                tr = Integer.valueOf(drawable.corners.tr);
                if (tr > 0) corn = true;
            }
            int rb = 0;
            if (drawable.corners.rb != null && drawable.corners.rb.length() > 0) {
                rb = Integer.valueOf(drawable.corners.rb);
                if (rb > 0) corn = true;
            }
            int bl = 0;
            if (drawable.corners.bl != null && drawable.corners.bl.length() > 0) {
                bl = Integer.valueOf(drawable.corners.bl);
                if (bl > 0) corn = true;
            }
            if (corn) {
                if (lt == tr && tr == rb && rb == bl) {
                    writer.write(b4 + "<corners android:radius=\"" + dimens(drawable.corners.bl) + "\"/>");
                } else {
                    writer.write(b4 + "<corners");
                    String b8 = b4 + "    ";
                    if (lt > 0) {
                        writer.write(b8 + "android:topLeftRadius=\"" + dimens(drawable.corners.lt) + "\"");
                    }
                    if (tr > 0) {
                        writer.write(b8 + "android:topRightRadius=\"" + dimens(drawable.corners.tr) + "\"");
                    }
                    if (rb > 0) {
                        writer.write(b8 + "android:bottomRightRadius=\"" + dimens(drawable.corners.rb) + "\"");
                    }
                    if (bl > 0) {
                        writer.write(b8 + "android:bottomLeftRadius=\"" + dimens(drawable.corners.bl) + "\"");
                    }
                    writer.write(b8 + ">\n    </corners>");
                }
            }
            writer.write("\n</shape>");
            writer.flush();
            writer.close();
        } catch (IOException ex) {
            System.out.println("ExportResult createColors error=" + ex);
        }
    }

    private void zipRes(String zip, String folder, int lengthBase) {
        try {
            zipFolder(zip, folder, lengthBase);
        } catch (Exception ex) {
            System.out.println("ExportResult android error="+ex);
        }
    }
    
    private void zipFolder(String arhive, String folder, int lengthBase) throws Exception {
        ZipOutputStream out = new ZipOutputStream(new FileOutputStream(arhive));
        File file = new File(folder);
        doZip(file, out, lengthBase);
        out.close();
    }
    
    private void doZip(File dir, ZipOutputStream out, int lengthBase) throws IOException {
        for (File f : dir.listFiles()) {
            if (f.isDirectory())
                doZip(f, out, lengthBase);
            else {
                out.putNextEntry(new ZipEntry(f.getPath().substring(lengthBase)));
                writeToZip(new FileInputStream(f), out);
            }
        }
    }

}
