import "babel-polyfill"
import Game from "./game.js"

window.onload = () => { // lorsque la fenêtre va s'afficher

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