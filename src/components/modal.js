
import { openPopup, closePopup, toggleLike, handleFormSubmit, setEventListener } from "./util.js";
import { initialCards, profileName, profileDescriptor, formEdit, formAdd, nameInput, jobInput, placeInput, linkInput, buttonProfileInfoEdit, formEditCloseButton, addCardButton, addCardCloseButton, cardTemplate, cardsContainer, allPage, cardPopup, configSelector} from './consts.js';
import { toggleButtonState, checkInputValidity, addError, hideError, enableValidation } from "./validate.js";
import {addCardManually, createCard} from "./card.js";

function runImagePopup(e){
  openPopup(cardPopup);
  const targetCard = e.target.closest('.element__rectangle'); // забрали карту, на которую мы нажали
  const chosenImage = targetCard.querySelector('.element__image'); 
  const chosenText = targetCard.querySelector('.element__rectangle_text');
  cardPopup.querySelector('.popup__big-picture').src = chosenImage.src;
  cardPopup.querySelector('.popup__big-popup-descriptor').textContent = chosenText.textContent;
}

export {runImagePopup};