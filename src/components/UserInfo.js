export default class UserInfo {
  constructor({ name, profession }) {
    this._userNameNode = document.querySelector('.profile__title');
    this._userProfessionNode = document.querySelector('.profile__subtitle');
    this.setUserInfo(name, profession);
  }

  getUserInfo() {
    return {
      name: this._userName,
      profession: this._userProfession,
    }
  }

  setUserInfo(newName, newProfession) {
    this._userName = newName;
    this._userProfession = newProfession;

    this._userNameNode.textContent = this._userName;
    this._userProfessionNode.textContent = this._userProfession;
  }
}