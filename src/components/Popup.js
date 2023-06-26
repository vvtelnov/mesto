export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    //references to bound functions
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('click', this._handleCloseByClick.bind(this));
  }

  _handleEscClose(event) {
    if (event.key === 'Escape' || event.key === 'Esc')  {
      this.close();
    }
  }

  _handleCloseByClick(event) {
    if (event.target === event.currentTarget) {
      this.close();
    } else if ( event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup__img-close-button') ) {
      this.close();
    }
  }
}