import { publicationsNodes, publicationTemplate, popupZoom, popupZoomImage, popupZoomTitle, openPopup, closePopup } from './index.js'

export default class Card {
  constructor(imgName, imgLink) {
    this._imgName = String(imgName);
    this._imgLink = String(imgLink);
    this._cardTemplate = document.querySelector('#publication-template');
    this._createContentCard(); // create ready this._cardElement;
  }

  getReadyCardInstance() { // publically returns ready-to-append card element
    return this._cardElement; 
  }

  _createContentCard() {
    this._createEmptyContentCard();
    this._fillCardWithContent();
    this._setEventListeners();
  }

  _createEmptyContentCard() { 
    this._cardElement = this._cardTemplate.content.cloneNode(true);
    this._cardPhoto = this._cardElement.querySelector('.publication__photo');
    this._cardTitle = this._cardElement.querySelector('.publication__title');
    this._cardLikeButton = this._cardElement.querySelector('.publication__like-button');
    this._cardDeleteButton = this._cardElement.querySelector('.publication__delete-button');
  }

  _fillCardWithContent() {
    this._cardPhoto.src = this._imgLink;
    this._cardPhoto.alt = this._imgName;
    this._cardTitle.textContent = this._imgName;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      this._toggleCardLikeButton();
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardPhoto.addEventListener('click', () => {
      this._openPopupZoomImage();
    });
  }

  _toggleCardLikeButton() {
    this._cardLikeButton.classList.toggle('publication__like-button_active');
  }

  _deleteCard() {
    this._cardPhoto.closest('.publication').remove();
    // this._cardElement.remove();
    // Объясните пожалуйста, почему пропадает вся вложенность this._cardElement, когда мы вызываем в слушателе событий.
    // А в любом другом месте программы, он содержит элемент article
    // Ну тогда по логике и к элементу this._cardPhoto нельзя обратится. То есть контент при этом я не теряю!
    // Объясните пожалуйста!!
  }

  _openPopupZoomImage() {
    openPopup(popupZoom);
    popupZoomImage.src = this._imgLink;
    popupZoomImage.alt = this._imgName;
    popupZoomTitle.textContent = this._imgName;
  }
}
