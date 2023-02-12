import {editUserIcon, getAllCards, getUserData, loadNewCard, loadProfileInfo} from './api.js'
import '../pages/index.css'
import { profileName, profileDescriptor, formEdit, formAdd, nameInput, jobInput, placeInput, linkInput, buttonProfileInfoEdit, formEditCloseButton, addCardButton, addCardCloseButton, cardTemplate, cardsContainer, allPage, cardPopup, configSelector, formAvatar, profileAvatar, popupList, buttonEditSubmit, profileAvatarOverlay, formAddName, formAddMotto, buttonAddSubmit} from './consts.js';
import { closeByEsc, setButtonText } from "./util.js";
import { openPopup, closePopup } from "./modal.js";
import { toggleButtonState, checkInputValidity, addError, hideError, enableValidation, setEventListener } from "./validate.js";
import {createCard, toggleLike, runImagePopup} from "./card.js";

let userId = null;


function addCardManually(e){
  e.preventDefault();
  setButtonText({
    button: buttonAddSubmit, 
    text: 'Сохраняем...',
    disabled: true
  })
  const manualCard = {name: "", link: ""};
  manualCard.name = formAddName.value;
  manualCard.link = formAddMotto.value;
  loadNewCard(manualCard)
    .then((data) => {
      createCard(data, userId)
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

formAvatar.querySelector('.form__save-button').addEventListener('submit', addAvatar);

formAdd.querySelector('.form__save-button').addEventListener('click', addCardManually);
// formEditCloseButton.addEventListener('click', () => {
//   closePopup(formEdit)
// });
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
  
formEdit.addEventListener('submit', handleFormSubmit); 


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

    cards.forEach((card) => createCard(card, userId))
  })
  .catch(() => console.log('cant update profile info'))


// getUserData()
//   .then ((data) => {
//     userId = data._id;
//     profileName.textContent = data.name
//     profileDescriptor.textContent = data.about
//     profileAvatar.src = data.avatar;
//     getAllCards()
//       .then(data => {
//         data.forEach((dataItem) => createCard(dataItem, userId))
//       })
//   })
//   .catch(() => console.log('cant update profile info'))


