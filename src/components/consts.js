const initialCards = [
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

const profileName = document.querySelector('.profile__info_header');
const profileDescriptor = document.querySelector('.profile__info_description');
const profileAvatar = document.querySelector('.profile__avatar-image');
const formEdit = document.querySelector('#popup-edit');
const formAdd = document.querySelector('#popup-add');
const formAvatar = document.querySelector('#popup-avatar')
const popupAny = document.querySelector('.popup');
const popupList = document.querySelectorAll('.popup');
const buttonEditSubmit = formEdit.querySelector('.form__save-button');
const buttonAddSubmit = formAdd.querySelector('.form__save-button');
const nameInput = formEdit.querySelector('.form__profile_name');
const jobInput = formEdit.querySelector('.form__profile_motto');
const placeInput = formAdd.querySelector('[name="place-name"]');
const linkInput =  formAdd.querySelector('.form-link');
const buttonProfileInfoEdit = document.querySelector('.profile__info_edit-button');
const formEditCloseButton = formEdit.querySelector('.form__close-icon');
const addCardButton = document.querySelector('.profile__add-button');
const addCardCloseButton = formAdd.querySelector('.form__close-icon');
const cardTemplate = document.querySelector('#card-template');
const cardsContainer = document.querySelector('.elements');
const allPage = document.querySelector('.page');
const cardPopup = document.querySelector('.popup__big-pic-template');



const configSelector = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__button-blocked',
  inputErrorClass: 'form__input-invalid',
};

export {
  initialCards, 
  profileName,
  profileDescriptor, 
  formEdit, 
  formAdd, 
  nameInput,
  jobInput,
  placeInput, 
  linkInput, 
  buttonProfileInfoEdit,
  formEditCloseButton,
  addCardButton,
  addCardCloseButton,
  cardTemplate, 
  cardsContainer, 
  allPage, 
  cardPopup,
  configSelector,
  buttonAddSubmit,
  buttonEditSubmit,
  profileAvatar,
  popupAny,
  popupList,
  formAvatar
};