const containerFotos = document.querySelector(".container");

const URLproductos =
  "https://66252bda04457d4aaf9e131e.mockapi.io/api/v1/productos";
let productos = [];

function retornarFilaHTML(data) {
  return `<div>
            <p>${data.fecha}</p>
            <p>${data.titulo}</p>
            <img src='${data.imagen}' alt=''> 
           
            </div>`;
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
      console.log(productos);
    })
    .then(() => {
      if (productos.length > 0) {
        productos.forEach(
          (producto) => (containerFotos.innerHTML += retornarFilaHTML(producto))
        );
        agregarClickEditarProducto();
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

function guardarFoto(data) {
  // debemos realizar la validación de datos: OK
  console.log(data);
  const nuevoProducto = {
    imagen: data.imagen,
    fecha: data.fecha,
    titulo: data.titulo,
  };
  console.log("asd");
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
      obtenerProductos();
      inputCodigo.value = data.id;
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
