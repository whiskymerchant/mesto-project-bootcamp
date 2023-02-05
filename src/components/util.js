
import { initialCards, profileName, profileDescriptor, formEdit, formAdd, nameInput, jobInput, placeInput, linkInput, buttonProfileInfoEdit, formEditCloseButton, addCardButton, addCardCloseButton, cardTemplate, cardsContainer, allPage, cardPopup, configSelector, buttonEditSubmit} from './consts.js';
import { runImagePopup } from "./modal.js";
import { toggleButtonState, checkInputValidity, addError, hideError, enableValidation } from "./validate.js";
import {addCardManually, createCard} from "./card.js";
import { profileInfoLoad, getUserData } from './api.js';


function openPopup(modalElement){
  modalElement.classList.add('popup_opened');
}

function closePopup(modalElement){
  modalElement.classList.remove('popup_opened');
};

function toggleLike(modalElement){
  modalElement.classList.toggle('element__rectangle_heart-on');
};

formAdd.addEventListener('click', (e) =>{
  const target = e.target;
  if (target.classList.contains('popup') || target.classList.contains('popup__close-icon') || target.classList.contains('form__close-icon')) {
    const activePopup = document.querySelector('.popup_opened');
    console.log('aaa');
    closePopup(activePopup);
  }
});

function handleFormSubmit(evt){
  evt.preventDefault();
  setButtonText({
    button: buttonEditSubmit, 
    text: 'Сохраняем...'
  })
  let name = nameInput.value;
  let about = jobInput.value;
  console.log({name, about})
  profileInfoLoad({name, about})
    .then ((data) => {
      profileName.textContent = data.name
      profileDescriptor.textContent = data.about
      console.log(data)
    })
    .then(() => {closePopup(formEdit)})
    .catch((error) => console.log(error))
    .finally(() => {
      setButtonText({
        button: buttonEditSubmit, 
        text: 'Добавить'
      })
    })
  //evt.target.reset();
}; 
  formEdit.addEventListener('submit', handleFormSubmit); 

  getUserData()
    .then ((data) => console.log(data))
    .then ((data) => {
      profileName.textContent = data.name
      profileDescriptor.textContent = data.about
      console.log(data)
    })
    .catch(() => console.log('cant update profile info'))

function setButtonText(button, text){
  button.textContent = text;
}

// function handleFormSubmit(evt){
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileDescriptor.textContent = jobInput.value;
//   evt.target.reset();
//   closePopup(formEdit)
// }; 
//   formEdit.addEventListener('submit', handleFormSubmit); 


function setEventListener(formElement, config){
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
  })
  Array.from(inputList).forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
      checkInputValidity(inputElement, formElement, config);
    })
  })
}



export {
  openPopup, 
  closePopup, 
  toggleLike,
  handleFormSubmit,
  setEventListener, 
  setButtonText
};