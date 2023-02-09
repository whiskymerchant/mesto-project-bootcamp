
const config = {
  url: 'https://mesto.nomoreparties.co',
  cohort: "wbf-cohort-5",
  headers: {
    'content-type': 'application/json',
    'authorization': 'e428d967-ad54-4ed1-8f27-1e899a8fcfdd'
  }

}

function dressResponse(res) {
  return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
}

function getUserData(){
  return fetch(`${config.url}/v1/${config.cohort}/users/me`, {
    method: "GET", 
    headers: config.headers
  })
    .then(dressResponse)
}

function getAllCards(){
  return fetch(`${config.url}/v1/${config.cohort}/cards`, {
    method: "GET", 
    headers: config.headers
  })
    .then(dressResponse)
}

function profileInfoLoad(body) {
  return fetch(`${config.url}/v1/${config.cohort}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(body)
  })
    .then(dressResponse)
}

function loadNewCard(body){
  return fetch(`${config.url}/v1/${config.cohort}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(body)
  })
    .then(dressResponse)
}

function editUserIcon(avatar){
  return fetch(`${config.url}/v1/${config.cohort}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({avatar: avatar})
  })
    .then(dressResponse)
}

function deleteCard(cardId){
  return fetch(`${config.url}/v1/${config.cohort}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,

  })
    .then(dressResponse)
}

function updateLike(cardId, liked){
  return fetch(`${config.url}/v1/${config.cohort}/cards/likes/${cardId}`, {
    method: liked ? "DELETE" : "PUT",
    headers: config.headers,
})
    .then(dressResponse)
}




// loadNewCard({
//   name: "Anton Plekhov",
//   link: "https://pictures-of-cats.org/wp-content/uploads/2021/11/Spooky-Sphynx-in-womans-clothes-and-wig1_edited.jpg"
// })

// profileInfoLoad({
//   name: 'Marie Skłodowska Curie',
//   about: 'Physicist and Chemist'
// })





export { getUserData, dressResponse, getAllCards, profileInfoLoad, loadNewCard, editUserIcon, deleteCard, updateLike };