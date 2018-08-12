# Manipuler le code HTML (partie 1/2)

---

## Le Document Object Model

### Petit historique

Le DOM est une interface de programmation pour les documents XML et HTML, qui permet via le JavaScript d'accéder au code XML et/ou HTML d'un document. On peut modifier, ajouter, déplacer, supprimer des éléments HTML (une paire de balises HTML)

Au début du JavaScript, le DOM n'était pas unifié, c'est-à-dire que deux navigateurs possédaient un DOM différent, donc la manière d'accéder à un élément HTML différait d'un navigateur à l'autre. Il fallait donc coder différemment en fonction du navigateur. Le W3C a publié une nouvelle spécification DOM-1, pour *DOM Level 1* qui définit le DOM et comment sont schématisés les documents HTML et XML, sous forme d'un arbre, ou d'une hiérarchie. L'élément `<html>` contient 2 éléments enfants : `<head>` et `<body>`, etc... Ensuite, la spécification DOM-2 a été publié avec l'introduction de la méthode **getElementById()** qui permet de récupérer un élément en connaissant son ID.

### L'objet window

C'est un objet glabal qui représente la fenêtre du navigateur. C'est à partir de cet objet que le JavaScript est exécuté.
- `alert()` n'est pas une fonction mais une méthode de l'objet `window`
- l'objet `window` est dit implicite, c'est-à-dire qu'il n'y a pas besoin de la spécifier. `window.alert('Hello World')` est équivalent à `alert('Hello World')`. En général, on ne le marque pas sauf si cela est nécessaire
- en revanche `isNan()` ou `parseInt` ne dépendent pas d'un objet, ce sont des **fonctions globales**. Il n'y en a pas beaucoup
- lorsqu'on déclare une variable dans le contexte global du script, cette variable devient une propriété de l'objet `window`
- toute variable non déclarée (utilisée sans écrire le mot-clé `var`) devient une propriété de `window`, quelque soit l'endroit où on se situe. Ecrire `text = 'toto'` revient donc à écrire `window.text = 'toto'`. Il est conseillé de toujours déclarer une variable avec `var`. Pour déclarer une variable globale dans une fonction, on pourra spécifier explicitement l'objet `window`

### Le document

L'objet `document` est un sous-objet de `window`, il représente la page Web, plus précisemment la la balise `<html>`. C'est grâce à cet élément qui nous allons pouvoir accéder aux éléments HTML et les modifier.

---

## Naviguer dans le document

### La structure DOM

Le DOM pose comme concept que la page Web est une hiérarchie d'éléments. On peut schématiser une page web comme ceci :

![Schéma d'une page web simple](images/pageWebSimple.png)

Voici le code source correspondant :
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Le titre de la page</title>
</head>

<body>
  <div>
    <p>Du texte <a>et un lien</a></p>
  </div>
</body>
</html>
```

L'élément `<html>` contient deux éléments, appelés **enfants** : `<head>` et `<body>`. Pour ces deux enfants, `<html>` est l'élément **parent**. Chaque élément est appelé **noeud** (*node* en anglais). `<title>` contient un élément enfant `#text` qui contient du texte. Le texte présent dans une page Web est vu par le DOM comme on noeud de type `#text`.

### Accéder aux éléments

L'objet `document` possède 3 méthodes principales :
- `getElementById()` qui permet d'accéder à un élément en connaissant son ID. Exemple : `var div = document.getElementById('myDiv');` pour récupérer une division appelée *myDiv*. La variable créée *div* contient le texte *object HTTMLDivElement*, en clair un élément HTML de type `<div>`.
- `getElementsByTagName()` permet de récupérer sous forme de tableau tous les éléments de la famille. Exemple pour récupérer toutes les `<div>` : `var divs = document.getElementsByTagName('div');`. En mettant un astérique (\*) en paramètre, on récupère tous les éléments HTML dans l'élément ciblé
- `getElementsByName()` permet de ne récupérer que les éléments qui possèdent un attribut `name` que l'on spécifie. L'attribut `name` n'est utilisé que dans les formulaires, il est déprécié pour toute autre utilisant depuis HTML5.

**Accéder aux éléments grâce aux technologies récentes**

`querySelector()` et `querySelectorAll()` sont 2 méthodes récentes (non supportées avant IE8) qui simplifient la sélection dans l'arbre DOM en prenant en prenant en paramètre un sélecteur CSS.  
Par exemple, le sélecteur `#menu .item span` sélectionne les balises `<span>` des classes `.item` elles-mêmes contenues dans l'identifiant `#menu`

- `querySelector()` renvoie le premier élément trouvé correspondant au sélecteur
- `querySelectorAll()` renvoie tous les éléments sous forme de tableau

Exemple :
```html
<div id="menu">
  <div class="item">
    <span>Élément 1</span>
    <span>Élément 2</span>
  </div>
</div>
```
```javascript
var query = document.querySelector('#menu .item span'),
    queryAll = document.querySelectorAll('#menu .item span');

alert(query.innerHTML); // Affiche : "Élément 1"

alert(queryAll.length); // Affiche : "2"
alert(queryAll[0].innerHTML + ' - ' + queryAll[1].innerHTML); // Affiche : "Élément 1 - Élément 2"
```

La propriété `innerHTML` permet d'accéder au contenu d'un élément HTML.

**L'héritage des propriétés et des méthodes**

Les éléments HTML sont vus par JavaScript comme des objets possédant des propriétés et des méthodes. Tous ne possèdent pas les mêmes propriétés et méthodes. Certaines sont communes car tous les éléments HTML sont d'un même type : `Node`.  
Une `<div>` est un objet `HTTMLDivElement`, sous-objet `HTMLElement`, lui-même sous-objet d'`Element`, lui-même sous-objet de `Node`. Les méthodes et propriétés de `Node` peuvent être utilisées depuis ses sous-objets grâce à **l'héritage**.

---

## Editer les éléments HTML

### Les attributs

L'objet `Element` fourni deux méthodes `getAttribute()` et `setAttribute()` permettant de récupérer et d'éditer un attribut. Exemple :
```html
<body>
    <a id="myLink" href="http://www.un_lien_quelconque.com">Un lien modifié dynamiquement</a>

    <script>
        var link = document.getElementById('myLink');
        var href = link.getAttribute('href'); // On récupère l'attribut « href »

        alert(href); // affiche http://www.un_lien_quelconque.com

        link.setAttribute('href', 'http://www.google.com'); // On édite l'attribut « href »
    </script>
</body>
```

On récupère l'élément `myLink` et on lit son attribut `href`. on modifie ensuite son attribut `href`. Le lien pointe maintenant sur `http://www.google.com`.

Pour les éléments courants commme `<a>`, il est possible d'accéder et de modifier un attribut via une propriété. Même exemple que précédemment :
```html
<body>
    <a id="myLink" href="http://www.un_lien_quelconque.com">Un lien modifié dynamiquement</a>

    <script>
        var link = document.getElementById('myLink');
        var href = link.href;

        alert(href);

        link.href = 'http://www.siteduzero.com';
    </script>
</body>
```

### La classe

Pour modifier l'attribut `class` d'un élément HTML, on ne peut pas utiliser le mt clé `class` car il est réservé en JavaScript. Il faut donc utiliser `className`. Dans l'exemple suivant, on applique à l'élément `myColoredDiv` la classe *blue*, cet élément sera donc écrit en blanc sur fond bleu.
```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Le titre de la page</title>
    <style>
        .blue {
            background: blue;
            color: white;
        }
    </style>
</head>

<body>
    <div id="myColoredDiv">
        <p>Un peu de texte <a>et un lien</a></p>
    </div>

    <script>
        document.getElementById('myColoredDiv').className = 'blue';
    </script>
</body>
</html>
```

### Le contenu : innerHTML

`ìnnerHTML` permet de récupérer le code HTML enfant d'un élément sous forme de texte. Si les balises sont présentes, `innerHTML` les retournera sous forme de texte. Exemple :
```html
<body>
    <div id="myDiv">
        <p>Un peu de texte <a>et un lien</a></p>
    </div>

    <script>
        var div = document.getElementById('myDiv');

        alert(div.innerHTML); // affiche : <p>Un peu de texte <a>et un lien</a></p>
    </script>
</body>
```

Il est aussi possible d'ajouter ou d'éditer du HTML
```javascript
document.getElementById('myDiv').innerHTML = '<blockquote>Je mets une citation à la place du paragraphe</blockquote>';
document.getElementById('myDiv').innerHTML += ' et <strong>une portion mise en emphase</strong>.';
```
Il ne faut pas l'utiliser dans une boucle car `innerHTML` ralentit l'exécution du code. Il vaut mieux la concaténer dans une variable et ensuite ajouter le tout via `innerHTML`.

---

## innerText et textContent

`innerText` pour IE et `textContent` pour les autres navigateurs sont des propriétés analogues à `innerHTML`, qui permettent de récupérer le contenu d'un élément sous forme de texte mais sans les balises.
- `innerText` a été introduite dans IE, mais jamais standardisée et n'est pas suportée par tous les navigateurs
- `textContent` est la version standardisée d'`innerText`. Elle est reconnue par tous les navigateurs à l'exception des versions antérieures à IE9.

```html
<body>
    <div id="myDiv">
        <p>Un peu de texte <a>et un lien</a></p>
    </div>

    <script>
        var div = document.getElementById('myDiv');

        alert(div.innerText); // affiche : Un peu de texte et un lien
    </script>
</body>
```

----
----

# Manipuler le code HTML (partie 2/2)

---

## Naviguer entre les noeuds

### La propriété `parentNode`

Elle permet d'accéder à l'élément parent d'un élément.

```html
<blockquote>
    <p id="myP">Ceci est un paragraphe !</p>
</blockquote>
```
```js
var paragraph = document.getElementById('myP');
var blockquote = paragraph.parentNode;
```

`nodeType` et `nodeName` permettent de vérifier le type d'un noeud et le nom d'un noeud. `nodeType` retourne un nombre qui correspond à un type de noeud : 1 pour noeuf élément, 2 pour noeud attribut, 3 pour noeud texte...

`firstChild` et `lastChild` permettent d'accéder au premier et au dernier enfant d'un noeud. Dans l'exemple suivant, le premier enfant de `<p>` est un noeud textuel, le dernier enfant un élément `<strong>`. Il existe aussi les prorpriétés `firstElementChild` et `lastElementChild` pour éviter les noeuds `#text`.
```html
<p id="myP">Un peu de texte, <a>un lien</a> et <strong>une portion en emphase</strong></p>
```
```js
var paragraph = document.getElementById('myP');
var first = paragraph.firstChild;
var last = paragraph.lastChild;
```

### Autres propriétés

- `nodeValue` et `data` sont des propriétés qui s'appliquent sur des noeuds textuels et affichent le contenu
```js
var paragraph = document.getElementById('myP');
var first = paragraph.firstChild;
var last = paragraph.lastChild;

alert(first.nodeValue);
alert(last.firstChild.data);
```
- `childNodes` est une propriété qui retourne un tableau contenant la liste des enfants d'un élément
- `nextSibling` et `previousSibling` permettent d'accéder au noeud suivant et précédent

### Attention au noeuds vides

```html
<div>
    <p>Paragraphe 1</p>
    <p>Paragraphe 2</p>
    <p>Paragraphe 3</p>
</div>
```
```html
<div><p>Paragraphe 1</p><p>Paragraphe 2</p><p>Paragraphe 3</p></div>
```
Les espaces ou les retours à la ligne sont considérés comme des noeuds textuels dans certains navigateurs. Dans le premier exemple, on a donc 7 noeuds enfants dans la `<div>` : un `#text` vide suivi d'un `<p>` suivi d'un `#text` vide... alors que dans le deuxième exemple, on a 3 noeuds enfants qui sont des `<p>`.  
Pour éviter ces noeuds textuels vides, il faut utiliser les attributs `firstElementChild`, `lastElementChild`, `nextElementSibling` et `previousElementSibling` qui ne retournent que les éléments HTML et ignorent donc les noeuds textuels.

---

## Créer et insérer des éléments

Pour ajouter des éléments HTML avec le DOM il faut :
- créer l'élément
  - se fait avec la méthode `createElement()`
  - `var newLink = document.createElement('a');` crée un élément `<a>` mais celui-ci n'est pas inséré dans le document, il n'est donc pas visible
- lui affecter des attributs
  - on définit des attributs soit avec `setAttribute()`, soit directement avec les propriétés adéquates
  - `newLink.id = 'sdz_link';` ou `newLink.setAttribute('tabindex', '10');`
- l'insérer dans le document
  - se fait avec la méthode `appendChild()`
  - par exemple `document.getElementById('myP').appendChild(newLink);` ajoute notre élément `<a>` dans l'élément `<p>` portant l'ID `myP` en tant que dernier enfant

**Ajouter des noeuds textuels**
La méthode `createTextNode()` sert à créer un noeud de type `#text`. Il faut ensuite l'insérer avec la méthode `appendChild()` sur l'élément `newLink`.
```js
var newLinkText = document.createTextNode("Le Site du Zéro");
newLink.appendChild(newLinkText);
```

---

## Notions sur les références

En JavaScript, le contenu des variables est **passé par valeur**, c'est-à-dire que si on affecte la valeur d'une variable à une autre variable, la valeur est copiée dans une nouvelle, on a donc deux variables distinctes. Si on change la valeur d'une deux deux variables, l'autre reste inchangé.  
JavaScript possède aussi aussi un **passage par référence**, c'est-à-dire qu'on transmet l'adresse de la valeur, on peut donc avoir plusieurs variables qui pointent sur une même valeur. On verra des exemples avec la création d'objets.

Le concept de référence se retrouve avec le DOM : deux variables peuvent accéder au même élément. Dans l'exemple suivant, la variable `newLink` contient une référence vers l'élément `<a>` créé (une adresse qui pointe vers `<a>`). Une fois l'élément HTML inséré dans la page, on peut y accéder de nombreuses façons, comme avec `getElementById`.
```js
var newLink = document.createElement('a');
var newLinkText = document.createTextNode('Le Site du Zéro');

newLink.id = 'sdz_link';
newLink.href = 'http://www.siteduzero.com';

newLink.appendChild(newLinkText);

document.getElementById('myP').appendChild(newLink);
```

Il faut retenir que les objets du DOM sont toujours accessibles par référence. On ne peut donc pas copier un élément de la manière suivante, car les deux variables pointent vers le même élément. Pour duppliquer un élément, il va faloir le clôner.
```js
var newDiv1 = document.createElement('div');
var newDiv2 = newDiv1; // On tente de copier le <div>
```

---

## Clôner, remplacer, supprimer

`cloneNode()` permet de cloner un élément, avec un paramètre à renseigner à `true` ou `false` si on souhaite clôner le noeud avec ou sans ses enfants et ses différents attributs. Attention, les événements ne sont pas copiés.
```js
// On va cloner un élément créé :
var hr1 = document.createElement('hr');
var hr2 = hr1.cloneNode(false); // Il n'a pas d'enfants…

// Ici, on clone un élément existant :
var paragraph1 = document.getElementById('myP');
var paragraph2 = paragraph1.cloneNode(true);

// Et attention, l'élément est cloné, mais pas « inséré » tant que l'on n'a pas appelé appendChild() :
paragraph1.parentNode.appendChild(paragraph2);
```

`replaceChild()` permet de remplacer un élément par un autre. Il y a deux paramètres : le nouvel élément et l'élément à remplacer
```html
<body>
    <div>
        <p id="myP">Un peu de texte <a>et un lien</a></p>
    </div>

    <script>
        var link = document.querySelector('a');
        var newLabel = document.createTextNode('et un hyperlien');

        link.replaceChild(newLabel, link.firstChild);
    </script>
</body>
```

`removeChild()` permet de supprimer un élément. La méthode prend en paramètre le noeud enfant à retirer. La méthode retourne l'élément supprimé, il est donc possible de supprimer un élément HTML et de la réintégrer ensuite.
```js
var link = document.querySelector('a');
link.parentNode.removeChild(link);
```

---

## Autres actions

`hasChildNodes` appliquée sur un élément renvoie true si l'élément possède au moins un enfant, false sinon

`insertBefore` permet d'insérer un élément avant un autre, avec en paramètre l'élément à insérer et l'élément avant lequel insérer l'élément

----
----

# Les événements

---

## Que sont les événements

Les événements permettent de déclencher uen fonction selon qu'une action s'est produite ou non, par exemple faire apparaître une fenêtre `alert()` au survol d'une zone d'un élément.

### Liste des événements
- `click`: cliquer (appuyer puis relâcher) sur l'élément
- `dblclick` : double-cliquer sur l'élément
- `mouseover` : faire entrer le curseur sur l'élément
- `mouseout` : faire sortir le curseur de l'élément
- `mousedown` : appuyer (sans relâcher) sur le bouton gauche de la souris sur l'élément
- `mouseup` : relâcher le bouton gauche de la souris sur l'élément
- `mousemove` : faire déplacer le curseur sur l'élément
- `keydown` : appuyer (sans relâcher) sur une touche de clavier sur l'élément
- `keyup` : relâcher une touche de clavier sur l'élément
- `keypress` : frapper (appuyer puis relâcher) une touche de clavier sur l'élément
- `focus` : cibler l'élément, pour qu'il reçoive tous les événement du clavier
- `blur` : annuler le ciblage de l'élément
- `input` : taper un caractère dans un champ texte (support incomplet selon les navigateurs)
- `select` : sélectionner le contenu d'un champ de texte (input, textarea...)

Il existe aussi deux événéments spécifiques à l'élément `form`
- `submit` pour envoyer le formulaire
- `reset` pour réinitialiser le formulaire

### Utiliser les événéments sans le DOM

- l'événement `click`. Dans l'exemple, il permet en cliquant sur le texte d'afficher la boite de dialogue
```html
<span onclick="alert('Hello !');">Cliquez-moi !</span>
```

- le mot clé `this` est une propriété pointant sur l'objet courant. L'appel à ce mot-clé lors d'un événement fait que l'objet pointé est l'élément qui a déclanché l'événement
```html
<span onclick="alert('Voici le contenu de l\'élément que vous avez cliqué :\n\n' + this.innerHTML);">Cliquez-moi !</span>
```

- le focus. Dans l'exemple, lorsqu'on clique sur l'input, il possède le focus et exécute l'événement `focus`. Lorsque l'input perd le focus, cela déclenche l'événement `blur`
```html
<input id="input" type="text" size="50" value="Cliquez ici !" onfocus="this.value='Appuyez maintenant sur votre touche de tabulation.';" onblur="this.value='Cliquez ici !';"/>
<br /><br/>
<a href="#" onfocus="document.getElementById('input').value = 'Vous avez maintenant le focus sur le lien, bravo !';">Un lien bidon</a>
```

- bloquer l'action par défaut. Par exemple, ne pas rediriger vers l'URL indiqué lorsqu'on clique sur un lien, en ajoutant dans `return false; dans l'événément`. On peut éventuellement mettre `"#"` dans le href, ce qui redirige en haut de la page Web
```html
<a href="http://www.siteduzero.com" onclick="alert('Vous avez cliqué !'); return false;">Cliquez-moi !</a>
```
Par ailleurs, la balise `<a>` est conçue pour rediriger vers une page Web et non pour servir de déclencheur. Pour cela, utiliser une balise `<button>` aà laquelle on retire le style CSS

---

## Les événements au travers du DOM

### Le DOM-0

- interface ancienne implémentée par Netscape, appelée DOM-0
- on définit les événements non plus dans le code HTML mais directement en JavaScript. Chaque événement standard possède une propriété dont le nom est précédé des deux lettres "on". Cette propriété prend pour valeur une fonction ou une fonction anonyme
- pour supprimer un événement avec le DOM-0, il fait lui attribuer une fonction anonyme vide `element.onclick = function() {};`
```html
  <span id="clickme">Cliquez-moi !</span>

  <script>

      var element = document.getElementById('clickme');

      element.onclick = function() {
          alert("Vous m'avez cliqué !");
      };

  </script>
```

### Le DOM-2

- la méthode sans le DOM ne permet pas d'accéder à l'objet `Event` qui contient beaucoup d'informations sur l'événement déclenché
- le DOM-0 est vieux et ne permet pas de créer plusieurs fois le même événement
- le DOM-2 permet la création multiple d'un même événement et gère aussi l'objet `Event`
```html
<span id="clickme">Cliquez-moi !</span>

<script>
    var element = document.getElementById('clickme');

    element.addEventListener('click', function() {
        alert("Vous m'avez cliqué !");
    });
</script>
```
Dans cet exemple, ce qui change par rapport au DOM-0 et qu'on n'utilise plus une propriété mais la méthode `addEventListener()` qui prend 3 paramètres : le nom de l'événément sans "on, la fonction à exécuter, et un booléen optionnel pour spécifier si on souhaite utiliser la phase de capture ou de bouillennement (cf ci-après)

On peut créer deux événements identiques pour un même élément. Ainsi, lors du déclenchement, les 2 événements seront exécutés.
```html
<span id="clickme">Cliquez-moi !</span>

<script>
    var element = document.getElementById('clickme');

    // Premier événement click
    element.addEventListener('click', function() {
        alert("Et de un !");
    });

    // Deuxième événement click
    element.addEventListener('click', function() {
        alert("Et de deux !");
    });
</script>
```

Pour supprimer un événement, il faut utiliser la méthode `removeEventListener()` avec les mêmes paramètres utilisés lors de sa création
```js
element.addEventListener('click', myFunction); // On crée l'événement
element.removeEventListener('click', myFunction); // On supprime l'événement en lui repassant les mêmes paramètres
```

### Les phases de capture et de bouillonnement

Ce sont deux étapes distinctes de l'exécution d'un événement. La **capture** s'exécute avant le déclenchement de l'événement tandis que le **bouillonnement** s'exécute après le déclenchement de l'événement. Elles permettent de définir le sens de propagation des événements
```html
<div>
    <span>Du texte !</span>
</div>
```
Dans cet exemple, si on attribue une fonction à l'événement `click` de chacun de ces deux éléments, quel événement va se déclencher en premier ? Avec la capture, l'événement du `<div>` se déclenchera en premier suivi de celui du `<span>`. Avec le bouillonnement, l'événement du `<span>` se déclenchera d'abord. **La phase de bouillonnement est définie par défaut** et celle qu'on utilise le plus souvent.

---

## L'objet Event

L'objet `Event` fournit une multitude d'informations sur l'événement actuellement déclenché, comme les touches actuellement enfoncés, les coordonnées du curseur, l'élément qui a déclenché l'événement...  
Cet objet n'est accessible que lorsqu'on événement est déclenché, dans une fonction exécutée par un événement
```js
element.addEventListener('click', function(e) { // L'argument « e » va récupérer une référence vers l'objet « Event »
    alert(e.type); // Ceci affiche le type de l'événement (click, mouseover, etc.)
});
```

- la propriété `type` permet de savoir quel type d'événement s'est déclenché

- la propriété `target` permet de récupérer l'élément de l'événement actuellement déclenché, pour par exemple modifier le contenu d'un élément cliqué
```html
<span id="clickme">Cliquez-moi !</span>

<script>
    var clickme = document.getElementById('clickme');

    clickme.addEventListener('click', function(e) {
        e.target.innerHTML = 'Vous avez cliqué !';
    });
</script>
```

- la propriété `currentTarget` permet de connaître l'élément à l'origine de l'événement, alors que `target` permet de connaître l'élément déclencheur qui peut être un élément enfant. Il s'utilise de la même manière que `target`

- récupérer la position du curseur, généralement par raport au coin supérieur gauche de la page Web, ou aussi au coin supérieur gauche de l'écran. Il faut utiliser les propriétés `clientX` et `clientY` pour les positons horizontales et verticales. Souvent combiné avec l'événement `mousemove` car la position change à chaque déplacement de la souris
```html
<div id="position"></div>

<script>
    var position = document.getElementById('position');

    document.addEventListener('mousemove', function(e) {
        position.innerHTML = 'Position X : ' + e.clientX + 'px<br />Position Y : ' + e.clientY + 'px';
    });
</script>
```

- la propriété `relatedTarget` permet de récupérer l'élément en relation avec un événement de souris. Elle ne s'utilise qu'avec les événements `mouseover` (objet de l'élément dont le curseur vient de sortir) et `mouseout` (objet de l'élément sur lequel le curseur vient d'entrer)

- récupérer les touches frappées par l'utilisateur, se fait par le biais de trois événements
  - les événements `keyup` et `keydown` servent à capter toutes les frappes des touches, ils retournent un caractère majuscule que la touche `Maj` soit pressée ou non
  - l'événement `keypress` sert à capter les touches qui écrivent. En tapant Maj+A, `keypress` détectera nien un A majuscule
  - il existe trois propriétés capables de fournir une valeur : `keyCode`, `charCode` et `which`. `keyCode` est suffisante

- bloquer l'action par défaut de certains événements avec DOM-2, avec la méthode `preventDefault()`
```html
<a id="link" href="http://www.siteduzero.com">Cliquez-moi !</a>

<script>
    var link = document.getElementById('link');

    link.addEventListener('click', function(e) {
        e.preventDefault(); // On bloque l'action par défaut de cet événement
        alert('Vous avez cliqué !');
    });
</script>
```

---

## Résoudre les problèmes d'héritage des événements

Parfois, un événement appliqué sur un parent se propage à ses enfants. Cet héritage des événements peut provoquer des comportements inattendus. C'est le cas des événements `mouseover`, `mouseout`, `mousemove`, `click`... Pour régler cela, il faut utiliser la propriété `relatedTarget` pour détecter quel est l'élément vers lequel le curseur se dirige ou de quel élément il provient.

----
----

# Les formulaires

----

## Les propriétés

On va s'intéresser aux propriétés spécifiques aux éléments d'un formulaire : `value`, `disabled`, `checked`...

### La propriété value

Elle permet de définir une valeur pour différents éléments d'un formulaire comme les `<input>` en lui assignant une valeur et elle est affichée sur l'élément HTML. Elle s'utilise aussi avec l'élément `<textarea>`. Pour ce dernier, on ne peut pas utiiser `innerHTML`

```html
<input id="text" type="text" size="60" value="Vous n'avez pas le focus !" />

<script>
    var text = document.getElementById('text');

    text.addEventListener('focus', function(e) {
        e.target.value = "Vous avez le focus !";
    });

    text.addEventListener('blur', function(e) {
        e.target.value = "Vous n'avez pas le focus !";
    });
</script>
```

### Les booléens avec `disabled`, `checked` et `readonly`

En HTML, ces 3 propriétés s'utilisent de la manière suivante : `<input type="text" disabled="disabled" />`.  
En JavaScript, ces propriétés sont des booléens.
```html
<input id="text" type="text" />
<script>
    var text = document.getElementById('text');
    text.disabled = true;
</script>
```

Pour les boutos de type radio, on peut utiliser la méthode `querySelectorAll()`
```html
<label><input type="radio" name="check" value="1" /> Case n°1</label><br />
<label><input type="radio" name="check" value="2" /> Case n°2</label><br />
<label><input type="radio" name="check" value="3" /> Case n°3</label><br />
<label><input type="radio" name="check" value="4" /> Case n°4</label>
<br /><br />
<input type="button" value="Afficher la case cochée" onclick="check();" />

<script>
function check() {
    var inputs = document.querySelectorAll('input[type=radio]:checked'),
        inputsLength = inputs.length;

    for (var i = 0; i < inputsLength; i++) {
        alert('La case cochée est la n°' + inputs[i].value);
    }
}
</script>
```

### Les listes déroulantes avec `selectedIndex` et `options`
