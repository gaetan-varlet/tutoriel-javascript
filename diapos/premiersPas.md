# Premiers pas
L’objectif ici est d’apprendre à intégrer le JavaScript aux pages Web.

----

## Afficher une boîte de dialogue
Dans les balises `<body>` du HTML, écrire
```javascript
<script>
alert('Hello world!');
</script>
```
Une boîte de dialogue s'affiche avec le message Hello world!

Dans cet exemple, il n’y a qu’une instruction : l’appel de la fonction `alert()`. C’est une instruction simple, appelée fonction, qui permet d’afficher une boîte de dialogue contenant un message. Une boîte de dialogue s'affiche avec le message *Hello world!*  

----

## La syntaxe du JavaScript
### Les instructions
Les instructions doivent être séparées par un point-virgule, non obligatoire si l’instruction qui suit se trouve sur la ligne suivante.
```javascript
instruction_1;
instruction_2;
instruction_3;
```
### Les espaces
Le JavaScript n’est pas sensible aux espaces, on peut donc indenter comme on le souhaite les instructions.
### Les commentaires
Il existe des commentaires de fin de ligne et des commentaires multilignes.
```javascript
instruction_1; // Ceci est ma première instruction
instruction_2;
// La troisième instruction ci-dessous :
instruction_3;

/* Ce script comporte 3 instructions :
      - Instruction 1 qui fait telle chose
      - Instruction 2 qui fait autre chose
      - Instruction 3 qui termine le script
*/
instruction_1;
instruction_2;
instruction_3; // Fin du script
```
### Les fonctions
Une fonction se compose de deux choses : son nom suivi d’un couple de parenthèses. Entre parenthèses se trouvent les arguments, appelés aussi paramètres, qui contiennent des valeurs transmises à la fonction.

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
Voici un exemple avec un fichier hello.js qui se situe dans le même réertoire de la page Web.
```html
<!DOCTYPE html>
<html>
<head>
    <title>Hello World!</title>
</head>

<body>

    <script src="hello.js"></script>

</body>
</html>

```
Il vaut mieux privilégier un fichier externe plutôt que d’inclure le code directement dans la page, car le fichier externe est mis en cache par le navigateur et n’est donc pas rechargé à chaque chargement de la page, ce qui accélère l’affichage de la page.
Une page Web est lue par le navigateur de façon linéaire, c’est à dire d’abord l’élément `<head>` puis les éléments `<body>` les uns à la suite des autres. Si on appelle un fichier JavaScript dès le début du chargement de la page, le navigateur va donc charger ce fichier et si ce dernier est volumineux, le chargement de la page s’en trouvera ralenti car le navigateur va charger le fichier avant de commencer à afficher le contenu de la page.
Pour pallier ce problème, il est conseillé de placer les éléments `<script>` juste avant la fermeture de l’élément `<body>`.

----

## Quelques aides
Un site de documentation :
https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference

Un site pour tester le code JavaScript en ligne :
https://jsfiddle.net/
