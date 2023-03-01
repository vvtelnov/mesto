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


const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const titleInput = popup.querySelector('#profile-title-input');
const subtitleInput = popup.querySelector('#profile-subtitle-input');
const formElement = popup.querySelector('form');

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
