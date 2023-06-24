import { initialPublications, initialUsersInfo } from './dataBaseImitation.js';


function getInitialPublications() {
  return initialPublications;
}

function getInitialUsersInfo() {
  return initialUsersInfo[0];
}

export { getInitialPublications, getInitialUsersInfo }