export default class Card {
  constructor({
    imgName,
    imgLink,
    likes,
    isLiked,
    cardId,
    userId,
    canBeDeleted,
    cardTemplate,
    handleCardClick,
    handleDeleteCard,
    handleLikeCard,
  }) {
    this._imgName = String(imgName);
    this._imgLink = String(imgLink);
    this._likesNumb = Number(likes);
    this._isLiked = Boolean(isLiked);
    this._cardId = cardId;
    this._userId = userId;
    this._canBeDeleted = canBeDeleted;
    this._cardTemplate = document.querySelector(cardTemplate);
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCardClick = handleLikeCard;
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
    this._likeCounter = this._cardElement.querySelector('.publication__like-counter');
    this._cardDeleteButton = this._cardElement.querySelector('.publication__delete-button');
  }

  _fillCardWithContent() {
    this._cardPhoto.src = this._imgLink;
    this._cardPhoto.alt = this._imgName;
    this._cardTitle.textContent = this._imgName;
    this._updLikesCounter(this._likesNumb);
    this._toggleLikeBtnState();
    if (!this._canBeDeleted) {
      this._cardDeleteButton.setAttribute('disabled', true);
      this._cardDeleteButton.classList.add('publication__delete-button_disabled');
    }
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => {
      this._updLikesSection();
    });

    if (this._canBeDeleted) {
      this._cardDeleteButton.addEventListener('click', () => {
        this._deleteCard();
      });
    }

    this._cardPhoto.addEventListener('click', () => {
      this._openPopupZoomImage();
    });
  }

  _updLikesSection(nextState) {
    this._handleLikeCardClick(this._cardId, this._isLiked)
    .then(likesNumb => {
      this._isLiked = !this._isLiked;
      this._updLikesCounter(likesNumb);
      this._toggleLikeBtnState();
    });
  }

  _updLikesCounter(newLikesNumb) {
    this._likesNumb = newLikesNumb;
    this._likeCounter.textContent = this._likesNumb;
  }

  _toggleLikeBtnState() {
    this._isLiked
    ? this._cardLikeButton.classList.add('publication__like-button_active')
    : this._cardLikeButton.classList.remove('publication__like-button_active');
  }

  _deleteCard() {
    this._handleDeleteCard(this._cardElement, this._cardId);
  }

  _openPopupZoomImage() {
    this._handleCardClick(this._imgName, this._imgLink);
  }
}
