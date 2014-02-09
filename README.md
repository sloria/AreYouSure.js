# AreYouSure.js [![Build Status](https://travis-ci.org/sloria/AreYouSure.js.png?branch=master)](https://travis-ci.org/sloria/AreYouSure.js)

Inline confirmation dialogs for Javascript.

<a href="http://www.stevenloria.com/AreYouSure.js/"><img src="https://dl.dropboxusercontent.com/u/1693233/github/Screenshot%202014-02-08%2016.57.37.png" alt="Screenshot"></a>

## Download

[Uncompressed](https://raw.github.com/sloria/AreYouSure.js/master/areyousure.js) (3 Kb) [Minified](https://raw.github.com/sloria/AreYouSure.js/master/areyousure.min.js) (2 Kb)

## Demo

http://stevenloria.com/AreYouSure.js/

## Install

With Node:

```
$ npm install areyousure
```

Or in HTML:

```html
<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="areyousure.js"></script>
```

## Usage

Just add `data-areyousure` to any clickable element to add an inline confirmation dialog to it.

```html
<button data-areyousure>Big Red Button</button>
```

That's it!

## And more

Implicit creation using HTML:

```html
<!-- No configuration -->
<button data-areyousure>Default</button>
<!-- Custom text -->
<button data-areyousure="¿Está seguro?" data-confirm="Sí" data-cancel="No">Custom Text</button>
<!-- Callbacks -->
<button id="callbacks" data-areyousure>Callbacks</button>
<script>
$(function() {
    $("#callbacks + .areyousure-dialog [data-ays-action='confirm']").on('click', function() {alert("Sure.");});
    $("#callbacks + .areyousure-dialog [data-ays-action='cancel']").on('click', function() {alert("Not sure.");});
});
</script>
```

Or programatically, with jQuery:

```javascript
// No configuration
$("#default").areyousure();
// Custom text
$("#customText").areyousure({text: "¿Está seguro?", confirmText: "Sí", cancelText: "No"});
// Callbacks
$("#callback").areyousure({ yes: function() {alert('Sure.');},
                            no:  function() {alert('Not sure.');} });
```

## License

[MIT Licensed](http://sloria.mit-license.org/).



