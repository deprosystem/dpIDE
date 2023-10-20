package ide.dpide.admin;

import ide.dpide.entity.DataServlet;
import ide.dpide.servlets.BaseServlet;
import ide.dpide.servlets.ERR;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@WebServlet(name = "Commander", urlPatterns = {"/commander/*"})
@MultipartConfig
public class Commander extends BaseServlet {

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {

        String st;
        switch (ds.query) {
            case "/commander/list":
                File myFolder;
                String appPath = request.getServletContext().getRealPath("");
                myFolder = new File(appPath);
                File[] files = myFolder.listFiles();
                int ik = files.length;
                ResultCommander rc = new ResultCommander();
                rc.dir = appPath;
                List<FileParam> lf = new ArrayList();
                for (int i = 0; i < ik; i++) {
                    File f = files[i];
                    FileParam fp = new FileParam();
                    fp.name = f.getName();
                    if (f.isDirectory()) {
                        fp.type = 1;
                    } else {
                        fp.type = 0;
                    }
                    fp.size = f.length();
                    lf.add(fp);
                    System.out.println(f.getName());
                }
                Collections.sort(lf, new FileComparator());
                rc.list = lf;
                sendResult(response, gson.toJson(rc));
                break;
            case "/commander/list_dir":
                String[] arParam = request.getParameterValues("dir");
                if (arParam != null && arParam.length > 0) {
                    appPath = arParam[0];
                    myFolder = new File(appPath);
                    files = myFolder.listFiles();
                    ik = files.length;
                    rc = new ResultCommander();
                    rc.dir = appPath;
                    lf = new ArrayList();
                    for (int i = 0; i < ik; i++) {
                        File f = files[i];
                        FileParam fp = new FileParam();
                        fp.name = f.getName();
                        if (f.isDirectory()) {
                            fp.type = 1;
                        } else {
                            fp.type = 0;
                        }
                        fp.size = f.length();
                        lf.add(fp);
                        System.out.println(f.getName());
                    }
                    Collections.sort(lf, new FileComparator());
                    rc.list = lf;
                    sendResult(response, gson.toJson(rc));
                } else {
                    sendError(response, ERR.ERR_PARAM + "dir");
                }
                break;
            case "/commander/upload_zip":
                String dirUpload = request.getHeader("dirUpload");
                if (dirUpload == null) {
                    String[] parAr = request.getParameterValues("dirUpload");
                    if (parAr != null) {
                        dirUpload = parAr[0];
                    } else {
                        try {
                            sendHTML("notParam.html", response.getWriter(), "<div>Not param projectId</div>");
                            break;
//                        sendError(response, "Not param projectId");
                        } catch (IOException ex) {
                            System.out.println("UploadFile error: "+ex);
                        }
                    }
                }
                String projectPath = dirUpload;
                try {
                    String savePathRes = projectPath + "/";
                    List<Part> fileParts;
                    fileParts = request.getParts().stream().filter(part -> "imgFile".equals(part.getName())).collect(Collectors.toList());
                    for (Part filePart : fileParts) {
                        String fileName = Paths.get(filePart.getSubmittedFileName()).getFileName().toString();
                        InputStream inputStream = filePart.getInputStream();
                        if (fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase().equals("zip")) {
                            unZip(inputStream, savePathRes);
                        } else {
                            byte[] buffer = new byte[1000];
                            FileOutputStream outputStream = new FileOutputStream(projectPath + File.separator + fileName);
                            while (inputStream.available() > 0) {
                                int count = inputStream.read(buffer);
                                outputStream.write(buffer, 0, count);
                            }
                            inputStream.close();
                            outputStream.close();
                        }
                    }
                    sendHTML("uploadImg.html", response.getWriter());
                } catch (IOException ex) {
                    System.out.println("UploadFile error: "+ex);
                } catch (ServletException ex) {
                    System.out.println("UploadFile error: "+ex);
                }
                break;
                
        }
    }
    
    private void unZip(InputStream is, String dir) {
        try(ZipInputStream zin = new ZipInputStream(is)) {
            ZipEntry entry;
            String name;
            while((entry=zin.getNextEntry())!=null){
                name = entry.getName();
                if (entry.isDirectory()) {
                    createDir(dir + name);
                } else {
                    FileOutputStream fout = new FileOutputStream(dir + name);
                    for (int c = zin.read(); c != -1; c = zin.read()) {
                        fout.write(c);
                    }
                    fout.flush();
                    zin.closeEntry();
                    fout.close();
                }
            }
        } catch(Exception ex){
            System.out.println("UploadFile unzip image error=" + ex.getMessage());
        } 
    }
    
    private class FileComparator implements Comparator<FileParam> {
        public int compare(FileParam o1, FileParam o2) {
            if (o1.type == o2.type) {
                return o1.name.compareTo(o2.name);
            } else if (o1.type > o2.type) {
                return -1;
            } else {
                return 1;
            }
        }
    }

}
