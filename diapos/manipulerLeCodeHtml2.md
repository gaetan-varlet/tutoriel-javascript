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
