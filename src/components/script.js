import {loadNewCard} from './api.js'
import '../pages/index.css'
import { initialCards, profileName, profileDescriptor, formEdit, formAdd, nameInput, jobInput, placeInput, linkInput, buttonProfileInfoEdit, formEditCloseButton, addCardButton, addCardCloseButton, cardTemplate, cardsContainer, allPage, cardPopup, configSelector} from './consts.js';
import { openPopup, closePopup, toggleLike, handleFormSubmit, setEventListener } from "./util.js";
import { runImagePopup } from "./modal.js";
import { toggleButtonState, checkInputValidity, addError, hideError, enableValidation } from "./validate.js";
import {createCard, renderCard} from "./card.js";

function addCardManually(e){
  e.preventDefault();
  const manualCard = {name: "", link: ""};
  manualCard.name = formAdd.querySelector('.form__profile_name').value;
  manualCard.link = formAdd.querySelector('.form__profile_motto').value;
  console.log(manualCard)
  loadNewCard(manualCard)
    .then(() => {
      createCard(manualCard)
    })
    .catch((error) => {
      console.log(`Cant load card ${error}`)
    })
  closePopup(formAdd);
}


//слушатель на кнопку редактирования профиля + открфтие формы редактирования + изменение инфы в шапке профиля
buttonProfileInfoEdit.addEventListener('click',() => {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileDescriptor.textContent.trim();
  openPopup(formEdit);
});


//слушатель на кнопку добавить фото + открытие формы добавления из темплейта + рендер картинки на страницу.
addCardButton.addEventListener('click',(e) => {
  e.preventDefault(); 
  openPopup(formAdd);
  console.log(formAdd);
});

formAdd.querySelector('.form__save-button').addEventListener('click', addCardManually);
formEditCloseButton.addEventListener('click', () => closePopup(formEdit));
addCardCloseButton.addEventListener('click', () => closePopup(formAdd));
cardPopup.querySelector('.popup__close-icon').addEventListener('click', () => closePopup(cardPopup));

document.addEventListener('keydown', function(evt){
  if (evt.keyCode === 27) {
    closePopup(formAdd);
    closePopup(formEdit);
    closePopup(cardPopup);
  }
});

// document.addEventListener('click', function(evt) {
//   if (!evt.target == formAdd.querySelector('.form__container')) {
//     closePopup(formAdd);
//     closePopup(formEdit);
//     closePopup(cardPopup);
//   }
// });

enableValidation(configSelector);