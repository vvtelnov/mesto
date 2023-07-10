import Popup from './Popup.js';

export default class PopupNotice extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('form');
  }

  open(object) {
    super.open();
    this._confirmDeleteCardData = object;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this.close();
      this._formSubmitHandler(this._confirmDeleteCardData);
    });
  }
}