import {editUserIcon, getAllCards, getUserData, loadNewCard, profileInfoLoad} from './api.js'
import '../pages/index.css'
import { initialCards, profileName, profileDescriptor, formEdit, formAdd, nameInput, jobInput, placeInput, linkInput, buttonProfileInfoEdit, formEditCloseButton, addCardButton, addCardCloseButton, cardTemplate, cardsContainer, allPage, cardPopup, configSelector, formAvatar, profileAvatar, popupList, buttonEditSubmit, profileAvatarOverlay} from './consts.js';
import { closeByEsc, setButtonText } from "./util.js";
import { openPopup, closePopup } from "./modal.js";
import { toggleButtonState, checkInputValidity, addError, hideError, enableValidation, setEventListener } from "./validate.js";
import {createCard, toggleLike, runImagePopup} from "./card.js";

let userId = null;


function addCardManually(e){
  e.preventDefault();
  const manualCard = {name: "", link: ""};
  manualCard.name = formAdd.querySelector('.form__profile_name').value;
  manualCard.link = formAdd.querySelector('.form__profile_motto').value;
  loadNewCard(manualCard)
    .then((data) => {
      createCard(data, userId)
      formAdd.querySelector('.form__profile_name').value = "";
      formAdd.querySelector('.form__profile_motto').value = "";
    })
    .catch((error) => {
      console.log(`Cant load card ${error}`)
    })
  closePopup(formAdd);

}

function addAvatar(e){
  e.preventDefault();
  let newAvatar = null;
  newAvatar = formAvatar.querySelector('.form__profile_motto').value;
  editUserIcon(newAvatar)
    .then (() => {
      getUserData()
      .then ((data) => {profileAvatar.src = data.avatar})
    });
  closePopup(formAvatar);
  formAvatar.querySelector('.form__profile_motto').value = "";
}

buttonProfileInfoEdit.addEventListener('click',() => {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileDescriptor.textContent.trim();
  openPopup(formEdit);
});

addCardButton.addEventListener('click',(e) => {
  e.preventDefault(); 
  openPopup(formAdd);
});

profileAvatarOverlay.addEventListener('click', (e) => {
  e.preventDefault(); 
  openPopup(formAvatar);

})

formAvatar.querySelector('.form__save-button').addEventListener('click', addAvatar);

formAdd.querySelector('.form__save-button').addEventListener('click', addCardManually);
formEditCloseButton.addEventListener('click', () => {
  closePopup(formEdit)
});
addCardCloseButton.addEventListener('click', () => closePopup(formAdd));

document.querySelectorAll('.form__close-icon').forEach(button => {
  const buttonsPopup = button.closest('.popup'); 
  button.addEventListener('click', () => closePopup(buttonsPopup));
}); 

function handleFormSubmit(evt){
  evt.preventDefault();
  setButtonText({
    button: buttonEditSubmit, 
    text: 'Сохраняем...',
    disabled: true
  })
  let name = nameInput.value;
  let about = jobInput.value;
  profileInfoLoad({name, about})
    .then ((data) => {
      profileName.textContent = data.name
      profileDescriptor.textContent = data.about
    })
    .then(() => {closePopup(formEdit)})
    .catch((error) => console.log(error))
    .finally(() => {
      setButtonText({
        button: buttonEditSubmit, 
        text: 'Добавить',
        disabled: false
      })
    })
}; 
  
formEdit.addEventListener('submit', handleFormSubmit); 


enableValidation(configSelector);

popupList.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup') ) {
       closePopup(popup)
    }
  })
}); 

getUserData()
  .then ((data) => {
    userId = data._id;
    profileName.textContent = data.name
    profileDescriptor.textContent = data.about
    profileAvatar.src = data.avatar;
    getAllCards()
      .then(data => {
        data.forEach((dataItem) => createCard(dataItem, userId))
      })
  })
  .catch(() => console.log('cant update profile info'))


