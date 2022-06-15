//Найти все необходимые элементы страницы
const popupsList = Array.from(document.querySelectorAll('.popup'));
const buttonOpenEditForm = document.querySelector('.profile__edit-button');
const buttonAddPhoto = document.querySelector('.profile__add-photo');
const popupEditProfile = document.querySelector('#popup-edit');
const popupAddPhoto = document.querySelector('#popup-add-card');
const popupShowPhoto = document.querySelector('#popup-picture');
const photoZoomed = popupShowPhoto.querySelector('.popup__big-photo');
const photoZoomedTitle = popupShowPhoto.querySelector('.popup__picture-title');
const nameCurrent = document.querySelector('.profile__title');
const jobCurrent = document.querySelector('.profile__job');
const cardsGrid = document.querySelector('.elements__grid');

//Элементы форм
const formEditProfile = document.forms.editForm;
const nameInput = formEditProfile.elements.nameInput;
const jobInput = formEditProfile.elements.jobInput;
const formAddPhoto = document.forms.addCardForm;
const cardName = formAddPhoto.elements.cardName;
const cardLink = formAddPhoto.elements.cardLink;

//Открыть окно редактирования профиля
function openEditForm() {
  //Сбросим ошибки, если они есть. Делаем это здесь, т.к. при закрытии есть задержка (анимация) и видно, как дергаются поля
  formEditProfile.reset();
  //Подставить полученные значения в поля формы
  nameInput.value = nameCurrent.textContent;
  jobInput.value = jobCurrent.textContent;
  openPopup(popupEditProfile);
}

// Обработчик «отправки» формы редактирования
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

function pressEscapeHandler(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function likeButtonClickHandler(evt) {
  const thisButton = evt.target;
  thisButton.classList.toggle('element__heart_active');
}

function deleteButtonClickHandler(evt) {
  const thisButton = evt.target;
  const deletingElement = thisButton.closest('.element');
  deletingElement.remove();
}

//Обработчик закрытия попапа
function clickPopupHandler(evt) {
  const target = evt.target;
  if (ifNeedToClose(target)) {
    closePopup(evt.currentTarget);
  }
}

function ifNeedToClose(element) {
  return element.classList.contains('popup__close')
    || element.classList.contains('popup_opened');
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
  document.removeEventListener('keydown', pressEscapeHandler);
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  //document.addEventListener('keydown', pressEscapeHandler);
  popup.classList.add('popup_opened');
}

function likeButtonClick(thisButton) {
  thisButton.classList.toggle('element__heart_active');
}

function deleteButtonClick(thisButton) {
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
  const cardLink = cardItem?.link ?? '#';
  const cardName = cardItem?.name ?? 'Картинка без названия';
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

  const buttonLike = newCard.querySelector('.element__heart');
  buttonLike.addEventListener('click', likeButtonClickHandler);
  const buttonDelete = newCard.querySelector('.element__delete');
  buttonDelete.addEventListener('click', deleteButtonClickHandler);
  return newCard;
}

buttonOpenEditForm.addEventListener('click', openEditForm);
buttonAddPhoto.addEventListener('click', openAddPhotoForm);
formEditProfile.addEventListener('submit', editFormSubmitHandler);
formAddPhoto.addEventListener('submit', addPhotoFormSubmitHandler);
popupShowPhoto.addEventListener('click', clickPopupHandler);
popupAddPhoto.addEventListener('click', clickPopupHandler);
popupEditProfile.addEventListener('click', clickPopupHandler);

initialCards.forEach((cardItem) => {
  renderCard(cardItem);
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});




