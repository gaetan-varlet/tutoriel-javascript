# Les variables

----

## Qu’est ce qu’une variable
Une variable est un espace de stockage.
Il faut commencer par la déclarer, c’est à dire lui réserver un espace de stockage. Le mot clé var est présent pour indiquer qu’on déclare une variable.
```javascript
var myVariable;
```
JavaScript est **sensible à la casse**, il faut faire attention aux majuscules et minuscules.  
JavaScript est un langage **typé dynamiquement**, cela veut dire que la déclaration de variable se fait avec le mot clé **var** sans distinction du contenu.  
Les trois types principaux en JavaScript
- le type numérique (**number**)
- les chaînes de caractères (**string**) : on peut l’assigner avec des guillemets (") ou des apostrophes ('). Pour échapper les apostrophes, il faut utiliser \\
- les booléens (**boolean**) : prennent soit la valeur true ou false

L’instruction **typeof** permet de tester l’existence d’une variable ou d’en vérifier son type.
```javascript
var number = 2;
alert(typeof number); // Affiche : « number »
alert(typeof nothing); // Affiche : « undefined »
```
Si l’instruction typeof renvoie undefined, c’est que soit votre variable est inexistante, soit qu’elle est déclarée mais ne contient rien.

----

## Les opérateurs arithmétiques
L’addition `+`, la soustraction `-`, la multiplication `*`, la division `/` et le modulo `%` qui est le reste d’une division.

----

## Initiation à la concaténation et à la conversion des types

### La concaténation
L’opérateur + permet de faire des concaténations.
```javascript
var hi = 'Bonjour ', name = 'toi', result;
result = hi + name;
alert(result); // Affiche : « Bonjour toi »
```

### Interagir avec l’utilisateur
La fonction `prompt()` renvoi ce que l’utilisateur a écrit dans une boîte de dialogue sous forme d’une chaîne de caractères, que l’on peut donc récupérer dans une variable.
```javascript
var text = prompt('Tapez quelque chose :');
```

### Convertir une chaîne de caractères en nombre
Si on essaie de faire l’addition de deux chiffres saisis par l’utilisateur, ils vont être concaténé (par exemple 3 + 6 va donner 36 et non pas 9) car ils sont considérés comme une chaîne de caractères. Il faut donc convertir les variables en nombre avec la fonction `parseInt()` pour les nombres entiers et `parseFloat()` pour les nombres décimaux. Si on utilise `parseInt()` sur un nombre décimal, il sera tronqué.
```javascript
var text = '1337', number;
number = parseInt(text);

var text = '1337.54', number;
number = parseFloat(text);
```

### Convertir un nombre en chaîne de caractères
L’ajout d’une chaîne de caractère vide entre les deux nombres les convertis en caractères.
```javascript
var text, number1 = 4, number2 = 2;
text = number1 + '' + number2;
alert(text); // Affiche : « 42 »
```

Une façon de faire plus propre est d'utiliser la méthode `toString()`
```javascript
var number=1337.65, text;
text = number.toString();
console.log(number) // 1337.65
console.log(typeof number) // number
console.log(text) // 1337.65
console.log(typeof text) // string
```