import { parseDOM, observeDOM } from './ce-import.js';

// to be included into a page directly, uglified and minified to save 57% using https://skalman.github.io/UglifyJS-online/
window.addEventListener("DOMContentLoaded", function customElementImport () {
  parseDOM();
  observeDOM();
});
