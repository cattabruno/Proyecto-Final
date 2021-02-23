function ShoppingCart() {
    let cart = [];
    
    this.addProduct = function(event) {
        const addtocart = arrayForSearchTipoJSON.find(product => product.id == event.target.dataset.id);
        cart.push(addtocart);
        console.log(addtocart);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(localStorage);
        let items = ``;
        for (let i=0; i<cart.length; i++){ 
        items += `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
                <img class="card-img-top" src="${cart[i].imagen}" alt="">
                <div class="card-body d-flex" style="align-items:flex-end">
                <div>
                    <h4 class="card-title">${cart[i].nombre}</h4>
                    <h5>$${cart[i].precio}</h5>
                    <p class="card-text">${cart[i].descripcion}</p>
                </div>
                </div>
                <div class="card-footer">
                <button class="btn btn-primary" style="width:100%" data-id=${cart[i].id} onclick="">Quitar</button>
                </div>
            </div>
        </div>
        `;
        }
        $("#cart").html(items);
        
    }
   

    /*
    this.getTotal = function() {
        TOTAL = 0;
        cart.forEach(product => {
            TOTAL += product.price
        })
        return TOTAL;
    }
    */
   
    this.loadStorage = function() {
        cart = JSON.parse(localStorage.getItem('cart'));
        
    }

    
}

let myShoppingCart = new ShoppingCart();
