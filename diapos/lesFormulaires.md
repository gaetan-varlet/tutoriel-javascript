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
