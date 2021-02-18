let carrito = [];
if (localStorage.getItem("carrito") != null) {
  let itemsCarrito = JSON.parse(localStorage.getItem("carrito"));
  carrito = itemsCarrito; 
}

class Repuesto{
  constructor(Nombre, Precio, Imagen, Descripcion){
    this.nombre = Nombre;
    this.precio = Precio;
    this.imagen = Imagen;
    this.descripcion = Descripcion;
  }
}

let repuesto1 = new Repuesto("0584009810", 50, "./img/0584009810.jpg", "Contacto para motor elctrónico 48v");
let repuesto2 = new Repuesto("MD343563", 15, "./img/60011961 SEAL,OIL-CRANKCASE MD343563.jpg", "Reten transmision automatica 2.5T");
let repuesto3 = new Repuesto("MD972457", 75, "./img/60014172 WATER PUMP KIT MD972457 (HELMAR) (S).jpg", "Bomba de agua motor diesel 2.5T");
let repuesto4 = new Repuesto("RL485305", 25, "./img/60038110 SENSOR,STEER STOP RL485305.jpg", "Sensor de proximidad");
let repuesto5 = new Repuesto("RL483133", 45, "./img/60038555 WIRE SET RL483133.jpg", "Cableadro electrónico manillar");
let repuesto6 = new Repuesto("91B2402600", 30, "./img/91B2402600.jpg", "Engranaje de bomba 2.5T");

let listaRepuestos = [
  repuesto1,
  repuesto2,
  repuesto3,
  repuesto4,
  repuesto5,
  repuesto6,
];

let items = ``;
for (let i=0; i<listaRepuestos.length; i++){
  items += `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card h-100">
        <img class="card-img-top" src="${listaRepuestos[i].imagen}" alt="">
        <div class="card-body d-flex" style="align-items:flex-end">
          <div>
            <h4 class="card-title">${listaRepuestos[i].nombre}</h4>
            <h5>$${listaRepuestos[i].precio}</h5>
            <p class="card-text">${listaRepuestos[i].descripcion}</p>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary" style="width:100%" onclick='agregarAlCarrito(${JSON.stringify(listaRepuestos[i])})'>Agregar al carrito</button>
        </div>
      </div>
    </div>
    `;
}
$("#productos").html(items);

function agregarAlCarrito(producto){
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  let itemsCarrito = ``;
  for (let i=0; i<carrito.length; i++){
  itemsCarrito += `
    <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100" id="item">
            <img class="card-img-top" src="${carrito[i].imagen}" alt="">
            <div class="card-body d-flex" style="align-items:flex-end">
                <div>
                    <h4 class="card-title">${carrito[i].nombre}</h4>
                    <h5>$${carrito[i].precio}</h5>
                    <p class="card-text">${carrito[i].descripcion}</p>
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary" style="width:100%" onclick='borrarUnProducto(${JSON.stringify(carrito[i])})'>Eliminar</button>
            </div>
        </div>
    </div>
    `;
  }
  $("#carrito").html(itemsCarrito);

  /*
  let items = 0;  
  for (let i=0; i<carrito.length; i++){
    items += carrito[i].precio;
  } 
  document.getElementById("total").innerHTML = "El precio total es $ " + items;
  */
}

function borrarUnProducto(){
  const nuevoCarrito = [];
  for (let i = 0; i < carrito.length; i++) {
    if (i != 0) {
      nuevoCarrito.push(carrito[i]);
    }
  }
  localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  carrito = nuevoCarrito;
  $('#item').remove();
}