# Déboguer votre code (1/3)
Nous allons commencer à étudier les différents bugs que l’on va généralement rencontrer en JavaScript et surtout comment les résoudre, en utilisant les kits de développement fournis avec n’importe quel navigateur digne de ce nom.


----

## En quoi consiste le débogage ?

### Les bugs
Ce sont des erreurs humaines laissées dans le code. Il existe deux types principaux de bugs :
- ceux que l’interpréteur JavaScript saura signaler : fautes de syntaxe
```
va myVar = 'test; // Le mot-clé « var » est mal orthographié et il manque une apostrophe
```
- ceux que l’interpréteur ne verra pas : erreurs dans l’algorithme
```javascript
// On veut afficher la valeur 6 avec les nombres 3 et 2
var myVar = 3 + 2;
// Mais on obtient 5 au lieu de 6 car on a fait une addition au lieu d'une multiplication
```
Une erreur syntaxique empêche le code de s’exécuter tandis que les erreurs d’algorithme ne pose aucun problème d’exécution.

### Le débogage
Cette technique consiste à supprimer les bugs qui existent dans le code.
Les bugs syntaxiques sont les plus simples à résoudre car l’interpréteur JavaScript signale généralement l’endroit où l’erreur est apparue.  
En ce qui concerne les bugs algorithmiques, il va falloir chercher nous-même. Le plus simple est souvent de remonter les couches de code pour trouver où l’erreur s’est produite.

---

## Les kits de développement et leur console
Tous les navigateurs récent possède un kit de développement : Chrome, Firefox, IE, Safari, Opéra… Ces kits permettent de déboguer efficacement nos codes : détection des erreurs syntaxiques, afficher des valeurs dans la console, consulter le code HTML généré par le code, analyser les requêtes HTTP effectuées par le navigateur, mesurer les performances du code, etc…
Les fonctionnalités des différents kits sont souvent identiques, mais il y a parfois quelques différences. Nous verrons surtout celui de Chrome.

Pour ouvrir le kit de développement, il faut appuyer sur **F12**.

Dans le cadre du débogage d’erreurs, il est très important de bien externaliser le code JavaScript car l’affichage des erreurs peut être erroné avec Chrome lorsque le code JS est directement intégré au sein du code HTML.

Consulter la console pour voir les erreurs. On peut par exemple voir SyntaxError qui mentionne une erreur syntaxique. A droite du texte, on voit le nom du fichier concerné ainsi que la ligne de code, qu’il est possible de consulter en cliquant dessus.
L’interpréteur JavaScript s’arrête sur la première erreur rencontrée, même s’il y a plusieurs erreurs. En corrigeant la première erreur, le navigateur affichera alors l’erreur suivante.

La console permet aussi de repérer des erreurs qui ne sont pas forcément liées au JavaScript, telles que des images manquantes par exemple. En cas de page web non conforme à ce qu’on attend, il faut toujours consulter la console ce qui permet généralement de trouver la source du problème.

----

## Aller plus loin avec la console
La console est un outil qui permet de faire plus que simplement lister les erreurs sur la page.
La méthode `console.log()` permet d’afficher la valeur d’une variable sans bloquer l’exécution du code contrairement à la fonction `alert()`.
```javascript
// on affiche un tableau.
var helloArray = ['Hello', 'Bonjour', 'Hola'];
console.log(helloArray);
```

La méthode console.log() permet d’afficher le contenu de l’objet. Elle est utilisable sur tous les types de variables et pourra rendre service de nombreuses fois.
En plus de la méthode log(), l’objet console  en propose d’autres qui permettent de modifier la manière d’afficher les valeurs : émettre des alertes ou des erreurs avec les méthodes `warn()` et `error()`, grouper des lignes de résultats avec `group()` et `groupEnd()`.
Ces méthodes sont faites pour déboguer le code et n’ont rien à faire dans le code une fois le site mis en ligne.

Dans la console, il y a une ligne en bas avec un chevron bleu où il est possible d’écrire directement du code qui agit pendant son exécution ! Cependant, cela fonctionne uniquement sur les variables globales.

----

## Utiliser les points d’arrêt
Pour identifier un bug qui se produit pendant une fraction de seconde, il est possible d’utiliser un point d’arrêt, aussi appelé breakpoint en anglais.
Grâce aux points d’arrêt, nous allons pouvoir étudier la pile d’exécution de notre code, dans l’onglet “Sources” dans le kit de développement et choisir un fichier parmi ceux de la page web.
Dans le fichier JS, il suffit de cliquer sur un numéro de ligne pour mettre un point d’arrêt. Celui-ci indique au navigateur qu’on souhaite **mettre en pause le code avant l’exécution de la ligne concernée**. Ils ne peuvent être placé que **sur des lignes comportant des instructions**, c’est impossible sur une ligne de déclaration de fonction par exemple. Il faut recharger la page pour prendre en compte le point d’arrêt. Le code sera surligné à l’endroit où il s’est arrêté. On peut consulter les variables actuellement utilisées au sein du scope actuel (dans le menu “Local”) ainsi que les variables globales (menu “Global”).

**La pile d’exécution**
Pour chaque point d’arrêt, on peut consulter la pile d’exécution (**call stack**) qui définit par quelles fonctions le code est passé afin d’atteindre la ligne actuellement mise en pause par le point d’arrêt. On peut cliquer sur chaque étape de la pile et consulter les variables du scope. La pile permet aussi de savoir par quoi a été déclenché une partie du code.
Enfin il est possible de donner un nom à une fonction anonyme dans la pile d’exécution afin de mieux la repérer.
