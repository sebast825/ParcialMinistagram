const btnCapturar = document.querySelector("button#btnCapturar")
const imagen = document.querySelector("img#imgCamera")
const formulario = document.querySelector(".formulario")

const canvaElem = document.querySelector(".canvaElem")

const inputCamera = document.createElement("input")
    inputCamera.type = "file"
    inputCamera.id = "inputCamera"
    inputCamera.accept = "camera"
    inputCamera.capture = "environment-facing"


btnCapturar.addEventListener("click", (e)=> {
    e.preventDefault()
    inputCamera.click()
    
})

//muestra la foto FE
inputCamera.addEventListener("change", ()=> {
    if (inputCamera.value !== "") {
        imagen.src = URL.createObjectURL(inputCamera.files[0]) // BLOB: Big Large OBject
    }
})



