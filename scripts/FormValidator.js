export default class FormValidator {
  constructor(validationConfig, validationFormElement) {
    this._config = validationConfig;
    this._formElement = validationFormElement;

    // form elements
    this._formInputElementsArr = Array.from(this._formElement.querySelectorAll(this._config.inputElement));
    this._formSubmitButtonElement = this._formElement.querySelectorAll(this._config.buttonElement)[0];

    // form elemtnts class for showing errors or deactivating submit button
    // this._inactiveButtonClass = this._config.inactiveButtonClass;
    // this._inputErrorClass = this._config.inputErrorClass;
    // this._errorClass = this._config.errorClass;
  }

  enableValidation() {
    this.toggleButtonState();
    this._setInputListener();
  };

  _setInputListener() {
    this._formInputElementsArr.forEach(iInput => {
      iInput.addEventListener('input', () => {
        this.toggleInputErrorMsg(iInput);
        this.toggleButtonState();
      });
    });
  };


  toggleInputErrorMsg(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    };
  };

  toggleButtonState() {
    if (this._formElement.checkValidity()) {
      this._formSubmitButtonElement.classList.remove(this._config.inactiveButtonClass);
      this._formSubmitButtonElement.removeAttribute('disabled');
    } else {
      this._formSubmitButtonElement.classList.add(this._config.inactiveButtonClass);
      this._formSubmitButtonElement.setAttribute('disabled', true);
    }
  };

  resetValidation() {
    this._formInputElementsArr.forEach(input => {
      this._hideInputError(input)
    })
    this.toggleButtonState()
  }


  _showInputError(inputElement) {
    // errorMsg is a span element with unic class name which mathes inputElement.id + "-error".
    const errorMsg = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorMsg.classList.add(this._config.errorClass);
    errorMsg.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  };
  
  _hideInputError(inputElement) {
    // errorMsg is a span element with unic class name which mathes inputElement.id + "-error".
    const errorMsg = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorMsg.classList.remove(this._config.errorClass);
    errorMsg.textContent = '';
    inputElement.classList.remove(this._config.inputErrorClass);
  };
};
