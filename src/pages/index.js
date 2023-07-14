import './index.css';

import Api from '../components/Api.js';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm';
import PopupNotice from '../components/PopupNotice';
import PopupWithImage from '../components/PopupWithImage';
import UserInfo from '../components/UserInfo';
import FormValidator from '../components/FormValidator.js';
import bringGetUserInfoReturnToIdFormat from '../utils/GetObjectWithUserData';
import reverseSortArray from '../utils/reverseArraySorting';

const profileDom = document.querySelector('.profile')

// variables related to #popup-edit-profile
//Вообще, edit это существительное, которое становится прилагательным при использовании его перед другим существительным. 
//Проблема фиксится добавлением артикля, но никогда в коде не видел, чтобы его использовали в названии переменной.
// https://dictionary.cambridge.org/dictionary/english/edit
const editButton = document.querySelector('.profile__edit-button');

// variables related to #popup-edit-avatar
const changeAvatarButton = profileDom.querySelector('.profile__avatar-container')

// variables related to #popup-new-place
const addButton = document.querySelector('.profile__add-button');

const formsValidatorObj = {
  // example of this obj data struct: {formName: instance of class FormValidator}
  // based on page current forms, keys of this obj after calling funct fillFormsValidatorObj() are following:
  // {
    // add-new-publication: this instance class FormValidator,
    // edit-profile: this instance class FormValidator,
  // }
}

let userId;
let publicationSection;

export const validationConfig = {
  formElement: '.popup__form',
  inputElement: '.popup__text-input-form',
  buttonElement: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-input-form_error-shown',
  errorClass: 'popup__input-error_shown'
};

const serverApiConfig = {
  token: 'b37ee88e-f73b-4f50-b8b1-191a1fa0a0d2',
  groupId: 'cohort-70',
}

export const api = new Api(serverApiConfig);
const userInfoInst = new UserInfo({
  userNameSelector: '.profile__title',
  userProfessionSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar',
});

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
  api.updateUserInfo(name, profession)
    .then(updatedUserData => {
      if (updatedUserData) {
        userInfoInst.setUserInfo(updatedUserData.name, updatedUserData.about);
      }
      else {
        console.error('Не удается обновить данные пользователя')
      }
    })
    .catch( err => {
      console.error(`${err} (Не получается изменить профиль пользователя)`);
    })
    .then( () => {
      this._closeWithFormReset();
      this.setSubmitBtnMessageToDefaultValue();
    })
}

function handleFormSubmitEditAvatar({'avatar-link': avatarLink}) {
  // Destructuring object with ALL #popup-edit-avatar form's inputs. Curently the only one.
  // This funct. changes profile__avatar with input values.
  api.updateUserAvatar(avatarLink)
    .then(updatedUserData => {
      if (updatedUserData) {
        userInfoInst.setUserAvatar(updatedUserData.avatar);
      }
      else {
        //TODO:
        console.error('Не удается обновить аватар пользователя')
      }
    })
    .catch( err => {
      console.error(`${err} (Не получается изменить аватар пользователя)`)
    })
    .then( () => {
      this._closeWithFormReset();
      this.setSubmitBtnMessageToDefaultValue();
    })
}

function handleFormSubmitAddNewPlace({ 'new-pub-name': name, 'new-pub-link': link }) {
  // Destructuring object with ALL #popup-new-place form's inputs
  // This funct. addes new publication (place) with input values.
  api.postCard(name, link)
    .then(post => {
      publicationSection.prependItemToPage(post);
      formsValidatorObj['add-new-publication'].toggleButtonState();
    })
    .catch( err => {
      console.log(`${err} (Не получается загрузить новый пост)`)
    })
    .then( () => {
      this._closeWithFormReset();
      this.setSubmitBtnMessageToDefaultValue();
    })
}

function handleFormSubmitDeletePlace(cardInst) {
  api.deleteCard(cardInst.getCardId())
  .then( (isPermitionGranted) => {
    if (isPermitionGranted) {
      cardInst.deleteCardDom();
    }
  })
  .catch( err => {
    console.log(`${err} (Возникла ошибка при удалении поста)`)
  })
  .then(() => {
    this.close();
    this.setSubmitBtnMessageToDefaultValue();
  })
}

function handleCardClick(imgName, imgLink) {
  popupWithImageInst.open(imgName, imgLink)
}

function handleCardDeleteClick(cardInst) {
  popupConfimDeleteInst.open(cardInst);
}

function handleCardLikeClick(cardId, prevStateIsLiked) {
  const isLiked = !prevStateIsLiked;
  if (isLiked) {
    return api.likeCard(cardId)
    .then( postInfo => {
      return postInfo.likes.length;
    })
    .catch( err => {
      console.error(`Ошибка / ${err} (Не получается поставить лайк)`);

    })
  } else {
    return api.removeCardLike(cardId)
    .then( postInfo => {
      return postInfo.likes.length;
    })
    .catch( err => {
      console.error(`Ошибка / ${err} (Не получается убрать лайк)`);
    })
  }
}

fillFormsValidatorObj();
enableAllFormsValidation();

// all page popups
const popupEditProfileInst = new PopupWithForm('#popup-edit-profile', handleFormSubmitEditProfile, 'Сохранение...');
const popupEditAvatarInst = new PopupWithForm('#popup-edit-avatar', handleFormSubmitEditAvatar, 'Сохранение...');
const popupNewPlaceInst = new PopupWithForm('#popup-new-place', handleFormSubmitAddNewPlace, 'Создание...');
const popupConfimDeleteInst = new PopupNotice('#popup-confirm-delete', handleFormSubmitDeletePlace, 'Удаление...');
const popupWithImageInst = new PopupWithImage('#popup-big-img', '.popup__image', '.popup__pub-title');

// enableOpeningPopups
editButton.addEventListener('click', () => popupEditProfileInst.openWithSpecifiedFormParam(
  bringGetUserInfoReturnToIdFormat(userInfoInst.getUserInfo())
));
changeAvatarButton.addEventListener('click', () => popupEditAvatarInst.open());
addButton.addEventListener('click', () => popupNewPlaceInst.open());
// setting eventListeners (closing by click and form submit)
popupEditProfileInst.setEventListeners();
popupEditAvatarInst.setEventListeners();
popupNewPlaceInst.setEventListeners();
popupConfimDeleteInst.setEventListeners();
popupWithImageInst.setEventListeners();

Promise.all([
  api.getUserInfoFromDB(),
  api.getCards()
]).then(values => {
  const userData = values[0];
  userId = userData._id;
  const cards = values[1];
  reverseSortArray(cards);

  // setting initial (from DB) user info to page
  if (userData) {
    userInfoInst.setUserInfo(userData.name, userData.about);
    userInfoInst.setUserAvatar(userData.avatar);
  }
  else {
    console.error('Не удалось получить данные пользователя из Базы данных');
    console.log('Устанавливаем значения по умолчанию...');
    userInfoInst.setUserInfo('Жак-Ив Кусто', 'Исследователь океана');
  }

  // creating section with posts, inserting it to the page
  publicationSection = new Section({
    items: cards,
    renderer: item => {
      return new Card({
        imgName: item.name, 
        imgLink: item.link,
        likes: item.likes.length,
        isLiked: item.likes.find(user => user._id === userId),
        cardId: item._id,
        userId: userId,
        canBeDeleted: item.owner._id === userId,
        cardTemplate: '#publication-template',
        handleCardClick: handleCardClick,
        handleDeleteCard: handleCardDeleteClick,
        handleLikeCard: handleCardLikeClick,
      }).getReadyCardInstance();
    }
  },
  '.publications')
  publicationSection.prependInitItemsToPage();
})
.catch( err => {
  console.error(`Ошибка / ${err}`)
})

console.log('userId', userId) // undefined
