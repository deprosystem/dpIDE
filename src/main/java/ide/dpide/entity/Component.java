package ide.dpide.entity;

import ide.dpide.projects.Model;
import ide.dpide.projects.Navigator;
import ide.dpide.projects.Options;
import ide.dpide.projects.Param;
import ide.dpide.projects.View;
import java.util.List;

public class Component {
    public String type;
    public int componId;
    public Model model;
    public View view;
    public Param param;
    public Navigator navigator;
    public List<ItemVisibility> visiManager;
    public Options options;
}
