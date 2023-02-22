function changePopupStatus () {
  popup.classList.toggle('popup_opened');
  popup.classList.toggle('popup_closed');
}


function handleFormSubmit(evt) {
  evt.preventDefault();
  
  document.querySelector(".profile__title").textContent = titleInput.value;
  document.querySelector(".profile__subtitle").textContent = subtitleInput.value;
  
  changePopupStatus();
}


let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");

editButton.addEventListener('click', changePopupStatus);
closeButton.addEventListener('click', changePopupStatus);

let titleInput = popup.querySelector('#profile-title-input');
let subtitleInput = popup.querySelector('#profile-subtitle-input');
titleInput.value = document.querySelector(".profile__title").textContent;
subtitleInput.value = document.querySelector(".profile__subtitle").textContent;

let formElement = popup.querySelector("form");
formElement.addEventListener('submit', handleFormSubmit);
