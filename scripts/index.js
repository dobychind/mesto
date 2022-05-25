const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupExitButton = popup.querySelector('.popup__exit-button');
const formElement = document.querySelector('.popup__form');
const popupFieldName = popup.querySelector('.popup__field_type_name');
const popupFieldDescription = popup.querySelector('.popup__field_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
//const likeButton = document.querySelector('.elements__like'); //работает только с 1 блоком \_(0_0)_/, если поменять elements__like на elements, то изображение будет меняться, но меняться будет весь блок.

const popupClose = function () {
  popup.classList.toggle('popup_opened');
}

const popupOpen = function () {
  popup.classList.toggle('popup_opened');
  popupFieldName.value = profileName.textContent;
  popupFieldDescription.value = profileDescription.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupFieldName.value;
  profileDescription.textContent = popupFieldDescription.value;
  popupClose();
}

/*function likeChange(evt) {
  console.log("click");
  evt.target.classList.toggle('elements__like_active');
};*/

//likeButton.addEventListener('click', likeChange);
profileEditButton.addEventListener('click', popupOpen);
popupExitButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);