# Custom Element Import

Imports (native) web components, based on custom elements only, when scrolled into view. This way, only scripts are loaded that are really needed, which saves data to be transferred and improves performance.

Custom elements can be set up in your original source code or be added dynamically. Loading of a custom element, placed inside of another web component will only be working if it is using light DOM, elements inside of shadow DOM won't.

## Setup your Web Components

Place your (first) web component in a public directory `components` or pick a different name if you want:

1. Create a JS file, having the custom element tag as its name, e.g. `blendy-bird.js`
2. Create inside of that file the class for your web component, e.g. `BlendyBird`
3. Add to that file as well the `customElements.define` instruction to register your class as custom element with the same name as used for the file name, e.g. `blendy-bird`

In a very basic version, your `blendy-bird.js` could look like this:

```js
class BlendyBird extends HTMLElement {
  static get tagName() {
    return "blendy-bird";
  }
  constructor() {
    super();

    this.shadow = this.attachShadow({mode: "open"});
    this.shadow.innerHTML = `<h3>Blendy Bird</h3>`;
  }
}

customElements.define(BlendyBird.tagName, BlendyBird);
```

Now you are ready to setup the rendering.

## Usage with a Bundler

Install as dependency fist:

```
npm install --save custom-element-import
```

Import `custom-element-import` and call it to start the rendering with web components in a default directory `./components` relative to the calling JS file:

```
import customElementImport from 'custom-element-import';

customElementImport();
```

To specify another directory where your web components have been placed, provide a config with a param `dir`:

```
import { customElementImport } from 'custom-element-import';

customElementImport({ dir: "../components" });
```

It's also possible to render present DOM only as it is on runtime by calling `parseDOM`.

Calling `observeDOM` starts a watcher to observe DOM changes to render web components being added to the DOM dynamically. Added components won't be loaded until they are in the viewport.

As with `customElementImport` use an option configuration to specify a non default folder for your web components.

```
import { parseDOM, observeDOM } from 'custom-element-import';

document.addEventListener('DOMContentLoaded', () => {
    // renders custom elements in DOM at runtime
    parseDOM({ dir: "../components" });

    // watches for DOM changes
    observeDOM({ dir: "../components" });
});
```

## Usage without Bundler

It's possible to use a copy of the script from `dist` folder in your project. Make sure to place your web components in a directory called `components`.

Load script from `dist/ce-import.js` or a minified version from `dist/ce-import.min.js` in your document header. To optimize your performance, also consider to setup the content of the minified version into an inline `script` element.

Don't forget to provide every web component by a separate file in `components/[custom-element].js` as described above.

At least put your custom element into your HTML.

## Optional configuration of loading

Custom elements can have a specific attribute `ce-import` to define its loading behaviour, by setting one of these values:

- `auto` (default) to request web component, when it will be scrolled into view.
- `true` to force the request immediately.
- `false` to not request a JS resource, which might make sense for web components using declarative shadow DOM.

```
<blendy-bird ce-import="true"></blendy-bird>
```

## Minification

The minified dist version of `custom-element-import` uses this uglifier: https://skalman.github.io/UglifyJS-online/