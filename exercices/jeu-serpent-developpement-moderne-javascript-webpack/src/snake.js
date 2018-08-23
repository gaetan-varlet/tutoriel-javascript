export default class Snake{

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

        if(allowedDirection.includes(newDirection)){
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