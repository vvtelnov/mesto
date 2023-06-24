import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imgSelector, titleSelector) {
    super(popupSelector);
    this._imgNode = this._popup.querySelector(imgSelector);
    this._titleNode = this._popup.querySelector(titleSelector);
  }

  open(imgName, imgLink) {
    super.open();
    this._imgNode.src = imgLink;
    this._imgNode.alt = imgName;
    this._titleNode.textContent = imgName;
  }
}