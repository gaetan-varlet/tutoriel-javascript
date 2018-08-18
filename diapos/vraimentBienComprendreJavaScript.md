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

