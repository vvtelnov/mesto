export default class Section {
  constructor({ items, renderer }, containerSelector) {
    console.log('section created!')
    this._initItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  appendInitItemsToPage() {
    this._container.innerHTML = '';

    this._initItems.forEach( item => {
      this.appendItemToPage(item);
    })
  }

  prependInitItemsToPage() {
    this._container.innerHTML = '';

    this._initItems.forEach( item => {
      this.prependItemToPage(item);
    })
  }

  appendItemToPage(item) {
    this._container.append(this._renderer(item));
  }

  prependItemToPage(item) {
    this._container.prepend(this._renderer(item));
  }
}