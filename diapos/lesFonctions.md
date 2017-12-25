# Les fonctions

----

## Concevoir des fonctions
```javascript
function myFunction(arguments) {
    // Le code que la fonction va devoir exécuter
}
```
L’utilité basique des fonctions est d’éviter la répétition de code.

----

## La portée des variables
Toute variable déclarée dans une fonction n’est utilisable que dans cette même fonction, appelée **variable locale**. Lorsqu’une variable n’est accessible que dans une partie du code, on dit qu’elle se trouve au sein d’un “scope”.

Les variables déclarées en-dehors des fonctions sont appelées **variables globales**, car elles sont accessibles partout dans le code, y compris dans les fonctions.

Si on crée une variable locale avec le même nom qu’une variable globale, la variable locale prend le dessus le temps de l’exécution de la fonction.

Par principe, il faut déclarer les variables qui ne servent que dans une fonction à l’intérieur de celle-ci et non pas de manière globale.

----

## Les arguments et les valeurs de retour
```javascript
function myFunction(arg) {
    alert('Votre argument : ' + arg);
}

function moar(first, second) {
    // On peut maintenant utiliser les variables « first » et « second » comme on le souhaite :
    alert('Votre premier argument : ' + first);
    alert('Votre deuxième argument : ' + second);
}
```
Les arguments sont propres à leur fonction, ils ne seront accessibles que dans cette fonction et nulle part ailleurs.

**Les valeurs de retour**
Chaque fonction ne peut retourner qu’une seule et unique valeur. Il est possible de contourner le problème en renvoyant un tableau ou un objet.
L’instruction return met fin à la fonction puis retourne la valeur.
```javascript
function sayHello() {
    return 'Bonjour !'; // L'instruction « return » suivie d'une valeur, cette dernière est donc renvoyée par la fonction
}
alert(sayHello()); // Ici on affiche la valeur retournée par la fonction sayHello()
```

----

## Les fonctions anonymes
Elles sont extrêmement importantes en JavaScript. Elles servent pour les objets, les événements, les variables statiques, les closures…
Elles n’ont pas de nom ! C’est la seule différence avec une fonction traditionnelle.
```javascript
function (arguments) {
    // Le code de votre fonction anonyme
}
```
Pour l’appeler, il existe de très nombreuses façons de faire. Pour le moment, il faut se limiter à une seule solution : assigner la fonction à une variable.
```javascript
var sayHello = function() {
    alert('Bonjour !');
};
sayHello(); // Affiche : « Bonjour ! »
```
La variable *sayHello* est devenue une fonction.

**Retour sur l’utilisation du `;`**
En JavaScript, il faut distinguer dans son code :
- les structures (fonctions, conditions, boucles…) : pas besoin de point-virgule
- les instructions (assignation de variable, exécution de fonction…) : point-virgule nécessaire

**Isoler son code**
Une utilisation intéressante des fonctions anonymes est l’isolement d’une partie du code, le but étant d’éviter qu’une partie du code affecte tout le reste.
```javascript
// Code externe
(function() {
    // Code isolé
})();
// Code externe
```
On distingue une fonction anonyme, puis deux paires de parenthèses, la première encadrant la fonction et une deuxième pare suivant la première.
Lorsqu’une fonction est déclarée, elle n’exécute pas immédiatement le code qu’elle contient, elle attend d’être appelée. Or nous souhaitons exécuter ce code immédiatement, la solution est donc d’utiliser ce couple de parenthèses.
Le premier couple de parenthèses permet de dire “je désigne cette fonction” pour que l’on puisse ensuite indiquer avec le deuxième couple que l’on souhaite l’exécuter.

Les fonctions immédiatement exécutées se nomment des **Immediatly-Invoked Function Expression**, abrégées IIFE.

Une fois les parenthèses ajoutées, la fonction (qui est une structure) est exécutée ce qui fait que l’on obtient une instruction, il faut donc ajouter un point-virgule.  
Notre fonction anonyme fonctionne exactement comme une fonction classique, sauf qu’elle ne possède pas de nom et qu’elle est exécutée immédiatement.  
L’intérêt de cet isolement de code concerne la portée des variables : toutes les variables de la fonction seront détruites une fois que la fonction aura fini de s’exécuter.  
Si on souhaite enregistrer dans le code global une valeur générée dans une zone isolée, il suffit d’utiliser l’instruction **return**.
