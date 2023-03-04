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


const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const titleInput = popup.querySelector('#profile-title-input');
const subtitleInput = popup.querySelector('#profile-subtitle-input');
const formElement = popup.querySelector('form');

const publicationsNodes = document.querySelector('.publications');
// console.log(publicationsNodes);
const publicationTemplate = document.querySelector('#publication-template');


function prependImageToPage (imgName, imgLink) {
  const publication = copyTemplateContent(publicationTemplate);
  imgName = String(imgName);
  imgLink = String(imgLink);

  publication.querySelector('.publication__photo').src = imgLink;
  publication.querySelector('.publication__title').textContent = imgName;

  publicationsNodes.prepend(publication);
}

function addInitPubToPage (pubArr) {
  pubArr.forEach(iPublication => {
    prependImageToPage(iPublication.name, iPublication.link);
  });
}

function copyTemplateContent(template) {
  return template.content.cloneNode(true);
}


function closePopup() {
  popup.classList.remove('popup_opened');
}


function openPopup() {
  popup.classList.add('popup_opened');
  titleInput.value = profileTitle.textContent;
  subtitleInput.value = profileSubtitle.textContent;
}


function handleFormSubmit(evt) {
  // This funct. closes form and changes profile__title and profile__subtitle with input values.
  evt.preventDefault();
  
  profileTitle.textContent = titleInput.value;
  profileSubtitle.textContent = subtitleInput.value;
  
  closePopup();
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

addInitPubToPage(initialPublication);

