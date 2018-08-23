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

C'est une propriété de l'objet Window. C'est la représentation de notre HTML. Avec JavaScript, on va manipuler le DOM.

Le document a des propriétés que l'on peut modifier, par exemple le titre de la page :
```js
console.log(document.title) // affiche : JavaScript
document.title = "Mon nouveau titre"
console.log(document.title) // affiche :  Mon nouveau titre

console.log(document.body) // affiche le body
```

----
----

# JavaScript et le DOM

----

## Hiérarchie de nos éléments
