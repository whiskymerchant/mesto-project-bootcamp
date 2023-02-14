import { openPopup, closePopup } from "./modal.js";

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