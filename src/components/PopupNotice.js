import Popup from './Popup.js';

export default class PopupNotice extends Popup {
  constructor(popupSelector, formSubmitHandler, formBtnMessageOnSubmit) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('form');
    this._submitBtn = this._form.querySelector('.popup__save-button');
    this._defaultSubmitBtnText = this._submitBtn.textContent;
    this._submitBtnText = formBtnMessageOnSubmit;
  }

  open(object) {
    super.open();
    this._confirmDeleteItemData = object;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      this._changeSubmitBtnMessage(this._submitBtnText)
      evt.preventDefault();
      this._formSubmitHandler(this._confirmDeleteItemData);
    });
  }

  _changeSubmitBtnMessage(newMsg) {
    this._submitBtn.textContent = newMsg;
  }

  setSubmitBtnMessageToDefaultValue() {
    this._changeSubmitBtnMessage(this._defaultSubmitBtnText);
  }
}