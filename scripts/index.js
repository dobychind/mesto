const buttonOpenEditForm = document.querySelector('.profile__edit-button');
const buttonCloseEditForm = document.querySelectorAll('.popup__close');
const buttonAddPhoto = document.querySelector('.profile__add-photo');
const popupEditProfile = document.querySelector('#popup-edit');
const popupAddPhoto = document.querySelector('#popup-add-card');
const formAddPhoto = popupAddPhoto.querySelector('.popup__form');
const popupShowPhoto = document.querySelector('#popup-picture');
const nameInput = popupEditProfile.querySelector('#name-input');
const jobInput = popupEditProfile.querySelector('#job-input');
const cardName = popupAddPhoto.querySelector('#card-name');
const cardLink = popupAddPhoto.querySelector('#card-link');
const photoZoomed = popupShowPhoto.querySelector('.popup__big-photo');
const photoZoomedTitle = popupShowPhoto.querySelector('.popup__picture-title');
const nameCurrent = document.querySelector('.profile__title');
const jobCurrent = document.querySelector('.profile__job');
const cardsGrid = document.querySelector('.elements__grid');

function openEditForm() {
  nameInput.value = nameCurrent.textContent;
  jobInput.value = jobCurrent.textContent;
  openPopup(popupEditProfile);
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  nameCurrent.textContent = nameInput.value;
  jobCurrent.textContent = jobInput.value
  closePopup(popupEditProfile);
}

function addPhotoFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardItem = {
    name: cardName.value,
    link: cardLink.value
  };
  closePopup(popupAddPhoto);
  renderCard(cardItem, true);
}

function openAddPhotoForm() {
  formAddPhoto.reset();
  openPopup(popupAddPhoto);
}

function openShowPhotoForm(cardLink, cardName) {
  photoZoomed.src = cardLink;
  photoZoomed.setAttribute('alt', cardName);
  photoZoomedTitle.textContent = cardName;
  openPopup(popupShowPhoto);
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function likeButtonClickHandler(evt) {
  const thisButton = evt.target;
  thisButton.classList.toggle('element__like_active');
}

function deleteButtonClickHandler(evt) {
  const thisButton = evt.target;
  const deletingElement = thisButton.closest('.element');
  deletingElement.remove();
}

function renderCard(cardItem, isPrepend = false) {
  const newCard = makeCard(cardItem);
  if (isPrepend) {
    cardsGrid.prepend(newCard);
  }
  else {
    cardsGrid.append(newCard);
  }
}

function makeCard(cardItem) {
  const cardTemplate = document.querySelector('#grid_card').content;
  const cardLink = cardItem.link;
  const cardName = cardItem.name;
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);

  const cardImage = newCard.querySelector('.element__image-container');
  cardImage.style.backgroundImage = `url(${cardLink})`;
  cardImage.setAttribute('aria-label', cardName);
  const cardHeader = newCard.querySelector('.element__title-text');
  cardHeader.setAttribute('title', cardName);
  cardHeader.textContent = cardName;

  cardImage.addEventListener('click', () => {
    openShowPhotoForm(cardLink, cardName);
  });

  const buttonLike = newCard.querySelector('.element__like');
  buttonLike.addEventListener('click', likeButtonClickHandler);

  const buttonDelete = newCard.querySelector('.element__delete');
  buttonDelete.addEventListener('click', deleteButtonClickHandler);

  return newCard;
}

buttonOpenEditForm.addEventListener('click', openEditForm);
popupEditProfile.addEventListener('submit', editFormSubmitHandler);
popupAddPhoto.addEventListener('submit', addPhotoFormSubmitHandler);
buttonCloseEditForm.forEach((closeButton) => {
  closeButton.addEventListener('click', (evt) => {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
  });
});
buttonAddPhoto.addEventListener('click', openAddPhotoForm);

initialCards.forEach((cardItem) => {
  renderCard(cardItem)
});