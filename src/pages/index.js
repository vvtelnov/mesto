import './index.css';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import UserInfo from '../components/UserInfo';
import FormValidator from '../components/FormValidator.js';
import { initialPublications, initialUsersInfo } from '../utils/dataBaseImitation.js';
import { getInitialPublications, getInitialUsersInfo } from '../utils/requestFromDB.js';
import bringGetUserInfoReturnToIdFormat from '../utils/GetObjectWithUserData';


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

function handleFormSubmitEditProfile({ 'profile-title-input': name, 'profile-subtitle-input': profession }) {
  // Destructuring object with ALL #popup-edit-profile form's inputs
  // This funct. changes profile__title and profile__subtitle with input values.
  userInfoInst.setUserInfo(name, profession);
}

function handleFormSubmitAddNewPlace({ 'new-pub-name': name, 'new-pub-link': link }) {
  // Destructuring object with ALL #popup-new-place form's inputs
  // This funct. addes new publication (place) with input values.
  publicationSection.prependItemToPage({
    'name': name,
    'link': link
  });
  formsValidatorObj['add-new-publication'].toggleButtonState();
}

function handleCardClick(imgName, imgLink) {
  popupWithImageInst.open(imgName, imgLink)
}


fillFormsValidatorObj();
enableAllFormsValidation();

// getInitialUsersInfo() is a function wich imitates process of getting user info from DB
const userInfoInst = new UserInfo(getInitialUsersInfo());

const popupEditProfileInst = new PopupWithForm('#popup-edit-profile', handleFormSubmitEditProfile);
const popupNewPlaceInst = new PopupWithForm('#popup-new-place', handleFormSubmitAddNewPlace);
const popupWithImageInst = new PopupWithImage('#popup-big-img', '.popup__image', '.popup__pub-title');

// enableOpeningPopups
editButton.addEventListener('click', () => popupEditProfileInst.openWithSpecifiedFormParam(
  bringGetUserInfoReturnToIdFormat(userInfoInst.getUserInfo())
));
addButton.addEventListener('click', () => popupNewPlaceInst.open());
// setting eventListeners (closing by click and form submit)
popupEditProfileInst.setEventListeners();
popupNewPlaceInst.setEventListeners();
popupWithImageInst.setEventListeners();


const publicationSection = new Section({
  items: initialPublications,
  renderer: item => {
    return new Card(item.name, item.link, '#publication-template', handleCardClick).getReadyCardInstance();
  }
},
'.publications');

publicationSection.prependInitItemsToPage();

