package ide.dpide.servlets;

import ide.dpide.db.ProjectDB;
import ide.dpide.entity.DataServlet;
import ide.dpide.projects.ProjectM;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.IOException;
import javax.imageio.ImageIO;

@WebServlet(name = "ImagesList", urlPatterns = {"/images/*"})
public class ImagesList extends BaseServlet {

    @Override
    protected void processRequest(HttpServletRequest request, HttpServletResponse response, DataServlet ds) {
        switch (ds.query) {
            case "/images/list":
                String projectId = request.getHeader("projectId");
                ProjectDB projectDb = new ProjectDB(request);
                ProjectM proj = projectDb.getProjectById(projectId);
                String resurseInd = proj.resurseInd;
                String userDataPath = Constants.PROJECTS_DATA + resurseInd + "/res/drawable-hdpi/";
                String appPath = ds.patchOutsideProject;
                String projectPath = appPath + userDataPath;
                sendResult(response, getListImages(projectPath, userDataPath));
                break;
            case "/images/listSystem":
                String categoryImg = "";
                String[] parAr = request.getParameterValues("categoty");
                if (parAr != null) {
                    categoryImg = parAr[0];
                }
                if (categoryImg == null || categoryImg.length() == 0) {
                    sendError(response, "Category not specified");
                } else {
                    userDataPath = Constants.PROJECTS_DATA + "systemIcons/" + categoryImg + "/drawable-mdpi/";
                    appPath = ds.patchOutsideProject;
                        projectPath = appPath + userDataPath;
                    sendResult(response, getListImagesSys(projectPath, userDataPath));
                }
                break;
            case "/images/categorySystem":
                userDataPath = Constants.PROJECTS_DATA + "systemIcons";
                appPath = ds.patchOutsideProject;
                projectPath = appPath + userDataPath;
//System.out.println("categorySystem getRealPath="+request.getServletContext().getRealPath("")+"<<");
                sendResult(response, getListCategoryImages(projectPath, request.getServletContext().getRealPath("") + userDataPath));
                break;
            case "/images/changeColor":
                projectId = request.getHeader("projectId");
                projectDb = new ProjectDB(request);
                proj = projectDb.getProjectById(projectId);
                resurseInd = proj.resurseInd;
                String resultPath = Constants.PROJECTS_DATA + resurseInd + "/res/drawable-hdpi/";
                
                String nameCateg = "";
                parAr = request.getParameterValues("category");
                if (parAr != null) {
                    nameCateg = parAr[0];
                }
                String nameF = "";
                parAr = request.getParameterValues("nameFile");
                if (parAr != null) {
                    nameF = parAr[0];
                }
                String col = "";
                Color color = null;
                parAr = request.getParameterValues("color");
                if (parAr != null) {
                    col = parAr[0];
                    color = decodeM("0x" + col);
                }
                appPath = ds.patchOutsideProject;
                String preOrigin = appPath + Constants.PROJECTS_DATA + "systemIcons/" + nameCateg + "/";
                String preResult = appPath + Constants.PROJECTS_DATA + resurseInd + "/res/";
                String nameN = "_" + nameF.substring(0, nameF.lastIndexOf(".")) + "_" + col + nameF.substring(nameF.lastIndexOf("."));
                String originPath = "";
                String[] dirImg = {"drawable-hdpi/", "drawable-mdpi/", "drawable-xhdpi/", "drawable-xxhdpi/", "drawable-xxxhdpi/"};
                for (String nameDir : dirImg) {
                    createDir(preResult + nameDir);
                }
                for (String nameDir : dirImg) {
                    originPath = preOrigin + nameDir + nameF;
                    resultPath = preResult + nameDir + nameN;
                    changeColorImg(originPath, resultPath, color);
                }
                projectId = request.getHeader("projectId");
                projectDb = new ProjectDB(request);
                proj = projectDb.getProjectById(projectId);
                resurseInd = proj.resurseInd;
                userDataPath = Constants.PROJECTS_DATA + resurseInd + "/res/drawable-hdpi/";
                appPath = ds.patchOutsideProject;
                projectPath = appPath + userDataPath;
                sendResult(response, getListImages(projectPath, userDataPath));
                break;
        }
    }
    
    public Color decodeM(String nm) throws NumberFormatException {
        long i = Long.decode(nm);
        int r = (int) ((i >> 16) & 0xFF);
        int g = (int) ((i >> 8) & 0xFF);
        int b = (int) (i & 0xFF);
        int a = (int) ((i >> 24) & 0xFF);
        Color cc = new Color(r, g, b, a);
        return cc;
    }
    
    public void changeColorImg(String originalPath, String resultPath, Color nColor) {
       try {
            File file = new File(originalPath);
            BufferedImage source = ImageIO.read(file);
            int w = source.getWidth();
            int h = source.getHeight();
            BufferedImage result = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);

            int newColor = nColor.getRGB();
            Color cc = new Color(0, 0, 0, 0);
            int transp = cc.getRGB();
            for (int x = 0; x < w; x++) {
                for (int y = 0; y < h; y++) {
                    int rgb = source.getRGB(x, y);
                    if ((rgb & 0xff000000) != 0x00000000) {
                        result.setRGB(x, y, newColor);
                    } else {
                        result.setRGB(x, y, transp);
                    }
                }
            }
            File output = new File(resultPath);
            boolean bb = ImageIO.write(result, "png", output);
        } catch (IOException e) {
            System.out.println("Файл не найден или не удалось сохранить");
        }
    }
    
    private String getListCategoryImages(String dataPath, String userDataPath) {
        String res = "[]";
        if (isSerwer) {
            File dirF = new File(dataPath);
            if( ! dirF.exists()) {             
                if( ! dirF.mkdirs()) {                 
                    System.out.println("getListCategoryImages " + dirF.getAbsolutePath() + " создвть не удалось.");
                    return res;
                } else {
                    copyDir(userDataPath, dataPath);
                }
            }
        }
        
        List<String> results = new ArrayList();
        File[] files = new File(dataPath + "/").listFiles();
        if (files == null) {
            System.out.println("getListCategoryImages error: No icons dataPath=" + dataPath);
        } else {
            for (File file : files) {
                results.add(file.getName());
            }
            res = gson.toJson(results);
        }
        return res;
    }
    
    private String getListImages(String dataPath, String userDataPath) {
        String res = "[]";
        List<String> results = new ArrayList();
        File[] files = new File(dataPath).listFiles();
        if (files == null) {
            System.out.println("getListImages error: No icons dataPath=" + dataPath);
        } else {
            for (File file : files) {
                if (file.isFile()) {
                    results.add(userDataPath + file.getName());
                }
            }
            res = gson.toJson(results);
        }
        return res;
    }
    
    private String getListImagesSys(String dataPath, String userDataPath) {
        String res = "[]";
        List<String> results = new ArrayList();
        File[] files = new File(dataPath).listFiles();
        if (files == null) {
            System.out.println("getListImages error: No icons dataPath=" + dataPath);
        } else {
            for (File file : files) {
                results.add(file.getName());
            }
            res = gson.toJson(results);
        }
        return res;
    }
    
        
    @Override
    public int needToLogin() {
        return 2;
    }
}
