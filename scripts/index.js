import {initialCards} from './data.js';
import {validationSelectors, gridCardSelectors, popupShowPhoto, openPopup, closePopup} from './utils.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const buttonOpenEditForm = document.querySelector('.profile__edit-button');
const buttonAddPhoto = document.querySelector('.profile__add-photo');
const popupEditProfile =  document.querySelector('#popup-edit');
const popupAddPhoto =  document.querySelector('#popup-add-card');
const nameCurrent = document.querySelector('.profile__title');
const jobCurrent = document.querySelector('.profile__job');
const cardsGrid = document.querySelector('.elements__grid');

const formEditProfile = document.forms.editForm;
const nameInput = formEditProfile.elements.nameInput;
const jobInput = formEditProfile.elements.jobInput;
const formAddPhoto = document.forms.addCardForm;
const cardName = formAddPhoto.elements.cardName;
const cardLink = formAddPhoto.elements.cardLink;

function openEditForm () {
  profileValidation.cleanErrors();
  nameInput.value = nameCurrent.textContent;
  jobInput.value = jobCurrent.textContent;
  openPopup(popupEditProfile);
}

function editFormSubmitHandler (evt) {
    evt.preventDefault();
    nameCurrent.textContent = nameInput.value;
    jobCurrent.textContent = jobInput.value
    closePopup(popupEditProfile);
}
function addPhotoFormSubmitHandler (evt) {
  evt.preventDefault();
  const cardItem = {
    name: cardName.value,
    link: cardLink.value
  };
  closePopup(popupAddPhoto);
  const newCard = createCard(cardItem);
  renderCard(newCard, true);
}

function clickPopupHandler(evt) {
  const target = evt.target;
  if (ifNeedToClose(target))
  {
    closePopup(evt.currentTarget);
  }
}

function ifNeedToClose(element){
  return element.classList.contains('popup__close')
  || element.classList.contains('popup_opened');
}

function openAddPhotoForm() {
  formAddPhoto.reset();
  newCardValidation.cleanErrors();
  openPopup(popupAddPhoto);
}

function createCard(cardItem)
{
  const newCard = new Card(cardItem, gridCardSelectors).getCard();
  return newCard;
}
function renderCard(newCard, isPrepend = false)
{
   if(isPrepend) {
    cardsGrid.prepend(newCard);
  }
  else {
    cardsGrid.append(newCard);
  }
}

buttonOpenEditForm.addEventListener('click', openEditForm);
buttonAddPhoto.addEventListener('click', openAddPhotoForm);
formEditProfile.addEventListener('submit', editFormSubmitHandler);
formAddPhoto.addEventListener('submit', addPhotoFormSubmitHandler);
popupShowPhoto.addEventListener('click', clickPopupHandler);
popupAddPhoto.addEventListener('click', clickPopupHandler);
popupEditProfile.addEventListener('click', clickPopupHandler);

initialCards.forEach((cardItem) => {
  const newCard = createCard(cardItem);
  renderCard(newCard);
});

const profileValidation = new FormValidator(validationSelectors, formEditProfile);
 const newCardValidation = new FormValidator(validationSelectors, formAddPhoto);
 profileValidation.enableValidation();
 newCardValidation.enableValidation();





