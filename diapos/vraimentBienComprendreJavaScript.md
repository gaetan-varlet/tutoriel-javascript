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
