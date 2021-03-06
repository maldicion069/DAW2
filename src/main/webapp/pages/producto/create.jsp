<%@taglib prefix="t" uri="http://java.sun.com/jsp/jstl/core" %>
    <t:choose>
        <t:when test="${not empty ok}">
            <div class="alert alert-success">
                ${ok}
            </div>
            Actualizado con �xito. Pulsa <a href="AdminController?action=list">aqu�</a> para volver al listado de productos.
        </t:when>
        <t:otherwise>
            <t:if test="${not empty error}">
            <div class="alert alert-danger">
                ${error}
            </div>
            </t:if>
            <form role="form" method="post" action="ProductoController" enctype="multipart/form-data">
                <input type="hidden" name="action" id="action" value="insert" />
                <div class="form-group">
                    <label for="namefield">Nombre producto</label><input type="text" class="form-control" id="namefield" name="namefield" value="${name}"/>
                </div>
                <div class="form-group">
                    <select class="form-control" name="categoryfield" id="categoryfield">
                        <option value="">----</option>
                        <option value="Alimentaci�n">Alimentaci�n</option>
                        <option value="Droguer�a">Droguer�a</option>
                        <option value="Prensa">Prensa</option>
                        <option value="Ferreter�a">Ferreter�a</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="pricefield">Precio</label><input type="text" class="form-control" id="pricefield" name="pricefield" value="${price}"/>
                </div>
                <div class="form-group">
                    <label for="filefield">Foto</label><input type="file" id="file" name="file"/>
                    <!--<label for="file_routefield">Foto producto</label><input type="text" class="form-control" id="file_routefield" name="file_routefield" value="${photo}"/>-->
                </div>
                <button type="submit" class="btn btn-default">Submit</button>

            </form>
        </t:otherwise>
    </t:choose>