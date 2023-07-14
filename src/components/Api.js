export default class Api {
  constructor({ token, groupId }) {
    this._baseUrl = 'https://mesto.nomoreparties.co/v1/'
    this._token = token;
    this._groupId = groupId;
    this._fetchHeader = {
      authorization: this._token,
      'Content-Type': 'application/json',
    }
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  } 

  getUserInfoFromDB() {
    return fetch(`${this._baseUrl}${this._groupId}/users/me`, {
      headers: this._fetchHeader,
      method: 'GET',
    })
    .then(this._getResponseData)
  }

  updateUserInfo(newName, newProfession) {
    return fetch(`${this._baseUrl}${this._groupId}/users/me`, {
      headers: this._fetchHeader,
      method: 'PATCH',
      body: JSON.stringify({
        name: newName,
        about: newProfession,
      }),
    })
    .then(this._getResponseData)
  }

  updateUserAvatar(newAvatarLink) {
    return fetch(`${this._baseUrl}${this._groupId}/users/me/avatar`, {
      headers: this._fetchHeader,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: newAvatarLink,
      }),
    })
    .then(this._getResponseData)
  }

  getCards() {
    return fetch(`${this._baseUrl}${this._groupId}/cards`, {
      headers: this._fetchHeader,
      method: 'GET',
    })
    .then(this._getResponseData)
  }

  postCard(name, link) {
    return fetch(`${this._baseUrl}${this._groupId}/cards`, {
      headers: this._fetchHeader,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then(this._getResponseData)
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}${this._groupId}/cards/${cardId}/likes`, {
      headers: this._fetchHeader,
      method: 'PUT',
    })
    .then(this._getResponseData)
  }

  removeCardLike(cardId) {
    return fetch(`${this._baseUrl}${this._groupId}/cards/${cardId}/likes`, {
      headers: this._fetchHeader,
      method: 'DELETE',
    })
    .then(this._getResponseData)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}${this._groupId}/cards/${cardId}`, {
      headers: this._fetchHeader,
      method: 'DELETE'
    })
    .then(this._getResponseData)
  }
}
