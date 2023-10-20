package ide.dpide.projects;
public class ItemResurces {
    public int itemId;
    public String itemName;
    public String itemValue;
    
    public ItemResurces() {
    }
    
    public ItemResurces(String n, String v) {
        itemName = n;
        itemValue = v;
    }
    
    public ItemResurces(int id, String n, String v) {
        itemId = id;
        itemName = n;
        itemValue = v;
    }
}
