import { parseDOM, observeDOM } from './ce-import.js';
export { parseDOM, observeDOM } from './ce-import.js';

export const customElementImport = window.addEventListener("DOMContentLoaded", function () {
  parseDOM();
  observeDOM();
});

export default customElementImport;