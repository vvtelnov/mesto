// This is a array of cards that appears on the page when first opened or reloaded.
const initialPublication = [
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
const editProfileFormElement = popupEditProfile.querySelector('form');

// variables related to #popup-new-place
const popupNewPlace = document.querySelector('#popup-new-place');
const addButton = document.querySelector('.profile__add-button');
const pubInputName = popupNewPlace.querySelector('#new-pub-name');
const pubInputLink = popupNewPlace.querySelector('#new-pub-link');
const addNewPlaceFormElement = popupNewPlace.querySelector('form');

// variables related to #popup-big-image
const popuBigImage = document.querySelector('#popup-big-image');


const closeButtonsNodes = document.querySelectorAll('.popup__close-button');
// console.log(closeButtonsArr);


const publicationsNodes = document.querySelector('.publications');
// console.log(publicationsNodes);
const publicationTemplate = document.querySelector('#publication-template');


function prependImageToPage (imgName, imgLink) {
  const publication = copyTemplateContent(publicationTemplate);
  imgName = String(imgName);
  imgLink = String(imgLink);

  publication.querySelector('.publication__photo').src = imgLink;
  publication.querySelector('.publication__title').textContent = imgName;

  publication.querySelector('.publication__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('publication__like-button_active');
  })

  publicationsNodes.prepend(publication);
}

function addInitPubsToPage (pubArr) {
  pubArr.forEach(iPublication => {
    prependImageToPage(iPublication.name, iPublication.link);
  });
}

function copyTemplateContent(template) {
  return template.content.cloneNode(true);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openEditProfilePopup() {
  popupEditProfile.classList.add('popup_opened');
  titleInput.value = profileTitle.textContent;
  subtitleInput.value = profileSubtitle.textContent;
}

function openNewPlacePopup() {
  popupNewPlace.classList.add('popup_opened');
  pubInputName.value = '';
  pubInputLink.value = '';
}

function handleFormSubmitEditProfile(evt) {
  // This funct. closes form and changes profile__title and profile__subtitle with input values.
  const thisPopup = evt.target.parentElement.parentElement;
  evt.preventDefault();
  
  profileTitle.textContent = titleInput.value;
  profileSubtitle.textContent = subtitleInput.value;
  closePopup(thisPopup);
}

function handleFormSubmitAddNewPlace(evt) {
    // This funct. closes form and addes new publication (place) with input values.
    const thisPopup = evt.target.parentElement.parentElement;
    evt.preventDefault();

    prependImageToPage(pubInputName.value, pubInputLink.value);
    closePopup(thisPopup);
}



editButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', openNewPlacePopup); 

// closeButton is a Nodes collection, so this EventListener applies to every close button (X) on the page.
closeButtonsNodes.forEach(iCloseButton => {
  iCloseButton.addEventListener('click', evt => {
    const thisPopup = evt.target.parentElement.parentElement.parentElement;
    closePopup(thisPopup);
  });
});

editProfileFormElement.addEventListener('submit', handleFormSubmitEditProfile);
addNewPlaceFormElement.addEventListener('submit', handleFormSubmitAddNewPlace);


addInitPubsToPage(initialPublication);


