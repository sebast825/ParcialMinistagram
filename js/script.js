const nuevaFoto = document.querySelector("#nuevaFoto");

nuevaFoto.addEventListener("click", ()=>{
   window.location.href = "./formulario.html"
})
document.write("hola mundo")
const imagen = document.querySelector("img#imgCamera")


function convertirImagenAbase64(img = imagen) {
   const canvas = document.createElement("canvas");
   canvas.width = "100px";
   canvas.height = "100px";
   const ctx = canvas.getContext("2d");
   ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
   // document.querySelector("body").appendChild(canvas)
   return canvas.toDataURL("image/webp");
 }


 
obtenerProductos();