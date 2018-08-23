import Snake from "./snake.js"
import Apple from "./apple.js"
import Drawing from "./drawing.js"


export default class Game{

    constructor(canvasWidth = 900, canvasHeight = 600){
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.blockSize = 30
        this.canvas = document.createElement('canvas') // élément HTML5 qui permet de dessiner sur la page
        this.ctx = this.canvas.getContext('2d') // pour dessiner dans le Canvas, on a besoin du contexte
        this.delay = 100 // temps exprimé milliseconde
        this.widthInBlocks = this.canvasWidth/this.blockSize
        this.heightInBlocks = this.canvasHeight/this.blockSize
        this.centreX = this.canvasWidth / 2
        this.centreY = this.canvasHeight / 2
        this.snakee
        this.applee
        this.score
        this.timeout
    }

    init(){
        this.canvas.width = this.canvasWidth
        this.canvas.height = this.canvasHeight
        this.canvas.style.border="30px solid grey"
        this.canvas.style.margin = "30px auto 10px auto"
        this.canvas.style.display = "block"
        this.canvas.style.backgroundColor = "#ddd"
        document.body.appendChild(this.canvas) // permet d'accrocher le canvas à la page HTML
        this.launch()
    }

    launch(){
        this.snakee = new Snake("right", [6,4], [5,4], [4,4]) // la tête du serpent est défini en premier
        this.applee = new Apple()
        this.score = 0
        clearTimeout(this.timeout)
        this.refreshCanvas()
    }

    refreshCanvas(){
        this.snakee.advance()
        if(this.snakee.checkCollision(this.widthInBlocks, this.heightInBlocks)){
            Drawing.gameOver(this.ctx, this.centreX, this.centreY)
        } else {
            if(this.snakee.isEatingApple(this.applee)){
                this.score++
                this.snakee.ateApple = true
                do {
                    this.applee.setNewPosition(this.widthInBlocks, this.heightInBlocks)
                } while(this.applee.isOnSnake(this.snakee))
            }
            // permet d'effacer le canvas avant de le recréer juste après à sa nouvelle position
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
            Drawing.drawScore(this.ctx, this.centreX, this.centreY, this.score)
            Drawing.drawSnake(this.ctx, this.blockSize, this.snakee)
            Drawing.drawApple(this.ctx, this.blockSize, this.applee)
            this.timeout = setTimeout(this.refreshCanvas.bind(this), this.delay) // exécute une fonction ou un code donné après la fin du délai indiqué
        }
    }

}