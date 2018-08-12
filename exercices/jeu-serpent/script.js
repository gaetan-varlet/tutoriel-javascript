window.onload = function(){ // lorsque la fenêtre va s'afficher
    var canvas = document.createElement('canvas') // élément HTML5 qui permet de dessiner sur la page
    canvas.width=900
    canvas.height=600
    canvas.style.border="1px solid"
    document.body.appendChild(canvas) // permet d'accrocher le canvas à la page HTML

    var ctx = canvas.getContext('2d') // pour dessiner dans le Canvas, on a besoin du contexte
    ctx.fillStyle="#ff0000" // permet de choisir la couleur avec laquelle on va dessiner
    ctx.fillRect(30,30, 100, 50) // permet de dessiner un rectangle, les 2 premiers pour le positionner, les 2 suivants pour sa taille
}