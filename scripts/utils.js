export const popupShowPhoto = document.querySelector('#popup-picture');
export const photoZoomed = popupShowPhoto.querySelector('.popup__big-photo');
export const photoZoomedTitle = popupShowPhoto.querySelector('.popup__picture-title');
export const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
export const gridCardSelectors = {
  templateSelector: '.grid-card',
  listElementSelector: '.element',
  imageContainer: '.element__image-container',
  titleSelector: '.element__title-text',
  likeSelector: '.element__heart',
  activeLikeClass: 'element__heart_active',
  deleteSelector: '.element__delete',
}

function pressEscapeHandler(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

export function openPopup(popup) {
  document.addEventListener('keydown', pressEscapeHandler);
  popup.classList.add('popup_opened');
}

export function closePopup(popup) {
  document.removeEventListener('keydown', pressEscapeHandler);
  popup.classList.remove('popup_opened');
}
