import { parseDOM, observeDOM } from "./ce-import.js";
export { parseDOM, observeDOM } from "./ce-import.js";

export const customElementImport = function (options) {
  window.addEventListener("DOMContentLoaded", function () {
    parseDOM(options);
    observeDOM(options);
  });
};

export default customElementImport;
