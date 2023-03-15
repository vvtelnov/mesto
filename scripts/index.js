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
const popupZoom = document.querySelector('#popup-big-img');
const popupZoomImage = popupZoom.querySelector('.popup__image');
const popupZoomTitle = popupZoom.querySelector('.popup__pub-title');


const closeButtonsNodes = document.querySelectorAll('.popup__close-button');

const publicationsNodes = document.querySelector('.publications');
const publicationTemplate = document.querySelector('#publication-template');


function prependImageToPage(pubName, pubPhotoLink) {
  const publication = createCard(pubName, pubPhotoLink)
  publicationsNodes.prepend(publication);
}

function createCard(imgName, imgLink) { // (returns cardElement)
  const cardElement = copyTemplateContent(publicationTemplate);
  const cardPhoto = cardElement.querySelector('.publication__photo');
  imgName = String(imgName);
  imgLink = String(imgLink);

  cardPhoto.src = imgLink;
  cardPhoto.alt = imgName;
  cardElement.querySelector('.publication__title').textContent = imgName;

  cardElement.querySelector('.publication__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('publication__like-button_active');
  });

  cardElement.querySelector('.publication__delete-button').addEventListener('click', evt => {
    evt.target.closest('.publication').remove();
  });
  
  cardPhoto.addEventListener('click', () => {
    openPopup(popupZoom);
    popupZoomImage.src = imgLink;
    popupZoomImage.alt = imgName;
    popupZoomTitle.textContent = imgName;
  });
  
  return cardElement;
}

function addInitPubsToPage(pubArr) {
  pubArr.forEach(iPublication => {
    prependImageToPage(iPublication.name, iPublication.link);
  });
}

function copyTemplateContent(template) { // (returns templateCopy)
  return template.content.cloneNode(true);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmitEditProfile(evt) {
  // This funct. closes form and changes profile__title and profile__subtitle with input values.
  evt.preventDefault();
  
  profileTitle.textContent = titleInput.value;
  profileSubtitle.textContent = subtitleInput.value;
  closePopup(popupEditProfile);
}

function handleFormSubmitAddNewPlace(evt) {
    // This funct. closes form and addes new publication (place) with input values.
    evt.preventDefault();

    prependImageToPage(pubInputName.value, pubInputLink.value);
    closePopup(popupNewPlace);
    addNewPlaceFormElement.reset();
}

function isFormValid(form) { // (returns boolean)
  // We use querySelector because names are unique for every input element so we can't use form.elements
  const arr = Array.from(form.querySelectorAll('.popup__text-input-form'));

  return arr.every(iFormInput => {
    // console.log(`${iFormInput.name}: ${iFormInput.validity.valid}`)
    // console.log(iFormInput.validity)
    // console.log('____________')
    return isFormInputValid(iFormInput) 
  })
}

function isFormInputValid(formInput) { // (returns boolean)
  return formInput.validity.valid
}

function validateForm(form) {
  if (isFormValid(form)) {
    enableSubmit(form);
  } else {
    disableSubmit(form);
  };
};

function validateInput(form, formInput) {
  if (isFormInputValid(formInput)) {
    hideInputError(form, formInput);
  } else {
    showInputError(form, formInput);
  };
};

function showInputError(form, inputElement) {
  // errorMsg is a span element with unic class name which mathes inputElement.id + "-error".
  const errorMsg = form.querySelector(`.${inputElement.id}-error`);
  errorMsg.classList.add('popup__input-error_shown');
  errorMsg.textContent = inputElement.validationMessage;
  inputElement.classList.add('popup__text-input-form_error-shown');
}

function hideInputError(form, inputElement) {
  // errorMsg is a span element with unic class name which mathes inputElement.id + "-error".
  const errorMsg = form.querySelector(`.${inputElement.id}-error`);
  errorMsg.classList.remove('popup__input-error_shown');
  errorMsg.textContent = '';
  inputElement.classList.remove('popup__text-input-form_error-shown');
}

function enableSubmit(form) {
  if (form.name === 'edit-profile') {
    editProfileSaveButton.classList.remove('popup__save-button_disabled');
    editProfileSaveButton.removeAttribute('disabled', true);
    editProfileFormElement.addEventListener('submit', handleFormSubmitEditProfile);
  } else if (form.name === 'add-new-publication') {
    newPlaceSaveButton.classList.remove('popup__save-button_disabled');
    newPlaceSaveButton.removeAttribute('disabled', true);
    addNewPlaceFormElement.addEventListener('submit', handleFormSubmitAddNewPlace);
  }
}

function disableSubmit(form) {
  if (form.name === 'edit-profile') {
    editProfileSaveButton.classList.add('popup__save-button_disabled');
    editProfileSaveButton.setAttribute('disabled', true);
    editProfileFormElement.removeEventListener('submit', handleFormSubmitEditProfile);
  } else if (form.name === 'add-new-publication') {
    newPlaceSaveButton.classList.add('popup__save-button_disabled');
    newPlaceSaveButton.setAttribute('disabled', true);
    addNewPlaceFormElement.removeEventListener('submit', handleFormSubmitAddNewPlace);
  }
}


editButton.addEventListener('click', () => {
  // To insert the modified data into the popup
  titleInput.value = profileTitle.textContent;
  subtitleInput.value = profileSubtitle.textContent;
  validateForm(editProfileFormElement);
  openPopup(popupEditProfile);
});

addButton.addEventListener('click', () => {
  validateForm(addNewPlaceFormElement);
  openPopup(popupNewPlace);
}); 

// closeButton is a Nodes collection, so this EventListener applies to every close button (X) on the page.
closeButtonsNodes.forEach(iCloseButton => {
  const closestPopup = iCloseButton.closest('.popup');
  iCloseButton.addEventListener('click', () => {
    closePopup(closestPopup);
  });
});

// TODO: вынести в глобольную переменную 
Array.from(document.forms).forEach(iForm => {
  iForm.addEventListener('input', evt => {
    const currForm = evt.currentTarget;
    const currInputField = evt.target;

    validateForm(currForm);
    validateInput(currForm, currInputField);
  });
});


addInitPubsToPage(initialPublications);


