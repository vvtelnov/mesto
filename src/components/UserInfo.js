export default class UserInfo {
  constructor() {
    this._userNameNode = document.querySelector('.profile__title');
    this._userProfessionNode = document.querySelector('.profile__subtitle');
  }

  getUserInfo() {
    return {
      name: this._userNameNode.textContent,
      profession: this._userProfessionNode.textContent,
    }
  }

  setUserInfo(newName, newProfession) {
    this._userNameNode.textContent = newName;
    this._userProfessionNode.textContent = newProfession;
  }
}