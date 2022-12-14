let favoritos = JSON.parse(localStorage.getItem('favoritos'))
let carrito = JSON.parse(localStorage.getItem('carrito'))
const favoritosContainer = document.querySelector(".main__favoritos")
const tabla = favoritosContainer.querySelector(".table")

if (favoritos.length == 0){
    favoritosContainer.innerHTML = `<h1 class="mensaje-no">No hay productos agregados en favoritos</h1>`
}

//agrega los productos almacenados en el localStorage en la tabla.
function agregarProductosAFavEnElDom(){
        favoritos.forEach((producto) =>{
            producto.cantidad = 0;
            const elemento = document.createElement("tbody")
            elemento.innerHTML = `
            <tr>
            <th scope="row">❤</th>
            <td class="table-td"><img src="${producto.img}" style="width:30px;"></td>
            <td class="table-td">${producto.nombre} ${producto.marca.toUpperCase()} ${producto.modelo}</td>
            <td class="table-td">${producto.fecha}</td>
            <td class="table-td"><button class="boton-borrar" id="botonborrar${producto.id}">X</button></td>
            </tr>`
            tabla.appendChild(elemento)
            //borra de favoritos el producto
            const botonBorrarProductos = document.querySelector(`#botonborrar${producto.id}`);
            botonBorrarProductos.addEventListener("click", (e)=>{
                function eliminarProductoFav(e){
                e.preventDefault();
                const botonApretado = e.target;
                botonApretado.parentElement.parentElement.remove()
                eliminarProductosFav(producto.id)
                actualizarFavLocalStorage();
                favoritos = JSON.parse(localStorage.getItem('favoritos'))
            }
            eliminarProductoFav(e);
            if (favoritos.length == 0){
                favoritosContainer.innerHTML = `<h1 class="mensaje-no">No hay productos agregados en favoritos</h1>`
            }
            })
        })
    }

    //ELIMINA EL PRODUCTO EN FAV DEL ARRAY.
function eliminarProductosFav(productoId){
    const producto = favoritos.find((prod) => prod.id === productoId)
    const indiceDelProducto = favoritos.indexOf(producto)
    favoritos.splice(indiceDelProducto, 1)
}

function actualizarFavLocalStorage(){
    const aJSON = JSON.stringify(favoritos);
    localStorage.setItem('favoritos', aJSON)
}


window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('favoritos'))
    if (storage){
        favoritos = storage
        agregarProductosAFavEnElDom();
    }
}

