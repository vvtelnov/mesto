export default class Card {
  constructor(imgName, imgLink, cardTemplate, handleCardClick) {
    this._imgName = String(imgName);
    this._imgLink = String(imgLink);
    this._cardTemplate = document.querySelector(cardTemplate);
    this._handleCardClick = handleCardClick;
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
    this._cardElement = this._cardTemplate.content.querySelector('.publication').cloneNode(true);
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
    this._cardElement.remove();
  }

  _openPopupZoomImage() {
    this._handleCardClick(this._imgName, this._imgLink);
  }
}
