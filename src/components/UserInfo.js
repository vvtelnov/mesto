export default class UserInfo {
  constructor({ userNameSelector, userProfessionSelector, userAvatarSelector }) {
    this._userNameNode = document.querySelector(userNameSelector);
    this._userProfessionNode = document.querySelector(userProfessionSelector);
    this._userAvatarNode = document.querySelector(userAvatarSelector);
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

  setUserAvatar(avatarLink) {
    this._userAvatarNode.src = avatarLink
  }
}