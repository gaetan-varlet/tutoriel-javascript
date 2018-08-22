window.onload = () => { // lorsque la fenêtre va s'afficher

    class Game{

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

        launch(){
            this.snakee = new Snake("right", [6,4], [5,4], [4,4]) // la tête du serpent est défini en premier
            this.applee = new Apple()
            this.score = 0
            clearTimeout(this.timeout)
            this.refreshCanvas()
        }
    }

    class Snake{

        constructor(direction, ...body){
            this.body = body
            this.direction = direction
            this.ateApple = false
        }

        advance(){
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

        setDirection(newDirection){
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

        checkCollision(widthInBlocks, heightInBlocks){
            let wallCollision = false
            let snakeCollision = false
            // fait la même chose que les 2 lignes en commentaires en dessous
            const [head, ...rest] = this.body
            //const head = this.body[0]
            //const rest = this.body.slice(1)
            const [snakeX, snakeY] = head
            const minX = 0
            const minY = 0
            const maxX = widthInBlocks -1
            const maxY = heightInBlocks -1
            const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX
            const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY

            if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls){
                wallCollision = true
            }

            for(let block of rest){
                if(snakeX === block[0] && snakeY === block[1] ){
                    snakeCollision = true
                }
            }

            return wallCollision || snakeCollision // retourne true si un des deux est true
        }

        isEatingApple(appleToEat){
            const head = this.body[0]
            if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]){
                return true
            } else {
                return false
            }
        }
    }

    class Apple{

        constructor(position = [10,10]){
            this.position = position
        }

        setNewPosition(widthInBlocks, heightInBlocks){
            const newX = Math.round(Math.random() * (widthInBlocks - 1))
            const newY = Math.round(Math.random() * (heightInBlocks - 1))
            this.position = [newX, newY]
        }

        isOnSnake(snakeToCheck){
            let isOnSnake = false
            for(let block of snakeToCheck.body){
                if(this.position[0] === block[0] && this.position[1] === block[1]){
                    isOnSnake = true
                }
            }
            return isOnSnake
        }
    }

    class Drawing{

        static gameOver(ctx, centreX, centreY){
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

        static drawScore(ctx, centreX, centreY, score){
            ctx.save()
            ctx.font = "bold 200px sans-serif"
            ctx.fillStyle = "grey"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(score.toString(), centreX, centreY)
            ctx.restore()
        }

        static drawSnake(ctx, blockSize, snake){
            ctx.save() // sauvegarde du contexte dans son état actuel avant de le modifier
            ctx.fillStyle="#ff0000"
            for(let block of snake.body){
                this.drawBlock(ctx, block, blockSize) // pour chaque bloc du corps du serpent, on le dessine
            }
            ctx.restore() // permet de remettre le contexte comme il était avant
        }

        static drawApple(ctx, blockSize, apple){
            const radius = blockSize / 2
            const x = apple.position[0] * blockSize + radius
            const y = apple.position[1] * blockSize + radius
            ctx.save()
            ctx.fillStyle = "#33cc33"
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, Math.PI*2, true)
            ctx.fill()
            ctx.restore()
        }

        static drawBlock(ctx, position, blockSize){
            const [x,y] = position
            ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize)
        }
    }

    let myGame = new Game()
    myGame.init()

    document.onkeydown = (e) => {
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
            myGame.launch()
            return
        } else {
            return
        }
        myGame.snakee.setDirection(newDirection)
    }

}