# Les boucles

----

## L'incrémentation
Permet d’ajouter une unité à un nombre au moyen d’une syntaxe court. A l’inverse, la décrémentation permet de soustraire une unité.
```javascript
var number = 0;
number = number + 1;

number++;
number--;
```
L’ordre des opérateurs est important. Si on le place avant ou après la variable, le résultat sera différent si on récupère le résultat de l’incrémentation à cause de la priorité de l’opération. ++number retourne la valeur de number incrémentée, c’est-à-dire 1, number++ retourne la valeur de number avant qu’elle ne soit incrémentée, c’est-à-dire 0.
```javascript
var number = 0;
var output = ++number;
alert(number); // Affiche : « 1 »
alert(output); // Affiche : « 1 »

var number = 0;
var output = number++;
alert(number); // Affiche : « 1 »
alert(output); // Affiche : « 0 »
```

----

## La boucle while
C’est un répétition d’instruction jusqu’à ce qu’on dise à la boucle de s’arrêter. A chaque répétition, on parle d’itération. Tant que la condition est vraie, la boucle se répète.
```javascript
while (condition) {
    instruction_1;
    instruction_2;
    instruction_3;
}
```
Il est possible d’arrêter la boucle avec le mot clé **break**. Il est possible de mettre fin à une itération et faire continuer la boucle avec **continue**.

----

## La boucle do while
Elle ressemble à la boucle while sauf qu’elle est toujours exécutée au moins une fois. Dans le cas d’une boucle while, si la condition n’est pas valide, la boucle n’est pas exécutée. Avec do while, la boucle est exécutée une première fois, puis la condition est testée pour savoir si la boucle doit continuer.
```javascript
do {
    instruction_1;
    instruction_2;
    instruction_3;
} while (condition);
```
Utilisation très peu fréquente car il est possible d’utiliser une boucle while normale avec une condition qui fait que celle-ci est toujours exécutée une fois.

----

## La boucle for
Ressemble dans son fonctionnement à la boucle while
```javascript
for (initialisation; condition; incrémentation) {
    instruction_1;
    instruction_2;
    instruction_3;
}
```
L’incrémentation a lieu à la fin de chaque itération. Le premier tour de boucle dans l’exemple ci-dessous est donc fait avec iter=0.
```javascript
for (var iter = 0; iter < 5; iter++) {
    alert('Itération n°' + iter);
}
```

**Portée des variables de boucle**
En JavaScript, il est déconseillé de déclarer des variables au sein d’une boucle car il n’est pas nécessaire de déclarer une variable à chaque passage dans la boucle.
Il est conseillé de les déclarer dans le bloc d’initialisation, mais attention une fois la boucle exécutée, la variable existe toujours. Ce comportement est différent de celui de nombreux autres langages dans lesquels une variable déclarée dans une boucle est détruite une fois la boucle exécutée.

**Priorité d’exécution**
Les trois blocs de la boucle for ne sont pas exécutés en même temps :
- *initialisation :* juste avant que la boucle ne démarre
- *condition :* avant chaque passage de boucle
- *incrémentation :* après chaque passage de boucle. Cela veut dire que si on fait un break dans une boucle for, le passage dans la boucle lors du break ne sera pas comptabilisé.

La boucle `for` est très utilisée en JavaScript, bien plus que la boucle `while`. Le fonctionnement de JavaScript fait que la boucle `for` est nécessaire dans la majorité des cas comme la manipulation des tableaux ainsi que des objets. Nous verrons aussi une variante de la boucle `for`, appelée `for in`.
