
import { openPopup, closePopup, runImagePopup } from "./modal.js";
import { initialCards, profileName, profileDescriptor, formEdit, formAdd, nameInput, jobInput, placeInput, linkInput, buttonProfileInfoEdit, formEditCloseButton, addCardButton, addCardCloseButton, cardTemplate, cardsContainer, allPage, cardPopup, configSelector} from './consts.js';
import {addCardManually, createCard, toggleLike} from "./card.js";



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
  console.log(isInputValid);
  console.log(`inputElement: ${inputElement.name}`);
  console.log(formElement);
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  console.log(errorElement);
  if (!isInputValid) {
    addError(inputElement, errorElement, config);
  }
  else {
    hideError(inputElement, errorElement, config);
  }
}

function enableValidation(config){
  const forms = document.querySelectorAll(config.formSelector);
  console.log(forms)

  Array.from(forms).forEach((formElement) => {
    setEventListener(formElement, config);
  })
}

function setEventListener(formElement, config){
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

  console.log(inputList);
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
