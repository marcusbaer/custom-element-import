class DirtyDog extends HTMLElement {
  static get tagName() {
    return "dirty-dog";
  }

  constructor() {
    super();
    this.innerHTML = `<h2>Dirty Dog</h2><eloquent-elephant></eloquent-elephant><fragmented-frog @interact>Click to load the frog</fragmented-frog>`;
  }
}

customElements.define(DirtyDog.tagName, DirtyDog);
