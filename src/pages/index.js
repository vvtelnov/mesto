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
        //TODO:
        console.error('Не удается обновить данные пользователя')
      }
    })
    .catch( err => {
      console.error(`${err} (Не получается изменить профиль пользователя)`);
    })
    .finally( () => {
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
    .finally( () => {
      this._closeWithFormReset();
      this.setSubmitBtnMessageToDefaultValue();
    })
}

function handleFormSubmitAddNewPlace({ 'new-pub-name': name, 'new-pub-link': link }) {
  //Замечание: "
  //1) Нам не нужно получать информацию о пользователе и о начальных карточках, чтобы добавить новую карточку. 
  //2) Следует удалить данный блок then и выполнять сразу DOM функционал добавления карточки (строки 130 - 131)
  //"

  //Ответ: "
  // 1) => если мы не получаем информацию о пользователя, то как нам взять его id?, что бы ставить лайки и удалять посты ? 
  // 2) => если мы удалим блок then, тогда получается, что если на сервере ошибка (пост не прошел валидацию сервера и тд), то
  // мы его не добавляем, а так мы его дабавляем на инстанс страницы юзера, а при перезагрузке, пост удалится.
  // "

  // Destructuring object with ALL #popup-new-place form's inputs
  // This funct. addes new publication (place) with input values.
  api.postCard(name, link)
  .then(post => {
    publicationSection.then(pubSection => {
      pubSection.prependItemToPage(post);
      formsValidatorObj['add-new-publication'].toggleButtonState();
    })
  })
  .catch( err => {
    console.log(`${err} (Не получается загрузить новый пост)`)
  })
  .finally( () => {
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
  .finally(() => {
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
    .then( likesNumb => {
      return likesNumb;
    })
  } else {
    return api.removeCardLike(cardId)
    .then( likesNumb => {
      return likesNumb;
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

const publicationSection = Promise.all([
  api.getUserInfoFromDB(),
  api.getCards()
]).then(values => {
  const userData = values[0];
  const userId = userData._id;
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
  const publicationSection = new Section({
    // Замечение: "
    // 1) Экземпляр следует объявить глобально через let, чтобы присвоить здесь ему значение и затем использовать на строке 130.
    // 2) Контейнер карточек - статичный элемент страницы в единственном экземпляре. Мы должны работать с ним с помощью одного экземпляра Section и не дублировать его создание"
    // "
    //
    // Ответ: "
    // 1) А какая разница здесь через let или const объявлять ? У них одинаковая область видимости, частично экземпляры класса Section мы изменять и так можем, а зачем нам его полностью перезаписывать ? 
    // 2) => мы и так работаем с помощью одного экземпляра Section и не дублируем его создание
    //"

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

  return publicationSection
})
.catch( err => {
  console.error(`Ошибка / ${err}`)
})