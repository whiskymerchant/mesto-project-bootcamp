
import { profileName, profileDescriptor, formEdit, formAdd, nameInput, jobInput, placeInput, linkInput, buttonProfileInfoEdit, formEditCloseButton, addCardButton, addCardCloseButton, cardTemplate, cardsContainer, allPage, cardPopup, configSelector, buttonEditSubmit, profileAvatar, popupAny, popupList} from './consts.js';
import { openPopup, closePopup } from "./modal.js";
import { toggleButtonState, checkInputValidity, addError, hideError, enableValidation, setEventListener } from "./validate.js";
import {addCardManually, createCard, runImagePopup, isLiked} from "./card.js";
import { loadProfileInfo, getUserData } from './api.js';


function setButtonText({button, text, disabled}){
  if(disabled){
    button.disabled = false
  }
  else {
    button.disabled = 'form__button-blocked'
  }
  button.textContent = text;
};


function toggleLike(modalElement){
  modalElement.classList.toggle('element__rectangle_heart-on');
};




export {
  openPopup, 
  closePopup, 
  toggleLike,
  setButtonText
};