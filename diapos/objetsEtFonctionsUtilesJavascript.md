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

Les expressions régulières sont des motifs utilisés pour correspondre à certaines combinaisons de caractères au sein de chaînes de caractères. En JavaScript, les expressions régulières sont également des objets. Ces motifs sont utilisés avec les méthodes `exec` et `test` de la classe **RegExp**, et avec les méthodes `match`, `replace`, `search` et `split` de **String**.

Il est possible de construire une expression régulière de deux façons :
```js
const re1 = /ab+c/ // avec un littéral d'expression régulière, compilé lors du chargement du script. Plus performant si l'expression reste constante
const re2 = new RegExp("ab+c") // avec le constructeur de l'objet RegExp, compilé lors de l'exécution

console.log(re1) // affiche /ab+c/
console.log(re2) // affiche /ab+c/
```

Exemples d'utilisation des méthodes :
```js
const monTemplate = /ab/
console.log(monTemplate) // affiche /ab/

// méthodes de RegExp

// exécute une recherche de correspondance dans une chaîne de caractères. Elle renvoie un tableau d'informations ou null lorsqu'il n'y a pas de correspondance
console.log(monTemplate.exec("abc")) // affiche un tableau avec l'index à l'endroit ou commence le template dans la chaîne
console.log(monTemplate.exec("qsd")) // affiche null

// teste la présence d'une correspondance dans une chaîne de caractères. Elle renvoie true ou false
console.log(monTemplate.test("abc")) // true
console.log(monTemplate.test("qsd")) // false


// méthodes de String

// exécute une recherche de correspondance dans une chaîne de caractères. Elle renvoie un tableau d'informations ou null lorsqu'il n'y a pas de correspondance
console.log("abc".match(monTemplate)) // affiche un tableau comme la méthode exec()
console.log("qsd".match(monTemplate)) // affiche null

// teste la présence d'une correspondance dans une chaîne de correspondance. Elle renvoie la position de la correspondance ou -1 s'il n'y en a pas
console.log("abc".search(monTemplate)) // affiche 0
console.log("qsd".search(monTemplate)) // affiche -1

// recherche une correspondance dans une chaîne de caractères et qui remplace la correspondance par une chaîne de substitution
console.log("abc".replace(monTemplate, "ZZZ")) // affiche ZZZc

// utilise une expression régulière ou une chaîne de caractères pour découper une chaîne de caractères en un tableau comprenant les fragments résultants
console.log("Bonjourabjeabm'appelleabGaëtan".split(monTemplate)) // affiche  ["Bonjour", "je", "m'appelle", "Gaëtan"]
```

Le motif d'une expression régulière est composé de **motifs simples** comme `/abc/` ou de caractères spéciaux comme `/ab*c/`. Les motifs simples doivent avoir une correspondance directe, on doit observer exactement les caractères 'des' ensemble et dans cet ordre précis. Lorsque le motif à trouver est plus complexe qu'une simple égalité, le motif devra contenir des caractères spéciaux. (voir [la documentation en ligne](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_r%C3%A9guli%C3%A8res) pour plus de détail).

Les expressions régulières sont souvent utilisés dans les formulaires pour vérifier la validité des données saisies par l'utilisateur.

----

## setTimeout et setInterval

Ce sont 2 méthodes de l'objet global *window*. On s'en sert beaucoup dans les animations.

La méthode *setTimeout()* permet de définir un « minuteur » (timer) qui exécute une fonction ou un code donné après la fin du délai indiqué. Le délai est exprimée en millisecondes.
```js
function hello(){
    console.log("hello")
}

setTimeout(hello, 2000) // exécute 1 fois hello() au bout de 2 secondes
```

La valeur renvoyée par la fonction est un entier qui représente un identifiant du minuteur créé par l'appel à setTimeout(). Cet identifiant pourra être passé à la méthode clearTimeout() afin d'annuler ce minuteur donné, par exemple avec un bouton.

Il est possible d'exécuter plusieurs fois une fonction avec *setTimeout()* :
```js
function hello(){
    console.log("hello")
    setTimeout(hello, 2000)
}

hello() // la méthode s'exécute une première fois immédiatement puis toutes les 2 secondes
```


La méthode *setInterval()* appelle une fonction de manière répétée, avec un certain délai fixé entre chaque appel
```js
setInterval(hello, 2000) // exécute hello() toutes de 2 secondes au bout de 2 secondes la première fois
```

On peut arrêter la méthode *setInterval()* avec la méthode **clearInterval()**. Il faut stocker l'interval dans une variable pour récupérer l'intervalID. Dans l'exemple ci-dessous, `hello()` s'exécute 3 fois.
```js
function hello(){
    console.log("hello")
}

const monInterval = setInterval(hello, 2000)

setTimeout(function(){
    clearInterval(monInterval)
}, 6000)
```

----

## Opérateur Ternaire

C'est une syntaxe simplifiée pour faire un `if else` : `condition ? valeurSiTrue : valeurSiFalse`

Exemple :
```js
const gaetan = "Gaëtan"
const louis = "Louis"
let nomLePlusLong;

if(gaetan.length > louis.length){
    nomLePlusLong = gaetan
} else {
    nomLePlusLong = louis
}
console.log(nomLePlusLong) // affiche Gaëtan

const nomLePlusLong2 = gaetan.length > louis.length ? gaetan : louis
console.log(nomLePlusLong2) // affiche Gaëtan
```

----

## Fonctions de String

L'objet global String est un constructeur de chaînes de caractères.

La propriété `length` retourne la longueur de la chaîne.

Quelques méthodes utiles :
- `charAt()` renvoie le caractère à la position spécifiée
- `concat()` combine le texte de deux chaînes et renvoie une nouvelle chaîne
- `endsWith()` défini si une chaîne de caractère se termine par une chaîne de caractères spécifique
- `indexOf()` renvoie la position, au sein de l'objet String appelant, de la première occurrence de la valeur spécifiée, ou -1 si celle-ci n'est pas trouvée
- `lastIndexOf()` renvoie la position, au sein de l'objet String appelant, de la dernière occurrence de la valeur spécifiée, ou -1 si celle-ci n'est pas trouvée
- `replace()` rechercher une correspondance entre une expression régulière et une chaîne, et remplace la sous-chaîne correspondante par une nouvelle chaîne
- `search(regexp)` renvoie l'indice de la première correspondance pour l'expression régulière au sein de la chaine de caractères, sinon, la méthode renvoie -1
- `slice()` etrait une section d'une chaîne et renvoie une nouvelle chaîne
- `split()` sépare un objet String en un tableau de chaînes en séparant la chaîne en plusieurs sous-chaînes
- `startsWith()` détermine si une chaîne commence avec les caractères d'une autre chaîne
- `substring()` renvoie les caractères d'une chaîne entre deux positions dans celle-ci
- `toLowerCase()` renvoie la valeur de la chaîne appelante convertie en minuscules
- `toString()` renvoie une chaîne représentant l'objet spécifié
- `toUpperCase()` renvoie la valeur de la chaîne appelante convertie en minuscules
- `trim()` retire les blancs en début et en fin de chaîne
- `valueOf()` renvoie la valeur de la chaîne appelante convertie en minuscules

Exemples :
```js
console.log(gaetan.length) // affiche 6
console.log(gaetan.charAt(1)) // affiche a
console.log(gaetan[1]) // affiche a
console.log(gaetan.concat(" et Louis")) // affiche Gaëtan et Louis
console.log(gaetan.substring(1,3)) // affiche aë
```

----

## Fonctions de Array

regarder la 1ere partie pour compléter

```js
const myArray = [1, 2, 3, 4, 5]

myArray.push(6) // ajoute l'élément en paramètre à la fin du tableau
myArray.pop() // enlève le dernier élément du tableau et le retourne
myArray.shift() // enlève le premier élément du tableau et le retourne
 // ajoute l'élément en paramètre au début du tableau

console.log(myArray)

myArray.forEach(element => {
    console.log(element)
}) // permet de passer sur chaque élément du tableau mais ne modifie pas le tableau

const myArray2 = myArray.map(element => {
    return element * 2
}) // permet de faire des actions sur chaque élément d'un tableau et de retourner un nouveau tableau
console.log(myArray2)

const myArray3 = myArray.filter(element => {
    return element >= 3
}) // permet de filtrer les éléments qui respecte la condition
console.log(myArray3)
```

```js
const paragraphes = document.querySelectorAll("p") // récupère tous les paragraphes
// paragraphes est une NodeList, qui ressemble à un tableau
// on ne peut pas appliquer toutes les méthodes d'un tableau dessus
// on peut le convertir en vrai tableau pour le manipuler comme un tableau
const paragraphesArray = Array.from(paragraphes)
```

----

## L'Objet JSON

L’objet JSON contient des méthodes pour interpréter du JSON (JavaScript Object Notation) et convertir des valeurs en JSON.

La méthode `JSON.parse()` parse une chaîne de caractères JSON et construit la valeur JavaScript ou l'objet décrit par cette chaîne.  
La méthode `JSON.stringify()` convertit une valeur JavaScript en chaîne JSON.

```js
var json = '{"result":true, "count":42}'
obj = JSON.parse(json)
console.log(obj.count) // expected output: 42

console.log(JSON.stringify({ x: 5, y: 6 })) // expected output: "{"x":5,"y":6}"
```