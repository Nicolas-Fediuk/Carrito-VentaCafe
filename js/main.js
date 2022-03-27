//nav
const botonNavBar = document.querySelector("#nav-bar");
const navBar = document.querySelector(".nav-action");
const buscadorHtml = document.querySelector(".buscadorHtml");

//carrito , ventana, favoritos y buscador
const carrito = document.querySelector(".carrito");
const btnCarrito = document.querySelector("#carrito");
const buscador = document.querySelector("#buscador");
const Afavorito = document.querySelector("#Afavorito");
const favorito = document.querySelector(".favorito");
const btnFavorito = document.querySelector("#btnFavorito");
const buscadorInput = document.querySelector("#buscadorInput");

//carrito Tazas
const contenedorCarrito = document.querySelector(".carrito table tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listarTaza = document.querySelector("#agrega-taza-carrito");
const borrarTaza = document.querySelector("#vaciar-carrito");
const contenedorFavorito = document.querySelector(".favorito table tbody");

//carrito cafe
const listarCafe = document.querySelector("#agregar-cafe-carrito");

let articuloCarrito = [];
let articuloFavorito = [];

cargarEventListeners();

//funciones

function cargarEventListeners(){
    //navBar
    botonNavBar.addEventListener("click",mostrarNav);

    //busscador
    buscador.addEventListener("click",mostrarBuscador);

    //carrito
    btnCarrito.addEventListener("click",mostrarCarrito);

    //carrito taza
    listarTaza.addEventListener("click",agregarTaza);

    //carrito Cafe
    listarCafe.addEventListener("click", agregarCafe);

    btnFavorito.addEventListener("click", agregarFavorito);

    Afavorito.addEventListener("click",mostrarFavorito);

    //eliminar del carrito
    contenedorCarrito.addEventListener("click", eliminarProducto);

    //buscador
    buscadorInput.addEventListener("input",mostrarBuscadorHtml);

    //muestra los productos del localStorage
    document.addEventListener("DOMContentLoaded", ()=>{
        articuloFavorito = JSON.parse(localStorage.getItem("favorito")) || [];

        favoritoCafeHtml();
    });

    //vaciar el carrito
    borrarTaza.addEventListener("click", (e) =>{
        e.preventDefault();
        articuloCarrito = [];
        limpiarHtml();
    });

}

function mostrarBuscador(){
    if(buscadorHtml.style.display == "none"){
        buscadorHtml.style.display = 'block';
        carrito.style.display = "none";
        favorito.style.display = "none";
    }
    else{
        buscadorHtml.style.display = 'none';
    }
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
        buscadorHtml.style.display = 'none';
        favorito.style.display = "none";
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
function limpiarHtmlFavorito(){
    while(contenedorFavorito.firstChild){
        contenedorFavorito.removeChild(contenedorFavorito.firstChild);
    }
}

function mostrarFavorito(){
    if(favorito.style.display == "none"){
        favorito.style.display = "block";
        carrito.style.display = "none";
        buscadorHtml.style.display = 'none';
    }
    else{
        favorito.style.display = "none";
    }
}

function agregarFavorito(e){

    e.preventDefault();

    if(e.target.classList.contains("AfavoritoProducto")){

        const cafeSeleccionado=e.target.parentElement.parentElement;

        leerDatosCafeFavorito(cafeSeleccionado);
    }
}

function leerDatosCafeFavorito(cafe){

    const infoCafe = {
        imagen: cafe.querySelector("img").src,
        titulo: cafe.querySelector("h4").textContent,
        precio: cafe.querySelector(".producto-precio p:first-of-type").textContent,
        id: cafe.querySelector("a").getAttribute("data-id"),
    };

    const existe = articuloFavorito.some(cafe => cafe.id === infoCafe.id);

    if(existe === false){
        articuloFavorito = [...articuloFavorito,infoCafe];
        
    }
    else{
        return true;
    }

    favoritoCafeHtml();
}

function favoritoCafeHtml(){

    limpiarHtmlFavorito();


    articuloFavorito.forEach(cafe =>{
        const{imagen,titulo,precio,id} = cafe;
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
                <a href="#" class="borrarFavorito" data-id="${id}">X</a>
            </td>
        `;
        contenedorFavorito.appendChild(row);

        if(articuloFavorito.length > 0){
            const btnBorrarFavorito = document.querySelector(".borrarFavorito");
            articuloFavorito.forEach(cafe =>{
                btnBorrarFavorito.onclick = () =>{
                    borrarCafe(cafe.id);
                };
            });
        }
        
    });

    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem("favorito",JSON.stringify(articuloFavorito));
}

function borrarCafe(id){
    articuloFavorito = articuloFavorito.filter(cafe => cafe.id !== id);
    favoritoCafeHtml();
}

function mostrarBuscadorHtml(e){
    if (e.target.value === mainBuscador){
        console.log("si");
    }
}







