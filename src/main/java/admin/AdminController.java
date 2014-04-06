package admin;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import others.Controller;
import others.PageTemplate;
import others.TreeView;
import pedido.Pedido;
import pedido.PedidoDAO;
import producto.Producto;
import producto.ProductoDAO;

/**
 *
 * @author d
 */
public class AdminController extends Controller {
    
    @Resource(lookup = "jdbc/tienda_crodriguezbe")
    private DataSource ds;
    
    /**
     * Returns a short description of the servlet.
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }
    
    public void actionUser(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        this.checkAccessAdmin(request, response);
        
        
        
        
        
        
    }
    
    public void actionList(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        this.checkAccessAdmin(request, response);
        
        ProductoDAO dao = new ProductoDAO(ds);
        List<Producto> products = dao.getAll();
        if(products == null) {
            products = new ArrayList<Producto>();
        }
        request.setAttribute("products", products);
        List<String> ltv = new LinkedList<String>();
        ltv.add("Administrador");
        ltv.add("Listado productos");
        TreeView tv = new TreeView(ltv, "fa-dashboard");
        
        List<String> footer = new LinkedList<String>();
        footer.add("assets/js/producto/list.js");
        
        PageTemplate pt = new PageTemplate("admin/list.jsp", "", tv, null, footer, null, "", true, "Listar productos");
        request.getSession().setAttribute("templatepage", pt);
        
        getServletContext().getRequestDispatcher("/templates/template.jsp").forward(request, response);
    }    
    
    public void actionPedidos(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        this.checkAccessAdmin(request, response);
        
        PedidoDAO pDao = new PedidoDAO(ds);
        List<Pedido> pedidos = pDao.getAll();
        if(pedidos == null) {
            pedidos = new ArrayList<Pedido>();
        }
        request.setAttribute("pedidos", pedidos);
        List<String> ltv = new LinkedList<String>();
        ltv.add("Administrador");
        ltv.add("Listado pedidos");
        TreeView tv = new TreeView(ltv, "fa-dashboard");
        
        List<String> footer = new LinkedList<String>();
        footer.add("assets/js/producto/list.js");
        
        PageTemplate pt = new PageTemplate("admin/pedidos.jsp", "", tv, null, footer, null, "", true, "Listar pedidos");
        request.getSession().setAttribute("templatepage", pt);
        
        getServletContext().getRequestDispatcher("/templates/template.jsp").forward(request, response);
    }    
}