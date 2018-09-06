# Objets et fonctions utiles Javascript

----

## L'Objet Math

L'objet Math est un objet natif dont les méthodes et propriétés permettent l'utilisation de constantes et fonctions mathématiques. Contrairement aux autres objets globaux, Math n'est pas un constructeur. Toutes les propriétés et les méthodes de Math sont statiques.

Exemples de propriétés
```js
Math.E // nombre d'Euler, environ 2.718
Math.PI // nombre PI, environ 3.1416
```

Exemples de méthodes
```js
Math.abs(x) // retourne la valeur absolue d'un nombre
Math.cos(x) // retourne le cosinus d'un nombre
Math.sin(x) // retourne le sinus d'un nombre
Math.exp(x) // retourne l'exponentielle d'un nombre
Math.log(x) // retourne le logarithme naturel (log e) d'un nombre
Math.sqrt(x) // retourne la racine carrée d'un nombre
Math.pow(x,y) // retourne le calcul de x à la puissance y
Math.max(x,y,...) // retourne la plus grande valeur d'une liste de nombres, par exemple Math.max(0,-5,3,2) retourne 3
Math.min(x,y,...) // retourne la plus petite valeur d'une liste de nombres, par exemple Math.min(0,-5,3,2) retourne -5
Math.random() // retourne un nombre pseudo-aléatoire compris entre 0 (inclus) et 1 (exclu)
Math.floor(x) // retourne le plus grand entier inférieur ou égal à la valeur passée en paramètre
Math.ceil(x) // retourne le plus petit entier supérieur ou égal à la valeur passée en paramètre
Math.round(x) // retourne l'arrondi à l'unité d'un nombre
Math.trunc(x) // retourne la partie entière d'un nombre (différent de floor() pour les nombres négatifs)
```

Pour arrondir à 2 chiffres après la virgule, on peut faire `Math.round(x * 100) / 100`. Exemple
```js
console.log(Math.round(123.45678 * 100) / 100) // affiche 123.46
```

Pour générer un nombre aléatoire entre 1 et 100, on peut faire :
```js
const myNumber = Math.trunc(Math.random() * 100) + 1
console.log(myNumber)
```

----

## L'objet Date

Ce constructeur permet de créer des instances Date qui représentent un moment précis dans le temps. Les objets Date se basent sur une valeur de temps qui est le nombre de millisecondes depuis 1er janvier 1970 minuit UTC.

Sans argument, le constructeur crée un objet Date pour la date du jour et l'heure selon l'heure locale du système
```js
const date = new Date()
console.log(date) // affiche : Thu Sep 06 2018 10:17:13 GMT+0200 (heure d’été d’Europe centrale)

const date2 = Date.now() // retourne la valeur numérique correspondant au temps courant. Le nombre de millisecondes depuis le 1 janvier 1970, 00:00:00 UTC
console.log(date2) // 1536222742607
```

On peut aussi créer une date avec des arguments, par exemple le 28 mars 2018 (attention, l'indice des mois commence à 0) :
```js
const date = new Date(2018,2,28)
console.log(date) // affiche : Wed Mar 28 2018 00:00:00 GMT+0200 (heure d’été d’Europe centrale)

const date = new Date('2018/3/28') // éauivalent en passant une String en paramètre
```

On peut récupère des paramètres d'une date (mois, jour, heure...). Exemple :
```js
const date = new Date()
console.log(date) // Thu Sep 06 2018 10:43:30 GMT+0200 (heure d’été d’Europe centrale)
console.log(date.getDate()) // 6
console.log(date.getDay()) // 4
console.log(date.getMonth()) // 8
console.log(date.getFullYear()) // 2018
console.log(date.getHours()) // 10
console.log(date.getTime()) // 1536223410659 (correspond au nombre de millisecondes depuis le 1er janvier 1970)
```

Calculer le temps écoulé
```js
function traitementQuiPrendBeaucoupDeTemps(){
    let j = 0
    for(let i =0 ; i < 1000000 ; i++){
        j++
    }
    return j
}

// en utilisant les objets Date
const debut = Date.now()
// l'évènement à mesurer se trouve ici :
traitementQuiPrendBeaucoupDeTemps()
const fin = Date.now()
const tempsEcoule = fin - debut // temps écoulé en millisecondes
console.log(tempsEcoule) // affiche 15

// en utilisant les méthodes natives
const debut2 = new Date()
// l'évènement à mesurer se trouve ici :
traitementQuiPrendBeaucoupDeTemps()
const fin2 = new Date()
const tempsEcoule2 = fin2.getTime() - debut2.getTime() // temps écoulé en millisecondes
console.log(tempsEcoule2) // affiche 10
```

----

## Expressions Régulières

