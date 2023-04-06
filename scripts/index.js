import Card from './Card.js';
import FormValidator from './FormValidator.js';


// This is a array of cards that appears on the page when first opened or reloaded.
const initialPublications = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

const closeButtonsNodes = document.querySelectorAll('.popup__close-button');

export const publicationsNodes = document.querySelector('.publications');
export const publicationTemplate = document.querySelector('#publication-template');

const formsObj = {
  // example of this obj data struct: {formName: instance of class FormValidator}
  // based on page current forms, keys of this obj after calling funct fillFormsObj() are following:
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

function fillFormsObj() {
  const formArr = Array.from(document.querySelectorAll(validationConfig.formElement));

  formArr.forEach(iForm  => {
  const formInstance = new FormValidator(validationConfig, iForm);
  formsObj[iForm.name] = formInstance;
  });
};

function enableAllFormsValidation() {
  for (const formNameKey in formsObj) {
    formsObj[formNameKey].enableValidation();
  }
}

function prependImageToPage(pubName, pubPhotoLink) {
  const publication = new Card(pubName, pubPhotoLink);
  publicationsNodes.prepend(publication.getReadyCardInstance());
}

function addInitPubsToPage(pubArr) {
  pubArr.forEach(iPublication => {
    prependImageToPage(iPublication.name, iPublication.link);
  });
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupIfEscPressed);
  popup.addEventListener('click', closePopupIfOutsidePopupClicked);
}


export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupIfEscPressed);
  popup.removeEventListener('click', closePopupIfOutsidePopupClicked);
}

function closePopupIfEscPressed(event) {
  if (event.key === 'Escape' || event.key === 'Esc')  {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function closePopupIfOutsidePopupClicked(event) {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
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

    prependImageToPage(pubInputName.value, pubInputLink.value);
    closePopup(popupNewPlace);
    addNewPlaceFormElement.reset();

    formsObj['add-new-publication'].toggleButtonState();
}

addNewPlaceFormElement.addEventListener('submit', handleFormSubmitAddNewPlace);

editButton.addEventListener('click', () => {
  const thisFormInstance = formsObj['edit-profile'];

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


// closeButton is a Nodes collection, so this EventListener applies to every close button (X) on the page.
closeButtonsNodes.forEach(iCloseButton => {
  const closestPopup = iCloseButton.closest('.popup');
  iCloseButton.addEventListener('click', () => {
    closePopup(closestPopup);
  });
});


addInitPubsToPage(initialPublications);

fillFormsObj();
enableAllFormsValidation();
