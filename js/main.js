//nav
const botonNavBar = document.querySelector("#nav-corazon");
const navBar = document.querySelector(".nav-action");

//carrito y ventana
const carrito = document.querySelector(".carrito");
const btnCarrito = document.querySelector("#carrito");

//carrito Tazas
const contenedorCarrito = document.querySelector(".carrito table tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listarTaza = document.querySelector("#agrega-taza-carrito");
const borrarTaza = document.querySelector("#vaciar-carrito");

//carrito cafe
const listarCafe = document.querySelector("#agregar-cafe-carrito");

let articuloCarrito = [];

cargarEventListeners();

//funciones

function cargarEventListeners(){
    //navBar
    botonNavBar.addEventListener("click",mostrarNav);

    //carrito
    btnCarrito.addEventListener("click",mostrarCarrito);

    //carrito taza
    listarTaza.addEventListener("click",agregarTaza);

    //carrito Cafe
    listarCafe.addEventListener("click", agregarCafe )

    //eliminar del carrito
    contenedorCarrito.addEventListener("click", eliminarProducto);

    //vaciar el carrito
    borrarTaza.addEventListener("click", (e) =>{
        e.preventDefault();
        articuloCarrito = [];
        limpiarHtml();
    });

}

function mostrarNav(){
    if(navBar.style.display=="none"){
        navBar.style.display = 'block';
    }
    else{
        navBar.style.display = 'none';
    }
}

function mostrarCarrito(){
    if(carrito.style.display=="none"){
        carrito.style.display = "block";
    }
    else{
        carrito.style.display = "none";
    }
    
}

window.onscroll = () =>{
    navBar.style.display = 'none';
    carrito.style.display = "none";
}

function eliminarProducto(e){
    if(e.target.classList.contains("borrarEnCarrito")){
        const productoId = e.target.getAttribute("data-id");

        articuloCarrito= articuloCarrito.filter(taza => taza.id !== productoId);

        carritoHtml();
    }
}

//carrito taza
function agregarTaza(e){
    e.preventDefault();

    //para agregar al carrito los que tenga el boton 
    if(e.target.classList.contains("Acarrito")){

        //pongo las descripciones de la taza en una variable
        const tazaSeleccionada=e.target.parentElement;

        leerDatosTazas(tazaSeleccionada);
    }
}

//lee el contenido del html al que le dimos click y extre la informacion de la taza
function leerDatosTazas(taza){
    //creo un objeto con el contenido de la taza actual

    const infoTaza = {
        imagen: taza.querySelector("img").src,
        titulo: taza.querySelector("h4").textContent,
        precio: taza.querySelector(".taza-precio p:first-of-type").textContent,
        id: taza.querySelector("input").getAttribute("data-id"),
        cantidad:1
    };

    //revisa si un elemento ya existe en el carrito
    const existe = articuloCarrito.some(taza => taza.id === infoTaza.id);
    if(existe){
        //actualizamos la cantidad
        const tazas = articuloCarrito.map(taza =>{
            if(taza.id === infoTaza.id){
                taza.cantidad++;
                return taza;
            }
            else{
                return taza;
            }
        });
        articuloCarrito = [...tazas];
    }
    else{
        articuloCarrito = [...articuloCarrito,infoTaza];
    }

    carritoHtml();
}

function carritoHtml(){

    limpiarHtml();

    articuloCarrito.forEach(taza =>{
        const{imagen,titulo,precio,cantidad,id} = taza;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${imagen}">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrarEnCarrito" data-id="${id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    })
}

//cafe

function agregarCafe(e){
    e.preventDefault();

    if(e.target.classList.contains("Acarrito")){

        console.log(e.target.parentElement.parentElement);

        const cafeSeleccionado=e.target.parentElement.parentElement;

        leerDatosCafe(cafeSeleccionado);
    }
}

function leerDatosCafe(cafe){

    const infoCafe = {
        imagen: cafe.querySelector("img").src,
        titulo: cafe.querySelector("h4").textContent,
        precio: cafe.querySelector(".producto-precio p:first-of-type").textContent,
        id: cafe.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    };

    const existe = articuloCarrito.some(cafe => cafe.id === infoCafe.id);
    if(existe){
        
        const cafes = articuloCarrito.map(cafe =>{
            if(cafe.id === infoCafe.id){
                cafe.cantidad++;
                return cafe;
            }
            else{
                return cafe;
            }
        });
        articuloCarrito = [...cafes];
    }
    else{
        articuloCarrito = [...articuloCarrito,infoCafe];
    }

    carritoCafeHtml();
}

function carritoCafeHtml(){

    limpiarHtml();

    articuloCarrito.forEach(cafe =>{
        const{imagen,titulo,precio,cantidad,id} = cafe;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${imagen}">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrarEnCarrito" data-id="${id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHtml(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}






