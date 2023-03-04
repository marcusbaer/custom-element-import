// ce-import="false | true | auto"

window.addEventListener("DOMContentLoaded", function customElementImport () {

  parseDOM();
  observeDOM();

  function importCustomElement (component) {
    if (!component) {
      return
    }
    if (!customElements.get(component.localName)) {
      console.log("load", component.localName);
      import(`./components/${component.localName}.js`);
    } else {
      console.log("already loaded", component.localName);
    }
  }
  
  function observeElement (component) {
    const importType = component.getAttribute("ce-import") || "auto";
    if (importType === "true") {
    } else if (importType === "auto") {
      const observer = new IntersectionObserver(
        (entries) => {
          const anyIsIntersecting = entries.some(
            (entry) => entry.isIntersecting
          );
          if (anyIsIntersecting && observer) {
            observer.unobserve(component);
            importCustomElement(component);
          }
        },
        { root: null, rootMargin: "100px", threshold: [0] }
      );
      observer.observe(component);
    }
  }
  
  function parseDOM () {
    const components = document.querySelectorAll(":not(:defined)");
    Array.from(components).forEach((component) => { observeElement(component); });
  }
  
  function observeDOM () {
    const config = { attributes: false, childList: true, subtree: true };
    const callback = (mutationList, observer) => {
      mutationList.filter((mutation) => {
        Array.from(mutation.addedNodes).forEach((component) => {
          if (component.localName && component.localName.indexOf('-')>=0) {
            const importType = component.getAttribute("ce-import") || "auto";
            if (importType === "true") {
              importCustomElement(component);
            } else if (importType === "auto") {
              observeElement(component);
            }
          }
        });
      });
    };
    const observer = new MutationObserver(callback);
    observer.observe(document.body, config);
  }
});