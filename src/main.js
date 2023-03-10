import { parseDOM, observeDOM } from "./ce-import.js";
export { parseDOM, observeDOM } from "./ce-import.js";

export const customElementImport = function ({ dir } = { dir: "./components" }) {
  window.addEventListener("DOMContentLoaded", function () {
    parseDOM({ dir });
    observeDOM({ dir });
  });
};

export default customElementImport;
