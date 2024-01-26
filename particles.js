import img from './img.js'

window.addEventListener('load', function() {
    const canvas = document.getElementById('intro')
    const ctx = canvas.getContext('2d')
    canvas.width = 800
    canvas.height = 450

    const image = new Image()
    image.src = img

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect
            // this.x = Math.random() * this.effect.width;
            // this.y = Math.random() * this.effect.height;
            this.x = Math.random() * this.effect.width
            this.y = Math.random() * this.effect.height
            this.size = this.effect.pixelGap;
            // this.vx = Math.random() * .5
            // this.vy = Math.random() * .5
            this.vx = 0
            this.vy = 0
            this.originX = Math.floor(x)
            this.originY = Math.floor(y)
            this.color = color
            this.ease = .1
        }
        draw(context) {
            context.fillStyle = this.color
            context.fillRect(this.x, this.y, this.size, this.size)
        }
        update() {
            this.x += (this.originX - this.x) * this.ease
            this.y += (this.originY - this.y) * this.ease
        }
        
    }

    class Effect {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.particlesArray = []
            this.image = image
            this.centerX = this.width / 2
            this.centerY = this.height / 2
            this.x = this.centerX - this.image.width / 2
            this.y = this.centerY - this.image.height / 2
            this.pixelGap = 5
        }
        init(context) {
            //draw the image, split into rectangular pixels,
            //use pixel coordinates + color to give attributes to every particle
            context.drawImage(this.image, this.x, this.y)
            const pixels = context.getImageData(0, 0, this.width, this.height).data
            console.log('pixels', pixels)

            for (let x = 0; x < this.height; x += this.pixelGap) {
                for(let y = 0; y < this.width; y += this.pixelGap) {
                    //get the index of a particle
                    const index = (x + y * this.width) * 4
                    const r = pixels[index]
                    const g = pixels[index + 1]
                    const b = pixels[index + 2]
                    const a = pixels[index + 3]
                    if (a > 0) {
                        const color = `rgb(${r},${g},${b})`
                        this.particlesArray.push(new Particle(this, x, y, color))
                    }
                }
            }

        }
        draw(context) {
            this.particlesArray.forEach(particle => particle.draw(context))
            // context.drawImage(this.image, this.width/3, this.height/3, 400, 200)         
        }
        update() {
            this.particlesArray.forEach(particle => particle.update())
        }
    }

    const effect = new Effect(canvas.width, canvas.height)
    effect.init(ctx)
    console.log(effect.particlesArray)

    // effect.init()
    // effect.draw(ctx)
    // console.log(effect)

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        effect.draw(ctx)
        effect.update()
        requestAnimationFrame(animate)
    }
    animate()

    // ctx.fillRect(50,30,35,250)
    // ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

})