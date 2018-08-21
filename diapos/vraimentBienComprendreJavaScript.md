# Vraiment bien comprendre JavaScript

----
----

# Les variables

----

## Les différents types de variables

```js
console.log(true); console.log(typeof true) // boolean
console.log(1); console.log(typeof 1) // number
console.log("Louis"); console.log(typeof "Louis") // string
console.log({name: "Louis"}); console.log(typeof {name: "Louis"}) // object
```

Différence entre **undefined**, **null** et **is not defined**
- *undefined* : variable déclarée mais n'a pas reçu de valeur
- *null* : variable définie par l'utilisateur
- *is not defined* : variable non déclarée
```js
var a; console.log(a) // undefined
var b = null; console.log(b) // null
console.log(c) // c is not defined
```

----

## Le hoisting (hissage)

JavaScript passe le code en revu et recherche les déclarations de fonction et les hisse dans le haut de code, ce qui fait qu'on peut exécuter une fonction avant de la déclarer.
```js
addition(1,3)

function addition(a,b){
	console.log(a+b)
}
```

Cela fonctionne pour les déclarations de fonction, mais pas pour les fonctions anonymes stockées dans une variable comme l'exemple ci-dessous. Pour que cet exemple fonctionne, il faut appeler `addition()` après sa déclaration.
```js
addition(1,3)

var addition = function(a,b){
	console.log(a+b)
}
```

JavaScript hisse également la déclaration des variables, sans l'assignation de la valeur.
```js
console.log(x) // undefined
var x = 5

console.log(y) // y is not defined
```
C'est comme-ci on avait fait :
```js
var x
console.log(x) // undefined
var x = 5
```

----

## Les types primitifs vs les objets

Les variables de type primitif sont copiés par valeur, les variables de type objet sont copiés par référence.  
```js
var x = 5 // 5 est stocké en mémoire dans la variable x
var y = x // 5 est stocké en mémoire dans la variable y
y = 8 // 8 est stocké en mémoire dans la variable y
console.log(x)
console.log(y)

var a = {name: "Louis"} // un espace mémoire est créé pour stocker l'objet `{name:"Louis"}` et l'adresse de cet espace mémoire est stockée dans l'espace mémoire de la variable a. On dit que l'espace mémoire de a est un pointeur.
console.log(a) // affiche {name: "Louis"}
var b = a // un espace mémoire est crée pour b qui pointe vers le même objet que a
b.name = "Gaëtan" // comme a et b pointe vers le même objet, la modification de b entraîne donc la modification de a
console.log(a) // affiche {name: "Gaëtan"}
console.log(b) // affiche {name: "Gaëtan"}

var a = {name: "Louis"}
console.log(a) // affiche {name: "Louis"}
var b = a
b = {name: "Gaëtan"} // crée un nouvel objet qui est stocké dans un nouvel espace mémoire. b ne pointe donc plus vers le même objet que a
console.log(a) // affiche {name: "Louis"}
console.log(b) // affiche {name: "Gaëtan"}
```

----

## La déclaration des variables

Avec l'ES6, en plus du mot clé `var`, on peut utiliser les mots-clés `let` et `const`.
```js
var a = 5
console.log(a) // 5
let b = 6
console.log(b) // 6
const c = 7
console.log(c) // 7
```

 Une constante doit avoir une valeur dès sa déclaration et ne pas peut être modifiée. On ne peut pas faire :
 ```js
const a; // ERREUR
const b = 1;
b=2; // ERREUR
```

On ne peut pas assigner un nouvel objet à une variable `const` mais on peut modifier les propriétés d'un objet
```js
const a = {name: "Louis"}
a.name = "Gaëtan"
console.log(a) // {name: "Gaëtan"}

const b = {name: "Louis"}
b = {name: "Gaëtan"} // Erreur : on ne peut pas modifier la valeur d'une const
```

Il n'y a pas de hissage avec `const` et `let` comme avec `var`
```js
console.log(a) // undefined
var a = 5
console.log(b) // b is not defined
let b = 5
```

----

## Quand utiliser `let`, `const` et `var`
- ne plus utiliser le `var`
- toujours utiliser le `const`
- si on réassigne une valeur à la variable, utiliser le `let`

----
----

# Les scopes

----

## Contexte d'exécution

Un contexte d'exécution est un contexte dans lequel un certain bout de code est exécuté. Cela concerne les infos sur les variables qu'il va définir, auquel il va pouvoir accéder... A chaque fois qu'une **fonction est exécutée**, un nouveau contexte d'exécution est créé. Pour le code qui n'est pas dans une fonction, il appartient au contexte d'exécution global.
Un contexte d'exécution est composé de 3 choses :
1. **l'objet des variables** : fonctions et variables qui sont définies dans ce bout de code
2. **la chaîne des scopes** : variables auquel peut accéder ce bout de code
3. **le this** : l'objet associé à ce bout de code

----

## L'objet des variables

L'objet des variables, ou *Variable Objet (VO)*, est créé et initialisé pendant la phase de création du contexte d'exécution.
Il contient :
- les arguments de la fonction
- les déclarations de fonctions avec le hoisting
- les déclarations de variables avec le hoisting (les variables déclarées avec *var*)

----

## La chaîne des scopes

Le scope veut dire portée en français. Cela permet de savoir à quel endroit du code il est possible d'accéder à quelle variable.
Le code qui n'appartient à aucune fonction appartient au scope global. A chaque fois qu'une fonction est exécutée, un scope local est créé, on parle de **scope de fonction**. Pour les variables créées avec **let** et **const**, un **scope de bloc** est créé (cf ci-après).
Une règle de base sur les scopes est qu'une fonction enfant peut accéder au scope de ses parents, c'est-à-dire à son objet des variables ainsi qu'à l'objet des variables de ses parents.

Si on déclare une variable dans une fonction alors qu'une variable avec le même nom existe déjà dans un scope supérieur, une nouvelle variable est définie, dans un espace mémoire différent, et c'est celle du scope local qui est utilisée.

Lorsqu'on cherche une variable, on cherche d'abord la variable dans le scope local et si elle n'existe pas, on remonte la chaîne des scopes jusqu'à trouver notre variable.

----

## Le scope de bloc (ES6)

Chaque fonction crée un nouvdau scope. Jusqu'à l'arrivée d'ES6, il n'y avait que le scope de fonction. Lorsqu'on déclare des variables avec **let** et **const**, les variables ne respectent pas les scopes de fonction mais les scopes de bloc. Un bloc est tout ce qui est entre accolades.
Par exemple, le code suivant ne fonctionne pas alors que ça aurait fonctionné avec le mot clé *var*.
```js
if(true){
	let a = 5;
}
console.log(a) // a is not defined
```
L'exemple suivant fonctionne car la variable est définie dans le même scope qu'on souhaite l'afficher
```js
let a
if(true){
	a = 5;
}
console.log(a) // affiche 5
```

Il faut éviter d'utiliser le mot clé **var** et privilégier **const** et **let** pour éviter les mauvaises surprises. Par exemple :
```js
var i = 62
for(i = 0 ; i < 10 ; i++){
	console.log(i)
}
console.log(i)
// affiche 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 et 10

let i = 62
for(let i = 0 ; i < 10 ; i++){
	console.log(i)
}
console.log(i)
// affiche 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 et 62
```

----
----

# Les fonctions

----

## Fonction Première Classe

Les fonctions sont des objets de première classe, c'est-à-dire que ce sont des objets comme les autres.

- une fonction peut prendre une fonction en argument
```js
function addTwo(numberToAdd){
	return numberToAdd + 2
}
function myFunction(argFunction, number){
	const x = argFunction(number)
	console.log(x)
}
myFunction(addTwo, 5)
// affiche 7
```
- une fonction peut retourner une autre fonction
```js
function myFunction(){
	return function(number){
		return number * 2
	}
}
console.log(myFunction) // affiche la déclaration de myFonction
console.log(myFunction()) // affiche la déclaration de la fonction anonyme : ƒunction(number){return number * 2}
console.log(myFunction()(3)) // affiche 6
```
- on peut assigner une fonction à une variable
```js
const returnedFunction = function(){
	return 5+2
}
console.log(returnedFunction()) // affiche 7
```

```js
 function myFunction(){
	return 5+2
}
const returnedFunction = myFunction()
console.log(returnedFunction) // affiche 7
```

----

## Les closures

Une closure, est une fermeture. C'est une fonction qui a enfermé avec elle des variables qui lui sont externes, provenant d'un scope parent.

```js
function multiplyBy(number){
	const closedVariable = number
	return function(anotherNumber){
		return closedVariable * anotherNumber
	}
}
const multiplyByFive = multiplyBy(5)
const multiplyByThree = multiplyBy(3)

console.log(multiplyByFive) // function(anotherNumber){return closedVariable * anotherNumber}
console.log(multiplyByFive(2)) // 10
console.log(multiplyByThree(2)) // 6
```
Dans cet exemple, mutilyByFive utilise la variable closedVariable lors de son exécution avec lesparamètre 2, alors que closedVariable fait parti du contexte d'exécution de multiplyBy(5) qui a disparu après l'exécution de la fonction, donc closedVariable devrait avoir disparu, mais il est toujours disponible dans multiplyByFive, c'est ce qu'on appelle une closure car la fonction a capturé une variable d'un scope parent. C'est la même chose pour multiplyByThree.

----

## Méfiez-vous des scopes

Il faut protéger ses variables pour éviter qu'elles soient "piratées" par un autre script. Exemple avec une page HTML qui charge 3 scripts :
```html
<!DOCTYPE html>
<html>
<head>
    <script src="script1.js"></script>
	<script src="script2.js"></script>
    <script src="script3.js"></script>
</head>
```

```js
// script1.js
var myPassword = "12345"
function setPassword(newPassword){
	myPassword = newPassword
}
function getPassword(){
	return myPassword
}

// script2.js
var myPassword = "000"

// script3.js
console.log(getPassword()) // affiche 000 alors qu'on voulait 12345
```
Dans le script 3, on veut récupérer myPassword de script 1 mais elle a été écrasé par myPassword du script 2 car les variables ont le même nom et elles sont toutes les 2 dans le scope global.

Il faut éviter au maximum de rattacher les variables au scope global. Il faut définir ce qu'on souhaite rendre privé (uniquement utilisable dans le script courant) et ce qu'on veut rendre public, c'est-à-dire rendre accessible aux autres scripts. Pour cela on va utiliser les IIFEs

----

## IIFEs

Les fonctions immédiatement exécutées se nomment des **Immediatly-Invoked Function Expression**, abrégées IIFE. L'idée est déclarer la fonction et de l'exécuter en même temps. En utilisant une IIFE, tout le code exécuté dedans sera privé et non accessible de l'extérieur.
```js
// fonction classique
function myFunction(){
	// code de la fonction
}

// IIFE
(function(){
	// code de la fonction
})()
```

Pour revenir à notre exemple précédent où lon veut rendre public `getPassword()` et rendre privé `myPassword` et `setPassword`, on peut utiliser les IIFEs et les closures pour résoudre ce problème.

```js
const getPassword = (function(){
	var myPassword = "12345"
	function setPassword(newPassword){
		myPassword = newPassword
	}
	return function(){
		return myPassword
	}
})()
```
Cet exemple permet de rendre accessible la fonction getPassword uniquement de ce script. Cependant, cela permet uniquement d'exposer une variable ou une fonction. Il est possible de rendre public plusieurs éléments public en retournant un objet :
```js
const script1 = (function(){ var myPassword = "12345"
	function setPassword(newPassword){
		myPassword = newPassword
	}
	function getPassword(){
		return myPassword
	}
	return {
		getPassword: getPassword,
		setPassword: setPassword,
	}
})()

// appel dans le script 3
console.log(script1.getPassword())
```

----

## Le mot clé THIS

A chaque contexte d'exécution est associé un objet. `this` permet d'accéder à cet objet.
```js
console.log(this) // donne Window qui est l'objet global dans le navigateur. JavaScript exécuté dans un autre environnement comme un serveur aurait donné un autre objet global.
```

Le `this` est l'objet qui a exécuté la méthode, sinon ce sera l'objet global
```js
function first(){
    console.log(this)
}

first() // Window

const louis = {
    name: "Louis",
    present: first
}
louis.present() // {name: "Louis", present: ƒ}
```

----

## Choses bizarres

Les déclarations de variables avec `var` et les déclarations de fonctions dans le contexte d'exécution global sont stockées dans l'objet global Window. Ce n'est pas le cas pour les variables déclarées avec `let` et `const`.
```js
var a = 5

function allo(){
}

console.log(this) // on retrouve a et allo() dans Window

var myName = "Louis"
console.log(window.myName === this.myName && window.myName === myName) // affiche true
```

Si on oublie le mot clé `var` pour déclarer une variable, elle est automatiquement rattaché à l'objet global, même si elle est déclarée dans une fonction.
```js
function allo(){
    b = 9
}
allo()
console.log(this) // on retrouve b dans l'objet Window
```

Pour éviter cela, on peut utiliser le mode strict en ajoutant la commande `'use strict'` en haut du fichier javascript et ce qui aura pour effet dans le script précédent de renvoyer une erreur en disant que b n'est pas défini.

----

## Bind, Call et Apply

Ces méthodes vont permettre de contrôler la valeur du `this`.

`bind` est une méthode qui permet de changer la valeur du this en appliquant le this d'un autre objet.
```js
function first(){
    console.log(this)
}
first() // affiche l'objet global Window

const louis = {
    name: "Louis",
    present: function(){
        console.log(this)
    }
}

const second = first.bind(louis) // fixe le this de louis sur la fonction second
second() // affiche l'objet louis

louis.present() // affiche l'objet louis
louis.present.bind(window)() // affiche l'objet Window car on a changé la valeur de this en mettant Window à la place de louis
```

Voici quelques autres exemples
```js
var name = "Louis"

function present(){
    console.log(this.name)
}

const kev = {
    name: "Kévin",
    present: present
}

const thib = {
    name: "Thibaut",
    present: present.bind(this)
}

const presentKev = kev.present
const presentKevBind = kev.present.bind(kev)
const presentKevBind2 = kev.present.bind(this)

present() // affiche Louis : comme ce n'est pas un objet qui exécute la fonction, c'est l'objet global Window qui l'exécute. Le this est donc associé à Window, on cherche donc à logguer un window.name et on a déclaré la variable name dans le scope global, qui est donc attaché à l'objet Window, donc window.name = "John"
kev.present() // affiche Kévin : present est exécutée en tant que méthode de l'objet kev donc le this est kev
presentKev() // affiche Louis : presentKev est égale à une méthode d'un objet mais elle est exécutée en tant que fonction et n'est pas associée à un objet, le this est donc Window
presentKevBind() // affiche Kévin : comme la méthode précédente sauf que le this a été bindé avec l'objet kev
presentKevBind2() // affiche Louis comme pour presentKev en bindant le this qui correspond à Window, donc ça ne change rien de faire le bind dans ce cas
thib.present() // affiche Louis : la méthode present est bindée avec this dans l'objet franck et le this correspond à Window à ce moment là
```

`bind` permet aussi de fixer la valeur des arguments que va prendre la nouvelle fonction que l'on crée.
```js
function multiply(number1, number2){
    return number1 * number2
}

// on fixe la valeur du premier argument de multiply à 2.
// multiplyByTwo prend donc un seul argument qui correspond au number2 de multiply
const multiplyByTwo = multiply.bind(this, 2)

console.log(multiplyByTwo(3)) // affiche 6
```

Les méthodes `call` et `apply` ne créent pas une nouvelle fonction qu'il faut ensuite exécuter comme `bind`, elles l'exécutent directement.
```js
function multiply(number1, number2){
    console.log(this)
    console.log(number1 * number2)
}

const louis = {
    name: "Louis"
}

multiply.bind(louis, 2, 3)() // affiche louis et 6
// call exécute directement multiplly
multiply.call(louis, 2, 3) // affiche Window et 6 comme bind
// apply prend les arguments de la fonction dans un tableau
multiply.apply(louis, [2, 3]) // affiche Window et 6 comme bind
```

----

## Les fonctions fléchées (Arrow Functions)

Les fonctions fléchées ont 2 particularitées :
- la syntaxe est plus rapide
- elles vont fixer la valeur du this automatiquement

La syntaxe :
```js
const myFunction = arg => arg * 5
console.log(myFunction(3)) // affiche 15

const myFunction2 = () => 4 * 5
console.log(myFunction2()) // affiche 20

const myFunction3 = (nombre1, nombre2) => nombre1 * nombre2
console.log(myFunction3(3, 4)) // affiche 12
```

On peut utiliser des accolades si la fonction fait davantage que retourner une valeur, comme par exemple exécuter du code avant.
```js
const myFunction3 = (nombre1, nombre2) => {
    const nombreCalcule = nombre1 * nombre1    
    return nombreCalcule * nombre2
}
console.log(myFunction3(3, 4)) // affiche 36 (3 * 3 * 4)
```

Fonctionne aussi sur les objets
```js
louis = {
	name: "Louis",
    // syntaxe classique	
    present: function(friend){
		return "Tu connais "+friend+" ?"
	}, // nouvelle syntaxe
    presentArrow: friend => "Tu connais "+friend+" ?"
}

console.log(louis.present("Kévin"))
console.log(louis.presentArrow("Thibaut"))
```

Les fonctions fléchées fixent la valeur du this automatiquement.

Dans l'exemple ci-dessous, le this de *presentClassic* est l'objet louis car c'est l'objet louis qui a exécuté la méthode. Pour *presentArrow*, son this est Windows. Une fonction fléchée capture le this du scope parent où elle a était déclarée. Il faut donc regarder à quoi correspond le this de l'endroit où elle a été déclarée. Cela revient au même que l'exécution d'une fonction classique où on aurait bindé le this.

```js
function classicFunction(){  
    console.log(this)
}

const classicFunctionBind = classicFunction.bind(this)

const arrowFunction = () => {  
    console.log(this)
}
const louis = {
    name: "Louis",
    presentClassic: classicFunction,
    presentClassicBind: classicFunctionBind,
    presentArrow: arrowFunction,
}

louis.presentClassic() // affiche louis
louis.presentClassicBind() // affiche Window
louis.presentArrow() // affiche Window
```

----
----

# Les objets

----

## Fonction constructeur

Une fonction constructeur est un moule. En exécutant cette fonction, on crée des instances basées sur ce moule.
```js
function Person(name, age){
	this.name = name
	this.age = age
	this.present = () => {console.log("Hello my name is "+this.name)}
}

let louis = new Person("Louis", 0)
let thibaut = new Person("Thibaut", 23)

louis.present() // Hello my name is Louis
thibaut.present() // Hello my name is Thibaut

console.log(louis) // affiche l'objet louis
console.log(thibaut) // affiche l'objet thibaut

console.log(louis.present === thibaut.present) // affiche false
```

`present` de louis et `present` de thibaut sont 2 méthodes différentes qui font la même chose, donc elles sont stockées deux fois en mémoire alors qu'on aurait pu les stocker qu'une fois. On va pouvoir faire cela avec les prototypes.

----

## Les prototypes

On va stocker la fonction dans le prototype de Person, comme ça elle sera unique. Il faut utiliser une fonction classique au lieu d'une fonction fléchée, car une fonction fléchée capturerait le this de l'endroit où elle est déclarée, c'est-à-dire l'objet global.

```js
function Person(name, age){
	this.name = name
	this.age = age
	//this.present = () => {console.log("Hello my name is "+this.name)}
}

Person.prototype.present = function(){
 console.log("Hello my name is "+this.name)
}

let louis = new Person("Louis", 0)
let thibaut = new Person("Thibaut", 23)

louis.present() // Hello my name is Louis
console.log(louis.present === thibaut.present) // affiche true
```

Dans l'exemple précédent sans utiliser les prototypes, si on regarde ce que contient l'objet *Person*, il y a les attributs *name* et *age*, la fonction *present*, et l'objet `__proto__`, qui contient lui-même le constructeur de *Person*. En déclarant la fonction dans le prototype, la fonction *present* n'est plus dans l'objet *Person* mais dans l'objet `__proto__`.

`__proto__` correspond au prototype de la personne et il est accessible à toutes les instances créées avec la fonction constructeur *Person*.
```js
console.log(louis.__proto__ === Person.prototype) // affiche true
console.log(louis.__proto__ === thibaut.__proto__) // affiche true
```

----

## Tout est un objet

Si on rentre dans l'objet `__proto__` de *Person*, il y a un autre `__proto__` qui est celui d'*Object*. *Object* est l'objet le plus haut, il n'y a rien au dessus. Pratiquement tout en Javascript descend d'*Object*, comme par exemple les *Array* (tableaux), les *String*, les *Number*, les fonctions.

Exemple en partant du code de l'exemple précédent :
```js
const myObject = {}
console.log(louis.__proto__.__proto__ === myObject.__proto__) // affiche true
```

Cela permet d'utiliser les méthodes des objets parents, comme par exemple la méthode *hasOwnProperty* qui renvoi un booléen pour savoir si une propriétée passée en paramètre existe dans l'objet.
```js
console.log(louis.hasOwnProperty("name")) // affiche true
console.log(louis.hasOwnProperty("color")) // affiche false
```

----

## La chaîne des constructeurs

Les objets ont accès aux méthodes déclarées dans la fonction constructeur, dans le prototype, et aux méthodes des prototypes parents, notamment d'*Object*. Si une méthode à le même nom dans la fonction constructeur et dans le prototype, c'est celle dans la fonction constructeur qui sera exécutée car il y a un ordre de préférence. C'est ce qu'on appelle la **chaîne des prototypes** :
- la méthode est d'abord recherchée sur notre objet lui-même
- si rien n'est trouvé, elle est cherchée sur le prototype de notre objet
- si rien n'est encore trouvé, elle est cherchée sur le prototype de l'objet parent, par exemple *Object*

```js
function Person(name, age){
	this.name = name
	this.age = age
}

let louis = new Person("Louis", 0)

console.log(louis.hasOwnProperty("name")) // affiche true. C'est la méthode d'Object qui a été exécutée

Person.prototype.hasOwnProperty = function(text){
 return(text)
}

console.log(louis.hasOwnProperty("name")) // affiche name. C'est la méthode redéfinie dans le prototype de Person qui a été exécutée
```

----

## Les classes (ES6)

Avec l'arrivée d'ES6, pour construire un objet, au lieu de faire une fonction constructeur et ajouter des méthodes sur le prototype, on peut créer des classes.

En ES5 :
```js
function Person(name, age){
	this.name = name
	this.age = age
}

Person.prototype.present = function(){
 console.log("Hello my name is " + this.name)
}

let louis = new Person("Louis", 0)
louis.present() // affiche : Hello my name is Louis
```

En ES6 avec les classes :
```js
class Person {
    constructor(name, age){
        this.name = name
	    this.age = age
    }

    present(){
        console.log("Hello my name is " + this.name)
    }
}
let louis = new Person("Louis", 0)
louis.present() // affiche : Hello my name is Louis
```

Pour créer un objet avec les classes, c'est comme avant avec le mot clé `new`. Le changement est uniquement syntaxique pour simplifier l'écriture du code. L'objet créé est exactement le même que si on l'avait créé avec la fonction constructeur et en déclarant les méthodes dans le prototype.