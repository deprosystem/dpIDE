package ide.dpide.db;

import com.google.gson.Gson;
import ide.dpide.entity.Profile;
import ide.dpide.entity.TokenUser;
import ide.dpide.servlets.Constants;
import jakarta.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class BaseDB {

    public String urlDB;
/*
    public String userNameDB = "mobi";
    public String passwordDB = "mobi";
    public String nameDB = "ide_depro";
*/
    public Gson gson = new Gson();
    
    public HttpServletRequest request;
    
    private String quote = "\"";
    private String quoteColon = "\":";
    
    public BaseDB(HttpServletRequest request) {
        this.request = request;
    }

    public Connection getDBConnection() throws SQLException, ClassNotFoundException {
        if (Constants.userNameDB == null || Constants.userNameDB.length() == 0) {
            try {
                String pp = this.request.getServletContext().getRealPath("") + "/resources/config.properties";
                Properties props = new Properties();
                props.load(new FileInputStream(new File(pp)));
                Constants.userNameDB = props.getProperty("userNameDB");
                Constants.passwordDB = props.getProperty("passwordDB");
                Constants.nameDB = props.getProperty("nameDB");
                Constants.draverDb = props.getProperty("draverDb");
                Constants.urlLocalDb = props.getProperty("urlLocalDb");
                Constants.urlServerDb = props.getProperty("urlServerDb");
            } catch (IOException ex) {
                System.out.println("getDBConnection error="+ex);
            }
        }

        if (request.getServletContext().getRealPath("").indexOf(File.separator) != 0) {
            urlDB = Constants.urlLocalDb;
        } else {
            urlDB = Constants.urlServerDb; // 2147483647
        }
        Class.forName(Constants.draverDb);
        return DriverManager.getConnection (urlDB + Constants.nameDB, Constants.userNameDB, Constants.passwordDB);
    }
/*
    public Connection getClientDBConnection() throws SQLException, ClassNotFoundException {
        if (request.getServletContext().getRealPath("").indexOf(File.separator) != 0) {
            urlDB = "jdbc:postgresql://localhost:5001/";
        } else {
            urlDB = "jdbc:postgresql://localhost:5432/";
        }
        Class.forName("org.postgresql.Driver");
        return DriverManager.getConnection (urlDB + "clients", "clients", "clients");
    }
*/
    public TokenUser getUserByToken(String token){
        TokenUser tu = new TokenUser();
        tu.userId = -1;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            ResultSet result = statement.executeQuery(SQL.getUserToken + inQuotes(token) + ";");
            if (result.next()) {
                tu.userId = result.getLong("user_id");
                tu.userResurseInd = result.getString("user_resurse_ind");
                tu.token = result.getString("token");
                tu.dateCreate = result.getLong("date_create");
            }
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("getUserByToken " + ex);
        }
        return tu;
    }
    
    public Profile getUserById(long userId) {
        Profile user = null;
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            ResultSet res = statement.executeQuery(SQL.getLoginById + userId + ";");
                if (res.next()) {
                    user = new Profile();
                    user.userId = res.getLong("user_id");
                    user.login = res.getString("login");
                    user.password = res.getString("password");
                    user.userName = res.getString("user_name");
                    user.projectId = res.getLong("project_id");
                    user.screenId = res.getLong("screen_id");
                    user.resurseInd = res.getString("resurse_ind");
                }
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("getUserById " + ex);
        }
        return user;
    }
    
    public String getQueryList(String sql) {
        StringBuilder result = new StringBuilder(2048);
        result.append("[");
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            ResultSet res = statement.executeQuery(sql);
            ResultSetMetaData rsmd = res.getMetaData();
            int count = rsmd.getColumnCount();
            int count1 = count + 1;
            String[] names = new String[count1];
            int[] types = new int[count1];
            String selRec = "";
            String selField;
            for (int i = 1; i < count1; i++ ) {
                names[i] = rsmd.getColumnName(i);
                types[i] = rsmd.getColumnType(i);
            }
            while (res.next()) {
                result.append(selRec + "{");
                selField = "";
                for (int i = 1; i < count1; i++ ) {
                    result.append(selField + quote + names[i] + quoteColon);
                    switch(types[i]) {
                        case -5:
                            result.append(String.valueOf(res.getLong(i)));
                            break;
                        case 4:
                            result.append(String.valueOf(res.getInt(i)));
                            break;
                        case 7:
                            result.append(String.valueOf(res.getFloat(i)));
                            break;
                        case 8:
                            result.append(String.valueOf(res.getDouble(i)));
                            break;
                        case 12:
                            String sst = res.getString(i);
                            if (sst == null || sst.equals("null")) {
                                sst = "";
                            }
                            result.append(quote + sst + quote);                            
                            break;
                        case -7:
                            result.append(res.getBoolean(i));
                            break;
                    }
                    selField = ",";
                }
                result.append("}");
                selRec = ",";
            }
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("getQueryList error="+ex);
            return "error="+ex;
        }
        result.append("]");
        return result.toString();
    }
    
    public String getQueryRecord(String sql) {
//System.out.println("getQueryRecord SQL="+sql+"<<");
        StringBuilder result = new StringBuilder(1024);
        result.append("{");
        try (Connection connection = getDBConnection(); Statement statement = connection.createStatement()) {
            ResultSet res = statement.executeQuery(sql);
            ResultSetMetaData rsmd = res.getMetaData();
            int count = rsmd.getColumnCount();
            int count1 = count + 1;
            String[] names = new String[count1];
            int[] types = new int[count1];
            String selField;
            for (int i = 1; i < count1; i++ ) {
                names[i] = rsmd.getColumnName(i);
                types[i] = rsmd.getColumnType(i);
            }
            if (res.next()) {
                selField = "";
                for (int i = 1; i < count1; i++ ) {
                    result.append(selField + quote + names[i] + quoteColon);
                    switch(types[i]) {
                        case -5:
                            result.append(String.valueOf(res.getLong(i)));
                            break;
                        case 4:
                            result.append(String.valueOf(res.getInt(i)));
                            break;
                        case 7:
                            result.append(String.valueOf(res.getFloat(i)));
                            break;
                        case 8:
                            result.append(String.valueOf(res.getDouble(i)));
                            break;
                        case 12:
                            String sst = res.getString(i);
                            if (sst == null || sst.equals("null")) {
                                sst = "";
                            }
                            result.append(quote + sst + quote);
                            break;
                        case -7:
                            result.append(res.getBoolean(i));
                            break;
                    }
                    selField = ",";
                }
            }
        } catch (SQLException | ClassNotFoundException ex) {
            System.out.println("getQueryRecord error="+ex);
        }
        result.append("}");
        return result.toString();
    }
    
    public String inQuotes(String par) {
        return "'" + par + "'";
    }
    
    public String escapingQuotes(String st) {
        int ik = st.length();
        StringBuffer sb = new StringBuffer(ik + 100);
        char[] sCh = st.toCharArray();
        for (int i = 0; i < ik; i++) {
            char cc = sCh[i];
            sb.append(cc);
            if (cc == '\'') {
                sb.append(cc);
            }
        }
        return sb.toString();
    }
}
