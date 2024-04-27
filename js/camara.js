// <input type="file" name="" id="inputFile" multiple accept="camera" capture="user">

const btnCapturar = document.querySelector("button#btnCapturar")
const imagen = document.querySelector("img#imgCamera")

const inputCamera = document.createElement("input")
    inputCamera.type = "file"
    inputCamera.id = "inputCamera"
    inputCamera.accept = "camera"
    inputCamera.capture = "environment-facing"

btnCapturar.addEventListener("click", ()=> {
    inputCamera.click()
    
})

inputCamera.addEventListener("change", ()=> {
    if (inputCamera.value !== "") {
    
      
        imagen.src = URL.createObjectURL(inputCamera.files[0]) // BLOB: Big Large OBject
        console.log(imagen)
    }
})

function convertirImagenAbase64() {
    const canvas = document.createElement("canvas")
          canvas.width = imagen.width
          canvas.height = imagen.height
    const ctx = canvas.getContext("2d")
          ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height)
          // document.querySelector("body").appendChild(canvas)
          return canvas.toDataURL("image/jpeg")    
}

console.log(convertirImagenAbase64())