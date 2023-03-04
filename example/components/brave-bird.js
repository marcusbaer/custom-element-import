class BraveBird extends HTMLElement {
  static get tagName() {
    return "brave-bird";
  }

  static get observedAttributes() {
    return ["moved", "name"];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = `
        <style>
          :host { border: 1px solid gray; display: inline-block; color: blue; font-style: var(--font-style, inherit); }
          p { margin: 0; padding: 1rem; }
          ::slotted(div), ::slotted(h1), ::slotted(h2), ::slotted(h3), ::slotted(h4), ::slotted(p) { padding: 0 1rem; }
        </style>
        <p part="message">I am <strong>brave enough</strong> to fly that mountain</p>
      `;

    const name = this.getAttribute("name");
    this.closingNode = document.createTextNode(name ? `, ${name}.` : ".");
    this.shadow.querySelector("p").appendChild(this.closingNode);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "name") {
      this.closingNode.textContent = newVal ? `, ${newVal}.` : ".";
    } else {
      this.dispatchEvent(new CustomEvent("mountain-climbed"));
    }
  }

  get name() {
    return this.getAttribute("name");
  }

  set name(name) {
    this.setAttribute("name", name);
  }
}

customElements.define(BraveBird.tagName, BraveBird);
