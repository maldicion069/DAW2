
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import others.Controller;
import others.PageTemplate;
import others.TreeView;

public class Contact extends Controller {
    private static final long serialVersionUID = 6106269076155338046L;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<String> ltv = new LinkedList<String>();
        ltv.add("Contacto");
        TreeView tv = new TreeView(ltv, "fa-dashboard");
        
        List<String> footer = new LinkedList<String>();
        
        PageTemplate pt = new PageTemplate("contact.jsp", "contact", tv, null, footer, null, "", true, "Contacto");
        request.getSession().setAttribute("templatepage", pt);
        
        getServletContext().getRequestDispatcher("/templates/template.jsp").forward(request, response);
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
}
