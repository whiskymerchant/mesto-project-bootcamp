
import { openPopup, closePopup, toggleLike, handleFormSubmit, setEventListener } from "./util.js";
import { runImagePopup } from "./modal.js";
import { initialCards, profileName, profileDescriptor, formEdit, formAdd, nameInput, jobInput, placeInput, linkInput, buttonProfileInfoEdit, formEditCloseButton, addCardButton, addCardCloseButton, cardTemplate, cardsContainer, allPage, cardPopup, configSelector} from './consts.js';
import {addCardManually, createCard} from "./card.js";



function addError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = 'All is fine';
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

  errorElement.textContent = inputElement.validationMessage;
}

function enableValidation(config){
  const forms = document.querySelectorAll(config.formSelector);

  Array.from(forms).forEach((formElement) => {
    setEventListener(formElement, config);
  })
}



export {
  toggleButtonState, 
  checkInputValidity, 
  addError,
  hideError,
  enableValidation
};
