const btnGuardar = document.querySelector("button#btnGuardar")


const URLproductos = "https://66252bda04457d4aaf9e131e.mockapi.io/api/v1/productos"

function retornarFilaHTML(producto) {
    return `<tr>
                <td>${producto.id}</td>
                <td>${producto.emoji}</td>
                <td>${producto.nombre}</td>
                <td>$ ${producto.precio}</td>
                <td>${producto.stock}</td>
                <td id="${producto.id}" class="modificar-producto">✍️</td>
                <td id="${producto.id}" class="eliminar-producto">⛔️</td>
            </tr>`
}

function obtenerProductos() {
   fetch(URLproductos)
   .then((response)=> {// operador ternario como alternativa
       if (response.status === 200) {
           return response.json()
       } else {
           throw new Error("No se pueden obtener los datos del servidor.")
       }
   })
   .then((data)=> {
       productos.length = 0
       productos.push(...data)
   })
   .then(()=> {
       if (productos.length > 0) {
           tableBody.innerHTML = ""
           productos.forEach((producto)=> tableBody.innerHTML += retornarFilaHTML(producto))
           agregarClickEditarProducto()
       }
   })
   .catch((error)=> {
       ToastIt.now({
           message: error.message,
           style: 'error',
           timer: 3700,
           close: true
       })
   })
}


btnGuardar.addEventListener("click", ()=> { // debemos realizar la validación de datos: OK
   const nuevoProducto = {
       nombre: "inputNombre.value.trim()",
       emoji: "inputImagen.value.trim()",
      
   }
console.log("asd")
   const opciones = {
       method: 'POST',
       headers: { "content-type": "application/json" },
       body: JSON.stringify(nuevoProducto)
   }

   fetch(URLproductos, opciones)
   .then((response)=> {
       if (response.status === 201) {
           return response.json()
       } else {
           throw new Error("No se puede crear el recurso.")

       }
   })
   .then((data)=> {
       obtenerProductos()
       inputCodigo.value = data.id
   })
   .catch((error)=> {
       ToastIt.now({
           message: error.message,
           style: 'error',
           timer: 3700,
           close: true
       })
   })
})