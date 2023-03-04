// ce-import="false | true | auto"

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
        // console.log("entries: ", entries);
        const anyIsIntersecting = entries.some(
          (entry) => entry.isIntersecting
        );
        if (anyIsIntersecting && observer) {
          // console.log(component.localName, customElements.get(component.localName));
          /*customElements.whenDefined(component.localName).then(() => { observer.unobserve(component); });*/
          observer.unobserve(component);
          importCustomElement(component);
        }
      },
      { root: null, rootMargin: "100px", threshold: [0] }
    );
    observer.observe(component);
  }
}

export function parseDOM () {
  // render custom elements, that are already in DOM
  const components = document.querySelectorAll(":not(:defined)");
  console.log(components);
  Array.from(components).forEach((component) => { observeElement(component); });
}

export function observeDOM () {
  // observe dynamically added webcomponents
  // Options for the observer (which mutations to observe)
  const config = { attributes: false, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = (mutationList, observer) => {
    // console.log(mutationList);
    mutationList.filter((mutation) => {
      Array.from(mutation.addedNodes).forEach((component) => {
        if (component.localName.indexOf('-')>=0) {
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
  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);
  // Start observing the target node for configured mutations
  observer.observe(document.body, config);
}

export const attachShadowRoots = (function (root) {
  // https://developer.chrome.com/articles/declarative-shadow-dom/#polyfill
  root.querySelectorAll("template[shadowrootmode]").forEach((template) => {
      const mode = template.getAttribute("shadowrootmode");
      const shadowRoot = template.parentNode.attachShadow({ mode });
      shadowRoot.appendChild(template.content);
      template.remove();
      attachShadowRoots(shadowRoot);
    });
})(document);