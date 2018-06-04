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
