import { openPopup } from "./modal.js";
import { cardTemplate, cardPopup } from './consts.js';
import { deleteCard, updateLike } from "./api.js";
import { toggleLike } from "./util.js";

function createCard(object, userId){
  
  const clonedCard = cardTemplate.content.querySelector('.element__rectangle').cloneNode(true);
  const pictureElement = clonedCard.querySelector('.element__image');
  const likesCount = clonedCard.querySelector('.element__rectangle_like');
  clonedCard.querySelector('.element__rectangle_text').textContent = object.name;
  likesCount.textContent = object.likes.length;
  pictureElement.src = object.link; 
  //cardsContainer.prepend(clonedCard);
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
        likesCount.textContent = object.likes.length;
      })
      .catch((error) => console.log(error))
  };

  return clonedCard;
};

function runImagePopup(e){
  openPopup(cardPopup);
  const targetCard = e.target.closest('.element__rectangle');
  const chosenImage = targetCard.querySelector('.element__image'); 
  const chosenText = targetCard.querySelector('.element__rectangle_text');
  cardPopup.querySelector('.popup__big-picture').src = chosenImage.src;
  cardPopup.querySelector('.popup__big-popup-descriptor').textContent = chosenText.textContent;
}

function isLiked(likes, userID){
  return likes.some(user => user._id === userID)
}



export {createCard, runImagePopup, isLiked};

