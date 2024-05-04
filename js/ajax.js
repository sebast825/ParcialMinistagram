const containerFotos = document.querySelector(".containerFotos");

const URLproductos =
  "https://66252bda04457d4aaf9e131e.mockapi.io/api/v1/productos";
let productos = [];

function retornarFilaHTML(data) {
  return `
  <div class="card mt-4 ">
  <div class="card-body bg-uno text-white">
    <h5 class="card-title">${data.titulo}</h5>
    <img src="${data.imagen}" class="card-img-top" alt="Imagen">
    <p class="card-text mt-3">${data.fecha}</p> <!-- Agrega mt-3 para un margen superior de tamaño 3 -->
  </div>
</div>

  `;
}
function retornarFotoDefault() {
  return `
  <div class="card mt-4 ">
  <div class="card-body bg-uno text-white">
    <h5 class="card-title">Pepe</h5>
    <img src="img/sapo.jpg" class="card-img-top" alt="Imagen">
    <p class="card-text mt-3">Desde los comienzos estuvo, no hay fecha.</p> <!-- Agrega mt-3 para un margen superior de tamaño 3 -->
  </div>
</div>

  `;
}
function obtenerProductos() {
  fetch(URLproductos)
    .then((response) => {
      // operador ternario como alternativa
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("No se pueden obtener los datos del servidor.");
      }
    })
    .then((data) => {
      productos.push(...data);
      console.log(productos.length  > 0)
      console.log(productos);
    })
    .then(() => {
      if (productos.length > 0) {
        console.log("aca")
        productos.forEach(
          (producto) => (containerFotos.innerHTML += retornarFilaHTML(producto))
        )
        
      }
      else{
        containerFotos.innerHTML += retornarFotoDefault()
      }
    })
    .catch((error) => {
      ToastIt.now({
        message: error.message,
        style: "error",
        timer: 3700,
        close: true,
      });
    });
}
function guardarFoto(data, callback) {
  // Validación de datos
  const nuevoProducto = {
    imagen: data.imagen,
    fecha: data.fecha,
    titulo: data.titulo,
  };
  const opciones = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(nuevoProducto),
  };

  fetch(URLproductos, opciones)
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        throw new Error("No se puede crear el recurso.");
      }
    })
    .then((data) => {
      // Si se proporciona un callback, se llama después de que se completa el guardado
      if (callback) {
        callback();
      }
      // Actualizar productos y mostrar el ID en inputCodigo
      obtenerProductos();
      inputCodigo.value = data.id;
    })
    .catch((error) => {
      // Manejo de errores
      ToastIt.now({
        message: error.message,
        style: "error",
        timer: 3700,
        close: true,
      });
    });
}



function convertirImagenAbase64(img = imagen) {
  const canvas = document.createElement("canvas");
  canvas.width = imagen.width;
  canvas.height = imagen.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/webp");
}

