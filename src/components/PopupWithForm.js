import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler, formBtnMessageOnSubmit) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('form');
    this._inputsList = Array.from(this._form.querySelectorAll('.popup__text-input-form'));
    this._submitBtn = this._form.querySelector('.popup__save-button');
    this._defaultSubmitBtnText = this._submitBtn.textContent;
    this._submitBtnText = formBtnMessageOnSubmit;
  }

  _getInputValues() {
    return this._inputsList.reduce((inputsValues, iInput) => {
      inputsValues[iInput.id] = iInput.value;
      return inputsValues;
    }, {})
  }

  _setInputValues(inputsValues) {
    Object.keys(inputsValues).forEach(iKey => {
      const formInput = this._inputsList.find(iInput => iInput.id === iKey);
      if (formInput) {
        formInput.value = inputsValues[iKey];
      }
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      this._changeSubmitBtnMessage(this._submitBtnText);
      evt.preventDefault();
      const inputValuesObj = this._getInputValues();
      this._formSubmitHandler(inputValuesObj);
    });
  }

  closeWithFormReset() {
    this.close();
    this._form.reset();
  }

  openWithSpecifiedFormParam(param) {
    if (param) {
      this._setInputValues(param);
      this.open();
    }
  }

  _changeSubmitBtnMessage(newMsg) {
    this._submitBtn.textContent = newMsg;
  }

  setSubmitBtnMessageToDefaultValue() {
    this._changeSubmitBtnMessage(this._defaultSubmitBtnText);
  }
}