# AreYouSure.js

Inline confirmation dialogs, and nothing more.

[Download](https://raw.github.com/sloria/AreYouSure.js/master/areyousure.js) (2 Kb) [Minified](https://raw.github.com/sloria/AreYouSure.js/master/areyousure.min.js) (1 Kb)

[Demo](http://www.stevenloria.com/AreYouSure.js/)

```javascript
// No configuration
$("#default").areyousure();
// Custom text
$("#customText").areyousure({text: "¿Está seguro?", confirmText: "Sí", cancelText: "No"});
// Callbacks
$("#callback").areyousure({ yes: function(evt) {alert('Sure.');},
                            no:  function(evt) {alert('Not sure.');} });
```

[MIT Licensed](http://sloria.mit-license.org/).



