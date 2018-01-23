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

```javascript
var number1 = 2, number2 = 2, number3 = 4, result;
result = number1 == number2; // On spécifie deux variables avec l'opérateur de comparaison entre elles
alert(result); // Affiche « true », la condition est donc vérifiée car les deux variables contiennent bien la même valeur
```
Les opérateurs logiques
- `&&` ET `valeur1&&valeur2`
- `||` OU `valeur1||valeur2`
- `!` NON `!valeur`

L’opérateur ET vérifie que toutes les valeurs qui lui sont passées valent true. Si une seule renvoie false, alors la condition ne sera pas respectée.  
L’opérateur OU renvoie true si une des valeurs qui lui est soumise contient true.  
L’opérateur NON inverse la valeur qui lui est passée, ainsi true devient false.
```javascript
var result = true && true;
alert(result); // Affiche : « true »

result = true && false;
alert(result); // Affiche : « false »

var result = false;
result = !result; // On stocke dans « result » l'inverse de « result », c'est parfaitement possible
alert(result); // Affiche « true » car on voulait l'inverse de « false »
```

----

## La condition if else
```javascript
if (2 < 8 && 8 >= 4) { // Cette condition renvoie « true », le code est donc exécuté
    alert('La condition est bien vérifiée.');
}

if (2 > 8 || 8 <= 4) { // Cette condition renvoie « false », le code n'est donc pas exécuté
    alert("La condition n'est pas vérifiée mais vous ne le saurez pas vu que ce code ne s'exécute pas.");
}
```
### La fonction confirm()
On lui passe en paramètre une chaîne de caractères qui sera affichée à l’écran et elle retourne un booléen en fonction de l’action de l’utilisateur sur la boîte de dialogue (OK ou Annuler).
```javascript
if (confirm('Voulez-vous exécuter le code JavaScript de cette page ?')) {
    alert('Le code a bien été exécuté !');
}
```
Le code s’exécute si on clique sur OK et ne s’exécute pas si on clique sur Annuler.

### La structure else pour dire sinon
```javascript
if ( /* condition */ ) {
    // Du code…
} else {
    // Du code…
}
```
### La structure else if pour dire sinon si
Une première condition est testée, une deuxième sera testée si la première échoue, et si aucune condition ne se vérifie, la structure else fait alors son travail.

----

## La condition “switch”
Très pratique pour faire du cas par cas, il n’est pas nécessaire de réécrire la condition à chaque fois.
```javascript
var drawer = parseInt(prompt('Choisissez le tiroir à ouvrir (1 à 3) :'));

switch (drawer) {
    case 1:
        alert('Contient divers outils pour dessiner : du papier, des crayons, etc.');
    break;

    case 2:
        alert('Contient du matériel informatique : des câbles, des composants, etc.');
    break;

    default:
        alert("Info du jour : le meuble ne contient que 4 tiroirs et, jusqu'à preuve du contraire, les tiroirs négatifs n'existent pas.");
}
```
On écrit **break** à la fin de chaque case pour casser le switch et éviter d’exécuter le reste du code. L’oubli du break fait exécuter tout le code à partir du case choisi.
**Default** sera exécuté si aucun des cas précédents n’a été exécuté, partie optionnelle.

----

## Les ternaires
Très rapide à écrire mais peu lisible. Elles renvoient une valeur.
```javascript
endMessage = adult ? '18+' : '-18';
```
Si la variable adult vaut true, alors la valeur retournée sera celle écrite juste après le point d’interrogation, si elle est fausse, ce sera la valeur après les deux points.

----

## Les conditions sur les variables
**Tester l’existence du contenu d’une variable**
```javascript
var conditionTest = 'Fonctionnera ? Fonctionnera pas ?';

if (conditionTest) {
    alert('Fonctionne !');
} else {
    alert('Ne fonctionne pas !');
}
```
Le code affiche le texte “Fonctionne” car la variable conditionTest a été convertie en booléen et son contenu a été évalué comme true. Pour qu’il soit évalué comme false, il faut que que ce soit un nombre égal à 0 ou une chaîne de caractères vide. La valeur undefined renvoie aussi false.

**Le cas de l’opérateur OU**
```javascript
var conditionTest1 = '', conditionTest2 = 'Une chaîne de caractères';
alert(conditionTest1 || conditionTest2);
```
L’opérateur OU en plus de sa fonction principale, permet de renvoyer la première valeur évaluée à true. Dans cet exemple, elle renvoie donc *'Une chaîne de caractères'*.
