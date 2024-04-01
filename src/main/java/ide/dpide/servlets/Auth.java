package ide.dpide.servlets;

import com.google.gson.JsonSyntaxException;
import ide.dpide.db.ProjectDB;
import ide.dpide.db.UserDB;
import ide.dpide.entity.AuthResult;
import ide.dpide.entity.DataServlet;
import ide.dpide.entity.Profile;
import ide.dpide.entity.TokenUser;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Date;

@WebServlet(name = "Auth", urlPatterns = {"/auth/*"})
public class Auth extends BaseServlet {

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
        Profile userC = null;
        Profile user = null;
        String data = "";
        int count;
        UserDB userDB = new UserDB(request);
        switch (ds.query) {
            case "/auth/login":
                try {
                    data = getStringRequest(request);
                    userC = gson.fromJson(data, Profile.class);
                } catch (JsonSyntaxException | IOException e) {
                    sendError(response, ERR.PROF_ERR + e.toString());
                }
                user = userDB.getUser(userC.login);
                if (user == null || ! user.password.equals(userC.password)) {
                    sendError(response, ERR.NO_USER);
                } else {
                    if (user.codeConfirm != 0) {
                        if (user.codeConfirm != userC.codeConfirm) {
                            sendError(response, ERR.CODE_ERR);
                        } else {
                            if (user.tymeActualCode < new Date().getTime()) {
                                sendError(response, ERR.CODE_NOACTUAL);
                            } else {
                                userDB.setCodeConfirm(user);
                            }
                        }
                    }
                    count = 0;
                    do {
                        ds.token = createRandomStr(30);
                        count++;
                    } while (userDB.setToken(ds.token, user.userId, user.resurseInd) < 1 || count > 3);
                    if (count > 3) {
                        sendError(response, ERR.NO_USER);
                        break;
                    }
                    TokenUser tu = baseDb.getUserByToken(ds.token);
                    ds.userId = tu.userId;
                    ds.userResurseInd = tu.userResurseInd;
                    String basePath = ds.patchOutsideProject;
                    formDir(basePath + Constants.USERS_DATA + ds.userResurseInd);
                    AuthResult ar = new AuthResult();
                    ar.token = ds.token;
                    user.password = null;
                    user.codeConfirm = 0;
                    user.tymeActualCode = 0;
                    ar.profile = user;
                    ProjectDB projectDb = new ProjectDB(request);
                    if (user.projectId > -1) {
                        ar.project = projectDb.getProjectById(String.valueOf(user.projectId));
                    } else {
                        ar.listProject = projectDb.getListProject(user.userId);
                    }
                    sendResult(response, gson.toJson(ar));
                }
                break;
            case "/auth/register":
                try {
                    data = getStringRequest(request);
                    userC = gson.fromJson(data, Profile.class);
                } catch (IOException e) {
                    sendError(response, ERR.PROF_ERR + e.toString());
                }
                user = userDB.getUser(userC.login);
                if (user == null) {
                    userC.resurseInd = createRandomStr(20);
                    userC.codeConfirm = getRandomInt(1000, 10000);
                    userC.tymeActualCode = new Date().getTime() + 600000;
                    long id = -1;
                    id = userDB.createUserId(userC);
                    if (id > -1) {
                        count = 0;
                        userC.userId = id;
                        do {
                            ds.token = createRandomStr(30);
                            count++;
                        } while (userDB.setToken(ds.token, userC.userId, userC.resurseInd) < 1 || count > 3);
                        if (count > 3) {
                            sendError(response, ERR.NO_USER);
                            break;
                        }
                        WorkEmail we = new WorkEmail();
                        we.send(userC);
                        AuthResult ar = new AuthResult();
                        ar.token = ds.token;
                        userC.password = null;
                        userC.codeConfirm = 0;
                        ar.profile = userC;
                        sendResult(response, gson.toJson(ar));
                    } else {
                        sendError(response, ERR.USER_DB_ERR);
                    }

                } else {
                    sendError(response, ERR.USER_EXISTS);
                }
                break;
        }
    }
    
    @Override
    public int needToLogin() {
        return 1;
    }

}
