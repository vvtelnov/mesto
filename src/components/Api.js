export default class Api {
  constructor({ token, groupId }) {
    this._token = token;
    this._groupId = groupId;
  }

  getUserInfoFromDB() {
    console.log('getUserInfoFromDB')
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      },
      method: 'GET',
    })
    .then( res => {
      if (res.ok) {
        return res.json();
      }
      else {
        throw new Error(res.status)
      }
    })
    .catch( err => {
      console.error(`Ошибка / ${err}`)
    })
  }

  updateUserInfo(newName, newProfession) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: newName,
        about: newProfession,
      }),
    })
    .then( res => {
      if (res.ok) {
        return res.json();
      }
      else {
        throw new Error(res.status)
      }
    })
    .catch( err => {
      console.error(`Ошибка / ${err}`);
      console.error('Не получается изменить профиль пользователя');
    })
  }

  updateUserAvatar(newAvatarLink) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me/avatar`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        avatar: newAvatarLink,
      }),
    })
    .then( res => {
      console.log(res)
      if (res.ok) {
        return res.json();
      }
      else {
        throw new Error(res.status)
      }
    })
    .catch( err => {
      console.error(`Ошибка / ${err}`)
      console.error('Не получается изменить аватар пользователя')
    })
  }

  getCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      },
      method: 'GET',
    })
    .then( res => {
      if (res.ok) {
        return res.json();
      } 
      else {
        throw new Error(res.status)
      }
    })
    .catch( err => {
      console.error(`Ошибка / ${err}`)
    });
  }

  postCard(name, link) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then( res => {
      if (res.ok) {
        return res.json();
      }
      else {
        throw new Error(res.status)
      }
    })
    .catch( err => {
      console.error(`Ошибка / ${err}`)
      console.error('Не получается загрузить новый пост')
    })
  }

  likeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/${cardId}/likes`, {
      headers: {
        authorization: this._token,
      },
      method: 'PUT',
    })
    .then( res => {
      if (res.ok) {
        return res.json();
      }
      else {
        throw new Error(res.status)
      }
    })
    .then( postInfo => {
      return postInfo.likes.length;
    })
    .catch( err => {
      console.error(`Ошибка / ${err}`)
      console.error('Не получается поставить лайк')
    });
  }

  removeCardLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/${cardId}/likes`, {
      headers: {
        authorization: this._token,
      },
      method: 'DELETE',
    })
    .then( res => {
      if (res.ok) {
        return res.json();
      }
      else {
        throw new Error(res.status)
      }
    })
    .then( postInfo => {
      return postInfo.likes.length;
    })
    .catch( err => {
      console.error(`Ошибка / ${err}`)
      console.error('Не получается убрать лайк')
    });
  }

  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards/${cardId}`, {
      headers: {
        authorization: this._token,
      },
      method: 'DELETE'
    })
    .then( res => {
      if (res.ok) {
        return true;
      }
      else if (res.status === 403) {
        Promise.reject('Нет прав!');
      }
      else {
        Promise.reject();
      } 
    })
    .catch( err => {
      console.error(`Ошибка ${err}. (Не получается удалить пост)`)
    })
  }
}
