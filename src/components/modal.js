import { configSelector, buttonAddSubmit, buttonAvatarSubmit } from './consts.js';
import { toggleButtonState } from "./validate.js";

function openPopup(modalElement){
  modalElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(modalElement){
  modalElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
};  

export {openPopup, closeByEsc, closePopup};