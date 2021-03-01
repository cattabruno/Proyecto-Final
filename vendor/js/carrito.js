function MyShopCart() {
    this.compras = []
    
    this.addItem = function (compra) {
        this.compras.push(compra);
    }

    this.totalShop = function () {
        let sumaTotal = 0;
        for (let i = 0; i < this.compras.length; i++) {
            let compra = this.compras[i];
            sumaTotal += compra.producto.precio * compra.cantidad;
        }
        return sumaTotal;
    }

    this.inicializarCart = function(){
        if (localStorage.getItem("carrito") != null) {
            let storage = JSON.parse(localStorage.getItem("carrito"));
            this.compras = storage; 
            actualizarTablaCompra();
        }
    }
    
    this.totalQuantity = function () {
        let sumaCantidad = 0;
        for (let i = 0; i < this.compras.length; i++) {
            let compra = this.compras[i];
            sumaCantidad += compra.cantidad;
        }
        return sumaCantidad;
    }

    this.eraseCartShop = function () {
        while (this.compras.length > 0) {
            this.compras.pop();
        }
        localStorage.clear();
    }

    this.comprar = function (id, cantidad = 1) {
        let found = false;
        for (let compra of this.compras) {
            if (compra.producto.id == id) {
                compra.cantidad += cantidad;
                found = true;
                break;
            }
            actualizarTablaCompra();
        }
        if (!found) {
            const product = buscarProducto(id);
            cart.addItem(new Compra(product, 1));
            cart.totalShop();
            cart.totalQuantity();
            localStorage.setItem("carrito", JSON.stringify(this.compras));
            actualizarTablaCompra();
        }
    }
}

var cart = new MyShopCart();

function Compra(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
}