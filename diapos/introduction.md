# Introduction

----

## Qu’est que le JavaScript ?
Le JavaScript est un langage de programmation de scripts orienté objet

Un langage de programmation permet d’écrire du code source qui sera analysé par l’ordinateur. Il existe  trois manières d’utiliser du code source :
- **langage compilé :** le code source est donné à un programme appelé compilateur qui va lire le code source et le convertir dans un langage que l’ordinateur sera capable d’interpréter : le langage binaire. Les langages comme le C ou le C++ sont des langages dits compilés
- **langage précompilé :** le code source est partiellement compilé, dans un langage plus simple à lire par l’ordinateur mais ce n’est pas encore du binaire. Ce code intermédiaire devra être lu par une machine virtuelle qui exécutera ce code. Les langages comme Java ou C# sont dits précompilés
- **langage interprété :** pas de compilation, le code source reste tel quel. Pour exécuter le code, on doit le fournir à un interpréteur et lira le code et réalisera les actions. Pour obtenir des gains de performances, on peut le le compiler à la volée pendant son exécution, ce que font aujourd’hui la plupart des interpréteurs JavaScript

Les scripts sont majoritairement interprétés, ce qui est le cas de JavaScript qui est un langage interprété. Il y a un interpréteur JavaScript dans le navigateur Web, qui est différent selon le navigateur : Chakra dans Internet Explorer, SpiderMonkey dans Firefox, V8 dans Chrome.

Le JavaScript est majoritairement utilisé sur les pages Web pour dynamiser les pages HTML, en ajoutant des interactions avec l’utilisateur, des animations, de l’aide à la navigation, par exemple : afficher ou masquer du texte, faire défiler des images, créer des infobulles…

Les scripts JavaScript sont exécutés par le navigateur chez l’internaute (le client), contrairement aux langages serveur (comme le PHP) exécuté par le serveur web.
Un script serveur va s’occuper de créer la page Web qui sera envoyé au navigateur. Ce dernier va alors afficher la page puis exécuter les scripts client tel que le JavaScript.

Le JavaScript ne sert pas que dans les pages Web. Il sert aussi à réaliser des extensions pour des programmes. Chrome et Firefox en possèdent tous deux un panel gigantesque en partie codées en JavaSript.
Il est aussi possible d’exécuter du JavaScript en dehors du navigateur.
Le JavaScript peut aussi être utilisé pour réaliser des applications.

----

## Petit historique du langage
En 1995, Brendan Eich développe le LiveScript qui sera renommé en JavaScript en hommage au langage Java. Netscape décide d’envoyer sa version de JavaScript à l’ECMA international pour que le langage soit standardisé. L’ECMA standardise le langage soit le nom d’ECMAScript. L’ECMAScript est la référence de base, de là en découle des implémentations comme le JavaScript.

Les versions du JavaScript sont basées sur celles de l’ECMAScript. Ainsi il existe :
- ES1 et ES2 qui sont les prémices du langage JavaScript
- ES3 sorti en décembre 1999
- ES4 qui a été abandonné en raison de modifications trop importantes qui ne furent pas appréciées
- ES5 sortie en décembre 2009, la version la plus répandue et la plus utilisée à ce jour
- ES6, finalisé en décembre 2014

Le cours portera sur la version 5 de l’ECMAScript, la version n’étant pas encore bien supporté à l’heure actuelle.
