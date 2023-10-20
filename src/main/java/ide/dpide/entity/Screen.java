package ide.dpide.entity;

import ide.dpide.android.AndroidPar;
import ide.dpide.projects.InitData;
import ide.dpide.projects.Navigator;

public class Screen {
    public String screenName, screenComment, title, titleParam;
    public long screenId;
    public int animate, typeScreen;
    public ListComponent components;
    public AndroidPar layout;
    public Navigator navigator;
    public InitData initData;
}
