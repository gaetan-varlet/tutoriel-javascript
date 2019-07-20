# L'asynchrone en Javascript

## JavaScript est synchrone et mono-thread

En JavaScript, il y a un seul fil d'exécution, chaque ligne est exécutée l'une après l'autre en attendant la fin de l'exécution de la ligne précédente.

```js
function main() {
    console.log('avant')
    const res = sumSync(2, 5)
    console.log(res)
    console.log('après')
}
```
```
avant
7
après
```


Il est possible d'exécuter du code de manière **asynchrone** sans bloquer l'exécution de la suite du programme. La fonction asynchrone est placée dans une file d'attente qui va exécuter toutes les fonctions qu'elle contient. On parle d'**event loop**. Une fois le traitement terminé, on revient dessus pour exploiter les résultats.

```js
const myFunction = () => {
    console.log('Exécuté dans 1 seconde')
}
setTimeout(myFunction, 1000)
console.log('Exécuté en premier immédiatement')
```
```
Exécuté en premier immédiatement
Exécuté dans 1 seconde
```

## Récupérer le résultat d'une méthode asynchrone

### Les callbacks

C'est la méthode la plus ancienne.
Un callback est une fonction que l'on passe en paramètre d'une fonction asynchrone, qui une fois qu'elle a fini sa tâche va appeler la fonction callback en lui passant le résultat

```js
const myFunction = (a, b) => a + b
const callback = () => console.log('exécution asynchrone : ', myFunction(4, 5))
setTimeout(callback, 1000)
console.log('exécution synchrone : ', myFunction(2, 3))
```
```
exécution synchrone :  5
exécution asynchrone :  9
```

Exemple sur une fonction synchrone qui logue la somme une fois le calcul effectué, mais le principe est le même sur une fonction asynchrone :
```js
function addition(nombre1, nombre2, callback) {
    const somme = nombre1 + nombre2
    callback(somme)
}

addition(1, 2, function(res) {
    console.log(res)
})
```

Il est possible d'imbriquer les callbacks mais cela devient difficile à lire.

Pour gérer les erreurs, on peut utiliser 2 paramètres, le 2e est les données, le 1er est l'erreur qui est null ou undefined s'il n'y a pas d'erreur

```js
const fs = require('fs')
fs.readFile('./math.js', function(err, data) {
    if (err) {
        console.log('erreur !')
        throw err
    }
    console.log('résultat ok !')
    console.log(data)
})
console.log('coucou')
```

```
coucou
résultat ok !
<Buffer 65 78 70 6f 72 74 20 64 65 66 61 75 6c 74 20 66 75 6e 63 74 69 6f 6e 20 73 75 6d 28 61 2c 20 62 29 20 7b 0a 20 20 20 20 72 65 74 75 72 6e 20 61 20 2b ... >
```

### Promises

Les **promises**, promesses en français, sont une autre façon de gérer du code asynchrone arrivées avec l'ES6 (ES2015). Une fonction exécutant du code asynchrone va immédiatement nous retourner une *promesse* (un objet **Promise**) qu'un résultat nous sera renvoyé prochainement. Une promesse peut être **resolve** avec un résultat,  **reject** avec une erreur, ou **pending** si elle est en attente de résultat.

On peut utiliser sa fonction **then()** pour exécuter du code dès que la promesse est résolue ou sa fonction **catch()** dès qu'une erreur est survenue.

```js
// définition de la promesse
var promise = new Promise(function (resolve, reject) {
    // Ici je fais mon traitement, mes appels http…

    if (/* tout a fonctionné */) {
        resolve("Tout est OK!")
    }
    else {
        reject(Error("Hmm c'est embêtant…"))
    }
})
// utilisation de la promesse
promise.then(
    function (result) {
        console.log(result) // "Tout est OK!"
    }, function (err) {
        console.log(err) // Error: "Hmm c'est embêtant…"
    }
)
```
```js
// écriture équivalente
promise
    .then(function(result) {
        console.log(result) // "Tout est OK!"
    })
    .catch(function(error) {
        console.log(error)
    })
```


Il est possible de chaîner les promesses en enchaînant les *.then()* et les *.catch()*


### Async / await

**async** et **await** sont 2 nouveaux mots clés sortis avec l'ES7 (ES2016) qui permettent de gérer l'asynchrone de manière plus simple.
Une fonction asynchrone doit avoir le mot clé async, et lorsqu'on l'appel et qu'on veut attendre son résultat, il faut écrire await devant l'appel de la fonction

```js
async function asyncFunction1(a, b) {
    return a + b
}
const asyncFunction2 = async (a, b) => a + b

async function asyncFunction3() {
    const a = await asyncFunction1(1, 2)
    const b = await asyncFunction2(3, 4)
    console.log('affichage dans la fonction : ', a + b)
    return a + b
}
console.log("affichage à l'appel la fonction : ", asyncFunction3()) // Promise { <pending> }
```

```
affichage à l'appel la fonction :  Promise { <pending> }
affichage dans la fonction :  10
```

async et await utilisent les promesses, il est donc possible de les combiner. Pour gérer les erreurs, il faut utiliser un bloc `try {} catch (e) {}`.


```js
const promise = new Promise(function(resolve, reject) {
    // Ici je fais mon traitement, mes appels http…
    if (Math.random() > 0.5) {
        resolve('Tout est OK!')
    } else {
        reject(Error("Hmm c'est embêtant…"))
    }
})

async function myAsyncFunction() {
    try {
        // Ici "myPromise " est résolue
        const res = await promise
        return `résultat : ${res}`
    } catch (err) {
        // Ici "myPromise " est rejetée
        return `résultat : ${err}`
    }
}

async function main() {
    const res = await myAsyncFunction()
    console.log(res)
    // retourne une deux 2 lignes suivantes aléatoirement :
    // résultat : Tout est OK!
    // résultat : Error: Hmm c'est embêtant…
}
main()
```