import { openPopup, closePopup, runImagePopup } from "./modal.js";
import { toggleButtonState, checkInputValidity, addError, hideError, enableValidation, setEventListener } from "./validate.js";
import { initialCards, profileName, profileDescriptor, formEdit, formAdd, nameInput, jobInput, placeInput, linkInput, buttonProfileInfoEdit, formEditCloseButton, addCardButton, addCardCloseButton, cardTemplate, cardsContainer, allPage, cardPopup, configSelector} from './consts.js';
import { deleteCard, getAllCards, getUserData, loadNewCard, updateLike } from "./api.js";
import { toggleLike, isLiked } from "./util.js";




function createCard(object, userId){
  
  console.log(isLiked);
  const clonedCard = cardTemplate.content.querySelector('.element__rectangle').cloneNode(true);
  const pictureElement = clonedCard.querySelector('.element__image');
  clonedCard.querySelector('.element__rectangle_text').textContent = object.name;
  clonedCard.querySelector('.element__rectangle_like').textContent = object.likes.length;
  pictureElement.src = object.link; 
  cardsContainer.prepend(clonedCard);
  const deleteBin = clonedCard.querySelector('.element__delete-button');
  const likeHeart = clonedCard.querySelector('.element__rectangle_heart');
  pictureElement.addEventListener('click', runImagePopup)
  if(isLiked(object.likes, userId)){
    toggleLike(likeHeart)
  }

  if(object.owner._id !== userId){
    deleteBin.remove();
  }
  deleteBin.addEventListener('click', () => {
    deleteCard(object._id)
      .then(() => {
        clonedCard.remove()
      })
      .catch((error) => {
        console.log(error)
      })
  });
  

  likeHeart.addEventListener('click', handleClickLike);


  function handleClickLike(){
    updateLike(object._id, isLiked(object.likes, userId))
      .then((data) => {
        likeHeart.classList.toggle('element__rectangle_heart-on')
        object.likes = data.likes
        console.log(data)
        clonedCard.querySelector('.element__rectangle_like').textContent = object.likes.length;
      })
      .catch((error) => console.log(error))
  }



  return clonedCard;
};







export {createCard};

