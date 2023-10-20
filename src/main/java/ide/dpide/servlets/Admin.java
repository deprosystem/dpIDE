package ide.dpide.servlets;
import ide.dpide.db.ProjectDB;
import ide.dpide.db.UserDB;
import ide.dpide.entity.DataServlet;
import ide.dpide.entity.ParamDel;
import ide.dpide.entity.ParamDelUser;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "Admin", urlPatterns = {"/admin/*"})
public class Admin extends BaseServlet {

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
        String data = "";
        UserDB userDB = new UserDB(request);
        ProjectDB projectDb = new ProjectDB(request);
        String sql;
        String res;
        switch (ds.query) {
            case "/admin/listUsers":
                sql = "SELECT user_id, login, user_name, resurse_ind, code_confirm, tyme_actual FROM users ORDER BY user_name";
                res = userDB.getQueryList(sql);
                
                if (res.indexOf("error") == 0) {
                    sendError(response, res);
                } else {
                    sendResult(response, res);
                }
                break;
            case "/admin/listProjects":
                String idUser = request.getParameter("id");
                sql = "SELECT project_id, project_name, date_create, resurse_ind, host, where_server FROM projects WHERE user_id = " + idUser;
                res = userDB.getQueryList(sql);
                if (res.indexOf("error") == 0) {
                    sendError(response, res);
                } else {
                    sendResult(response, res);
                }
                break;
            case "/admin/listAllProjects":
                sql = "SELECT resurse_ind FROM projects";
                res = userDB.getQueryList(sql);
                if (res.indexOf("error") == 0) {
                    sendError(response, res);
                } else {
                    sendResult(response, res);
                }
                break;
            case "/admin/delProject":
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
                    res = projectDb.deleteProjectId(par.projectId);
                    if (res.indexOf("error") == 0) {
                        sendError(response, res);
                    } else {
                        sendResultOk(response);
                    }
                } else {
                    sendError(response, "admin/delProject no options to delete");
                }
                break;
            case "/admin/delUser":
                ParamDelUser parU = null;
                try {
                    String param = getStringRequest(request);
                    parU = gson.fromJson(param, ParamDelUser.class);
                } catch (IOException e) {
                    System.out.println(e);
                    sendError(response, "delete user error " + e.toString());
                    break;
                }
                res = "";
                if (parU != null) {
                    String basePath = ds.patchOutsideProject;
                    String projectPath = Constants.USERS_DATA + parU.userResInd;
                    deleteDir(basePath + projectPath);
                    res = userDB.deleteUser(parU.userId);
                    if (res.indexOf("error") == 0) {
                        sendError(response, res);
                    } else {
                        sendResultOk(response);
                    }
                } else {
                    sendError(response, "admin/delUser no options to delete");
                }
                break;
        }
    }

    @Override
    public int needToLogin() {
        return 0;
    }
}
