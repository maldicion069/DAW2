// check de los rangos
function checkRango(max, min) {
    if ($.isNumeric(max) && $.isNumeric(min)) {
        if (max < 0 || min < 0) {
            alert("Introduzca cantidades numéricas positivas.");
        } else {
            return 1; // los dos números son positivos y correctos
        }
    } else if ($.isNumeric(max) && min === "") {
        return 0; // solo el máximo ha sido introducido
    } else if ($.isNumeric(min) && max === "") {
        return -1; // solo el mínimo ha sido introducido
    } else {
        alert("Introduzca números positivos o dejelo en blanco para realizar búsqueda.");
    }
}

// filtrado de productos de "x" precio                
function productosRangoPrecio(maxPrice, minPrice, max) {
    var opt = checkRango(maxPrice, minPrice);

    if (opt === 0 || opt === -1 || opt === 1) {
        var prods = new Array();
        var precio;
        var x = 0;

        for (var i = 0; i < max; i++) {
            precio = $('.price_' + i).text();

            switch (opt) {
                case 1: // productos con rango entre minimo y maximo
                    if ((precio - minPrice >= 0) && (precio - maxPrice <= 0)) {
                        prods[x] = i;
                        x++;
                    }
                    break;
                case 0: //productos con rango maximo
                    if (precio - maxPrice <= 0) {
                        prods[x] = i;
                        x++;
                    }
                    break;
                case -1: // productos con rango minimo
                    if (precio - minPrice >= 0) {
                        prods[x] = i;
                        x++;
                    }
                    break;
                default: //alert("No hay productos con ese rango de precio");
            }
        }
        ;
        if (prods.length === 0)
            globalVar = true;
        return prods;
    }
}

// filtrado de productos de "x" nombre
function productosNombre(nombre, max) {
    var prods = new Array();
    var x = 0;
    for (var i = 0; i < max; i++) {
        if ($('.name_' + i).text().match(nombre)) {
            prods[x] = i;
            x++;
        }
    }
    ;
    if (prods.length === 0)
        globalVar = true;
    return prods;
}

// filtrado de productos de "x" tipo
function productosTipo(tipo, max) {
    var prods = new Array();
    var x = 0;

    for (var i = 0; i < max; i++) {
        if ($('.type_' + i).text() === tipo) {
            prods[x] = i; //prods.push($('.prod_' + i).text());  
            x++;
        }
    }
    ;
    if (prods.length === 0)
        globalVar = true;
    return prods;
}

//elimina elementos no duplicados y se queda con los duplicados
function eliminarDuplicadosADos(productos) {
    var prodsFinal = new Array();

    for (var i = 0; i < productos.length - 1; i++) {
        if (productos[i] === productos[i + 1]) {
            if (!checkElementInside(prodsFinal, productos[i])) {
                prodsFinal.push(productos[i]);
            }
        }
    }
    return prodsFinal;
}

//elimina elementos no duplicados y se queda con los duplicados
function eliminarDuplicadosATres(productos) {
    var prodsFinal = new Array();

    for (var i = 0; i < productos.length - 2; i++) {
        if (productos[i] === productos[i + 1] && productos[i] === productos[i + 2]) {
            prodsFinal.push(productos[i]);
        }
    }
    return prodsFinal;
}

// mira si un numero esta en un array
function checkElementInside(prods, num) {
    var sw = false;

    if (prods.lenght > 0) {
        for (var i = 0; i < prods.lenght; i++) {
            if (prods[i] === num) {
                sw = true;
            } else {
                sw = false;
            }
        }
    } else {
        sw = false;
    }
    return sw;
}

function mostrarProductos(productos, max) {
    clearAll();
    var x = 0;
    for (var i = 0; i < max; i++) {
        if (productos[x] !== i) {
            $('.prod_' + i).css('display', 'none');
        } else {
            $('.prod_' + i).css('display', 'block');
            x++;
        }
    }
    ;
    //$("#filtroTipo").val(filtroOptionSelected); // restablece el tipo, ya que limpiamos previamente
}

// limpia todos los inputs y restablece los productos
function clearAll() {
    var max = $(".thumbnail").length;
    for (var i = 0; i < max; i++) {
        $('.prod_' + i).css('display', 'block');
    }
    $("#filtroPrecioMin").val('');
    $("#filtroPrecioMax").val('');
    $("#filtroNombre").val('');
    $("#filtroTipo").val("");
    $("#noprods").css('display', 'none');
}

var globalVar = false;
$(document).ready(function() {
    // show/hidden div de filtrado
    $("#showfiltro").click(function() {
        $("#filtroBusqueda").toggle();
        var propiedad = $("#filtroBusqueda").css('display');

        if (propiedad === 'block') {
            $("#showfiltro").text("Ocultar filtro");
        } else {
            $("#showfiltro").text("Mostrar filtro");
        }
    });

    // limpia opciones elegidas y/o texto introducido al pulsar botón
    $("#btnClean").click(function() {
        clearAll();
    });

    $("#btnSubmit").click(function() {
        var max = $(".thumbnail").length; //numero max productos
        var filtroName = $('#filtroNombre').val(); // campo de filtrado de nobmre
        var filtroMax = $('#filtroPrecioMax').val(); // campo de filtrado de precio maximo
        var filtroMin = $('#filtroPrecioMin').val(); // campo de filtrado de precio minimo
        var filtroOptionSelected = $("#filtroTipo").val(); //variable para la seleccion de tipo producto en el combobox

        /*if((filtroOptionSelected && filtroName) === ""){
         cleanAll();
         } else { */
        var prodsTipo = new Array();
        var prodsName = new Array();
        var prodsRange = new Array();
        var result = new Array();

        if (filtroOptionSelected !== "") {
            prodsTipo = productosTipo(filtroOptionSelected, max);
        }

        if (filtroName !== "") {
            prodsName = productosNombre(filtroName, max);
        }

        if (filtroMax !== "" || filtroMin !== "") {
            prodsRange = productosRangoPrecio(filtroMax, filtroMin, max);
        }

        if ((prodsTipo.length > 0) && (prodsName.length > 0) && (prodsRange.length > 0)) {
            result = $.merge(prodsTipo, prodsName);
            result = $.merge(result, prodsRange);
            result.sort();
            result = eliminarDuplicadosATres(result);
            mostrarProductos(result, max);
        } else if ((prodsTipo.length > 0) && (prodsName.length > 0)) {
            result = $.merge(prodsTipo, prodsName);
            result.sort();
            result = eliminarDuplicadosADos(result);
            mostrarProductos(result, max);
        } else if ((prodsTipo.length > 0) && (prodsRange.length > 0)) {
            result = $.merge(prodsTipo, prodsRange);
            result.sort();
            result = eliminarDuplicadosADos(result);
            mostrarProductos(result, max);
        } else if ((prodsName.length > 0) && (prodsRange.length > 0)) {
            result = $.merge(prodsName, prodsRange);
            result.sort();
            result = eliminarDuplicadosADos(result);
            mostrarProductos(result, max);
        } else if (prodsTipo.length > 0 && !globalVar) {
            mostrarProductos(prodsTipo, max);
        } else if (prodsName.length > 0 && !globalVar) {
            mostrarProductos(prodsName, max);
        } else if (prodsRange.length > 0 && !globalVar) {
            mostrarProductos(prodsRange, max);
        } else {
            mostrarProductos(new Array(), max);
            $("#noprods").css('display', 'block');
        }

        // ocultamos el filtro
        $("#filtroBusqueda").toggle();
        $("#showfiltro").text("Mostrar filtro");
        // } //fin if comprobacion todo vacio

    }); // fin click boton submit 
});//fin document ready