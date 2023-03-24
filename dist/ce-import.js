// ce-import="false | true | auto"

window.addEventListener("DOMContentLoaded", function customElementImport() {
  parseDOM();
  observeDOM();

  function getDirByUrl() {
    let locator = location.href.replace(/(.*)\/(.*)$/, "$1") + "/";
    return locator + "components";
  }

  function importCustomElement(component, options) {
    if (!component) {
      return;
    }
    const dir = options && options.dir ? options.dir : getDirByUrl();
    if (!customElements.get(component.localName)) {
      console.log(
        `load ${component.localName} from ${dir}/${component.localName}.js`
      );
      import(`${dir}/${component.localName}.js`);
    } else {
      console.log("already loaded", component.localName);
    }
  }

  function observeElement(component, options) {
    const importType = component.getAttribute("ce-import") || "auto";
    if (importType === "true") {
      importCustomElement(component, options);
    } else if (importType === "auto") {
      const observer = new IntersectionObserver(
        (entries) => {
          const anyIsIntersecting = entries.some(
            (entry) => entry.isIntersecting
          );
          if (anyIsIntersecting && observer) {
            observer.unobserve(component);
            importCustomElement(component, options);
          }
        },
        { root: null, rootMargin: "100px", threshold: [0] }
      );
      observer.observe(component);
    }
  }

  function registerElement(component, options) {
    if (
      component &&
      component.localName &&
      component.localName.indexOf("-") >= 0
    ) {
      const importType = component.getAttribute("ce-import") || "auto";
      if (importType === "true") {
        importCustomElement(component, options);
      } else if (importType === "auto") {
        observeElement(component, options);
      }
    }
    Array.from(component.childNodes).forEach((component) => {
      registerElement(component, options);
    });
  }

  function parseDOM(options) {
    // render custom elements, that are already in DOM
    const components = document.querySelectorAll(":not(:defined)");
    Array.from(components).forEach((component) => {
      observeElement(component, options);
    });
  }

  function observeDOM(options) {
    // observe dynamically added webcomponents
    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList) => {
      mutationList.filter((mutation) => {
        Array.from(mutation.addedNodes).forEach((component) => {
          registerElement(component, options);
        });
      });
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(document.body, config);
  }
});
