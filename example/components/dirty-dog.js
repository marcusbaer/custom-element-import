class DirtyDog extends HTMLElement {
  static get tagName() {
    return "dirty-dog";
  }

  constructor() {
    super();
    this.innerHTML = `<h2>Dirty Dog</h2><eloquent-elephant></eloquent-elephant>`;
  }
}

customElements.define(DirtyDog.tagName, DirtyDog);
