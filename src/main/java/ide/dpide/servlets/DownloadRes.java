package ide.dpide.servlets;

import ide.dpide.entity.DataServlet;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@WebServlet(name = "DownloadRes", urlPatterns = {"/download/*"})
public class DownloadRes extends BaseServlet {

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
            String[] ar = (" " + ds.query).split("/");
            String basePath = ds.patchOutsideProject;
            String userProjPath;
            String filename;
            File file;
            switch (ar[2]) {
                case "get_apk":
                        userProjPath = Constants.USERS_DATA + ar[3] + "/" + ar[4];
                        filename = basePath + userProjPath + "/app/build/outputs/apk/debug/" + ar[5];
                        file = new File(filename);
                        if (file.exists()) {
                            response.setHeader("Accept-Ranges", "bytes");
                            response.setContentType("application/vnd.android.package-archive/octet-stream");
                            response.setContentLength((int)file.length());
//                            response.setHeader("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"");
                            response.setHeader("Content-Disposition", "attachment;");
                            try {
                                Files.copy(file.toPath(), response.getOutputStream());
                            } catch (IOException e) {
                                System.out.println("Get export error " + e.toString());
                                response.reset();
                                sendError(response, "Get export error " + e.toString());
                                break;
                            }
                        } else {
                            sendError(response, "Export error");
                        }
                        deleteDir(basePath + userProjPath);
                    break;
                case "get_project":
                        userProjPath = Constants.USERS_DATA + ar[3] + "/" + ar[4];
                        filename = basePath + userProjPath;
                        file = new File(filename);
                        if (file.exists()) {
                            response.setHeader("Accept-Ranges", "bytes");
                            response.setContentType("application/zip");
                            response.setContentLength((int)file.length());
                            response.setHeader("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"");
                            try {
                                Files.copy(file.toPath(), response.getOutputStream());
                            } catch (IOException e) {
                                System.out.println(e);
                                sendError(response, "Get export error " + e.toString());
                                break;
                            }
                        } else {
                            sendError(response, "Export error");
                        }
                        String[] ff = filename.split("\\.");
                        deleteDir(ff[0]);
                        deleteFile(filename);
                    break;
            }
    }
    
    @Override
    public int needToLogin() {
        return 0;
    }
}
