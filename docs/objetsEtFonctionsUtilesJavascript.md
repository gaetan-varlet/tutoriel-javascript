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

## Fonctions de String

L'objet global String est un constructeur de chaînes de caractères. Les objets String sont créés en appelant le constructeur `new String()`.  La fonction globale `String()` peut également être appelée sans l'opérateur new pour créer une chaîne primitive. Les objets String peuvent être convertis en chaînes primitives à l'aide de `String.valueOf()` :
```js
// création d'une chaîne primitve
const chainePrimitive = "toto";
// création d'un objet String
const objetString = new String(chainePrimitive);

console.log(typeof chainePrimitive); // affiche "string"
console.log(typeof objetString);  // affiche "object"

console.log(typeof objetString.valueOf());  // affiche "string"
```

Étant donné que JavaScript effectue automatiquement les conversions entre chaînes primitives et objets String, toute méthode de l'objet String peut être appelée sur une chaîne primitive.


La propriété `length` retourne la longueur de la chaîne.

Quelques méthodes utiles :

- `charAt(index)` renvoie une nouvelle chaîne contenant le caractère à la position indiquée en argument
- `concat(string2,...stringN)` combine le texte de plusieurs chaînes avec la chaîne appelante et renvoie la nouvelle chaîne ainsi formée
- `endsWith(chaîneRecherchée)` renvoie un booléen indiquant si la chaine de caractères se termine par la chaine de caractères fournie en argument
- `indexOf(valeurRecherchée)` renvoie l'indice de la première occurence de la valeur cherchée au sein de la chaîne courante. Elle renvoie -1 si la valeur cherchée n'est pas trouvée
- `lastIndexOf(valeurRecherchée)` envoie l'indice, dans la chaîne courante, de la dernière occurence de la valeur donnée en argument. Si cette sous-chaîne n'est pas trouvée, la méthode renvoie -1
- `replace()` rechercher une correspondance entre une expression régulière et une chaîne, et remplace la sous-chaîne correspondante par une nouvelle chaîne
- `search(regexp)` renvoie l'indice de la première correspondance pour l'expression régulière au sein de la chaine de caractères, sinon, la méthode renvoie -1
- `slice(indiceDebut[, indiceFin])` extrait une section d'une chaine de caractères et la retourne comme une nouvelle chaine de caractères
- `split(séparateur)` permet de diviser une chaîne de caractères à partir d'un séparateur pour fournir un tableau de sous-chaînes
- `startsWith(chaîneRecherchée)` renvoie un booléen indiquant si la chaine de caractères commence par la deuxième chaine de caractères fournie en argument
- `substring(indiceA[, indiceB])` retourne une sous-chaîne de la chaîne courante, entre un indice de début et un indice de fin
- `toLowerCase()` retourne la chaîne de caractères courante en minuscules
- `toString()` renvoie une chaine de caractères représentant l'objet renseigné
- `toUpperCase()` retourne la valeur de la chaîne courante, convertie en majuscules
- `trim()` permet de retirer les blancs en début et fin de chaîne
- `valueOf()` renvoie la valeur primitive de l'objet String

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

L'objet global Array est utilisé pour créer des tableaux. On peut créer un tableau avec le constructeur Array, et aussi la syntaxe crochets. La propriété `length` retourne la longueur de la chaîne. Un tableau contient plusieurs valeurs appelées **item**. Chaque item est accessible au moyen d’un indice dont la numérotation commence à 0. On accéde à un élément d'un tableau en indiquant son indice entre crochets et on peut modifier la valeur d'un éléménet de cette manière.
```js
const myArray = [1, 2, 3, 4, 5]
const myArray2 = new Array(1, 2, 3, 4, 5)

console.log(myArray.length) // affiche 5
console.log(myArray[0]) // affiche 1, le premier élément du tableau
myArray[0]=8 // modifie la valeur du premier élément du tableau
console.log(myArray[0]) // affiche 8, le premier élément du tableau
console.log(myArray[myArray.length-1]) // affiche 5, le dernier élément du tableau
```

```js
const myArray = [1, 2, 3, 4, 5]

myArray.push(6) // ajoute l'élément en paramètre à la fin du tableau
myArray.pop() // enlève le dernier élément du tableau et le retourne
myArray.shift() // enlève le premier élément du tableau et le retourne
myArray.unshift(0) // ajoute l'élément en paramètre au début du tableau
console.log(myArray)
```


- `isArray()` permet de déterminer si l'objet passé en argument est un objet Array
- `reverse()` permet d'inverser l'ordre des éléments du tableau. La méthode **modifie le tableau courant** et renvoie une référence à ce tableau
- `sort()` trie les éléments d'un tableau, dans ce même tableau, et renvoie le tableau
- `splice()` modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments
```js
const mesPoissons  = ["scalaire", "clown", "mandarin", "chirurgien"]

// supprime 0 élément à partir de l'index 2, et insère "tambour"
enleves = mesPoissons.splice(2, 0, "tambour")
// mesPoissons est ["scalaire", "clown", "tambour", "mandarin", "chirurgien"]
// enleves est [], aucun élément supprimé

// supprime 1 élément à partir de l'index 3
enleves = mesPoissons.splice(3, 1)
// mesPoissons est ["scalaire", "clown", "tambour", "chirurgien"]
// enleves est ["mandarin"]

// supprime 1 élément à partir de l'index 2, et insère "trompette"
enleves = mesPoissons.splice(2, 1, "trompette")
// mesPoissons est ["scalaire", "clown", "trompette", "chirurgien"]
// enleves est ["tambour"]
```

- `concat(array2)` est utilisée afin de fusionner un ou plusieurs tableaux en les concaténant. Cette méthode ne modifie pas les tableaux existants, elle renvoie un nouveau tableau qui est le résultat de l'opération
- `includes(élémentRecherché)` permet de déterminer si un tableau contient un élément et renvoie true si c'est le cas, false sinon
- `indexOf(élémentRecherché)` renvoie le premier indice pour lequel on trouve un élément donné dans un tableau. Si l'élément cherché n'est pas présent dans le tableau, la méthode renverra -1
```js
    var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
    console.log(beasts.indexOf('bison')); // expected output: 1
    console.log(beasts.indexOf('bison', 2)); // start from index 2, expected output: 4
    console.log(beasts.indexOf('giraffe')); // expected output: -1
```
- `join(séparateur)` réunit tous les éléments d'un tableau dans une chaine de caractères et renvoie cette nouvelle chaîne de caractères
- `lastIndexOf(élémentRecherché)` permet de renvoyer le dernier indice pour lequel une valeur donnée est présente dans un tableau. Si la valeur recherchée n'est pas présente, le résultat sera -1
`slice()` renvoie un objet tableau contenant une copie d'une portion du tableau d'origine. La portion est définie par un indice de début et un indice de fin exclu optionnel
```js
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice()); // expected output: Array ['ant', 'bison', 'camel', 'duck', 'elephant']
console.log(animals.slice(2)); // expected output: Array ['camel', 'duck', 'elephant']
console.log(animals.slice(2, 4)); // expected output: Array ['camel', 'duck']
```
- `toString()` renvoie une chaine de caractères représentant le tableau spécifié et ses éléments
```js
const mesPoissons  = ["scalaire", "clown", "mandarin", "chirurgien"]
console.log(mesPoissons.toString()) // scalaire,clown,mandarin,chirurgien
```

**Les méthodes d'itération**

La méthode `every()` permet de tester si tous les éléments d'un tableau vérifient une condition donnée par une fonction en argument :
```js
function isBelowThreshold(currentValue) {
  return currentValue < 40;
}

var array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// expected output: true
```

La méthode `forEach()` permet d'exécuter une fonction donnée sur chaque élément du tableau.  
La méthode `map()` crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.  
La méthode `filter()` crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction callback.

```js
const myArray = [1, 2, 3, 4, 5]
myArray.forEach((element, index, array) => {
    console.log(element+" "+index+" "+array)
})
// a 0 a,b,c,d,e
// b 1 a,b,c,d,e ...

const myArray2 = myArray.map(element => {
    return element * 2
})
console.log(myArray2) // [2, 4, 6, 8, 10]

const myArray3 = myArray.filter(element => {
    return element >= 3
})
console.log(myArray3) // [3, 4, 5]
```

La méthode `every()` permet de tester si tous les éléments d'un tableau vérifient une condition donnée par une fonction en argument.
```js
function isBelowThreshold(currentValue) {
  return currentValue < 40;
}

var array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// expected output: true
```

La méthode some() teste si au moins un élément du tableau passe le test implémenté par la fonction fournie.
```js
var array = [1, 2, 3, 4, 5];

var even = function(element) {
  // checks whether an element is even
  return element % 2 === 0;
};

console.log(array.some(even));
// expected output: true
```

La méthode `reduce()` applique une fonction qui est un « accumulateur » et qui traite chaque valeur d'une liste (de la gauche vers la droite) afin de la réduire à une seule valeur.
```js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10
```

Parcourir un tableau avec une boucle for :
```js
const fruits = ["Pomme", "Melon", "Fraise"]

for(let fruit of fruits){
  console.log(fruit)
}
// affiche Pomme, puis Melon, puis Fraise
```


La méthode `from()` permet de créer une nouvelle instance d'Array à partir d'un objet itérable ou semblable à un tableau
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