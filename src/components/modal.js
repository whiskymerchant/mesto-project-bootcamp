
import { initialCards, profileName, profileDescriptor, formEdit, formAdd, nameInput, jobInput, placeInput, linkInput, buttonProfileInfoEdit, formEditCloseButton, addCardButton, addCardCloseButton, cardTemplate, cardsContainer, allPage, cardPopup, configSelector} from './consts.js';
import { toggleButtonState, checkInputValidity, addError, hideError, enableValidation, setEventListener } from "./validate.js";
import {addCardManually, createCard, toggleLike, runImagePopup} from "./card.js";



function openPopup(modalElement){
  modalElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(modalElement){
  modalElement.classList.remove('popup_opened');
};


function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
};  

export {openPopup, closeByEsc, closePopup};