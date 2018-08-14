window.onload = function(){ // lorsque la fenêtre va s'afficher

    const canvasWidth = 900
    const canvasHeight = 600
    const blockSize = 30
    const canvas = document.createElement('canvas') // élément HTML5 qui permet de dessiner sur la page
    const ctx = canvas.getContext('2d') // pour dessiner dans le Canvas, on a besoin du contexte
    const delay = 100 // temps exprimé milliseconde
    let snakee
    let applee
    const widthInBlocks = canvasWidth/blockSize
    const heightInBlocks = canvasHeight/blockSize
    const centreX = canvasWidth / 2
    const centreY = canvasHeight / 2
    let score
    let timeout

    init()

    function init(){
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        canvas.style.border="30px solid grey"
        canvas.style.margin = "100px auto"
        canvas.style.display = "block"
        canvas.style.backgroundColor = "#ddd"
        document.body.appendChild(canvas) // permet d'accrocher le canvas à la page HTML
        launch()
   }

    function refreshCanvas(){
        snakee.advance()
        if(snakee.checkCollision()){
            gameOver()
        } else {
            if(snakee.isEatingApple(applee)){
                score++
                snakee.ateApple = true
                do {
                    applee.setNewPosition()
                } while(applee.isOnSnake(snakee))
            }
            // permet d'effacer le canvas avant de le recréer juste après à sa nouvelle position
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)
            drawScore()
            snakee.draw()
            applee.draw()
            timeout = setTimeout(refreshCanvas, delay) // exécute une fonction ou un code donné après la fin du délai indiqué
        }
    }

    function Snake(body, direction){
        this.body = body
        this.direction = direction
        this.ateApple = false
        this.draw = function(){
            ctx.save() // sauvegarde du contexte dans son état actuel avant de le modifier
            ctx.fillStyle="#ff0000"
            for(let i=0 ; i < this.body.length ; i++){
                drawBlock(ctx, this.body[i]) // pour chaque bloc du corps du serpent, on le dessine
            }
            ctx.restore() // permet de remettre le contexte comme il était avant

        }
        this.advance = function(){
            const nextPosition = this.body[0].slice() // on peut laisser un const car on change la valeur dans l'objet Array mais on ne change pas d'objet Array
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
            if(!this.ateApple){
                this.body.pop() // enlève le dernier élément si le serpent n'a pas mangé de pomme (si ateApple = false)
                // donc si le serpent a mangé la pomme, il va grandir de 1 bloc
            } else { // si le serpent a mangé la pomme (si ateApple = true), on repasse à false ateApple pour que le serpent ne grandisse plusau prochain déplacement
                this.ateApple = false
            }
        }
        this.setDirection = function(newDirection){
            let allowedDirection
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
        this.checkCollision = function(){
            let wallCollision = false
            let snakeCollision = false
            const head = this.body[0]
            const rest = this.body.slice(1)
            const snakeX = head[0]
            const snakeY = head[1]
            const minX = 0
            const minY = 0
            const maxX = widthInBlocks -1
            const maxY = heightInBlocks -1
            const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX
            const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY

            if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls){
                wallCollision = true
            }

            for(let i = 0; i < rest.length ; i++){
                if(snakeX === rest[i][0] && snakeY === rest[i][1] ){
                    snakeCollision = true
                }
            }

            return wallCollision || snakeCollision // retourne true si un des deux est true
        }
        this.isEatingApple = function(appleToEat){
            const head = this.body[0]
            if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]){
                return true
            } else {
                return false
            }
        }
    }

    function Apple(position){
        this.position = position
        this.draw = function(){
            const radius = blockSize / 2
            const x = this.position[0] * blockSize + radius
            const y = this.position[1] * blockSize + radius
            ctx.save()
            ctx.fillStyle = "#33cc33"
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, Math.PI*2, true)
            ctx.fill()
            ctx.restore()
        }
        this.setNewPosition = function(){
            const newX = Math.round(Math.random() * (widthInBlocks - 1))
            const newY = Math.round(Math.random() * (heightInBlocks - 1))
            this.position = [newX, newY]
        }
        this.isOnSnake = function(snakeToCheck){
            let isOnSnake = false
            for(let i =0 ; i < snakeToCheck.body.length ; i++){
                if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]){
                    isOnSnake = true
                }
            }
            return isOnSnake
        }
    }

    function drawBlock(ctx, position){
        const x = position[0] * blockSize
        const y = position[1] * blockSize
        ctx.fillRect(x, y, blockSize, blockSize)
    }

    function gameOver(){
        ctx.save()
        ctx.font = "bold 70px sans-serif"
        ctx.fillStyle = "black"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.strokeStyle = "white"
        ctx.lineWidth = 5
        ctx.strokeText("Game Over", centreX, centreY - 180)
        ctx.fillText("Game Over", centreX, centreY - 180)
        ctx.font = "bold 30px sans-serif"
        ctx.strokeText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120)
        ctx.fillText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120)
        ctx.restore()
    }

    function launch(){
        snakee = new Snake([[6,4], [5,4], [4,4]], "right") // la tête du serpent est défini en premier
        applee = new Apple([10,10])
        score = 0
        clearTimeout(timeout)
        refreshCanvas()
    }

    function drawScore(){
        ctx.save()
        ctx.font = "bold 200px sans-serif"
        ctx.fillStyle = "grey"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(score.toString(), centreX, centreY)
        ctx.restore()
    }

    document.onkeydown = function handleKeyDown(e){
        let newDirection
        const key = e.keyCode
        if(key === 37){
            newDirection = "left"
        } else if(key === 38){
            newDirection = "up"
        } else if(key === 39){
            newDirection = "right"
        } else if(key === 40){
            newDirection = "down"
        } else if(key === 32){ // touche espace
            launch()
            return
        } else {
            return
        }
        snakee.setDirection(newDirection)
    }

}