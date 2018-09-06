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

## Hiérarchie de nos éléments

```html
    <body>
        <div>
            <p>Mon paragraphe 1</p>
            <p>Mon paragraphe 2</p>
         </div>
    <script src="script.js"></script>
</body>
```

----
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
