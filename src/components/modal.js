
import { initialCards, profileName, profileDescriptor, formEdit, formAdd, nameInput, jobInput, placeInput, linkInput, buttonProfileInfoEdit, formEditCloseButton, addCardButton, addCardCloseButton, cardTemplate, cardsContainer, allPage, cardPopup, configSelector} from './consts.js';
import { toggleButtonState, checkInputValidity, addError, hideError, enableValidation, setEventListener } from "./validate.js";
import {addCardManually, createCard, toggleLike} from "./card.js";

function runImagePopup(e){
  openPopup(cardPopup);
  const targetCard = e.target.closest('.element__rectangle');
  const chosenImage = targetCard.querySelector('.element__image'); 
  const chosenText = targetCard.querySelector('.element__rectangle_text');
  cardPopup.querySelector('.popup__big-picture').src = chosenImage.src;
  cardPopup.querySelector('.popup__big-popup-descriptor').textContent = chosenText.textContent;
}

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

export {runImagePopup, openPopup, closeByEsc, closePopup};