import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('form');
    this._formInputsArr = this._getAllFormInputs();
  }

  _getAllFormInputs() {
    return Array.from(this._form.elements).reduce((inputsArr, iForm) => {
      if (iForm.nodeName === 'INPUT') {
        inputsArr.push(iForm);
      }
      return inputsArr;
    }, []);
  }

  _getInputValues() {
    return this._formInputsArr.reduce((inputsObj, iInput) => {
      inputsObj[iInput.id] = iInput.value;
      return inputsObj;
    }, {})
  }

  _setInputValues(inputsObj) {
    Object.keys(inputsObj).forEach(iKey => {
      const formInput = this._formInputsArr.find(iInput => iInput.id === iKey);
      if (formInput) {
        formInput.value = inputsObj[iKey];
      }
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      const inputValuesObj = this._getInputValues();
      this._closeWithFormReset();
      this._formSubmitHandler(inputValuesObj);
    });
  }

  _closeWithFormReset() {
    this.close();
    this._form.reset();
  }

  openWithSpecifiedFormParam(paramObj) {
    this._setInputValues(paramObj);
    this.open();
  }
}