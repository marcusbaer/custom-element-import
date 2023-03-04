# Custom Element Import

Imports (native) web components, based on custom elements only, when scrolled into view. This way, only scripts are loaded that are really needed, which saves data to be transferred and improves performance.

## Usage

1. Load script from `dist/ce-import.js` or minified from `dist/ce-import.min.js` in your document header.
2. To optimize your performance, also consider to setup the content of the minified version into an inline `script` element.
3. Provide every web component by a separate file in `components/[custom-element].js`.
4. Web component file also has to define the custom element by using `customElements.define`.
5. Put your custom element into your code.

Custom elements can be set up in your original source code or be added dynamically. Loading of a custom element, placed inside of another web component will only be working if it is using light DOM, elements inside of shadow DOM won't.

## Loading

Custom elements can have a specific attribute `ce-import` to define its loading behaviour, by setting one of these values:

- `auto` (default) to request web component, when it will be scrolled into view.
- `true` to force the request immediately.
- `false` to not request a JS resource, which might make sense for web components using declarative shadow DOM.

## Minification

Uses this uglifier to create the minified version: https://skalman.github.io/UglifyJS-online/