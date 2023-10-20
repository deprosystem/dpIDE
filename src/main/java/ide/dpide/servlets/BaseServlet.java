package ide.dpide.servlets;

import com.google.gson.Gson;
import ide.dpide.android.ItemChange;
import ide.dpide.db.BaseDB;
import ide.dpide.entity.DataServlet;
import ide.dpide.entity.ErrorMsg;
import ide.dpide.entity.ResultOk;
import ide.dpide.entity.TokenUser;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
//import entity.UserM;
import java.io.BufferedReader;
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
import java.io.PrintWriter;
import java.util.Random;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

public abstract class BaseServlet extends HttpServlet{
    
    public Gson gson = new Gson();
    public BaseDB baseDb;
    public boolean isSerwer;
    public long userExample = 540;
    
    protected abstract void processRequest(HttpServletRequest request, 
            HttpServletResponse response, DataServlet ds);
    
    protected void process(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        baseDb = new BaseDB(request);
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
//        response.setHeader("Access-Control-Allow-Origin", "*");
        DataServlet ds = new DataServlet();
        TokenUser tu;
        
        ds.query = request.getRequestURI().substring(request.getContextPath().length());
        ds.patchOutsideProject = getPatchOutsideProject(request);
System.out.println("query="+ds.query);
        int need = needToLogin();
        if (need == 0) {
            processRequest(request, response, ds);
        } else {
            ds.token = request.getHeader("Auth-token");
            if (ds.token == null) {
                String[] stPar = request.getParameterValues("Auth-token");
                if (stPar != null) {
                    ds.token = stPar[0];
                }
            }
            if (ds.token != null && ds.token.length() > 0) {
                tu = baseDb.getUserByToken(ds.token);
                ds.userId = tu.userId;
                ds.userResurseInd = tu.userResurseInd;
                if (need == 1) {
                    processRequest(request, response, ds);
                } else {
                    if (ds.userId < 0) {
                        ErrorMsg err = new ErrorMsg();
                        err.message = "Need to log in";
                        sendResult(response, gson.toJson(err), HttpServletResponse.SC_NOT_FOUND);
                    } else {
                        processRequest(request, response, ds);
                    }
                }
            } else {
                if (need == 1) {
                    ds.userId = -1;
                    processRequest(request, response, ds);
                } else {
                    ErrorMsg err = new ErrorMsg();
                    err.message = "Need to log in";
                    sendResult(response, gson.toJson(err), HttpServletResponse.SC_NOT_FOUND);
                }
            }
        }
    }
    
    public String getPatchOutsideProject(HttpServletRequest request) {
        String st = request.getServletContext().getRealPath("");
        if (st.indexOf(File.separator) != 0) {
            isSerwer = false;
            if ( ! st.endsWith(File.separator)) {
                st += File.separator;
            }
            return st;
        } else {
            isSerwer = true;
            return Constants.BASEPATH;
        }
    }
    
// 0 - не перевіряти, 
// 1 - якщо є token то визначити userId інакше userId = -1 дії на розсуд основного сервлету; 
// 2 - обовязкова реєстрація
    public int needToLogin() {
        return 1;
    }
    
    public String getParameter(HttpServletRequest request, String name) {
        String[] par = request.getParameterValues(name);
        if (par == null) {
            return null;
        } else {
            return par[0];
        }
    }
    
    public void sendResult(HttpServletResponse response, String result, int status) {
        response.setStatus (status);
        try (PrintWriter out = response.getWriter()) {
            out.print(result);
        } catch (IOException ex) {
            System.out.println("BaseServlet sendResult error" + ex);
        }
    }
    
    public void sendResult(HttpServletResponse response, String result) {
        sendResult(response, result, HttpServletResponse.SC_OK);
    }
    
    public void sendResultOk(HttpServletResponse response) {
        ResultOk resOk = new ResultOk();
        resOk.result = "oK";
        sendResult(response, gson.toJson(resOk), HttpServletResponse.SC_OK);
    }
    
    public void sendError(HttpServletResponse response, String message) {
        ErrorMsg err = new ErrorMsg();
        err.status = "error";
        err.title = "Error";
        err.message = message;
        sendResult(response, gson.toJson(err), HttpServletResponse.SC_BAD_REQUEST);   // 404
    }
    
    public String getStringRequest(HttpServletRequest request) throws IOException {
        StringBuffer jb = new StringBuffer();
        String line = null;
        BufferedReader reader = request.getReader();
        while ((line = reader.readLine()) != null) {
            jb.append(line);
        }
        return jb.toString();
    }
    
    public void sendHTML(String nameFile, PrintWriter out) {
        try{
            FileInputStream fstream = new FileInputStream(getServletContext().getRealPath("/") + nameFile);
            BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
            String strLine;
            while ((strLine = br.readLine()) != null){
                out.println(strLine);
            }
        }catch (IOException e){
           System.out.println("Ошибка вывода " + nameFile);
        }
    }
    
    public void sendHTML(String nameFile, PrintWriter out, String param) {
        try{
            FileInputStream fstream = new FileInputStream(getServletContext().getRealPath("/") + nameFile);
            BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
            String strLine;
            while ((strLine = br.readLine()) != null){
                if (strLine.equals("//param")) {
                    out.println(param);
                } else {
                    out.println(strLine);
                }
            }
        }catch (IOException e){
           System.out.println("Ошибка вывода " + nameFile);
        }
    }
    
    public void setFileAndroid(String pathIn, String pathOut, ItemChange[] arCh) {
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
                    for (ItemChange ic : arCh) {
                        if (ic.name.equals(par)) {
                            writer.write(line.replace(ic.name, ic.value) + "\n");
                            break;
                        }
                    }
                }
            }
            writer.flush();
            writer.close();
            reader.close();
        } catch (IOException ex) {
            Logger.getLogger(BaseServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public void createFileFromString(String st, String pathOut) {
        try {
            FileWriter writer = new FileWriter(pathOut, false);
            Scanner scan = new Scanner(st);
            while (scan.hasNextLine()) {
                String line = scan.nextLine();
                writer.write(line + "\n");
            }
            writer.flush();
            writer.close();
        } catch (IOException ex) {
            Logger.getLogger(BaseServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public String createRandomStr(int len) {
        String alf = "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiopasdfghjklzxcvbnm1234567890_";
        Random random = new Random();
        String st = "" + alf.charAt(random.nextInt(50));
        for (int i = 0; i < len - 1; i++) {
            int j = random.nextInt(62);
            st+= alf.charAt(j);
        }
        return st;
    }
    
    public String lowerCaseRandom(int len) {
        String alf = "qwertyuiopasdfghjklzxcvbnm1234567890_";
        Random random = new Random();
        String st = "" + alf.charAt(random.nextInt(26));
        for (int i = 0; i < len - 1; i++) {
            int j = random.nextInt(37);
            st+= alf.charAt(j);
        }
        return st;
    }
    
    public String inDoubleQuotes(String par) {
        return "\"" + par + "\"";
    }
    
    public void formDir(String path) {
        File file = new File(path);
        if (file.exists()) {
            clearFolder(file);
        } else {
            createDir(path);
        }
    }
    
    public void createDir(String dir) {
        File dirF = new File(dir);
        if( ! dirF.exists()) {             
            if( ! dirF.mkdirs()) {                 
                System.out.println("createDir Каталог " + dirF.getAbsolutePath() + " создвть не удалось.");
            }
        }
    }
    
    public void deleteDir(String dir) {
//System.out.println("deleteDir DIR="+dir+"<<");
        File dirF = new File(dir);
        if( dirF.exists()) {
            if(dirF.isDirectory()) {
                clearFolder(dirF);
            }
            dirF.delete();
        }
    }
    
    public void deleteFile(String nf) {
        File dirF = new File(nf);
        if( dirF.exists() && ! dirF.isDirectory()) {
            dirF.delete();
        }
    }
    
    public static void clearFolder(File folder) {
        File[] files = folder.listFiles();
        if(files!=null) { 
            for(File f: files) {
                if(f.isDirectory()) {
                    clearFolder(f);
                    f.delete();
                } else {
                    f.delete();
                }
            }
        }
    }
    
    public static void copyDir(String srcFolder, String destFolder) {
        File src = new File(srcFolder);
        File dest = new File(destFolder);
        if(!src.exists()){
           System.out.println("Does not exist directory " + srcFolder);
           return;
        }
        try {
            copyFolder(src, dest);
        } catch (IOException ex) {
            System.out.println("createBaseProject copyFolder: " + ex);
        }
    }
    
    public static void copyFolder(File src, File dest) throws IOException{
        if(src.isDirectory()){
            if(!dest.exists()){
               dest.mkdir();
            }
           //list all the directory contents
            String files[]= src.list();
            for (String file : files) {
              //construct the src and dest file structure
               File srcFile = new File(src, file);
               File destFile = new File(dest, file);
              //recursive copy
               copyFolder(srcFile,destFile);
            }
        }else{
           //if file, then copy it
           //Use bytes stream to support all file types
            InputStream in = new FileInputStream(src);
            OutputStream out = new FileOutputStream(dest);

            byte[]buffer = new byte[2048];

            int length;
           //copy the file content in bytes
            while ((length = in.read(buffer)) > 0){
               out.write(buffer, 0, length);
            }
            in.close();
            out.close();
        }
    }
    
    public void copyFile(String srcPuth, String destPuth) {
        File src = new File(srcPuth);
        File dest = new File(destPuth);
        if(!src.exists()){
           System.out.println("Does not exist directory " + srcPuth);
           return;
        }
        InputStream in;
        try {
            in = new FileInputStream(src);
            OutputStream out = new FileOutputStream(dest);
            byte[]buffer = new byte[1024];

            int length;
                //copy the file content in bytes
            while ((length = in.read(buffer)) > 0){
                out.write(buffer, 0, length);
            }
            in.close();
            out.close();
        } catch (FileNotFoundException ex) {
            System.out.println("copyFile: " + ex);
        } catch (IOException ex) {
            System.out.println("copyFile: " + ex);
        }
    }
    
    public int getRandomInt(int min, int max) {
        return (int) (Math.random() * (max - min) + min);
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        process(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        process(request, response);
    }
}
