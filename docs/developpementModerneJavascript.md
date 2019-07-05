# Développement Moderne JavaScript

----

----

# Nouveautés ES6

----

## Rappels

Dans la partie précédente ont déjà été vu des nouveautés ES6 :

- les nouveaux mots clés `let` et `var` pour déclarer une variable
- les scopes de bloc
- quand utiliser `var`, `let` et `const`
- les fonctions fléchés
- le concept de classe

----

## Les paramètres par défaut

On peut maintenant utiliser des paramètres par défaut dans les fonctions.

Quand il y a une valeur par défaut à un paramètre, si on renseigne une valeur pour ce paramètre, la valeur spécifiée sera prise en compte. Si aucune valeur n'est spécifée, la valeur par défaut est prise en compte.
```js
function nomComplet(prenom, nom){
    console.log(prenom + " " + nom)
}
nomComplet("Brad","Pitt") // affiche Brad Pitt

function nomComplet(prenom, nom){
    console.log(prenom + " " + nom)
}
nomComplet("Brad") // affiche Brad undefined

function nomComplet(prenom, nom="Cruise"){
    console.log(prenom + " " + nom)
}
nomComplet("Brad") // affiche Brad Cruise
nomComplet("Brad","Pitt") // affiche Brad Pitt
```

Les arguments sont évalués de gauche à droite, il faut donc mettre les paramètres avec des valeurs par défaut en dernier.
```js
function nomComplet(prenom="Brad", nom){
    console.log(prenom + " " + nom)
}
nomComplet("Pitt") // affiche Pitt undefined

function nomComplet(nom, prenom="Brad"){
    console.log(prenom + " " + nom)
}
nomComplet("Pitt") // affiche Brad Pitt
```

On peut utiliser des variables définies dans le scope global dans les paramètres par défaut
```js
const nomActeur = "Pitt"
function nomComplet(prenom, nom=nomActeur){
    console.log(prenom + " " + nom)
}
nomComplet("Brad") // affiche Brad Pitt
```

----

## Les paramètres Rest

L'idée est de spécifier des paramètres à une fonction et que ces paramètres soient stockées dans un tableau. Le nombre de ces paramètres est libre. Il faut pour cela utiliser `...`

Exemple sans les paramètres Rest où il faut donner un tableau
```js
const mesNombres = [1, 2, 3, 4]

function faireSomme(nombres){
    let somme = 0
    for(let i =0 ; i < nombres.length ; i++){
        somme += nombres[i]
    }
    return somme
}

console.log(faireSomme(mesNombres)) // affiche 10
```

Exemple avec les paramètres Rest où l'on peut fournir des valeurs libres qui sont stockées dans un tableau grâce aux `...`
```js
function faireSomme(...nombres){
    console.log(nombres) // affiche [1, 2, 3, 4]
    let somme = 0
    for(let i =0 ; i < nombres.length ; i++){
        somme += nombres[i]
    }
    return somme
}

console.log(faireSomme(1, 2, 3, 4)) // affiche 10
```

----

## L'opération Spread

L'opérateur Spread est l'inverse des paramètres Rest. Les paramètres Rest prennent des valeurs libres et les transforment en tableau. L'opérateur Spread prend un tableau et le transforme en valeurs libres. Il s'utilise comme pour les paramètres Rest avec `...`. Ce qui va les différencier est quand on les utilise : si on lui donne des valeurs libres, il va les regrouper dans un tableau, et inversement.

```js
const mesNombres = [1, 2, 3]

function faireSomme3Nombres(nb1, nb2, nb3){
    console.log(nb1) // affiche [1, 2, 3]
    console.log(nb2) // affiche undefined
    console.log(nb3) // affiche undefined
    return nb1 + nb2 + nb3
}

console.log(faireSomme3Nombres(mesNombres))
```

Cet exemple ne fonctionne pas, il faudrait fournir chaque élément du tableau à la fonction en faisant :
```js
console.log(faireSomme3Nombres(mesNombres[0], mesNombres[1], mesNombres[2]))
```

On peut le faire plus simplement en utilisant l'opérateur Spread :
```js
const mesNombres = [1, 2, 3]

function faireSomme3Nombres(nb1, nb2, nb3){
    console.log(nb1) // affiche 1
    console.log(nb2) // affiche 2
    console.log(nb3) // affiche 3
    return nb1 + nb2 + nb3
}

console.log(faireSomme3Nombres(...mesNombres)) // affiche 6
```

On peut aussi utiliser l'opérateur Spread ailleurs que dans une fonction, par exemple pour regrouper deux tableaux en un.
```js
const fruits = ["Pomme", "Melon"]
const legumes = ["Tomate", "Concombre"]

// en faisant ça, on aura un tableau qui contient 2 tableaux de 2 éléments et pas un seul tableau de 4 éléments.
const fruitsEtLegumes = [fruits, legumes]
console.log(fruitsEtLegumes)

// ici, on éclate nos 2 tableaux en valeurs libres pour recréer un unique tableau
const fruitsEtLegumesSpread = [...fruits, ...legumes]
console.log(fruitsEtLegumesSpread) // affiche ["Pomme", "Melon", "Tomate", "Concombre"]

// on peut aussi ajouter une valeur libre au milieu
const fruitsEtLegumesSpread2 = [...fruits, "Banane", ...legumes]
console.log(fruitsEtLegumesSpread2) // affiche ["Pomme", "Melon", "Banane", "Tomate", "Concombre"]
```

L'opérateur Spread est utile pour créer un nouveau tableau à partir d'un ancien en changeant la référence de celui-ci.
Sans l'opérateur Spread, en faisant comme ça, ajouter un élément à un deux deux tableaux l'ajoute aux deux tableaux car *fruits* et *fruits2* poitent vers le même tableau.
```js
const fruits = ["Pomme", "Melon"]
const fruits2 = fruits

fruits2.push("Banane")

console.log(fruits) // affiche ["Pomme", "Melon", "Banane"]
console.log(fruits2) // affiche ["Pomme", "Melon", "Banane"]
```

Avec l'opérateur Spread, un nouveau tableau *fruits2* est créé qui a une référence différente que le premier tableau. Un changement sur l'un n'impactera pas l'autre.
```js
const fruits = ["Pomme", "Melon"]
const fruits2 = [...fruits]

fruits2.push("Banane")

console.log(fruits) // affiche ["Pomme", "Melon"]
console.log(fruits2) // affiche ["Pomme", "Melon", "Banane"]
```

----

## for of

Pour passer sur les éléments d'un tableau, on peut utiliser une boucle for classique. Avec ES6, une nouvelle syntaxe permet de parcourir les tableaux : le **for of**.

Exemple en ES5 :
```js
const fruits = ["Pomme", "Melon", "Fraise"]

for(let i = 0 ; i < fruits.length ; i++){
  console.log(fruits[i])
}
// affiche Pomme, puis Melon, puis Fraise
```

Exemple avec *for of* qui fait exactement la même chose. Il faut nommer une variable qui correspond à la valeur courante du tableau que l'on parcourt.
```js
const fruits = ["Pomme", "Melon", "Fraise"]

for(let fruit of fruits){
  console.log(fruit)
}
// affiche Pomme, puis Melon, puis Fraise
```

----

## Les Template Literals ou Template String

Les template literals permettent de simplifier la concaténation. Il faut utiliser les back tilt (Alt Gr + 7) à la place des guillemets dans le `console.log()` et mettre la variable entre accolades avec un dollar devant à la place des plus.

Exemple de concaténation classique :
```js
const nom = "Louis"
console.log("Je m'appelle " + nom + " !")
```

Exemple avec le template literal :
```js
const nom = "Louis"
console.log(`Je m'appelle ${nom} !!!`)
```

L'avantage est que l'on peut aussi créer des string multiligne :
```js
const maString = `Je suis sur la ligne 1


Je suis sur la ligne 3
Je suis sur la ligne 4`
console.log(maString)
```

----

## Destructuring Arrays

Si on veut créer des variables à partir des valeurs d'un tableau, il faut préciser pour chaque variable quel élément du tableau on souhaite récupérer. Avec l'ES6, il est possible de déstructurer le tableau pour simplifier la récupération des valeurs d'un tableau.

Exemple en ES5 :
```js
const nombres = [1, 2, 3]
const a = nombres[0]
const b = nombres[1]

console.log(a) // affiche 1
console.log(b) // affiche 2
```

Exemple en ES6 qui fait la même chose :
```js
const nombres = [1, 2, 3]
const [a,b] = nombres

console.log(a)
console.log(b)
```

Il est possible de faire d'autres choses :
```js
const nombres = [1, 2, 3]
const [a,b,c,d] = nombres

console.log(a)
console.log(b)
console.log(c)
console.log(d) // affiche undefined
```

```js
const nombres = [1, 2, 3]
const [a,b,c,d=10] = nombres

console.log(a)
console.log(b)
console.log(c)
console.log(d) // affiche 10
```

```js
const nombres = [1, 2, 3]
const [a, ...b] = nombres

console.log(a) // affiche 1
console.log(b) // affiche [2, 3]
```

```js
const nombres = [1, 2, 3]
const [a, ,b] = nombres

console.log(a) // affiche 1
console.log(b) // affiche 3
```

On peut aussi intervertir la valeur de 2 variables sans passer par une troisième variable (ne fonctionne pas sur mon poste) :
```js
let a = 1
let b = 2
[b,a] = [a,b]
console.log(a) //affiche 2
console.log(b) // affiche 1
```

----

## Destructuring Objects

Il aussi possible de déstructurer un objet. La différence avec le destructuring de tableau est qu'il est basé sur l'ordre des valeurs dans le tableau alors qu'avec les objets, il faut que les variables aient le même nom que les propriétés de l'objet, sinon la variable ne sera pas renseignée.

```js
const myObject ={
    name:"Louis",
    age: 0
}
const {name, age} = myObject
console.log(name) // affiche Louis
console.log(age) // affiche 0

const {name1, age1} = myObject
console.log(name1) // affiche undefined
console.log(age1) // affiche undefined
```

Si on veut donner un nom différent que le nom des propriétés de l'objet, il faut utiliser les alias :
```js
const myObject ={
    name:"Louis",
    age: 0,
    present: function(){console.log("Hello")}
}
const {name, age:age1, present:hello} = myObject
console.log(name) // affiche Louis
console.log(age1) // affiche 0
hello() // affiche  Hello
```

----

----

# Les classes (ES6)

----

## La notion de classe

Comme vu dans la partie précédente, pour construire un objet, au lieu de faire une fonction constructeur et ajouter des méthodes sur le prototype, on peut créer une classe.

---- 

## L'héritage (Inheritance)

Si on veut définir une classe qui a les mêmes propriétés qu'une autre classe avec une propriété en plus, on peut hériter de cette classe plutôt que de la redéfinir de zéro, ce qui évitera une duplication de code.

- le mot clé `extends` permet de dire de quelle clase on hérite
- le mot clé `super` dans le constructeur permet d'exécuter le constructeur de la classe parent
- il est aussi possible d'exécuter une méthode parent dans une méthode enfant avec `super` en faisant `super.nomMethodeParent()`
- il est possible d'utiliser les méthodes parent sans les définir dans la classe enfant

```js
class Person {
    constructor(name, age){
        this.name = name
	    this.age = age
    }
    present(){
        console.log(`Hello my name is ${this.name}`)
    }
}

class Hero extends Person{
    constructor(name, age, power){
        super(name, age) // exécute le constructeur de la classe parent avec ses paramètres
        this.power = power
    }
    usePower(){
        console.log(`I am using my power ${this.power}`)
    }
    presentHero(){
        super.present()
        console.log(`My power is ${this.power}`)
    }
}

let louis = new Person("Louis", 0)
louis.present() // affiche : Hello my name is Louis
//louis.usePower() // il y aura une erreur car on ne peut utiliser la méthode de Hero avec un objet Person

let superman = new Hero("Superman", 30, "fly")
superman.present() // affiche : Hello my name is Superman
superman.usePower() // affiche : I am using my power fly
superman.presentHero() // affiche : Hello my name is Superman, puis affiche : My power is fly
```

----

## Etendre les objets intégrés (Extend Built-In Objects) 

Depuis ES6, on peut aussi étendre des objets intégrés à JavaScript comme *Array* ou *Function*

Par exemple, on va créer une classe qui hérite d'*Array* et qui définit une méthode qui renvoit un tableau avec tous les éléments en majuscules :
```js
class UpperCaseArray extends Array{
    upperCase(){
        let newArray = []
        this.forEach(element => {newArray.push(element.toUpperCase())})
        return newArray
    }
}
const myArray = new UpperCaseArray()
myArray.push("louis")
myArray.push("kévin")
myArray.push("Thibaut")

console.log(myArray.upperCase()) // affiche : ["LOUIS", "KÉVIN", "THIBAUT"]
```

----

## Méthodes Statiques

On peut aussi utiliser les classes pour regrouper les fonctions qui concernent un même sujet.

Par exemple, on peut faire une classe *Mathematiques* :
```js
class Mathematique{
    addition(number1, number2){
        return number1 + number2
    }
    multiplication(number1, number2){
        return number1 * number2
    }
}

const myMath = new Mathematique()
console.log(myMath.addition(2,3)) // affiche 5
console.log(myMath.multiplication(2,3)) // affiche 6
```

C'est inutile dans ce cas de créer une instance de classe pour utiliser les méthodes, car rien n'est lié à une méthode spécifique. Pour faire cela, on va déclarer nos méthodes `static` et on pourra utiliser les méthodes sans instancier la classe.
```js
class Mathematique{
    static addition(number1, number2){
        return number1 + number2
    }
    static multiplication(number1, number2){
        return number1 * number2
    }
}

console.log(Mathematique.addition(2,3))
console.log(Mathematique.multiplication(2,3))
```

----

## Get et Set

De base, rien n'empêche d'accéder et de modifier les propriétés de nos objets :
```js
class Person{
    constructor(name){
        this.name = name
    }
}

let louis = new Person("Louis")
console.log(louis.name) // affiche : Louis

louis.name = "Loulou" // modifie le nom de l'objet louis
console.log(louis.name) // affiche : Loulou
```

Pour éviter cela, on peut utiliser *get* et *set* pour contrôler l'accès aux propriétés de nos objets, choisir ce qu'on renvoit et dans quelle condition la propriété peut être modifiée :
```js
class Person{
    constructor(name){
        this._name = name // par convention, on met un _ devant les propriétés que l'on veut rendre "semi privé"
    }
    get name(){
        return `bébé ${this._name}`
    }
    set name(value){
        if(value.length > 2){
            this._name = value
        }
    }
}

let louis = new Person("Louis")
console.log(louis.name) // affiche : bébé Louis
louis.name = "Lo"
console.log(louis.name) // affiche : bébé Louis, la modification n'a pas eu lieu car la taille du nom soumis n'est pas supérieur à 2
louis.name = "Loulou"
console.log(louis.name) // affiche : bébé Loulou

// On peut toujours accéder à la propriété _name et la modifier directement
console.log(louis._name) // affiche : Loulou
louis._name = "az"
console.log(louis._name) // affiche : az
console.log(louis.name) // affiche : bébé az
```

----

----

# Les modules (ES6)
 
 ----

## Modules

 Sur des gros projets, il faut organiser le code JavaScript en plusieurs fichiers. Pour charger les différents fichiers JavaScript, on peut les charger chacun un tag `<script src="script.js"></script>` dans la page html.
 
```js
 // script1.js
const myLog = message => console.log(`** My Log ** : ${message}`)

// script2.js
myLog("Hello !")

// index.html
<!DOCTYPE html>
<html>
    <head>
        <title>Modules JavaScript</title>
    </head>
    <body>
        <script src="script1.js"></script>
        <script src="script2.js"></script>
    </body>
</html>
// affiche dans la console : ** My Log ** : Hello ! 
```
 
 Cette solution n'est pas idéale pour plusieurs raisons :
 - à chaque tag `script`, une nouvelle requête est faite au serveur pour récupérer le fichier
 - il faut faire attention à l'ordre des fichiers en mettant d'abord les fichiers avec du code qui sert dans les fichiers suivant, sinon ça ne fonctionnera pas
 - tous les fichiers partagent le même scope global, on s'expose donc aux accidents de variables si par exemple des variables ont le même nom dans différents fichiers ce qui fait que des variables vont s'écraser

 Pour répondre à ces problèmes, ES6 a amené **les modules**. Chaque module peut exporter certaines de ces fonctionnalités et importer des fonctionnalités d'autres modules. La problème est que la plupart des navigateurs ne supportent pas encore les modules ES6. Avec Chrome, il faut au moins la version 60 et aller dans l'url `chrome://flags/` et activer `Experimental Web Platform features`. Avec Firefox en version 61 (et peut-être les versions plus anciennes ?), les modules sont pris en charge nativement.

 Dans le script 1, il faut exporter la fonction avec le mot clé `export` et dans le script 2, il faut l'importer. Dans le fichier html, on laisse qu'un seul script JavaScript, notre fichier point d'entrée script2.js et on ajoute le type module dans la balise script. Le résultat sera le même.

```js
 // script1.js
export const myLog = message => console.log(`** My Log ** : ${message}`)

// script2.js
import {myLog} from "./script1.js"
myLog("Hello !")

// index.html

<!DOCTYPE html>
<html>
    <head>
        <title>Modules JavaScript</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <script type="module" src="script2.js"></script>
    </body>
</html>
```

----

## Import et Export

 Avec les modules, l'import et l'export se fait par référence, c'est-à-dire qu'on ne crée pas une nouvelle variable mais on importe la variable de l'autre module.

Pour exporter plusieurs choses d'un même module, on fait deux exports et on fait les deux imports sur une seule ligne
```js
 // script1.js
export const myLog = message => console.log(`** My Log ** : ${message}`)
export let myVariable = "Coucou !"

// script2.js
import {myLog, myVariable} from "./script1.js"
myLog(myVariable)
```

On peut aussi faire l'export à la fin du fichier au lieu de le faire au moment de la déclaration.
```js
 // script1.js
const myLog = message => console.log(`** My Log ** : ${message}`)
let myVariable = "Coucou !"
export {myLog, myVariable}
```

Une variante de l'export et l'`export default`. Il ne peut y en avoir qu'un par fichier. Lorsqu'on l'importe, on ne met pas les accolades et on lui donne le nom qu'on veut car lorsqu'on ne met pas les accolades, c'est forcément lque ça correspond à l'export default.
```js
 // script1.js
const myLog = message => console.log(`** My Log ** : ${message}`)
let myVariable = "Coucou !"
let myVariable2 = "Important"
export {myLog, myVariable}
export default myVariable2

// script2.js
import {myLog, myVariable} from "./script1.js"
import myVariable2 from "./script1.js"
myLog(myVariable)
myLog(myVariable2)
```

Exemple en renommant la variable de l'export default dans l'import :
```js
// script2.js
import toto, {myLog, myVariable} from "./script1.js"
myLog(myVariable)
myLog(toto) // correspond à l'export default de myVariable2
```

On peut aussi utiliser des alias pour renommer les export classiques :
```js
// script2.js
import toto, {myLog as myLogImported, myVariable} from "./script1.js"
myLogImported(myVariable)
myLogImported(toto)
```

Lorsqu'il y a plusieurs éléments à importer, on peut utiliser l'étoile pour tout importer.
```js
// script2.js
import * as external from "./script1.js"
external.myLog(external.myVariable)
```

 ----

 ----

# Les nouveautés ES7

 ----

## Array.prototype.includes

Lorsqu'on veut vérifier la présence d'un élément dans un tableau, il faut utiliser la méthode `indexOf()` qui renvoie la position de l'élément dans le tableau, ou -1 si l'élément est absent.

```js
const fruits = ["pomme", "banane", "orange"]

console.log(fruits.indexOf("banane")) // affiche 1
console.log(fruits.indexOf("melon")) // affiche -1

const monFruit = "banane"
if(fruits.indexOf(monFruit)>-1){
    console.log(`${monFruit} est dans le tableau`)
} else {
    console.log(`${monFruit} n'est pas dans le tableau`)
}
```

En ES7, on peut utiliser la méthode `includes()` qui renvoie *true* ou *false* si l'élément est présent ou non dans le tableau.

```js
const fruits = ["pomme", "banane", "orange"]

console.log(fruits.includes("banane")) // affiche true
console.log(fruits.includes("melon")) // affiche false

const monFruit = "banane"
if(fruits.includes(monFruit)){
    console.log(`${monFruit} est dans le tableau`)
} else {
    console.log(`${monFruit} n'est pas dans le tableau`)
}
```

----

## L'opérateur d'exponentiation (opérateur de puissance)

l'ES7 amène un nouvel opérateur qui est la puissance qui se note avec deux étoiles sous la forme `x ** y` pour x puissance y. Avant l'ES7, il fallait utiliser l'objet Math.

```js
const calcul = Math.pow(2,3) // 2*2*2
console.log(calcul) // affiche : 8

const newCalcul = 2 ** 3
console.log(newCalcul) // affiche : 8
```

On peut aussi utiliser ce nouvel opérateur comme les opérateurs classiques.

```js
let myVar = 2
myVar **= 3 // équivaut à myVar = myVar ** 3
console.log(myVar) // affiche 8
```

----

----

# Les outils pour le développement moderne JavaScript

Tous les navigateurs ne supportent pas encore ces nouveautés. Il existe des outils qui permettent de coder en ES6 et ES7 et que le code soit supporté par tous les navigateurs.

----

# Npm

----

## Les bases de Npm

Npm pour *Node Package Manager* va nous permettre de gérer nos paquets JavaScript. Pour l'utiliser, il faut télécharger **Node.js**
Pour vérifier qu'il est bien installé et vérifier la version, tpaer la commande `node -v` puis `npm -v`.

Jusqu'à présent, pour utiliser une bibliothèque externe comme JQuery, il faut télécharger la bibliothèque et l'ajouter dans le fichier HTML.

Avec Npm, il est possible de télécharger la bibliohèque très facilement, en faisant `npm install jquery`. Un dossier *node_modules* est créé avec un sous-dossier *jquery*. Il faut ensuite l'ajouter au fichier HTML en pointant dans le sous-dossier *dist* (pour distribution) et on peut utiliser *jquery* dans le projet.
```html
<!DOCTYPE html>
<html>
    <head>
        <title>NPM</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <script src="./node_modules/jquery/dist/jquery.js"></script>
        <script type="module" src="script.js"></script>
    </body>
</html>
```
```js
// script.js
import {myLog} from "./external.js"
myLog("Hello !")

jQuery(document).ready(function(){
    console.log("jQuery est prêt !");
  });

// external.js
export const myLog = message => console.log(`** My Log ** : ${message}`)
```

On peut désinstaller la bibliothèque avec la commande `npm uninstall jquery`, ce qui supprime le dossier *jquery* du dossier *node_modules*. On peut mettre à jour la version de *jquery* avec la commande `npm update jquery`.

----

## Le fichier package.json

Généralement on a beaucoup de dépendances, ce qui deviendrait lourd à gérer avec les commandes vues ici. Avec le fichier **package.json**, on va pouvoir noter toutes les dépendances ainsi que leur version. Cela permettra aussi de reproduire le projet sur un autre poste sans y inclure toutes les dépendances mais uniquement ce fichier. En lançant la commande `npm install`, toutes les dépendances inscrites dans le fichier *package.json* seront installées dans la version spécifié.

Ce fichier est un fichier de configuration, il sert également à d'autres choses. Pour le créer, il faut exécuter la commande `npm init`.

Lorsqu'on installe ou désinstalle une dépendance, elle n'est pas renseignée dans le fichier *package.json*. Pour que ce soit le cas il faut ajouter `--save`, par exemple `npm install jquery --save` et jquery sera inscrit dans les dépendances avec son numéro de version.

Il y a deux types de dépendances :
- les dépendances classiques dont notre code a besoin, comme par exemple *jquery*. Elles sont rensiegnées donc *dependencies*
- les dépendances de développement qui correspond aux outils de développement, par exemple *webpack* que l'on verra au prochain chapitre. Elles sont rensiegnées donc *devDependencies*. Pour cela, il faut utiliser la commande `--save-dev`, par exemple `npm install --save-dev webpack webpack-cli`

En installant *webpack*, il y a maintenant plein de dépendances dans *node_modules* car *webpack* a besoin d'autres dépendances qui ont été installé également.

----

----

# Webpack

----

## Qu'est-ce que Webpack

Il est principalement utilisé comme *module bundler*, c'est-à-dire qu'il va prendre tous nos fichiers pour faire un seul gros fichier. Ce fichier pourra être inclus dans le fichier HTML, ce qui permet d'utiliser les modules ES6 directement avec webpack tout en étant compatible avec les navigateurs anciens.

Il faut créer un fichier de configuration *webpack.config.js*
```js
module.exports = {
    entry: "./script.js", // dit à webpack le point d'entrée de notre projet
    output: {
        filename: "bundle.js" // dit à webpack le nom du fichier produit
    }
}
```

Il faut ensuite indiquer dans le fichier HTML que le fichier de script à utiliser est celui créé par webpack. On peut aussi enlever la dépendance jquery du fichier HTML et l'importer dans le script où on l'utilise, webpack l'embarquera dans le fichier *bundle.js* qu'il va générer dans un dossier *dist* (pour distribution).
```html
<!DOCTYPE html>
<html>
    <head>
        <title>NPM</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <script src="./dist/bundle.js"></script>
    </body>
</html>
```
```js
// script.js
import {myLog} from "./external.js"
import jQuery from "jquery"

myLog("Hello !")

jQuery(document).ready(function(){
    console.log("jQuery est prêt !");
});

// external.js
export const myLog = message => console.log(`** My Log ** : ${message}`)
```
----

## Exécuter Webpack

On va lancer l'exécutable de webpack. Dans le dossier *.bin* de node_modules, il y a tous les exécutables. Pour lancer webpack, on va exécuter la commande `node_modules/.bin/webpack`. Le fichier *bundle.js* a été créé en enpaquetant nos fichiers javscript. On peut lancer notre page HTML et ça fonctionne comme avant san utiliser les modules.

Pour éviter de lancer la commande `node_modules/.bin/webpack` à chaque fois, on va créer une tâche dans le fichier *package.json* que l'on pourra exécuter à la place de cette commande. Pour excécuter la tâche, on lancera la commande `npm run build`
```js
// package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack" // ajout de la tâche build qui crée notre fichier bundle.js
  }
  ```

  On peut faire mieux en disant à webpack d'observer notre code et de recompiler le code pour recréer *bundle.js* quand il observe des modifications sans relancer la commande de build. Pour cela, on va ajouter une propriété dans le fichier de configuration de webpack. Lorsqu'on fait une modification et que l'on sauvegarde, il n'y a plus qu'à rafraîchir la page HTML pour voir le changement.
  ```js
  // webpack.config.js
module.exports = {
    watch: true, // ajout de cette proriété pour que webpack observe notre code et recompile lorsqu'il y a des changements
    entry: "./script.js",
    output: {
        filename: "bundle.js"
    }
}
```

----

## Serveur local Webpack

Pour éviter d'avoir à recharger la page HTML à chaque modification du code JavaScript, on va mettre en place un serveur de développement local. On va installer un nouveau paquet avec la commande `npm install --save-dev webpack-dev-server`.
On va exécuter la commande `node_modules/.bin/webpack-dev-server` qui compile notre code et le met à disposition à l'adresse **localhost:8080**. En faisant des modifications dans le code et que l'on enregistre, la page est relancé automatiquement. On peut créer une tâche dans les scripts dans le fichier *package.json* : `"start": "webpack-dev-server --open"`. `--open` permet de lancer la page HTML dans le navigateur avec la commannde `npm run start`.

----

## Architecture des fichiers

Pour le moment, tous les fichiers sont mis à la racine du projet. On va réorganiser tout ça

- un dossier **src** qui contient le code de développement, les fichiers sources JavaScript
- un dossier **dist** qui contient le code de distribution que voit le public, le fichier index.html et le fichier bundle.js

Il faut mettre à jour le fichier de configuration de webpack pour que ça fonctionne bien
```js
// webpack.config.js
const path = require("path") // permet de créer des chemins absolus à partir des chemins relatifs car webpack attend à certains endroits des chemins absolus
module.exports = {
    watch: true,
    entry: "./src/script.js", // dit à webpack le point d'entrée de notre projet
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js" // dit à webpack le nom du fichier produit
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"), // dit au serveur de nous servir ce qu'il y a dans le dossier dist au lieu de la racine du projet
        open: true // lance le navigateur automatiquement au lancement du serveur, ce qui évite de mettre --open dans la tâche
    }
}

// index.html
<!DOCTYPE html>
<html>
    <head>
        <title>NPM</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <script src="bundle.js"></script>
    </body>
</html>
```

----

----

# Babel

----

## Qu'est-ce que Babel

Babel est un transpileur qui va traduire notre code ES6-ES7 en ES5 équivalent, ce qui nous permettra d'être compatible avec les anciennes versions des navigateurs.

----

## Babel loader

C'est une fonctionnalité de webpack qui va permettre de transpiler le code en ES5 au moment de la création du fichier *bundle.js*.

Il faut commencer par installer les dépendances nécessaires `npm install --save-dev babel-loader babel-core babel-preset-env`. Il faut ensuite mettre à jour le fichier de configuration de webpack en ajoutant une partie.
```js
// webpack.config.js
module: {
    rules: [
        {
            // on teste si c'est un fichier JS
            test: /\.js$/,
            // on ne traite pas les fichiers dans node_modules
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                }
            }
        }
    ]
}
```

----

## Babel polyfill

ES6-ES7 n'apportent pas que de la nouvelle syntaxe mais aussi de nouveaux éléments. Quand on utilise un nouvel élément ES6, on ne peut pas le traduire en ES5, ce qui peut poser des problèmes de compatibilité avec les anciens navigateurs. Dans ce cas, on peut utiliser un **polyfill**, qui est un bout de code qui contient ces nouveaux éléments, ce qui permet d'ajouter les éléments manquants au navigateur.

On va utiliser Babel polyfill. Il faut commencer par l'installer avec la commande `npm install --save babel-polyfill`. Il faut ensuite mettre à jour le fichier de configuration de webpack en ajoutant *babel-polyfill* dans les fichiers en entrée. Il faut aussi importer *babel-polyfill* dans le fichier d'entrée JavaScript.

```js
// webpack.config.js
module.exports = {
    watch: true,
    entry: ["babel-polyfill", "./src/script.js"], // dit à webpack le point d'entrée de notre projet
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js" // dit à webpack le nom du fichier produit
    }

// script.js
import "babel-polyfill"
import {myLog} from "./external.js"

myLog("Hello !")
```