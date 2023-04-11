import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialPublications } from './dataBaseImitation.js';


// variables related to #popup-edit-profile
const popupEditProfile = document.querySelector('#popup-edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const titleInput = popupEditProfile.querySelector('#profile-title-input');
const subtitleInput = popupEditProfile.querySelector('#profile-subtitle-input');
const editProfileFormElement = document.forms['edit-profile'];
const editProfileSaveButton = editProfileFormElement.elements['profile-save-button'];

// variables related to #popup-new-place
const popupNewPlace = document.querySelector('#popup-new-place');
const addButton = document.querySelector('.profile__add-button');
const pubInputName = popupNewPlace.querySelector('#new-pub-name');
const pubInputLink = popupNewPlace.querySelector('#new-pub-link');
const addNewPlaceFormElement = document.forms['add-new-publication'];
const newPlaceSaveButton = addNewPlaceFormElement.elements['publication-create-button'];

// variables related to #popup-big-image
export const popupZoom = document.querySelector('#popup-big-img');
export const popupZoomImage = popupZoom.querySelector('.popup__image');
export const popupZoomTitle = popupZoom.querySelector('.popup__pub-title');

const popupsArr = Array.from(document.querySelectorAll('.popup'));
const closeButtonsNodes = document.querySelectorAll('.popup__close-button');

export const publicationsNodes = document.querySelector('.publications');
export const publicationTemplate = document.querySelector('#publication-template');

const formsValidatorObj = {
  // example of this obj data struct: {formName: instance of class FormValidator}
  // based on page current forms, keys of this obj after calling funct fillFormsValidatorObj() are following:
  // {
    // add-new-publication: this instance class FormValidator,
    // edit-profile: this instance class FormValidator,
  // }
}

export const validationConfig = {
  formElement: '.popup__form',
  inputElement: '.popup__text-input-form',
  buttonElement: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-input-form_error-shown',
  errorClass: 'popup__input-error_shown'
};

function fillFormsValidatorObj() {
  const formArr = Array.from(document.querySelectorAll(validationConfig.formElement));

  formArr.forEach(iForm  => {
  const iFormValidatorInstance = new FormValidator(validationConfig, iForm);
  formsValidatorObj[iForm.name] = iFormValidatorInstance;
  });
};

function enableAllFormsValidation() {
  for (const formNameKey in formsValidatorObj) {
    formsValidatorObj[formNameKey].enableValidation();
  }
}

function createNewPublication(pubName, pubPhotoLink) {
  return new Card(pubName, pubPhotoLink).getReadyCardInstance();
}

function prependPublicationToPage(publication) {
  publicationsNodes.prepend(publication);
}

function addInitPubsToPage(pubArr) {
  pubArr.forEach(iPublication => {
    const publication = createNewPublication(iPublication.name, iPublication.link);
    prependPublicationToPage(publication);
  });
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupIfEscPressed);
}


export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupIfEscPressed);
}

function closePopupIfEscPressed(event) {
  if (event.key === 'Escape' || event.key === 'Esc')  {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function handleClosePopupByClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  } else if ( event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup__img-close-button') ) {
    closePopup(event.target.closest('.popup'));
  }
}

function setCloseByClickListener() {
  popupsArr.forEach((iPopup) => {
    iPopup.addEventListener('click', handleClosePopupByClick)
  }) 
}

function handleFormSubmitEditProfile(evt) {
  // This funct. closes form and changes profile__title and profile__subtitle with input values.
  evt.preventDefault();
  
  profileTitle.textContent = titleInput.value;
  profileSubtitle.textContent = subtitleInput.value;
  closePopup(popupEditProfile);
}

editProfileFormElement.addEventListener('submit', handleFormSubmitEditProfile);

function handleFormSubmitAddNewPlace(evt) {
    // This funct. closes form and addes new publication (place) with input values.
    evt.preventDefault();

    const newPlace = createNewPublication(pubInputName.value, pubInputLink.value);
    prependPublicationToPage(newPlace);

    closePopup(popupNewPlace);
    addNewPlaceFormElement.reset();

    formsValidatorObj['add-new-publication'].toggleButtonState();
}

addNewPlaceFormElement.addEventListener('submit', handleFormSubmitAddNewPlace);

editButton.addEventListener('click', () => {
  const thisFormInstance = formsValidatorObj['edit-profile'];

  // To insert the modified data into the popup
  titleInput.value = profileTitle.textContent;
  thisFormInstance.toggleInputErrorMsg(titleInput);
  subtitleInput.value = profileSubtitle.textContent;
  thisFormInstance.toggleInputErrorMsg(subtitleInput);

  thisFormInstance.toggleButtonState();

  openPopup(popupEditProfile);
});

addButton.addEventListener('click', () => {
  openPopup(popupNewPlace);
});

addInitPubsToPage(initialPublications);

setCloseByClickListener();

fillFormsValidatorObj();
enableAllFormsValidation();
