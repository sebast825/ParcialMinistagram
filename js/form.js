const btnEnviar = document.querySelector("button");
//const formulario = document.querySelector("formulario")
const inputNombre = document.querySelector("#inputNombre");


formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("Se envió el formulario web.");
  data = {
    imagen: convertirImagenAbase64(),
    fecha: obtenerFechaHoraActual(),
    titulo: inputNombre.value,
  };
  guardarFoto(data);
});

function convertirImagenAbase64() {
  const canvas = document.createElement("canvas");
  canvas.width = imagen.width;
  canvas.height = imagen.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height);
  // document.querySelector("body").appendChild(canvas)
  return canvas.toDataURL("image/jpeg");
}

function obtenerFechaHoraActual() {
  const fechaHoraActual = new Date();

  const año = fechaHoraActual.getFullYear();
  const mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, "0");
  const dia = fechaHoraActual.getDate().toString().padStart(2, "0");
  const hora = fechaHoraActual.getHours().toString().padStart(2, "0");
  const minutos = fechaHoraActual.getMinutes().toString().padStart(2, "0");
  const segundos = fechaHoraActual.getSeconds().toString().padStart(2, "0");

  const fecha = `${dia}-${mes}-${año}`;
  const horaString = `${hora}:${minutos}:${segundos}`;

  return `${fecha}, ${horaString}`;
}
