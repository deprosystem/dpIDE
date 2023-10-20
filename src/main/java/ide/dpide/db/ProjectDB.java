package ide.dpide.db;

import ide.dpide.entity.DescrHost;
import ide.dpide.projects.ProjectM;
import jakarta.servlet.http.HttpServletRequest;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


public class ProjectDB extends BaseDB {

    public ProjectDB(HttpServletRequest request) {
        super(request);
    }
    
    public long createProjectId(ProjectM pc) {
        long res = -1;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            String str = "INSERT INTO projects (user_id, project_name, package, project_comment, app_name, resurse_ind, strings, app_param, color, style, style_spec, style_check, drawable, dimens, screens, push, languages, date_create) VALUES ("
                    + pc.userId + ",'" + pc.nameProject + "','" + pc.namePackage + "','" + pc.comment + "','" + pc.nameAPP + "','" + pc.resurseInd + "','" + pc.strings + "','" + pc.appParam + "','" + pc.colors + "','" 
                    + pc.style + "','" + pc.style_spec + "','" + pc.style_check + "','" + pc.drawable + "','" + pc.dimens + "','" + pc.screens 
                    + "','" + pc.push + "','" + pc.languages + "'," + pc.dateCreate + ");";
            int updateCount = statement.executeUpdate(str, Statement.RETURN_GENERATED_KEYS);
            try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
              if (generatedKeys.next()) {
                res = generatedKeys.getLong("project_id");
              }
              else {
                  System.out.println("createProjektId Creating failed, no ID obtained.");
              }
            }
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("createProjektId error="+ex);
        }
        return res;
    }

    public String updateProject(ProjectM pc) {
        String res = "";
        String strUpd = "UPDATE projects SET ";
        String sep = "";
        if (pc.colors != null && pc.colors.length() > 0) {
            strUpd += "color = " + " '" + pc.colors + "' ";
            sep = ",";
        }
        if (pc.drawable != null) {
            strUpd += sep + "drawable = " + " '" + pc.drawable + "' ";
            sep = ",";
        }
        if (pc.appParam != null) {
            strUpd += sep + "app_param = " + " '" + pc.appParam + "' ";
            sep = ",";
        }
        if (pc.style != null) {
            strUpd += sep + "style = " + " '" + pc.style + "' ";
            sep = ",";
        }
        if (pc.style_spec != null) {
            strUpd += sep + "style_spec = " + " '" + pc.style_spec + "' ";
            sep = ",";
        }
        if (pc.style_check != null) {
            strUpd += sep + "style_check = " + " '" + pc.style_check + "' ";
            sep = ",";
        }
        if (pc.screens != null) {
            strUpd += sep + "screens = " + " '" + escapingQuotes(pc.screens) + "' ";
            sep = ",";
        }
        if (pc.push != null) {
            strUpd += sep + "push = " + " '" + escapingQuotes(pc.push) + "' ";
            sep = ",";
        }
        if (pc.languages != null) {
            strUpd += sep + "languages = " + " '" + escapingQuotes(pc.languages) + "' ";
            sep = ",";
        }
        strUpd += " WHERE project_id = " + pc.projectId;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            statement.executeUpdate(strUpd);
        } catch (SQLException ex) {
            System.out.println("updateProject SQL: error="+ex);
            res = "updateProject SQL: error="+ex;
        } catch (ClassNotFoundException ex) {
            System.out.println("updateProject NotFound error="+ex);
            res = "updateProject NotFound error="+ex;
        }
        return res;
    }
    
    public void changeProject(ProjectM pc, String projectId) {
        String strUpd = "UPDATE projects SET ";
        strUpd += "project_name ='" + pc.nameProject +  "', package='" + pc.namePackage +  "', project_comment='" + pc.comment + "', app_name ='" + pc.nameAPP 
                + "', logo ='" + pc.logo + "', image ='" + pc.image + "' WHERE project_id = " + projectId;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            statement.executeUpdate(strUpd);
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("changeProject error="+ex);
        }
    }
    
    public void changeProjectImage(ProjectM pc) {
        String strUpd = "UPDATE projects SET ";
        strUpd += "image ='" + pc.image + "' WHERE project_id = " + pc.projectId;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            statement.executeUpdate(strUpd);
        } catch (SQLException ex) {
            System.out.println("changeProject error="+ex);
        } catch (ClassNotFoundException ex) {
            System.out.println("changeProject error="+ex);
        }
    }
    
    public String deleteProjectId(String id) {
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            int ii = statement.executeUpdate("DELETE FROM projects WHERE project_id = " + id);
            return "";
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("changeProject error="+ex);
            return "changeProject error="+ex;
        }
    }
    
    public List<ProjectM> getListProject(long userId) {
        List<ProjectM> lp = new ArrayList();
        ResultSet res;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            res = statement.executeQuery(SQL.getProject + userId + ";");
            while (res.next()) {
                ProjectM pm = new ProjectM();
                pm.projectId = res.getLong("project_id");
                pm.nameProject = res.getString("project_name");
                pm.namePackage = res.getString("package");
                pm.nameAPP = res.getString("app_name");
                pm.comment = res.getString("project_comment");
                pm.logo = res.getString("logo");
                pm.dateCreate = res.getLong("date_create");
                pm.resurseInd = res.getString("resurse_ind");
                pm.image = res.getString("image");
                pm.host = res.getString("host");
//                pm.push = res.getString("push");
                pm.whereServer = res.getString("where_server");
                pm.listUsers = "[{\"userId\":" + userId + ",\"color\":\"#ff1eac\",\"litera\":\"B\"}]";
                lp.add(pm);
            }
        } catch (SQLException ex) {
            System.out.println("getListProject error="+ex);
        } catch (ClassNotFoundException ex) {
            System.out.println("getListProject error="+ex);
        }
        return lp;
    }
    
    public ProjectM getProjectById(String id) {
        ProjectM pm = null;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
//            ResultSet res = statement.executeQuery(SQL.getProjectById + inQuotes(id) + ";");
            ResultSet res = statement.executeQuery(SQL.getProjectById + id + ";");
            if (res.next()) {
                pm = new ProjectM();
                pm.projectId = res.getLong("project_id");
                pm.nameProject = res.getString("project_name");
                pm.namePackage = res.getString("package");
                pm.nameAPP = res.getString("app_name");
                pm.comment = res.getString("project_comment");
                pm.logo = res.getString("logo");
                pm.host = res.getString("host");
                pm.whereServer = res.getString("where_server");
                pm.colors = res.getString("color");
                pm.strings = res.getString("strings");
                pm.appParam = res.getString("app_param");
                pm.dimens = res.getString("dimens");
                pm.style = res.getString("style");
                pm.style_spec = res.getString("style_spec");
                pm.style_check = res.getString("style_check");
                pm.screens = res.getString("screens");
                pm.push = res.getString("push");
                pm.languages = res.getString("languages");
                pm.drawable = res.getString("drawable");
                pm.resurseInd = res.getString("resurse_ind");
            }
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("getProjectById error="+ex);
        }
        return pm;
    }

    public void setLastProject(String idUser, String idProject) {
        String strUpd = "UPDATE users SET ";
        strUpd += "project_id = " + idProject + " WHERE user_id = " + idUser;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            statement.executeUpdate(strUpd);
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("setLastProject error="+ex);
        }
    }
    
    public void setHost(String idPr, DescrHost dh) {
        String strUpd = "UPDATE projects SET ";
        strUpd += "(host, where_server) = ('" + dh.domain + "', '" + dh.whereServer + "') WHERE project_id = " + idPr;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            statement.executeUpdate(strUpd);
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("setLastProject error="+ex);
        }
    }
}
