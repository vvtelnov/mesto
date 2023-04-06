import { validationConfig as config } from './index.js'
import { FormValidator } from './FormValidator.js'



export function enableValidation(config) {
  const formArr = Array.from(document.querySelectorAll(config.formElement));
  formArr.forEach(iForm => {
    setInputListeners(iForm, config);
    iForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  });
}

function setInputListeners(form, config) {
  const inputArr = Array.from(form.querySelectorAll(config.inputElement));
  const submitButtonElem = form.querySelector(config.buttonElement);

  toggleButtonState(submitButtonElem, form.checkValidity(), config);

  inputArr.forEach(iInput => {
    iInput.addEventListener('input', () => {
      toggleInputErrorMsg(form, iInput, config);
      toggleButtonState(submitButtonElem, form.checkValidity(), config);
    })
  });
}

function toggleInputErrorMsg(form, inputElement, config) {
  if (inputElement.validity.valid) {
    hideInputError(form, inputElement, config);
  } else {
    showInputError(form, inputElement, config);
  };
};

function toggleButtonState(button, isFormValid, config) {
  if (isFormValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', true);

  }
};

function showInputError(form, inputElement, config) {
  // errorMsg is a span element with unic class name which mathes inputElement.id + "-error".
  const errorMsg = form.querySelector(`.${inputElement.id}-error`);
  errorMsg.classList.add(config.errorClass);
  errorMsg.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

function hideInputError(form, inputElement, config) {
  // errorMsg is a span element with unic class name which mathes inputElement.id + "-error".
  const errorMsg = form.querySelector(`.${inputElement.id}-error`);
  errorMsg.classList.remove(config.errorClass);
  errorMsg.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
}


