class FragmentedFrog extends HTMLElement {
  static get tagName() {
    return "fragmented-frog";
  }

  constructor() {
    super();
    this.innerHTML = `<h2>Fragmented Frog</h2>`;
  }
}

customElements.define(FragmentedFrog.tagName, FragmentedFrog);
