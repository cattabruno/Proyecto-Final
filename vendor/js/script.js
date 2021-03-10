//Inicializacion 
let productList = $('#product-list');
let carritoList = $('#product-cart');
let totalShopFooter = $('#total-shop');
let borrarCompra = $('#erase');
let erase = $("#erase").click(eraseTabla);
let finalizarCompra = $("#fin").click(eraseTabla);
cart.inicializarCart();
showProduct(listaDeProductos);

//Muestra los productos
function showProduct(listaDeProductos) {
    productsList = '';
    listaDeProductos.forEach(producto => {
        const card = buildProductoCard(producto);
        productsList += card;
        $('#product-list').html(productsList)
    });
}

//Constructor de productos
function buildProductoCard(producto) {
    let div = `
    <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100">
            <img class="card-img-top" src="${producto.imagen}" alt="">
            <div class="card-body d-flex" style="align-items:flex-end">
            <div>
                <h4 class="card-title">${producto.nombre}</h4>
                <h5>USD ${producto.precio}</h5>
                <p class="card-text">${producto.descripcion}</p>
            </div>
            </div>
            <div class="card-footer">
            <button class="btn btn-primary comprar" style="width:100%" onclick='cart.comprar(${producto.id})'>Agregar al carrito</button>
            </div>
        </div>
    </div>
    `
    return div;
}

//Animacion de boton carrito
$("button").click(function(){
    $("#animacion").animate({
        right: '400px'
    });
});  

//Busca Producto por id del archivo JSON
function buscarProducto(id) {
    for (let product of listaDeProductos) {
        if (product.id == id)
        return product
    }
    return null;
}

//Actualiza modal del carrito con productos agregados
function actualizarTablaCompra() {
    let linea1 = '';
    let linea2 = '';
    for (let compra of cart.compras) {
        linea1 += 
        `<tr>
            <th scope="row">${compra.producto.id}</th>
            <th scope="row">${compra.producto.nombre}</th>
            <td>${compra.producto.descripcion}</td>
            <td>USD ${compra.producto.precio}</td>
            <td>${compra.cantidad} un</td>
        </tr>`

        linea2 = 
        `<tr>
            <th scope="row">TOTAL</th>
            <td></td>
            <td></td>
            <td>USD ${cart.totalShop()}</td>
            <td>Cantidad de items ${cart.totalQuantity()} un</td>
        </tr>`
    }
    $('#product-cart').html(linea1);
    $('#total-shop').html(linea2);
}

//Vacia el carrito
function eraseTabla() {
    cart.eraseCartShop();
    $('#product-cart').html('');
    $('#total-shop').html(
    `<tr>
        <th scope="row">N/A</th>
        <td>N/A</td>
        <td>USD 0</td>
        <td> 0 </td>
    </tr>`);
}

//Ajax de valor de moneda dolar 
fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then(respuesta => respuesta.json())
    .then(respuestaDecodificada => {
        const precioDolarHoy = respuestaDecodificada[0].casa.venta;
        $('#resultado').text(precioDolarHoy); 
    });