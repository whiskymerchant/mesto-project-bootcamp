
import { openPopup, closePopup } from "./modal.js";
import { profileName, profileDescriptor, formEdit, formAdd, nameInput, jobInput, placeInput, linkInput, buttonProfileInfoEdit, formEditCloseButton, addCardButton, addCardCloseButton, cardTemplate, cardsContainer, allPage, cardPopup, configSelector} from './consts.js';
import {addCardManually, createCard, toggleLike, runImagePopup, isLiked} from "./card.js";



function addError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}

function toggleButtonState(buttonElement, isActive, config) {
  if (isActive) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
  else {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  }
}

function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (!isInputValid) {
    addError(inputElement, errorElement, config);
  }
  else {
    hideError(inputElement, errorElement, config);
  }
}

function enableValidation(config){
  const forms = document.querySelectorAll(config.formSelector);

  Array.from(forms).forEach((formElement) => {
    setEventListener(formElement, config);
  })
}

function setEventListener(formElement, config){
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
      checkInputValidity(inputElement, formElement, config);
    })
  })
}



export {
  toggleButtonState, 
  checkInputValidity, 
  addError,
  hideError,
  enableValidation,
  setEventListener
};
