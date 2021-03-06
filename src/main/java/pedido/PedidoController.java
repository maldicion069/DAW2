package pedido;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import others.Controller;
import others.Functions;
import others.PageTemplate;
import others.TreeView;

public class PedidoController extends Controller {
    
    @Resource(name = "jdbc/tienda_crodriguezbe")
    private DataSource ds;
    
    private static final String ERROR = "error";
    
    public void actionGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        this.checkAccessLogin(request, response);
        
        String id_ped_aux = request.getParameter("id_ped");
        
        int id_user = -1;
        
        //Comprobamos errores
        String error = "";
        if(isAdmin(request)) {
           String id_user_aux = request.getParameter("id_user");
           if(!Functions.isID(id_ped_aux)) {
               error += "<liUsuario incorrecto</li>";
           } else {
               id_user = Integer.parseInt(id_user_aux);
           }
        } else {
            id_user = (Integer)request.getSession(true).getAttribute("id_user");
        }
        
        if(!error.isEmpty()) {
            request.setAttribute(ERROR, error);
        } else {
            int id_ped = Integer.parseInt(id_ped_aux);
            PedidoDAO dao = new PedidoDAO(ds);
            if(dao.haveAccess(id_ped, id_user)) {
                Pedido pedido = dao.get(id_ped);
                if(pedido == null) {
                    request.setAttribute(ERROR, "Pedido no encontrado");
                } else {
                    request.setAttribute("pedido", pedido);
                }
            } else {
                if(isAdmin(request)) {
                    request.setAttribute(ERROR, "El pedido o usuario no existe");
                } else {
                    request.setAttribute(ERROR, "No tienes acceso");
                }
            }
            dao.close();
        }
        //Esto está mal, es para probar : D
        List<String> ltv = new LinkedList<String>();
        ltv.add("Carrito");
        ltv.add("Listar");
        TreeView tv = new TreeView(ltv, "fa-dashboard");
        
        List<String> footer = new LinkedList<String>();
        if(!error.isEmpty()) {
            footer.add("http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.js");
            footer.add("assets/js/carrito/list.js");
        }
        
        PageTemplate pt = new PageTemplate("pedido/show.jsp", "", tv, null, footer, null, "", true, "Nuevo producto");
        request.getSession().setAttribute("templatepage", pt);
        
        getServletContext().getRequestDispatcher("/templates/template.jsp").forward(request, response);
    }
    
}
