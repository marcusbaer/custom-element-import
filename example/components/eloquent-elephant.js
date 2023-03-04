class EloquentElephant extends HTMLElement {
  static get tagName() {
    return "eloquent-elephant";
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = `
      <h2>Eloquent Elephant</h2>
    `;
  }
}

customElements.define(EloquentElephant.tagName, EloquentElephant);
