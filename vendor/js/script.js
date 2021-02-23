// FUNCIONES //
function showProducts(listaDeProductosRecibidos) {
    productsList.innerHTML = '';
    listaDeProductosRecibidos.forEach(function(product) {
        const card = buildProductCard(product);
        productsList.innerHTML += card;
    })
}

function buildProductCard(product) {
    let div = `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
                <img class="card-img-top" src="${product.imagen}" alt="">
                <div class="card-body d-flex" style="align-items:flex-end">
                <div>
                    <h4 class="card-title">${product.nombre}</h4>
                    <h5>$${product.precio}</h5>
                    <p class="card-text">${product.descripcion}</p>
                </div>
                </div>
                <div class="card-footer">
                <button class="btn btn-primary" style="width:100%" data-id=${product.id} onclick="myShoppingCart.addProduct(event)">Agregar al carrito</button>
                </div>
            </div>
        </div>
    `
    return div;
    
}



// INICIALIZACIÓN //
let productsList = document.getElementById('product-container');


showProducts(arrayForSearchTipoJSON);
localStorage.setItem('cart', JSON.stringify(cart));
/*
if(localStorage.getItem('cart')) {
    myShoppingCart.loadStorage();
    
}
*/
