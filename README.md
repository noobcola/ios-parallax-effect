# Simple iOS Parallax Effect

A simple jQuery plugin that reproduces the moving background parallax effect in iOS using only HTML, CSS, and JS

## Example Usage

Include jQuery and ios-parallax:

```html
<script src="//code.jquery.com/jquery.min.js"></script>
<script src="ios-parallax.js"></script>
<body>
    <div id="elem"></div>
</body>
```

Add a CSS background image to the target element:

```
#elem {
  background: url('bg.jpg') no-repeat fixed;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 0;
  height: 100%;
}
```

Initialize the plugin:

```javascript
$('#elem').iosParallax({
  // How fast the background moves
  movementFactor: 50,
  // How much to dampen the movement (higher is slower)
  dampenFactor: 36
});
```

## Demos

* [Full-page background example](https://noobcola.github.io/ios-parallax-effect/demos/fullpage/)
* [Fake iPhone 6 parallax moving background](https://noobcola.github.io/ios-parallax-effect/demos/iphone/)

## Installation

```
npm install ios-parallax
```

## Browser Compatibility

No formal testing done yet. Works on modern browsers such as Chrome and Firefox.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

## Contribute

If you would like to contribute, please read [contributing.md](CONTRIBUTING.md) for more info

## Style

We're using the [Google ES6 Javascript Style Guide](https://google.github.io/styleguide/jsguide.html)

## Notes

* If you're defining the background-image property in a separate css file, make sure the CSS file is loaded before calling `$.iosParallax();`

# TODO

* Determine browser compatibility
