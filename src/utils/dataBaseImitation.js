// This is a array of cards that appears on the page when first opened or reloaded.
export const initialPublications = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// Массив здесь это иммитация что у нас не один юзер. То есть каждый новый юзер добавляется в конец мессива.
// Тогда у каждого последующего юзера индекс на 1 будет больше.
// Пусть индекс юзера в данном массиве - это его id.  
export const initialUsersInfo = [
  {
    name: 'Жак-Ив Кусто',
    profession: 'Исследователь океана',
  }
]