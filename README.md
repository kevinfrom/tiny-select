# Tiny select

A lightweight custom select that you can style how you like.

Try out the [demo](https://tiny-select.kevinfrom.dk)!

## Requirements

- jQuery
- sass (only if you intend on including the provided base styles found in `src/sass/tiny-select.scss`)

## Installation

```html
<!-- Load tiny-select (required) -->
<script src="tiny-select.min.js"></script>

<!-- Load tiny-select css (optional) -->
<link rel="stylesheet" href="tiny-select.min.css">
```

## Example usage

```javascript
// Initialize
$('select').tinySelect();
```

## Methods

|Method|Description|Example|
|-|-|-|
|open|Opens a tiny select|`$('.tiny-select').tinySelect('open');`|
|close|Closes a tiny select|`$('.tiny-select').tinySelect('close');`|