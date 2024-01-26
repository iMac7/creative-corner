import base64img from './img.js'
const canvas = document.getElementById('intro')
const ctx = canvas.getContext('2d')

canvas.width = 800
canvas.height = 450

const image1 = new Image()

image1.src = base64img

image1.addEventListener('load', function(){
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height)
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const scannedData =  scannedImage.data
    for (let i = 0; i < scannedData.length; i += 4) {
        const total = scannedData[i] + scannedData[i+1] + scannedData[i+2]
        const avg = total / 3
        scannedData[i] = avg * 0
        scannedData[i+1] = avg
        scannedData[i+2] = avg
    }

    // scannedImage.data = scannedData
    const newScannedImage = new ImageData(scannedImage.data, scannedImage.width, scannedImage.height)
    ctx.putImageData(newScannedImage, 0, 0)
})








