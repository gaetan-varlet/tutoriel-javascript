window.onload = function(){ // lorsque la fenêtre va s'afficher

    var canvasWidth = 900
    var canvasHeight = 600
    var blockSize = 30
    var ctx
    var delay = 100 // temps exprimé milliseconde
    var snakee

    init()

    function init(){
        var canvas = document.createElement('canvas') // élément HTML5 qui permet de dessiner sur la page
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        canvas.style.border="1px solid"
        document.body.appendChild(canvas) // permet d'accrocher le canvas à la page HTML
        ctx = canvas.getContext('2d') // pour dessiner dans le Canvas, on a besoin du contexte
        snakee = new Snake([[6,4], [5,4], [4,4]], "right") // la tête du serpent est défini en premier
        refreshCanvas()
   }

    function refreshCanvas(){
        // permet d'effacer le canvas avant de le recréer juste après à sa nouvelle position
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        snakee.advance()
        snakee.draw()
        setTimeout(refreshCanvas, delay) // exécute une fonction ou un code donné après la fin du délai indiqué
    }

    function Snake(body, direction){
        this.body = body
        this.direction = direction        
        this.draw = function(){
            ctx.save() // sauvegarde du contexte dans son état actuel avant de le modifier
            ctx.fillStyle="#ff0000"
            for(var i=0 ; i < this.body.length ; i++){
                drawBlock(ctx, this.body[i]) // pour chaque bloc du corps du serpent, on le dessine
            }
            ctx.restore() // permet de remettre le contexte comme il était avant

        }
        this.advance = function(){
            var nextPosition = this.body[0].slice()
            if(this.direction === "left"){
                nextPosition[0] -= 1
            } else if(this.direction === "right"){
                nextPosition[0] += 1 // permet de faire avancer la tête de 1 horizontalement
            } else if(this.direction === "down"){
                nextPosition[1] += 1
            } else if(this.direction === "up"){
                nextPosition[1] -= 1
            } else {
                throw("Invalid Direction")
            }
            this.body.unshift(nextPosition) // ajoute la nouvelle tête au début du corps du serpent
            this.body.pop() // enlève le dernier élément
        }
        this.setDirection = function(newDirection){
            var allowedDirection
            if(this.direction === "left" || this.direction === "right"){
                allowedDirection = ["up", "down"]
            } else if(this.direction === "up" || this.direction === "down"){
                allowedDirection = ["left", "right"]
            } else {
                throw("Invalid Direction")
            }

            if(allowedDirection.indexOf(newDirection)>-1){
                this.direction = newDirection
            }
        }
    }

    function drawBlock(ctx, position){
        var x = position[0] * blockSize
        var y = position[1] * blockSize
        ctx.fillRect(x, y, blockSize, blockSize)
    }

    document.onkeydown = function handleKeyDown(e){
        var newDirection
        var key = e.keyCode
        if(key === 37){
            newDirection = "left"
        } else if(key === 38){
            newDirection = "up"
        } else if(key === 39){
            newDirection = "right"
        } else if(key === 40){
            newDirection = "down"
        } else {
            return
        }
        snakee.setDirection(newDirection)
    }


}