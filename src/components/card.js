import { openPopup, closePopup, toggleLike, handleFormSubmit, setEventListener } from "./util.js";
import { runImagePopup } from "./modal.js";
import { toggleButtonState, checkInputValidity, addError, hideError, enableValidation } from "./validate.js";
import { initialCards, profileName, profileDescriptor, formEdit, formAdd, nameInput, jobInput, placeInput, linkInput, buttonProfileInfoEdit, formEditCloseButton, addCardButton, addCardCloseButton, cardTemplate, cardsContainer, allPage, cardPopup, configSelector} from './consts.js';
import { deleteCard, getAllCards, loadNewCard } from "./api.js";



function createCard(object){
  const clonedCard = cardTemplate.content.querySelector('.element__rectangle').cloneNode(true);
  const pictureElement = clonedCard.querySelector('.element__image');
  clonedCard.querySelector('.element__rectangle_text').textContent = object.name;
  pictureElement.src = object.link; 
  pictureElement.alt = object.name;
  cardsContainer.prepend(clonedCard);
  const deleteBin = clonedCard.querySelector('.element__delete-button');
  const likeHeart = clonedCard.querySelector('.element__rectangle_heart');
  pictureElement.addEventListener('click', runImagePopup)
  deleteBin.addEventListener('click', () => {
    deleteCard(object._id)
      .then(() => {
        clonedCard.remove()
        console.log(`Element ${object._id} deleted`)
      })
      .catch(() => console.log(`Cant delete card ${object._id}`))
  });
  likeHeart.addEventListener('click', (event) => event.target.classList.toggle('element__rectangle_heart-on'));
  return clonedCard;
};



// initialCards.forEach(createCard);

getAllCards()
  .then(data => {
    data.forEach(createCard)
    console.log(data)
  })

export {createCard};

