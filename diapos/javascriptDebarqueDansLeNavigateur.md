# JavaScript débarque dans le navigateur

----
----

# JavaScript dans le navigateur

----

## L'objet Window

Lorsque JavaScript est exécuté dans le navigateur, l'objet global est Window. Il possède des propriétés et des méthodes. On peut y accéder directement sans mettre le mot *window* car c'est l'objet global.
```js
// affiche la largeur du navigateur
console.log(window.innerWidth)
console.log(innerWidth)
```

----

## L'objet Location

C'est une propriété de l'objet global Window. Il a lui-même des propriétés et des méthodes. Il contient des informations sur où se trouve notre navigateur (URL, etc...).

```js
location.reload() // relancer la page
location.replace("URL") // permet de change d'URL
```

----

## L'objet Document : le DOM

C'est une propriété de l'objet Window. C'est la représentation de notre page HTML. Avec JavaScript, on va manipuler le DOM.
On peut voir les propriétés de l'objet document avec la commande `console.log(window)` et le contenu de l'objet document avec la commande `console.log(window.document)`.

Le document a des propriétés que l'on peut modifier, par exemple le titre de la page :
```js
console.log(document.title) // affiche : JavaScript (titre présent dans la page HTML)
document.title = "Mon nouveau titre"
console.log(document.title) // affiche :  Mon nouveau titre

console.log(document.body) // affiche le body
```

----
----

# JavaScript et le DOM

----

## Hiérarchie des éléments

- `children` renvoie une *HTML Collection* (un peu comme un tableau) des enfants de l'élément
- `firstElementChild` et `lastElementChild` renvoient le premier et le dernier enfant de l'élément
- `nextElementSibling` renvoie le prochain élément de même niveau
- `parentElement` renvoie l'élément parent

```html
<body>
    <div>
        <p>Mon paragraphe 1</p>
        <p>Mon paragraphe 2</p>
    </div>
    <script src="script.js"></script>
</body>
```
```js
console.log(document.body.children) // [div, script]
console.log(document.body.children[0].children) // [p, p]
console.log(document.body.firstElementChild) // équivalent à children[0], retourne la div
console.log(document.body.children[0].nextElementSibling) // affiche le script
console.log(document.body.children[0].parentElement) // affiche le body
```

----

## Récupérer et modifier les éléments

Un `console.log()` d'un élément du DOM affiche la représentation HTML de l'élément, mais on ne voit pas ses propriétés. Pour voir les propriétés et méthodes d'un élément, il faut afficher tous les enfants de l'élément parent et cliquer sur l'élément enfant qui nous intéresse dans la console.

```js
console.log(document.body.children[0].children[1]) // affiche <p>Mon paragraphe 2</p>
console.log(document.body.children[0].children) // affiche l'HTML Collection avec ses 2 enfants. On peut cliquer sur chaque enfant pour voir ses attributs et méthodes
```

`textContent` retourne la string de l'élément HTML et permet aussi de modifier le contenu de l'élément

```js
console.log(document.body.children[0].children[1].textContent) // affiche Mon paragraphe 2
document.body.children[0].children[1].textContent = "Nouveau Texte"
console.log(document.body.children[0].children[1].textContent) // affiche Nouveau Texte
```

----

## Modifier le style

La propriété `style` permet de modifier le style CSS des éléments. Les types correspondent au CSS sauf qu'il faut les écrire en kamel case. Par exemple écrire **backgroundColor** en JavaScript au lieu de **background-color** en CSS.

```js
document.body.children[0].style.backgroundColor = "red" // mais le fond de la div en rouge
```

----

## Modifier les classes CSS

```html
<body>
    <div class="super">
        <p>Mon paragraphe 1</p>
        <p>Mon paragraphe 2</p>
    </div>
    <script src="script.js"></script>
</body>
```

`classList` permet d'avoir la liste des classes CSS que possède un élément. Les méthodes `add()` et `remove()` permettent d'ajouter et d'enlever des classes CSS. `toggle()` permet d'enlever la classe si elle présente et de l'ajouter si elle n'y est pas.

```js
console.log(document.body.children[0].classList) // affiche ["super"]
document.body.children[0].classList.add("toto") // ajoute la classe toto à la div et applique son style
console.log(document.body.children[0].classList) // affiche ["super", "toto"]
document.body.children[0].classList.remove("toto") // enlève la classe toto de la div et enlève son style
console.log(document.body.children[0].classList) // affiche ["super"]
document.body.children[0].classList.toggle("toto")
console.log(document.body.children[0].classList) // affiche ["super", "toto"]
document.body.children[0].classList.toggle("toto")
console.log(document.body.children[0].classList) // affiche ["super"]
```

----

## Modifier les attributs

Un attribut correspond aux informations présentes dans une balise, par exemple *src* dans la balise *script* : `<script src="index.js"></script>`. Les méthodes `getAttribute()` et `setAttribute()` permettent de récupérer et modifier un attribut d'un élément HTML.

```js
console.log(document.body.children[1].getAttribute("src")) // affiche index.js
document.body.children[1].setAttribute("src", "toto.js") // modifie la valeur de l'attribut renseignée
console.log(document.body.children[1].getAttribute("src")) // affiche toto.js
```

----

## Sélectionner les éléments

Pour sélectionner un élément, on peut le faire plus simplement qu'en partant de `body` et en descendant avec `children`. La méthode `getElementById()` de l'objet document permet de sélectionner un élément par son id, `getElementsByTagName()` sélectionne les éléments qui correspondent à un tag HTML, par exemple `h1` ou `p`, et `getElementsByClassName()` sélectionne les éléments qui correspondent à une classe CSS.  
On peut aussi stocker les éléments dans une variable.

```html
<body>
    <div class="super">
        <h1 id="titre">Mon Titre</h1>
        <p class="maClasse">Mon paragraphe 1</p>
        <p>Mon paragraphe 2</p>
    </div>
    <script src="script.js"></script>
</body>
```

```js
console.log(document.getElementById("titre")) // affiche <h1 id="titre">Mon Titre</h1>
console.log(document.getElementsByTagName("p")) // affiche une HTML Collection avec les 2 paragraphes
console.log(document.getElementsByClassName("maClasse")) // affiche une HTML Collection avec l'élément qui a cette classe

const monTitre = document.getElementById("titre")
console.log(monTitre) // affiche <h1 id="titre">Mon Titre</h1>
```

----

## Sélectionner avec Query Selector

La méthode `querySelector()` permet d'utiliser les sélecteurs CSS pour sélectionner un élément. Si plusieurs éléments correspondent, seul le premier élément sera sélectionné. La méthode `querySelectorAll()` renvoie une liste, et permet donc de sélectionner plusieurs éléments.

```js
console.log(document.querySelector(".maClasse")) // affiche <p class="maClasse">Mon paragraphe 1</p>
console.log(document.querySelectorAll(".maClasse")) // affiche une NodeList d'un élément avec le paragraphe 1

console.log(document.querySelector("p")) // affiche <p class="maClasse">Mon paragraphe 1</p> (le 1er paragraphe rencontré)
console.log(document.querySelectorAll("p")) // affiche une NodeList de deux éléments avec les paragraphes
```

----

## Modifier l'ordre des éléments

La méthode `insertBefore()` permet d'insérer un élément HTML avant un autre élément. Si l'élément existe déjà, il est d'abord supprimé avant d'être replacé. La méthode `appendChild()` permet d'ajouter un élément à un autre élément en tant qu'enfant. La méthode `replaceChild()` permet de remplacer un élément enfant par un autre. La méthode `removeChild()` permet de supprimer un élément, `remove()` le permet aussi de manière plus simple mais n'est pas supporté par les anciennes versions des navigateurs.

```html
<link rel="stylesheet" href="style.css">
<body>
    <div class="rouge">Rouge</div>
    <div class="vert">Vert</div>
    <div class="bleu">Bleu</div>
    <script src="script.js"></script>
</body>
```
```css
.rouge, .vert, .bleu {
    width: 300px;
    height: 100px;
    color: white;
    font-size: 40px;
    text-align: center;
}
.rouge {
    background-color: red;
}
.vert {
    background-color: green;
}
.bleu {
    background-color: blue;
}
```

```js
const rouge = document.querySelector(".rouge")
const vert = document.querySelector(".vert")
const bleu = document.querySelector(".bleu")

document.body.insertBefore(bleu,vert) // insère l'élément bleu avant l'élément vert

rouge.appendChild(bleu) // ajoute l'élément bleu en tant qu'enfant de rouge

document.body.replaceChild(bleu, rouge) // remplace l'élément rouge par l'élément bleu

bleu.parentElement.removeChild(bleu) // permet de supprimer l'élément bleu
bleu.remove() // permet aussi de supprimer l'élément bleu mais n'est pas supporté par les anciens navigateurs
```

----

## Créer des éléments



----

# Requêtes HTTP - Ajax

----

## Qu'est-ce qu'une requête HTTP ?

Ajax est un raccourci pour Asynchronous JavaScript + XML (JavaScript  asynchrone plus XML).

Ajax permet d'échanger avec le serveur via des requêtes HTTP sans rafraîchir toute la page mais uniquement certains élément de la page. Ces requêtes fonctionnent de manière asynchrones, c'est-à-dire que l'on traitera la réponse quand elle arrive sans attendre qu'elle arrive, ce qui permet de continuer à exécuter la suite du code.

## Requêtes HTTP avec XMLHttpRequest

`XMLHttpRequest` est l'objet qui permet de faire des requêtes Ajax. C'est l'objet de base qui sert à faire des requêtes HTTP. D'autres objets se basent dessus.

Lors d'une requête HTTP, son état va varier, et nous pouvons récupérer chaque changement de cet état, avec l'événement `onreadystatechange`. L'état varie de 0 à 4. La requête est terminée à l'état 4.

Exemple avec l'API Jsonplaceholder sur l'URL `/posts` en GET :
```js
const req = new XMLHttpRequest()
const method = 'GET'
const url = 'https://jsonplaceholder.typicode.com/posts'

req.onreadystatechange = function(event){
    if(this.readyState === XMLHttpRequest.DONE){// on aurait pu écrire 4 à la place, c'est pareil
        if(this.status === 200){
            console.log(
                JSON.parse(this.responseText)
            )
        } else {
            console.log("Statut Erreur : "+this.status)
        }
    }
}

req.open(method, url)
req.send()
```
Exemple d'une requête en POST :
```js
const req = new XMLHttpRequest()
const method = 'POST'
const url = 'https://jsonplaceholder.typicode.com/posts'

const data = {
    body: "la la la",
    title: "mon titre",
    userId: 1
}

req.onreadystatechange = function(event){
    if(this.readyState === XMLHttpRequest.DONE){// on aurait pu écrire 4 à la place, c'est pareil
        if(this.status === 201){
            console.log(
                JSON.parse(this.responseText)
            )
        } else {
            console.log("Statut Erreur : "+this.status)
        }
    }
}

req.open(method, url)
req.send(data)
```

La méthode `open()` prend en argument la méthode HTTP puis l'url à appeler. Il y a ensuite des arguments optionels : `XMLHttpRequest.open(method, url, async, user, password)`
- `async` : à *true* par défaut. On peut le mettre à *false* pour faire des requêtes synchrones, ce qui est déconseillé
- `user` et `password` sont *null* par défaut et servent à l'authentification
