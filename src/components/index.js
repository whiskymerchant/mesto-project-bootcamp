import {editUserIcon, getAllCards, getUserData, loadNewCard, loadProfileInfo} from './api.js'
import '../pages/index.css'
import { profileName, profileDescriptor, formEdit, formAdd, nameInput, jobInput, placeInput, linkInput, buttonProfileInfoEdit, formEditCloseButton, addCardButton, addCardCloseButton, cardTemplate, cardsContainer, allPage, cardPopup, configSelector, formAvatar, profileAvatar, popupList, buttonEditSubmit, profileAvatarOverlay, formAddName, formAddMotto, buttonAddSubmit} from './consts.js';
import { closeByEsc, setButtonText } from "./util.js";
import { openPopup, closePopup } from "./modal.js";
import { toggleButtonState, checkInputValidity, addError, hideError, enableValidation, setEventListener } from "./validate.js";
import {createCard, toggleLike, runImagePopup, isLiked} from "./card.js";

let userId = null;

function renderCard(data, container) {
  const newCard = createCard(data, userId);
  container.prepend(newCard)
}

function addCardManually(e){
  e.preventDefault();
  setButtonText({
    button: buttonAddSubmit, 
    text: 'Сохраняем...',
    disabled: true
  })
  const manualCard = {name: formAddName.value, link: formAddMotto.value};
  loadNewCard(manualCard)
    .then((data) => {
      renderCard(data, cardsContainer);
      formAddName.value = "";
      formAddMotto.value = "";
      closePopup(formAdd);
    })
    .catch((error) => {
      console.log(`Cant load card ${error}`)
    })
    .finally(() => {
      setButtonText({
        button: buttonAddSubmit, 
        text: 'Добавить',
        disabled: false
      })
    })

}

function addAvatar(e){
  e.preventDefault();
  let newAvatar = null;
  newAvatar = formAvatar.querySelector('.form__profile_motto').value;
  editUserIcon(newAvatar)
    .then ((data) => {
        profileAvatar.src = data.avatar
        closePopup(formAvatar)
      })
    .catch((error) => console.log(error))
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

formAvatar.addEventListener('submit', addAvatar);

formAdd.addEventListener('submit', addCardManually);

addCardCloseButton.addEventListener('click', () => closePopup(formAdd));

document.querySelectorAll('.form__close-icon').forEach(button => {
  const buttonsPopup = button.closest('.popup'); 
  button.addEventListener('click', () => closePopup(buttonsPopup));
}); 

function handleEditFormSubmit(evt){
  evt.preventDefault();
  setButtonText({
    button: buttonEditSubmit, 
    text: 'Сохраняем...',
    disabled: true
  })
  const name = nameInput.value;
  const about = jobInput.value;
  loadProfileInfo({name, about})
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
  
formEdit.addEventListener('submit', handleEditFormSubmit); 


enableValidation(configSelector);

popupList.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup') ) {
       closePopup(popup)
    }
  })
}); 

Promise.all([getUserData(), getAllCards()])
  .then(([user, cards]) => {
    userId = user._id;
    profileName.textContent = user.name
    profileDescriptor.textContent = user.about
    profileAvatar.src = user.avatar;

    cards.forEach((card) => renderCard(card, cardsContainer))
  })
  .catch(() => console.log('cant update profile info'))




