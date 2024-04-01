package ide.dpide.db;

import ide.dpide.entity.Profile;
import jakarta.servlet.http.HttpServletRequest;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;

public class UserDB extends BaseDB{

    public UserDB(HttpServletRequest request) {
        super(request);
    }
    
    public Profile getUser(String login) {
        Profile user = null;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            ResultSet res = statement.executeQuery(SQL.getLogin + inQuotes(login) + ";");
            if (res.next()) {
                user = new Profile();
                user.userId = res.getLong("user_id");
                user.projectId = res.getLong("project_id");
                user.screenId = res.getLong("screen_id");
                user.password = res.getString("password");
                user.userName = res.getString("user_name");
                user.login = res.getString("login");
                user.codeConfirm = res.getInt("code_confirm");
                user.tymeActualCode = res.getLong("tyme_actual");
                user.email = res.getString("email");
                user.resurseInd = res.getString("resurse_ind");
            }
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("getUser error="+ex);
        }
        return user;
    }
    
    public long createUserId(Profile user) {
        long res = -1;
        String str = "";
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            str = "INSERT INTO users (login, user_name, password, resurse_ind, code_confirm, tyme_actual, email, project_id, screen_id) VALUES ('"
                    + user.login + "','" + user.userName + "','" + user.password + "','" + user.resurseInd + "'," + user.codeConfirm  
                    + "," + user.tymeActualCode + ",'" + user.email + "',-1,-1);";
            int updateCount = statement.executeUpdate(str, Statement.RETURN_GENERATED_KEYS);
            try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
              if (generatedKeys.next()) {
                res = generatedKeys.getLong("user_id");
              }
              else {
                  System.out.println("createUserId Creating failed, no ID obtained.");
              }
            }
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("createUserId SQL="+str);
            System.out.println("createUserId error="+ex);
        }
        return res;
    }
    
    public void setCodeConfirm(Profile user) {
        long tt = new Date().getTime();
        String strUpd = "UPDATE users SET code_confirm = 0 WHERE login = '" + user.login + "'";
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            statement.executeUpdate(strUpd);
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("changeProject error="+ex);
        }
    }
    
    public int setToken(String token, long userId, String resurseInd) {
        int size = -1;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            long dat = new Date().getTime();
            String str = "INSERT INTO token_user (token, user_id, user_resurse_ind, date_create) VALUES ('"+ token + "'," + userId + ",'" + resurseInd + "'," +dat + ");";
            size = statement.executeUpdate(str);
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("setToken error="+ex);
        }
        return size;
    }
    
    public int removeOldTokens() {
        int size = -1;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            long dat = new Date().getTime() - (60 * 60 * 24 * 1000);
            String str = "DELETE FROM token_user WHERE date_create < " + dat + ";";
            size = statement.executeUpdate(str);
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("removeOldTokens error="+ex);
        }
        return size;
    }
    
    public long updateProfile(String st) {
        long res = -1;
        try (Connection connectUpd = getDBConnection(); Statement statemUpdt = connectUpd.createStatement()) {
            res = statemUpdt.executeUpdate(st);
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("UserDB updateProfile error=" + ex);
        }
        return res;
    }
    
    public void setLastProject(String idUser, long idProject) {
        String strUpd = "UPDATE users SET ";
        strUpd += "project_id = " + idProject + " WHERE user_id = " + idUser;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            statement.executeUpdate(strUpd);
        } catch (SQLException ex) {
            System.out.println("setLastProject error="+ex);
        } catch (ClassNotFoundException ex) {
            System.out.println("setLastProject error="+ex);
        }
    }
    
    public String deleteUser(String id) {
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            statement.executeUpdate("DELETE FROM users WHERE user_id = " + id);
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("deleteUser error="+ex);
            return "deleteUser error="+ex;
        }
        return "";
    }

}
