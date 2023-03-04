class CuriousChamelion extends HTMLElement {
  static get tagName() {
    return "curious-chamelion";
  }

  static get observedAttributes() {
    return ["name"];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = `
      <h2>Chamelion</h2>
      <slot></slot>
      <p>We have seen a chamelion.</p>
      <style>
          :host { font-style: italic; }
          h2 { color: red; cursor: pointer; }
      </style>
    `;

    const name = this.getAttribute("name");
    this.closingNode = document.createTextNode(name ? ` Yes, ${name}!` : "");
    this.shadow.querySelector("p").appendChild(this.closingNode);
    this.headlineNode = this.shadow.querySelector('h2');
    this.headlineNode.addEventListener('click', this.alertConfirmation.bind(this))
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "name") {
      this.closingNode.textContent = newVal ? ` Yes, ${newVal}!` : "";
    }
  }

  get name() {
    return this.getAttribute("name");
  }

  set name(name) {
    this.setAttribute("name", name);
  }

  alertConfirmation() {
    const name = this.getAttribute("name");
    alert(name ? ` Yes, ${name}!` : "Yes!");
  }
}

customElements.define(CuriousChamelion.tagName, CuriousChamelion);
