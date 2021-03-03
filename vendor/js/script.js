let allProducts = [];
let productList = document.getElementById('product-list');
let carritoList = document.getElementById('product-cart');
let totalShopFooter = document.getElementById('total-shop');
let borrarCompra = document.getElementById('erase');
let $resultado = document.getElementById('resultado');
let erase = $("#erase").click(eraseTabla);
cart.inicializarCart();

function showProduct(listaDeProductos, list) {
    listaDeProductos.forEach(producto => {
        const card = buildProductoCard(producto);
        list.innerHTML += card;
    });
}

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

function buscarProducto(id) {
    for (let product of allProducts) {
        if (product.id == id)
            return product
    }
    return null;
}

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
            <td>${compra.cantidad}</td>
        </tr>`

        linea2 = 
        `<tr>
            <th scope="row">TOTAL</th>
            <td></td>
            <td></td>
            <td>USD ${cart.totalShop()}</td>
            <td>${cart.totalQuantity()}</td>
        </tr>`
    }
    carritoList.innerHTML = linea1;
    totalShopFooter.innerHTML = linea2;
}

function eraseTabla() {
    cart.eraseCartShop();
    carritoList.innerHTML = '';
    totalShopFooter.innerHTML = 
    `<tr>
        <th scope="row">N/A</th>
        <td>N/A</td>
        <td>USD 0</td>
        <td> 0 </td>
    </tr>`
}

function getData(callback) {
    setTimeout(function () {
        const json = 
        `{"list":
            [
            {
            "id":1,
            "nombre":"0584009810",
            "precio":50,
            "imagen":"./img/0584009810.jpg",
            "descripcion":"Contactor electrónico 48v"     
            },
            {
            "id":2,
            "nombre":"MD343563",
            "precio":15,
            "imagen":"./img/60011961 SEAL,OIL-CRANKCASE MD343563.jpg",
            "descripcion":"Reten transmision automatica 2.5T"   
            },
            {
            "id":3,
            "nombre":"MD972457",
            "precio":75,
            "imagen":"./img/60014172 WATER PUMP KIT MD972457 (HELMAR) (S).jpg",
            "descripcion":"Bomba de agua motor diesel 2.5T"  
            },
            {
            "id":4,
            "nombre":"RL485305",
            "precio":25,
            "imagen":"./img/60038110 SENSOR,STEER STOP RL485305.jpg",
            "descripcion":"Sensor de proximidad"   
            },
            {
            "id":5,
            "nombre":"RL483133",
            "precio":45,
            "imagen":"./img/60038555 WIRE SET RL483133.jpg",
            "descripcion":"Cableadro electrónico manillar"    
            },
            {
            "id":6,
            "nombre":"91B2402600",
            "precio":30,
            "imagen":"./img/91B2402600.jpg",
            "descripcion":"Engranaje de bomba 2.5T"    
            }
            ]             
            }`;
        callback(json);
    }, 2000)
}

function procesarData(json){
    const data = JSON.parse(json);
    for(let list of data.list){
        allProducts.push(list);
    }
    showProduct(data.list, productList);
}

function init(){
    getData(procesarData);
}

init();

fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then(respuesta => respuesta.json())
    .then(respuestaDecodificada => {
        const precioDolarHoy = respuestaDecodificada[0].casa.venta;
        $resultado.textContent = precioDolarHoy;
    });