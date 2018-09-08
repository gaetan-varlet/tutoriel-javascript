# Les bases de JavaScript

----
----

# Introduction

----

## Qu’est que le JavaScript ?
Le JavaScript est un langage de programmation de scripts orienté objet

Un langage de programmation permet d’écrire du code source qui sera analysé par l’ordinateur. Il existe  trois manières d’utiliser du code source :
- **langage compilé :** le code source est donné à un programme appelé compilateur qui va lire le code source et le convertir dans un langage que l’ordinateur sera capable d’interpréter : le langage binaire. Les langages comme le C ou le C++ sont des langages dits compilés
- **langage précompilé :** le code source est partiellement compilé, dans un langage plus simple à lire par l’ordinateur mais ce n’est pas encore du binaire. Ce code intermédiaire devra être lu par une machine virtuelle qui exécutera ce code. Les langages comme Java ou C# sont dits précompilés
- **langage interprété :** pas de compilation, le code source reste tel quel. Pour exécuter le code, on doit le fournir à un interpréteur qui lira le code et réalisera les actions. Pour obtenir des gains de performances, on peut le le compiler à la volée pendant son exécution, ce que font aujourd’hui la plupart des interpréteurs JavaScript

Les scripts sont majoritairement interprétés, ce qui est le cas de JavaScript qui est un langage interprété. Il y a un interpréteur JavaScript dans le navigateur Web, qui est différent selon le navigateur : Chakra dans Internet Explorer, SpiderMonkey dans Firefox, V8 dans Chrome.

Le JavaScript est majoritairement utilisé sur les pages Web pour dynamiser les pages HTML, en ajoutant des interactions avec l’utilisateur, des animations, de l’aide à la navigation, par exemple : afficher ou masquer du texte, faire défiler des images, créer des infobulles…

Les scripts JavaScript sont exécutés par le navigateur chez l’internaute (le client), contrairement aux langages serveur (comme le PHP) exécuté par le serveur web.
Un script serveur va s’occuper de créer la page Web qui sera envoyé au navigateur. Ce dernier va alors afficher la page puis exécuter les scripts client tel que le JavaScript.

Le JavaScript ne sert pas que dans les pages Web. Il sert aussi à réaliser des extensions pour des programmes. Chrome et Firefox en possèdent tous deux un panel gigantesque en partie codées en JavaSript.
Il est aussi possible d’exécuter du JavaScript en dehors du navigateur.
Le JavaScript peut aussi être utilisé pour réaliser des applications.

----

## Petit historique du langage
En 1995, Brendan Eich développe le LiveScript qui sera renommé en JavaScript en hommage au langage Java. Netscape décide d’envoyer sa version de JavaScript à l’ECMA international pour que le langage soit standardisé. L’ECMA standardise le langage soit le nom d’ECMAScript. L’ECMAScript est la référence de base, de là en découle des implémentations comme le JavaScript.

Les versions du JavaScript sont basées sur celles de l’ECMAScript. Ainsi il existe :
- ES1 et ES2 qui sont les prémices du langage JavaScript
- ES3 sorti en décembre 1999
- ES4 qui a été abandonné en raison de modifications trop importantes qui ne furent pas appréciées
- ES5 sortie en décembre 2009, la version la plus répandue et la plus utilisée à ce jour
- ES6, finalisé en décembre 2014

----
----

# Déboguer votre code grâce à la console
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
```js
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
```js
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

----
----

# Premiers pas
L’objectif ici est d’apprendre à intégrer le JavaScript aux pages Web.

----

## Afficher une boîte de dialogue
Dans les balises `<body>` du HTML, écrire
```javascript
<script>
alert('Hello world!')
</script>
```
Une boîte de dialogue s'affiche avec le message Hello world!

Dans cet exemple, il n’y a qu’une instruction : l’appel de la fonction `alert()`. C’est une instruction simple, appelée fonction, qui permet d’afficher une boîte de dialogue contenant un message. Une boîte de dialogue s'affiche avec le message *Hello world!*  

----

## La syntaxe du JavaScript
### Les instructions
Les instructions doivent être séparées par un point-virgule, non obligatoire si l’instruction qui suit se trouve sur la ligne suivante.
```js
instruction_1
instruction_2;
instruction_3; instruction_4
```
### Les espaces
Le JavaScript n’est pas sensible aux espaces, on peut donc indenter comme on le souhaite les instructions.
### Les commentaires
Il existe des commentaires de fin de ligne et des commentaires multilignes.
```js
instruction_1 // Ceci est ma première instruction
instruction_2
// La troisième instruction ci-dessous :
instruction_3

/* Ce script comporte 3 instructions :
      - Instruction 1 qui fait telle chose
      - Instruction 2 qui fait autre chose
      - Instruction 3 qui termine le script
*/
instruction_1
instruction_2
instruction_3 // Fin du script
```

----

## Quelques aides
Un site de documentation :
https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference

Un site pour tester le code JavaScript en ligne :
https://jsfiddle.net/

----

## Où placer le code dans la page ?
Les codes JavaScript sont insérés au moyen de l’élément `<script>`. Cet élément possède un attribut **type** qui sert à indiquer le type de langage que l’on va utiliser. dans notre cas, il s’agit du JavaScript, mais ça pourrait être autre chose, comme du VBScript.
En HTML4 et XHTML 1.x, l’attribut type est obligatoire. En revanche, en HTML5, il ne l’est pas. L’attribut type prend comme valeur text/javascript, qui est en fait le type MIME d’un code JavaScript.

### Le JavaScript dans la page
Rien de plus simple, on place le code au sein de l’élément `<script>` dans le `<body>` du HTML.
```html
<!DOCTYPE html>
<html>
<head>
    <title>Hello World!</title>
</head>

<body>

    <script>
        alert('Hello world!');
    </script>

</body>
</html>
```
En HTML4 ou en XHTML 1.x, il faut utiliser des **commentaires d’encadrement** pour que la page soit conforme à ces normes. C’est inutile en HTML5. Ces commentaires servent à isoler le code JavaScript pour ne pas qu’il soit interprété par le validateur du W3C. Cela évite d’avoir des erreurs dans la page en empêchant par exemple l’interprétation des chevrons < et > comme des balises HTML.
```html
<body>
    <script>
    <!--

        valeur_1 > valeur_2;

    //-->
    </script>
</body>
```

### Le JavaScript en externe
Il est conseillé d’écrire le code JavaScript dans un fichier externe portant l’extension **.js**. Ce fichier est ensuite appelé depuis la page Web au moyen de l’élément script et de son attribut **src** qui contient l’URL du fichier.
Voici un exemple avec un fichier hello.js qui se situe dans le même répertoire de la page Web.
```html
<!DOCTYPE html>
<html>
<head>
    <title>Test JavaScript</title>
    <meta charset="utf-8" />
</head>

<body>
    <script src="index.js"></script>
</body>
</html>

```
Il vaut mieux privilégier un fichier externe plutôt que d’inclure le code directement dans la page, car le fichier externe est mis en cache par le navigateur et n’est donc pas rechargé à chaque chargement de la page, ce qui accélère l’affichage de la page.
Une page Web est lue par le navigateur de façon linéaire, c’est à dire d’abord l’élément `<head>` puis les éléments `<body>` les uns à la suite des autres. Si on appelle un fichier JavaScript dès le début du chargement de la page, le navigateur va donc charger ce fichier et si ce dernier est volumineux, le chargement de la page s’en trouvera ralenti car le navigateur va charger le fichier avant de commencer à afficher le contenu de la page.
Pour pallier ce problème, il est conseillé de placer les éléments `<script>` juste avant la fermeture de l’élément `<body>`.

----
----

# Les variables

----

## Qu’est ce qu’une variable
Une variable est un espace de stockage.
Il faut commencer par la déclarer, c’est à dire lui réserver un espace de stockage. Le mot clé var est présent pour indiquer qu’on déclare une variable.
```js
var myVariable;
```

JavaScript est **sensible à la casse**, il faut faire attention aux majuscules et minuscules.  
JavaScript est un langage **typé dynamiquement**, cela veut dire que la déclaration de variable se fait avec le mot clé **var** sans distinction du contenu.  
Les trois types principaux en JavaScript
- le type numérique (**number**) pour les nombres entiers ou décimaux
- les chaînes de caractères (**string**) : on peut l’assigner avec des guillemets (") ou des apostrophes ('). Pour échapper les apostrophes, il faut utiliser \\
- les booléens (**boolean**) : prennent soit la valeur true ou false

L’instruction **typeof** permet de tester l’existence d’une variable ou d’en vérifier son type.
```js
var myNumber = 2
var maString = "toto"
var monBool = true
console.log(typeof myNumber) // Affiche : « number »
console.log(typeof maString) // Affiche : « string »
console.log(typeof monBool) // Affiche : « boolean »
console.log(typeof nothing) // Affiche : « undefined »
```
Si l’instruction typeof renvoie undefined, c’est que soit votre variable est inexistante, soit qu’elle est déclarée mais ne contient rien.

----

## Les opérateurs arithmétiques
L’addition `+`, la soustraction `-`, la multiplication `*`, la division `/` et le modulo `%` qui est le reste d’une division.
L'incrémentation permet d’ajouter une unité à un nombre au moyen d’une syntaxe court. A l’inverse, la décrémentation permet de soustraire une unité.
```js
var a = 5
// la valeur est affichée puis incrémentée
console.log(a++) // 5
console.log(a) // 6

var b = 5
// la valeur est incrémentée puis affichée
console.log(++b) // 6
console.log(b) // 6

var  c = 1
c += 2
console.log(c) // 3
c *= 4
console.log(c) // 12
c /= 2
console.log(c) // 6
```

----

## Initiation à la concaténation et à la conversion des types

### La concaténation
L’opérateur + permet de faire des concaténations.
```js
var hi = 'Bonjour ', name = 'toi', result
result = hi + name
console.log(result) // Affiche : « Bonjour toi »
```

### Interagir avec l’utilisateur
La fonction `prompt()` renvoi ce que l’utilisateur a écrit dans une boîte de dialogue sous forme d’une chaîne de caractères, que l’on peut donc récupérer dans une variable.
```js
var text = prompt('Tapez quelque chose :')
```

### Convertir une chaîne de caractères en nombre
Si on essaie de faire l’addition de deux chiffres saisis par l’utilisateur, ils vont être concaténé (par exemple 3 + 6 va donner 36 et non pas 9) car ils sont considérés comme une chaîne de caractères. Il faut donc convertir les variables en nombre avec la fonction `parseInt()` pour les nombres entiers et `parseFloat()` pour les nombres décimaux. Si on utilise `parseInt()` sur un nombre décimal, il sera tronqué.
```js
var text = '1337', number
number = parseInt(text)

var text = '1337.54', number
number = parseFloat(text)
```

### Convertir un nombre en chaîne de caractères
L’ajout d’une chaîne de caractère vide entre les deux nombres les convertis en caractères.
```js
var text, number1 = 4, number2 = 2
text = number1 + '' + number2
console.log(text) // Affiche : « 42 »
```

Une façon de faire plus propre est d'utiliser la méthode `toString()`
```js
var number=1337.65
var text = number.toString()
console.log(number) // 1337.65
console.log(typeof number) // number
console.log(text) // 1337.65
console.log(typeof text) // string
```

----
----

# Les conditions

----

## La base de toute condition : les booléens
Les opérateurs de comparaison :
- `==` égal à
- `!=` différent de
- `===` contenu et type égal à
- `!==` contenu ou type différent de
- `>` supérieur à
- `>=` supérieur ou égal à
- `<` inférieur à
- `<=` inférieur ou égal à

```js
var number1 = 2, number2 = "2"
console.log(number1 == number2) // true
console.log(number1 === number2) // false
```
Les opérateurs logiques
- `&&` ET `valeur1&&valeur2`
- `||` OU `valeur1||valeur2`
- `!` NON `!valeur`

L’opérateur ET vérifie que toutes les valeurs qui lui sont passées valent true. Si une seule renvoie false, alors la condition ne sera pas respectée.  
L’opérateur OU renvoie true si une des valeurs qui lui est soumise contient true.  
L’opérateur NON inverse la valeur qui lui est passée, ainsi true devient false.
```js
var result = true && true
console.log(result) // Affiche : « true »

result = true && false
console.log(result) // Affiche : « false »

var result = false
result = !result // On stocke dans « result » l'inverse de « result »
console.log(result) // Affiche « true » car on voulait l'inverse de « false »
```

----

## La condition if
```js
if (2 < 8 && 8 >= 4) { // Cette condition renvoie « true », le code est donc exécuté
    console.log('La condition est bien vérifiée.')
}

if (2 > 8 || 8 <= 4) { // Cette condition renvoie « false », le code n'est donc pas exécuté
    console.log("La condition n'est pas vérifiée mais vous ne le saurez pas vu que ce code ne s'exécute pas.")
}
```
### La fonction confirm()
On lui passe en paramètre une chaîne de caractères qui sera affichée à l’écran et elle retourne un booléen en fonction de l’action de l’utilisateur sur la boîte de dialogue (OK ou Annuler).
```js
if (confirm('Voulez-vous exécuter le code JavaScript de cette page ?')) {
    console.log('Le code a bien été exécuté !')
}
```
Le code s’exécute si on clique sur OK et ne s’exécute pas si on clique sur Annuler.

### La structure if, else if, else pour dire sinon si, sinon
Une première condition est testée, une deuxième sera testée si la première échoue, et si aucune condition ne se vérifie, la structure else fait alors son travail.
```js
if(/* condition */){
    // Du code...
}else if(/* condition */){
    // Du code...
}else{
    // Du code...
}
```

----

## La condition “switch”
Très pratique pour faire du cas par cas, il n’est pas nécessaire de réécrire la condition à chaque fois.
```js
var drawer = parseInt(prompt('Choisissez le tiroir à ouvrir (1 à 3) :'));

switch (drawer) {
    case 1:
         console.log('Contient divers outils pour dessiner : du papier, des crayons, etc.')
        break

    case 2:
         console.log('Contient du matériel informatique : des câbles, des composants, etc.')
        break

    default:
         console.log("Info du jour : le meuble ne contient que 4 tiroirs et, jusqu'à preuve du contraire, les tiroirs négatifs n'existent pas.")
}
```
On écrit **break** à la fin de chaque case pour casser le switch et éviter d’exécuter le reste du code. L’oubli du break fait exécuter tout le code à partir du case choisi.
**Default** sera exécuté si aucun des cas précédents n’a été exécuté, partie optionnelle.

----

## L'opérateur Ternaire

C'est une syntaxe simplifiée pour faire un `if else` mais un peu moins lisible : `condition ? valeurSiTrue : valeurSiFalse`

Exemple :
```js
var gaetan = "Gaëtan"
var louis = "Louis"
var nomLePlusLong

if(gaetan.length > louis.length){
    nomLePlusLong = gaetan
} else {
    nomLePlusLong = louis
}
console.log(nomLePlusLong) // affiche Gaëtan

var nomLePlusLong2 = gaetan.length > louis.length ? gaetan : louis
console.log(nomLePlusLong2) // affiche Gaëtan
```

----

## Les conditions sur les variables
**Tester l’existence du contenu d’une variable**
```js
var conditionTest = 'Fonctionnera ? Fonctionnera pas ?'

if (conditionTest) {
    console.log('Fonctionne !')
} else {
    console.log('Ne fonctionne pas !')
}
```
Le code affiche le texte “Fonctionne” car la variable conditionTest a été convertie en booléen et son contenu a été évalué comme true. Pour qu’il soit évalué comme false, il faut que que ce soit un nombre égal à 0 ou une chaîne de caractères vide. La valeur undefined renvoie aussi false.

**Le cas de l’opérateur OU**
```js
var conditionTest1 = '', conditionTest2 = 'Une chaîne de caractères'
console.log(conditionTest1 || conditionTest2)
```
L’opérateur OU en plus de sa fonction principale, permet de renvoyer la première valeur évaluée à true. Dans cet exemple, elle renvoie donc *Une chaîne de caractères*.

----
----

# Les boucles

----

## La boucle while
C’est un répétition d’instruction jusqu’à ce qu’on dise à la boucle de s’arrêter. A chaque répétition, on parle d’itération. Tant que la condition est vraie, la boucle se répète.
```js
while (condition) {
    instruction_1
    instruction_2
}
```
Il est possible d’arrêter la boucle avec le mot clé **break**. Il est possible de mettre fin à une itération et faire continuer la boucle avec **continue**.

----

## La boucle do while
Elle ressemble à la boucle while sauf qu’elle est toujours exécutée au moins une fois. Dans le cas d’une boucle while, si la condition n’est pas valide, la boucle n’est pas exécutée. Avec do while, la boucle est exécutée une première fois, puis la condition est testée pour savoir si la boucle doit continuer.
```js
do {
    instruction_1
    instruction_2
} while (condition)
```
Utilisation très peu fréquente car il est possible d’utiliser une boucle while normale avec une condition qui fait que celle-ci est toujours exécutée une fois.

----

## La boucle for
Ressemble dans son fonctionnement à la boucle while
```js
for (initialisation; condition; incrémentation) {
    instruction_1
    instruction_2
}
```

L’incrémentation a lieu à la fin de chaque itération. Le premier tour de boucle dans l’exemple ci-dessous est donc fait avec iter=0.
```js
for (var iter = 0; iter < 5; iter++) {
    console.log('Itération n°' + iter) // affiche 0 puis 1, 2, 3 et 4
}
console.log(iter) // affiche 5
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

----
----

# Les fonctions

----

## Concevoir des fonctions
```js
// déclaration d'une fonction
function myFunction(arguments) {
    // Le code que la fonction va devoir exécuter
}

myFunction() // exécution de la fonction
```
L’utilité basique des fonctions est d’éviter la répétition de code. Le code écrit dans une fonction ne s'exécute pas immédiatement, sinon l'intérêt serait nul. Pour cela il faut appeler la fonction afin de l'exécuter.

----

## La portée des variables
Toute variable déclarée dans une fonction n’est utilisable que dans cette même fonction, appelée **variable locale**. Lorsqu’une variable n’est accessible que dans une partie du code, on dit qu’elle se trouve au sein d’un “scope”.

Les variables déclarées en-dehors des fonctions sont appelées **variables globales**, car elles sont accessibles partout dans le code, y compris dans les fonctions.

Si on crée une variable locale avec le même nom qu’une variable globale, la variable locale prend le dessus le temps de l’exécution de la fonction.

Par principe, il faut déclarer les variables qui ne servent que dans une fonction à l’intérieur de celle-ci et non pas de manière globale.

----

## Les arguments et les valeurs de retour
```js
function myFunction(arg) {
    console.log('Votre argument : ' + arg)
}

function moar(first, second) {
    // On peut maintenant utiliser les variables « first » et « second » comme on le souhaite :
    console.log('Votre premier argument : ' + first)
    console.log('Votre deuxième argument : ' + second)
}
```
Les arguments sont propres à leur fonction, ils ne seront accessibles que dans cette fonction et nulle part ailleurs.

**Les valeurs de retour**
Chaque fonction ne peut retourner qu’une seule et unique valeur. Il est possible de contourner le problème en renvoyant un tableau ou un objet. L’instruction return met fin à la fonction puis retourne la valeur.
```js
function sayHello() {
    return 'Bonjour !'
}
console.log(sayHello()) // on affiche la valeur retournée par la fonction sayHello()
```

----

## Les fonctions anonymes
Elles sont extrêmement importantes en JavaScript. Elles servent pour les objets, les événements, les variables statiques, les closures…
Elles n’ont pas de nom ! C’est la seule différence avec une fonction traditionnelle.
```js
function (arguments) {
    // Le code de votre fonction anonyme
}
```
Pour l’appeler, il existe de très nombreuses façons de faire. Pour le moment, il faut se limiter à une seule solution : assigner la fonction à une variable.
```js
var sayHello = function(){
    console.log('Bonjour !')
}
sayHello() // Affiche : « Bonjour ! »
```
La variable *sayHello* est devenue une fonction.

----
----

# Les objets et les tableaux

----

## Introduction aux objets
JavaScript est un langage orienté objet, cela veut dire que le langage dispose d’objets, qui disposent d’une structure. JavaScript met à notre disposition des objets natifs : un nombre, une chaîne de caractères, un booléen. On dit que JavaScript n’est pas un langage typé car les variables contiennent toujours la même chose : un objet. Cet objet peut être de nature différente (nombre, booléen…). Il est également possible de créer nos propres objets, ce qui sera après.

Les objets contiennent trois choses distinctes :
- un constructeur
  - code utilisé quand on utilise un nouvel objet
  - permet d’effectuer des actions comme définir diverses variables
  - réalisé automatiquement pour les objets natifs
- des propriétés
  - une propriété est une variable contenue dans l’objet
- des méthodes
  - il est possible de modifier l’objet grâce aux méthodes qui sont des fonctions contenues dans l’objet, qui permettent de réaliser des opérations sur le contenu de l’objet

```js
var myString = 'Ceci est une chaîne de caractères' // On crée un objet String

console.log(myString.length) // On affiche le nombre de caractères, au moyen de la propriété « length »

console.log(myString.toUpperCase()) // On récupère la chaîne en majuscules, avec la méthode toUpperCase()
```
Le point après un objet permet d’accéder aux propriétés et aux méthodes d’un objet.

Nous avons déjà découvert trois objets natif : Number, Boolean, String. On allons maintenant découvrir l’objet **Array** qui gère les tableaux.

----

## Les tableaux
Un tableau, array en anglais, contient plusieurs valeurs appelées **item**. Chaque item est accessible au moyen d’un indice dont la numérotation commence à 0.
```js
var myArray = [1, 2, 3, 4, 5]

console.log(myArray.length) // affiche 5
console.log(myArray[0]) // affiche 1, le premier élément du tableau
myArray[0]=8 // modifie la valeur du premier élément du tableau
console.log(myArray[0]) // affiche 8, le premier élément du tableau
console.log(myArray[myArray.length-1]) // affiche 5, le dernier élément du tableau
```

Pour plus de détails sur les tableaux, voir la partie *Objets et fonctions utiles en JavaScript*.

----

## Les objets littéraux

### La syntaxe d’un objet
Il est possible d’accéder aux propriétés d'un objet via un identifiant. Un objet est similaire à un tableau sauf que l’on met des accolades à la place des crochets.
```js
var myObject = {
    propertyName1: propertyValue1,
    propertyName2: propertyValue2,
    methode1: function(){    
    }
}
```

Pour définir dès l’initialisation les items à ajouter, il suffit d’écrire l’identifiant suivi de deux points et de la valeur à lui attribuer. La séparation des items se fait comme pour un tableau, avec une virgule.
```js
var louis = {
    prenom: 'Louis',
    nom: 'Varlet',
    direPapa: function(){
        console.log("Papa !")
    }
}

// Accès aux propriétés
console.log(louis) // permet d'accéder à l'objet louis
console.log(typeof louis) // affiche object
console.log(louis.prenom) // affiche Louis
console.log(louis["prenom"]) // affiche Louis (méthode est utile si l’identifiant est contenu dans une variable)

// Ajouter une propriété en spécifiant un identifiant qui n’est pas encore présent.
console.log(louis.age) // affiche undefined
louis.age = 1
console.log(louis.age) // affiche 1
louis["prenomPere"] = "Gaëtan" // on peut aussi le faire avec les crochets
console.log(louis.prenomPere) // affiche Gaëtan

// Exécution d'une méthode
louis.direPapa() // affiche Papa !
```

Autre façon de créer un objet :
```js
var gaetan = new Object()
gaetan.prenom = 'Gaëtan'
gaetan.nom = 'Varlet'
```


### Parcourir un objet avec *for in*
Il n’est pas possible d’utiliser une boucle *for* car elle incrémente une variable numérique ce qui est inutile sur un objet littéral puisque nous devons posséder un identifiant. La boucle **for in** ne sert qu’à une chose : parcourir un objet.  
Le fonctionnement est quasiment le même que pour un tableau, excepté qu’il suffit de fournir une “variable clé” qui reçoit un identifiant (au lieu d’un index) et de spécifier l’objet à parcourir :
```js
const louis = {
    prenom: "Louis",
    nom: "Varlet"
}
for(let property in louis){
    console.log(louis[property])
}
// affiche Louis
// affiche Varlet
```

### Utilisation des objets littéraux
Ils peuvent être utile pour ordonner un code. On les utilise aussi dans les fonctions, car return ne sait retourner qu’une seule variable. Avec un objet, il est possible de retourner plusieurs variables en stockant les résultats dans l’objet, plus commode qu’un tableau.
Exemple d’une fonction qui calcule des coordonnées d’un élément HTML sur une page Web et retourne les coordonnées x et y :
```js
function getCoords() {
    /* Script incomplet, juste pour l'exemple */
    return {
        x: 12,
        y: 21
    }
}

var coords = getCoords()

console.log(coords.x) // 12
console.log(coords.y) // 21
```

### Les constructeurs

Ils permettent de créer un moule pour créer plusieurs objets à partir de ce moule
```js
function Dog(name, color, age){
    this.name = name
    this.color = color
    this.age = age
    this.aboie = function(){
        console.log("wouf wouf "+this.name)
    }
}

var monChien = new Dog("Rex", "noir", 6)
console.log(monChien); // affiche le chien
monChien.aboie(); // affiche : wouf wouf Rex
```