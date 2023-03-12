// ce-import="false | true | auto"

window.addEventListener("DOMContentLoaded", function customElementImport() {
  parseDOM();
  observeDOM();

  function importCustomElement(component, { dir }) {
    if (!component) {
      return;
    }
    if (!customElements.get(component.localName)) {
      console.log("load", component.localName);
      import(`${dir}/${component.localName}.js`);
    } else {
      console.log("already loaded", component.localName);
    }
  }

  function observeElement(component, { dir }) {
    const importType = component.getAttribute("ce-import") || "auto";
    if (importType === "true") {
      importCustomElement(component, { dir });
    } else if (importType === "auto") {
      const observer = new IntersectionObserver(
        (entries) => {
          const anyIsIntersecting = entries.some(
            (entry) => entry.isIntersecting
          );
          if (anyIsIntersecting && observer) {
            observer.unobserve(component);
            importCustomElement(component, { dir });
          }
        },
        { root: null, rootMargin: "100px", threshold: [0] }
      );
      observer.observe(component);
    }
  }

  function parseDOM({ dir } = { dir: "./components" }) {
    // render custom elements, that are already in DOM
    const components = document.querySelectorAll(":not(:defined)");
    Array.from(components).forEach((component) => {
      observeElement(component, { dir });
    });
  }

  function observeDOM({ dir } = { dir: "./components" }) {
    // observe dynamically added webcomponents
    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      mutationList.filter((mutation) => {
        Array.from(mutation.addedNodes).forEach((component) => {
          if (
            component &&
            component.localName &&
            component.localName.indexOf("-") >= 0
          ) {
            const importType = component.getAttribute("ce-import") || "auto";
            if (importType === "true") {
              importCustomElement(component, { dir });
            } else if (importType === "auto") {
              observeElement(component, { dir });
            }
          }
        });
      });
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(document.body, config);
  }
});
