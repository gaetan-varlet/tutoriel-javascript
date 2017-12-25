# Les objets et les tableaux

----

## Introduction aux objets
JavaScript est un langage orienté objet, cela veut dire que le langage dispose d’objets, qui disposent d’une structure. JavaScript met à notre disposition des objets natifs : un nombre, une chaîne de caractères, un booléen. On dit que JavaScript n’est pas un langage typé car les variables contiennent toujours la même chose : un objet. Cet objet peut être de nature différente (nombre, booléen…). Il est également possible de créer nos propres objets, ce qui sera vu plus tard car plus compliqué.

Les objets contiennent trois choses distinctes :
- un constructeur
  - code utilisé quand on utilise un nouvel objet
  - permet d’effectuer des actions comme définir diverses variables
  - réalisé automatiquement pour les objets natifs
- des propriétés
  - une propriété est une variable contenue dans l’objet
- des méthodes
  - il est possible de modifier l’objet grâce aux méthodes qui sont des fonctions contenues dans l’objet, qui permettent de réaliser des opérations sur le contenu de l’objet

```javascript
var myString = 'Ceci est une chaîne de caractères'; // On crée un objet String

alert(myString.length); // On affiche le nombre de caractères, au moyen de la propriété « length »

alert(myString.toUpperCase()); // On récupère la chaîne en majuscules, avec la méthode toUpperCase()
```
Le point après un objet permet d’accéder aux propriétés et aux méthodes d’un objet.

Nous avons déjà découvert trois objets natif : Number, Boolean, String. On allons maintenant découvrir l’objet **Array** qui gère les tableaux.

----

## Les tableaux
Un tableau, array en anglais, contient plusieurs valeurs appelées **item**. Chaque item est accessible au moyen d’un indice dont la numérotation commence à 0.
```javascript
// syntaxe courte
var myArray = [42, 'Sébastien', 12, 'Laurence'];
// syntaxe longue
var myArray = new Array('Sébastien', 'Laurence', 'Ludovic', 'Pauline');
```
Pour récupérer la valeur de l’index 1, il suffit de spécifier l’index voulu :
```javascript
alert(myArray[1]); // Affiche : « Sébastien»
```
Pour modifier le contenu d’un item :
```javascript
myArray[1] = 'Clarisse';
alert(myArray[1]); // Affiche : « Clarisse »
```

----

## Opérations sur les tableaux

### Ajouter et supprimer des items
La méthode `push()` permet d’ajouter un ou plusieurs items à un tableau, en peut recevoir un nombre illimité de paramètres qui représente un ou des items à ajouter à la fin du tableau.
```javascript
var myArray = ['Sébastien', 'Laurence'];
myArray.push('Pauline', 'Guillaume'); // Ajoute « Pauline » et « Guillaume » à la fin du tableau
```
La méthode `unshift()` fonctionne comme push() sauf que les items sont ajoutés au début du tableau.

Les méthodes `shift()` et `pop()` retirent respectivement le premier et le dernier élément du tableau.
```javascript
var myArray = ['Sébastien', 'Laurence', 'Ludovic', 'Pauline', 'Guillaume'];
myArray.shift(); // Retire « Sébastien »
myArray.pop(); // Retire « Guillaume »
```

### Chaînes de caractères et tableaux
Les chaînes de caractères possèdent une méthode `split()` qui permet de les découper en un tableau, en fonction d’un séparateur.
Par exemple ici, la chaîne va être coupée à chaque fois qu’il y a un espace, et chaque élément est placé dans un tableau.
```javascript
var cousinsString = 'Pauline Guillaume Clarisse';
var cousinsArray = cousinsString.split(' ');
```
L’inverse de split(), c’est-à-dire créer une chaîne de caractères depuis un tableau, se nomme `join()`. ici, une chaîne de caractères est créée et les valeurs de chaque item sont séparées par un tiret. Sans rien spécifier comme séparateur, les chaînes seront collées les unes aux autres.
```javascript
var cousinsString_2 = cousinsArray.join('-');
```
Une méthode peut retourner une valeur, comme une fonction indépendante d’un objet. `split()` et `join()` retournent d’ailleurs le résultat de leur exécution et ne l’appliquent pas directement à l’objet.

----

## Parcourir un tableau
C’est très important car ce sera très fréquemment utilisé en JavaScript surtout pour agir avec les éléments HTML.

**Parcourir avec un for**
Le principe est simple, il faut autant d’itération qu’il y a d’items, que l’on récupère avec la propriété length.
```javascript
for (var i = 0; i < myArray.length; i++) {
    alert(myArray[i]);		
}
```

Le bloc de condition (deuxième bloc d’une boucle for) est exécuté à chaque itération donc myArray.length est utilisé à chaque itération, ce qui peut ralentir la boucle (de manière infime, imperceptible sur les navigateurs récents).  
Si le nombre d’items du tableau ne change pas, il est conseillé de définir une seconde variable dans le bloc d'initialisation qui contiendra la valeur de length.
```javascript
for (var i = 0, c = myArray.length; i < c; i++) {
    alert(myArray[i]);		
}
```

----

## Les objets littéraux

### La syntaxe d’un objet
Il est possible d’accéder aux items d’un tableau via leur indice. Il est possible d’y accéder via un identifiant dans un **objet littéral**. Un objet est similaire à un tableau sauf que l’on met des accolades à la place des crochets.
```javascript
var myObject = {};
```

Pour définir dès l’initialisation les items à ajouter, il suffit d’écrire l’identifiant suivi de deux points et de la valeur à lui attribuer. La séparation des items se fait comme pour un tableau, avec une virgule.
```javascript
var myObject = {
    item1: 'Texte 1',
    item2: 'Texte 2'
    sister: 'Laurence',
    brother: 'Ludovic'
};
```

### Accès aux items

Les identifiants sont en réalité des propriétés comme la propriété length d’un tableau ou d’une chaîne de caractères. Par exemple, pour récupérer le nom de la soeur, il suffit de faire :
```javascript
family.sister;
family['sister']; // autre manière comme pour accéder à un item d’un tableau
```
Cette deuxième méthode est utile si l’identifiant est contenu dans une variable
```javascript
var id = 'sister';
alert(family[id]); // Affiche : « Laurence »
```

### Ajouter des items
Pas de méthode push() ici. Il est possible d’ajouter un item en spécifiant un identifiant qui n’est pas encore présent. Par exemple :
```javascript
family['uncle'] = 'Didier'; // « Didier » est ajouté et est accessible via l'identifiant « uncle »
family.uncle = 'Didier'; // Même opération mais d'une autre manière
```

### Parcourir un objet avec *for in*
Il n’est pas possible d’utiliser une boucle *for* car elle incrémente une variable numérique ce qui est inutile sur un objet littéral puisque nous devons posséder un identifiant.
La boucle **for in** ne sert qu’à une chose : parcourir un objet.
Le fonctionnement est quasiment le même que pour un tableau, excepté qu’il suffit de fournir une “variable clé” qui reçoit un identifiant (au lieu d’un index) et de spécifier l’objet à parcourir :
```javascript
for (var id in family) { // On stocke l'identifiant dans « id » pour parcourir l'objet « family »
    alert(family[id]);		
}
```

### Utilisation des objets littéraux
Peu utilisés mais peuvent être utile pour ordonner un code. On les utilise aussi dans les fonctions, car return ne sait retourner qu’une seule variable. Avec un objet, il est possible de retourner plusieurs variables en stockant les résultats dans l’objet, plus commode qu’un tableau.
Exemple d’une fonction qui calcule des coordonnées d’un élément HTML sur une page Web et retourne les coordonnées x et y.
```javascript
function getCoords() {
    /* Script incomplet, juste pour l'exemple */
    return {
        x: 12,
        y: 21
    };
}

var coords = getCoords();

alert(coords.x); // 12
alert(coords.y); // 21
```
